"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  UserPlus,
  Play,
  XCircle,
  Building2,
  Sliders,
  Calendar,
  Lock,
  Battery,
  Wifi,
  CheckCircle2,
  Hourglass,
  Circle,
  Clock,
  Sparkles,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";
import { BackButton } from "@/components/shared/back-button";
import { CleaningAssignModal } from "./cleaning-assign-modal";
import { CleaningStartModal } from "./cleaning-start-modal";
import { CleaningCompleteModal } from "./cleaning-complete-modal";

interface CleaningDetailViewProps {
  taskId?: string;
}

export function CleaningDetailView({ taskId = "CL-10482" }: CleaningDetailViewProps) {
  useSetBreadcrumbTitle(`مهمة تنظيف #${taskId}`, `#${taskId}`);
  const confirm = useConfirm();

  // Interactive state
  const [status, setStatus] = useState<"needs_cleaning" | "in_progress" | "completed">("needs_cleaning");
  const [assignee, setAssignee] = useState<string>("غير معيّن");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleCancelTask = async () => {
    const ok = await confirm({
      title: "إلغاء مهمة التنظيف",
      message: `هل أنت متأكد من إلغاء مهمة التنظيف المجدولة (${taskId})؟ سيتم توثيق سبب الإلغاء في سجل العقار وإشعار المشرف.`,
      confirmLabel: "نعم، إلغاء المهمة",
      cancelLabel: "تراجع",
      variant: "destructive",
    });
    if (!ok) return;

    toast.error("تم إلغاء المهمة المجدولة وتوثيق السبب في سجل العقار.");
  };

  return (
    <div className="space-y-[24px] font-cairo" dir="rtl">
      {/* PAGE HEADER BAR - Matches Figma Node 1:19076 */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Right side in RTL: Title & Metadata */}
        <div>
          <div className="flex items-center gap-[12px] flex-wrap">
            <BackButton
              fallbackHref="/operations/"
              aria-label="العودة لقائمة العمليات"
              className="w-8 h-8 rounded-[10px] bg-[#f1f5eb] hover:bg-[#e4ebdc] flex items-center justify-center text-[#34422a] transition-colors shrink-0"
            />

            <h1 className="text-[24px] font-semibold text-[#181d17] tracking-[-0.6px] leading-[34px]">
              مهمة تنظيف {taskId}
            </h1>

            {status === "needs_cleaning" && (
              <span className="bg-[#fffbeb] px-[12px] py-[4px] rounded-full flex items-center gap-[6px]">
                <span className="text-[#92400e] text-[11px] font-medium leading-[16px]">
                  يحتاج تنظيف
                </span>
                <span className="bg-[#f59e0b] rounded-full size-[8px]" />
              </span>
            )}
            {status === "in_progress" && (
              <span className="bg-[#eff6ff] px-[12px] py-[4px] rounded-full flex items-center gap-[6px]">
                <span className="text-[#1d4ed8] text-[11px] font-medium leading-[16px]">
                  جاري التنظيف
                </span>
                <span className="bg-[#2563eb] rounded-full size-[8px]" />
              </span>
            )}
            {status === "completed" && (
              <span className="bg-[#f0fdf4] px-[12px] py-[4px] rounded-full flex items-center gap-[6px]">
                <span className="text-[#15803d] text-[11px] font-medium leading-[16px]">
                  مكتملة
                </span>
                <span className="bg-[#16a34a] rounded-full size-[8px]" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-[8px] flex-wrap text-[13px] text-[#454840] font-normal mt-[10px] pr-[44px]">
            <span>معرّف المهمة:</span>
            <span className="font-semibold text-[#181d17]">{taskId}</span>
            <span className="text-[#c5c8bd]">•</span>
            <span>تاريخ الإنشاء: 18 سبتمبر 2026 — 12:05 م</span>
            <span className="text-[#c5c8bd]">•</span>
            <span>السبب التشغيلي: مغادرة نزيل وتسليم فوري</span>
          </div>
        </div>

        {/* Left side in RTL: Action Button Group */}
        <div className="flex items-center gap-[8px] flex-wrap">
          {/* 1. Cancel Scheduled Task */}
          <button
            type="button"
            onClick={handleCancelTask}
            className="bg-[rgba(177,37,21,0.1)] hover:bg-[rgba(177,37,21,0.15)] text-[#b12515] h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] font-semibold text-[14px] transition-colors cursor-pointer"
          >
            <XCircle className="w-5 h-5 text-[#b12515]" />
            <span>إلغاء المهمة المجدولة</span>
          </button>

          {/* 2. Start Cleaning / Complete Cleaning */}
          {status === "needs_cleaning" && (
            <button
              type="button"
              onClick={() => setIsStartModalOpen(true)}
              className="bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#34422a] h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] font-semibold text-[14px] transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-[#34422a]" />
              <span>بدء التنظيف</span>
            </button>
          )}

          {status === "in_progress" && (
            <button
              type="button"
              onClick={() => setIsCompleteModalOpen(true)}
              className="bg-[#34422a] hover:bg-[#283320] text-white h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] font-semibold text-[14px] transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تأكيد اكتمال التنظيف</span>
            </button>
          )}

          {status === "completed" && (
            <div className="bg-[#f0fdf4] text-[#16a34a] border border-[#dcfce7] h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] font-bold text-[14px]">
              <CheckCircle2 className="w-4 h-4" />
              <span>تم اعتماد واكتمال المهمة</span>
            </div>
          )}

          {/* 3. Assign Staff (Primary) */}
          <button
            type="button"
            onClick={() => setIsAssignModalOpen(true)}
            className="bg-[#34422a] hover:bg-[#283320] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] font-semibold text-[14px] transition-colors cursor-pointer"
          >
            <UserPlus className="w-[18px] h-[18px]" />
            <span>تعيين مسؤول</span>
          </button>
        </div>
      </div>

      {/* MAIN 2-COLUMN WORKSPACE (~65% right / ~35% left in RTL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        {/* Right Main Column (8 cols in 12-col grid) */}
        <div className="lg:col-span-8 space-y-[24px]">
          {/* Section 1: UNIT & PROPERTY CONTEXT CARD */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] space-y-[16px]">
            {/* Header */}
            <div className="border-[#ebefe6] border-b pb-[9px] flex items-center justify-between">
              <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                رمز العقار: BLD-RYD-042
              </span>
              <div className="flex items-center gap-[8px]">
                <h2 className="text-[#181d17] text-[20px] font-semibold leading-[30px]">
                  سياق الأصل العقاري والمهمة
                </h2>
                <Building2 className="w-[18px] h-[18px] text-[#34422a]" />
              </div>
            </div>

            {/* Inner Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] pt-[4px]">
              {/* Right Card (Target Unit) */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col justify-between min-h-[145px]">
                <div>
                  <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                    الوحدة المستهدفة
                  </span>
                  <p className="text-[#181d17] text-[18px] font-semibold leading-[28px] mt-[2px]">
                    الوحدة 204 (الطابق الثاني)
                  </p>
                </div>
                <div className="border-t border-[rgba(235,239,230,0.6)] pt-[9px] flex items-center gap-[8px] flex-wrap">
                  <Building2 className="w-[15px] h-[15px] text-[#75786f] shrink-0" />
                  <span className="text-[#181d17] text-[13px] font-medium leading-[20px]">
                    عمارة النخيل السكنية
                  </span>
                  <span className="text-[#c5c8bd] text-[13px] leading-[20px]">•</span>
                  <span className="text-[#454840] text-[13px] font-normal leading-[20px]">
                    الرياض — حي العليا
                  </span>
                </div>
              </div>

              {/* Left Card (Registered Owner) */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col justify-between min-h-[145px]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                      المالك المسجل للأصل
                    </span>
                    <p className="text-[#181d17] text-[18px] font-semibold leading-[28px] mt-[2px]">
                      محمد العتيبي
                    </p>
                  </div>
                  <span className="bg-[#ebefe6] text-[#75786f] text-[11px] font-medium px-[8px] py-[2px] rounded-[4px] leading-[16px]">
                    OWN-4491
                  </span>
                </div>
                <div className="border-t border-[rgba(235,239,230,0.6)] pt-[9px] flex items-center gap-[6px]">
                  <Sparkles className="w-[14px] h-[14px] text-[#75786f] shrink-0" />
                  <span className="text-[#454840] text-[13px] font-normal leading-[20px]">
                    سبب المهمة:
                  </span>
                  <span className="text-[#181d17] text-[13px] font-medium leading-[20px]">
                    انتهاء الحجز وتسجيل المغادرة
                  </span>
                </div>
              </div>
            </div>

            {/* Auto-Creation Audit Row */}
            <div className="bg-[#f6fbf1] rounded-[12px] p-[14px] flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-[8px]">
                <Lock className="w-[18px] h-[18px] text-[#34422a] shrink-0" />
                <span className="text-[#454840] text-[13px] font-normal leading-[20px]">
                  تم إنشاء المهمة آلياً فور تأكيد إغلاق القفل الذكي من قبل النزيل السابق.
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="text-[#34422a] text-[11px] font-medium leading-[16px]">
                  الحجز المرتبط:
                </span>
                <Link
                  href="/bookings/BK-10482/"
                  className="text-[#34422a] text-[11px] font-bold leading-[16px] underline hover:opacity-80 transition-opacity"
                >
                  BK-10482
                </Link>
              </div>
            </div>
          </div>

          {/* Section 2: OPERATIONAL CLEANING INFORMATION */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] space-y-[16px]">
            {/* Header */}
            <div className="border-[#ebefe6] border-b pb-[9px] flex items-center justify-between">
              <span className="bg-[#fffbeb] text-[#78350f] text-[11px] font-medium px-[10px] py-[2px] rounded-full leading-[16px]">
                {status === "needs_cleaning"
                  ? "معلقة بانتظار الإسناد"
                  : status === "in_progress"
                  ? "جاري العمل الميداني"
                  : "تم الاعتماد والإنجاز"}
              </span>
              <div className="flex items-center gap-[8px]">
                <h2 className="text-[#181d17] text-[20px] font-semibold leading-[30px]">
                  بيانات التنفيذ والتشغيل
                </h2>
                <Sliders className="w-[18px] h-[18px] text-[#34422a]" />
              </div>
            </div>

            {/* 6 Structured Operational Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[8px]">
              {/* Metric 1 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[102px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  الحالة التشغيلية
                </span>
                <div className="flex items-center gap-[8px] my-1">
                  <span className="text-[#181d17] text-[18px] font-semibold leading-[28px]">
                    {status === "completed"
                      ? "مكتملة"
                      : status === "in_progress"
                      ? "جاري التنظيف"
                      : "يحتاج تنظيف"}
                  </span>
                  <span
                    className={`rounded-full size-[10px] ${
                      status === "completed"
                        ? "bg-[#16a34a]"
                        : status === "in_progress"
                        ? "bg-[#2563eb]"
                        : "bg-[#f59e0b]"
                    }`}
                  />
                </div>
                <span className="text-[#c5c8bd] text-[11px] font-medium leading-[16px] block">
                  {status === "completed"
                    ? "معتمدة للاستقبال"
                    : status === "in_progress"
                    ? "المشرف في الموقع"
                    : "في انتظار تسليم الطاقم"}
                </span>
              </div>

              {/* Metric 2 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[102px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  المسؤول الميداني
                </span>
                <div className="flex items-center justify-between my-1">
                  <span className="text-[#181d17] text-[18px] font-semibold leading-[28px]">
                    {assignee}
                  </span>
                  <span className="bg-[#dfe4db] text-[#454840] text-[11px] font-medium px-[8px] py-[2px] rounded-[4px] leading-[16px]">
                    {assignee === "غير معيّن" ? "شاغر" : "معيّن"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(true)}
                  className="text-[#34422a] text-[11px] font-medium leading-[16px] hover:underline text-right block cursor-pointer"
                >
                  {assignee === "غير معيّن" ? "+ إسناد مشرف أو مقاول" : "تغيير المشرف المكلف"}
                </button>
              </div>

              {/* Metric 3 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[102px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  تاريخ ووقت الإنشاء
                </span>
                <p className="text-[#181d17] text-[14px] font-semibold leading-[20px] my-1">
                  18 سبتمبر 2026
                </p>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  12:05 ظهراً
                </span>
              </div>

              {/* Metric 4 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[102px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  وقت البدء الفعلي
                </span>
                <p className="text-[#181d17] text-[14px] font-semibold leading-[20px] my-1">
                  {status === "needs_cleaning" ? "—" : "12:25 م"}
                </p>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  {status === "needs_cleaning" ? "لم يبدأ طاقم العمل بعد" : "تسجيل ذاتي بالقفل"}
                </span>
              </div>

              {/* Metric 5 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[102px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  المدة المقدرة للإنجاز
                </span>
                <p className="text-[#181d17] text-[18px] font-semibold leading-[28px] my-1">
                  45 دقيقة
                </p>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  تبدأ تلقائياً فور الدخول
                </span>
              </div>

              {/* Metric 6 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[102px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  وقت الإكمال المتوقع
                </span>
                <p className="text-[#181d17] text-[14px] font-semibold leading-[20px] my-1">
                  {status === "completed" ? "01:07 م" : status === "in_progress" ? "01:10 م" : "—"}
                </p>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  {status === "completed" ? "تم الإنجاز في 42 دقيقة" : "يحتسب بعد مباشرة العمل"}
                </span>
              </div>
            </div>

            {/* Service Scope Specification */}
            <div className="bg-[#f6fbf1] rounded-[12px] p-[16px] space-y-[5px]">
              <span className="text-[#34422a] text-[12px] font-bold leading-[18px] block">
                نوع النظافة ومعايير الخدمة المطلوبة:
              </span>
              <p className="text-[#454840] text-[14px] font-normal leading-[22.75px]">
                تنظيف وتعقيم دوري شامل عالي المعايير؛ يشمل تبديل وتجهيز البياضات الفندقية بالكامل، تعقيم الحمامات والمطبخ التحضيري، تنظيف الزجاج والأرضيات، وتجهيز سلة الضيافة وفق كود الضيافة الفاخر لمنصة ابراج
              </p>
            </div>
          </div>

          {/* Section 3: RELATED BOOKING CARD */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] space-y-[16px]">
            {/* Header */}
            <div className="border-[#ebefe6] border-b pb-[9px] flex items-center justify-between">
              <Link
                href="/bookings/BK-10482/"
                className="text-[#34422a] text-[12px] font-semibold leading-[18px] flex items-center gap-[4px] hover:underline"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>عرض ملف الحجز الكامل (BK-10482)</span>
              </Link>
              <div className="flex items-center gap-[8px]">
                <h2 className="text-[#181d17] text-[20px] font-semibold leading-[30px]">
                  بيانات الحجز المنتهي المرتبط
                </h2>
                <Calendar className="w-[18px] h-[18px] text-[#34422a]" />
              </div>
            </div>

            {/* 4 Booking Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[8px]">
              {/* Cell 1: Guest */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex flex-col justify-between min-h-[118px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  النزيل المغادر
                </span>
                <p className="text-[#181d17] text-[18px] font-semibold leading-[28px] my-1">
                  خالد العتيبي
                </p>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block" dir="ltr">
                  +966 54 *** 2311
                </span>
              </div>

              {/* Cell 2: Checkout Time */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex flex-col justify-between min-h-[118px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  تاريخ ووقت الخروج
                </span>
                <p className="text-[#181d17] text-[18px] font-semibold leading-[28px] my-1">
                  18 سبتمبر 2026
                </p>
                <span className="text-[#454840] text-[11px] font-medium leading-[16px] block">
                  12:00 ظهراً (ذاتي)
                </span>
              </div>

              {/* Cell 3: Stay Duration */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex flex-col justify-between min-h-[118px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  مدة الإقامة
                </span>
                <p className="text-[#181d17] text-[18px] font-semibold leading-[28px] my-1">
                  3 ليالٍ
                </p>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  15 — 18 سبتمبر 2026
                </span>
              </div>

              {/* Cell 4: Guest Keycode Status */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex flex-col justify-between min-h-[118px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  كود الدخول للنزيل
                </span>
                <p className="text-[#ba1a1a] text-[18px] font-semibold leading-[28px] my-1">
                  منتهي وملغى
                </p>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                  تم الإلغاء آلياً 12:30 م
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Sidebar Column (4 cols in 12-col grid) */}
        <div className="lg:col-span-4 space-y-[24px]">
          {/* Section 1: TIMELINE OF ACTUAL EVENTS */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] space-y-[16px]">
            {/* Header */}
            <div className="border-[#ebefe6] border-b pb-[9px] flex items-center justify-between">
              <Link
                href="/operations/log/"
                className="text-[#75786f] hover:text-[#34422a] text-[11px] font-medium leading-[16px] transition-colors hover:underline"
              >
                سجل العمليات الفعلي
              </Link>
              <h2 className="text-[#181d17] text-[20px] font-semibold leading-[30px]">
                التسلسل الزمني
              </h2>
            </div>

            {/* Vertical Step Flow with Connecting Line */}
            <div className="relative flex flex-col gap-[24px] pr-[8px] pt-[4px]">
              {/* Connecting line */}
              <div className="absolute bg-[#ebefe6] right-[23px] top-[16px] bottom-[20px] w-[2px] z-0" />

              {/* Event 1 */}
              <div className="flex gap-[14px] items-start relative z-10">
                <div className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-white rounded-full size-[32px] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                    انتهاء الحجز وتسجيل المغادرة
                  </p>
                  <p className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                    18 سبتمبر 2026 — 12:00 ظهراً
                  </p>
                  <p className="text-[#454840] text-[11px] font-medium leading-[16px]">
                    بواسطة النزيل خالد العتيبي (تسجيل ذاتي)
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex gap-[14px] items-start relative z-10">
                <div className="bg-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-white rounded-full size-[32px] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                    إنشاء مهمة التنظيف آلياً
                  </p>
                  <p className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                    18 سبتمبر 2026 — 12:05 ظهراً
                  </p>
                  <p className="text-[#454840] text-[11px] font-medium leading-[16px]">
                    محرك العمليات المؤتمت — منصة ابراج
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex gap-[14px] items-start relative z-10">
                <div className="bg-[#f59e0b] shadow-[0px_0px_0px_4px_#fef3c7,0px_1px_2px_0px_rgba(0,0,0,0.05)] text-white rounded-full size-[32px] flex items-center justify-center shrink-0 mt-0.5">
                  {assignee !== "غير معيّن" ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Hourglass className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[#181d17] text-[14px] font-bold leading-[20px]">
                    تعيين مسؤول التنظيف
                  </p>
                  <p className="text-[#92400e] text-[13px] font-medium leading-[20px]">
                    {assignee !== "غير معيّن" ? `تم التعيين: ${assignee}` : "قيد الانتظار لمباشرة العملية"}
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="flex gap-[14px] items-start relative z-10 opacity-60">
                <div className="bg-[#ebefe6] text-[#75786f] rounded-full size-[32px] flex items-center justify-center shrink-0 mt-0.5">
                  <Circle className="w-4 h-4" />
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                    بدء أعمال التنظيف الميداني
                  </p>
                  <p className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                    {status === "needs_cleaning"
                      ? "لم تبدأ بعد (تتطلب إسناد مسؤول)"
                      : "تم المباشرة بنجاح عبر كود الدخول"}
                  </p>
                </div>
              </div>

              {/* Event 5 */}
              <div className="flex gap-[14px] items-start relative z-10 opacity-60">
                <div className="bg-[#ebefe6] text-[#75786f] rounded-full size-[32px] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-[2px]">
                  <p className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                    اكتمال التنظيف والفحص الذاتي
                  </p>
                  <p className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                    {status === "completed"
                      ? "تم الاعتماد وتفعيل الإتاحة"
                      : "بانتظار إنهاء القائمة واعتمادها"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: UNIT STATUS & SYSTEM GOVERNANCE CARD */}
          <div className="bg-[#ebefe6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] space-y-[16px]">
            {/* Header */}
            <div className="border-[#e5eae0] border-b pb-[9px] flex items-center gap-[8px]">
              <span className="bg-[#f59e0b] rounded-full size-[10px]" />
              <h2 className="text-[#181d17] text-[20px] font-semibold leading-[30px]">
                حوكمة المنصة المركزية
              </h2>
            </div>

            {/* Unit Status Highlight */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] p-[16px] space-y-[4px]">
              <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                حالة الوحدة الحالية في المنظومة:
              </span>
              <div className="flex items-center justify-between my-1">
                <span className="text-[#181d17] text-[18px] font-bold leading-[28px]">
                  تحت التنظيف (مغلقة)
                </span>
                <span className="bg-[#fffbeb] text-[#92400e] text-[11px] font-medium px-[10px] py-[2px] rounded-full leading-[16px]">
                  غير متاحة للحجز
                </span>
              </div>
              <span className="text-[#75786f] text-[11px] font-medium leading-[16px] block">
                الوحدة 204 — عمارة النخيل السكنية
              </span>
            </div>

            {/* Critical Governance Alert Callout */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] p-[16px] flex items-start gap-[12px]">
              <Lock className="w-5 h-5 text-[#34422a] shrink-0 mt-0.5" />
              <div className="space-y-[4px]">
                <p className="text-[#181d17] text-[14px] font-bold leading-[20px]">
                  حظر استقبال النزلاء آلياً
                </p>
                <p className="text-[#454840] text-[13px] font-normal leading-[21.13px]">
                  لا تصبح الوحدة متاحة للحجز والاستقبال في محركات التوزيع إلا بعد اكتمال التنظيف، وإغلاق الباب الذكي من الخارج.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: EMERGENCY & SMART LOCK STATUS */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] space-y-[16px]">
            {/* Header */}
            <div className="border-[#ebefe6] border-b pb-[9px] flex items-center justify-between">
              <span className="bg-[#ebefe6] text-[#34422a] text-[11px] font-semibold px-[8px] py-[2px] rounded-[4px] leading-[16px]">
                متصل سحابياً
              </span>
              <h2 className="text-[#181d17] text-[20px] font-semibold leading-[30px]">
                القفل الذكي وأكواد الدخول
              </h2>
            </div>

            {/* Connectivity and Hardware rows */}
            <div className="space-y-[8px]">
              {/* Row 1: Door State */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex items-center justify-between">
                <div className="flex items-center gap-[4px]">
                  <span className="text-[#34422a] text-[12px] font-bold leading-[18px]">
                    مغلق بإحكام
                  </span>
                  <span className="bg-[#34422a] rounded-full size-[8px]" />
                </div>
                <div className="flex items-center gap-[10px]">
                  <div className="text-right">
                    <p className="text-[#181d17] text-[12px] font-semibold leading-[18px]">
                      حالة الباب الفعلي
                    </p>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                      مستشعر المزلاج الإلكتروني
                    </span>
                  </div>
                  <Lock className="w-[15px] h-[15px] text-[#34422a] shrink-0" />
                </div>
              </div>

              {/* Row 2: Gateway Model */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex items-center justify-between">
                <span className="text-[#34422a] text-[11px] font-medium leading-[16px]">
                  سحابي مباشر (Wi-Fi)
                </span>
                <div className="flex items-center gap-[10px]">
                  <div className="text-right">
                    <p className="text-[#181d17] text-[12px] font-semibold leading-[18px]">
                      طراز البوابة والسحابة
                    </p>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px]" dir="ltr">
                      TTLock Gateway G3
                    </span>
                  </div>
                  <Wifi className="w-[16px] h-[16px] text-[#34422a] shrink-0" />
                </div>
              </div>

              {/* Row 3: Battery Level */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex items-center justify-between">
                <span className="text-[#34422a] text-[14px] font-bold leading-[20px]">
                  92% (ممتازة)
                </span>
                <div className="flex items-center gap-[10px]">
                  <div className="text-right">
                    <p className="text-[#181d17] text-[12px] font-semibold leading-[18px]">
                      طاقة بطارية القفل
                    </p>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                      آخر تحديث قبل 5 دقائق
                    </span>
                  </div>
                  <Battery className="w-[16px] h-[16px] text-[#34422a] shrink-0" />
                </div>
              </div>

              {/* Temporary Cleaning Code State */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-[14px] space-y-[6px]">
                <div className="flex items-center justify-between">
                  <span className="bg-[#dfe4db] text-[#75786f] text-[11px] font-medium px-[8px] py-[2px] rounded-[4px] leading-[16px]">
                    {status === "needs_cleaning" ? "غير مفعّل" : "مفعل ومتاح"}
                  </span>
                  <span className="text-[#181d17] text-[12px] font-semibold leading-[18px]">
                    كود طاقم النظافة المؤقت
                  </span>
                </div>
                <p className="text-[#75786f] text-[13px] font-normal leading-[17.88px] text-right">
                  {status === "needs_cleaning"
                    ? "يتم توليد وإرسال كود دخول مؤقت (صالحة لمرة واحدة أو لمدة ساعتين) آلياً إلى هاتف المشرف فور الضغط على «بدء التنظيف»."
                    : "الكود المؤقت النشط: #9281-OTP (صالح لمدة ساعتين)."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CleaningAssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        taskNumber={taskId}
        unitName="الوحدة 204 (الطابق الثاني)"
        propertyName="عمارة النخيل (الرياض - حي العليا)"
        ownerName="محمد العتيبي"
        onConfirm={(newAssignee) => {
          setAssignee(newAssignee);
        }}
      />

      <CleaningStartModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        taskNumber={taskId}
        unitName="الوحدة 204 (الطابق الثاني)"
        propertyName="عمارة النخيل — الرياض (حي العليا)"
        ownerName="محمد العتيبي (OWN-4491)"
        assigneeName={assignee === "غير معيّن" ? "أحمد سالم" : assignee.split("(")[0]?.trim() || "أحمد سالم"}
        onConfirm={() => {
          setStatus("in_progress");
          if (assignee === "غير معيّن") {
            setAssignee("أحمد سالم (شركة النقاء للتشغيل الفندقي)");
          }
        }}
      />

      <CleaningCompleteModal
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        unitName="الوحدة 204 (الطابق الثاني)"
        propertyName="عمارة النخيل — حي العليا"
        ownerName="محمد العتيبي (OWN-4491)"
        assigneeName={assignee === "غير معيّن" ? "أحمد سالم (مشرف معتمد — النقاء)" : assignee}
        onConfirm={() => {
          setStatus("completed");
        }}
      />
    </div>
  );
}
