"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Code2,
  FileText,
  MessageSquare,
  Sparkles,
  MapPin,
  KeyRound,
  ShieldCheck,
  Send,
  Building2,
  Check,
  CheckCheck,
  SlidersHorizontal,
  Smartphone,
  Phone,
  Video,
  MoreVertical,
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Layers,
  Lock,
  Mic,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { FloatingConfirmationBar } from "@/components/shared/floating-confirmation-bar";

export function CreateTemplateView() {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Form states matching 1:24243 (initialized empty for user entry)
  const [templateName, setTemplateName] = useState("");
  const [templateCode, setTemplateCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("bookings");
  const [language] = useState("العربية (ar)");

  const [messageBody, setMessageBody] = useState("");
  const [buttonLabel, setButtonLabel] = useState("");
  const [governanceStatus, setGovernanceStatus] = useState<"active" | "draft" | "paused">("active");
  const [applyGlobally, setApplyGlobally] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 12 dynamic variables list from 1:24243
  const availableVariables = [
    "اسم العميل",
    "اسم العقار",
    "رقم الوحدة",
    "رقم الحجز",
    "تاريخ الوصول",
    "وقت الوصول",
    "تاريخ المغادرة",
    "وقت المغادرة",
    "كود الدخول",
    "رابط الموقع",
    "عدد الأيام المتبقية",
    "رقم التواصل",
  ];

  // Insert variable into textarea
  const insertVariable = (varName: string) => {
    const placeholder = `{{${varName}}}`;
    if (!textareaRef.current) {
      setMessageBody((prev) => `${prev} ${placeholder}`);
      return;
    }
    const start = textareaRef.current.selectionStart || 0;
    const end = textareaRef.current.selectionEnd || 0;
    const newText = messageBody.substring(0, start) + ` ${placeholder} ` + messageBody.substring(end);
    setMessageBody(newText);
    toast.success(`تمت إضافة المتغير ${placeholder}`);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + placeholder.length + 2, start + placeholder.length + 2);
      }
    }, 50);
  };

  // Format formatting toolbar helper
  const applyFormatting = (prefix: string, suffix: string = prefix) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart || 0;
    const end = textareaRef.current.selectionEnd || 0;
    const selected = messageBody.substring(start, end);
    const formatted = `${prefix}${selected || "نص"}${suffix}`;
    const newText = messageBody.substring(0, start) + formatted + messageBody.substring(end);
    setMessageBody(newText);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);
  };

  // Clear text
  const handleClearText = () => {
    setMessageBody("");
    toast.info("تم تفريغ نص الرسالة");
  };

  // Live preview replacement for the phone mockup
  const previewFormattedText = messageBody
    .replace(/\{\{اسم العميل\}\}/g, "فيصل السبيعي")
    .replace(/\{\{اسم العقار\}\}/g, "عمارة النخيل الفندقية")
    .replace(/\{\{رقم الوحدة\}\}/g, "الوحدة 204")
    .replace(/\{\{رقم الحجز\}\}/g, "BK-2026-1049")
    .replace(/\{\{تاريخ الوصول\}\}/g, "26 أغسطس 2026")
    .replace(/\{\{وقت الوصول\}\}/g, "الساعة 02:00 م")
    .replace(/\{\{تاريخ المغادرة\}\}/g, "30 أغسطس 2026")
    .replace(/\{\{وقت المغادرة\}\}/g, "الساعة 12:00 م")
    .replace(/\{\{كود الدخول\}\}/g, "583921")
    .replace(/\{\{رابط الموقع\}\}/g, "https://maps.abraj.sa/loc/204")
    .replace(/\{\{عدد الأيام المتبقية\}\}/g, "4 أيام")
    .replace(/\{\{رقم التواصل\}\}/g, "+966501234567");

  const confirm = useConfirm();

  const handleSave = async (statusOverride?: "active" | "draft" | "paused") => {
    const finalStatus = statusOverride || governanceStatus;
    const ok = await confirm({
      title: "تأكيد اعتماد وحفظ القالب",
      message: `هل أنت متأكد من حفظ قالب واتساب "${templateName}" (${templateCode}) بحالة ${
        finalStatus === "active" ? "مفعلة" : finalStatus === "draft" ? "مسودة" : "متوقفة"
      }؟`,
      confirmLabel: "حفظ القالب",
      variant: "default",
    });
    if (!ok) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("تم اعتماد وحفظ قالب واتساب بنجاح في محرك الأتمتة المركزي!");
      router.push("/automation/?tab=templates");
    }, 800);
  };

  return (
    <div className="space-y-6 font-cairo pb-6" dir="rtl">
      {/* Top Header Card [1:24243] */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EBEBEB] shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/automation/?tab=templates"
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#454840] transition-colors cursor-pointer"
            title="الرجوع للقوالب"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div>
            <h1 className="text-[24px] font-bold text-[#181D17]">إنشاء قالب واتساب</h1>
            <p className="text-xs text-[#75786F] mt-1">
              قم بإنشاء وصياغة قالب رسالة واتساب معتمد وقابل لإعادة الاستخدام وربطه بمحرك الأتمتة المركزي للمنصة.
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid Layout [1:24243] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column: Form Sections (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: بيانات وتصنيف القالب [1:24243] */}
          <div className="bg-white rounded-[24px] p-6 border border-[#EBEBEB] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#4B5940]" />
                <h2 className="text-[16px] font-bold text-[#181D17]">بيانات وتصنيف القالب</h2>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF1E8] text-[#34422A] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34422A]" />
                <span>اللغة: العربية (ar)</span>
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#181D17] mb-1.5">
                  اسم القالب *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-[12px] border border-[#E5E8E2] text-xs text-[#181D17] focus:outline-none focus:border-[#4B5940] transition-colors"
                  placeholder="تأكيد الحجز وموقع الوحدة"
                  required
                />
                <p className="text-[10.5px] text-[#75786F] mt-1.5">
                  اسم تعريفي داخلي يظهر لمشرفي النظام ومديري المحتوى.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#181D17] mb-1.5">
                  الرمز البرمجي (API Key) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={templateCode}
                    onChange={(e) =>
                      setTemplateCode(e.target.value.toLowerCase().replace(/\s+/g, "_"))
                    }
                    className="w-full h-11 pr-3.5 pl-9 rounded-[12px] border border-[#E5E8E2] text-xs font-mono text-[#181D17] focus:outline-none focus:border-[#4B5940] transition-colors"
                    placeholder="tpl_booking_confirmation_v2"
                    required
                  />
                  <Code2 className="w-4 h-4 text-[#75786F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <p className="text-[10.5px] text-[#75786F] mt-1.5">
                  يُستخدم للربط عبر Webhook وخدمات الأتمتة.
                </p>
              </div>
            </div>

            {/* Functional Category Pills */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-[#181D17]">
                التصنيف الوظيفي
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "bookings", label: "الحجوزات" },
                  { id: "arrival", label: "الوصول" },
                  { id: "departure", label: "المغادرة" },
                  { id: "door_pin", label: "كود الدخول" },
                  { id: "operations", label: "التشغيل والعمليات" },
                  { id: "other", label: "... أخرى" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-[10px] text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-[#34422A] text-white shadow-2xs"
                        : "bg-[#FAFBF9] hover:bg-gray-100 text-[#454840] border border-[#E5E8E2]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: محتوى الرسالة والمتغيرات [1:24243] */}
          <div className="bg-white rounded-[24px] p-6 border border-[#EBEBEB] shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F3F4F6]">
              <div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#4B5940]" />
                  <h2 className="text-[16px] font-bold text-[#181D17]">محتوى الرسالة والمتغيرات</h2>
                </div>
                <p className="text-xs text-[#75786F] mt-1">
                  انقر فوق أي متغير لإدراجه فوراً في موضع المؤشر داخل نص القالب.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAFBF9] text-[#454840] border border-[#EBEFE6]">
                8 متغيرات مستخدمة
              </span>
            </div>

            {/* 12 Available Dynamic Variables Box [1:24243] */}
            <div className="bg-[#F1F5EB] rounded-[18px] p-4 space-y-3 border border-[#E5E8E2]/60">
              <div className="flex items-center justify-between text-xs font-bold text-[#181D17]">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#4B5940]" />
                  <span>المتغيرات الديناميكية المتاحة</span>
                </div>
                <span className="text-[11px] font-normal text-[#75786F]">12 متغير معتمد</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableVariables.map((varName) => (
                  <button
                    key={varName}
                    type="button"
                    onClick={() => insertVariable(varName)}
                    className="px-2.5 py-1.5 rounded-[8px] bg-white hover:bg-[#FAFBF9] text-[#34422A] hover:text-[#181D17] text-[11px] font-medium border border-[#E5E8E2] shadow-2xs transition-all flex items-center justify-center gap-1 text-center cursor-pointer group"
                    title={`إدراج {{${varName}}}`}
                  >
                    <span className="text-[#4B5940] group-hover:scale-110 transition-transform font-bold">+</span>
                    <span>&#123;&#123;{varName}&#125;&#125;</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea with Rich Formatting Toolbar */}
            <div className="space-y-2">
              {/* Toolbar */}
              <div className="bg-[#FAFBF9] border border-[#E5E8E2] rounded-t-[12px] p-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyFormatting("*")}
                    className="w-7 h-7 rounded-[6px] hover:bg-gray-200 text-xs font-bold flex items-center justify-center text-[#181D17] transition-colors cursor-pointer"
                    title="عريض (*نص*)"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormatting("_")}
                    className="w-7 h-7 rounded-[6px] hover:bg-gray-200 text-xs italic font-serif flex items-center justify-center text-[#181D17] transition-colors cursor-pointer"
                    title="مائل (_نص_)"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => applyFormatting("~")}
                    className="w-7 h-7 rounded-[6px] hover:bg-gray-200 text-xs line-through flex items-center justify-center text-[#181D17] transition-colors cursor-pointer"
                    title="مشطوب (~نص~)"
                  >
                    S
                  </button>
                  <div className="w-[1px] h-4 bg-gray-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertVariable("رابط الموقع")}
                    className="w-7 h-7 rounded-[6px] hover:bg-gray-200 flex items-center justify-center text-[#4B5940] transition-colors cursor-pointer"
                    title="رابط الموقع"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertVariable("كود الدخول")}
                    className="w-7 h-7 rounded-[6px] hover:bg-gray-200 flex items-center justify-center text-[#4B5940] transition-colors cursor-pointer"
                    title="كود الدخول"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.info("تم تحسين صياغة الرسالة آلياً بواسطة محرك الذكاء الاصطناعي")}
                    className="w-7 h-7 rounded-[6px] hover:bg-gray-200 flex items-center justify-center text-amber-600 transition-colors cursor-pointer"
                    title="تحسين النص بالذكاء الاصطناعي"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleClearText}
                  className="text-[11px] text-[#75786F] hover:text-red-600 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  مسح النص
                </button>
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                rows={8}
                className="w-full p-4 rounded-b-[12px] border-x border-b border-[#E5E8E2] text-xs font-mono leading-relaxed text-[#181D17] focus:outline-none focus:border-[#4B5940] transition-colors resize-y"
                placeholder="اكتب نص الرسالة هنا..."
              />

              {/* Footer info below textarea */}
              <div className="flex items-center justify-between text-[11px] text-[#75786F] pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4B5940]" />
                  <span>يدعم تنسيقات واتساب القياسية: *عريض* ، _مائل_ ، ~مشطوب~</span>
                </div>
                <span>{messageBody.length} / 1024 حرف</span>
              </div>
            </div>

            {/* Quick Actions (الأزرار التفاعلية المرفقة) [1:24243] */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#181D17]">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#4B5940]" />
                  <span>الأزرار التفاعلية المرفقة (Quick Actions)</span>
                </div>
                <span className="text-[11px] font-normal text-[#75786F]">ميزة معتمدة من Meta</span>
              </div>

              <div className="p-3.5 rounded-[14px] bg-[#FAFBF9] border border-[#E5E8E2] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="px-2.5 py-1 rounded-[6px] text-[10.5px] font-bold bg-[#EAF1E8] text-[#34422A]">
                    رابط تفاعلي
                  </span>
                  <input
                    type="text"
                    value={buttonLabel}
                    onChange={(e) => setButtonLabel(e.target.value)}
                    className="h-9 px-3 rounded-[8px] border border-[#E5E8E2] text-xs text-[#181D17] bg-white flex-1 focus:outline-none focus:border-[#4B5940]"
                    placeholder="فتح الموقع في الخرائط"
                  />
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-white text-[#454840] border border-[#E5E8E2]">
                  تطبيق الواتساب
                </span>
              </div>
            </div>

            {/* Meta Cloud API Notice Card [1:24243] */}
            <div className="bg-[#F1F5EB] rounded-[16px] p-4 flex items-start gap-3 border border-[#E5E8E2]/60">
              <ShieldCheck className="w-5 h-5 text-[#4B5940] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-[#454840]">
                <div className="font-bold text-[#181D17]">تنويه اعتماد Meta Cloud API المباشر</div>
                <p className="leading-relaxed text-[11.5px]">
                  يخضع محتوى القالب لفحص الامتثال التلقائي الفوري لسياسات المراسلة للأعمال التجارية. تضمن المنصة ربط المتغيرات بسياق المعاملة التشغيلية لمنع تصنيف الرسائل كترويجية.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: إعدادات الحالة والحوكمة [1:24243] */}
          <div className="bg-white rounded-[24px] p-6 border border-[#EBEBEB] shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3.5 border-b border-[#F3F4F6]">
              <SlidersHorizontal className="w-5 h-5 text-[#4B5940]" />
              <h2 className="text-[16px] font-bold text-[#181D17]">إعدادات الحالة والحوكمة</h2>
            </div>

            {/* 3 Radio Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Card 1: تفعيل فوري */}
              <div
                onClick={() => setGovernanceStatus("active")}
                className={`p-4 rounded-[16px] border transition-all cursor-pointer space-y-2 ${
                  governanceStatus === "active"
                    ? "bg-[#F1F5EB] border-[#4B5940] shadow-2xs ring-1 ring-[#4B5940]"
                    : "bg-[#FAFBF9] border-[#E5E8E2] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    governanceStatus === "active" ? "border-[#4B5940] bg-[#4B5940]" : "border-gray-400"
                  }`}>
                    {governanceStatus === "active" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#D8E8CB] text-[#34422A] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#34422A]" />
                    <span>مفعلة</span>
                  </span>
                </div>

                <div className="font-bold text-xs text-[#181D17]">تفعيل فوري</div>
                <p className="text-[11px] text-[#75786F] leading-relaxed">
                  يصبح القالب متاحاً فوراً لمحركات الأتمتة والرسائل اللحظية.
                </p>
              </div>

              {/* Card 2: حفظ كمسودة */}
              <div
                onClick={() => setGovernanceStatus("draft")}
                className={`p-4 rounded-[16px] border transition-all cursor-pointer space-y-2 ${
                  governanceStatus === "draft"
                    ? "bg-[#F1F5EB] border-[#4B5940] shadow-2xs ring-1 ring-[#4B5940]"
                    : "bg-[#FAFBF9] border-[#E5E8E2] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    governanceStatus === "draft" ? "border-[#4B5940] bg-[#4B5940]" : "border-gray-400"
                  }`}>
                    {governanceStatus === "draft" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FAFBF9] text-[#75786F] border border-[#E5E8E2] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#75786F]" />
                    <span>مسودة</span>
                  </span>
                </div>

                <div className="font-bold text-xs text-[#181D17]">حفظ كمسودة</div>
                <p className="text-[11px] text-[#75786F] leading-relaxed">
                  يُحفظ القالب للتعديل لاحقاً دون نشره في خطوط الأتمتة المباشرة.
                </p>
              </div>

              {/* Card 3: إيقاف مؤقت */}
              <div
                onClick={() => setGovernanceStatus("paused")}
                className={`p-4 rounded-[16px] border transition-all cursor-pointer space-y-2 ${
                  governanceStatus === "paused"
                    ? "bg-[#F1F5EB] border-[#4B5940] shadow-2xs ring-1 ring-[#4B5940]"
                    : "bg-[#FAFBF9] border-[#E5E8E2] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    governanceStatus === "paused" ? "border-[#4B5940] bg-[#4B5940]" : "border-gray-400"
                  }`}>
                    {governanceStatus === "paused" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#E5EAE0] text-[#75786F] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#75786F]" />
                    <span>متوقفة</span>
                  </span>
                </div>

                <div className="font-bold text-xs text-[#181D17]">إيقاف مؤقت</div>
                <p className="text-[11px] text-[#75786F] leading-relaxed">
                  إيقاف الإرسال التلقائي للقالب مع الاحتفاظ ببياناته وإحصاءاته.
                </p>
              </div>
            </div>

            {/* Global platform application checkbox */}
            <div className="p-4 rounded-[16px] bg-[#F1F5EB] border border-[#E5E8E2]/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#4B5940] shrink-0" />
                <div>
                  <div className="font-bold text-xs text-[#181D17]">
                    تطبيق على جميع العقارات المشتركة في المنصة
                  </div>
                  <div className="text-[11px] text-[#75786F] mt-0.5">
                    عند التفعيل، سيكون هذا القالب الافتراضي لكافة الأصول العقارية المدارة آلياً.
                  </div>
                </div>
              </div>

              <input
                type="checkbox"
                checked={applyGlobally}
                onChange={(e) => setApplyGlobally(e.target.checked)}
                className="w-5 h-5 rounded accent-[#34422A] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Left Column: Live Realistic Smartphone Mockup (4 Cols) [1:24243] */}
        <div className="lg:col-span-4 sticky top-6 space-y-2.5">
          {/* Header above smartphone */}
          <div className="flex items-center justify-between px-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D8E8CB] text-[#34422A]">
              بيانات تجريبية
            </span>

            <div className="flex items-center gap-1.5 font-bold text-xs text-[#181D17]">
              <span>المعاينة الحية التفاعلية</span>
              <Smartphone className="w-4 h-4 text-[#4B5940]" />
            </div>
          </div>

          {/* Realistic Smartphone Frame with Physical Side Buttons & Tall 19.5:9 Aspect Ratio */}
          <div className="relative mx-auto max-w-[340px]">
            {/* Hardware side buttons (Physical accents) */}
            <div className="absolute -start-[10px] top-24 w-[3px] h-10 bg-[#242A22] rounded-s-sm shadow-xs" aria-hidden="true" />
            <div className="absolute -start-[10px] top-38 w-[3px] h-10 bg-[#242A22] rounded-s-sm shadow-xs" aria-hidden="true" />
            <div className="absolute -end-[10px] top-28 w-[3px] h-14 bg-[#242A22] rounded-e-sm shadow-xs" aria-hidden="true" />

            {/* Smartphone Body */}
            <div className="bg-[#111B21] rounded-[50px] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] border-[8px] border-[#1E231C] ring-1 ring-white/10 overflow-hidden text-right flex flex-col">
              {/* Phone Top Notch / Status Bar with Dynamic Island */}
              <div className="pt-2 pb-2 px-5 flex items-center justify-between text-gray-400 text-[10px] font-mono select-none">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 text-gray-300">
                    <Wifi className="w-3 h-3" />
                  </div>
                  <span>94%</span>
                  <div className="w-4 h-2.5 border border-gray-400 rounded-2xs flex items-center p-0.5">
                    <div className="w-full h-full bg-emerald-500 rounded-[1px]" />
                  </div>
                </div>

                {/* Dynamic Island pill */}
                <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-[#111B21] ring-1 ring-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a2329]" />
                </div>

                <span className="font-semibold text-gray-300 tracking-wider">09:41</span>
              </div>

              {/* WhatsApp App Bar */}
              <div className="bg-[#1F2C34] px-3 py-2.5 rounded-t-[20px] flex items-center justify-between border-b border-gray-700/50 shrink-0">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <MoreVertical className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                  <Phone className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                  <Video className="w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors" />
                </div>

                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-[11px] font-bold text-white flex items-center gap-1 justify-end">
                      <span>BYTE HOME لإدارة الأصول</span>
                      <BadgeCheck className="w-3 h-3 text-[#3E8A5A] fill-[#3E8A5A]/20" />
                    </div>
                    <div className="text-[9.5px] text-[#3E8A5A]">حساب أعمال رسمي موثّق</div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#34422A] flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
                    <Building2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>

              {/* WhatsApp Chat Body (Taller authentic smartphone height) */}
              <div className="bg-[#EFEAE2] p-3.5 min-h-[580px] flex flex-col justify-between space-y-3 relative overflow-hidden rounded-b-[20px]">
                {/* Subtle WhatsApp wallpaper pattern background */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                  aria-hidden="true"
                />

                {/* Top: Date Chip & Message Content */}
                <div className="space-y-3 relative z-10">
                  {/* Date Badge */}
                  <div className="text-center">
                    <span className="px-3 py-0.5 rounded-full bg-white/90 text-[#75786F] text-[10px] font-semibold shadow-2xs">
                      اليوم
                    </span>
                  </div>

                  {/* Chat Message Bubble */}
                  <div className="bg-[#E7FFDB] rounded-[16px] rounded-tr-none p-3 shadow-xs border border-[#D5ECC9] space-y-1.5 text-right">
                    <div className="text-[11.5px] text-[#181D17] leading-relaxed whitespace-pre-line font-cairo">
                      {previewFormattedText}
                    </div>

                    {/* Timestamp and Read Status */}
                    <div className="flex items-center justify-start gap-1 text-[9.5px] text-[#75786F] pt-1">
                      <span>09:41 ص</span>
                      <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                    </div>
                  </div>

                  {/* Action Button Preview */}
                  {buttonLabel && (
                    <div className="w-full py-2 px-3 rounded-[10px] bg-white text-[#181D17] text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-2xs border border-[#E5E8E2] hover:bg-gray-50 transition-colors">
                      <MapPin className="w-3 h-3 text-[#4B5940]" />
                      <span>{buttonLabel}</span>
                    </div>
                  )}
                </div>

                {/* Bottom: Encryption Notice, Input Bar & Home Indicator */}
                <div className="space-y-2 relative z-10 pt-2">
                  {/* End-to-end Encrypted Notice */}
                  <div className="flex items-center justify-center gap-1 text-[9.5px] text-[#75786F]">
                    <Lock className="w-3 h-3" />
                    <span>محادثة مشفرة بالكامل بين الطرفين</span>
                  </div>

                  {/* Simulated Input Bar */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[10px] text-[#75786F] flex items-center justify-between border border-[#E5E8E2] shadow-2xs">
                      <Mic className="w-3.5 h-3.5 text-[#75786F]" />
                      <span>الرسائل التلقائية مفعلة</span>
                    </div>
                  </div>

                  {/* Home Indicator / Gesture Bar */}
                  <div className="pt-2 pb-0.5">
                    <div className="w-28 h-1 bg-black/40 rounded-full mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Caption below phone */}
          <p className="text-[11px] text-[#75786F] text-center leading-relaxed px-2">
            معاينة افتراضية للبيانات المستبدلة تلقائياً عند الإرسال الفعلي للضيف عبر خوادم برّاق.
          </p>
        </div>
      </div>

      {/* Floating Confirmation & Save Bar */}
      <FloatingConfirmationBar
        rightContent={
          <div className="flex items-center gap-2.5 text-xs text-right">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shrink-0 animate-pulse" />
            <div>
              <span className="font-bold text-sm text-[#172115]">
                جاهز للحفظ والاعتماد في محرك الأتمتة المركزي
              </span>
              <span className="text-[#75786F] ms-2 text-[11px]">
                آخر فحص للامتثال: قبل لحظات
              </span>
            </div>
          </div>
        }
        actions={[
          {
            label: "إلغاء",
            href: "/automation/?tab=templates",
            variant: "secondary",
          },
          {
            label: "حفظ كمسودة",
            onClick: () => handleSave("draft"),
            variant: "draft",
            disabled: isSubmitting,
          },
          {
            label: "حفظ القالب",
            onClick: () => handleSave("active"),
            variant: "primary",
            icon: Check,
            disabled: isSubmitting,
            loading: isSubmitting,
            loadingText: "جارٍ الحفظ والاعتماد...",
          },
        ]}
      />
    </div>
  );
}
