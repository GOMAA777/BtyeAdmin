"use client";

import { useState } from "react";
import {
  X,
  RotateCcw,
  Building2,
  AlertCircle,
  GitBranch,
  ShieldCheck,
} from "lucide-react";
import { ExecutionLog } from "../../../types";

interface RetryExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  log?: ExecutionLog | null;
}

export function RetryExecutionModal({
  isOpen,
  onClose,
  onConfirm,
  log,
}: RetryExecutionModalProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  if (!isOpen) return null;

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      onConfirm();
    }, 600);
  };

  const ruleId = log?.ruleId || "RUL-884";
  const ruleName = log?.ruleName || "تذكير بالمغادرة وإرشادات تسليم المفتاح";
  const guestName = log?.guestName || "خالد العمري";
  const guestPhone = log?.guestPhone || "+966 55 *** 9412";
  const bookingId = log?.bookingId || "BK-10481";
  const propertyName = log?.propertyName || "فلل حطين";
  const unitName = log?.unitName || "فيلا 108";
  const logCode = log?.logCode || "#EX-8488";
  const timeStr = log?.time || "10:15:02 ص";
  const dateStr = log?.date || "18 سبتمبر 2026";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-cairo"
      dir="rtl"
    >
      <div
        className="bg-white rounded-[16px] w-full max-w-[560px] overflow-hidden shadow-[0px_24px_48px_-12px_rgba(24,29,23,0.18),0px_8px_20px_-4px_rgba(24,29,23,0.08)] border border-[#e5eae0] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        data-node-id="1:26061"
      >
        {/* Modal Header */}
        <div className="bg-white flex items-center justify-between px-[24px] pt-[24px] pb-[16px] w-full border-b border-[#f1f5eb]">
          <h2 className="font-bold text-[20px] text-[#181d17] tracking-[-0.5px] leading-[30px]">
            إعادة محاولة الإرسال؟
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="size-[32px] rounded-[8px] flex items-center justify-center text-[#75786f] hover:bg-[#f1f5eb] hover:text-[#181d17] transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="size-[16px]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-[16px] px-[24px] py-[16px] w-full">
          {/* Context & Failed Execution Details Card */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[14px] w-full border border-[#e5eae0]">
            {/* Top Row: Rule Badge & Title */}
            <div className="bg-[rgba(235,239,230,0.6)] flex items-center justify-between -mx-[16px] -mt-[16px] px-[16px] py-[12px] rounded-t-[12px] border-b border-[#e5eae0]">
              <div className="flex items-center gap-[8px]">
                <GitBranch className="size-[16px] text-[#4b5940]" />
                <span className="font-semibold text-[14px] text-[#181d17] leading-[20px]">
                  {ruleName}
                </span>
              </div>
              <span className="bg-[#dfe4db] text-[#454840] font-bold text-[12px] px-[8px] py-[2px] rounded-[6px] leading-[16px]">
                {ruleId}
              </span>
            </div>

            {/* Grid of Key Attributes */}
            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[12px] pt-[4px]">
              {/* Guest name & phone */}
              <div className="flex flex-col items-start">
                <span className="font-medium text-[11px] text-[#75786f] leading-[16px]">
                  اسم الضيف
                </span>
                <span className="font-medium text-[14px] text-[#181d17] leading-[20px] mt-[2px]">
                  {guestName}
                </span>
                <span className="font-normal text-[12px] text-[#75786f] leading-[16px]">
                  {guestPhone}
                </span>
              </div>

              {/* Booking reference */}
              <div className="flex flex-col items-start">
                <span className="font-medium text-[11px] text-[#75786f] leading-[16px]">
                  رقم الحجز المرجعي
                </span>
                <div className="flex items-center gap-[6px] mt-[2px]">
                  <span className="font-bold text-[14px] text-[#34422a] leading-[20px]">
                    {bookingId}
                  </span>
                  <span className="size-[6px] rounded-full bg-[#54624c]" />
                  <span className="font-normal text-[12px] text-[#454840] leading-[16px]">
                    مؤكد
                  </span>
                </div>
              </div>

              {/* Property & unit */}
              <div className="col-span-2 flex flex-col items-start pt-[4px] border-t border-[#e5eae0]/60">
                <span className="font-medium text-[11px] text-[#75786f] leading-[16px]">
                  العقار والوحدة المسجلة
                </span>
                <div className="flex items-center gap-[6px] mt-[2px]">
                  <Building2 className="size-[14px] text-[#454840]" />
                  <span className="font-medium text-[14px] text-[#181d17] leading-[22px]">
                    {propertyName}
                  </span>
                  <span className="font-normal text-[14px] text-[#75786f] leading-[22px]">
                    /
                  </span>
                  <span className="font-normal text-[14px] text-[#454840] leading-[22px]">
                    {unitName}
                  </span>
                </div>
              </div>
            </div>

            {/* Failure Detail Alert Box */}
            <div className="bg-[rgba(255,218,214,0.4)] rounded-[12px] p-[12px] flex flex-col gap-[6px] border border-[#ffdad6]">
              <div className="flex items-center gap-[8px]">
                <AlertCircle className="size-[15px] text-[#ba1a1a]" />
                <span className="font-bold text-[12px] text-[#ba1a1a] leading-[18px]">
                  سبب تعثر المحاولة السابقة:
                </span>
              </div>

              <div className="flex flex-col gap-[2px]">
                <p className="font-normal text-[13px] text-[#93000a] leading-[21px]">
                  تعذر تسليم الرسالة — خطأ في استجابة بوابة واتساب
                </p>
                <p className="font-bold text-[12px] text-[#93000a] leading-[16px]" dir="ltr">
                  (Meta Cloud API Error 131026: Message Undeliverable / خطأ شبكة مؤقت)
                </p>
              </div>

              <div className="flex items-center justify-between pt-[6px] border-t border-[#ffdad6]/60 text-[12px] text-[#75786f]">
                <span>وقت المحاولة: {dateStr} - {timeStr}</span>
                <span>معرف المحاولة: {logCode.replace("#", "")}</span>
              </div>
            </div>
          </div>

          {/* Explanatory Prompt & Safe Audit Assurance Box */}
          <div className="flex flex-col gap-[10px]">
            <p className="font-normal text-[14px] text-[#181d17] leading-[21px]">
              سيتم إعادة محاولة إرسال الرسالة باستخدام البيانات الحالية للحجز وتحديث مؤشرات التوصيل المباشرة.
            </p>

            <div className="bg-[rgba(229,234,224,0.6)] rounded-[12px] p-[12px] flex items-center justify-between gap-[12px] border border-[#e5eae0]">
              <p className="font-normal text-[13px] text-[#454840] leading-[21px] flex-1">
                سيتم إعادة محاولة إرسال الرسالة باستخدام البيانات الحالية للحجز وتحديث مؤشرات التوصيل المباشرة.
              </p>
              <div className="size-[32px] rounded-[8px] bg-[#dfe4db] flex items-center justify-center text-[#34422a] shrink-0">
                <ShieldCheck className="size-[16px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons Footer */}
        <div className="bg-[rgba(241,245,235,0.7)] px-[24px] py-[20px] flex items-center justify-between border-t border-[#e5eae0]">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white font-semibold text-[14px] h-[44px] px-[24px] rounded-[12px] inline-flex items-center gap-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer disabled:opacity-50"
          >
            <span>{isRetrying ? "جارٍ الإرسال..." : "إعادة المحاولة الآن"}</span>
            <RotateCcw className={`size-[15px] ${isRetrying ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-[#f6fbf1] text-[#454840] font-semibold text-[14px] h-[44px] px-[24px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] transition-colors cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
