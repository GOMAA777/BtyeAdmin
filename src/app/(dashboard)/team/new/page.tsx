import { Suspense } from "react";
import type { Metadata } from "next";
import { AddTeamMemberView } from "@/features/team/components/add-team-member-view";

export const metadata: Metadata = {
  title: "إضافة عضو للفريق | إبراج لإدارة العقارات",
  description: "أدخل بيانات العضو وحدد نطاق مسؤوليته لإسناد المهام التشغيلية وإرسال التنبيهات الميدانية إليه تلقائياً.",
};

export default function AddTeamMemberPage() {
  return (
    <Suspense fallback={<div className="space-y-6 animate-pulse" />}>
      <AddTeamMemberView />
    </Suspense>
  );
}
