"use client";

import Link from "next/link";

interface UnitHeroCardProps {
  unitNumber?: string;
  status?: "available" | "occupied";
  statusLabel?: string;
  propertyName?: string;
  location?: string;
  floor?: string;
  iotStatus?: string;
  iotSubtitle?: string;
  onOpenOperationsLog?: () => void;
  onOpenAccessCodeModal?: () => void;
  onEditUnit?: () => void;
}

export function UnitHeroCard({
  unitNumber = "204",
  status = "occupied",
  statusLabel,
  propertyName = "عمارة النخيل",
  location = "الرياض — حي العليا",
  floor = "الطابق الثاني",
  iotStatus = "متصل ونشط IoT",
  iotSubtitle = "ربط القفل السحابي",
  onOpenOperationsLog,
  onOpenAccessCodeModal,
  onEditUnit,
}: UnitHeroCardProps) {
  const isAvailable = status === "available";
  const displayStatusLabel = statusLabel || (isAvailable ? "متاحة للاستقبال" : "مشغولة (نزيل حالي)");

  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      dir="rtl"
    >
      {/* Right Column: Title, Status Badge, Details Subtitle */}
      <div className="flex flex-col items-start gap-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-bold text-[#181D17] text-[24px] leading-[34px] tracking-tight">
            الوحدة {unitNumber}
          </h1>

          {isAvailable ? (
            <div className="bg-[#EAF1E8] rounded-full px-3 py-1 flex items-center gap-1.5">
              <span className="bg-[#3E8A5A] rounded-full size-2 shrink-0" />
              <span className="font-bold text-[#3E8A5A] text-[12px] leading-[18px]">
                {displayStatusLabel}
              </span>
            </div>
          ) : (
            <div className="bg-[#FFF4E5] rounded-full px-3 py-1 flex items-center gap-1.5">
              <span className="bg-[#E99A38] rounded-full size-2 shrink-0" />
              <span className="font-bold text-[#B87114] text-[12px] leading-[18px]">
                {displayStatusLabel}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-[#75786F] text-[14px] leading-[22px] flex-wrap">
          <svg
            className="size-[13.5px] shrink-0 text-[#75786F]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M8 10h.01" />
            <path d="M16 10h.01" />
            <path d="M8 14h.01" />
            <path d="M16 14h.01" />
          </svg>
          <span>{propertyName}</span>
          <span>•</span>
          <span>{location}</span>
          <span>•</span>
          <span>{floor}</span>
        </div>
      </div>

      {/* Left Column: If Available -> 3 Action Buttons; If Occupied -> IoT Lock Status */}
      {isAvailable ? (
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* 1. سجل العمليات */}
          <button
            type="button"
            onClick={onOpenOperationsLog}
            className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] hover:bg-[#F9FAF8] text-[#181D17] h-[44px] px-4 rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-colors cursor-pointer select-none"
          >
            <svg
              className="size-[14px] text-[#181D17] shrink-0"
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
            <span>سجل العمليات</span>
          </button>

          {/* 2. إدارة كود الدخول */}
          <button
            type="button"
            onClick={onOpenAccessCodeModal}
            className="bg-[#D8E8CB] hover:bg-[#CCDDBE] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-[#5A6952] h-[44px] px-4 rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-colors cursor-pointer select-none"
          >
            <svg
              className="w-[15px] h-[12px] text-[#5A6952] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="7.5" cy="15.5" r="5.5" />
              <path d="m21 2-9.6 9.6" />
              <path d="m15.5 7.5 3 3L22 7l-3-3" />
            </svg>
            <span>إدارة كود الدخول</span>
          </button>

          {/* 3. تعديل بيانات الوحدة */}
          {onEditUnit ? (
            <button
              type="button"
              onClick={onEditUnit}
              className="bg-[#34422A] hover:bg-[#2B3722] text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] h-[44px] px-5 rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <svg
                className="size-[15px] text-white shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>تعديل بيانات الوحدة</span>
            </button>
          ) : (
            <Link
              href="/units/new/"
              className="bg-[#34422A] hover:bg-[#2B3722] text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] h-[44px] px-5 rounded-[12px] font-semibold text-[14px] flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <svg
                className="size-[15px] text-white shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>تعديل بيانات الوحدة</span>
            </Link>
          )}
        </div>
      ) : (
        /* Occupied: IoT Lock Cloud Connection Status Card */
        <div className="bg-[#F1F5EB] rounded-[12px] px-[14px] py-[8px] flex items-center gap-2.5 self-start lg:self-center shrink-0">
          <span className="bg-[#3E8A5A] rounded-full size-[10px] shrink-0" />
          <div className="flex flex-col text-right">
            <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
              {iotSubtitle}
            </span>
            <span className="font-semibold text-[#3E8A5A] text-[12px] leading-[18px]">
              {iotStatus}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
