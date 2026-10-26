import { Metadata } from "next";
import { IntegrationDetailsView } from "@/features/settings/components/integration-details-view";

export const metadata: Metadata = {
  title: "تفاصيل التكامل - Booking.com | إبراج لإدارة العقارات",
  description: "إعدادات الربط المباشر ونطاقات المزامنة وسجلات التدقيق الميداني لمنصة Booking.com",
};

export default function BookingComDetailsPage() {
  return <IntegrationDetailsView />;
}
