import { TeamMember, TeamOverviewStats } from "../types";

export const initialTeamStats: TeamOverviewStats = {
  totalMembers: 0,
  locationsCount: 0,
  totalSubtitle: "يشمل المشرفين وفنيي التشغيل الميداني",
  activeMembers: 0,
  onlineWhatsappCount: 0,
  activeSubtitle: "لا يوجد أعضاء متصلون بالواتساب حالياً",
  pausedOrLeaveCount: 0,
  pausedLeaveSubtitle: "لا مهام معلقة",
  pausedLeaveStatus: "لا مهام معلقة",
  runningTasksCount: 0,
  cleaningTasksCount: 0,
  maintenanceTasksCount: 0,
};

export const initialTeamMembers: TeamMember[] = [];
