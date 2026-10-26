"use client";

import React, { useState } from "react";
import {
  X,
  Sliders,
  AlertTriangle,
  ArrowLeft,
  Check,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { BookingRuleComparisonItem } from "../../types";

interface ConfirmBookingRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  comparisonItems?: BookingRuleComparisonItem[];
}

export function ConfirmBookingRulesModal({
  isOpen,
  onClose,
  onConfirm,
  comparisonItems = [],
}: ConfirmBookingRulesModalProps) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs font-cairo overflow-y-auto"
      dir="rtl"
    >
      <div
        className="bg-white rounded-[20px] shadow-2xl border border-[#e5eae0] w-full max-w-[620px] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* 1. Modal Header (Figma 1:30899) */}
        <div className="bg-white flex items-center justify-between pb-4 pt-6 px-6 border-b border-[#f1f5eb]">
          <div className="flex items-center gap-3.5">
            <div className="size-[44px] rounded-[12px] bg-[#d8e8cb] flex items-center justify-center text-[#34422a] shadow-2xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-[#181d17] leading-tight">
                تأكيد تحديث قواعد الحجوزات
              </h3>
              <p className="text-[12px] text-[#75786f] mt-0.5 font-medium">
                مراجعة الأثر التشغيلي قبل تعميم السياسات الجديدة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-[36px] rounded-[10px] bg-[#ebefe6] hover:bg-[#dfe4db] flex items-center justify-center text-[#454840] transition-colors cursor-pointer"
            title="إغلاق النافذة"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body (Figma 1:30910) */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* 2. Operational Warning Banner (Figma 1:30911) */}
          <div className="bg-[#fdf8f0] border border-[#f5deb3]/70 rounded-[12px] p-4 flex gap-3.5 items-start">
            <div className="size-[32px] rounded-[8px] bg-[rgba(245,222,179,0.6)] flex items-center justify-center text-[#87581b] shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[13px] font-bold text-[#613d0e] leading-snug">
                سيتم تطبيق هذه القاعدة على الحجوزات الجديدة فقط ما لم يتم تحديد خلاف ذلك.
              </h4>
              <p className="text-[12px] text-[#87581b] leading-relaxed">
                لن تتأثر الحجوزات المؤكدة مسبقاً أو الجارية حالياً بأي تغيير في الحد الأقصى أو سياسات التوافر التشغيلية.
              </p>
            </div>
          </div>

          {/* 3. Affected Rules Breakdown (Figma 1:30921) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[12px] px-1">
              <span className="font-semibold text-[#75786f]">
                جدول مقارنة القواعد المعدلة ({comparisonItems.length} معايير)
              </span>
              <span className="font-mono text-[11px] text-[#454840] font-medium bg-[#ebefe6] px-2 py-0.5 rounded-[6px]">
                المرجع: CORE-BOOKING-POLICIES
              </span>
            </div>

            <div className="space-y-2">
              {comparisonItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f1f5eb] rounded-[12px] p-3.5 border border-[#e5eae0]/60 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[#181d17]">
                      {item.title}
                    </span>
                    <span className="bg-[#e5eae0] text-[#454840] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#e2e8dc]/60">
                    {/* Old Value */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#75786f] font-medium">القيمة الحالية:</span>
                      <span className="bg-white/90 border border-[#dce2d7] px-2.5 py-0.5 rounded-[6px] text-[12px] font-semibold text-[#454840]">
                        {item.oldValue}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="size-[24px] rounded-full bg-[#e5eae0] flex items-center justify-center text-[#55634d] shrink-0">
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </div>

                    {/* New Value */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#4b5940] font-medium">القيمة الجديدة:</span>
                      <span className="bg-[#d8e8cb] text-[#34422a] px-2.5 py-0.5 rounded-[6px] text-[12px] font-bold shadow-2xs">
                        {item.newValue}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Operational Impact & Distribution (Figma 1:30953) */}
          <div className="bg-[#f1f5eb] border border-[#e0e7db] rounded-[14px] p-4 space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#34422a]" />
              <h4 className="text-[13px] font-bold text-[#181d17]">
                الأثر الإداري والانتشار التشغيلي
              </h4>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-white rounded-[10px] p-3 border border-[#dfe4db] text-center space-y-0.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#75786f] block">
                  الحسابات المتأثرة
                </span>
                <span className="text-[18px] font-bold text-[#181d17] block font-mono">
                  1,482
                </span>
                <span className="text-[10px] font-medium text-[#75786f] block">
                  مالك عقار مسجل
                </span>
              </div>

              <div className="bg-white rounded-[10px] p-3 border border-[#dfe4db] text-center space-y-0.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#75786f] block">
                  إجمالي الوحدات
                </span>
                <span className="text-[18px] font-bold text-[#181d17] block font-mono">
                  11,290
                </span>
                <span className="text-[10px] font-medium text-[#75786f] block">
                  وحدة سكنية نشطة
                </span>
              </div>

              <div className="bg-white rounded-[10px] p-3 border border-[#dfe4db] text-center space-y-0.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#75786f] block">
                  نطاق السريان
                </span>
                <span className="text-[18px] font-bold text-[#34422a] block">
                  فوري
                </span>
                <span className="text-[10px] font-medium text-[#75786f] block truncate">
                  مباشر، Booking، Airbnb
                </span>
              </div>
            </div>
          </div>

          {/* 5. Acknowledgment Checkbox (Figma 1:30973) */}
          <div
            onClick={() => setIsAcknowledged(!isAcknowledged)}
            className={`rounded-[12px] p-3.5 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              isAcknowledged
                ? "bg-[#d8e8cb]/30 border-[#34422a]/40"
                : "bg-[#f1f5eb] border-[#dfe4db] hover:bg-[#ebefe6]"
            }`}
          >
            <p className="text-[12px] font-semibold text-[#181d17] leading-relaxed select-none">
              أقر بأنني قمت بمراجعة تأثير هذه التعديلات التشغيلية على حسابات ملاك العقارات وقنوات الحجز المعتمدة.
            </p>

            <div
              className={`size-[22px] rounded-[6px] border flex items-center justify-center shrink-0 transition-colors ${
                isAcknowledged
                  ? "bg-[#34422a] border-[#34422a] text-white"
                  : "bg-white border-[#b5c0b0]"
              }`}
            >
              {isAcknowledged && <Check className="w-3.5 h-3.5" />}
            </div>
          </div>
        </div>

        {/* 6. Modal Footer Action Buttons */}
        <div className="bg-[#f1f5eb]/70 px-6 py-4 border-t border-[#ebefe6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-gray-50 border border-gray-300 text-[#454840] px-5 py-2.5 rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            إلغاء التغييرات
          </button>

          <button
            type="button"
            disabled={!isAcknowledged}
            onClick={onConfirm}
            className="bg-[#34422a] text-white hover:bg-[#283420] disabled:bg-[#a9b5a0] disabled:cursor-not-allowed px-6 py-2.5 rounded-[10px] text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تأكيد تحديث القواعد</span>
          </button>
        </div>
      </div>
    </div>
  );
}
