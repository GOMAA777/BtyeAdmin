import { Metadata } from "next";
import { CentralBillingSettingsView } from "@/features/settings/components/billing-settings-view";

export const metadata: Metadata = {
  title: "إعدادات الدفع والفوترة المركزية | إبراج لإدارة العقارات",
  description: "تهيئة بوابات الدفع الإلكتروني وقواعد ضريبة القيمة المضافة ZATCA والتحصيل الآلي",
};

export default function CentralBillingSettingsPage() {
  return <CentralBillingSettingsView />;
}
