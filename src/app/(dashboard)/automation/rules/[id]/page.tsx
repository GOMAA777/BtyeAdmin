import { RuleDetailView } from "@/features/automation/components/rules/rule-detail-view";
import { initialAutomationRules } from "@/features/automation/data/mock-automation";
import { automationRuleStaticParams } from "@/lib/static-params";
import type { AutomationRule } from "@/features/automation/types";

export const metadata = {
  title: "تفاصيل قاعدة الأتمتة | منصة إدارة العقارات",
  description: "استعراض معايير تشغيل وسجل العمليات اللحظي لقاعدة الأتمتة",
};

export function generateStaticParams() {
  return automationRuleStaticParams();
}

const fallbackRule: AutomationRule = {
  id: "AUT-101",
  ruleCode: "AUT-101",
  title: "قاعدة أتمتة مخصصة",
  description: "قاعدة أتمتة مسجلة في محرك المنظومة المركزي",
  category: "self_checkin",
  categoryLabel: "وصول ذاتي وكود الدخول",
  triggerType: "before_checkin_24h",
  triggerLabel: "قبل الوصول بـ 24 ساعة",
  triggerTime: "الساعة 03:00 م",
  actionSummary: "إرسال رسالة تفاصيل الوصول عبر WhatsApp",
  actionType: "whatsapp",
  scope: "جميع العقارات",
  status: "active",
  statusLabel: "مفعلة",
  lastExecution: "لم تنفذ بعد",
  successRate: "100%",
  creatorName: "مدير النظام",
  createdAt: "اليوم",
};

export default async function RuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rule =
    initialAutomationRules.find((r) => r.id === id) || {
      ...fallbackRule,
      id,
      ruleCode: id,
    };

  return <RuleDetailView rule={rule} />;
}
