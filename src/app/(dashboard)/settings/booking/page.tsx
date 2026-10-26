import { Metadata } from "next";
import { BookingSettingsView } from "@/features/settings/components/booking-settings-view";

export const metadata: Metadata = {
  title: "إعدادات الحجوزات | إبراج",
  description: "إدارة القواعد التشغيلية الموحدة والمعايير الافتراضية للحجوزات",
};

export default function BookingSettingsPage() {
  return <BookingSettingsView />;
}
