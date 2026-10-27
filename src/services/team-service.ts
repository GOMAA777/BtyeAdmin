import { useAppDataStore } from "@/stores/use-app-data-store";
import type { TeamMember, TeamRole, TeamMemberStatus } from "@/features/team/types";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateTeamMemberDTO {
  fullName: string;
  name?: string;
  role: TeamRole;
  phone: string;
  whatsapp?: string;
  status?: TeamMemberStatus;
  assignedProperties?: string[];
}

export const teamService = {
  async getAll(): Promise<TeamMember[]> {
    await delay();
    return useAppDataStore.getState().team;
  },

  async getById(id: string): Promise<TeamMember | null> {
    await delay();
    const member = useAppDataStore.getState().team.find((m) => m.id === id);
    return member || null;
  },

  async create(dto: CreateTeamMemberDTO): Promise<TeamMember> {
    await delay();
    const id = `team-${Date.now()}`;
    const name = dto.name || dto.fullName.split(" ").slice(0, 2).join(" ");
    const nameParts = dto.fullName.trim().split(" ");
    const initials = nameParts.length > 1
      ? `${nameParts[0][0] || ""}${nameParts[1][0] || ""}`
      : `${dto.fullName[0] || "ف"}`;

    const newMember: TeamMember = {
      id,
      systemId: `#TM-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: dto.fullName,
      name,
      initials,
      role: dto.role,
      roleLabel: dto.role === "supervisor" ? "مشرف تشغيل" : dto.role === "cleaner" ? "عامل نظافة" : "فني صيانة",
      specialty: dto.role === "cleaner" ? "طاقم نظافة وتعقيم" : "فني تشغيل وصيانة",
      phone: dto.phone,
      whatsapp: dto.whatsapp || dto.phone,
      isWhatsappSameAsPhone: !dto.whatsapp || dto.whatsapp === dto.phone,
      property: "العقارات المحددة",
      propertyLocation: "الرياض",
      unitsScope: "جميع الوحدات",
      unitsCount: dto.assignedProperties?.length || 1,
      openTasksCount: 0,
      openTasksLabel: "لا توجد مهام جارية",
      status: dto.status || "active",
      statusLabel: dto.status === "active" ? "نشط ومتاح" : "معلق",
      isOnline: true,
      joinedDate: "اليوم",
      tenure: "جديد",
      contractType: "عقد دائم",
      workingHours: "08:00 ص - 04:00 م",
      coverageScope: "all",
      assignedProperties: (dto.assignedProperties || []).map((prop, idx) => ({
        id: `prop-${idx + 1}`,
        name: typeof prop === "string" ? prop : "عقار",
        location: "الرياض",
        unitsLabel: "جميع الوحدات",
        isFull: true,
        isActive: true,
      })),
      automatedTaskTypes: ["cleaning", "maintenance"],
      stats: {
        openAndRunning: 0,
        currentRunningDetail: "لا توجد مهام نشطة حالياً",
        completedThisMonth: 0,
        totalAssignedThisMonth: 0,
        avgPrepTimeMinutes: 45,
        fasterByMinutes: 0,
      },
      recentTasks: [],
    };

    useAppDataStore.getState().addTeamMember(newMember);
    return newMember;
  },

  async update(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
    await delay();
    const existing = useAppDataStore.getState().team.find((m) => m.id === id);
    if (!existing) {
      throw new Error(`عضو الفريق غير موجود: ${id}`);
    }
    useAppDataStore.getState().updateTeamMember(id, updates);
    return { ...existing, ...updates };
  },

  async updateStatus(id: string, status: TeamMemberStatus): Promise<TeamMember> {
    return this.update(id, { status, statusLabel: status === "active" ? "نشط ومتاح" : "معلق" });
  },

  async remove(id: string): Promise<boolean> {
    await delay();
    useAppDataStore.getState().deleteTeamMember(id);
    return true;
  },
};
