import { Metadata } from "next";
import { IntegrationsSettingsView } from "@/features/settings/components/integrations-settings-view";

export const metadata: Metadata = {
  title: "التكاملات والربط السحابي | إبراج لإدارة العقارات",
  description: "إدارة الاتصال مع منصات الحجز العالمية (OTA) وبوابات الدفع والخرائط والرسائل السحابية",
};

export default function IntegrationsSettingsPage() {
  return <IntegrationsSettingsView />;
}
