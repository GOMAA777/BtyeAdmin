import { Metadata } from "next";
import { GeneralSettingsView } from "@/features/settings/components/general-settings-view";

export const metadata: Metadata = {
  title: "الإعدادات العامة | إبراج لإدارة العقارات",
  description: "إدارة البيانات الأساسية وهوية المنصة، معلومات الدعم الفني، وحالة التشغيل والصيانة",
};

export default function GeneralSettingsPage() {
  return <GeneralSettingsView />;
}
