"use client";

import { useState, useMemo, useEffect, useCallback, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { TeamMember, TeamRole, TeamMemberStatus, TeamOverviewStats } from "../types";
import { initialTeamStats } from "../data/mock-team";
import { teamService } from "@/services/team-service";
import { useAppDataStore, ensureStoreHydrated } from "@/stores/use-app-data-store";

export interface AddMemberFormData {
  fullName: string;
  role: TeamRole;
  phone: string;
  whatsapp: string;
  isWhatsappSameAsPhone: boolean;
  specialNotes?: string;
  coverageScope: "all" | "custom";
  assignedPropertyIds: string[];
  automatedTaskTypes: Array<"cleaning" | "maintenance">;
}

const emptyTeam: TeamMember[] = [];

export function useTeamManager(initialMembers?: TeamMember[]) {
  const storeTeam = useSyncExternalStore(
    useAppDataStore.subscribe,
    () => useAppDataStore.getState().team,
    () => emptyTeam
  );
  const members = initialMembers || storeTeam;

  useEffect(() => {
    ensureStoreHydrated();
  }, []);
  const [stats, setStats] = useState<TeamOverviewStats>(initialTeamStats);

  // Filter States
  const [activeTab, setActiveTab] = useState<"all" | TeamRole>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  // Modals state
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeWhatsappModalOpen, setChangeWhatsappModalOpen] = useState(false);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [sendWhatsappModalOpen, setSendWhatsappModalOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(initialMembers?.[0] || null);

  // Counts for status tabs (matching Owners filter bar) & roles
  const counts = useMemo(() => {
    return {
      all: members.length,
      active: members.filter((m) => m.status === "active").length,
      pending: members.filter((m) => m.status === "pending").length,
      inactive: members.filter((m) => m.status === "suspended" || m.status === "on_leave").length,
      cleaner: members.filter((m) => m.role === "cleaner").length,
      maintenance: members.filter((m) => m.role === "maintenance").length,
      supervisor: members.filter((m) => m.role === "supervisor").length,
    };
  }, [members]);

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Tab filter
      if (activeTab !== "all" && member.role !== activeTab) {
        return false;
      }
      // Dropdown role filter
      if (roleFilter !== "all" && member.role !== roleFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "active" && member.status !== "active") return false;
        if (statusFilter === "pending" && member.status !== "pending") return false;
        if (statusFilter === "inactive" && member.status !== "suspended" && member.status !== "on_leave") return false;
        if (statusFilter === "suspended" && member.status !== "suspended") return false;
        if (statusFilter === "leave" && member.status !== "on_leave") return false;
      }
      // Property filter
      if (propertyFilter !== "all" && !member.property.includes(propertyFilter)) {
        return false;
      }
      // Search query (name, whatsapp, property)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = member.name.toLowerCase().includes(q) || member.fullName.toLowerCase().includes(q);
        const matchPhone = member.phone.includes(q) || member.whatsapp.includes(q);
        const matchProp = member.property.toLowerCase().includes(q) || member.propertyLocation.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchProp) {
          return false;
        }
      }
      return true;
    });
  }, [members, activeTab, roleFilter, statusFilter, propertyFilter, searchQuery]);

  // Paginated members
  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredMembers.slice(startIndex, startIndex + pageSize);
  }, [filteredMembers, currentPage, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));

  // Reset all filters
  const resetFilters = useCallback(() => {
    setActiveTab("all");
    setSearchQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
    setPropertyFilter("all");
    setCurrentPage(1);
    toast.info("تمت إعادة ضبط عوامل التصفية");
  }, []);

  // Modal openers with target member
  const openSuspendModal = useCallback((member?: TeamMember) => {
    if (member) setActiveMember(member);
    setSuspendModalOpen(true);
  }, []);

  const openDeleteModal = useCallback((member?: TeamMember) => {
    if (member) setActiveMember(member);
    setDeleteModalOpen(true);
  }, []);

  const openChangeWhatsappModal = useCallback((member?: TeamMember) => {
    if (member) setActiveMember(member);
    setChangeWhatsappModalOpen(true);
  }, []);

  const openPermissionsModal = useCallback((member?: TeamMember) => {
    if (member) setActiveMember(member);
    setPermissionsModalOpen(true);
  }, []);

  const openSendWhatsappModal = useCallback((member?: TeamMember) => {
    if (member) setActiveMember(member);
    setSendWhatsappModalOpen(true);
  }, []);

  // Actions
  const handleSuspendMember = useCallback(
    async (id: string, reassignToId?: string) => {
      await teamService.updateStatus(id, "suspended");
      setStats((s) => ({
        ...s,
        activeMembers: Math.max(0, s.activeMembers - 1),
        pausedOrLeaveCount: s.pausedOrLeaveCount + 1,
      }));
      setSuspendModalOpen(false);
      toast.success("تم إيقاف حساب عضو الفريق مؤقتاً وإعادة توزيع المهام بنجاح");
    },
    []
  );

  const handleDeleteMember = useCallback(async (id: string, reassignToId?: string) => {
    await teamService.remove(id);
    setStats((s) => ({
      ...s,
      totalMembers: Math.max(0, s.totalMembers - 1),
      activeMembers: Math.max(0, s.activeMembers - 1),
    }));
    setDeleteModalOpen(false);
    toast.success("تم إزالة العضو نهائياً وإعادة تعيين المهام بنجاح");
  }, []);

  const handleChangeWhatsapp = useCallback(
    async (id: string, newNumber: string, updatePrimaryPhone: boolean) => {
      await teamService.update(id, {
        whatsapp: newNumber,
        ...(updatePrimaryPhone ? { phone: newNumber } : {}),
      });
      setChangeWhatsappModalOpen(false);
      toast.success("تم تأكيد وتحديث رقم WhatsApp والتحقق من جاهزية المحادثة");
    },
    []
  );

  const handleUpdatePermissions = useCallback(
    async (id: string, scope: "all" | "custom", propertyIds: string[]) => {
      const target = members.find((m) => m.id === id);
      if (target) {
        const updatedAssigned = target.assignedProperties.map((p) => ({
          ...p,
          isActive: propertyIds.includes(p.id),
        }));
        await teamService.update(id, {
          coverageScope: scope,
          assignedProperties: updatedAssigned,
        });
      }
      setPermissionsModalOpen(false);
      toast.success("تم حفظ وتحديث نطاق الصلاحيات والعقارات بنجاح");
    },
    [members]
  );

  const handleSendWhatsappMessage = useCallback(
    (id: string, templateTitle: string, note?: string) => {
      setSendWhatsappModalOpen(false);
      toast.success(`تم إرسال الرسالة عبر WhatsApp Business API: ${templateTitle}`);
    },
    []
  );

  const handleAddMember = useCallback(async (data: AddMemberFormData) => {
    await teamService.create({
      fullName: data.fullName,
      role: data.role,
      phone: data.phone,
      whatsapp: data.whatsapp,
      assignedProperties: data.assignedPropertyIds,
    });
    setStats((s) => ({
      ...s,
      totalMembers: s.totalMembers + 1,
      activeMembers: s.activeMembers + 1,
    }));
    toast.success("تمت إضافة عضو الفريق الجديد ونشر التعديلات بنجاح");
  }, []);

  return {
    members,
    stats,
    activeTab,
    setActiveTab,
    counts,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    propertyFilter,
    setPropertyFilter,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    filteredMembers,
    paginatedMembers,
    resetFilters,
    // Modals
    suspendModalOpen,
    setSuspendModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    changeWhatsappModalOpen,
    setChangeWhatsappModalOpen,
    permissionsModalOpen,
    setPermissionsModalOpen,
    sendWhatsappModalOpen,
    setSendWhatsappModalOpen,
    activeMember,
    setActiveMember,
    openSuspendModal,
    openDeleteModal,
    openChangeWhatsappModal,
    openPermissionsModal,
    openSendWhatsappModal,
    // Mutations
    handleSuspendMember,
    handleDeleteMember,
    handleChangeWhatsapp,
    handleUpdatePermissions,
    handleSendWhatsappMessage,
    handleAddMember,
  };
}
