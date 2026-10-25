"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";
import {
  Clock,
  Send,
  Building2,
  SlidersHorizontal,
  KeyRound,
  Wrench,
  DoorClosed,
  Shield,
  ShieldCheck,
  ChevronDown,
  Trash2,
  Play,
  Save,
  RotateCcw,
  Ban,
  History,
  Zap,
  Phone,
  MessageSquare,
  AlertTriangle,
  X,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";
import { AutomationRule } from "../../types";
import { PauseRuleModal } from "./modals/pause-rule-modal";

interface EditRuleViewProps {
  rule?: AutomationRule;
}

export function EditRuleView({ rule }: EditRuleViewProps) {
  const router = useRouter();

  // Form states initialized with rule values
  const [ruleCode] = useState(rule?.ruleCode || "AUT-102");
  const [ruleName, setRuleName] = useState(
    rule?.title || "إرسال تفاصيل الوصول الذاتي وموقع الوحدة"
  );
  useSetBreadcrumbTitle(`تعديل ${ruleName}`, `#${ruleCode}`);

  const [category, setCategory] = useState("وصول ذاتي وكود الدخول");
  const [description, setDescription] = useState(
    rule?.description ||
      "إرسال رسالة واتساب رسمية تتضمن موقع العقار الجغرافي، رقم الوحدة، وكود القفل الإلكتروني المشفر قبل موعد الدخول المحدد بـ 24 ساعة بدقة."
  );

  const [ruleStatus, setRuleStatus] = useState<"active" | "draft">(
    rule?.status === "draft" ? "draft" : "active"
  );
  const [isPaused, setIsPaused] = useState(rule?.status === "paused");
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);

  const [triggerEvent, setTriggerEvent] = useState("قبل موعد الوصول (Before Check-in)");
  const [triggerTimingOffset, setTriggerTimingOffset] = useState("قبل موعد الوصول المحدد");
  const [triggerHour, setTriggerHour] = useState("الساعة 3 م");

  const [conditionsMode, setConditionsMode] = useState<"all" | "any">("all");
  const [conditions, setConditions] = useState([
    { id: "c1", label: "مصدر الحجز", value: "Whatsapp .com" },
    { id: "c2", label: "طريقة كود الدخول", value: "كود مخصص لكل حجز" },
  ]);

  const [scope, setScope] = useState<"all" | "selected" | "geo">("all");
  const [safeSimulation, setSafeSimulation] = useState(true);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirm = useConfirm();

  const handleSimulate = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      toast.success(
        "تم تشغيل محاكاة القاعدة بنجاح: الحجز التجريبي مؤهل 100% ومطابق لكافة شروط الإطلاق!"
      );
    }, 850);
  };

  const handleDeleteCondition = (id: string, label: string) => {
    setConditions((prev) => prev.filter((c) => c.id !== id));
    toast.info(`تم حذف شرط "${label}" من معايير التفعيل`);
  };

  const handleAddAction = (actionTitle: string) => {
    toast.success(`تمت إضافة "${actionTitle}" إلى قائمة الإجراءات التلقائية`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "تأكيد حفظ تعديلات قاعدة الأتمتة",
      message: `هل أنت متأكد من حفظ التعديلات على قاعدة الأتمتة "${ruleName}" (#${ruleCode})؟ سيتم تحديث معايير الإطلاق المعتمدة.`,
      confirmLabel: "حفظ التعديلات",
      variant: "default",
    });
    if (!ok) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم حفظ تعديلات قاعدة الأتمتة بنجاح وتحديث معايير الجدولة القادمة!");
      router.push(`/automation/rules/${ruleCode}/`);
    }, 600);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* 1. Page Header Bar [1:22414] */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton
            fallbackHref={`/automation/rules/${ruleCode}/`}
            className="w-10 h-10 rounded-[12px] bg-[#ebefe6] hover:bg-[#dfe4db] flex items-center justify-center text-[#181d17] transition-colors"
          />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-semibold text-[#181d17] tracking-[-0.6px]">
                تعديل قاعدة الأتمتة
              </h1>
              {isPaused ? (
                <div className="bg-[rgba(255,218,214,0.6)] text-[#93000a] text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#ba1a1a]" />
                  معطلة مؤقتاً
                </div>
              ) : (
                <div className="bg-[#d8e8cb] text-[#5a6952] text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#4b5940]" />
                  مفعلة نشطة
                </div>
              )}
            </div>
            <p className="text-[13px] text-[#454840] leading-[20px] mt-1">
              تعديل محددات الإطلاق والشروط والإجراءات التلقائية المعتمدة للمنظومة المركزية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Pause / Disable Button */}
          <button
            type="button"
            onClick={() => {
              if (isPaused) {
                setIsPaused(false);
                toast.success("تم إعادة تفعيل قاعدة الأتمتة بنجاح!");
              } else {
                setIsPauseModalOpen(true);
              }
            }}
            className="bg-[rgba(255,218,214,0.6)] hover:bg-[rgba(255,218,214,0.85)] text-[#93000a] text-[14px] font-semibold h-[44px] px-4 rounded-[12px] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{isPaused ? "إلغاء التعطيل" : "تعطيل مؤقت"}</span>
            <Ban className="size-[15px]" />
          </button>

          {/* History / Logs Button */}
          <Link
            href={`/automation/rules/${ruleCode}/`}
            className="bg-[#ebefe6] hover:bg-[#dfe4db] text-[#181d17] text-[14px] font-semibold h-[44px] px-4 rounded-[12px] flex items-center gap-2 transition-colors"
          >
            <span>سجل تنفيذ القاعدة (142 عملية ناجحة)</span>
            <History className="size-[15px]" />
          </Link>
        </div>
      </div>

      {/* 2. Governance Warning Banner [1:22833] */}
      <div className="bg-[rgba(245,158,11,0.1)] rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <div className="flex items-start gap-4">
          <div className="bg-[rgba(245,158,11,0.2)] rounded-[12px] size-10 flex items-center justify-center text-[#78350f] shrink-0">
            <AlertTriangle className="size-[18px]" />
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="text-[#78350f] text-[18px] font-bold leading-[28px]">
              تنبيه الحوكمة: تعديل هذه القاعدة سيؤثر على عمليات التنفيذ القادمة المجدولة
            </h2>
            <p className="text-[#181d17] text-[14px] leading-[22.75px]">
              السجلات التاريخية لعمليات التنفيذ السابقة ستبقى محفوظة ومؤرشفة دون تغيير وفق سياسات
              الامتثال العقاري المؤسسي.
            </p>
            <div className="pt-2">
              <div className="bg-[rgba(255,255,255,0.8)] rounded-[8px] px-3 py-1.5 inline-flex items-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.02)]">
                <MessageSquare className="size-[14px] text-[#34422a]" />
                <span className="text-[#34422a] text-[12px] font-semibold">
                  34 رسالة WhatsApp مجدولة
                </span>
                <span className="text-[#454840] text-[12px]">
                  خلال الـ 24 ساعة القادمة سيتم تحديث معايير إطلاقها فور حفظ التعديل.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main 2-Column Responsive Workspace Grid [1:22439] */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* RIGHT COLUMN: Step-by-Step Rule Definition (Col 1 to 8) [1:22440] */}
          <div className="lg:col-span-8 space-y-6">
            {/* SECTION 01: بيانات القاعدة والتصنيف [1:22441] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              <div className="border-[#e5eae0] border-b pb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#e5eae0] rounded-[8px] size-7 flex items-center justify-center text-[#181d17]">
                    <SlidersHorizontal className="size-4" />
                  </div>
                  <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                    بيانات القاعدة والتصنيف
                  </h2>
                </div>
                <span className="text-[#75786f] text-[11px] font-medium">حقول إلزامية (*)</span>
              </div>

              <div className="space-y-4">
                {/* Rule Name */}
                <div className="space-y-1.5">
                  <label className="text-[14px] font-semibold text-[#181d17] block">
                    اسم القاعدة <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    required
                    className="w-full bg-[#f1f5eb] h-[44px] rounded-[12px] px-4 text-[14px] text-[#181d17] border-0 focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                    placeholder="إرسال تفاصيل الوصول الذاتي وموقع الوحدة"
                  />
                </div>

                {/* Category Tags */}
                <div className="space-y-2">
                  <label className="text-[14px] font-semibold text-[#181d17] block">
                    التصنيف التشغيلي <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "وصول ذاتي وكود الدخول", icon: KeyRound },
                      { label: "تشغيل وتنظيف", icon: Wrench },
                      { label: "تأكيد ومغادرة", icon: DoorClosed },
                      { label: "حوكمة وأمان", icon: Shield },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = category === item.label;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setCategory(item.label)}
                          className={`px-3.5 py-1.5 rounded-[12px] text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#34422a] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                              : "bg-[#ebefe6] text-[#454840] hover:bg-[#dfe4db]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <Icon className="size-3.5" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[14px] font-semibold text-[#181d17] block">
                    الوصف الإيضاحي للمشغلين
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#f1f5eb] rounded-[12px] px-4 py-3 text-[14px] text-[#181d17] leading-[22.75px] border-0 focus:outline-none focus:ring-1 focus:ring-[#34422a] resize-none min-h-[76px]"
                  />
                </div>

                {/* Initial Status Toggle */}
                <div className="space-y-2 pt-1">
                  <label className="text-[14px] font-semibold text-[#181d17] block">
                    الحالة التشغيلية الأولية
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Active */}
                    <div
                      onClick={() => setRuleStatus("active")}
                      className={`rounded-[12px] p-3 flex items-center justify-between cursor-pointer transition-all ${
                        ruleStatus === "active"
                          ? "bg-[rgba(216,232,203,0.4)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#34422a]/30"
                          : "bg-[#f1f5eb] border border-transparent hover:bg-[#ebefe6]"
                      }`}
                    >
                      <div className="text-right">
                        <div className="text-[#181d17] text-[12px] font-bold">مفعلة فور الحفظ</div>
                        <div className="text-[#454840] text-[13px] leading-[20px]">
                          تبدأ المعالجة مع أول حدث مؤهل
                        </div>
                      </div>
                      <div className="size-4 rounded-full border border-[#34422a] bg-white flex items-center justify-center shrink-0">
                        {ruleStatus === "active" && (
                          <div className="size-2.5 rounded-full bg-[#34422a]" />
                        )}
                      </div>
                    </div>

                    {/* Draft */}
                    <div
                      onClick={() => setRuleStatus("draft")}
                      className={`rounded-[12px] p-3 flex items-center justify-between cursor-pointer transition-all ${
                        ruleStatus === "draft"
                          ? "bg-[rgba(216,232,203,0.4)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#34422a]/30"
                          : "bg-[#f1f5eb] border border-transparent hover:bg-[#ebefe6]"
                      }`}
                    >
                      <div className="text-right">
                        <div className="text-[#181d17] text-[12px] font-semibold">
                          مسودة غير مفعلة
                        </div>
                        <div className="text-[#454840] text-[13px] leading-[20px]">
                          حفظ القاعدة للتعديل دون تنفيذ فعلي
                        </div>
                      </div>
                      <div className="size-4 rounded-full border border-[#767676] bg-white flex items-center justify-center shrink-0">
                        {ruleStatus === "draft" && (
                          <div className="size-2.5 rounded-full bg-[#34422a]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 02: المحفّز وموعد التشغيل (Trigger) [1:22506] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              <div className="border-[#e5eae0] border-b pb-4 flex items-center gap-2">
                <div className="bg-[#e5eae0] rounded-[8px] size-7 flex items-center justify-center text-[#181d17]">
                  <Zap className="size-4 text-[#34422a]" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  المحفّز وموعد التشغيل <span className="text-xs text-gray-400 font-normal">(Trigger)</span>
                </h2>
              </div>

              <div className="space-y-4">
                {/* Primary Trigger */}
                <div className="space-y-1.5">
                  <label className="text-[14px] font-semibold text-[#181d17] block">
                    الحدث المحفّز الرئيسي <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={triggerEvent}
                      onChange={(e) => setTriggerEvent(e.target.value)}
                      className="w-full bg-[#f1f5eb] h-[44px] rounded-[12px] px-4 text-[14px] font-semibold text-[#181d17] border-0 appearance-none focus:outline-none focus:ring-1 focus:ring-[#34422a] cursor-pointer"
                    >
                      <option value="قبل موعد الوصول (Before Check-in)">
                        قبل موعد الوصول (Before Check-in)
                      </option>
                      <option value="عند إنشاء حجز جديد مؤكد (Booking Confirmed)">
                        عند إنشاء حجز جديد مؤكد (Booking Confirmed)
                      </option>
                      <option value="قبل موعد المغادرة (Before Checkout)">
                        قبل موعد المغادرة (Before Checkout)
                      </option>
                      <option value="عند إتمام تسجيل الخروج (Checkout Completed)">
                        عند إتمام تسجيل الخروج (Checkout Completed)
                      </option>
                    </select>
                    <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#181d17] pointer-events-none" />
                  </div>
                </div>

                {/* Time-based Offset Config Box */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-[#181d17]" />
                      <span className="text-[#181d17] text-[12px] font-bold">
                        توقيت الإطلاق بالنسبة للحدث:
                      </span>
                    </div>
                    <span className="text-[#34422a] text-[11px] font-semibold">
                      توقيت الرياض القياسي (GMT+3)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <select
                        value={triggerTimingOffset}
                        onChange={(e) => setTriggerTimingOffset(e.target.value)}
                        className="w-full bg-white h-10 px-4 rounded-[8px] text-[12px] font-semibold text-[#181d17] appearance-none border-0 shadow-xs cursor-pointer focus:outline-none"
                      >
                        <option value="قبل موعد الوصول المحدد">قبل موعد الوصول المحدد</option>
                        <option value="في نفس موعد الوصول">في نفس موعد الوصول</option>
                        <option value="بعد موعد الوصول بـ ساعة">بعد موعد الوصول بـ ساعة</option>
                      </select>
                      <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-500 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        value={triggerHour}
                        onChange={(e) => setTriggerHour(e.target.value)}
                        className="w-full bg-white h-10 px-4 rounded-[8px] text-[12px] font-semibold text-[#181d17] appearance-none border-0 shadow-xs cursor-pointer focus:outline-none"
                      >
                        <option value="الساعة 3 م">الساعة 3 م</option>
                        <option value="الساعة 12 ظهراً">الساعة 12 ظهراً</option>
                        <option value="الساعة 1 ظهراً">الساعة 1 ظهراً</option>
                        <option value="الساعة 2 ظهراً">الساعة 2 ظهراً</option>
                        <option value="الساعة 4 م">الساعة 4 م</option>
                      </select>
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <p className="text-[#454840] text-[13px] leading-[20px] text-right">
                    سيتم إرسال الرسالة آلياً في تمام الساعة 03:00 مساءً من اليوم السابق لتاريخ حجز
                    النزيل.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 03: شروط التفعيل الدقيقة [1:22545] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              <div className="border-[#e5eae0] border-b pb-4 flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  شروط التفعيل الدقيقة
                </h2>
                <div className="bg-[#e5eae0] p-0.5 rounded-[12px] flex items-center">
                  <button
                    type="button"
                    onClick={() => setConditionsMode("all")}
                    className={`rounded-[8px] h-8 px-4 text-[11px] font-semibold transition-all ${
                      conditionsMode === "all"
                        ? "bg-[#34422a] text-white"
                        : "text-[#454840] hover:text-[#181d17]"
                    }`}
                  >
                    كافة الشروط
                  </button>
                  <button
                    type="button"
                    onClick={() => setConditionsMode("any")}
                    className={`rounded-[8px] h-8 px-4 text-[11px] font-medium transition-all ${
                      conditionsMode === "any"
                        ? "bg-[#34422a] text-white"
                        : "text-[#454840] hover:text-[#181d17]"
                    }`}
                  >
                    أي شرط
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {conditions.map((condition) => (
                  <div
                    key={condition.id}
                    className="bg-[#f1f5eb] h-[60px] rounded-[12px] px-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 shrink-0 min-w-[140px]">
                      <span className="size-2 rounded-full bg-[#34422a]" />
                      <span className="text-[#181d17] text-[12px] font-semibold">
                        {condition.label}
                      </span>
                    </div>

                    <div className="relative flex-1 max-w-[340px]">
                      <div className="bg-white h-9 rounded-[8px] px-4 flex items-center justify-between text-[13px] font-semibold text-[#181d17] shadow-xs cursor-pointer">
                        <span>{condition.value}</span>
                        <ChevronDown className="size-3.5 text-gray-500" />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteCondition(condition.id, condition.label)}
                      className="bg-[#ebefe6] hover:bg-[#dfe4db] size-9 rounded-[8px] flex items-center justify-center text-[#454840] hover:text-[#ba1a1a] transition-colors shrink-0 cursor-pointer"
                      title="حذف هذا الشرط"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 04: الإجراءات التلقائية المنفذة [1:22581] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px] pb-4 border-b border-[#e5eae0]">
                الإجراءات التلقائية المنفذة
              </h2>

              <div className="space-y-4">
                {/* Action Block 1: WhatsApp */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-[#d8e8cb] rounded-[8px] size-8 flex items-center justify-center text-[#34422a]">
                        <MessageSquare className="size-4" />
                      </div>
                      <div className="text-[#181d17] text-[14px] font-bold">
                        إرسال رسالة WhatsApp للنزيل
                      </div>
                      <span className="bg-[#e5eae0] rounded-[6px] px-2 py-0.5 text-[#454840] text-[11px] font-semibold">
                        إجراء 1
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast.info("تم تعطيل هذا الإجراء مؤقتاً")}
                      className="text-gray-400 hover:text-gray-600 size-6 rounded-md flex items-center justify-center hover:bg-gray-200/50 transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[#454840] text-[11px] font-semibold mb-1 block">
                        قالب الرسالة المعتمد
                      </label>
                      <div className="bg-white h-10 rounded-[8px] px-4 flex items-center justify-between text-[12px] font-semibold text-[#181d17] shadow-xs cursor-pointer">
                        <span>تفاصيل الوصول وكود القفل</span>
                        <ChevronDown className="size-3.5 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[#454840] text-[11px] font-semibold mb-1 block">
                        المستلم المستهدف
                      </label>
                      <div className="bg-white h-10 rounded-[8px] px-3 flex items-center gap-2 text-[12px] font-semibold text-[#181d17] shadow-xs">
                        <Phone className="size-3.5 text-gray-500" />
                        <span>رقم جوال النزيل الأساسي المسجل بالحجز</span>
                      </div>
                    </div>
                  </div>

                  {/* Template Preview Snippet Box */}
                  <div className="bg-white rounded-[12px] p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#34422a] text-[11px] font-bold">
                        معاينة محتوى القالب التلقائي:
                      </span>
                      <span className="text-[#75786f] text-[11px] font-medium">
                        المتغيرات تُستبدل لحظياً
                      </span>
                    </div>
                    <div className="text-[13px] text-[#181d17] leading-[22px]">
                      مرحباً{" "}
                      <span className="bg-[#ebefe6] text-[#34422a] font-bold px-1.5 py-0.5 rounded text-[13px] inline-block">
                        {`{guest_name}`}
                      </span>
                      ، يسعدنا استقبالكم في{" "}
                      <span className="bg-[#ebefe6] text-[#34422a] font-bold px-1.5 py-0.5 rounded text-[13px] inline-block">
                        {`{property_name}`}
                      </span>
                      . موعد تسجيل الوصول يبدأ من الساعة 03:00 م. كود دخول الوحدة الخاص بكم هو:{" "}
                      <span className="bg-[#ebefe6] text-[#34422a] font-bold px-1.5 py-0.5 rounded text-[13px] inline-block">
                        {`{access_code}`}
                      </span>
                      . رابط موقع المبنى:{" "}
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[#34422a] font-semibold underline decoration-1"
                      >
                        {`https://rwq.sa/l/{loc_token}`}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Block 2: Audit Log */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-[#e5eae0] rounded-[8px] size-8 flex items-center justify-center text-[#454840]">
                        <ShieldCheck className="size-4" />
                      </div>
                      <div className="text-[#181d17] text-[14px] font-bold">
                        تسجيل حدث رسمي في سجل التدقيق والحوكمة
                      </div>
                      <span className="bg-[#e5eae0] rounded-[6px] px-2 py-0.5 text-[#454840] text-[11px] font-semibold">
                        إجراء 2
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast.info("تم تعطيل هذا الإجراء مؤقتاً")}
                      className="text-gray-400 hover:text-gray-600 size-6 rounded-md flex items-center justify-center hover:bg-gray-200/50 transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[#454840] text-[11px] font-semibold mb-1 block">
                      ملاحظة التدقيق المرفقة
                    </label>
                    <input
                      type="text"
                      defaultValue="توثيق إرسال تفاصيل الوصول آلياً عبر محرك الأتمتة المركزي لحجز المنصة"
                      className="w-full bg-white h-10 rounded-[8px] px-3 text-[13px] text-[#181d17] border-0 shadow-xs focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                    />
                  </div>
                </div>

                {/* Action Append Trigger Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleAddAction("إرسال رسالة WhatsApp")}
                    className="bg-[#e5eae0] hover:bg-[#dfe4db] text-[#181d17] text-[12px] font-semibold px-3.5 py-2 rounded-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>+ إضافة إجراء: إرسال WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddAction("إنشاء مهمة تنظيف")}
                    className="bg-[#e5eae0] hover:bg-[#dfe4db] text-[#181d17] text-[12px] font-semibold px-3.5 py-2 rounded-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>+ إنشاء مهمة تنظيف</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddAction("إنشاء تنبيه فوري")}
                    className="bg-[#e5eae0] hover:bg-[#dfe4db] text-[#181d17] text-[12px] font-semibold px-3.5 py-2 rounded-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>+ إنشاء تنبيه فوري</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 05: نطاق شمول القاعدة [1:22670] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              <div className="border-[#e5eae0] border-b pb-4 flex items-center gap-2">
                <div className="bg-[#e5eae0] rounded-[8px] size-7 flex items-center justify-center text-[#181d17]">
                  <Building2 className="size-4 text-[#34422a]" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  نطاق شمول القاعدة
                </h2>
              </div>

              <div className="space-y-3">
                {/* Option 1: All properties (Selected) */}
                <div
                  onClick={() => setScope("all")}
                  className={`rounded-[12px] p-4 flex items-start gap-3 cursor-pointer transition-all ${
                    scope === "all"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422a]/30"
                      : "bg-[#f1f5eb] border border-transparent hover:bg-[#ebefe6]"
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#34422a] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        18 عقاراً • 142 وحدة
                      </span>
                      <span className="text-[#181d17] text-[14px] font-bold">
                        جميع العقارات المسجلة بالمنصة
                      </span>
                    </div>
                    <p className="text-[#454840] text-[13px] leading-[20px] text-right">
                      تُطبق القاعدة تلقائياً على كافة الأصول الحالية وأي عقار أو وحدة جديدة تُضاف
                      للمنظومة مستقبلاً.
                    </p>
                  </div>
                  <div className="size-4 rounded-full border border-[#34422a] bg-white flex items-center justify-center mt-1 shrink-0">
                    {scope === "all" && <div className="size-2.5 rounded-full bg-[#34422a]" />}
                  </div>
                </div>

                {/* Option 2: Custom selected properties */}
                <div
                  onClick={() => setScope("selected")}
                  className={`rounded-[12px] p-4 flex items-start gap-3 cursor-pointer transition-all ${
                    scope === "selected"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422a]/30"
                      : "bg-[#f1f5eb] border border-transparent hover:bg-[#ebefe6]"
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <ChevronDown className="size-3.5 text-gray-500" />
                      <span className="text-[#181d17] text-[14px] font-semibold">
                        عقارات محددة (اختيار مخصص)
                      </span>
                    </div>
                    <p className="text-[#454840] text-[13px] leading-[20px] text-right">
                      تحديد مشاريع أو أبراج سكنية بعينها (مثال: برج رِواق العليا فقط).
                    </p>
                  </div>
                  <div className="size-4 rounded-full border border-[#767676] bg-white flex items-center justify-center mt-1 shrink-0">
                    {scope === "selected" && (
                      <div className="size-2.5 rounded-full bg-[#34422a]" />
                    )}
                  </div>
                </div>

                {/* Option 3: Geographic Scope */}
                <div
                  onClick={() => setScope("geo")}
                  className={`rounded-[12px] p-4 flex items-start gap-3 cursor-pointer transition-all ${
                    scope === "geo"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422a]/30"
                      : "bg-[#f1f5eb] border border-transparent hover:bg-[#ebefe6]"
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <ChevronDown className="size-3.5 text-gray-500" />
                      <span className="text-[#181d17] text-[14px] font-semibold">
                        مجموعة عقارية أو نطاق جغرافي (المدينة / الحي)
                      </span>
                    </div>
                    <p className="text-[#454840] text-[13px] leading-[20px] text-right">
                      حصر التطبيق على محفظة معينة (مثال: كافة عقارات مدينة الرياض).
                    </p>
                  </div>
                  <div className="size-4 rounded-full border border-[#767676] bg-white flex items-center justify-center mt-1 shrink-0">
                    {scope === "geo" && <div className="size-2.5 rounded-full bg-[#34422a]" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN: Sidebar / Workflow Summary (Col 9 to 12) [1:22709] */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: ملخص سير العمل المعتمد [1:22710] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              <div className="border-[#e5eae0] border-b pb-3 flex items-center justify-between">
                <span className="bg-[#d8e8cb] text-[#5a6952] text-[11px] font-bold px-3 py-0.5 rounded-full">
                  جاهز
                </span>
                <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  ملخص سير العمل المعتمد
                </h3>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-0">
                {/* Step 1 */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#f1f5eb] rounded-[12px] p-2.5 flex-1 text-right">
                    <div className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      المحفّز الزمني
                    </div>
                    <div className="text-[#181d17] text-[13px] font-normal leading-[20px]">
                      قبل موعد الوصول بـ 24 ساعة
                    </div>
                  </div>
                  <div className="bg-[#34422a] text-white size-8 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="size-4" />
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-end pr-4 py-1">
                  <div className="w-[2px] h-6 bg-[#dfe4db]" />
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#f1f5eb] rounded-[12px] p-2.5 flex-1 text-right">
                    <div className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      شروط التحقق (2)
                    </div>
                    <div className="text-[#181d17] text-[13px] font-normal leading-[20px]">
                      مصدر الحجز Whatsapp.com + قفل إلكتروني ذكي
                    </div>
                  </div>
                  <div className="bg-[#34422a] text-white size-8 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <SlidersHorizontal className="size-3.5" />
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-end pr-4 py-1">
                  <div className="w-[2px] h-6 bg-[#dfe4db]" />
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#f1f5eb] rounded-[12px] p-2.5 flex-1 text-right">
                    <div className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      الإجراءات التلقائية (2)
                    </div>
                    <div className="text-[#181d17] text-[13px] font-normal leading-[20px]">
                      إرسال WhatsApp + قيد سجل التدقيق
                    </div>
                  </div>
                  <div className="bg-[#34422a] text-white size-8 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Play className="size-3.5" />
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-end pr-4 py-1">
                  <div className="w-[2px] h-6 bg-[#dfe4db]" />
                </div>

                {/* Step 4 */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#f1f5eb] rounded-[12px] p-2.5 flex-1 text-right">
                    <div className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      النطاق والشمول
                    </div>
                    <div className="text-[#181d17] text-[13px] font-normal leading-[20px]">
                      شامل لكافة العقارات (18 عقاراً • 142 وحدة)
                    </div>
                  </div>
                  <div className="bg-[#e5eae0] text-[#34422a] size-8 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="size-4" />
                  </div>
                </div>
              </div>

              {/* Highlighted Summary Block */}
              <div className="bg-[#ebefe6] border-r-4 border-[#34422a] rounded-[12px] p-3.5 text-right mt-3">
                <span className="font-bold text-[#34422a] text-[13px]">صياغة القاعدة: </span>
                <span className="text-[#181d17] text-[13px] leading-[21.13px]">
                  &quot;عند اقتراب الوصول بـ 24 ساعة وكان الحجز عبر whatsapp.com ولديه كود ذكي ←
                  إرسال رسالة WhatsApp للنزيل وتوثيق تدقيق آلي في كافة العقارات.&quot;
                </span>
              </div>
            </div>

            {/* Card 2: اختبار المحاكاة السريعة [1:22764] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-3">
              <div className="border-[#e5eae0] border-b pb-3">
                <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  اختبار المحاكاة السريعة
                </h3>
              </div>
              <p className="text-[#454840] text-[13px] leading-[20px]">
                تحقق من مسار معالجة الشروط دون إرسال رسائل فعلية للنزلاء.
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[#454840] text-[11px] font-semibold mb-1 block">
                    عينة حجز نشطة للاختبار
                  </label>
                  <div className="bg-[#f1f5eb] h-10 rounded-[8px] px-3 flex items-center justify-between text-[13px] text-[#181d17] shadow-xs cursor-pointer">
                    <ChevronDown className="size-3.5 text-gray-500" />
                    <span>(أحمد محمد - عمارة النخيل)</span>
                  </div>
                </div>

                {/* Safe Simulation Toggle Switch */}
                <div className="bg-[#f1f5eb] rounded-[8px] p-2.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSafeSimulation(!safeSimulation)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      safeSimulation ? "bg-[#34422a]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`size-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                        safeSimulation ? "left-0.5" : "left-5.5"
                      }`}
                    />
                  </button>
                  <span className="text-[#181d17] text-[12px] font-semibold">
                    وضع المحاكاة الآمنة
                  </span>
                </div>

                {/* Test Output Preview Pill */}
                <div className="bg-[rgba(216,232,203,0.4)] rounded-[8px] p-3 flex items-center justify-between">
                  <span className="text-[#34422a] text-[11px] font-bold">
                    مؤهل للتنفيذ (100%)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#181d17] text-[12px] font-semibold">
                      نتيجة الفحص التقديري
                    </span>
                    <CheckCircle2 className="size-4 text-[#34422a]" />
                  </div>
                </div>

                {/* Run Button */}
                <button
                  type="button"
                  onClick={handleSimulate}
                  disabled={simulationRunning}
                  className="bg-[#e5eae0] hover:bg-[#dfe4db] h-10 rounded-[12px] text-[#181d17] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-full disabled:opacity-60"
                >
                  <span>
                    {simulationRunning
                      ? "جارٍ تنفيذ المحاكاة السريعة..."
                      : "تشغيل محاكاة الاختبار الآن ⚡"}
                  </span>
                </button>
              </div>
            </div>

            {/* Card 3: Execution Impact Metrics Box [1:22796] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#34422a] text-[11px] font-bold">تقدير دقيق</span>
                <span className="text-[#454840] text-[11px] font-medium">
                  التأثير المتوقع خلال 7 أيام القادمة
                </span>
              </div>
              <div className="flex gap-2 w-full">
                <div className="bg-[#f1f5eb] rounded-[12px] py-2.5 px-2 flex-1 text-center">
                  <div className="text-[#34422a] text-[18px] font-bold leading-[28px]">0%</div>
                  <div className="text-[#454840] text-[11px] font-medium leading-[16px]">
                    تعارض مع القواعد
                  </div>
                </div>
                <div className="bg-[#f1f5eb] rounded-[12px] py-2.5 px-2 flex-1 text-center">
                  <div className="text-[#181d17] text-[18px] font-bold leading-[28px]">34</div>
                  <div className="text-[#454840] text-[11px] font-medium leading-[16px]">
                    رسالة مؤهلة
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Final Action Buttons Panel [1:22811] */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-4 space-y-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#34422a] hover:bg-[#283420] text-white rounded-[12px] h-12 flex items-center justify-center gap-2 text-[14px] font-semibold transition-all cursor-pointer w-full drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] disabled:opacity-60"
              >
                <span>{isSubmitting ? "جارٍ حفظ التعديلات..." : "حفظ التعديلات"}</span>
                <Save className="size-[15px]" />
              </button>

              <Link
                href={`/automation/rules/${ruleCode}/`}
                className="bg-[#ebefe6] hover:bg-[#dfe4db] text-[#181d17] rounded-[12px] h-11 flex items-center justify-center gap-2 text-[14px] font-semibold transition-all w-full"
              >
                <span>إلغاء والتراجع عن التغييرات</span>
                <RotateCcw className="size-[13px]" />
              </Link>

              <div className="py-1 text-center">
                <p className="text-[#454840] text-[12px] font-semibold leading-[18px]">
                  آخر تعديل: 12 سبتمبر 2026 بواسطة م. طارق العسيري | السجلات المؤرشفة غير قابلة
                  للتغيير
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Pause Rule Modal */}
      <PauseRuleModal
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
        onConfirm={() => {
          setIsPaused(true);
        }}
        rule={rule}
      />
    </div>
  );
}
