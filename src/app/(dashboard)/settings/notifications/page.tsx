import { Metadata } from "next";
import { NotificationsSettingsView } from "@/features/settings/components/notifications-settings-view";

export const metadata: Metadata = {
  title: "إعدادات الإشعارات | إبراج لإدارة العقارات",
  description:
    "تحديد وضبط الأحداث التشغيلية التي تولد إشعارات فورية وتوزيعها عبر قنوات الإرسال المعتمدة على مستوى المنصة",
};

export default function NotificationsSettingsPage() {
  return <NotificationsSettingsView />;
}
