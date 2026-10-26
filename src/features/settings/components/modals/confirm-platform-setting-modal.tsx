"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Users2,
  Check,
  CheckCircle2,
} from "lucide-react";

interface ConfirmPlatformSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  settingTitle?: string;
  currentStatusText?: string;
  newStatusText?: string;
  impactedCount?: string;
}

export function ConfirmPlatformSettingModal({
  isOpen,
  onClose,
  onConfirm,
  settingTitle = "السماح لأصحاب العقارات بإضافة عقارات",
  currentStatusText = "مفعّل",
  newStatusText = "غير مفعّل",
  impactedCount = "1,482 مالك عقار مسجل",
}: ConfirmPlatformSettingModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  const handleConfirmAction = () => {
    if (!isChecked) return;
    onConfirm();
    setIsChecked(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white w-full max-w-[560px] rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-[24px] overflow-hidden flex flex-col gap-[24px] animate-in zoom-in-95 duration-200 border border-[#e5eae0]"
        role="dialog"
        aria-modal="true"
        data-node-id="1:30335"
        data-name="تأكيد تغيير إعداد المنصة"
      >
        {/* 1. Modal Header (Figma 1:30336) */}
        <div className="flex items-center justify-between shrink-0 w-full" data-node-id="1:30336">
          <div className="flex items-center gap-[12px]" data-node-id="1:30340">
            <div
              className="bg-[rgba(216,232,203,0.6)] size-[48px] rounded-[12px] flex items-center justify-center text-[#34422a] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              data-node-id="1:30344"
            >
              <ShieldCheck className="size-6 text-[#34422a]" />
            </div>
            <h2
              className="font-cairo font-bold text-[#181d17] text-[20px] leading-[25px]"
              data-node-id="1:30343"
            >
              تأكيد تغيير إعداد المنصة
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-[32px] rounded-[8px] flex items-center justify-center text-[#75786f] hover:bg-[#f1f5eb] hover:text-[#181d17] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
            data-node-id="1:30337"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 2. Warning Scope Notification Banner (Figma 1:30347) */}
        <div
          className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex gap-[12px] items-start w-full border border-[#e0e7db]/60"
          data-node-id="1:30347"
        >
          <div className="pt-[2px] shrink-0" data-node-id="1:30353">
            <AlertTriangle className="size-5 text-[#181d17]" />
          </div>
          <div className="flex flex-col gap-[3px] flex-1 text-right" data-node-id="1:30348">
            <p
              className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]"
              data-node-id="1:30350"
            >
              سيؤثر هذا التغيير على جميع أصحاب العقارات على المنصة.
            </p>
            <p
              className="font-cairo font-normal text-[#454840] text-[13px] leading-[21px]"
              data-node-id="1:30352"
            >
              سيتم تطبيق القاعدة فوراً على كافة الملاك النشطين وغير المشرفين، ولن يتمكن أي مالك من تسجيل أو إدراج عقار جديد مباشرة دون رفع طلب رسمي للمشرف للاعتماد.
            </p>
          </div>
        </div>

        {/* 3. Setting Impact & Comparison Ledger Card (Figma 1:30356) */}
        <div
          className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[16px] w-full border border-[#e0e7db]/60"
          data-node-id="1:30356"
        >
          {/* Target Setting Meta (Figma 1:30357) */}
          <div
            className="bg-[rgba(255,255,255,0.75)] rounded-[8px] p-[12px] flex flex-col gap-[4px] text-right"
            data-node-id="1:30357"
          >
            <span
              className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]"
              data-node-id="1:30359"
            >
              الإعداد المستهدف:
            </span>
            <p
              className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]"
              data-node-id="1:30362"
            >
              {settingTitle}
            </p>
          </div>

          {/* Comparative Before / After Grid (Figma 1:30363) */}
          <div className="flex gap-[12px] items-center w-full" data-node-id="1:30363">
            {/* Current Value (RIGHT in RTL) (Figma 1:30374) */}
            <div
              className="bg-white rounded-[12px] p-[12px] flex flex-col items-end gap-[6px] flex-1 text-right shadow-2xs border border-[#e5eae0]"
              data-node-id="1:30374"
            >
              <span
                className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]"
                data-node-id="1:30376"
              >
                الحالة الحالية
              </span>
              <div
                className="bg-[#d8e8cb] px-[10px] py-[4px] rounded-full flex items-center gap-[6px]"
                data-node-id="1:30377"
              >
                <span
                  className="font-cairo font-semibold text-[#5a6952] text-[12px] leading-[18px]"
                  data-node-id="1:30379"
                >
                  {currentStatusText}
                </span>
                <span className="bg-[#4b5940] rounded-full size-[6px]" data-node-id="1:30380" />
              </div>
            </div>

            {/* Transition Arrow Vector (Figma 1:30371) */}
            <div
              className="bg-[#dfe4db] size-[32px] rounded-full flex items-center justify-center text-[#454840] shrink-0"
              data-node-id="1:30371"
            >
              <ArrowLeft className="size-[14px]" />
            </div>

            {/* Future Value (LEFT in RTL) (Figma 1:30364) */}
            <div
              className="bg-white rounded-[12px] p-[12px] flex flex-col items-end gap-[6px] flex-1 text-right shadow-2xs border border-[#e5eae0]"
              data-node-id="1:30364"
            >
              <span
                className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]"
                data-node-id="1:30366"
              >
                الحالة بعد التغيير
              </span>
              <div
                className="bg-[#ffdad6] px-[10px] py-[4px] rounded-full flex items-center gap-[6px]"
                data-node-id="1:30367"
              >
                <span
                  className="font-cairo font-semibold text-[#93000a] text-[12px] leading-[18px]"
                  data-node-id="1:30369"
                >
                  {newStatusText}
                </span>
                <span className="bg-[#ba1a1a] rounded-full size-[6px]" data-node-id="1:30370" />
              </div>
            </div>
          </div>

          {/* Verified Direct Impact Metrics (Figma 1:30381) */}
          <div
            className="flex items-center justify-between pt-[8px] px-[4px] w-full"
            data-node-id="1:30381"
          >
            <div className="flex items-center gap-[8px] text-[#75786f]" data-node-id="1:30384">
              <Users2 className="size-[16px] text-[#75786f]" />
              <span
                className="font-cairo font-medium text-[11px] text-[#75786f]"
                data-node-id="1:30386"
              >
                عدد حسابات الملاك المتأثرة فوراً:
              </span>
            </div>
            <span
              className="font-cairo font-bold text-[#34422a] text-[14px]"
              data-node-id="1:30383"
            >
              {impactedCount}
            </span>
          </div>
        </div>

        {/* 4. Required Security Checkbox Confirmation (Figma 1:30389) */}
        <label
          onClick={() => setIsChecked(!isChecked)}
          className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex items-start justify-between gap-[12px] cursor-pointer select-none hover:bg-[#eaf0e3] transition-colors border border-[#e0e7db]/60"
          data-node-id="1:30389"
        >
          <div className="flex flex-col gap-[2px] flex-1 text-right" data-node-id="1:30390">
            <p
              className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]"
              data-node-id="1:30392"
            >
              أفهم أن هذا الإعداد يؤثر على مستوى المنصة بشكل كامل وفوري.
            </p>
            <p
              className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]"
              data-node-id="1:30394"
            >
              إقرار إداري ملزم يُسجل في سجل التدقيق الأمني المشفّر (Audit Log WORM) باسم المشرف الحالي.
            </p>
          </div>

          <div className="pt-[2px] shrink-0" data-node-id="1:30395">
            <div
              className={`size-[20px] rounded-[6px] border flex items-center justify-center transition-all ${
                isChecked
                  ? "bg-[#4b5940] border-[#4b5940] text-white"
                  : "bg-white border-[#c5c8bd] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              }`}
              data-node-id="1:30397"
            >
              {isChecked && <Check className="size-3.5 stroke-[3]" />}
            </div>
          </div>
        </label>

        {/* 5. Action Buttons & Verification Hash (Figma 1:30398) */}
        <div className="flex flex-col gap-[12px] w-full" data-node-id="1:30398">
          <div className="flex items-center gap-[12px] w-full" data-node-id="1:30399">
            {/* Primary Confirm Action Button (RIGHT in RTL) (Figma 1:30402) */}
            <button
              type="button"
              onClick={handleConfirmAction}
              disabled={!isChecked}
              className={`flex-1 h-[48px] rounded-[12px] font-cairo font-bold text-[14px] text-white flex items-center justify-center gap-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all ${
                isChecked
                  ? "bg-[#4b5940] hover:bg-[#3d4b36] cursor-pointer"
                  : "bg-[#4b5940] opacity-40 cursor-not-allowed"
              }`}
              data-node-id="1:30402"
            >
              <CheckCircle2 className="size-[16px]" />
              <span>تأكيد التغيير</span>
            </button>

            {/* Cancel / Dismiss Action Button (LEFT in RTL) (Figma 1:30400) */}
            <button
              type="button"
              onClick={onClose}
              className="bg-white px-[24px] h-[48px] rounded-[12px] font-cairo font-semibold text-[#75786f] text-[14px] border border-[#e5eae0] hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
              data-node-id="1:30400"
            >
              إلغاء
            </button>
          </div>

          {/* Footnote System Telemetry (Figma 1:30407) */}
          <div
            className="flex items-center gap-[6px] pt-[4px] px-[4px] w-full text-right"
            data-node-id="1:30407"
          >
            <span className="bg-[#34422a] rounded-full size-[6px]" data-node-id="1:30411" />
            <span
              className="font-cairo font-medium text-[#34422a] text-[11px] leading-[16px]"
              data-node-id="1:30410"
            >
              جلسة المشرف (محمد أحمد) موثقة بنجاح
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
