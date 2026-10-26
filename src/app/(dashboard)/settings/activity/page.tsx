import { Metadata } from "next";
import { ActivityLogSettingsView } from "@/features/settings/components/activity-log-settings-view";

export const metadata: Metadata = {
  title: "إعدادات السجل والنشاط | إبراج لإدارة العقارات",
  description: "تهيئة محرك التدقيق الأمني، وضوابط أرشفة الأحداث التشغيلية، وسياسات الامتثال التنظيمي لحماية بيانات المنصة",
};

export default function ActivityLogSettingsPage() {
  return <ActivityLogSettingsView />;
}
