export type TeamRole = "cleaner" | "maintenance" | "supervisor";
export type TeamMemberStatus = "active" | "suspended" | "pending" | "on_leave";

export interface PropertyAssignment {
  id: string;
  name: string;
  location: string;
  unitsLabel: string;
  isFull: boolean;
  selectedUnits?: string[];
  isActive?: boolean;
}

export interface RecentTask {
  id: string;
  code: string;
  title: string;
  statusText: string;
  property: string;
  location: string;
  unitBadge: string;
  smartLockStatus?: string;
  statusType: "in_progress" | "scheduled" | "completed";
  durationOrPhotos?: string;
}

export interface TeamMember {
  id: string;
  systemId: string;
  name: string;
  fullName: string;
  initials: string;
  role: TeamRole;
  roleLabel: string;
  specialty: string;
  phone: string;
  whatsapp: string;
  isWhatsappSameAsPhone: boolean;
  property: string;
  propertyLocation: string;
  unitsScope: string;
  unitsCount: number;
  openTasksCount: number;
  openTasksLabel: string;
  status: TeamMemberStatus;
  statusLabel: string;
  isOnline: boolean;
  joinedDate: string;
  tenure: string;
  contractType: string;
  workingHours: string;
  coverageScope: "all" | "custom";
  assignedProperties: PropertyAssignment[];
  automatedTaskTypes: Array<"cleaning" | "maintenance">;
  specialNotes?: string;
  stats: {
    openAndRunning: number;
    currentRunningDetail: string;
    completedThisMonth: number;
    totalAssignedThisMonth: number;
    avgPrepTimeMinutes: number;
    fasterByMinutes: number;
  };
  activeSmartLock?: {
    unit: string;
    code: string;
    expiresInMinutes: number;
  };
  recentTasks: RecentTask[];
}

export interface TeamOverviewStats {
  totalMembers: number;
  locationsCount: number;
  totalSubtitle: string;
  activeMembers: number;
  onlineWhatsappCount: number;
  activeSubtitle: string;
  pausedOrLeaveCount: number;
  pausedLeaveSubtitle: string;
  pausedLeaveStatus: string;
  runningTasksCount: number;
  cleaningTasksCount: number;
  maintenanceTasksCount: number;
}
