export interface AssignedProperty {
  id: string;
  name: string;
  unitsLabel: string;
  isActive: boolean;
}

export interface ProfileTask {
  id: string;
  code: string;
  title: string;
  statusText: string;
  property: string;
  location: string;
  unitBadge: string;
  unitLabel: string;
  unitBadgeBg: string;
  unitBadgeText: string;
  smartLockStatus?: string;
  whatsappNotification?: string;
  durationOrPhotos?: string;
  statusType: "in_progress" | "scheduled" | "completed";
}

export interface ProfileStats {
  openAndRunning: number;
  currentRunningDetail: string;
  completedThisMonth: number;
  totalAssignedThisMonth: number;
  avgPrepTimeMinutes: number;
  fasterByMinutes: number;
}

export interface ProfileSmartLock {
  unit: string;
  code: string;
  expiresInMinutes: number;
}

export interface ProfileWhatsAppGateway {
  status: "connected" | "disconnected";
  channelName: string;
  description: string;
  lastMessageTime: string;
  lastMessageContent: string;
  lastMessageStatus: string;
}

export interface UserProfileData {
  id: string;
  name: string;
  fullName: string;
  initials: string;
  avatarUrl?: string;
  role: string;
  status: "active" | "suspended";
  statusLabel: string;
  phone: string;
  whatsapp: string;
  joinedDate: string;
  tenure: string;
  contractType: string;
  workingHours: string;
  coverageScope: "all" | "custom";
  coverageLabel: string;
  assignedProperties: AssignedProperty[];
  totalUnitsCount: number;
  stats: ProfileStats;
  activeSmartLock: ProfileSmartLock;
  recentTasks: ProfileTask[];
  whatsappGateway: ProfileWhatsAppGateway;
  permissions: {
    cleaning: boolean;
    inspection: boolean;
    maintenance: boolean;
  };
}
