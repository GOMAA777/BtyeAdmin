"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useSetBreadcrumbTitle } from "@/hooks/use-navigation-trail";
import { BackButton } from "@/components/shared/back-button";
import { MaintenanceAssignModal } from "./maintenance-assign-modal";

interface MaintenanceDetailViewProps {
  ticketId?: string;
}

export function MaintenanceDetailView({ ticketId = "MT-2048" }: MaintenanceDetailViewProps) {
  useSetBreadcrumbTitle(`بلاغ صيانة #${ticketId}`, `#${ticketId}`);
  const confirm = useConfirm();

  // Interactive states
  const [status, setStatus] = useState<"in_progress" | "completed">("in_progress");
  const [assigneeName, setAssigneeName] = useState<string>("م. طارق العسيري");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string } | null>(null);

  const handleCompleteMaintenance = async () => {
    const ok = await confirm({
      title: "تأكيد إكمال الصيانة",
      message: `هل أنت متأكد من إكمال أعمال الصيانة للبلاغ (${ticketId})؟ سيتم تحويل الوحدة آلياً إلى مرحلة التنظيف وإغلاق البلاغ الفني.`,
      confirmLabel: "تأكيد إكمال الصيانة",
      variant: "default",
    });
    if (!ok) return;

    setStatus("completed");
    toast.success("تم إكمال الصيانة وتحويل الوحدة آلياً إلى مرحلة التنظيف بنجاح!");
  };

  return (
    <div className="space-y-[24px] font-cairo" dir="rtl">
      {/* =========================================================================
          PAGE HEADER BAR - Matches Figma Node 1:19828
          ========================================================================= */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col lg:flex-row lg:items-center justify-between gap-[16px]">
        {/* Right side in RTL: Title & Metadata Badge */}
        <div className="flex items-center gap-[12px] flex-wrap">
          <BackButton
            fallbackHref="/operations/"
            aria-label="العودة لقائمة العمليات"
            className="size-[36px] rounded-[10px] bg-[#f1f5eb] hover:bg-[#e4ebdc] flex items-center justify-center text-[#34422a] transition-colors shrink-0"
          />

          <h1 className="text-[24px] font-semibold text-[#181d17] tracking-[-0.6px] leading-[34px] m-0">
            بلاغ صيانة {ticketId}
          </h1>

          {status === "in_progress" ? (
            <div className="bg-[#fffbeb] px-[12px] py-[4px] rounded-full flex items-center gap-[6px]">
              <span className="text-[#92400e] text-[11px] font-medium leading-[16px]">
                قيد التنفيذ
              </span>
              <span className="bg-[#f59e0b] rounded-full size-[8px] shrink-0" />
            </div>
          ) : (
            <div className="bg-[#f0fdf4] px-[12px] py-[4px] rounded-full flex items-center gap-[6px] border border-[#dcfce7]">
              <span className="text-[#15803d] text-[11px] font-medium leading-[16px]">
                مكتملة
              </span>
              <span className="bg-[#16a34a] rounded-full size-[8px] shrink-0" />
            </div>
          )}
        </div>

        {/* Left side in RTL: Action Button Group */}
        <div className="flex items-center gap-[8px] flex-wrap">
          {/* 1. Complete Maintenance Button */}
          {status === "in_progress" ? (
            <button
              type="button"
              onClick={handleCompleteMaintenance}
              className="bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#34422a] h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] text-[14px] font-semibold transition-colors cursor-pointer"
            >
              <img
                src="/icons/maintenance/complete_check.svg"
                alt=""
                className="size-[16.67px] shrink-0"
              />
              <span>اكمال الصيانة</span>
            </button>
          ) : (
            <div className="bg-[#f0fdf4] text-[#15803d] border border-[#dcfce7] h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] text-[14px] font-semibold">
              <span className="size-[8px] rounded-full bg-[#16a34a]" />
              <span>تم إكمال الصيانة</span>
            </div>
          )}

          {/* 2. Assign Other Technician Button */}
          <button
            type="button"
            onClick={() => setIsAssignModalOpen(true)}
            className="bg-[#fffbeb] hover:bg-[#fef3c7] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[#92400e] h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] text-[14px] font-semibold transition-colors cursor-pointer"
          >
            <img
              src="/icons/maintenance/assign_tech.svg"
              alt=""
              className="w-[18.33px] h-[13.33px] shrink-0"
            />
            <span>تعيين فني اخر</span>
          </button>

          {/* 3. Create Maintenance Ticket Button (Primary) */}
          <Link
            href="/operations/maintenance/new/"
            className="bg-[#34422a] hover:bg-[#283320] text-white h-[44px] px-[20px] rounded-[12px] flex items-center gap-[8px] text-[14px] font-semibold transition-colors shadow-sm"
          >
            <img
              src="/icons/maintenance/add_ticket.svg"
              alt=""
              className="size-[11.67px] shrink-0"
            />
            <span>إنشاء بلاغ صيانة</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          MAIN ASYMMETRIC GRID (65% / 35% -> 8 Cols / 4 Cols on Desktop)
          In RTL: Primary column (8 cols) is on the right, Secondary column (4 cols) is on the left
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        {/* =====================================================================
            PRIMARY COLUMN (8 COLS - RIGHT SIDE IN RTL)
            ===================================================================== */}
        <div className="lg:col-span-8 flex flex-col gap-[24px]">
          {/* SECTION A: Main Asset & Issue Information Card (Node 1:19854) */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] px-[24px] pb-[24px] flex flex-col gap-[16px]">
            {/* Section Header */}
            <div className="h-[60px] flex items-center gap-[6px] justify-start pt-2">
              <img
                src="/icons/maintenance/asset_info.svg"
                alt=""
                className="size-[16.5px] shrink-0"
              />
              <h2 className="text-[#181d17] text-[18px] font-bold leading-[28px] m-0">
                بيانات الأصل العقاري والبلاغ
              </h2>
            </div>

            {/* 2-Column, 3-Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[36px] gap-y-[20px]">
              {/* Row 1, Col 1 (RTL Right): العقار والموقع الجغرافي */}
              <div className="flex flex-col gap-[4px] items-start">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  العقار والموقع الجغرافي
                </span>
                <div className="flex items-center gap-[6px] flex-wrap">
                  <span className="text-[#181d17] text-[16px] font-semibold leading-[26px]">
                    برج الياسمين
                  </span>
                  <span className="text-[#75786f] text-[13px] leading-[20px]">•</span>
                  <span className="text-[#454840] text-[14px] font-normal leading-[22px]">
                    حي الملقا، الرياض
                  </span>
                </div>
              </div>

              {/* Row 1, Col 2 (RTL Left): الوحدة المستهدفة */}
              <div className="flex flex-col gap-[4px] items-start">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  الوحدة المستهدفة
                </span>
                <div className="flex items-baseline gap-[8px] flex-wrap">
                  <Link
                    href="/units/305/"
                    className="text-[#181d17] hover:text-[#34422a] text-[20px] font-bold leading-[30px] transition-colors"
                  >
                    الوحدة 305
                  </Link>
                  <span className="text-[#454840] text-[13px] font-medium leading-[20px]">
                    (الطابق الثالث - جناح A)
                  </span>
                </div>
              </div>

              {/* Row 2, Col 1 (RTL Right): نوع المشكلة التشغيلية */}
              <div className="flex flex-col gap-[4px] items-start">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  نوع المشكلة التشغيلية
                </span>
                <div className="flex items-center gap-[8px] flex-wrap">
                  <div className="flex items-center gap-[6px]">
                    <img
                      src="/icons/maintenance/lock_red.svg"
                      alt=""
                      className="w-[12px] h-[15.75px] shrink-0"
                    />
                    <span className="text-[#181d17] text-[16px] font-semibold leading-[26px]">
                      قفل الباب الذكي
                    </span>
                  </div>
                  <span className="text-[#75786f] text-[11px] font-normal leading-[16px]" dir="ltr">
                    (Smart Lock Failure)
                  </span>
                </div>
              </div>

              {/* Row 2, Col 2 (RTL Left): مالك العقار المسجل */}
              <div className="flex flex-col gap-[4px] items-start">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  مالك العقار المسجل
                </span>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[#181d17] text-[16px] font-semibold leading-[26px]">
                    سارة القحطاني
                  </span>
                  <span className="bg-[rgba(216,232,203,0.5)] text-[#54624c] text-[11px] font-normal px-[8px] py-[2px] rounded-[4px] leading-[16px] font-mono">
                    OWN-8823
                  </span>
                </div>
              </div>

              {/* Row 3, Col 1 (RTL Right): المسؤول المعين للمهمة */}
              <div className="flex flex-col gap-[4px] items-start">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  المسؤول المعين للمهمة
                </span>
                <div className="flex items-center gap-[8px]">
                  <div className="bg-[#4b5940] rounded-full size-[28px] text-white text-[11px] font-medium flex items-center justify-center shrink-0">
                    ط
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[#181d17] text-[14px] font-semibold leading-[22px]">
                      {assigneeName}
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                      فريق الصيانة الفنية المعتمد - تخصص أقفال ذكية
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3, Col 2 (RTL Left): تاريخ وتوقيت البلاغ */}
              <div className="flex flex-col gap-[4px] items-start">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  تاريخ وتوقيت البلاغ
                </span>
                <div className="flex items-center gap-[6px]">
                  <img
                    src="/icons/maintenance/clock.svg"
                    alt=""
                    className="size-[15px] shrink-0"
                  />
                  <span className="text-[#181d17] text-[14px] font-medium leading-[22px]">
                    17 سبتمبر 2026 - 04:15 م
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Operational Description & Field Diagnostics (Node 1:19917) */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] px-[24px] pb-[24px] flex flex-col gap-[16px]">
            {/* Section Header */}
            <div className="h-[60px] flex items-center gap-[6px] justify-start pt-2">
              <img
                src="/icons/maintenance/symptoms_doc.svg"
                alt=""
                className="w-[14.67px] h-[18.33px] shrink-0"
              />
              <h2 className="text-[#181d17] text-[18px] font-bold leading-[28px] m-0">
                تفاصيل الوصف والأعراض التشغيلية
              </h2>
            </div>

            {/* Box 1: Operational Problem Statement */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[6px]">
              <div className="flex items-center gap-[6px]">
                <img
                  src="/icons/maintenance/alert_triangle.svg"
                  alt=""
                  className="w-[16.5px] h-[14.25px] shrink-0"
                />
                <span className="text-[#181d17] text-[12px] font-bold leading-[18px]">
                  الوصف التشغيلي للبلاغ
                </span>
              </div>
              <p className="text-[#454840] text-[14px] font-normal leading-[22.75px] m-0">
                قفل الباب الذكي لا يستجيب عند محاولة فتح الوحدة، وتظهر ومضات حمراء متقطعة على لوحة
                المفاتيح الرقمية مع عدم قبول أكواد الدخول المعتمدة الصادرة عبر بوابة التكامل السحابي.
              </p>
            </div>

            {/* Box 2: Field Technician Diagnostic Notes */}
            <div className="bg-[rgba(229,234,224,0.6)] rounded-[12px] p-[16px] flex flex-col gap-[6px]">
              <div className="flex items-center gap-[6px]">
                <img
                  src="/icons/maintenance/wrench_field.svg"
                  alt=""
                  className="size-[13.5px] shrink-0"
                />
                <span className="text-[#4b5940] text-[12px] font-bold leading-[18px]">
                  الملاحظات الفنية الميدانية (تحديث مباشر من الفني)
                </span>
              </div>
              <p className="text-[#181d17] text-[14px] font-normal leading-[22.75px] m-0">
                تم فحص محول الطاقة ومستشعر الباب، وجاري استبدال مجموعة التروس الداخلية وتحديث برمجة
                اللوحة الرئيسية للقفل الذكي للتوافق مع وحدة الاتصال اللاسلكية بالبوابة المركزية.
              </p>
            </div>

            {/* Box 3: Documentation Photos Grid */}
            <div className="flex flex-col gap-[8px] pt-[4px]">
              <span className="text-[#181d17] text-[12px] font-bold leading-[18px]">
                صور البلاغ والفحص الميداني الموثقة:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                {/* Photo Card 1: Keypad Inspection (Node 1:19953) */}
                <div
                  onClick={() =>
                    setActivePhoto({
                      src: "/images/operations/figma_photo_keypad.png",
                      title: "لوحة المفاتيح الرقمية للقفل - توثيق وميض الخطأ الأحمر",
                    })
                  }
                  className="bg-[#f1f5eb] hover:bg-[#e7eee0] transition-colors rounded-[12px] p-[8px] flex items-center justify-between gap-[16px] cursor-pointer group"
                >
                  <div className="flex flex-col items-start gap-[2px]">
                    <span className="text-[#181d17] text-[12px] font-semibold leading-[18px] group-hover:text-[#34422a] transition-colors">
                      لوحة المفاتيح الرقمية للقفل
                    </span>
                    <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                      توثيق وميض الخطأ الأحمر
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px]">
                      17 سبتمبر - 05:14 م
                    </span>
                  </div>

                  <div className="size-[80px] rounded-[8px] overflow-hidden shrink-0 bg-[#e5eae0] border border-[#dfe4db]">
                    <img
                      src="/images/operations/figma_photo_keypad.png"
                      alt="لوحة المفاتيح الرقمية للقفل"
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>

                {/* Photo Card 2: Battery Voltage Test (Node 1:19943) */}
                <div
                  onClick={() =>
                    setActivePhoto({
                      src: "/images/operations/figma_photo_battery.png",
                      title: "فحص الجهد الكهربائي للبطارية - قياس البطاريات الداخلية (18%)",
                    })
                  }
                  className="bg-[#f1f5eb] hover:bg-[#e7eee0] transition-colors rounded-[12px] p-[8px] flex items-center justify-between gap-[16px] cursor-pointer group"
                >
                  <div className="flex flex-col items-start gap-[2px]">
                    <span className="text-[#181d17] text-[12px] font-semibold leading-[18px] group-hover:text-[#34422a] transition-colors">
                      فحص الجهد الكهربائي للبطارية
                    </span>
                    <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                      قياس البطاريات الداخلية (18%)
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px]">
                      17 سبتمبر - 05:22 م
                    </span>
                  </div>

                  <div className="size-[80px] rounded-[8px] overflow-hidden shrink-0 bg-[#e5eae0] border border-[#dfe4db]">
                    <img
                      src="/images/operations/figma_photo_battery.png"
                      alt="فحص الجهد الكهربائي للبطارية"
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION C: Related Impacted Booking Card (Node 1:19963) */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] px-[24px] pb-[24px] flex flex-col gap-[16px]">
            {/* Header with Title and Status Tag */}
            <div className="h-[60px] flex items-center justify-between pt-2">
              <div className="flex items-center gap-[6px]">
                <img
                  src="/icons/maintenance/calendar_booking.svg"
                  alt=""
                  className="w-[16.5px] h-[18.33px] shrink-0"
                />
                <h2 className="text-[#181d17] text-[18px] font-bold leading-[28px] m-0">
                  بيانات الحجز المرتبط والمتأثر بالبلاغ
                </h2>
              </div>

              <div className="bg-[#d8e8cb] px-[10px] py-[2px] rounded-full">
                <span className="text-[#5a6952] text-[11px] font-semibold leading-[16px]">
                  حجز قادم (مؤكد)
                </span>
              </div>
            </div>

            {/* 3-Column Info Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] items-start">
              {/* Col 1 (RTL Right): رقم الحجز */}
              <div className="flex flex-col items-start gap-[2px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  رقم الحجز
                </span>
                <Link
                  href="/bookings/BK-2026-8942/"
                  className="text-[#181d17] hover:text-[#34422a] text-[18px] font-bold leading-[28px] font-mono transition-colors"
                >
                  BK-2026-8942
                </Link>
              </div>

              {/* Col 2 (RTL Center): اسم النزيل القادم */}
              <div className="flex flex-col items-start gap-[2px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  اسم النزيل القادم
                </span>
                <span className="text-[#181d17] text-[16px] font-semibold leading-[26px]">
                  فهد السبيعي
                </span>
                <span className="text-[#75786f] text-[13px] font-normal leading-[20px]" dir="ltr">
                  +966 50 *** 7712
                </span>
              </div>

              {/* Col 3 (RTL Left): موعد الوصول المتوقع */}
              <div className="flex flex-col items-start gap-[2px]">
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  موعد الوصول المتوقع
                </span>
                <div className="flex items-center gap-[6px]">
                  <img
                    src="/icons/maintenance/plane_arrival.svg"
                    alt=""
                    className="w-[13.5px] h-[15.15px] shrink-0"
                  />
                  <span className="text-[#34422a] text-[14px] font-bold leading-[22px]">
                    18 سبتمبر 2026 - 03:00 م
                  </span>
                </div>
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  المتبقي: أقل من 22 ساعة
                </span>
              </div>
            </div>

            {/* Critical Operational Alert Box (Node 1:19995) */}
            <div className="bg-[#fff4e5] rounded-[12px] p-[16px] flex items-start gap-[12px]">
              <img
                src="/icons/maintenance/bell_alert.svg"
                alt=""
                className="w-[14.67px] h-[20.33px] shrink-0 mt-[2px]"
              />
              <div className="flex flex-col gap-[2px]">
                <span className="text-[#914f08] text-[14px] font-bold leading-[20px]">
                  تنبيه حرج للجدول التشغيلي:
                </span>
                <p className="text-[#914f08] text-[14px] font-normal leading-[22.75px] m-0">
                  يرجى إنهاء الصيانة والتنظيف قبل الساعة 01:30 م لضمان عدم تأخر تسجيل الدخول الذاتي
                  للنزيل.
                </p>
              </div>
            </div>

            {/* Quick Deep Link to Booking File */}
            <div className="flex justify-end pt-[4px]">
              <Link
                href="/bookings/BK-2026-8942/"
                className="inline-flex items-center gap-[6px] text-[#34422a] hover:text-[#181d17] text-[14px] font-bold leading-[20px] transition-colors group"
              >
                <span>عرض ملف الحجز الكامل</span>
                <img
                  src="/icons/maintenance/arrow_left.svg"
                  alt=""
                  className="w-[12px] h-[9px] shrink-0 group-hover:-translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================================
            SECONDARY COLUMN (4 COLS - LEFT SIDE IN RTL)
            ===================================================================== */}
        <div className="lg:col-span-4 flex flex-col gap-[24px]">
          {/* SECTION E: Unit Status & Strict System Governance Box (Node 1:20011) */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
            {/* Top Status Header */}
            <div className="flex items-center justify-between pb-[8px] border-b border-[#ebefe6]">
              <span className="text-[#75786f] text-[12px] font-semibold leading-[18px]">
                الحالة الحالية للوحدة 305
              </span>
              <div className="bg-[#fff4e5] px-[12px] py-[4px] rounded-full flex items-center gap-[6px]">
                <span className="text-[#b86b14] text-[11px] font-bold leading-[16px]">
                  تحت الصيانة
                </span>
                <span className="bg-[#e99a38] rounded-full size-[8px] shrink-0" />
              </div>
            </div>

            {/* Strict Architectural System Notice Box */}
            <div className="bg-[#e5eae0] rounded-[12px] p-[16px] flex flex-col gap-[6px]">
              <div className="flex items-center gap-[6px]">
                <img
                  src="/icons/maintenance/governance_shield.svg"
                  alt=""
                  className="w-[15px] h-[15.83px] shrink-0"
                />
                <span className="text-[#34422a] text-[12px] font-bold leading-[18px]">
                  تنويه الحوكمة الإلزامية للمنظومة
                </span>
              </div>
              <p className="text-[#454840] text-[13px] font-normal leading-[21.13px] m-0">
                بعد إكمال الصيانة تنتقل الوحدة تلقائيًا إلى مرحلة التنظيف قبل أن تصبح متاحة.
              </p>
              <p className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[6px] m-0">
                * المنظومة تحظر الاستقبال أو تغيير الحالة يدوياً حتى استيفاء بروتوكول التعقيم والفحص
                الرقمي.
              </p>
            </div>
          </div>

          {/* SECTION D: Detailed Maintenance Timeline (Node 1:20028) */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] px-[24px] pb-[24px] flex flex-col gap-[16px]">
            {/* Header */}
            <div className="h-[60px] flex items-center gap-[6px] justify-start pt-2">
              <img
                src="/icons/maintenance/timeline_header.svg"
                alt=""
                className="w-[18.33px] h-[10px] shrink-0"
              />
              <h2 className="text-[#181d17] text-[18px] font-bold leading-[28px] m-0">
                التسلسل الزمني لأعمال الصيانة
              </h2>
            </div>

            {/* Timeline List with continuous vertical line */}
            <div className="relative pr-[8px]">
              {/* Continuous vertical line linking circles on the right */}
              <div className="absolute bg-[#dfe4db] bottom-[16px] right-[25px] top-[16px] w-[2px]" />

              <div className="flex flex-col gap-[24px] relative">
                {/* Step 1: Completed */}
                <div className="flex items-start gap-[16px]">
                  <div className="bg-[#4b5940] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-[36px] rounded-full flex items-center justify-center shrink-0 z-1">
                    <img
                      src="/icons/maintenance/step_check.svg"
                      alt=""
                      className="w-[12.2px] h-[9px] shrink-0"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[2px] pt-[2px]">
                    <span className="text-[#181d17] text-[14px] font-bold leading-[20px]">
                      تم إنشاء بلاغ الصيانة
                    </span>
                    <span className="text-[#454840] text-[13px] font-normal leading-[20px]">
                      بواسطة مديرة العقار (عبر التطبيق الإداري)
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px]">
                      17 سبتمبر 2026 - 04:15 م
                    </span>
                  </div>
                </div>

                {/* Step 2: Completed */}
                <div className="flex items-start gap-[16px]">
                  <div className="bg-[#4b5940] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-[36px] rounded-full flex items-center justify-center shrink-0 z-1">
                    <img
                      src="/icons/maintenance/step_check.svg"
                      alt=""
                      className="w-[12.2px] h-[9px] shrink-0"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[2px] pt-[2px]">
                    <span className="text-[#181d17] text-[14px] font-bold leading-[20px]">
                      تم تعيين فريق الصيانة
                    </span>
                    <span className="text-[#454840] text-[13px] font-normal leading-[20px]">
                      إسناد البلاغ إلى {assigneeName}
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px]">
                      17 سبتمبر 2026 - 04:40 م
                    </span>
                  </div>
                </div>

                {/* Step 3: Current Active Step */}
                <div className="flex items-start gap-[16px]">
                  <div className="bg-[#fff4e5] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-[36px] rounded-full flex items-center justify-center shrink-0 z-1 border border-[#fde68a]">
                    <img
                      src="/icons/maintenance/step_wrench.svg"
                      alt=""
                      className="size-[12px] shrink-0"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[2px] pt-[2px]">
                    <div className="flex items-center gap-[6px] flex-wrap">
                      <span className="text-[#181d17] text-[14px] font-bold leading-[20px]">
                        بدأت أعمال الصيانة الميدانية
                      </span>
                      <span className="bg-[#fff4e5] text-[#b86b14] text-[11px] font-semibold px-[8px] py-[2px] rounded-[4px] leading-[16px]">
                        المرحلة الراهنة
                      </span>
                    </div>
                    <span className="text-[#454840] text-[13px] font-normal leading-[20px]">
                      باشر الفني العمل في موقع الوحدة (استبدال التروس والبرمجة)
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px]">
                      17 سبتمبر 2026 - 05:10 م
                    </span>
                  </div>
                </div>

                {/* Step 4: Pending / Completed variant */}
                <div
                  className={`flex items-start gap-[16px] ${
                    status === "completed" ? "" : "opacity-60"
                  }`}
                >
                  <div
                    className={`${
                      status === "completed"
                        ? "bg-[#4b5940] text-white"
                        : "bg-[#e5eae0]"
                    } size-[36px] rounded-full flex items-center justify-center shrink-0 z-1`}
                  >
                    {status === "completed" ? (
                      <img
                        src="/icons/maintenance/step_check.svg"
                        alt=""
                        className="w-[12.2px] h-[9px] shrink-0"
                      />
                    ) : (
                      <img
                        src="/icons/maintenance/step_hourglass.svg"
                        alt=""
                        className="w-[12px] h-[15px] shrink-0"
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-[2px] pt-[2px]">
                    <span className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                      تم إكمال الصيانة
                    </span>
                    <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                      في انتظار اعتماد الإنجاز واختبار القفل السحابي
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px]">
                      {status === "completed" ? "تم الإنجاز" : "مرحلة قادمة"}
                    </span>
                  </div>
                </div>

                {/* Step 5: Upcoming Automated Step */}
                <div className="flex items-start gap-[16px] opacity-60">
                  <div className="bg-[#e5eae0] size-[36px] rounded-full flex items-center justify-center shrink-0 z-1">
                    <img
                      src="/icons/maintenance/step_clean.svg"
                      alt=""
                      className="w-[13.5px] h-[16.5px] shrink-0"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[2px] pt-[2px]">
                    <span className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                      تحويل الوحدة إلى التنظيف
                    </span>
                    <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                      خطوة تالية مجدولة آلياً فور إغلاق البلاغ
                    </span>
                    <span className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px]">
                      مجدولة تلقائياً
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION F: Smart Hardware & IoT Connectivity Specifications (Node 1:20100) */}
          <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] px-[24px] pb-[24px] flex flex-col gap-[16px]">
            {/* Header */}
            <div className="h-[60px] flex items-center gap-[6px] justify-start pt-2">
              <img
                src="/icons/maintenance/lock_iot.svg"
                alt=""
                className="w-[15.54px] h-[15.83px] shrink-0"
              />
              <h2 className="text-[#181d17] text-[18px] font-bold leading-[28px] m-0">
                مواصفات القفل الذكي والاتصال
              </h2>
            </div>

            {/* List with Dividers */}
            <div className="flex flex-col gap-[16px]">
              {/* Item 1: Hardware Model */}
              <div className="flex items-center justify-between">
                <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                  طراز القفل (Hardware Model)
                </span>
                <span className="text-[#181d17] text-[12px] font-bold leading-[18px]">
                  Smart Bolt Enterprise V4
                </span>
              </div>

              <div className="bg-[#dfe4db] h-px w-full" />

              {/* Item 2: Device UUID */}
              <div className="flex items-center justify-between">
                <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                  المعرف السحابي (Device UUID)
                </span>
                <span className="text-[#181d17] text-[12px] font-bold leading-[18px] font-mono">
                  DEV-LK-305
                </span>
              </div>

              <div className="bg-[#dfe4db] h-px w-full" />

              {/* Item 3: Gateway Connection Status */}
              <div className="flex items-center justify-between">
                <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                  حالة الاتصال بالبوابة المركزية
                </span>
                <div className="flex items-center gap-[4px]">
                  <span className="bg-[#d85c5c] rounded-full size-[8px] shrink-0" />
                  <span className="text-[#c24343] text-[12px] font-bold leading-[18px]">
                    غير متصل (Offline)
                  </span>
                </div>
              </div>

              <div className="bg-[#dfe4db] h-px w-full" />

              {/* Item 4: Remaining Battery with Progress Indicator */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#75786f] text-[13px] font-normal leading-[20px]">
                    نسبة البطارية المتبقية
                  </span>
                  <span className="text-[#c24343] text-[12px] font-bold leading-[18px]">
                    18% (منخفضة)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="bg-[#e5eae0] h-[8px] rounded-full overflow-hidden w-full relative">
                  <div className="bg-[#d85c5c] h-full rounded-full w-[18%]" />
                </div>

                <p className="text-[#75786f] text-[11px] font-medium leading-[16px] pt-[2px] m-0">
                  سيتم تركيب طقم بطاريات ليثيوم 4x AA جديد عند إنهاء الصيانة.
                </p>
              </div>

              {/* Notice Box at bottom */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[10px] flex items-center gap-[8px]">
                <img
                  src="/icons/maintenance/sync_hub.svg"
                  alt=""
                  className="size-[15.5px] shrink-0"
                />
                <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                  يستلزم إعادة المزامنة اليدوية مع Hub الطابق الثالث فور انتهاء التركيب.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODALS & INTERACTION OVERLAYS
          ========================================================================= */}
      {/* 1. Maintenance Assign Modal */}
      <MaintenanceAssignModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onConfirm={(newAssignee) => {
          setAssigneeName(newAssignee);
        }}
        ticketNumber={ticketId}
        unitName="الوحدة 305 (الطابق الثالث - جناح A)"
        propertyName="برج الياسمين (حي الملقا، الرياض)"
        ownerName="سارة القحطاني"
      />

      {/* 2. Photo Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[16px] overflow-hidden max-w-[600px] w-full shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-[#ebefe6] flex items-center justify-between">
              <span className="text-[#181d17] text-[14px] font-bold">
                {activePhoto.title}
              </span>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="size-[32px] rounded-[8px] hover:bg-[#f1f5eb] flex items-center justify-center text-[#75786f] hover:text-[#181d17] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-[#f8faf6] flex items-center justify-center">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[70vh] rounded-[8px] object-contain shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
