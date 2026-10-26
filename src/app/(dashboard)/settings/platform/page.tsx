import { Metadata } from "next";
import { PlatformSettingsView } from "@/features/settings/components/platform-settings-view";

export const metadata: Metadata = {
  title: "إعدادات المنصة | إبراج لإدارة العقارات",
  description: "إدارة القواعد التشغيلية الموحدة والمعايير الافتراضية المطبقة على عقارات ووحدات ومحافظ الملاك",
};

export default function PlatformSettingsPage() {
  return <PlatformSettingsView />;
}
