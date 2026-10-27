import { Suspense } from "react";
import type { Metadata } from "next";
import { initialTeamMembers } from "@/features/team/data/mock-team";
import { TeamMemberProfileView } from "@/features/team/components/team-member-profile-view";
import type { TeamMember } from "@/features/team/types";

const fallbackMember: TeamMember = {
  id: "1",
  systemId: "#TM-0001",
  name: "عضو الفريق",
  fullName: "عضو الفريق",
  initials: "ع ف",
  role: "cleaner",
  roleLabel: "عامل نظافة",
  specialty: "طاقم نظافة وتعقيم",
  phone: "0500000000",
  whatsapp: "0500000000",
  isWhatsappSameAsPhone: true,
  property: "العقار",
  propertyLocation: "الرياض",
  unitsScope: "جميع الوحدات",
  unitsCount: 1,
  openTasksCount: 0,
  openTasksLabel: "جاهز للمهام",
  status: "active",
  statusLabel: "نشط",
  isOnline: true,
  joinedDate: "اليوم",
  tenure: "جديد",
  contractType: "دوام كامل",
  workingHours: "08:00 ص — 05:00 م",
  coverageScope: "all",
  assignedProperties: [],
  automatedTaskTypes: ["cleaning"],
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

export function generateStaticParams() {
  const ids = initialTeamMembers.map((member) => ({
    id: member.id,
  }));
  if (ids.length > 0) return ids;
  return Array.from({ length: 15 }, (_, i) => ({ id: String(i + 1) }));
}

interface TeamMemberProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: TeamMemberProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const member = initialTeamMembers.find((m) => m.id === id) || fallbackMember;

  return {
    title: `${member.name} - الملف الشخصي | إبراج`,
    description: `الملف الشخصي وتفاصيل التشغيل والصلاحيات لعضو الفريق ${member.fullName}`,
  };
}

export default async function TeamMemberProfilePage({
  params,
}: TeamMemberProfilePageProps) {
  const { id } = await params;
  const member = initialTeamMembers.find((m) => m.id === id) || fallbackMember;

  return (
    <Suspense fallback={<div className="space-y-6 animate-pulse" />}>
      <TeamMemberProfileView
        initialMember={member}
        allMembers={initialTeamMembers}
      />
    </Suspense>
  );
}
