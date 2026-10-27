"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackButton } from "@/components/shared/back-button";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import { automationService } from "@/services/automation-service";
import { bookingsService } from "@/services/bookings-service";
import {
  Sliders,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Wrench,
  Key,
  Shield,
  ShieldCheck,
  ChevronDown,
  Trash2,
  Plus,
  Zap,
  Phone,
  MessageSquare,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

export function CreateRuleView() {
  const router = useRouter();

  // Form states matching Figma node 1:21892 (initialized empty for user entry)
  const [ruleName, setRuleName] = useState("");
  const [category, setCategory] = useState("وصول ذاتي وكود الدخول");
  const [description, setDescription] = useState("");
  const [initialStatus, setInitialStatus] = useState<"active" | "draft">("active");
  const [triggerEvent, setTriggerEvent] = useState("قبل موعد الوصول (Before Check-in)");
  const [triggerTime, setTriggerTime] = useState("الساعة 3 م");
  const [conditionsType, setConditionsType] = useState<"all" | "any">("all");
  const [sourceCondition, setSourceCondition] = useState("Whatsapp .com");
  const [passcodeCondition, setPasscodeCondition] = useState("كود مخصص لكل حجز");
  const [selectedTemplate, setSelectedTemplate] = useState("تفاصيل الوصول وكود القفل");
  const [targetRecipient, setTargetRecipient] = useState("رقم جوال النزيل الأساسي المسجل بالحجز");
  const [auditNote, setAuditNote] = useState("");
  const [scope, setScope] = useState<"all" | "custom" | "regional">("all");

  // Simulation states & bookings
  const [sampleBookings, setSampleBookings] = useState<string[]>([]);
  const [selectedSampleBooking, setSelectedSampleBooking] = useState("");
  const [safeSimulationMode, setSafeSimulationMode] = useState(true);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    bookingsService.getAll().then((list) => {
      const formatted = list.map((b) => `(${b.guest?.name || "نزيل"} - ${b.propertyName})`);
      setSampleBookings(formatted);
      if (formatted.length > 0) {
        setSelectedSampleBooking(formatted[0]);
      }
    });
  }, []);

  const confirm = useConfirm();

  const handleSimulate = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      toast.success("تم تشغيل محاكاة الاختبار بنجاح: الحجز مؤهل للتنفيذ بنسبة 100% دون أي تعارض!");
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ruleName.trim()) {
      toast.error("يرجى إدخال اسم قاعدة الأتمتة أولاً");
      return;
    }

    const ok = await confirm({
      title: "تأكيد حفظ وتفعيل قاعدة الأتمتة",
      message: `هل أنت متأكد من حفظ وتفعيل قاعدة الأتمتة "${ruleName}"؟ سيبدأ محرك الأتمتة المركزي المعالجة الفورية مع أول حدث مؤهل.`,
      confirmLabel: "حفظ وتفعيل القاعدة",
      variant: "default",
    });
    if (!ok) return;

    try {
      setIsSubmitting(true);
      await automationService.create({
        title: ruleName.trim(),
        description: description.trim() || "قاعدة أتمتة مخصصة",
        category: "self_checkin",
        categoryLabel: category,
        triggerType: triggerEvent,
        triggerLabel: triggerEvent,
        triggerTime: triggerTime,
        actionSummary: `إرسال رسالة WhatsApp: ${selectedTemplate}`,
        actionType: "whatsapp",
        scope: scope === "all" ? "شامل لكافة العقارات" : "عقارات مخصصة",
        status: initialStatus,
      });
      toast.success("تم حفظ وتفعيل قاعدة الأتمتة بنجاح!");
      router.push("/automation/");
    } catch {
      toast.error("حدث خطأ أثناء حفظ قاعدة الأتمتة");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDraftSave = async () => {
    if (!ruleName.trim()) {
      toast.error("يرجى إدخال اسم قاعدة الأتمتة لحفظها كمسودة");
      return;
    }

    const ok = await confirm({
      title: "حفظ كمسودة",
      message: `هل تريد حفظ قاعدة الأتمتة "${ruleName}" كمسودة؟`,
      confirmLabel: "حفظ كمسودة",
    });
    if (!ok) return;

    try {
      setIsSubmitting(true);
      await automationService.create({
        title: ruleName.trim(),
        description: description.trim() || "مسودة قاعدة أتمتة",
        category: "self_checkin",
        categoryLabel: category,
        triggerType: triggerEvent,
        triggerLabel: triggerEvent,
        triggerTime: triggerTime,
        actionSummary: `إرسال رسالة WhatsApp: ${selectedTemplate}`,
        actionType: "whatsapp",
        scope: scope === "all" ? "شامل لكافة العقارات" : "عقارات مخصصة",
        status: "draft",
      });
      toast.success("تم حفظ قاعدة الأتمتة كمسودة بنجاح");
      router.push("/automation/");
    } catch {
      toast.error("حدث خطأ أثناء حفظ المسودة");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* PAGE HEADER BAR - Matching Figma node 1:21895 */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-3">
          <BackButton
            fallbackHref="/automation/"
            className="w-9 h-9 rounded-xl bg-[#f1f5eb] hover:bg-[#e5eae0] flex items-center justify-center text-[#181d17] transition-colors shrink-0 mt-0.5 md:mt-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[24px] font-semibold text-[#181d17] tracking-[-0.6px]">
                إنشاء قاعدة أتمتة
              </h1>
              <span className="bg-[#d8e8cb] text-[#5a6952] text-[11px] font-semibold rounded-full px-[10px] py-[4px] inline-flex items-center justify-center whitespace-nowrap">
                صلاحية إدارة المنصة المركزية
              </span>
            </div>
            <p className="text-[13px] text-[#454840] leading-[20px]">
              حدد الحدث الذي يشغّل القاعدة والإجراءات التي يتم تنفيذها تلقائيًا وفق قواعد الحوكمة والتشغيل لجميع المحافظ العقارية.
            </p>
          </div>
        </div>

        <div className="flex items-center self-start md:self-center shrink-0">
          <div className="bg-[#e5eae0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] px-[16px] py-[8px] flex items-center gap-[8px]">
            <Sparkles className="size-[15px] text-[#181d17]" />
            <span className="text-[#181d17] text-[12px] font-semibold whitespace-nowrap">
              مُنشئ سير العمل الذكي
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
          {/* RIGHT / MAIN COLUMN (Col 1 to 8 in RTL) - Step-by-Step Rule Definition */}
          <div className="lg:col-span-8 flex flex-col gap-[24px]">
            {/* SECTION 01: بيانات القاعدة والتصنيف */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              {/* Section Header */}
              <div className="border-b border-[#e5eae0] pb-[17px] flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <div className="bg-[#e5eae0] rounded-[8px] size-[28px] flex items-center justify-center shrink-0">
                    <Sliders className="size-[15px] text-[#181d17]" />
                  </div>
                  <h2 className="text-[18px] font-bold text-[#181d17]">
                    بيانات القاعدة والتصنيف
                  </h2>
                </div>
                <span className="text-[#75786f] text-[11px] font-medium">
                  حقول إلزامية (*)
                </span>
              </div>

              {/* Form Fields */}
              <div className="flex flex-col gap-[16px]">
                {/* 1. اسم القاعدة */}
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px] font-semibold text-[#181d17] flex items-center gap-1">
                    <span>اسم القاعدة</span>
                    <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    required
                    placeholder="مثال: إرسال تفاصيل الوصول الذاتي وموقع الوحدة"
                    className="bg-[#f1f5eb] h-[44px] rounded-[12px] px-[16px] py-[9px] text-[#181d17] text-[14px] font-normal w-full border-0 focus:outline-none focus:ring-1 focus:ring-[#34422a] transition-all"
                  />
                </div>

                {/* 2. التصنيف التشغيلي */}
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[14px] font-semibold text-[#181d17] flex items-center gap-1">
                    <span>التصنيف التشغيلي</span>
                    <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="flex gap-[8px] items-center flex-wrap">
                    {[
                      { id: "وصول ذاتي وكود الدخول", label: "وصول ذاتي وكود الدخول", icon: Key },
                      { id: "تشغيل وتنظيف", label: "تشغيل وتنظيف", icon: Wrench },
                      { id: "تأكيد ومغادرة", label: "تأكيد ومغادرة", icon: CheckCircle2 },
                      { id: "حوكمة وأمان", label: "حوكمة وأمان", icon: Shield },
                    ].map((cat) => {
                      const IconComp = cat.icon;
                      const isActive = category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`flex items-center gap-[6px] px-[14px] py-[6px] rounded-[12px] text-[12px] font-semibold transition-all ${
                            isActive
                              ? "bg-[#34422a] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                              : "bg-[#ebefe6] text-[#454840] hover:bg-[#dfe4db]"
                          }`}
                        >
                          <IconComp className="size-[13px]" />
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. الوصف الإيضاحي للمشغلين */}
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px] font-semibold text-[#181d17]">
                    الوصف الإيضاحي للمشغلين
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="أدخل وصفاً توضيحياً لمسار عمل قاعدة الأتمتة..."
                    className="bg-[#f1f5eb] rounded-[12px] p-[16px] text-[#181d17] text-[14px] font-normal leading-[22.75px] w-full border-0 focus:outline-none focus:ring-1 focus:ring-[#34422a] transition-all resize-none"
                  />
                </div>

                {/* 4. الحالة التشغيلية الأولية */}
                <div className="flex flex-col gap-[8px] pt-[8px]">
                  <label className="text-[14px] font-semibold text-[#181d17]">
                    الحالة التشغيلية الأولية
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                    {/* Active Option */}
                    <div
                      onClick={() => setInitialStatus("active")}
                      className={`flex items-center justify-between p-[12px] rounded-[12px] cursor-pointer transition-all ${
                        initialStatus === "active"
                          ? "bg-[rgba(216,232,203,0.4)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                          : "bg-[#f1f5eb] hover:bg-[#e8eee1]"
                      }`}
                    >
                      <div className="flex flex-col items-start text-right">
                        <span className="text-[12px] font-bold text-[#181d17] leading-[18px]">
                          مفعلة فور الحفظ
                        </span>
                        <span className="text-[13px] font-normal text-[#454840] leading-[20px]">
                          تبدأ المعالجة مع أول حدث مؤهل
                        </span>
                      </div>
                      <div
                        className={`size-[16px] rounded-full flex items-center justify-center shrink-0 bg-white ${
                          initialStatus === "active"
                            ? "border border-[#34422a]"
                            : "border border-[#767676]"
                        }`}
                      >
                        {initialStatus === "active" && (
                          <div className="size-[9.6px] rounded-full bg-[#34422a]" />
                        )}
                      </div>
                    </div>

                    {/* Draft Option */}
                    <div
                      onClick={() => setInitialStatus("draft")}
                      className={`flex items-center justify-between p-[12px] rounded-[12px] cursor-pointer transition-all ${
                        initialStatus === "draft"
                          ? "bg-[rgba(216,232,203,0.4)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                          : "bg-[#f1f5eb] hover:bg-[#e8eee1]"
                      }`}
                    >
                      <div className="flex flex-col items-start text-right">
                        <span className="text-[12px] font-semibold text-[#181d17] leading-[18px]">
                          مسودة غير مفعلة
                        </span>
                        <span className="text-[13px] font-normal text-[#454840] leading-[20px]">
                          حفظ القاعدة للتعديل دون تنفيذ فعلي
                        </span>
                      </div>
                      <div
                        className={`size-[16px] rounded-full flex items-center justify-center shrink-0 bg-white ${
                          initialStatus === "draft"
                            ? "border border-[#34422a]"
                            : "border border-[#767676]"
                        }`}
                      >
                        {initialStatus === "draft" && (
                          <div className="size-[9.6px] rounded-full bg-[#34422a]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 02: المحفّز وموعد التشغيل */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              {/* Section Header */}
              <div className="border-b border-[#e5eae0] pb-[17px] flex items-center gap-[8px]">
                <div className="bg-[#e5eae0] rounded-[8px] size-[28px] flex items-center justify-center shrink-0">
                  <Clock className="size-[16px] text-[#181d17]" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  المحفّز وموعد التشغيل (Trigger)
                </h2>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-[16px]">
                {/* الحدث المحفّز الرئيسي */}
                <div className="flex flex-col gap-[6px]">
                  <label className="text-[14px] font-semibold text-[#181d17] flex items-center gap-1">
                    <span>الحدث المحفّز الرئيسي</span>
                    <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <SelectDropdown
                    value={triggerEvent}
                    onChange={setTriggerEvent}
                    options={[
                      "قبل موعد الوصول (Before Check-in)",
                      "عند إنشاء حجز مؤكد (Booking Created)",
                      "قبل انتهاء الحجز والمغادرة (Before Check-out)",
                      "عند انتهاء الحجز وتسجيل الخروج (Check-out Done)",
                    ]}
                    triggerClassName="bg-[#f1f5eb] h-[44px] rounded-[12px] px-[16px] text-[#181d17] text-[14px] font-semibold border-0"
                  />
                </div>

                {/* Time-based Offset Config Box */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <Clock className="size-[16px] text-[#34422a]" />
                      <span className="text-[12px] font-bold text-[#181d17]">
                        توقيت الإطلاق بالنسبة للحدث:
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#34422a]">
                      توقيت الرياض القياسي (GMT+3)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                    <div className="bg-white rounded-[8px] h-[40px] px-[16px] flex items-center justify-center text-[12px] font-semibold text-[#181d17]">
                      قبل موعد الوصول المحدد
                    </div>
                    <div className="bg-white rounded-[8px] h-[40px] px-[16px] flex items-center justify-between text-[12px] font-semibold text-[#181d17]">
                      <span>{triggerTime}</span>
                      <Clock className="size-[15px] text-[#34422a]" />
                    </div>
                  </div>

                  <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                    سيتم إرسال الرسالة آلياً في تمام الساعة 03:00 مساءً من اليوم السابق لتاريخ حجز النزيل.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 03: شروط التفعيل الدقيقة */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              {/* Section Header */}
              <div className="border-b border-[#e5eae0] pb-[17px] flex items-center justify-between">
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  شروط التفعيل الدقيقة
                </h2>
                <div className="bg-[#e5eae0] p-[2px] rounded-[12px] flex items-center">
                  <button
                    type="button"
                    onClick={() => setConditionsType("all")}
                    className={`rounded-[8px] h-[32px] px-[24px] text-[11px] font-semibold flex items-center justify-center transition-all ${
                      conditionsType === "all"
                        ? "bg-[#34422a] text-white shadow-xs"
                        : "text-[#454840] hover:text-[#181d17]"
                    }`}
                  >
                    كافة الشروط
                  </button>
                  <button
                    type="button"
                    onClick={() => setConditionsType("any")}
                    className={`rounded-[8px] h-[32px] px-[21px] text-[11px] font-medium flex items-center justify-center transition-all ${
                      conditionsType === "any"
                        ? "bg-[#34422a] text-white shadow-xs"
                        : "text-[#454840] hover:text-[#181d17]"
                    }`}
                  >
                    أي شرط
                  </button>
                </div>
              </div>

              {/* Condition Rows */}
              <div className="flex flex-col gap-[12px]">
                {/* Row 1 */}
                <div className="bg-[#f1f5eb] rounded-[12px] h-[60px] px-[12px] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-[8px]">
                    <div className="size-[8px] rounded-full bg-[#34422a]" />
                    <span className="text-[12px] font-semibold text-[#181d17]">
                      مصدر الحجز
                    </span>
                  </div>

                  <div className="flex-1 max-w-[340px]">
                    <SelectDropdown
                      value={sourceCondition}
                      onChange={setSourceCondition}
                      options={[
                        "Whatsapp .com",
                        "Airbnb.com",
                        "Booking.com",
                        "حجز مباشر عبر المنصة",
                      ]}
                      triggerClassName="bg-white rounded-[8px] h-[36px] px-[16px] text-[13px] font-semibold text-[#181d17] border-0"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => toast.info("حذف شرط مصدر الحجز")}
                    className="bg-[#ebefe6] hover:bg-[#dfe4db] rounded-[8px] size-[36px] flex items-center justify-center text-[#454840] hover:text-[#ba1a1a] transition-colors"
                  >
                    <Trash2 className="size-[14px]" />
                  </button>
                </div>

                {/* Row 2 */}
                <div className="bg-[#f1f5eb] rounded-[12px] h-[60px] px-[12px] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-[8px]">
                    <div className="size-[8px] rounded-full bg-[#34422a]" />
                    <span className="text-[12px] font-semibold text-[#181d17]">
                      طريقة كود الدخول
                    </span>
                  </div>

                  <div className="flex-1 max-w-[340px]">
                    <SelectDropdown
                      value={passcodeCondition}
                      onChange={setPasscodeCondition}
                      options={[
                        "كود مخصص لكل حجز",
                        "كود رئيسي ثابت للوحدة",
                        "بطاقة دخول فيزيائية",
                      ]}
                      triggerClassName="bg-white rounded-[8px] h-[36px] px-[16px] text-[13px] font-semibold text-[#181d17] border-0"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => toast.info("حذف شرط طريقة كود الدخول")}
                    className="bg-[#ebefe6] hover:bg-[#dfe4db] rounded-[8px] size-[36px] flex items-center justify-center text-[#454840] hover:text-[#ba1a1a] transition-colors"
                  >
                    <Trash2 className="size-[14px]" />
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 04: الإجراءات التلقائية المنفذة */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              {/* Section Header */}
              <div className="border-b border-[#e5eae0] pb-[17px]">
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  الإجراءات التلقائية المنفذة
                </h2>
              </div>

              {/* Action Blocks */}
              <div className="flex flex-col gap-[16px]">
                {/* Action Block 1: WhatsApp */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <div className="bg-[#d8e8cb] rounded-[8px] size-[32px] flex items-center justify-center text-[#34422a] shrink-0">
                        <MessageSquare className="size-[16px]" />
                      </div>
                      <span className="text-[14px] font-bold text-[#181d17]">
                        إرسال رسالة WhatsApp للنزيل
                      </span>
                      <span className="bg-[#e5eae0] text-[#454840] text-[11px] font-semibold rounded-[6px] px-[8px] py-[2px]">
                        إجراء 1
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast.info("خيارات إجراء WhatsApp")}
                      className="size-[28px] rounded-[8px] flex items-center justify-center text-[#454840] hover:bg-[#ebefe6] transition-colors"
                    >
                      <Trash2 className="size-[13px]" />
                    </button>
                  </div>

                  {/* Recipient & Template Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                    <div className="flex flex-col gap-[4px]">
                      <label className="text-[11px] font-semibold text-[#454840]">
                        قالب الرسالة المعتمد
                      </label>
                      <SelectDropdown
                        value={selectedTemplate}
                        onChange={setSelectedTemplate}
                        options={[
                          "تفاصيل الوصول وكود القفل",
                          "تأكيد استلام الحجز وموقع العقار",
                          "تذكير بموعد المغادرة وإجراءات الخروج",
                        ]}
                        triggerClassName="bg-white rounded-[8px] h-[40px] px-[16px] text-[12px] font-semibold text-[#181d17] border-0"
                      />
                    </div>

                    <div className="flex flex-col gap-[4px]">
                      <label className="text-[11px] font-semibold text-[#454840]">
                        المستلم المستهدف
                      </label>
                      <div className="bg-white rounded-[8px] h-[40px] px-[12px] flex items-center justify-between text-[12px] font-semibold text-[#181d17]">
                        <span>{targetRecipient}</span>
                        <Phone className="size-[14px] text-[#34422a]" />
                      </div>
                    </div>
                  </div>

                  {/* Template Preview Snippet Box */}
                  <div className="bg-white rounded-[12px] p-[12px] flex flex-col gap-[6px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#34422a]">
                        معاينة محتوى القالب التلقائي:
                      </span>
                      <span className="text-[11px] font-medium text-[#75786f]">
                        المتغيرات تُستبدل لحظياً
                      </span>
                    </div>

                    <div className="text-[13px] font-normal text-[#181d17] leading-[22px]">
                      <span>مرحباً </span>
                      <span className="inline-block bg-[#ebefe6] text-[#34422a] font-bold text-[13px] px-[6px] py-[1px] rounded-[4px] mx-1">
                        {"{guest_name}"}
                      </span>
                      <span>، يسعدنا استقبالكم في </span>
                      <span className="inline-block bg-[#ebefe6] text-[#34422a] font-bold text-[13px] px-[6px] py-[1px] rounded-[4px] mx-1">
                        {"{property_name}"}
                      </span>
                      <span>. موعد تسجيل الوصول يبدأ من الساعة 03:00 م. كود دخول الوحدة الخاص بكم هو: </span>
                      <span className="inline-block bg-[#ebefe6] text-[#34422a] font-bold text-[13px] px-[6px] py-[1px] rounded-[4px] mx-1">
                        {"{access_code}"}
                      </span>
                      <span>. رابط موقع المبنى: </span>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-[#34422a] underline font-semibold text-[13px] decoration-[1px] underline-offset-2"
                      >
                        https://rwq.sa/l/{"{loc_token}"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Action Block 2: Audit Log */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <div className="bg-[#e5eae0] rounded-[8px] size-[32px] flex items-center justify-center text-[#454840] shrink-0">
                        <ShieldCheck className="size-[16px]" />
                      </div>
                      <span className="text-[14px] font-bold text-[#181d17]">
                        تسجيل حدث رسمي في سجل التدقيق والحوكمة
                      </span>
                      <span className="bg-[#e5eae0] text-[#454840] text-[11px] font-semibold rounded-[6px] px-[8px] py-[2px]">
                        إجراء 2
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toast.info("خيارات إجراء التدقيق")}
                      className="size-[28px] rounded-[8px] flex items-center justify-center text-[#454840] hover:bg-[#ebefe6] transition-colors"
                    >
                      <Trash2 className="size-[13px]" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-[4px]">
                    <label className="text-[11px] font-semibold text-[#454840]">
                      ملاحظة التدقيق المرفقة
                    </label>
                    <input
                      type="text"
                      value={auditNote}
                      onChange={(e) => setAuditNote(e.target.value)}
                      placeholder="أدخل ملاحظة التدقيق والتوثيق..."
                      className="bg-white rounded-[8px] h-[40px] px-[12px] py-[8px] text-[13px] font-normal text-[#181d17] w-full border-0 focus:outline-none focus:ring-1 focus:ring-[#34422a]"
                    />
                  </div>
                </div>

                {/* Append Action Buttons */}
                <div className="flex gap-[8px] items-center flex-wrap pt-[4px]">
                  <button
                    type="button"
                    onClick={() => toast.info("إضافة تنبيه فوري")}
                    className="bg-[#e5eae0] hover:bg-[#dfe4db] text-[#181d17] text-[12px] font-semibold rounded-[12px] px-[14px] py-[8px] flex items-center gap-[6px] transition-colors"
                  >
                    <Plus className="size-[12px]" />
                    <span>إنشاء تنبيه فوري</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.info("إضافة مهمة تنظيف")}
                    className="bg-[#e5eae0] hover:bg-[#dfe4db] text-[#181d17] text-[12px] font-semibold rounded-[12px] px-[14px] py-[8px] flex items-center gap-[6px] transition-colors"
                  >
                    <Plus className="size-[12px]" />
                    <span>إنشاء مهمة تنظيف</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.info("إضافة إجراء WhatsApp")}
                    className="bg-[#e5eae0] hover:bg-[#dfe4db] text-[#181d17] text-[12px] font-semibold rounded-[12px] px-[14px] py-[8px] flex items-center gap-[6px] transition-colors"
                  >
                    <Plus className="size-[12px]" />
                    <span>إضافة إجراء: إرسال WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 05: نطاق شمول القاعدة */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              {/* Section Header */}
              <div className="border-b border-[#e5eae0] pb-[17px] flex items-center gap-[8px]">
                <div className="bg-[#e5eae0] rounded-[8px] size-[28px] flex items-center justify-center shrink-0">
                  <Building2 className="size-[16px] text-[#181d17]" />
                </div>
                <h2 className="text-[18px] font-bold text-[#181d17]">
                  نطاق شمول القاعدة
                </h2>
              </div>

              {/* Scope Radio Options */}
              <div className="flex flex-col gap-[12px]">
                {/* Option 1: All properties (Selected) */}
                <div
                  onClick={() => setScope("all")}
                  className={`rounded-[12px] p-[16px] flex gap-[14px] items-start cursor-pointer transition-all ${
                    scope === "all"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422a]/20"
                      : "bg-[#f1f5eb] hover:bg-[#e8eee1]"
                  }`}
                >
                  <div className="flex-1 flex flex-col gap-[2px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-[#181d17]">
                        جميع العقارات المسجلة بالمنصة
                      </span>
                      <span className="bg-[#34422a] text-white text-[11px] font-bold rounded-full px-[10px] py-[2px]">
                        18 عقاراً • 142 وحدة
                      </span>
                    </div>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      تُطبق القاعدة تلقائياً على كافة الأصول الحالية وأي عقار أو وحدة جديدة تُضاف للمنظومة مستقبلاً.
                    </p>
                  </div>
                  <div
                    className={`size-[16px] rounded-full flex items-center justify-center shrink-0 mt-1 bg-white ${
                      scope === "all" ? "border border-[#34422a]" : "border border-[#767676]"
                    }`}
                  >
                    {scope === "all" && <div className="size-[9.6px] rounded-full bg-[#34422a]" />}
                  </div>
                </div>

                {/* Option 2: Custom properties */}
                <div
                  onClick={() => setScope("custom")}
                  className={`rounded-[12px] p-[16px] flex gap-[14px] items-start cursor-pointer transition-all ${
                    scope === "custom"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422a]/20"
                      : "bg-[#f1f5eb] hover:bg-[#e8eee1]"
                  }`}
                >
                  <div className="flex-1 flex flex-col gap-[2px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#181d17]">
                        عقارات محددة (اختيار مخصص)
                      </span>
                      <ChevronDown className="size-[14px] text-[#454840]" />
                    </div>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      تحديد مشاريع أو أبراج سكنية بعينها (مثال: برج رِواق العليا فقط).
                    </p>
                  </div>
                  <div
                    className={`size-[16px] rounded-full flex items-center justify-center shrink-0 mt-1 bg-white ${
                      scope === "custom" ? "border border-[#34422a]" : "border border-[#767676]"
                    }`}
                  >
                    {scope === "custom" && <div className="size-[9.6px] rounded-full bg-[#34422a]" />}
                  </div>
                </div>

                {/* Option 3: Regional Scope */}
                <div
                  onClick={() => setScope("regional")}
                  className={`rounded-[12px] p-[16px] flex gap-[14px] items-start cursor-pointer transition-all ${
                    scope === "regional"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422a]/20"
                      : "bg-[#f1f5eb] hover:bg-[#e8eee1]"
                  }`}
                >
                  <div className="flex-1 flex flex-col gap-[2px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-[#181d17]">
                        مجموعة عقارية أو نطاق جغرافي (المدينة / الحي)
                      </span>
                      <ChevronDown className="size-[14px] text-[#454840]" />
                    </div>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      حصر التطبيق على محفظة معينة (مثال: كافة عقارات مدينة الرياض).
                    </p>
                  </div>
                  <div
                    className={`size-[16px] rounded-full flex items-center justify-center shrink-0 mt-1 bg-white ${
                      scope === "regional" ? "border border-[#34422a]" : "border border-[#767676]"
                    }`}
                  >
                    {scope === "regional" && <div className="size-[9.6px] rounded-full bg-[#34422a]" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT / SIDEBAR COLUMN (Col 9 to 12 in RTL, left side visually) - Sticky Summary & Test Bench */}
          <div className="lg:col-span-4 flex flex-col gap-[24px]">
            {/* CARD 1: ملخص سير العمل المعتمد */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              <div className="border-b border-[#e5eae0] pb-[17px] flex items-center justify-between">
                <h3 className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                  ملخص سير العمل المعتمد
                </h3>
                <span className="bg-[#d8e8cb] text-[#5a6952] text-[11px] font-bold rounded-full px-[8px] py-[2px]">
                  جاهز
                </span>
              </div>

              {/* Pipeline Diagram */}
              <div className="flex flex-col gap-[12px] py-[4px]">
                {/* Step 1: Trigger */}
                <div className="flex gap-[12px] items-start">
                  <div className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-full size-[32px] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Clock className="size-[14px]" />
                  </div>
                  <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 flex flex-col gap-0.5 text-right">
                    <span className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      المحفّز الزمني
                    </span>
                    <span className="text-[#181d17] text-[13px] font-semibold leading-[20px]">
                      قبل موعد الوصول بـ 24 ساعة
                    </span>
                  </div>
                </div>

                {/* Connector */}
                <div className="pr-[15px] -my-1">
                  <div className="w-[2px] h-[20px] bg-[#dfe4db]" />
                </div>

                {/* Step 2: Conditions */}
                <div className="flex gap-[12px] items-start">
                  <div className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-full size-[32px] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Sliders className="size-[14px]" />
                  </div>
                  <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 flex flex-col gap-0.5 text-right">
                    <span className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      شروط التحقق (2)
                    </span>
                    <span className="text-[#181d17] text-[13px] font-normal leading-[20px]">
                      مصدر الحجز: whatsapp.com + قفل إلكتروني ذكي
                    </span>
                  </div>
                </div>

                {/* Connector */}
                <div className="pr-[15px] -my-1">
                  <div className="w-[2px] h-[20px] bg-[#dfe4db]" />
                </div>

                {/* Step 3: Actions */}
                <div className="flex gap-[12px] items-start">
                  <div className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-full size-[32px] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Send className="size-[14px]" />
                  </div>
                  <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 flex flex-col gap-0.5 text-right">
                    <span className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      الإجراءات التلقائية (2)
                    </span>
                    <span className="text-[#181d17] text-[13px] font-normal leading-[20px]">
                      إرسال WhatsApp + قيد سجل التدقيق
                    </span>
                  </div>
                </div>

                {/* Connector */}
                <div className="pr-[15px] -my-1">
                  <div className="w-[2px] h-[20px] bg-[#dfe4db]" />
                </div>

                {/* Step 4: Scope */}
                <div className="flex gap-[12px] items-start">
                  <div className="bg-[#e5eae0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-full size-[32px] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
                    <Building2 className="size-[14px]" />
                  </div>
                  <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex-1 flex flex-col gap-0.5 text-right">
                    <span className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                      النطاق والشمول
                    </span>
                    <span className="text-[#181d17] text-[13px] font-normal leading-[20px]">
                      شامل لكافة العقارات (18 عقاراً • 142 وحدة)
                    </span>
                  </div>
                </div>
              </div>

              {/* Highlighted Rule Formulation Block */}
              <div className="bg-[#ebefe6] border-r-4 border-[#34422a] rounded-[12px] p-[14px] text-right">
                <span className="font-bold text-[#34422a] text-[13px] leading-[21.13px]">
                  صياغة القاعدة:{" "}
                </span>
                <span className="font-normal text-[#181d17] text-[13px] leading-[21.13px]">
                  {ruleName.trim()
                    ? `عند ${triggerEvent} وكان الحجز عبر ${sourceCondition} ← إرسال رسالة WhatsApp (${selectedTemplate}) للنزيل وتوثيق تدقيق آلي في ${scope === "all" ? "كافة العقارات" : "العقارات المحددة"}.`
                    : "أدخل اسم ومحددات القاعدة لعرض الصياغة الآلية لسير العمل..."}
                </span>
              </div>
            </div>

            {/* CARD 2: اختبار المحاكاة السريعة */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[12px]">
              <div className="border-b border-[#e5eae0] pb-[12px]">
                <h3 className="text-[18px] font-bold text-[#181d17]">
                  اختبار المحاكاة السريعة
                </h3>
              </div>

              <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                تحقق من مسار معالجة الشروط دون إرسال رسائل فعلية للنزلاء.
              </p>

              {/* Sample Selector */}
              <div className="flex flex-col gap-[4px] pt-[4px]">
                <label className="text-[11px] font-semibold text-[#454840]">
                  عينة حجز نشطة للاختبار
                </label>
                <SelectDropdown
                  value={selectedSampleBooking}
                  onChange={setSelectedSampleBooking}
                  options={
                    sampleBookings.length > 0
                      ? sampleBookings
                      : ["(لا توجد حجوزات مسجلة حالياً)"]
                  }
                  placeholder="اختر عينة حجز..."
                  triggerClassName="bg-[#f1f5eb] rounded-[8px] h-[40px] px-[16px] text-[13px] font-normal text-[#181d17] border-0"
                />
              </div>

              {/* Safe Simulation Mode Switch */}
              <div className="bg-[#f1f5eb] rounded-[8px] p-[10px] flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#181d17]">
                  وضع المحاكاة الآمنة
                </span>
                <button
                  type="button"
                  onClick={() => setSafeSimulationMode(!safeSimulationMode)}
                  className={`w-[44px] h-[24px] rounded-full transition-colors relative p-[2px] ${
                    safeSimulationMode ? "bg-[#34422a]" : "bg-[#c5c8bd]"
                  }`}
                >
                  <div
                    className={`size-[20px] rounded-full bg-white transition-transform ${
                      safeSimulationMode ? "translate-x-0" : "-translate-x-[20px]"
                    }`}
                  />
                </button>
              </div>

              {/* Evaluation Output Preview Pill */}
              <div className="bg-[rgba(216,232,203,0.4)] rounded-[8px] p-[12px] flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <CheckCircle2 className="size-[16px] text-[#34422a]" />
                  <span className="text-[12px] font-semibold text-[#181d17]">
                    نتيجة الفحص التقديري
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#34422a]">
                  مؤهل للتنفيذ (100%)
                </span>
              </div>

              {/* Run Simulation Button */}
              <button
                type="button"
                onClick={handleSimulate}
                disabled={simulationRunning}
                className="bg-[#e5eae0] hover:bg-[#d8e8cb] text-[#181d17] text-[12px] font-bold h-[40px] rounded-[12px] flex items-center justify-center gap-[6px] w-full transition-colors disabled:opacity-50"
              >
                <span>
                  {simulationRunning ? "جاري تشغيل المحاكاة..." : "تشغيل محاكاة الاختبار الآن ⚡"}
                </span>
              </button>
            </div>

            {/* CARD 3: التأثير المتوقع خلال 7 أيام القادمة */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[16px] flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#454840]">
                  التأثير المتوقع خلال 7 أيام القادمة
                </span>
                <span className="text-[11px] font-bold text-[#34422a]">
                  تقدير دقيق
                </span>
              </div>

              <div className="grid grid-cols-2 gap-[8px]">
                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] text-center flex flex-col items-center">
                  <span className="text-[18px] font-bold text-[#181d17] leading-[28px]">
                    34
                  </span>
                  <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    رسالة مؤهلة
                  </span>
                </div>

                <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] text-center flex flex-col items-center">
                  <span className="text-[18px] font-bold text-[#34422a] leading-[28px]">
                    0%
                  </span>
                  <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    تعارض مع القواعد
                  </span>
                </div>
              </div>
            </div>

            {/* FINAL ACTION BUTTONS PANEL */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[16px] flex flex-col gap-[10px]">
              <button
                type="submit"
                className="bg-[#34422a] hover:bg-[#283320] text-white text-[14px] font-semibold h-[48px] rounded-[12px] flex items-center justify-center gap-[8px] w-full transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
              >
                <CheckCircle2 className="size-[16px]" />
                <span>حفظ وتفعيل القاعدة</span>
              </button>

              <button
                type="button"
                onClick={handleDraftSave}
                className="bg-[#ebefe6] hover:bg-[#dfe4db] text-[#181d17] text-[14px] font-semibold h-[44px] rounded-[12px] flex items-center justify-center gap-[8px] w-full transition-colors"
              >
                <Bookmark className="size-[14px]" />
                <span>حفظ كمسودة</span>
              </button>

              <Link
                href="/automation/"
                className="text-[#454840] hover:text-[#181d17] text-[12px] font-semibold text-center py-[8px] transition-colors block w-full"
              >
                إلغاء والتراجع عن التغييرات
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

