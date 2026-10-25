"use client";

export function UnitAvailableStateCard() {
  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 flex flex-col gap-6 w-full"
      dir="rtl"
    >
      {/* Top Header: Title & Status Badge */}
      <div className="flex items-center justify-between w-full">
        {/* Right (Start in RTL): Title with Decorative Green Bar */}
        <div className="flex items-center gap-2.5">
          <span className="bg-[#34422A] h-[20px] w-[6px] rounded-full shrink-0" />
          <h2 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            لايوجد حجز نشط حاليا
          </h2>
        </div>

        {/* Left (End in RTL): Pill Badge */}
        <div className="bg-[#EAF1E8] rounded-full px-3.5 py-1.5 flex items-center gap-1.5 shrink-0">
          <svg
            className="size-[15px] text-[#3E8A5A]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span className="font-semibold text-[#3E8A5A] text-[12px] leading-[18px]">
            جاهزة للحجز
          </span>
        </div>
      </div>

      {/* 3 Readiness Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {/* Card 1: النظافة والتعقيم */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col justify-between gap-1 text-right">
          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
              النظافة والتعقيم
            </span>
            <svg
              className="size-[14px] text-[#3E8A5A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4" />
              <path d="m4.93 4.93 2.83 2.83" />
              <path d="M2 12h4" />
              <path d="m4.93 19.07 2.83-2.83" />
              <path d="M12 18v4" />
              <path d="m19.07 19.07-2.83-2.83" />
              <path d="M18 12h4" />
              <path d="m19.07 4.93-2.83 2.83" />
            </svg>
          </div>
          <div className="font-semibold text-[#181D17] text-[18px] leading-[28px] pt-1">
            مكتمل 100%
          </div>
          <div className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            معتمد بواسطة رعاية الفندقية
          </div>
        </div>

        {/* Card 2: القفل الذكي للباب */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col justify-between gap-1 text-right">
          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
              القفل الذكي للباب
            </span>
            <svg
              className="size-[14px] text-[#3E8A5A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="font-semibold text-[#181D17] text-[18px] leading-[28px] pt-1">
            نشط ومزامن
          </div>
          <div className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            البطارية 92% • بوابة G3
          </div>
        </div>

        {/* Card 3: جاهزية التكييف والإنارة */}
        <div className="bg-[#F1F5EB] rounded-[12px] p-4 flex flex-col justify-between gap-1 text-right">
          <div className="flex items-center justify-between w-full">
            <span className="font-medium text-[#75786F] text-[11px] leading-[16px]">
              جاهزية التكييف والإنارة
            </span>
            <svg
              className="size-[14px] text-[#3E8A5A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
            </svg>
          </div>
          <div className="font-semibold text-[#181D17] text-[18px] leading-[28px] pt-1">
            وضع الاستعداد (Eco)
          </div>
          <div className="font-medium text-[#75786F] text-[11px] leading-[16px]">
            24°C • مستشعرات الحركة نشطة
          </div>
        </div>
      </div>

      {/* System-Driven Automation Disclaimer Banner */}
      <div className="bg-[#E5EAE0] rounded-[12px] p-4 flex items-start gap-3 w-full text-right">
        <div className="text-[#34422A] shrink-0 mt-0.5">
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-[#181D17] text-[14px] leading-[20px]">
            إدارة الحالة الآلية (System-Driven Governance)
          </h4>
          <p className="font-normal text-[#75786F] text-[13px] leading-[21px]">
            تخضع حالة الوحدة للتحديث التلقائي الفوري بواسطة محرك الحجوزات الذكي في المنصة، بالربط المباشر مع تسجيلات الدخول الذاتي عبر الأقفال، تقارير إتمام التنظيف من فرق التشغيل، ودورات الحجوزات المؤكدة. لا يتطلب التعديل أي تدخل يدوي تقليدي لضمان موثوقية الأصول.
          </p>
        </div>
      </div>
    </div>
  );
}
