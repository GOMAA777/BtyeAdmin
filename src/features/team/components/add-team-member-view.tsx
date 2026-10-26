"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Sparkles,
  Wrench,
  Building2,
  CheckCircle2,
  CheckSquare,
  Square,
  Clock,
  Check,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { TeamRole } from "../types";

export function AddTeamMemberView() {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<TeamRole>("cleaner");
  const [phone, setPhone] = useState("50 123 4567");
  const [whatsapp, setWhatsapp] = useState("50 123 4567");
  const [isSamePhone, setIsSamePhone] = useState(true);
  const [specialNotes, setSpecialNotes] = useState("");

  // Scope State
  const [coverageScope, setCoverageScope] = useState<"all" | "custom">("custom");
  const [prop1Checked, setProp1Checked] = useState(true);
  const [prop1AllUnits, setProp1AllUnits] = useState(true);
  const [prop2Checked, setProp2Checked] = useState(true);
  const [prop3Checked, setProp3Checked] = useState(false);

  // Task Automation Types
  const [cleaningAutomated, setCleaningAutomated] = useState(true);
  const [maintenanceAutomated, setMaintenanceAutomated] = useState(false);

  const selectedPropsCount = (prop1Checked ? 1 : 0) + (prop2Checked ? 1 : 0) + (prop3Checked ? 1 : 0);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("يرجى إدخال الاسم الكامل للعضو");
      return;
    }
    toast.success("تم حفظ ونشر بيانات عضو الفريق الجديد بنجاح");
    router.push("/team");
  };

  const handleSaveDraft = () => {
    toast.info("تم حفظ مسودة عضو الفريق بنجاح");
  };

  return (
    <form onSubmit={handlePublish} className="space-y-6" dir="rtl">
      {/* SECTION 1: TOP HERO GREETING BAR */}
      <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/team"
              className="text-[#75786f] hover:text-[#181d17] transition-colors p-1"
              title="العودة لفريق العمل"
            >
              <ChevronLeft className="size-5 rotate-180" />
            </Link>
            <h1 className="text-[24px] font-bold text-[#181d17] font-cairo leading-[34px]">
              إضافة عضو للفريق
            </h1>
          </div>
          <p className="text-[13px] font-medium text-[#454840] font-cairo leading-[20px] ps-7">
            أدخل بيانات العضو وحدد نطاق مسؤوليته لإسناد المهام التشغيلية وإرسال التنبيهات الميدانية إليه تلقائياً.
          </p>
        </div>
      </div>

      {/* SECTION 2: PRIMARY FORM CANVAS */}
      <div className="space-y-6">
        {/* CARD 1: البيانات الأساسية والهوية */}
        <div className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-6 border border-[#dfe4db]/50">
          <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[8px] bg-[#e5eae0] flex items-center justify-center text-[#34422a]">
                <User className="size-5" />
              </div>
              <h2 className="text-[18px] font-bold text-[#181d17] font-cairo">
                البيانات الأساسية والهوية
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-[#ba1a1a] font-cairo">
              * حقول إلزامية
            </span>
          </div>

          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-[14px] font-semibold text-[#181d17] flex items-center gap-1 font-cairo">
              <span className="text-[#ba1a1a] font-bold">*</span>
              <span>الاسم الكامل للعضو</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="مثال: عبد الرحمن الشهري"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-12 bg-[#f1f5eb] rounded-[12px] px-4 pr-11 text-[15px] font-normal text-[#181d17] placeholder-[#75786f] focus:outline-none focus:ring-1 focus:ring-[#34422a] font-cairo shadow-inner"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#75786f] pointer-events-none" />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-[14px] font-semibold text-[#181d17] flex items-center gap-1 font-cairo">
              <span className="text-[#ba1a1a] font-bold">*</span>
              <span>التخصص التشغيلي (نوع العضو)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Role 1: Cleaner */}
              <div
                onClick={() => setRole("cleaner")}
                className={`p-4 rounded-[12px] border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  role === "cleaner"
                    ? "bg-[#f1f5eb] border-[#34422a] shadow-sm"
                    : "bg-[#f1f5eb]/60 border-transparent hover:bg-[#f1f5eb]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`size-5 rounded-full flex items-center justify-center ${role === "cleaner" ? "bg-[#34422a] text-white" : "border border-[#dfe4db] bg-white"}`}>
                    {role === "cleaner" && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                  <div className="size-9 rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#34422a]">
                    <Sparkles className="size-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#181d17] font-cairo">
                    عامل نظافة
                  </h3>
                  <p className="text-[12px] text-[#75786f] mt-1 font-medium font-cairo leading-relaxed">
                    تنظيف دوري وتجهيز الوحدات بعد المغادرة مع توثيق الصور
                  </p>
                </div>
              </div>

              {/* Role 2: Maintenance */}
              <div
                onClick={() => setRole("maintenance")}
                className={`p-4 rounded-[12px] border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  role === "maintenance"
                    ? "bg-[#f1f5eb] border-[#34422a] shadow-sm"
                    : "bg-[#f1f5eb]/60 border-transparent hover:bg-[#f1f5eb]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`size-5 rounded-full flex items-center justify-center ${role === "maintenance" ? "bg-[#34422a] text-white" : "border border-[#dfe4db] bg-white"}`}>
                    {role === "maintenance" && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                  <div className="size-9 rounded-[8px] bg-[#ebefe6] flex items-center justify-center text-[#34422a]">
                    <Wrench className="size-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#181d17] font-cairo">
                    فني صيانة
                  </h3>
                  <p className="text-[12px] text-[#75786f] mt-1 font-medium font-cairo leading-relaxed">
                    معالجة بلاغات السباكة، الكهرباء، التكييف، والأعطال الطارئة
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone & WhatsApp Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Personal Phone */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-semibold text-[#181d17] flex items-center gap-1 font-cairo">
                  <span className="text-[#ba1a1a] font-bold">*</span>
                  <span>رقم الجوال الشخصي</span>
                </label>
                <span className="text-[11px] text-[#75786f] font-cairo">استقبال المكالمات</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 bg-[#ebefe6] px-3 rounded-[10px] flex items-center text-[13px] font-bold text-[#181d17] font-cairo shrink-0" dir="ltr">
                  +966
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (isSamePhone) setWhatsapp(e.target.value);
                  }}
                  className="w-full h-12 bg-[#f1f5eb] rounded-[12px] px-4 text-[14.5px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#34422a] font-cairo shadow-inner"
                  dir="ltr"
                />
              </div>
            </div>

            {/* WhatsApp Phone */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-semibold text-[#181d17] flex items-center gap-1 font-cairo">
                  <span className="text-[#ba1a1a] font-bold">*</span>
                  <span>رقم الواتساب التشغيلي</span>
                </label>
                <label
                  onClick={() => {
                    const next = !isSamePhone;
                    setIsSamePhone(next);
                    if (next) setWhatsapp(phone);
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-[#454840] cursor-pointer font-cairo select-none"
                >
                  {isSamePhone ? (
                    <CheckSquare className="size-4 text-[#34422a] fill-[#34422a]/10" />
                  ) : (
                    <Square className="size-4 text-[#75786f]" />
                  )}
                  <span>نفس رقم الجوال</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 bg-[#ebefe6] px-3 rounded-[10px] flex items-center text-[13px] font-bold text-[#181d17] font-cairo shrink-0" dir="ltr">
                  +966
                </div>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  disabled={isSamePhone}
                  className="w-full h-12 bg-[#f1f5eb] rounded-[12px] px-4 text-[14.5px] font-semibold text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#34422a] font-cairo shadow-inner disabled:opacity-75"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Special Operational Notes */}
          <div className="space-y-1.5">
            <label className="text-[14px] font-semibold text-[#181d17] font-cairo">
              ملاحظات تشغيلية خاصة (اختياري)
            </label>
            <textarea
              rows={3}
              placeholder="أية اشتراطات خاصة، ساعات العمل المفضلة، أو معلومات إضافية عن العضو..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full bg-[#f1f5eb] rounded-[12px] p-3 text-[14px] font-normal text-[#181d17] placeholder-[#75786f] focus:outline-none focus:ring-1 focus:ring-[#34422a] font-cairo shadow-inner"
            />
          </div>
        </div>

        {/* CARD 2: نطاق العمل وإسناد العقارات */}
        <div className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-6 border border-[#dfe4db]/50">
          <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[8px] bg-[#e5eae0] flex items-center justify-center text-[#34422a]">
                <Building2 className="size-5" />
              </div>
              <h2 className="text-[18px] font-bold text-[#181d17] font-cairo">
                نطاق العمل وإسناد العقارات
              </h2>
            </div>
          </div>

          {/* Geographical Coverage Level */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#181d17] font-cairo">
              مستوى التغطية الجغرافية
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setCoverageScope("custom")}
                className={`p-3.5 rounded-[12px] border cursor-pointer transition-all flex items-center gap-3 ${
                  coverageScope === "custom"
                    ? "bg-[#f1f5eb] border-[#34422a]"
                    : "bg-[#f1f5eb]/60 border-transparent hover:bg-[#f1f5eb]"
                }`}
              >
                <div className={`size-4 rounded-full border flex items-center justify-center ${coverageScope === "custom" ? "border-[#34422a]" : "border-[#767676]"}`}>
                  {coverageScope === "custom" && <div className="size-2 rounded-full bg-[#34422a]" />}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#181d17] font-cairo">
                    عقارات محددة (موصى به)
                  </div>
                  <div className="text-[11px] text-[#75786f] font-cairo">
                    اختيار عمارات أو مبانٍ بعينها
                  </div>
                </div>
              </label>

              <label
                onClick={() => setCoverageScope("all")}
                className={`p-3.5 rounded-[12px] border cursor-pointer transition-all flex items-center gap-3 ${
                  coverageScope === "all"
                    ? "bg-[#f1f5eb] border-[#34422a]"
                    : "bg-[#f1f5eb]/60 border-transparent hover:bg-[#f1f5eb]"
                }`}
              >
                <div className={`size-4 rounded-full border flex items-center justify-center ${coverageScope === "all" ? "border-[#34422a]" : "border-[#767676]"}`}>
                  {coverageScope === "all" && <div className="size-2 rounded-full bg-[#34422a]" />}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#181d17] font-cairo">
                    جميع عقاراتي
                  </div>
                  <div className="text-[11px] text-[#75786f] font-cairo">
                    تغطية لكافة أصول المحفظة
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Properties for Assignment */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[13px] font-cairo">
              <span className="font-semibold text-[#181d17]">
                العقارات المتاحة للإسناد (تم اختيار {selectedPropsCount} عقارات):
              </span>
              <button
                type="button"
                onClick={() => {
                  setProp1Checked(true);
                  setProp2Checked(true);
                  setProp3Checked(true);
                }}
                className="text-[#34422a] font-bold hover:underline"
              >
                تحديد الكل
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Item 1: عمارة النخيل */}
              <div className={`p-4 rounded-[12px] border transition-all ${prop1Checked ? "bg-[#f1f5eb] border-[#d8e8c7]" : "bg-[#f1f5eb]/50 border-transparent opacity-75"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={prop1Checked}
                      onChange={(e) => setProp1Checked(e.target.checked)}
                      className="accent-[#34422a] size-5 rounded mt-0.5"
                    />
                    <div>
                      <div className="text-[14.5px] font-bold text-[#181d17] font-cairo">
                        عمارة النخيل السكنية
                      </div>
                      <div className="text-[12px] text-[#75786f] font-cairo">
                        الرياض — حي الصحافة • 10 وحدات
                      </div>
                    </div>
                  </div>
                  <span className="bg-[#e5eae0] text-[#34422a] text-[11px] font-bold px-2 py-0.5 rounded font-cairo">
                    العقار النشط حالياً
                  </span>
                </div>

                {prop1Checked && (
                  <div className="mt-3 ps-8 pt-2 border-t border-[#dfe4db]/60 flex items-center justify-between text-[12px] font-cairo">
                    <label
                      onClick={() => setProp1AllUnits(!prop1AllUnits)}
                      className="flex items-center gap-2 cursor-pointer text-[#181d17] font-medium"
                    >
                      {prop1AllUnits ? (
                        <CheckSquare className="size-4 text-[#34422a] fill-[#34422a]/10" />
                      ) : (
                        <Square className="size-4 text-[#75786f]" />
                      )}
                      <span>تضمين كافة الوحدات السكنية (10 وحدات نشطة)</span>
                    </label>
                    <span className="text-[#75786f]">من شقة 101 إلى 304</span>
                  </div>
                )}
              </div>

              {/* Item 2: برج الياسمين */}
              <div className={`p-4 rounded-[12px] border transition-all ${prop2Checked ? "bg-[#f1f5eb] border-[#d8e8c7]" : "bg-[#f1f5eb]/50 border-transparent opacity-75"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={prop2Checked}
                      onChange={(e) => setProp2Checked(e.target.checked)}
                      className="accent-[#34422a] size-5 rounded mt-0.5"
                    />
                    <div>
                      <div className="text-[14.5px] font-bold text-[#181d17] font-cairo">
                        برج الياسمين الفندقي
                      </div>
                      <div className="text-[12px] text-[#75786f] font-cairo">
                        الرياض — حي الياسمين • 16 وحدة
                      </div>
                    </div>
                  </div>
                  <span className="bg-[#f2e1c0] text-[#231a06] text-[11px] font-bold px-2 py-0.5 rounded font-cairo">
                    تخصيص جزئي
                  </span>
                </div>

                {prop2Checked && (
                  <div className="mt-3 ps-8 pt-2 border-t border-[#dfe4db]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] font-cairo">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#454840]">الوحدات المسندة (الدور الثاني — 4 وحدات):</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-[#dfe4db] font-semibold text-[#181d17]">جناح 201</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-[#dfe4db] font-semibold text-[#181d17]">جناح 202</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-[#dfe4db] font-semibold text-[#181d17]">جناح 203</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-[#dfe4db] font-semibold text-[#181d17]">جناح 204</span>
                    </div>
                    <button type="button" className="text-[#34422a] font-bold hover:underline">
                      تعديل الشقق
                    </button>
                  </div>
                )}
              </div>

              {/* Item 3: فيلا النرجس */}
              <div className={`p-4 rounded-[12px] border transition-all ${prop3Checked ? "bg-[#f1f5eb] border-[#d8e8c7]" : "bg-[#f1f5eb]/50 border-transparent opacity-75"}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={prop3Checked}
                      onChange={(e) => setProp3Checked(e.target.checked)}
                      className="accent-[#34422a] size-5 rounded mt-0.5"
                    />
                    <div>
                      <div className="text-[14.5px] font-bold text-[#181d17] font-cairo">
                        فيلا النرجس المستقلة
                      </div>
                      <div className="text-[12px] text-[#75786f] font-cairo">
                        الرياض — حي النرجس • وحدة خاصة
                      </div>
                    </div>
                  </div>
                  <span className="text-[#75786f] text-[11px] font-cairo">
                    غير مسند
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Automated Task Types Assignment */}
          <div className="space-y-3 pt-2">
            <label className="text-[13px] font-semibold text-[#181d17] font-cairo">
              أنواع المهام التي يتم تحويلها آلياً لهذا العضو
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setCleaningAutomated(!cleaningAutomated)}
                className={`p-3.5 rounded-[12px] border cursor-pointer transition-all flex items-start gap-3 ${
                  cleaningAutomated
                    ? "bg-[#f1f5eb] border-[#34422a]"
                    : "bg-[#f1f5eb]/50 border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                {cleaningAutomated ? (
                  <CheckSquare className="size-5 text-[#34422a] fill-[#34422a]/10 shrink-0 mt-0.5" />
                ) : (
                  <Square className="size-5 text-[#75786f] shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-[13.5px] font-bold text-[#181d17] font-cairo">
                    تنظيف وتجهيز الوحدات
                  </div>
                  <div className="text-[11px] text-[#75786f] font-cairo">
                    فور تسجيل خروج الضيف (Checkout)
                  </div>
                </div>
              </label>

              <label
                onClick={() => setMaintenanceAutomated(!maintenanceAutomated)}
                className={`p-3.5 rounded-[12px] border cursor-pointer transition-all flex items-start gap-3 ${
                  maintenanceAutomated
                    ? "bg-[#f1f5eb] border-[#34422a]"
                    : "bg-[#f1f5eb]/50 border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                {maintenanceAutomated ? (
                  <CheckSquare className="size-5 text-[#34422a] fill-[#34422a]/10 shrink-0 mt-0.5" />
                ) : (
                  <Square className="size-5 text-[#75786f] shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-[13.5px] font-bold text-[#181d17] font-cairo">
                    بلاغات الصيانة والأعطال
                  </div>
                  <div className="text-[11px] text-[#75786f] font-cairo">
                    الأعطال الطارئة وجدولة التكييف
                  </div>
                </div>
              </label>
            </div>

            <p className="text-[11px] text-[#75786f] font-cairo leading-relaxed">
              * تضمن هذه الإعدادات مسار توجيه التنبيهات من نظام الحجوزات ونظام المغادرة تلقائياً دون الحاجة إلى تعيين يدوي لكل مهمة.
            </p>
          </div>
        </div>

        {/* STICKY FOOTER BAR */}
        <div className="bg-white rounded-[16px] p-4 px-6 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[12px] text-[#75786f] font-cairo">
            <Clock className="size-4 text-[#75786f]" />
            <span>آخر تحديث تلقائي للمسودة منذ دقيقة واحدة</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/team"
              className="px-6 py-2.5 rounded-[12px] border border-[#dfe4db] text-[#454840] font-semibold text-[14px] hover:bg-[#f1f5eb] transition-colors font-cairo text-center flex-1 sm:flex-none"
            >
              إلغاء
            </Link>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-6 py-2.5 rounded-[12px] bg-[#d8e8c7] hover:bg-[#c5dbb0] text-[#131f0b] font-semibold text-[14px] transition-colors font-cairo flex-1 sm:flex-none"
            >
              حفظ كمسودة
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm transition-colors font-cairo flex-1 sm:flex-none"
            >
              <CheckCircle2 className="size-4" />
              <span>حفظ ونشر التعديلات</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
