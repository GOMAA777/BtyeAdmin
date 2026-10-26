import { Metadata } from "next";
import { WhatsAppSettingsView } from "@/features/settings/components/whatsapp-settings-view";

export const metadata: Metadata = {
  title: "إعدادات WhatsApp | إبراج لإدارة العقارات",
  description: "إدارة ربط مزود خدمة WhatsApp Business API، ضوابط الأتمتة المباشرة، وحوكمة وتيرة الإرسال",
};

export default function WhatsAppSettingsPage() {
  return <WhatsAppSettingsView />;
}
