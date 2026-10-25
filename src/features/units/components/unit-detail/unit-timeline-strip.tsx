"use client";

interface DaySlot {
  dayName: string;
  dayNumber: string;
  month: string;
  statusTitle: string;
  statusSubtitle: string;
  type: "available" | "occupied" | "transition";
  transitionType?: "arrival" | "departure";
}

const defaultDays: DaySlot[] = [
  {
    dayName: "اليوم",
    dayNumber: "18",
    month: "سبتمبر",
    statusTitle: "متاح شاغر",
    statusSubtitle: "فوري للاستقبال",
    type: "available",
  },
  {
    dayName: "الجمعة",
    dayNumber: "19",
    month: "سبتمبر",
    statusTitle: "متاح شاغر",
    statusSubtitle: "جاهز للحجز",
    type: "available",
  },
  {
    dayName: "السبت",
    dayNumber: "20",
    month: "سبتمبر",
    statusTitle: "وصول النزيل",
    statusSubtitle: "03:00 م • فهد",
    type: "transition",
    transitionType: "arrival",
  },
  {
    dayName: "الأحد",
    dayNumber: "21",
    month: "سبتمبر",
    statusTitle: "محجوز مؤكد",
    statusSubtitle: "حجز BK-10490",
    type: "occupied",
  },
  {
    dayName: "الإثنين",
    dayNumber: "22",
    month: "سبتمبر",
    statusTitle: "محجوز مؤكد",
    statusSubtitle: "حجز BK-10490",
    type: "occupied",
  },
  {
    dayName: "الثلاثاء",
    dayNumber: "23",
    month: "سبتمبر",
    statusTitle: "مغادرة وتنظيف",
    statusSubtitle: "12:00 ظ • رعاية",
    type: "transition",
    transitionType: "departure",
  },
  {
    dayName: "الأربعاء",
    dayNumber: "24",
    month: "سبتمبر",
    statusTitle: "متاح شاغر",
    statusSubtitle: "متاح للمنصات",
    type: "available",
  },
];

export function UnitTimelineStrip() {
  return (
    <div
      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#E2E6DC] rounded-[16px] p-5 sm:p-6 flex flex-col gap-4 w-full"
      dir="rtl"
    >
      {/* Top Header: Title + Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
        {/* Right (Start in RTL): Title & Icon */}
        <div className="flex items-center gap-2">
          <svg
            className="w-[15px] h-[17px] text-[#34422A] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <h3 className="font-bold text-[#181D17] text-[18px] leading-[28px]">
            الجدول الزمني للإشغال (الأيام الـ 7 القادمة)
          </h3>
        </div>

        {/* Left (End in RTL): Color Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* وصول / مغادرة وتنظيف */}
          <div className="flex items-center gap-1.5">
            <span className="bg-[#E99A38] rounded-full size-2.5 shrink-0" />
            <span className="font-medium text-[#454840] text-[11px] leading-[16px]">
              وصول / مغادرة وتنظيف
            </span>
          </div>

          {/* محجوز */}
          <div className="flex items-center gap-1.5">
            <span className="bg-[#34422A] rounded-full size-2.5 shrink-0" />
            <span className="font-medium text-[#454840] text-[11px] leading-[16px]">
              محجوز
            </span>
          </div>

          {/* متاح */}
          <div className="flex items-center gap-1.5">
            <span className="bg-[#3E8A5A] rounded-full size-2.5 shrink-0" />
            <span className="font-medium text-[#454840] text-[11px] leading-[16px]">
              متاح
            </span>
          </div>
        </div>
      </div>

      {/* 7-Day Timeline Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-1 w-full">
        {defaultDays.map((day, idx) => {
          if (day.type === "available") {
            return (
              <div
                key={idx}
                className="bg-[#EAF1E8] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[103px] text-right"
              >
                {/* Day Header */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col font-bold text-[#3E8A5A] text-[11px] leading-[16px]">
                    <span>{day.dayName} • {day.dayNumber}</span>
                    <span>{day.month}</span>
                  </div>
                  <span className="bg-[#3E8A5A] rounded-full size-2 shrink-0 mt-1" />
                </div>

                {/* Day Status */}
                <div className="flex flex-col gap-0.5 pt-3">
                  <span className="font-bold text-[#3E8A5A] text-[14px] leading-[20px]">
                    {day.statusTitle}
                  </span>
                  <span className="font-normal text-[#75786F] text-[13px] leading-[20px]">
                    {day.statusSubtitle}
                  </span>
                </div>
              </div>
            );
          }

          if (day.type === "transition") {
            return (
              <div
                key={idx}
                className="bg-[#FFF4E5] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[103px] text-right"
              >
                {/* Day Header */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col font-bold text-[#E99A38] text-[11px] leading-[16px]">
                    <span>{day.dayName} • {day.dayNumber}</span>
                    <span>{day.month}</span>
                  </div>
                  <div className="text-[#E99A38] shrink-0 mt-0.5">
                    {day.transitionType === "arrival" ? (
                      <svg
                        className="size-[14px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" x2="3" y1="12" y2="12" />
                      </svg>
                    ) : (
                      <svg
                        className="size-[14px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Day Status */}
                <div className="flex flex-col gap-0.5 pt-3">
                  <span className="font-bold text-[#181D17] text-[14px] leading-[20px]">
                    {day.statusTitle}
                  </span>
                  <span className="font-normal text-[#75786F] text-[13px] leading-[20px]">
                    {day.statusSubtitle}
                  </span>
                </div>
              </div>
            );
          }

          // Occupied
          return (
            <div
              key={idx}
              className="bg-[#E5EAE0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] p-[14px] flex flex-col justify-between min-h-[103px] text-right"
            >
              {/* Day Header */}
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col font-semibold text-[#75786F] text-[11px] leading-[16px]">
                  <span>{day.dayName} • {day.dayNumber}</span>
                  <span>{day.month}</span>
                </div>
                <span className="bg-[#34422A] rounded-full size-2 shrink-0 mt-1" />
              </div>

              {/* Day Status */}
              <div className="flex flex-col gap-0.5 pt-3">
                <span className="font-bold text-[#181D17] text-[14px] leading-[20px]">
                  {day.statusTitle}
                </span>
                <span className="font-normal text-[#75786F] text-[13px] leading-[20px]">
                  {day.statusSubtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
