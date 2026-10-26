"use client";

import { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { TeamMember, TeamRole, TeamMemberStatus, TeamOverviewStats } from "../types";
import { initialTeamMembers, initialTeamStats } from "../data/mock-team";

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

export function useTeamManager(initialMembers: TeamMember[] = initialTeamMembers) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [stats, setStats] = useState<TeamOverviewStats>(initialTeamStats);

  // Filter States
  const [activeTab, setActiveTab] = useState<"all" | TeamRole>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 8;

  // Modals state
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeWhatsappModalOpen, setChangeWhatsappModalOpen] = useState(false);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [sendWhatsappModalOpen, setSendWhatsappModalOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(initialMembers[0] || null);

  // Role Tab Counts
  const counts = useMemo(() => {
    return {
      all: members.length,
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
    (id: string, reassignToId?: string) => {
      setMembers((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              status: "suspended" as TeamMemberStatus,
              statusLabel: "موقوف مؤقتاً",
              openTasksCount: 0,
              openTasksLabel: "لا مهام معلقة",
            };
          }
          if (reassignToId && m.id === reassignToId) {
            return {
              ...m,
              openTasksCount: m.openTasksCount + 2,
              openTasksLabel: `${m.openTasksCount + 2} مهام جارية`,
            };
          }
          return m;
        })
      );
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

  const handleDeleteMember = useCallback((id: string, reassignToId?: string) => {
    setMembers((prev) => {
      return prev
        .filter((m) => m.id !== id)
        .map((m) => {
          if (reassignToId && m.id === reassignToId) {
            return {
              ...m,
              openTasksCount: m.openTasksCount + 2,
              openTasksLabel: `${m.openTasksCount + 2} مهام جارية`,
            };
          }
          return m;
        });
    });
    setStats((s) => ({
      ...s,
      totalMembers: Math.max(0, s.totalMembers - 1),
      activeMembers: Math.max(0, s.activeMembers - 1),
    }));
    setDeleteModalOpen(false);
    toast.success("تم إزالة العضو نهائياً وإعادة تعيين المهام بنجاح");
  }, []);

  const handleChangeWhatsapp = useCallback(
    (id: string, newNumber: string, updatePrimaryPhone: boolean) => {
      setMembers((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              whatsapp: newNumber,
              phone: updatePrimaryPhone ? newNumber : m.phone,
            };
          }
          return m;
        })
      );
      setChangeWhatsappModalOpen(false);
      toast.success("تم تأكيد وتحديث رقم WhatsApp والتحقق من جاهزية المحادثة");
    },
    []
  );

  const handleUpdatePermissions = useCallback(
    (id: string, scope: "all" | "custom", propertyIds: string[]) => {
      setMembers((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              coverageScope: scope,
              assignedProperties: m.assignedProperties.map((p) => ({
                ...p,
                isActive: propertyIds.includes(p.id),
              })),
            };
          }
          return m;
        })
      );
      setPermissionsModalOpen(false);
      toast.success("تم حفظ وتحديث نطاق الصلاحيات والعقارات بنجاح");
    },
    []
  );

  const handleSendWhatsappMessage = useCallback(
    (id: string, templateTitle: string, note?: string) => {
      setSendWhatsappModalOpen(false);
      toast.success(`تم إرسال الرسالة عبر WhatsApp Business API: ${templateTitle}`);
    },
    []
  );

  const handleAddMember = useCallback((data: AddMemberFormData) => {
    const roleLabels: Record<TeamRole, string> = {
      cleaner: "عامل نظافة",
      maintenance: "فني صيانة",
      supervisor: "مشرف تشغيل",
    };
    const specialties: Record<TeamRole, string> = {
      cleaner: "طاقم نظافة وتعقيم فندقي",
      maintenance: "معالجة بلاغات السباكة والكهرباء والتكييف",
      supervisor: "إشراف ميداني ومتابعة الجودة",
    };

    const newMember: TeamMember = {
      id: Date.now().toString(),
      systemId: `#TM-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.fullName.split(" ").slice(0, 2).join(" "),
      fullName: data.fullName,
      initials: data.fullName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join(" "),
      role: data.role,
      roleLabel: roleLabels[data.role],
      specialty: specialties[data.role],
      phone: data.phone,
      whatsapp: data.whatsapp,
      isWhatsappSameAsPhone: data.isWhatsappSameAsPhone,
      property: "عمارة النخيل",
      propertyLocation: "حي الصحافة الرياض",
      unitsScope: "10 وحدات",
      unitsCount: 10,
      openTasksCount: 0,
      openTasksLabel: "جاهز للمهام",
      status: "active",
      statusLabel: "نشط",
      isOnline: true,
      joinedDate: "اليوم",
      tenure: "جديد",
      contractType: "دوام كامل مرن",
      workingHours: "08:00 صباحاً — 05:00 مساءً",
      coverageScope: data.coverageScope,
      assignedProperties: [
        {
          id: "p1",
          name: "عمارة النخيل السكنية",
          location: "حي الصحافة، الرياض",
          unitsLabel: "10 وحدات نشطة",
          isFull: true,
          isActive: true,
        },
      ],
      automatedTaskTypes: data.automatedTaskTypes,
      specialNotes: data.specialNotes,
      stats: {
        openAndRunning: 0,
        currentRunningDetail: "جاهز للمهام",
        completedThisMonth: 0,
        totalAssignedThisMonth: 0,
        avgPrepTimeMinutes: 30,
        fasterByMinutes: 0,
      },
      recentTasks: [],
    };

    setMembers((prev) => [newMember, ...prev]);
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
