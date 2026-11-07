import type { Metadata } from "next";
import { NotificationsView } from "@/features/notifications/components/notifications-view";

export const metadata: Metadata = {
  title: "مركز الإشعارات والتنبيهات | منصة BYTE HOME",
  description: "المتابعة اللحظية والإدارة الكاملة لجميع تنبيهات الحجوزات، بلاغات الصيانة، الفواتير المالية، ورسائل الأتمتة",
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
