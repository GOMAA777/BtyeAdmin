import { Metadata } from "next";
import { SecuritySettingsView } from "@/features/settings/components/security-settings-view";

export const metadata: Metadata = {
  title: "إعدادات الأمان | إبراج لإدارة العقارات",
  description: "حوكمة المصادقة الثنائية 2FA وسياسات الجلسات وكلمات المرور وقائمة الـ IP الموثوقة",
};

export default function SecuritySettingsPage() {
  return <SecuritySettingsView />;
}
