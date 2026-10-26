import { Metadata } from "next";
import { SettingsOverviewView } from "@/features/settings/components/settings-overview-view";

export const metadata: Metadata = {
  title: "الإعدادات | إبراج لإدارة العقارات",
  description: "إدارة إعدادات المنصة وقواعد التشغيل والتكاملات والأمان",
};

export default function SettingsPage() {
  return <SettingsOverviewView />;
}
