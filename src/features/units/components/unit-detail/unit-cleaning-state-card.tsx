"use client";

interface UnitCleaningStateCardProps {
  ticketId?: string;
  previousGuestName?: string;
  departureTimeText?: string;
  contractorName?: string;
  fieldSupervisor?: string;
  estimatedRemainingTime?: string;
}

export function UnitCleaningStateCard({
  ticketId = "CL-2048",
  previousGuestName = "خالد العتيبي",
  departureTimeText = "المغادرة: 12:00 ظهراً (منذ 45 دقيقة)",
  contractorName = "شركة رعاية الفندقية للنظافة والتعقيم",
  fieldSupervisor = "طارق",
  estimatedRemainingTime = "30 دقيقة",
}: UnitCleaningStateCardProps) {
  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 flex flex-col gap-5 w-full relative overflow-hidden"
      dir="rtl"
    >
      {/* Top Header Row: Operational Status Banner & Ticket ID */}
      <div className="flex items-center justify-between w-full">
        {/* Right (Start in RTL): Decorative Bar + Title */}
        <div className="flex items-center gap-2.5">
          <span className="bg-[#34422A] h-[20px] w-[6px] rounded-full shrink-0" />
          <h2 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            الوحدة قيد التنظيف والتعقيم
          </h2>
        </div>

        {/* Left (End in RTL): Ticket Badge */}
        <div className="bg-[#EBEFE6] text-[#34422A] font-bold text-[12px] px-3 py-1 rounded-[8px] select-all">
          {ticketId}
        </div>
      </div>

      {/* Cleaning Ticket Breakdown & Last Departure Metadata (2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Col 1 (Right in RTL): Previous Booking Context */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold text-[#181D17] text-[12px] leading-[18px]">
              سبب تفعيل الحالة
            </span>
            <span className="bg-[#E2E7DC] text-[#55694D] text-[11px] font-semibold px-2 py-0.5 rounded-[6px]">
              حجز منتهٍ
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>النزيل السابق: {previousGuestName}</span>
            </div>

            <div className="flex items-center gap-2 text-[#75786F] text-[12px]">
              <svg
                className="w-3.5 h-3.5 text-[#75786F] shrink-0"
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
              <span>{departureTimeText}</span>
            </div>
          </div>
        </div>

        {/* Col 2 (Left in RTL): Cleaning Contractor & Dispatch Field Lead */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
          <div className="flex items-center justify-between w-full">
            <span className="font-bold text-[#181D17] text-[12px] leading-[18px]">
              فريق التنفيذ المعتمد
            </span>
            <span className="bg-[#FFF4E5] text-[#B87114] text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E99A38]" />
              <span>جاري التنفيذ</span>
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span className="truncate">{contractorName}</span>
            </div>

            <div className="flex items-center justify-between text-[12px] text-[#75786F] pt-0.5">
              <div className="flex items-center gap-1.5">
                <span>المشرف الميداني:</span>
                <strong className="text-[#181D17] font-semibold">{fieldSupervisor}</strong>
              </div>
              <div className="flex items-center gap-1">
                <span>المتبقي:</span>
                <strong className="text-[#B87114] font-bold">{estimatedRemainingTime}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System-Driven Automation Disclaimer Banner (Figma 1:17263) */}
      <div className="bg-[#F8FAF6] border border-[#E2E6DC] rounded-[12px] p-4 flex items-start gap-3 text-right">
        <div className="w-8 h-8 rounded-lg bg-[#EAF1E8] text-[#3E8A5A] flex items-center justify-center shrink-0 mt-0.5">
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
            تخضع حالة الوحدة للتحديث التلقائي الفوري بواسطة محرك الحجوزات الذكي في المنصة، والربط المباشر مع تسجيلات الجدول المالي عبر الأقفال. يتم إتمام التنظيف من فرق التشغيل، وبمجرد الحجوزات المؤكدة، لا يتطلب العمل أي تدخل يدوي تقليدي لضمان موثوقية الأصول.
          </p>
        </div>
      </div>
    </div>
  );
}
