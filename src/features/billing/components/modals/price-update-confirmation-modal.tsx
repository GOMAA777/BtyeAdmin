"use client";

import React from "react";
import {
  X,
  ShieldCheck,
  Calendar,
  Award,
  ArrowLeft,
  Clock,
  AlertTriangle,
  User,
  CheckCircle2,
} from "lucide-react";

export interface PriceUpdateConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  monthlyPrice?: number;
  annualPrice?: number;
  effectiveDate?: string;
  discountPercent?: string;
  currentMonthlyPrice?: number;
  currentAnnualPrice?: number;
}

export function PriceUpdateConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  monthlyPrice = 99,
  annualPrice = 999,
  effectiveDate = "1 نوفمبر 2026",
  discountPercent = "15.9",
  currentMonthlyPrice = 99,
  currentAnnualPrice = 999,
}: PriceUpdateConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      dir="rtl"
    >
      {/* Backdrop click dismiss */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="bg-white content-stretch flex flex-col items-start overflow-hidden relative rounded-[24px] shadow-[0px_24px_60px_-12px_rgba(24,29,23,0.22),0px_4px_16px_0px_rgba(24,29,23,0.08)] w-full max-w-[680px] font-cairo"
        data-node-id="1:28400"
        data-name="تأكيد تحديث الأسعار"
      >
        {/* Top Subtle Decorative Header Line */}
        <div
          className="h-[6px] relative shrink-0 w-full bg-[#4b5940]"
          data-node-id="1:28401"
          data-name="Top Subtle Decorative Header Line"
        />

        {/* MODAL HEADER */}
        <div
          className="bg-white h-[92px] px-[40px] flex items-center justify-between shrink-0 w-full"
          data-node-id="1:28402"
          data-name="MODAL HEADER"
        >
          {/* Right Header Area (Icon + Title + Badge) */}
          <div className="flex items-center gap-[12px]">
            <div
              className="bg-[#d8e8c7] flex items-center justify-center rounded-[16px] size-[48px] shrink-0 text-[#181d17] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
              data-node-id="1:28413"
              data-name="Icon Shield Container"
            >
              <ShieldCheck className="w-6 h-6 text-[#181d17]" />
            </div>

            <div className="flex items-center gap-[8px]">
              <h2
                className="font-bold text-[#181d17] text-[20px] leading-[25px]"
                data-node-id="1:28411"
              >
                تأكيد تحديث الأسعار
              </h2>
              <span
                className="bg-[#bcccac] text-[#131f0b] text-[11px] font-bold px-[10px] py-[2px] rounded-full leading-[16px]"
                data-node-id="1:28409"
              >
                V3.3
              </span>
            </div>
          </div>

          {/* Left Header Area (Close Button) */}
          <button
            type="button"
            onClick={onClose}
            className="bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#181d17] flex items-center justify-center rounded-[12px] size-[36px] transition-colors cursor-pointer"
            data-node-id="1:28403"
            aria-label="إغلاق النافذة"
          >
            <X className="w-4 h-4 text-[#181d17]" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div
          className="flex flex-col gap-[16px] items-start max-h-[724px] overflow-y-auto px-[40px] py-[8px] w-full"
          data-node-id="1:28416"
          data-name="MODAL BODY"
        >
          {/* SECTION 1: COMPARISON GRID OF RATES */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-[8px] items-stretch justify-center w-full"
            data-node-id="1:28417"
            data-name="SECTION 1: COMPARISON GRID OF RATES"
          >
            {/* Card 1 (Right in RTL): Monthly Rate Card */}
            <div
              className="bg-[#f1f5eb] flex flex-col justify-between gap-[8px] p-[16px] rounded-[16px]"
              data-node-id="1:28441"
              data-name="Monthly Rate Card"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-[8px] items-center">
                  <Calendar className="w-4 h-4 text-[#181d17]" />
                  <span className="font-bold text-[#181d17] text-[14px] leading-[20px]">
                    السعر الشهري للشقة
                  </span>
                </div>
                <div className="bg-[#dfe4db] px-[8px] py-[2px] rounded-full">
                  <span className="font-semibold text-[#454840] text-[11px] leading-[16px]">
                    تأكيد القيمة
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {/* Current Approved Rate */}
                <div className="flex flex-col items-start">
                  <span className="font-medium text-[#75786f] text-[11px] leading-[16px]">
                    السعر الحالي المعتمد
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-medium text-[#454840] text-[18px] leading-[28px]">
                      {currentMonthlyPrice.toFixed(2)}
                    </span>
                    <span className="font-normal text-[#454840] text-[11px] leading-[16px]">
                      ر.س
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowLeft className="w-4 h-4 text-[#75786f] shrink-0" />

                {/* New Approved Rate */}
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[#34422a] text-[11px] leading-[16px]">
                    السعر المعتمد الجديد
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-[#34422a] text-[24px] leading-[34px]">
                      {Number(monthlyPrice).toFixed(2)}
                    </span>
                    <span className="font-semibold text-[#34422a] text-[11px] leading-[16px]">
                      ر.س
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 (Left in RTL): Annual Rate Card */}
            <div
              className="bg-[rgba(242,225,192,0.3)] flex flex-col justify-between gap-[8px] p-[16px] rounded-[16px]"
              data-node-id="1:28418"
              data-name="Annual Rate Card"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-[8px] items-center">
                  <Award className="w-4 h-4 text-[#231a06]" />
                  <span className="font-bold text-[#231a06] text-[14px] leading-[20px]">
                    السعر السنوي للشقة
                  </span>
                </div>
                <div className="bg-[#f2e1c0] px-[8px] py-[2px] rounded-full">
                  <span className="font-bold text-[#51452d] text-[11px] leading-[16px]">
                    خصم {discountPercent}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {/* Current Approved Rate */}
                <div className="flex flex-col items-start">
                  <span className="font-medium text-[#75786f] text-[11px] leading-[16px]">
                    السعر الحالي المعتمد
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-medium text-[#454840] text-[18px] leading-[28px]">
                      {currentAnnualPrice.toFixed(2)}
                    </span>
                    <span className="font-normal text-[#454840] text-[11px] leading-[16px]">
                      ر.س
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowLeft className="w-4 h-4 text-[#75786f] shrink-0" />

                {/* New Approved Rate */}
                <div className="flex flex-col items-start">
                  <span className="font-bold text-[#695d43] text-[11px] leading-[16px]">
                    السعر المعتمد الجديد
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-bold text-[#695d43] text-[24px] leading-[34px]">
                      {Number(annualPrice).toFixed(2)}
                    </span>
                    <span className="font-semibold text-[#695d43] text-[11px] leading-[16px]">
                      ر.س
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: EFFECTIVE DATE CARD */}
          <div
            className="bg-[#ebefe6] flex items-center justify-between p-[16px] rounded-[16px] shrink-0 w-full"
            data-node-id="1:28464"
            data-name="EFFECTIVE DATE CARD"
          >
            {/* Right side: Icon + Date info */}
            <div className="flex items-center gap-[12px]">
              <div className="bg-[#dfe4db] flex items-center justify-center rounded-[12px] size-[40px] shrink-0 text-[#454840]">
                <Calendar className="w-5 h-5 text-[#454840]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium text-[#75786f] text-[11px] leading-[16px]">
                  تاريخ سريان التسعير في بيئة الإنتاج
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-[#181d17] text-[18px] leading-[28px]">
                    {effectiveDate}
                  </span>
                  <span className="font-normal text-[#454840] text-[14px] leading-[22px]">
                    (00:00 بتوقيت مكة المكرمة)
                  </span>
                </div>
              </div>
            </div>

            {/* Left side: Countdown badge */}
            <div
              className="bg-[#d8e8c7] flex gap-[6px] items-center px-[12px] py-[6px] rounded-[12px] shrink-0"
              data-node-id="1:28465"
            >
              <Clock className="w-3.5 h-3.5 text-[#131f0b]" />
              <span className="font-medium text-[#131f0b] text-[11px] leading-[16px]">
                تطبيق آلي بعد 16 يوماً
              </span>
            </div>
          </div>

          {/* SECTION 3: CRITICAL GOVERNANCE WARNING BOX */}
          <div
            className="bg-[rgba(242,225,192,0.4)] flex gap-[12px] items-start p-[16px] rounded-[16px] shrink-0 w-full"
            data-node-id="1:28480"
            data-name="SECTION 3: CRITICAL GOVERNANCE WARNING BOX"
          >
            <div className="bg-[#695d43] flex items-center justify-center rounded-[8px] size-[32px] shrink-0 text-white mt-0.5">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <h4 className="font-bold text-[#6f6349] text-[14px] leading-[20px]">
                تنبيه نظامي وحوكمة مالية
              </h4>
              <p className="font-normal text-[#6f6349] text-[14px] leading-[22.75px]">
                سيتم استخدام الأسعار الجديدة فقط للعمليات المنشأة ضمن أو بعد تاريخ السريان المحدد. لن يتم
                تعديل الفواتير السابقة أو المساس بسجلات الدفع التاريخية الصادرة عبر بوابات الدفع (سداد، مدى،
                البطاقات الائتمانية).
              </p>
            </div>
          </div>

          {/* SECTION 4: AUDIT TRAIL FOOTPRINT METADATA */}
          <div
            className="bg-[rgba(229,234,224,0.6)] flex items-center justify-start gap-[24px] px-[16px] py-[10px] rounded-[12px] shrink-0 w-full"
            data-node-id="1:28490"
            data-name="SECTION 4: AUDIT TRAIL FOOTPRINT METADATA"
          >
            <div className="flex items-center gap-[6px]">
              <User className="w-3.5 h-3.5 text-[#454840]" />
              <span className="font-medium text-[#454840] text-[11px] leading-[16px]">
                المنفّذ:
              </span>
              <span className="font-bold text-[#181d17] text-[11px] leading-[16px]">
                محمد أحمد (ADM-1002)
              </span>
            </div>

            <div className="flex items-center gap-[6px]">
              <Clock className="w-3.5 h-3.5 text-[#454840]" />
              <span className="font-medium text-[#454840] text-[11px] leading-[16px]">
                15 أكتوبر 2026 - 11:42 ص
              </span>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER ACTIONS */}
        <div
          className="bg-[#f1f5eb] h-[80px] px-[40px] flex items-center justify-end rounded-b-[24px] shrink-0 w-full"
          data-node-id="1:28503"
          data-name="MODAL FOOTER ACTIONS"
        >
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[#4b5940] hover:bg-[#3d4933] text-white font-bold text-[14px] rounded-[12px] px-[24px] py-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center gap-[8px] transition-colors cursor-pointer"
            data-node-id="1:28504"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>تأكيد التعديلات والاعتماد</span>
          </button>
        </div>
      </div>
    </div>
  );
}
