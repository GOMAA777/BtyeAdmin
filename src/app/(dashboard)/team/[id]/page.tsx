import { Suspense } from "react";
import type { Metadata } from "next";
import { initialTeamMembers } from "@/features/team/data/mock-team";
import { TeamMemberProfileView } from "@/features/team/components/team-member-profile-view";

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
  const member = initialTeamMembers.find((m) => m.id === id) || initialTeamMembers[0];

  return {
    title: `${member.name} - الملف الشخصي | إبراج`,
    description: `الملف الشخصي وتفاصيل التشغيل والصلاحيات لعضو الفريق ${member.fullName}`,
  };
}

export default async function TeamMemberProfilePage({
  params,
}: TeamMemberProfilePageProps) {
  const { id } = await params;
  const member = initialTeamMembers.find((m) => m.id === id) || initialTeamMembers[0];

  return (
    <Suspense fallback={<div className="space-y-6 animate-pulse" />}>
      <TeamMemberProfileView
        initialMember={member}
        allMembers={initialTeamMembers}
      />
    </Suspense>
  );
}
