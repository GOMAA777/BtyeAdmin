"use client";

import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  MessageSquare,
  BadgeCheck,
  Workflow,
  Info,
  Check,
  Unlink,
} from "lucide-react";

interface DisconnectWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  accountName?: string;
  phoneNumber?: string;
  wabaId?: string;
  provider?: string;
}

export function DisconnectWhatsAppModal({
  isOpen,
  onClose,
  onConfirm,
  accountName = "ابراج لإدارة العقارات الفندقية",
  phoneNumber = "+966 11 482 9000",
  wabaId = "WABA-948201948271032",
  provider = "Meta Cloud API (v20.0)",
}: DisconnectWhatsAppModalProps) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!isAcknowledged) return;
    onConfirm();
    setIsAcknowledged(false);
  };

  const affectedWorkflows = [
    {
      title: "إرسال تأكيد الحجوزات وإيصالات الدفع الفورية",
      category: "Bookings & Invoices",
    },
    {
      title: "إرسال أكواد الدخول الذكية للوحدات وتعليمات الوصول",
      category: "Smart Access PIN",
    },
    {
      title: "إشعارات مواعيد المغادرة وتذكير النزلاء المجدولة",
      category: "Checkout & Surveys",
    },
    {
      title: "بلاغات وتحديثات طلبات الصيانة الميدانية المباشرة",
      category: "Field Maintenance",
    },
    {
      title: "تأكيدات تمديد الإقامة والإشعارات الضريبية المرتبطة بـ (ZATCA)",
      category: "ZATCA Compliant",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white w-full max-w-[600px] rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] p-[36px] overflow-hidden flex flex-col gap-[24px] animate-in zoom-in-95 duration-200 border border-[#e5eae0] max-h-[95vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        data-node-id="1:33273"
        data-name="فصل اتصال"
      >
        {/* Modal Top Bar: Emblem, Title & Close Button (Figma 1:33275) */}
        <div className="flex items-center justify-between shrink-0 w-full" data-node-id="1:33275">
          <div className="flex items-center gap-[16px]" data-node-id="1:33279">
            <div
              className="bg-[rgba(255,218,214,0.6)] size-[48px] rounded-[16px] flex items-center justify-center text-[#ba1a1a] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0"
              data-node-id="1:33286"
              data-name="Disconnect Emblem"
            >
              <Unlink className="size-[22px] text-[#ba1a1a]" />
            </div>
            <div className="flex items-center gap-[8px]" data-node-id="1:33281">
              <h2
                className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px] tracking-[-0.5px]"
                data-node-id="1:33285"
              >
                فصل اتصال WhatsApp؟
              </h2>
              <span
                className="bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-cairo font-bold px-[8px] py-[2px] rounded-full leading-[16px]"
                data-node-id="1:33282"
              >
                إجراء حساس
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-[#ebefe6] hover:bg-[#dde4d6] text-[#181d17] size-[36px] rounded-[12px] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="إغلاق النافذة"
            data-node-id="1:33276"
          >
            <X className="size-[14px]" />
          </button>
        </div>

        {/* Connected Account Identity Panel (Figma 1:33289) */}
        <div
          className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[12px] shrink-0 w-full"
          data-node-id="1:33289"
          data-name="Connected Account Identity Panel"
        >
          <div className="flex items-center justify-between pb-[8px] w-full" data-node-id="1:33290">
            <span
              className="font-cairo font-semibold text-[#75786f] text-[12px] leading-[18px]"
              data-node-id="1:33295"
            >
              الحساب المتصل حالياً
            </span>
            <div
              className="bg-[#d8e8cb] px-[10px] py-[4px] rounded-full flex items-center gap-[6px]"
              data-node-id="1:33291"
            >
              <span className="size-[6px] rounded-full bg-[#34422a] inline-block" />
              <span className="font-cairo font-semibold text-[#5a6952] text-[11px] leading-[16px]">
                متصل حالياً (Active)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-[16px] w-full" data-node-id="1:33296">
            <div
              className="bg-[#34422a] size-[44px] rounded-[12px] flex items-center justify-center text-white shadow-[0px_1px_1px_rgba(0,0,0,0.05)] shrink-0"
              data-node-id="1:33306"
            >
              <MessageSquare className="size-[20px]" />
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0" data-node-id="1:33297">
              <div className="flex items-center gap-[6px] w-full" data-node-id="1:33298">
                <BadgeCheck className="size-[16px] text-[#34422a] shrink-0" />
                <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px] truncate">
                  {accountName}
                </h3>
              </div>
              <p className="font-cairo font-bold text-[#75786f] text-[12px] leading-[18px]">
                {phoneNumber}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[8px] pt-[8px] w-full" data-node-id="1:33309">
            <div
              className="bg-white rounded-[8px] p-[10px] flex flex-col items-start"
              data-node-id="1:33316"
            >
              <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                معرّف حساب الأعمال (WABA ID)
              </span>
              <span className="font-cairo font-bold text-[#181d17] text-[12px] leading-[18px] pt-[2px] truncate w-full">
                {wabaId}
              </span>
            </div>
            <div
              className="bg-white rounded-[8px] p-[10px] flex flex-col items-start"
              data-node-id="1:33310"
            >
              <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                مزود واجهة البرمجة (Provider)
              </span>
              <span className="font-cairo font-semibold text-[#181d17] text-[12px] leading-[18px] pt-[2px] truncate w-full">
                {provider}
              </span>
            </div>
          </div>
        </div>

        {/* Urgent Operational Warning Banner (Figma 1:33322) */}
        <div
          className="bg-[rgba(255,218,214,0.4)] rounded-[12px] p-[16px] flex items-start gap-[12px] shrink-0 w-full"
          data-node-id="1:33322"
          data-name="Urgent Operational Warning Banner"
        >
          <AlertTriangle className="size-[22px] text-[#ba1a1a] shrink-0 mt-[2px]" />
          <div className="flex flex-col gap-[3px] flex-1 min-w-0" data-node-id="1:33323">
            <h4
              className="font-cairo font-bold text-[#ba1a1a] text-[14px] leading-[20px]"
              data-node-id="1:33325"
            >
              سيؤدي فصل الاتصال إلى إيقاف إرسال رسائل WhatsApp الآلية فوراً.
            </h4>
            <p
              className="font-cairo font-normal text-[#454840] text-[13px] leading-[21px]"
              data-node-id="1:33327"
            >
              لن تتمكن المنصة من بث أي إشعارات لحظية أو رسائل تأكيد للنزلاء وملاك العقارات عبر
              واتساب حتى تتم إعادة الربط وتوثيق الرمز السحابي مجدداً.
            </p>
          </div>
        </div>

        {/* Impacted Automations Breakdown (Figma 1:33330) */}
        <div
          className="flex flex-col gap-[8px] shrink-0 w-full"
          data-node-id="1:33330"
          data-name="Impacted Automations Breakdown"
        >
          <div className="flex items-center justify-between pb-[4px] w-full" data-node-id="1:33331">
            <div className="flex items-center gap-[6px]" data-node-id="1:33334">
              <Workflow className="size-[15px] text-[#181d17]" />
              <span
                className="font-cairo font-semibold text-[#181d17] text-[14px] leading-[20px]"
                data-node-id="1:33335"
              >
                المسارات والأتمتة المتأثرة بالتعطيل:
              </span>
            </div>
            <div
              className="bg-[#ebefe6] px-[10px] py-[2px] rounded-full"
              data-node-id="1:33332"
            >
              <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                1,482 عقاراً • 11,290 وحدة
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[6px] w-full" data-node-id="1:33338">
            {affectedWorkflows.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f1f5eb] rounded-[8px] p-[10px] flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-[10px]">
                  <span className="size-[8px] rounded-full bg-[#ba1a1a] shrink-0" />
                  <span className="font-cairo font-medium text-[#181d17] text-[13px] leading-[20px]">
                    {item.title}
                  </span>
                </div>
                <span className="font-cairo font-normal text-[#75786f] text-[11px] leading-[16px]">
                  {item.category}
                </span>
              </div>
            ))}
          </div>

          {/* 24h impact projection badge (Figma 1:33375) */}
          <div
            className="bg-[#ebefe6] rounded-[8px] p-[10px] flex items-center justify-between w-full mt-[4px]"
            data-node-id="1:33375"
          >
            <div className="flex items-center gap-[8px]" data-node-id="1:33378">
              <Info className="size-[15px] text-[#75786f]" />
              <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                حجم العمليات المجدولة خلال الـ 24 ساعة القادمة:
              </span>
            </div>
            <span
              className="font-cairo font-bold text-[#ba1a1a] text-[12px] leading-[18px]"
              data-node-id="1:33377"
            >
              1,200+ رسالة ستفشل تلقائياً
            </span>
          </div>
        </div>

        {/* Mandatory Confirmation Acknowledgement (Figma 1:33383) */}
        <label
          className="bg-[#f1f5eb] rounded-[12px] p-[12px] flex items-start gap-[12px] cursor-pointer select-none shrink-0 w-full hover:bg-[#eaf0e3] transition-colors"
          data-node-id="1:33383"
        >
          <div className="relative shrink-0 mt-[2px]">
            <input
              type="checkbox"
              checked={isAcknowledged}
              onChange={(e) => setIsAcknowledged(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`size-[20px] rounded-[2.5px] border flex items-center justify-center transition-colors ${
                isAcknowledged
                  ? "bg-[#34422a] border-[#34422a] text-white"
                  : "bg-white border-[#767676]"
              }`}
            >
              {isAcknowledged && <Check className="size-3.5 stroke-[3]" />}
            </div>
          </div>
          <span
            className="font-cairo font-medium text-[#181d17] text-[14px] leading-[22px]"
            data-node-id="1:33385"
          >
            أفهم أن الرسائل الآلية ستتوقف لجميع العقارات والنزلاء على مستوى المنصة وأتحمل مسؤولية انقطاع الخدمة.
          </span>
        </label>

        {/* Action Buttons Footer (Figma 1:33388) */}
        <div
          className="flex items-center justify-end gap-[12px] pt-[8px] shrink-0 w-full"
          data-node-id="1:33388"
        >
          <button
            type="button"
            onClick={onClose}
            className="bg-[#ebefe6] hover:bg-[#d8e0d1] text-[#181d17] px-[24px] py-[10px] rounded-[12px] font-cairo font-semibold text-[14px] leading-[20px] transition-colors cursor-pointer"
            data-node-id="1:33394"
          >
            إلغاء والاحتفاظ بالاتصال
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isAcknowledged}
            className={`px-[36px] py-[10px] rounded-[12px] font-cairo font-semibold text-[14px] leading-[20px] flex items-center gap-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all ${
              isAcknowledged
                ? "bg-[#ba1a1a] hover:bg-[#961414] text-white cursor-pointer active:scale-[0.98]"
                : "bg-[rgba(186,26,26,0.4)] text-white/80 cursor-not-allowed"
            }`}
            data-node-id="1:33389"
          >
            <Unlink className="size-[16px]" />
            <span>فصل الاتصال نهائياً</span>
          </button>
        </div>
      </div>
    </div>
  );
}
