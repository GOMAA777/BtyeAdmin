import { Suspense } from "react";
import type { Metadata } from "next";
import { initialUserProfile } from "@/features/profile/data/mock-profile";
import { ProfileView } from "@/features/profile/components/profile-view";

export const metadata: Metadata = {
  title: "الملف الشخصي | إبراج",
  description: "الملف الشخصي وتفاصيل التشغيل والصلاحيات لمدير المنصة",
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="space-y-6 animate-pulse" />}>
      <ProfileView initialProfile={initialUserProfile} />
    </Suspense>
  );
}
