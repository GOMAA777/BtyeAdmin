"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";
import {
  Edit,
  Pause,
  Play,
  Trash2,
  History,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sliders,
  Zap,
  GitBranch,
  Check,
  KeyRound,
  Send,
  Eye,
  Building2,
  ShieldCheck,
  Radio,
  Smartphone,
  Lock,
  Calendar,
  RotateCcw,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";
import { AutomationRule } from "../../types";
import { PauseRuleModal } from "./modals/pause-rule-modal";
import { ActivateRuleModal } from "./modals/activate-rule-modal";
import { DeleteRuleModal } from "./modals/delete-rule-modal";
import { RetryExecutionModal } from "../logs/modals/retry-execution-modal";

interface RuleDetailViewProps {
  rule: AutomationRule;
}

export function RuleDetailView({ rule: initialRule }: RuleDetailViewProps) {
  const router = useRouter();
  const [rule, setRule] = useState<AutomationRule>(initialRule);
  useSetBreadcrumbTitle(rule.title, `#${rule.ruleCode}`);

  // Modals state
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [retryingLogId, setRetryingLogId] = useState<string | null>(null);

  const handlePauseConfirm = () => {
    setShowPauseModal(false);
    setRule((prev) => ({
      ...prev,
      status: "paused",
      statusLabel: "متوقفة",
    }));
    toast.success(`تم إيقاف قاعدة الأتمتة (${rule.ruleCode}) بنجاح.`);
  };

  const handleActivateConfirm = () => {
    setShowActivateModal(false);
    setRule((prev) => ({
      ...prev,
      status: "active",
      statusLabel: "مفعلة",
    }));
    toast.success(`تم تفعيل قاعدة الأتمتة (${rule.ruleCode}) بنجاح.`);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    toast.success(`تم حذف قاعدة الأتمتة (${rule.ruleCode}) نهائياً.`);
    router.push("/automation/");
  };

  const handleRetryConfirm = () => {
    setShowRetryModal(false);
    toast.success(`تمت إعادة جدولة العملية ${retryingLogId || "EX-8488"} بنجاح.`);
    setRetryingLogId(null);
  };

  return (
    <div className="space-y-6 font-cairo text-right" dir="rtl">
      {/* 1. PAGE HEADER BAR (Figma node 1:23177) */}
      <div className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Right side in RTL: Title & Badges & Description */}
        <div className="flex items-start gap-3">
          <BackButton
            fallbackHref="/automation/"
            className="w-10 h-10 rounded-xl bg-[#f1f5eb] hover:bg-[#e5eae0] text-[#34422a] flex items-center justify-center transition-colors shrink-0 mt-0.5 cursor-pointer"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[24px] font-semibold text-[#181d17] tracking-[-0.6px] leading-[34px]">
                تفاصيل قاعدة الأتمتة
              </h1>
              <span className="bg-[#e5eae0] text-[#454840] text-[11px] font-semibold px-[10px] py-[4px] rounded-full tracking-[0.55px] whitespace-nowrap">
                #{rule.ruleCode || "AUT-102"}
              </span>
              {rule.status === "active" ? (
                <span className="bg-[#d8e8cb] text-[#34422a] text-[11px] font-semibold px-[12px] py-[4px] rounded-full inline-flex items-center gap-[6px] whitespace-nowrap">
                  <span>مفعلة</span>
                  <span className="bg-[#4b5940] size-[8px] rounded-full inline-block" />
                </span>
              ) : (
                <span className="bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold px-[12px] py-[4px] rounded-full inline-flex items-center gap-[6px] whitespace-nowrap">
                  <span>متوقفة</span>
                  <span className="bg-[#ba1a1a] size-[8px] rounded-full inline-block" />
                </span>
              )}
            </div>
            <p className="text-[#454840] text-[13px] font-normal leading-[20px] mt-1">
              استعراض معايير التشغيل ومحفزات الإطلاق وسجل العمليات اللحظي لمحرك الأتمتة المركزي.
            </p>
          </div>
        </div>

        {/* Left side in RTL: Action Button Group */}
        <div className="flex items-center gap-2 flex-wrap self-end lg:self-center">
          {/* Button 1: Edit Rule */}
          <Link
            href={`/automation/rules/${rule.ruleCode || "AUT-102"}/edit/`}
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white text-[14px] font-semibold h-[44px] px-[20px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[8px] transition-colors"
          >
            <span>تعديل القاعدة</span>
            <Edit className="size-[15px]" />
          </Link>

          {/* Button 2: Pause or Activate Rule */}
          {rule.status === "active" ? (
            <button
              type="button"
              onClick={() => setShowPauseModal(true)}
              className="bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#34422a] text-[14px] font-semibold h-[44px] px-[20px] rounded-[12px] inline-flex items-center gap-[8px] transition-colors cursor-pointer"
            >
              <span>إيقاف القاعدة</span>
              <Pause className="size-[15px]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowActivateModal(true)}
              className="bg-[#d8e8cb] hover:bg-[#c6dcbe] text-[#34422a] text-[14px] font-semibold h-[44px] px-[20px] rounded-[12px] inline-flex items-center gap-[8px] transition-colors cursor-pointer"
            >
              <span>تفعيل القاعدة</span>
              <Play className="size-[15px]" />
            </button>
          )}

          {/* Button 3: Full Audit Log */}
          <Link
            href="/automation/?tab=logs"
            className="bg-white hover:bg-[#f6fbf1] text-[#4b5940] text-[14px] font-semibold h-[44px] px-[20px] rounded-[12px] border border-[#e5eae0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[8px] transition-colors"
          >
            <span>سجل التدقيق الكامل</span>
            <FileText className="size-[14px]" />
          </Link>
        </div>
      </div>

      {/* 2. Execution Statistics Cards (Factual Counts Only) (Figma node 1:23209) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {/* Card 1: Total executions (إجمالي التنفيذ) */}
        <div className="bg-white rounded-[16px] p-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">إجمالي التنفيذ</span>
            <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#4b5940]">
              <History className="size-[15px]" />
            </div>
          </div>
          <div className="pt-[12px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">142</span>
              <span className="text-[13px] font-normal text-[#454840] leading-[20px]">عملية</span>
            </div>
            <p className="text-[11px] font-medium text-[#75786f] leading-[16px] mt-1">
              منذ إنشاء القاعدة في 12 يناير 2026
            </p>
          </div>
        </div>

        {/* Card 2: Successful executions (عمليات ناجحة) */}
        <div className="bg-white rounded-[16px] p-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">عمليات ناجحة</span>
            <div className="size-[32px] rounded-[8px] bg-[#d8e8cb] flex items-center justify-center text-[#34422a]">
              <CheckCircle2 className="size-[15px]" />
            </div>
          </div>
          <div className="pt-[12px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">139</span>
              <span className="text-[13px] font-normal text-[#454840] leading-[20px]">عملية</span>
            </div>
            <div className="mt-1">
              <span className="inline-block bg-[#d8e8cb] text-[#121f0d] text-[11px] font-medium px-[8px] py-[2px] rounded-full leading-[16px]">
                97.9% نسبة الإنجاز
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Incomplete executions (عمليات غير مكتملة) */}
        <div className="bg-white rounded-[16px] p-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">عمليات غير مكتملة</span>
            <div className="size-[32px] rounded-[8px] bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
              <AlertCircle className="size-[15px]" />
            </div>
          </div>
          <div className="pt-[12px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">3</span>
              <span className="text-[13px] font-normal text-[#454840] leading-[20px]">عمليات</span>
            </div>
            <div className="mt-1">
              <span className="inline-block bg-[#ffdad6] text-[#93000a] text-[11px] font-medium px-[8px] py-[2px] rounded-full leading-[16px]">
                تمت معالجتها يدويًا
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending / Scheduled (قيد الانتظار) */}
        <div className="bg-white rounded-[16px] p-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#454840]">قيد الانتظار</span>
            <div className="size-[32px] rounded-[8px] bg-[#e5eae0] flex items-center justify-center text-[#454840]">
              <Clock className="size-[15px]" />
            </div>
          </div>
          <div className="pt-[12px]">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-[30px] font-bold text-[#181d17] leading-[42px]">8</span>
              <span className="text-[13px] font-normal text-[#454840] leading-[20px]">مجدولة</span>
            </div>
            <p className="text-[11px] font-medium text-[#75786f] leading-[16px] mt-1">
              خلال الـ 24 ساعة القادمة
            </p>
          </div>
        </div>
      </div>

      {/* 3. Two-Column Main Layout (Right 8 cols = ~66% / Left 4 cols = ~34%) (Figma node 1:23276) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        {/* Right / Main Area (8 of 12 cols) (Figma node 1:23277) */}
        <div className="lg:col-span-8 space-y-[24px]">
          {/* Card 1: Rule Specifications (مواصفات القاعدة ومعايير المحرك) (Figma node 1:23278) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] space-y-[24px]">
            {/* Header with real-time processing badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <Sliders className="size-[16.5px] text-[#181d17]" />
                <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  مواصفات القاعدة ومعايير المحرك
                </h2>
              </div>
              <span className="bg-white border border-[#e5eae0] text-[#4b5940] text-[11px] font-medium px-[10px] py-[4px] rounded-[6px] shadow-xs">
                معالجة فورية
              </span>
            </div>

            {/* Trigger Block */}
            <div className="space-y-[8px]">
              <div className="flex items-center gap-[8px]">
                <Zap className="size-[15px] text-[#34422a]" />
                <span className="text-[14px] font-semibold text-[#34422a] leading-[20px]">
                  المحفّز وموعد الإطلاق اللحظي
                </span>
              </div>
              <div className="bg-[#f6fbf1] rounded-[12px] p-[16px] min-h-[76px] flex items-center gap-[12px]">
                <span className="size-[11px] rounded-full bg-[#34422a] shrink-0" />
                <p className="text-[14px] font-semibold text-[#181d17] leading-[22px]">
                  قبل موعد الوصول بـ 24 ساعة (عند تمام الساعة 03:00 مساءً بتوقيت الرياض GMT+3)
                </p>
              </div>
            </div>

            {/* Conditions Block */}
            <div className="space-y-[8px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <GitBranch className="size-[15px] text-[#34422a]" />
                  <span className="text-[14px] font-semibold text-[#34422a] leading-[20px]">
                    شروط التفعيل المنطقية (Conditions)
                  </span>
                </div>
                <span className="bg-[#d8e8cb] text-[#34422a] text-[11px] font-bold px-[8px] py-[2px] rounded-[4px]">
                  تطابق تام: تلازمي
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px]">
                {/* Condition 1 */}
                <div className="bg-[#f6fbf1] rounded-[12px] p-[16px] min-h-[78px] flex flex-col justify-between">
                  <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                    الشرط الأول: حالة الحجز
                  </span>
                  <div className="flex items-center gap-[8px] mt-1">
                    <Check className="size-[14px] text-[#181d17]" />
                    <span className="text-[14px] font-semibold text-[#181d17] leading-[22px]">
                      قادم مؤكد
                    </span>
                  </div>
                </div>

                {/* Condition 2 */}
                <div className="bg-[#f6fbf1] rounded-[12px] p-[16px] min-h-[78px] flex flex-col justify-between">
                  <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                    الشرط الثاني: طريقة الدخول الذكي
                  </span>
                  <div className="flex items-center gap-[8px] mt-1">
                    <KeyRound className="size-[15px] text-[#181d17]" />
                    <span className="text-[14px] font-semibold text-[#181d17] leading-[22px]">
                      كود مخصص لكل حجز
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Block */}
            <div className="space-y-[12px]">
              <div className="flex items-center gap-[8px]">
                <Send className="size-[15px] text-[#34422a]" />
                <span className="text-[14px] font-semibold text-[#34422a] leading-[20px]">
                  الإجراءات التلقائية المعتمدة
                </span>
              </div>

              {/* Action 1 & WhatsApp Preview */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[16px] space-y-[16px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <span className="size-[24px] rounded-full bg-[#4b5940] text-white text-[11px] font-medium flex items-center justify-center shrink-0">
                      ١
                    </span>
                    <h3 className="text-[16px] font-bold text-[#181d17] leading-[26px]">
                      إرسال قالب WhatsApp: تفاصيل الوصول والأقفال
                    </h3>
                  </div>
                  <span className="bg-[#ebefe6] text-[#454840] text-[11px] font-medium px-[8px] py-[2px] rounded-[4px] whitespace-nowrap">
                    Meta Cloud API
                  </span>
                </div>

                <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                  المستلم: النزيل المسجل في الحجز عبر رقم الهاتف الخليوي المعتمد لدى منصة BYTE HOME.
                </p>

                {/* WhatsApp Message Preview Box */}
                <div className="bg-white rounded-[12px] p-[16px] max-w-[576px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0]/60 space-y-[8px]">
                  <div className="bg-[#f1f5eb] rounded-[8px] px-[12px] py-[6px] flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <Eye className="size-[13.5px] text-[#181d17]" />
                      <span className="text-[11px] font-bold text-[#181d17] leading-[16px]">
                        معاينة نص الرسالة الصادرة للنزيل
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                      عربي • مشفر
                    </span>
                  </div>

                  <div className="bg-[rgba(246,251,241,0.5)] rounded-[8px] p-[12px] space-y-[8px] text-[13px] leading-[21.13px] text-[#181d17]">
                    <p>
                      <span>مرحباً </span>
                      <span className="bg-[#d8e8cb] text-[#34422a] font-bold px-[6px] py-[2px] rounded-[4px] mx-1 inline-block">
                        &#123;guest_name&#125;
                      </span>
                      <span>، يسعدنا استقبالكم في </span>
                      <span className="bg-[#d8e8cb] text-[#34422a] font-bold px-[6px] py-[2px] rounded-[4px] mx-1 inline-block">
                        &#123;property_name&#125;
                      </span>
                      <span>.</span>
                    </p>
                    <p>
                      <span>موعد الدخول المجدول: </span>
                      <span className="bg-[#d8e8cb] text-[#34422a] font-bold px-[6px] py-[2px] rounded-[4px] mx-1 inline-block">
                        &#123;arrival_time&#125;
                      </span>
                      <span>.</span>
                    </p>
                    <p>
                      <span>رمز المرور الرقمي للباب الذكي: </span>
                      <span className="bg-[#d8e8cb] text-[#34422a] font-bold px-[6px] py-[2px] rounded-[4px] mx-1 inline-block font-mono tracking-wider">
                        &#123;access_code&#125;
                      </span>
                    </p>
                    <p className="text-[11px] font-medium text-[#75786f] leading-[16px] pt-1">
                      الرمز مفعّل فقط خلال فترة إقامتكم المسجلة. نتمنى لكم إقامة طيبة.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action 2: Audit Logging */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[16px] flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className="size-[24px] rounded-full bg-[#4b5940] text-white text-[11px] font-medium flex items-center justify-center shrink-0">
                    ٢
                  </span>
                  <span className="text-[14px] font-bold text-[#181d17] leading-[22px]">
                    تسجيل حدث رسمي في سجل التدقيق والحوكمة
                  </span>
                </div>
                <CheckCircle2 className="size-[18px] text-[#34422a]" />
              </div>
            </div>

            {/* Scope and Last Execution Strip (Figma node 1:23383) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] pt-[8px]">
              {/* Scope Card */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex items-start gap-[12px]">
                <Building2 className="size-[18px] text-[#34422a] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    نطاق السريان والشمول
                  </span>
                  <p className="text-[14px] font-bold text-[#181d17] leading-[22px] mt-1">
                    جميع العقارات المسجلة بالمنصة
                  </p>
                  <p className="text-[11px] font-medium text-[#75786f] leading-[16px] mt-0.5">
                    يشمل 18 عقاراً معتمداً • 142 وحدة سكنية
                  </p>
                </div>
              </div>

              {/* Last Execution Card */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex items-start gap-[12px]">
                <Clock className="size-[18px] text-[#34422a] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    آخر تشغيل ناجح
                  </span>
                  <p className="text-[14px] font-bold text-[#181d17] leading-[22px] mt-1">
                    18 سبتمبر 2026 — 09:00 ص
                  </p>
                  <p className="text-[11px] font-medium text-[#75786f] leading-[16px] mt-0.5">
                    حجز BK-10482 • الوحدة 204 • عمارة النخيل
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Recent Executions Table (أحدث عمليات التنفيذ اللحظية) (Figma node 1:23402) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] space-y-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <History className="size-[16.5px] text-[#181d17]" />
                <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  أحدث عمليات التنفيذ اللحظية
                </h2>
              </div>
              <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                عرض آخر 4 عمليات
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#f6fbf1] text-[#454840] text-[12px] font-bold h-[56px] rounded-[12px]">
                    <th className="py-[12px] px-[16px] rounded-r-[12px] whitespace-nowrap">المعرف</th>
                    <th className="py-[12px] px-[16px] whitespace-nowrap">الحجز والنزيل</th>
                    <th className="py-[12px] px-[16px] whitespace-nowrap">العقار والوحدة</th>
                    <th className="py-[12px] px-[16px] whitespace-nowrap">وقت التنفيذ</th>
                    <th className="py-[12px] px-[16px] whitespace-nowrap">الإجراء</th>
                    <th className="py-[12px] px-[16px] whitespace-nowrap">الحالة</th>
                    <th className="py-[12px] px-[16px] rounded-l-[12px] text-center whitespace-nowrap">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebefe6] text-[13px]">
                  {/* Row 1: EX-8492 */}
                  <tr className="hover:bg-[#f6fbf1]/50 transition-colors">
                    <td className="py-[16px] px-[16px] font-bold text-[#181d17] whitespace-nowrap">
                      EX-8492
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <div className="font-bold text-[#181d17] leading-[20px]">فيصل السبيعي</div>
                      <div className="text-[11px] text-[#75786f] font-normal leading-[16px]">BK-10482</div>
                    </td>
                    <td className="py-[16px] px-[16px] text-[#181d17] whitespace-nowrap leading-[20px]">
                      عمارة النخيل • و-204
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      18 سبت 2026 - 09:00 ص
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      واتساب + توثيق
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <span className="bg-[#d8e8cb] text-[#121f0d] text-[11px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                        <span>نجح</span>
                        <span className="size-[6px] rounded-full bg-[#34422a]" />
                      </span>
                    </td>
                    <td className="py-[16px] px-[16px] text-center whitespace-nowrap">
                      <Link
                        href="/automation/logs/EX-8492/"
                        className="inline-flex items-center justify-center size-[32px] rounded-[8px] hover:bg-[#ebefe6] text-[#4b5940] transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="size-[16px]" />
                      </Link>
                    </td>
                  </tr>

                  {/* Row 2: EX-8491 */}
                  <tr className="hover:bg-[#f6fbf1]/50 transition-colors">
                    <td className="py-[16px] px-[16px] font-bold text-[#181d17] whitespace-nowrap">
                      EX-8491
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <div className="font-bold text-[#181d17] leading-[20px]">سارة المنصور</div>
                      <div className="text-[11px] text-[#75786f] font-normal leading-[16px]">BK-10478</div>
                    </td>
                    <td className="py-[16px] px-[16px] text-[#181d17] whitespace-nowrap leading-[20px]">
                      أبراج الياسمين • و-512
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      18 سبت 2026 - 08:30 ص
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      واتساب + توثيق
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <span className="bg-[#d8e8cb] text-[#121f0d] text-[11px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                        <span>نجح</span>
                        <span className="size-[6px] rounded-full bg-[#34422a]" />
                      </span>
                    </td>
                    <td className="py-[16px] px-[16px] text-center whitespace-nowrap">
                      <Link
                        href="/automation/logs/EX-8491/"
                        className="inline-flex items-center justify-center size-[32px] rounded-[8px] hover:bg-[#ebefe6] text-[#4b5940] transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="size-[16px]" />
                      </Link>
                    </td>
                  </tr>

                  {/* Row 3: Failure (EX-8488) */}
                  <tr className="bg-[rgba(255,218,214,0.2)] hover:bg-[rgba(255,218,214,0.35)] transition-colors">
                    <td className="py-[16px] px-[16px] font-bold text-[#181d17] whitespace-nowrap">
                      EX-8488
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <div className="font-bold text-[#181d17] leading-[20px]">خالد العمري</div>
                      <div className="text-[11px] text-[#75786f] font-normal leading-[16px]">BK-10469</div>
                    </td>
                    <td className="py-[16px] px-[16px] text-[#181d17] whitespace-nowrap leading-[20px]">
                      فلل حطين • ف-08
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      17 سبت 2026 - 03:00 م
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      واتساب + توثيق
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <span className="bg-[#ffdad6] text-[#93000a] text-[11px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                        <span>فشل (رقم هاتف)</span>
                        <span className="size-[6px] rounded-full bg-[#ba1a1a]" />
                      </span>
                    </td>
                    <td className="py-[16px] px-[16px] text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setRetryingLogId("EX-8488");
                          setShowRetryModal(true);
                        }}
                        className="inline-flex items-center justify-center size-[32px] rounded-[8px] hover:bg-red-100 text-[#ba1a1a] transition-colors cursor-pointer"
                        title="إعادة المحاولة يدوياً"
                      >
                        <RotateCcw className="size-[15px]" />
                      </button>
                    </td>
                  </tr>

                  {/* Row 4: EX-8485 */}
                  <tr className="hover:bg-[#f6fbf1]/50 transition-colors">
                    <td className="py-[16px] px-[16px] font-bold text-[#181d17] whitespace-nowrap">
                      EX-8485
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <div className="font-bold text-[#181d17] leading-[20px]">عبدالله الدوسري</div>
                      <div className="text-[11px] text-[#75786f] font-normal leading-[16px]">BK-10464</div>
                    </td>
                    <td className="py-[16px] px-[16px] text-[#181d17] whitespace-nowrap leading-[20px]">
                      مجمع السدرة • و-103
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      17 سبت 2026 - 01:15 م
                    </td>
                    <td className="py-[16px] px-[16px] text-[#454840] whitespace-nowrap leading-[20px]">
                      واتساب + توثيق
                    </td>
                    <td className="py-[16px] px-[16px] whitespace-nowrap">
                      <span className="bg-[#d8e8cb] text-[#121f0d] text-[11px] font-semibold px-[10px] py-[4px] rounded-full inline-flex items-center gap-[4px]">
                        <span>نجح</span>
                        <span className="size-[6px] rounded-full bg-[#34422a]" />
                      </span>
                    </td>
                    <td className="py-[16px] px-[16px] text-center whitespace-nowrap">
                      <Link
                        href="/automation/logs/EX-8485/"
                        className="inline-flex items-center justify-center size-[32px] rounded-[8px] hover:bg-[#ebefe6] text-[#4b5940] transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="size-[16px]" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Left Sidebar Area (4 of 12 cols = ~34%) (Figma node 1:23516) */}
        <div className="lg:col-span-4 space-y-[24px]">
          {/* Card 1: Governance and Audit Metadata Card (Figma node 1:23517) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] space-y-[16px]">
            <div className="flex items-center gap-[8px]">
              <ShieldCheck className="size-[17px] text-[#181d17]" />
              <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                بيانات الحوكمة والتحكم
              </h3>
            </div>

            <div className="space-y-[12px]">
              {/* Creator */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[12px] flex items-center justify-between">
                <span className="text-[13px] font-normal text-[#454840] leading-[20px]">
                  مُنشئ القاعدة
                </span>
                <span className="text-[13px] font-bold text-[#181d17] leading-[20px]">
                  {rule.creatorName || "م. طارق العسيري"}
                </span>
              </div>

              {/* Created At */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[12px] flex items-center justify-between">
                <span className="text-[13px] font-normal text-[#454840] leading-[20px]">
                  تاريخ الإنشاء الأصلي
                </span>
                <span className="text-[13px] font-semibold text-[#181d17] leading-[20px]">
                  {rule.createdAt || "12 يناير 2026"}
                </span>
              </div>

              {/* Last Modified */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[12px] flex items-center justify-between">
                <span className="text-[13px] font-normal text-[#454840] leading-[20px]">
                  آخر تعديل معتمد
                </span>
                <div className="text-left">
                  <div className="text-[13px] font-semibold text-[#181d17] leading-[20px]">
                    {rule.lastModified || "10 أغسطس 2026"}
                  </div>
                  <div className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                    بواسطة: محمد أحمد
                  </div>
                </div>
              </div>

              {/* Compliance Banner */}
              <div className="bg-[#d8e8cb] rounded-[12px] p-[14px] flex items-start gap-[10px]">
                <ShieldCheck className="size-[19px] text-[#34422a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[12px] font-bold text-[#34422a] leading-[18px]">
                    محمي بحوكمة الامتثال المؤسسي
                  </h4>
                  <p className="text-[11px] font-medium text-[#34422a] leading-[17.88px] mt-1">
                    سجلات التنفيذ التاريخية غير قابلة للحذف أو التعديل الرجعي وفق اشتراطات الهيئة العامة للعقار.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Real-time Channel Health Card (Figma node 1:23551) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] space-y-[16px]">
            <div className="flex items-center gap-[8px]">
              <Radio className="size-[20px] text-[#181d17]" />
              <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                قنوات الاتصال اللحظية
              </h3>
            </div>

            <div className="space-y-[12px]">
              {/* WhatsApp Meta Cloud */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[12px] flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <div className="size-[32px] rounded-[8px] bg-[#d8e8cb] flex items-center justify-center text-[#34422a] shrink-0">
                    <Smartphone className="size-[15px]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#181d17] leading-[18px]">
                      WhatsApp Meta Cloud
                    </div>
                    <div className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                      بوابة الرسائل الرسمية
                    </div>
                  </div>
                </div>
                <span className="bg-[#d8e8cb] text-[#121f0d] text-[11px] font-semibold px-[8px] py-[2px] rounded-full whitespace-nowrap">
                  100% جهوزية
                </span>
              </div>

              {/* SmartLock Bridge */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[12px] flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#4b5940] shrink-0">
                    <Lock className="size-[15px]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-[#181d17] leading-[18px]">
                      SmartLock Bridge
                    </div>
                    <div className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                      منظومة الأقفال الذكية
                    </div>
                  </div>
                </div>
                <span className="bg-[#d8e8cb] text-[#121f0d] text-[11px] font-semibold px-[8px] py-[2px] rounded-full whitespace-nowrap">
                  متزامن لحظياً
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Upcoming Scheduled Triggers Card (Figma node 1:23583) */}
          <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] space-y-[16px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <Calendar className="size-[18px] text-[#181d17]" />
                <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  العمليات القادمة المجدولة
                </h3>
              </div>
              <span className="text-[11px] font-bold text-[#34422a] bg-[#f1f5eb] px-[8px] py-[2px] rounded-[6px]">
                ٢ عمليات
              </span>
            </div>

            <div className="space-y-[8px]">
              {/* Item 1 */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[10px] flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[12px] font-bold text-[#181d17] leading-[18px]">
                      حجز BK-10490
                    </span>
                    <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                      • برج العليا 14
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-[#454840] leading-[16px] mt-0.5">
                    النزيل: محمد بن عبد العزيز
                  </p>
                </div>
                <span className="bg-[#ebefe6] text-[#181d17] text-[11px] font-semibold px-[8px] py-[4px] rounded-[4px] whitespace-nowrap">
                  بعد 3 ساعات
                </span>
              </div>

              {/* Item 2 */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[10px] flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-[6px]">
                    <span className="text-[12px] font-bold text-[#181d17] leading-[18px]">
                      حجز BK-10495
                    </span>
                    <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                      • دارة الرمال 3
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-[#454840] leading-[16px] mt-0.5">
                    النزيل: د. هند الشمري
                  </p>
                </div>
                <span className="bg-[#ebefe6] text-[#181d17] text-[11px] font-semibold px-[8px] py-[4px] rounded-[4px] whitespace-nowrap">
                  بعد 7 ساعات
                </span>
              </div>
            </div>

            {/* Link to Full Bookings and Tasks Schedule */}
            <div className="pt-[6px] border-t border-[#f1f5eb] text-center">
              <Link
                href="/bookings/"
                className="text-[11px] font-semibold text-[#34422a] hover:underline inline-block"
              >
                استعراض جدول الحجوزات والمهام الكامل ←
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & Action Modals */}
      {showPauseModal && (
        <PauseRuleModal
          isOpen={showPauseModal}
          onClose={() => setShowPauseModal(false)}
          onConfirm={handlePauseConfirm}
          rule={rule}
        />
      )}

      {showActivateModal && (
        <ActivateRuleModal
          isOpen={showActivateModal}
          onClose={() => setShowActivateModal(false)}
          onConfirm={handleActivateConfirm}
          rule={rule}
        />
      )}

      {showDeleteModal && (
        <DeleteRuleModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          rule={rule}
        />
      )}

      {showRetryModal && (
        <RetryExecutionModal
          isOpen={showRetryModal}
          onClose={() => {
            setShowRetryModal(false);
            setRetryingLogId(null);
          }}
          onConfirm={handleRetryConfirm}
        />
      )}
    </div>
  );
}
