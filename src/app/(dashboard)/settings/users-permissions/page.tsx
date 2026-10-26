import { Metadata } from "next";
import { UsersPermissionsSettingsView } from "@/features/settings/components/users-permissions-settings-view";

export const metadata: Metadata = {
  title: "إعدادات المستخدمين والصلاحيات | إبراج لإدارة العقارات",
  description: "تهيئة السياسات الأمنية الافتراضية للحسابات الجديدة، الأدوار التلقائية، وحدود الوصول المبدئية لمستخدمي ومشرفي المنصة",
};

export default function UsersPermissionsSettingsPage() {
  return <UsersPermissionsSettingsView />;
}
