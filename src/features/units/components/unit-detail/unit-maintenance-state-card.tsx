"use client";

import Link from "next/link";

interface UnitMaintenanceStateCardProps {
  ticketId?: string;
  issueTitle?: string;
  reportDate?: string;
  assignedTechnician?: string;
  priorityText?: string;
  lastUpdateAgo?: string;
}

export function UnitMaintenanceStateCard({
  ticketId = "MT-1082",
  issueTitle = "خلل بالقفل الذكي (Smart Lock Failure / Disconnection)",
  reportDate = "18 سبتمبر 2026 — 10:15 صباحاً",
  assignedTechnician = "م. خالد الشمري (شركة الأقفال الذكية المعتمدة)",
  priorityText = "حرجة وعاجلة — مرتبطة بأمن الوحدة والتحكم الإلكتروني",
  lastUpdateAgo = "قبل 18 دقيقة",
}: UnitMaintenanceStateCardProps) {
  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 flex flex-col gap-5 w-full relative overflow-hidden"
      dir="rtl"
    >
      {/* Top Header Row: Operational Status Banner & Ticket ID */}
      <div className="flex items-center justify-between w-full">
        {/* Right (Start in RTL): Red Circular Icon + Warning Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FFE9E6] text-[#BA1A1A] flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-[#BA1A1A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <h2 className="font-bold text-[#BA1A1A] text-[18px] leading-[28px]">
            الوحدة متوقفة مؤقتاً — أعمال الصيانة الفنية جارية
          </h2>
        </div>

        {/* Left (End in RTL): Ticket Badge */}
        <div className="bg-[#FFDAD6] text-[#93000A] font-bold text-[12px] px-3 py-1 rounded-[8px] select-all">
          {ticketId}
        </div>
      </div>

      {/* Maintenance Incident Telemetry Grid (4 Boxes, 2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Box 1 (Top Right in RTL): المشكلة المسجلة */}
        <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[12px] p-4 flex flex-col justify-between gap-2 text-right">
          <span className="font-semibold text-[#75786F] text-[11px] leading-[16px]">
            المشكلة المسجلة
          </span>
          <div className="flex items-center gap-2 text-[#BA1A1A] text-[13px] font-bold">
            <svg
              className="w-4 h-4 text-[#BA1A1A] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="leading-snug">{issueTitle}</span>
          </div>
        </div>

        {/* Box 2 (Top Left in RTL): تاريخ وتوقيت البلاغ */}
        <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[12px] p-4 flex flex-col justify-between gap-2 text-right">
          <span className="font-semibold text-[#75786F] text-[11px] leading-[16px]">
            تاريخ وتوقيت البلاغ
          </span>
          <div className="flex items-center gap-2 text-[#181D17] text-[13px] font-semibold">
            <svg
              className="w-4 h-4 text-[#75786F] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{reportDate}</span>
          </div>
        </div>

        {/* Box 3 (Bottom Right in RTL): الفني المسؤول المعين */}
        <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[12px] p-4 flex flex-col justify-between gap-2 text-right">
          <span className="font-semibold text-[#75786F] text-[11px] leading-[16px]">
            الفني المسؤول المعين
          </span>
          <div className="flex items-center gap-2 text-[#181D17] text-[13px] font-bold">
            <svg
              className="w-4 h-4 text-[#3E8A5A] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span className="leading-snug">{assignedTechnician}</span>
          </div>
        </div>

        {/* Box 4 (Bottom Left in RTL): الأولوية التشغيلية */}
        <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[12px] p-4 flex flex-col justify-between gap-2 text-right">
          <span className="font-semibold text-[#75786F] text-[11px] leading-[16px]">
            الأولوية التشغيلية
          </span>
          <div className="flex items-center gap-2 text-[#BA1A1A] text-[13px] font-bold">
            <svg
              className="w-4 h-4 text-[#BA1A1A] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <span className="leading-snug">{priorityText}</span>
          </div>
        </div>
      </div>

      {/* System-Driven Automation Disclaimer Banner (Figma 1:17906) */}
      <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[12px] p-4 flex items-start gap-3 text-right">
        <div className="w-8 h-8 rounded-lg bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center shrink-0 mt-0.5">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-bold text-[#181D17] text-[12px] leading-[18px]">
            [System-Driven Governance] إدارة الحالة الكلية للوحدة
          </span>
          <p className="text-[#75786F] text-[11px] leading-[18px]">
            بعد اكتمال الفحص الفني للصيانة، تنتقل الوحدة تلقائيا إلى حالة «تحتاج تنظيف» للتعقيم وإعادة الفحص قبل أن تصبح متاحة للحجز والاستقبال. لا يتيح النظام خيار التحويل اليدوي المباشر إلى حالة «متاحة» حفاظاً على معايير الجودة والسلامة المعتمدة.
          </p>
        </div>
      </div>

      {/* Action CTA Button Row (Figma 1:17914) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#F1F5EB]/60">
        <div className="flex items-center gap-2 text-[#75786F] text-[12px]">
          <span className="w-2 h-2 rounded-full bg-[#BA1A1A] animate-pulse shrink-0" />
          <span>آخر تحديث للحالة الفنية: {lastUpdateAgo}</span>
        </div>

        <Link
          href={`/operations/maintenance/${ticketId}/`}
          className="bg-[#34422A] hover:bg-[#283321] text-white px-5 py-2.5 rounded-[12px] font-bold text-[13px] inline-flex items-center gap-2 transition-colors cursor-pointer select-none self-start sm:self-auto"
        >
          <span>عرض بلاغ الصيانة الشامل ({ticketId})</span>
          <svg
            className="w-4 h-4 text-white rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
