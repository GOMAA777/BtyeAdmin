"use client";

import React from "react";
import { AutomationRule } from "../../../types";
import {
  CloseIcon,
  ScopeBuildingIcon,
  ClockTriggerIcon,
  ShieldCheckIcon,
  AuditStampIcon,
  PauseIcon,
} from "./modal-icons";

interface PauseRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rule?: AutomationRule | null;
}

export function PauseRuleModal({
  isOpen,
  onClose,
  onConfirm,
  rule,
}: PauseRuleModalProps) {
  if (!isOpen || !rule) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col items-start overflow-hidden rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] w-full max-w-[560px] animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        data-node-id="1:22958"
        data-name="إيقاف قاعدة الأتمتة؟"
      >
        {/* Top Accent Subtle Tint Indicator */}
        <div className="h-[6px] shrink-0 w-full" />

        {/* Header Section */}
        <div className="flex items-start justify-between pb-[16px] pt-[36px] px-[36px] shrink-0 w-full">
          {/* Heading 2 */}
          <h2 className="font-bold text-[20px] leading-[30px] text-[#181d17] text-right">
            إيقاف قاعدة الأتمتة؟
          </h2>

          {/* Button - إغلاق النافذة */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-[8px] shrink-0 size-[36px] text-[#454840] hover:bg-[#ebefe6] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <CloseIcon className="size-[11.67px]" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex flex-col gap-[15.4px] items-start px-[36px] py-[8px] shrink-0 w-full">
          {/* Target Rule Snapshot Card */}
          <div className="bg-[#f1f5eb] flex flex-col gap-[4px] items-start p-[16px] rounded-[12px] shrink-0 w-full">
            <div className="flex items-center justify-between shrink-0 w-full">
              {/* Rule Title & Code */}
              <div className="flex gap-[8px] items-center shrink-0">
                <span className="font-bold text-[18px] leading-[28px] text-[#181d17] text-right">
                  {rule.title || "إرسال تفاصيل الوصول"}
                </span>
                <span className="bg-[#ebefe6] px-[4px] py-[2px] rounded-[4px] font-normal text-[11px] leading-[16px] text-[#454840] text-right">
                  #{rule.ruleCode || "AUT-102"}
                </span>
              </div>

              {/* Active Status Badge */}
              <div className="bg-[#d8e8cb] flex gap-[6px] items-center px-[8px] py-[2px] rounded-[9999px] shrink-0">
                <div className="bg-[#54624c] rounded-[9999px] shrink-0 size-[6px]" />
                <span className="font-medium text-[11px] leading-[16px] text-[#5a6952] text-right">
                  مفعلة
                </span>
              </div>
            </div>

            {/* Trigger & Scope Details */}
            <div className="flex gap-[4px] items-center pt-[4px] shrink-0 w-full flex-wrap text-[#454840] text-[13px] leading-[20px]">
              <div className="flex items-center gap-[4px] shrink-0">
                <ClockTriggerIcon className="size-[13.33px] text-[#54624c] shrink-0" />
                <span className="text-[#454840]">
                  المحفز: {rule.triggerLabel || "قبل موعد الوصول بـ 24 ساعة"}
                </span>
              </div>

              <span className="text-[#c5c8bd] px-[2px]">•</span>

              <div className="flex items-center gap-[4px] shrink-0">
                <ScopeBuildingIcon className="size-[13.33px] text-[#54624c] shrink-0" />
                <span className="text-[#454840]">
                  النطاق: {rule.scope || "جميع العقارات (18 عقاراً • 142 وحدة)"}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Operational Impact Notice */}
          <div className="flex flex-col items-end shrink-0 w-full">
            <p className="font-normal text-[14px] leading-[22.75px] text-[#181d17] text-right w-full">
              سيتم إيقاف تنفيذ هذه القاعدة فورياً. لن يتم تشغيل إرسال بيانات الوصول للحجوزات
              المستقبلية حتى يُعاد تفعيل القاعدة يدوياً من لوحة التحكم.
            </p>
          </div>

          {/* Compliance & Safe-State Guarantee Card */}
          <div className="bg-[#ebefe6] flex gap-[8px] items-start p-[16px] rounded-[12px] shrink-0 w-full">
            <div className="bg-[#d8e8cb] flex items-center justify-center rounded-[9999px] shrink-0 size-[24px] mt-[1px]">
              <ShieldCheckIcon className="size-[13.33px] text-[#5a6952]" />
            </div>
            <div className="flex flex-col gap-[2px] items-start shrink-0 flex-1">
              <h4 className="font-bold text-[14px] leading-[20px] text-[#181d17] text-right w-full">
                عمليات التنفيذ السابقة لن تتأثر
              </h4>
              <p className="font-normal text-[13px] leading-[20px] text-[#454840] text-right w-full">
                السجلات التاريخية وإحصائيات التسليم السابقة لـ 142 عملية منفذة ستبقى
                مؤرشفة بالكامل دون أي مساس بها أو تعديل في تقارير الاعتمادية.
              </p>
            </div>
          </div>

          {/* Planned Audit Trail Logging Preview */}
          <div className="bg-[rgba(229,234,224,0.6)] flex gap-[8px] items-center p-[8px] rounded-[8px] shrink-0 w-full">
            <AuditStampIcon className="size-[14px] text-[#454840] shrink-0" />
            <p className="font-medium text-[11px] leading-[13.75px] text-[#454840] text-right flex-1">
              سيتم تدوين الإجراء في سجل التدقيق:{" "}
              <span className="text-[#181d17]">
                «تم إيقاف قاعدة الأتمتة بواسطة مدير المنصة (محمد أحمد)»
              </span>{" "}
              مع الختم الزمني المشفر.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-[8px] shrink-0 w-full">
          <div className="bg-[#f1f5eb] flex gap-[16px] items-center justify-start px-[36px] py-[24px] shrink-0 w-full rounded-b-[16px]">
            {/* Button - Confirm Deactivate Action */}
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-[#34422a] hover:bg-[#283320] text-white flex gap-[8px] h-[44px] items-center px-[36px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
            >
              <PauseIcon className="size-[10.5px] text-white" />
              <span className="font-semibold text-[14px] leading-[20px] text-white">
                إيقاف القاعدة
              </span>
            </button>

            {/* Button - Safe Dismissal Action */}
            <button
              type="button"
              onClick={onClose}
              className="bg-white hover:bg-[#e4ebdc] text-[#181d17] flex h-[44px] items-center justify-center px-[36px] rounded-[12px] transition-colors cursor-pointer"
            >
              <span className="font-semibold text-[14px] leading-[20px] text-[#181d17]">
                إلغاء
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
