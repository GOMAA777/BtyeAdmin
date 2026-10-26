import { Metadata } from "next";
import { LanguageRegionSettingsView } from "@/features/settings/components/language-region-settings-view";

export const metadata: Metadata = {
  title: "إعدادات اللغة والمنطقة | إبراج لإدارة العقارات",
  description: "تهيئة المعايير الإقليمية، اللغات المعتمدة، وضوابط التوقيت والتاريخ والعملات على مستوى منصة ابراج",
};

export default function LanguageRegionSettingsPage() {
  return <LanguageRegionSettingsView />;
}
