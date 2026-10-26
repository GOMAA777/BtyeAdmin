"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
  Users2,
  CheckCircle2,
  Check,
} from "lucide-react";

interface ConfirmPlatformSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  settingTitle?: string;
  impactedCount?: string;
}

export function ConfirmPlatformSettingModal({
  isOpen,
  onClose,
  onConfirm,
  settingTitle = "السماح لأصحاب العقارات بإضافة عقارات",
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white w-full max-w-[560px] rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-6 overflow-hidden flex flex-col gap-6 animate-in zoom-in-95 duration-200"
        data-node-id="1:30335"
        data-name="تأكيد تغيير إعداد المنصة"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex gap-3 items-center">
            <div className="bg-[rgba(216,232,203,0.6)] size-12 rounded-[12px] flex items-center justify-center text-[#34422a] shadow-sm">
              <ShieldCheck className="size-6" />
            </div>
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[25px]">
              تأكيد تغيير إعداد المنصة
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] size-8 flex items-center justify-center hover:bg-[#f1f5eb] text-[#75786f] hover:text-[#181d17] transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Warning Scope Notification Banner */}
        <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex gap-3 items-start">
          <AlertTriangle className="size-5 text-[#854d0e] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <p className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
              سيؤثر هذا التغيير على جميع أصحاب العقارات على المنصة.
            </p>
            <p className="font-cairo text-[#454840] text-[13px] leading-[21.13px]">
              سيتم تطبيق القاعدة فوراً على كافة الملاك النشطين وغير المشرفين، ولن يتمكن أي
              مالك من تسجيل أو إدراج عقار جديد مباشرة دون رفع طلب رسمي للمشرف للاعتماد.
            </p>
          </div>
        </div>

        {/* Setting Impact & Comparison Ledger Card */}
        <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col gap-4">
          {/* Target Setting Meta */}
          <div className="bg-white/70 rounded-[8px] p-3 flex flex-col gap-0.5">
            <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
              الإعداد المستهدف:
            </span>
            <p className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
              {settingTitle}
            </p>
          </div>

          {/* Comparative Before / After Grid */}
          <div className="flex gap-3 items-center">
            {/* Future Value */}
            <div className="bg-white rounded-[12px] p-3 flex flex-col items-end gap-1.5 flex-1">
              <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                الحالة بعد التغيير
              </span>
              <div className="bg-[#ffdad6] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="font-cairo font-semibold text-[#93000a] text-[12px] leading-[18px]">
                  غير مفعّل
                </span>
                <span className="bg-[#ba1a1a] rounded-full size-1.5" />
              </div>
            </div>

            {/* Transition Icon */}
            <div className="bg-[#dfe4db] size-8 rounded-full flex items-center justify-center text-[#454840] shrink-0">
              <ArrowLeft className="size-3.5" />
            </div>

            {/* Current Value */}
            <div className="bg-white rounded-[12px] p-3 flex flex-col items-end gap-1.5 flex-1">
              <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                الحالة الحالية
              </span>
              <div className="bg-[#d8e8cb] px-2.5 py-1 rounded-full flex items-center gap-1.5">
                <span className="font-cairo font-semibold text-[#5a6952] text-[12px] leading-[18px]">
                  مفعّل
                </span>
                <span className="bg-[#4b5940] rounded-full size-1.5" />
              </div>
            </div>
          </div>

          {/* Verified Direct Impact Metrics */}
          <div className="flex items-center justify-between pt-1 px-1">
            <span className="font-cairo font-bold text-[#34422a] text-[14px]">
              {impactedCount}
            </span>
            <div className="flex gap-2 items-center text-[#75786f]">
              <span className="font-cairo font-medium text-[11px]">
                عدد حسابات الملاك المتأثرة فوراً:
              </span>
              <Users2 className="size-4 text-[#75786f]" />
            </div>
          </div>
        </div>

        {/* Required Security Checkbox Confirmation */}
        <label
          onClick={() => setIsChecked(!isChecked)}
          className="bg-[#f1f5eb] rounded-[12px] p-4 flex gap-3 items-start cursor-pointer select-none hover:bg-[#eaf0e3] transition-colors"
        >
          <div
            className={`size-5 rounded-[6px] border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              isChecked
                ? "bg-[#34422a] border-[#34422a] text-white"
                : "bg-white border-[#c5c8bd] shadow-sm"
            }`}
          >
            {isChecked && <Check className="size-3.5 stroke-[3]" />}
          </div>
          <div className="flex flex-col gap-0.5 text-right">
            <p className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]">
              أفهم أن هذا الإعداد يؤثر على مستوى المنصة بشكل كامل وفوري.
            </p>
            <p className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
              إقرار إداري ملزم يُسجل في سجل التدقيق الأمني المشفّر (Audit Log WORM) باسم المشرف
              الحالي.
            </p>
          </div>
        </label>

        {/* Action Buttons & Telemetry */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <button
              type="button"
              onClick={handleConfirmAction}
              disabled={!isChecked}
              className={`flex-1 h-12 rounded-[12px] font-cairo font-bold text-[14px] text-white flex items-center justify-center gap-2 drop-shadow-sm transition-all ${
                isChecked
                  ? "bg-[#4b5940] hover:bg-[#3e4a35] cursor-pointer"
                  : "bg-[#4b5940] opacity-40 cursor-not-allowed"
              }`}
            >
              <span>تأكيد التغيير</span>
              <CheckCircle2 className="size-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white px-6 h-12 rounded-[12px] font-cairo font-semibold text-[#75786f] text-[14px] border border-[#e5eae0] hover:bg-slate-50 transition-colors"
            >
              إلغاء
            </button>
          </div>

          <div className="flex items-center gap-1.5 pt-1 px-1">
            <span className="bg-[#34422a] rounded-full size-1.5" />
            <span className="font-cairo font-medium text-[#34422a] text-[11px]">
              جلسة المشرف (محمد أحمد) موثقة بنجاح
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
