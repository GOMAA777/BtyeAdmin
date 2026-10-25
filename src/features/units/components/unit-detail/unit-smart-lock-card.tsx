"use client";

import { useState } from "react";

interface UnitSmartLockCardProps {
  unitNumber?: string;
  variant?: "default" | "cleaning" | "maintenance";
  onOpenAccessCodeModal?: () => void;
  onOpenShowCode?: () => void;
  lockProtocol?: string;
  validityText?: string;
}

export function UnitSmartLockCard({
  unitNumber = "204",
  variant = "default",
  onOpenAccessCodeModal,
  onOpenShowCode,
  lockProtocol = "TTLock Cloud Gateway v4.2",
  validityText = "صلاحية الكود: ساري حتى 21 سبتمبر 2026 — 12:00 م (انتهاء الإقامة تلقائياً)",
}: UnitSmartLockCardProps) {
  const [revealed, setRevealed] = useState(false);

  const handleShowCodeClick = () => {
    if (onOpenShowCode) {
      onOpenShowCode();
    } else {
      setRevealed(!revealed);
    }
  };

  const isCleaning = variant === "cleaning";
  const isMaintenance = variant === "maintenance";

  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 space-y-4"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5EB]/60">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#34422A] h-[20px] w-[6px] rounded-full shrink-0" />
          <h2 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            نظام وكود الدخول الذكي
          </h2>
        </div>

        {/* Top Status Pill Badge */}
        {isCleaning ? (
          <div className="bg-[#FFF4E5] rounded-full px-3 py-1 flex items-center gap-1.5 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-[#B87114] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
            <span className="font-bold text-[#B87114] text-[11px] leading-[16px]">
              الباب غير مقفل / الطاقم متواجد
            </span>
          </div>
        ) : isMaintenance ? (
          <div className="bg-[#FFDAD6] rounded-full px-3 py-1 flex items-center gap-1.5 shrink-0">
            <svg
              className="w-3.5 h-3.5 text-[#BA1A1A] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-bold text-[#93000A] text-[11px] leading-[16px]">
              لوح مقفل مؤقتاً
            </span>
          </div>
        ) : (
          <div className="bg-[#EAF1E8] rounded-full px-2.5 py-0.5 flex items-center gap-1 shrink-0">
            <span className="font-semibold text-[#3E8A5A] text-[11px] leading-[16px]">
              بوابة IoT متزامنة
            </span>
            <svg
              className="w-3 h-3 text-[#3E8A5A] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
          </div>
        )}
      </div>

      {/* Inner Box with Code & Protocol */}
      <div className="bg-[#F1F5EB] rounded-[12px] p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 text-right">
        {/* Right Info: Passcode & Validity */}
        <div className="flex flex-col gap-1">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            {isCleaning
              ? "كود خدمة شركة رعاية"
              : isMaintenance
              ? "رمز الدخول الفني المعتمد"
              : "كود الدخول المخصص للنزيل الحالي"}
          </span>

          <div className="flex items-center gap-3">
            <span className="font-bold text-[#181D17] text-[24px] tracking-[2.4px] leading-[34px] select-all">
              {revealed ? "129 385" : "• • • • • •"}
            </span>

            <button
              type="button"
              onClick={handleShowCodeClick}
              className="bg-white rounded-[8px] px-3 py-1 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center gap-1.5 text-[#34422A] text-[11px] font-bold cursor-pointer hover:bg-[#F9FAF7] transition-colors select-none"
            >
              <span>{revealed ? "إخفاء الكود" : "عرض كود الدخول"}</span>
              <svg
                className="w-3.5 h-3.5 text-[#34422A] shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>

          <span className="font-medium text-[#75786F] text-[11px] leading-[16px] pt-1">
            {validityText}
          </span>
        </div>

        {/* Vertical Divider in Desktop */}
        <div className="hidden md:block w-px self-stretch bg-[#C5C8BD]/40" />

        {/* Left Info: Lock Protocol & Encryption */}
        <div className="flex flex-col gap-1 text-right md:text-start">
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            بروتوكول القفل والشركة المشغلة
          </span>
          <span className="font-semibold text-[#181D17] text-[12px] leading-[18px]">
            {lockProtocol}
          </span>
          <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            توليد شفرات PIN مشفرة تلقائياً
          </span>
        </div>
      </div>

      {/* Cleaning-Specific Sub-Cards: Previous Guest Revoked & Next Guest Scheduled */}
      {isCleaning && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {/* Card 1: كود النزيل السابق */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[10px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[12px] font-bold text-[#181D17]">كود النزيل السابق</span>
                <span className="text-[10.5px] text-[#75786F]">منتهي ومُبطل تلقائياً</span>
              </div>
            </div>
            <span className="bg-[#FFDAD6] text-[#BA1A1A] text-[11px] font-bold px-2 py-0.5 rounded-[6px]">
              ألغي: 12:00 م
            </span>
          </div>

          {/* Card 2: كود النزيل القادم */}
          <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[10px] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#EAF1E8] text-[#3E8A5A] flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 2l-2 2m-1-1l-3 3m5 5l-2-2m-1 1l-3-3" />
                  <circle cx="7.5" cy="15.5" r="5.5" />
                </svg>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[12px] font-bold text-[#181D17]">كود النزيل القادم</span>
                <span className="text-[10.5px] text-[#75786F]">مجدول للإنشاء والتسليم</span>
              </div>
            </div>
            <span className="bg-[#EAF1E8] text-[#3E8A5A] text-[11px] font-bold px-2 py-0.5 rounded-[6px]">
              الخميس 24 سبتمبر
            </span>
          </div>
        </div>
      )}

      {/* Maintenance-Specific Status Badges */}
      {isMaintenance && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <div className="flex items-center gap-1.5 text-xs text-[#75786F]">
            <span>حالة الباب والقفل:</span>
            <span className="bg-[#FFDAD6] text-[#93000A] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
              وضع الصيانة الفنية
            </span>
          </div>
          <span className="text-[#C5C8BD]">•</span>
          <div className="flex items-center gap-1.5 text-xs text-[#75786F]">
            <span>اتصال IoT السحابي:</span>
            <span className="bg-[#FFDAD6] text-[#BA1A1A] font-bold text-[11px] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]" />
              <span>غير متصل مؤقتاً</span>
            </span>
          </div>
        </div>
      )}

      {/* Footer Row */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-3">
        {/* Right Info: Auto-invalidation notice for default/cleaning, or omitted for maintenance */}
        {!isMaintenance ? (
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-[#75786F] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
              يتم إبطال الكود تلقائياً وتجديده بعد مغادرة النزيل واعتماد النظافة
            </span>
          </div>
        ) : (
          <div />
        )}

        {/* Left Action Button */}
        <button
          type="button"
          onClick={onOpenAccessCodeModal}
          className="bg-[#E5EAE0] hover:bg-[#D8E0D2] rounded-[12px] px-4 py-2 font-semibold text-[#181D17] text-[12px] leading-[18px] transition-colors cursor-pointer select-none"
        >
          {isCleaning || isMaintenance ? "إدارة كود الدخول" : "إدارة كود الدخول وسياسة الأمان"}
        </button>
      </div>
    </div>
  );
}
