import { Suspense } from "react";
import type { Metadata } from "next";
import { TeamOverviewView } from "@/features/team/components/team-overview-view";

export const metadata: Metadata = {
  title: "فريق العمل | إبراج لإدارة العقارات",
  description: "إدارة الكوادر والمشرفين الميدانيين وتوزيع مسؤوليات الوحدات، صلاحيات أكواد الدخول، والتواصل التلقائي عبر WhatsApp.",
};

export default function TeamPage() {
  return (
    <Suspense fallback={<div className="space-y-6 animate-pulse" />}>
      <TeamOverviewView />
    </Suspense>
  );
}
