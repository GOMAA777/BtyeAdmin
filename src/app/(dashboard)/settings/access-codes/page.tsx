import { Metadata } from "next";
import { AccessCodesSettingsView } from "@/features/settings/components/access-codes-settings-view";

export const metadata: Metadata = {
  title: "إعدادات أكواد الدخول | إبراج لإدارة العقارات",
  description: "تهيئة المعايير الموحدة لتوليد وتشفير وصلاحيات أكواد الأقفال الذكية عبر كافة عقارات ووحدات المنصة",
};

export default function AccessCodesSettingsPage() {
  return <AccessCodesSettingsView />;
}
