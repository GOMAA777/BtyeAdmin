"use client";

import React, { useState } from "react";
import {
  X,
  KeyRound,
  ArrowLeftRight,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Building2,
  DoorClosed,
  Check,
  CheckCircle2,
  Hash,
} from "lucide-react";

interface ChangeAccessCodeMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ChangeAccessCodeMethodModal({
  isOpen,
  onClose,
  onConfirm,
}: ChangeAccessCodeMethodModalProps) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isAcknowledged) return;
    onConfirm();
    setIsAcknowledged(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white w-full max-w-[620px] rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200"
        data-node-id="1:31945"
        data-name="تغيير طريقة أكواد الدخول"
      >
        {/* Top Accent Bar: Discreet Olive Operational Signal */}
        <div
          className="bg-[#54624c] h-[6px] w-full shrink-0"
          data-node-id="1:31946"
        />

        {/* Modal Header */}
        <div
          className="p-6 pb-4 flex items-center justify-between"
          data-node-id="1:31948"
        >
          {/* Close button (top-left in RTL) */}
          <button
            type="button"
            onClick={onClose}
            className="bg-[#ebefe6] rounded-[12px] size-[36px] flex items-center justify-center text-[#181d17] hover:bg-[#dfe5d9] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
            data-node-id="1:31949"
          >
            <X className="size-4" />
          </button>

          {/* Title & Emblem Badge (top-right in RTL) */}
          <div className="flex items-center gap-3" data-node-id="1:31952">
            <div className="flex flex-col text-right">
              <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[28px]">
                تغيير طريقة أكواد الدخول
              </h2>
            </div>
            <div
              className="bg-[#d8e8cb] rounded-[16px] size-[48px] flex items-center justify-center text-[#34422a] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shrink-0"
              data-node-id="1:31958"
            >
              <KeyRound className="size-6" />
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div
          className="p-6 pt-0 flex flex-col gap-4"
          data-node-id="1:31947"
        >
          {/* Comparison Cards: Current Method vs New Requested Protocol */}
          <div
            className="relative flex flex-col sm:flex-row gap-3 items-stretch w-full"
            data-node-id="1:31961"
          >
            {/* 1. New Requested Method Card (Left in RTL layout) */}
            <div
              className="bg-[rgba(216,232,203,0.3)] border border-[#d8e8cb] rounded-[16px] p-4 flex flex-col justify-between gap-3 flex-1 text-right order-2 sm:order-1"
              data-node-id="1:31962"
            >
              <div className="flex items-center justify-between">
                <span className="bg-[#d8e8cb] text-[#5a6952] text-[11px] font-bold px-2 py-0.5 rounded-full font-cairo">
                  تغيير جوهري
                </span>
                <span className="text-[#54624c] text-[11px] font-semibold tracking-[0.55px] uppercase font-cairo">
                  الطريقة الجديدة المطلوبة
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                    كود ثابت
                  </span>
                  <Hash className="size-4 text-[#181d17]" />
                </div>
                <p className="font-cairo font-normal text-[#181d17] text-[13px] leading-[21px]">
                  كود رئيسي ثابت مخصص لكل وحدة يتطلب إعادة تدوير يدوي مجدول دورياً.
                </p>
              </div>

              <div className="flex items-center gap-1.5 justify-end pt-1">
                <span className="font-cairo font-medium text-[#34422a] text-[11px]">
                  يتطلب حوكمة يدوية
                </span>
                <ShieldCheck className="size-3.5 text-[#34422a]" />
              </div>
            </div>

            {/* Floating Center Transition Circle (Arrow pointing to new method) */}
            <div
              className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white size-8 rounded-full shadow-md border border-[#e5eae0] items-center justify-center text-[#34422a] z-10"
              data-node-id="1:31981"
            >
              <ArrowLeft className="size-3.5" />
            </div>

            {/* 2. Current Method Card (Right in RTL layout) */}
            <div
              className="bg-[#f1f5eb] rounded-[16px] p-4 flex flex-col justify-between gap-3 flex-1 text-right order-1 sm:order-2"
              data-node-id="1:31985"
            >
              <div className="flex items-center justify-between">
                <span className="bg-[#e5eae0] text-[#454840] text-[11px] font-semibold px-2 py-0.5 rounded-full font-cairo">
                  المعيار النشط حالياً
                </span>
                <span className="text-[#454840] text-[11px] font-medium tracking-[0.55px] uppercase font-cairo">
                  الطريقة الحالية
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="font-cairo font-bold text-[#34422a] text-[18px] leading-[28px]">
                    كود لكل حجز
                  </span>
                  <ArrowLeftRight className="size-4 text-[#34422a]" />
                </div>
                <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[21px]">
                  يتم إنشاء كود مؤقت تلقائي لكل حجز ينتهي بمغادرة الضيف فوراً.
                </p>
              </div>

              <div className="flex items-center gap-1.5 justify-end pt-1">
                <span className="font-cairo font-medium text-[#54624c] text-[11px]">
                  أمان تلقائي دوري
                </span>
                <CheckCircle2 className="size-3.5 text-[#54624c]" />
              </div>
            </div>
          </div>

          {/* Prominent Operational Warning Box */}
          <div
            className="bg-[rgba(216,232,203,0.4)] border border-[#d8e8cb] rounded-[16px] p-4 flex items-start gap-3.5 text-right"
            data-node-id="1:32004"
          >
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                تنبيه تشغيلي وأمني هام
              </h3>
              <p className="font-cairo font-normal text-[#181d17] text-[13px] leading-[21px]">
                قد يؤثر هذا التغيير على طريقة إدارة أكواد الدخول في الوحدات الحالية. سيتم تطبيق الكود
                الثابت على الحجوزات والوحدات الجديدة، مع ضرورة مراجعة صلاحيات الأقفال المتصلة
                لضمان عدم حدوث تعارض وصول.
              </p>
            </div>
            <div
              className="bg-[#d8e8cb] rounded-[12px] size-8 flex items-center justify-center text-[#34422a] shrink-0 mt-0.5"
              data-node-id="1:32011"
            >
              <AlertTriangle className="size-4.5" />
            </div>
          </div>

          {/* Affected Units Counter & Operational Scope Matrix */}
          <div
            className="bg-[#f1f5eb] rounded-[16px] p-4 flex flex-col gap-3 text-right"
            data-node-id="1:32014"
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-cairo font-medium text-[#34422a] text-[11px]">
                  تحديث متسلسل للبروتوكول
                </span>
                <span className="size-2 rounded-full bg-[#34422a]" />
              </div>
              <span className="font-cairo font-semibold text-[#454840] text-[12px]">
                نطاق تأثير التعديل على البنية السحابية
              </span>
            </div>

            {/* 2 Stat boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Stat 1: Units */}
              <div
                className="bg-white rounded-[12px] p-3 flex items-center justify-between drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                data-node-id="1:32031"
              >
                <div className="bg-[#ebefe6] size-9 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                  <DoorClosed className="size-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[18px] leading-[26px]">
                    11,290 وحدة
                  </span>
                  <span className="font-cairo font-medium text-[#454840] text-[11px]">
                    أقفال ذكية متصلة سحابياً
                  </span>
                </div>
              </div>

              {/* Stat 2: Properties */}
              <div
                className="bg-white rounded-[12px] p-3 flex items-center justify-between drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                data-node-id="1:32022"
              >
                <div className="bg-[#ebefe6] size-9 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                  <Building2 className="size-5" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[18px] leading-[26px]">
                    1,482 عقاراً
                  </span>
                  <span className="font-cairo font-medium text-[#454840] text-[11px]">
                    مجمع وأبراج تابعة للمنصة
                  </span>
                </div>
              </div>
            </div>

            {/* Active bookings note */}
            <div className="flex items-center gap-1.5 pt-1 text-[#454840] text-[11px] font-medium justify-end">
              <span>
                الحجوزات النشطة الجارية: لن تتأثر الحجوزات المؤكدة الحالية وستبقى أكوادها سارية حتى المغادرة.
              </span>
              <ShieldCheck className="size-3.5 text-[#34422a] shrink-0" />
            </div>
          </div>

          {/* Governance Checkbox Confirmation */}
          <label
            onClick={() => setIsAcknowledged((prev) => !prev)}
            className="flex items-start gap-2.5 cursor-pointer select-none text-right px-1 pt-1"
            data-node-id="1:32045"
          >
            <span className="font-cairo font-normal text-[#181d17] text-[13px] leading-[21px] flex-1">
              أقر بمسؤولية هذا التغيير وتأثيره على سياسات تشغيل أقفال الوحدات في المنصة وإبلاغ مديري الممتلكات المعنيين.
            </span>
            <div
              className={`size-5 rounded-[6px] border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                isAcknowledged
                  ? "bg-[#34422a] border-[#34422a] text-white"
                  : "bg-white border-[#c5c8bd] text-transparent hover:border-[#34422a]"
              }`}
            >
              <Check className="size-3.5 stroke-[3]" />
            </div>
          </label>
        </div>

        {/* Footer Action Buttons */}
        <div
          className="bg-[#f1f5eb] p-4 px-6 flex items-center justify-between sm:justify-start gap-3 w-full border-t border-[#e5eae0]"
          data-node-id="1:32052"
        >
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isAcknowledged}
            className="bg-[#34422a] hover:bg-[#273220] text-white font-cairo font-semibold text-[14px] px-6 py-2.5 rounded-[12px] flex items-center gap-2 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            data-node-id="1:32053"
          >
            <span>تأكيد التغيير وتطبيق البروتوكول</span>
            <ShieldCheck className="size-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-[#f8faf6] text-[#181d17] font-cairo font-semibold text-[14px] px-6 py-2.5 rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] transition-colors cursor-pointer"
            data-node-id="1:32059"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
