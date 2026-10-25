"use client";

import React from "react";
import { AutomationRule } from "../../../types";
import {
  CloseCircleIcon,
  PauseMiniIcon,
  LightningIcon,
  ShieldCheckIcon,
  ClipboardCheckIcon,
  PlayCircleActionIcon,
} from "./modal-icons";

interface ActivateRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rule?: AutomationRule | null;
}

export function ActivateRuleModal({
  isOpen,
  onClose,
  onConfirm,
  rule,
}: ActivateRuleModalProps) {
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
        className="bg-white flex flex-col items-start overflow-hidden relative rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(30,40,26,0.22),0px_8px_16px_-4px_rgba(30,40,26,0.08)] w-full max-w-[560px] animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        data-node-id="1:23019"
        data-name="إعادة تفعيل قاعدة الأتمتة؟"
      >
        {/* Top Decorative Architectural Line */}
        <div className="h-[6px] shrink-0 w-full" />

        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-[20px] top-[20px] size-[32px] rounded-full bg-[#ebefe6] hover:bg-[#dfe4db] flex items-center justify-center text-[#454840] transition-colors cursor-pointer z-10"
          aria-label="إغلاق النافذة"
        >
          <CloseCircleIcon className="size-[10.5px]" />
        </button>

        {/* Modal Body Content */}
        <div className="flex flex-col gap-[24px] items-start p-[24px] shrink-0 w-full">
          {/* Header Block */}
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-[20px] leading-[25px] text-[#181d17] tracking-[-0.5px] text-right">
              إعادة تفعيل قاعدة الأتمتة؟
            </h2>
          </div>

          {/* Target Rule Detail Card */}
          <div className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[8px] items-start p-[16px] rounded-[16px] shrink-0 w-full">
            {/* Card Header Row */}
            <div className="border-[#dfe4db] border-b pb-[9px] flex items-center justify-between shrink-0 w-full">
              {/* Rule Title & Code */}
              <div className="flex gap-[8px] items-center shrink-0">
                <LightningIcon className="size-[16.67px] text-[#34422A] shrink-0" />
                <span className="font-bold text-[14px] leading-[20px] text-[#181d17] text-right">
                  {rule.title || "طلب تقييم النزيل بعد الإقامة"}
                </span>
                <span className="bg-[#dfe4db] px-[8px] py-[2px] rounded-[6px] font-bold text-[11px] leading-[16px] text-[#454840] text-right">
                  #{rule.ruleCode || "AUT-108"}
                </span>
              </div>

              {/* Inactive Status Badge */}
              <div className="bg-[#dfe4db] rounded-full px-[10px] py-[4px] flex items-center gap-[6px] shrink-0">
                <PauseMiniIcon className="size-[7.58px] text-[#454840]" />
                <span className="font-semibold text-[11px] leading-[16px] text-[#454840] text-right">
                  متوقفة
                </span>
              </div>
            </div>

            {/* Structured Telemetry Spec Grid (3 Columns) */}
            <div className="grid grid-cols-3 gap-[10px] pt-[4px] shrink-0 w-full">
              {/* Column 1: Approved Trigger */}
              <div className="bg-[rgba(255,255,255,0.8)] flex flex-col items-start p-[10px] rounded-[12px] min-w-0">
                <span className="font-medium text-[11px] leading-[16px] text-[#75786f] text-right w-full">
                  المحفز المعتمد
                </span>
                <span className="font-bold text-[13px] leading-[20px] text-[#181d17] text-right w-full mt-[2px] truncate">
                  {rule.triggerLabel || "بعد المغادرة بساعتين"}
                </span>
              </div>

              {/* Column 2: Action Performed */}
              <div className="bg-[rgba(255,255,255,0.8)] flex flex-col items-start p-[10px] rounded-[12px] min-w-0">
                <span className="font-medium text-[11px] leading-[16px] text-[#75786f] text-right w-full">
                  الإجراء المنفذ
                </span>
                <span className="font-bold text-[13px] leading-[20px] text-[#181d17] text-right w-full mt-[2px] truncate">
                  {rule.actionSummary || "رابط عبر WhatsApp"}
                </span>
              </div>

              {/* Column 3: Target Scope */}
              <div className="bg-[rgba(255,255,255,0.8)] flex flex-col items-start p-[10px] rounded-[12px] min-w-0">
                <span className="font-medium text-[11px] leading-[16px] text-[#75786f] text-right w-full">
                  النطاق المستهدف
                </span>
                <span className="font-bold text-[13px] leading-[20px] text-[#181d17] text-right w-full mt-[2px] truncate">
                  {rule.scope || "عمارة النخيل"}
                </span>
              </div>
            </div>
          </div>

          {/* Explanatory Narrative */}
          <div className="flex flex-col gap-[5.06px] items-start shrink-0 w-full">
            <h4 className="font-bold text-[14px] leading-[20px] text-[#181d17] text-right w-full">
              سيتم تشغيل القاعدة تلقائيًا عند تحقق شروطها.
            </h4>
            <p className="font-normal text-[13px] leading-[21.13px] text-[#454840] text-right w-full">
              فور استئناف التفعيل، سيبدأ محرك الأتمتة بفحص كافة الحجوزات والمغادرات القادمة وتطبيق
              المعايير المعتمدة دون الحاجة لتدخل يدوي من فريق العمليات.
            </p>
          </div>

          {/* Governance, Audit & Safety Notice */}
          <div className="bg-[rgba(216,232,203,0.35)] flex flex-col p-[16px] rounded-[16px] shrink-0 w-full">
            <div className="flex gap-[8px] items-center shrink-0 w-full">
              <ShieldCheckIcon className="size-[16.67px] text-[#34422A] shrink-0" />
              <h4 className="font-bold text-[14px] leading-[20px] text-[#34422a] text-right">
                جاهزية فورية للتشغيل وحماية خصوصية النزيل
              </h4>
            </div>

            <p className="font-normal text-[13px] leading-[21.13px] text-[#181d17] text-right mt-[9px] w-full">
              لن يتم تكرار الإرسال للحجوزات التي غادرت أثناء فترة التوقف السابقة تجنباً لإزعاج النزلاء، وستبدأ
              القاعدة بالعمل على الأحداث المؤهلة القادمة فقط.
            </p>

            <div className="border-t border-[rgba(75,89,64,0.2)] flex gap-[8px] items-start pt-[9px] mt-[10px] w-full">
              <ClipboardCheckIcon className="size-[15.33px] text-[#75786F] shrink-0 mt-[1px]" />
              <p className="font-medium text-[11px] leading-[16.5px] text-[#454840] text-right flex-1">
                تدوين أمني فوري: «تمت إعادة تفعيل قاعدة الأتمتة بواسطة مدير المنصة (
                <span className="font-semibold text-[#181d17]">محمد أحمد</span>
                )». وتحديث الحالة إلى «مفعلة» لحظياً.
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-[8px] shrink-0 w-full">
          <div className="bg-[#f1f5eb] flex gap-[16px] items-center justify-start px-[36px] py-[24px] shrink-0 w-full rounded-b-[16px]">
            {/* Button - Confirm Activate Action */}
            <button
              type="button"
              onClick={handleConfirm}
              className="bg-[#34422a] hover:bg-[#283320] text-white flex gap-[8px] h-[44px] items-center px-[36px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
            >
              <PlayCircleActionIcon className="size-[16.67px] text-white" />
              <span className="font-semibold text-[14px] leading-[20px] text-white">
                إعادة التفعيل
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
