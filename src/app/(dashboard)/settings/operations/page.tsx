import { Metadata } from "next";
import { OperationsSettingsView } from "@/features/settings/components/operations-settings-view";

export const metadata: Metadata = {
  title: "إعدادات التشغيل | إبراج",
  description: "تهيئة محرك التدفقات التشغيلية المؤتمتة بين الحجوزات، التنظيف، والصيانة",
};

export default function OperationsSettingsPage() {
  return <OperationsSettingsView />;
}
