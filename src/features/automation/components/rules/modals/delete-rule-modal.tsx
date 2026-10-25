"use client";

import React, { useState } from "react";
import { AutomationRule } from "../../../types";
import {
  CloseIcon,
  ClockTriggerIcon,
  ShieldCheckIcon,
  WarningTriangleIcon,
  TrashActionIcon,
} from "./modal-icons";

interface DeleteRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rule?: AutomationRule | null;
}

export function DeleteRuleModal({
  isOpen,
  onClose,
  onConfirm,
  rule,
}: DeleteRuleModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen || !rule) return null;

  const handleDelete = () => {
    if (!confirmed) return;
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
        data-node-id="1:23093"
        data-name="حذف قاعدة الأتمتة؟"
      >
        {/* Top Section: Title & Close Button */}
        <div className="flex items-start justify-between pb-[16px] pt-[36px] px-[36px] shrink-0 w-full">
          {/* Heading 2 */}
          <h2 className="font-semibold text-[24px] leading-[34px] tracking-[-0.6px] text-[#181d17] text-right">
            حذف قاعدة الأتمتة؟
          </h2>

          {/* Button - إغلاق النافذة */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-[8px] shrink-0 size-[32px] text-[#75786f] hover:bg-[#ebefe6] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <CloseIcon className="size-[11.67px]" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="flex flex-col gap-[16px] items-start px-[36px] py-[8px] shrink-0 w-full">
          {/* Target Rule Summary Card */}
          <div className="bg-[#f1f5eb] flex flex-col gap-[4px] items-start p-[16px] rounded-[12px] shrink-0 w-full">
            <div className="flex items-center justify-between shrink-0 w-full">
              {/* Rule Title & Code */}
              <div className="flex gap-[8px] items-center shrink-0">
                <span className="font-semibold text-[14px] leading-[20px] text-[#181d17] text-right">
                  {rule.title || "إرسال تفاصيل الوصول وموقع الوحدة"}
                </span>
                <span className="bg-[#e5eae0] rounded-[9999px] px-[8px] py-[2px] font-normal text-[11px] leading-[16px] text-[#454840] tracking-[0.55px] text-right">
                  #{rule.ruleCode || "AUT-102"}
                </span>
              </div>

              {/* Status Badge: متوقفة مؤقتاً */}
              <div className="bg-[#dfe4db] flex gap-[6px] items-center px-[10px] py-[2px] rounded-[9999px] shrink-0">
                <div className="bg-[#75786f] rounded-[9999px] shrink-0 size-[6px]" />
                <span className="font-medium text-[11px] leading-[16px] text-[#75786f] text-right">
                  متوقفة مؤقتاً
                </span>
              </div>
            </div>

            {/* Trigger & Scope Details */}
            <div className="flex gap-[4px] items-center pt-[4px] shrink-0 w-full flex-wrap text-[13px] leading-[20px]">
              <div className="flex items-center gap-[4px] shrink-0">
                <ClockTriggerIcon className="size-[13.33px] text-[#34422A] shrink-0" />
                <span className="font-medium text-[#181d17]">المحفز:</span>
                <span className="font-normal text-[#454840]">
                  {rule.triggerLabel || "قبل موعد الوصول بـ 24 ساعة"}
                </span>
              </div>

              <span className="text-[#75786f] px-[4px]">•</span>

              <div className="flex items-center gap-[4px] shrink-0">
                <span className="font-medium text-[#181d17]">النطاق:</span>
                <span className="font-normal text-[#454840]">
                  {rule.scope || "جميع العقارات (18 عقاراً • 142 وحدة)"}
                </span>
              </div>
            </div>
          </div>

          {/* Core Contextual Subtext */}
          <div className="flex flex-col items-end shrink-0 w-full">
            <p className="font-normal text-[14px] leading-[22.75px] text-[#454840] text-right w-full">
              لن يتم حذف سجلات التنفيذ السابقة، ولكن لن يمكن تشغيل هذه القاعدة مرة أخرى عبر
              البوابات الذكية أو نظام إدارة النزلاء.
            </p>
          </div>

          {/* Governance & Historical Retention Notice */}
          <div className="bg-[rgba(229,234,224,0.6)] flex gap-[8px] items-start p-[16px] rounded-[12px] shrink-0 w-full">
            <div className="bg-[#dfe4db] flex items-center justify-center rounded-[8px] shrink-0 size-[28px] mt-[1px]">
              <ShieldCheckIcon className="size-[15px] text-[#34422A]" />
            </div>
            <div className="flex flex-col gap-[2px] items-start shrink-0 flex-1">
              <h4 className="font-semibold text-[12px] leading-[18px] text-[#34422a] text-right w-full">
                حفظ وأرشفة السجلات التاريخية
              </h4>
              <p className="font-normal text-[13px] leading-[21.13px] text-[#454840] text-right w-full mt-[2px]">
                ستبقى السجلات التاريخية وإحصائيات التسليم السابقة لـ{" "}
                <span className="font-semibold text-[#181d17]">142 عملية منفذة</span>{" "}
                محفوظة في الأرشيف غير القابل للتعديل لأغراض الحوكمة والتدقيق الأمني.
              </p>
            </div>
          </div>

          {/* Destructive Impact Warning */}
          <div className="bg-[rgba(255,218,214,0.4)] flex gap-[8px] items-start p-[16px] rounded-[12px] shrink-0 w-full">
            <div className="bg-[#ffdad6] flex items-center justify-center rounded-[8px] shrink-0 size-[28px] mt-[1px]">
              <WarningTriangleIcon className="size-[16.5px] text-[#BA1A1A]" />
            </div>
            <div className="flex flex-col gap-[1px] items-start shrink-0 flex-1">
              <h4 className="font-semibold text-[12px] leading-[18px] text-[#ba1a1a] text-right w-full">
                تحذير أمني تشغيلي
              </h4>
              <p className="font-normal text-[13px] leading-[21.13px] text-[#93000a] text-right w-full mt-[2px]">
                هذا الإجراء لا يمكن التراجع عنه. فور تأكيد الحذف، سيتم إيقاف كافة الجدولة
                المستقبلية فوراً وإلغاء ارتباط مفاتيح الوصول الرقمية المعلقة.
              </p>
            </div>
          </div>

          {/* Label - Audit Trail Verification Check */}
          <label className="flex items-center gap-[10px] cursor-pointer shrink-0 w-full py-[4px]">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="size-[14px] rounded-[2.5px] border border-[#767676] text-[#dc8c8c] focus:ring-[#dc8c8c] cursor-pointer"
            />
            <span className="font-medium text-[11px] leading-[16.5px] text-[#454840] text-right flex-1 select-none">
              أؤكد علمي بتدوين عملية الحذف في سجل التدقيق الإداري العام باسم{" "}
              <span className="font-semibold text-[#181d17]">
                محمد أحمد (مدير المنصة)
              </span>{" "}
              مع الختم الزمني المشفر.
            </span>
          </label>
        </div>

        {/* Action Footer */}
        <div className="pt-[8px] shrink-0 w-full">
          <div className="bg-[#f1f5eb] flex gap-[16px] items-center justify-start px-[36px] py-[24px] shrink-0 w-full rounded-b-[16px]">
            {/* Button - Confirm Delete Action */}
            <button
              type="button"
              disabled={!confirmed}
              onClick={handleDelete}
              className={`flex gap-[8px] h-[44px] items-center px-[36px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors ${
                confirmed
                  ? "bg-[#dc8c8c] hover:bg-[#cf7b7b] text-white cursor-pointer"
                  : "bg-[#e5eae0] text-[#a0a59c] cursor-not-allowed opacity-70"
              }`}
            >
              <TrashActionIcon className="size-[13.5px] text-current" />
              <span className="font-semibold text-[14px] leading-[20px]">
                تأكيد حذف القاعدة
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
