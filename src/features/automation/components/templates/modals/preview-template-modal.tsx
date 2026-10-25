"use client";

import { useState } from "react";
import {
  X,
  Copy,
  Check,
  CheckCheck,
  Building2,
  BadgeCheck,
  MapPin,
  KeyRound,
  Info,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { WhatsAppTemplate } from "../../../types";

interface PreviewTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: WhatsAppTemplate | null;
}

export function PreviewTemplateModal({
  isOpen,
  onClose,
  template,
}: PreviewTemplateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const templateTitle = template?.title || "تفاصيل الوصول";
  const templateCode = template?.templateCode || "tpl_arrival_guide_v3";

  const messageText = `مرحبًا خالد العتيبي،
يسعدنا استقبالكم في عمارة النخيل - الوحدة 204.
📅 تاريخ الوصول: 18 سبتمبر 2026 الساعة 02:00 م
📅 تاريخ المغادرة: 21 سبتمبر 2026 الساعة 12:00 م
🔑 كود الدخول للباب الذكي: 482913
⚙ رابط الموقع: https://maps.abraj.sa/loc/nakheel-204
نتمنى لكم إقامة ممتعة وخدمة ممتازة!`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      toast.success("تم نسخ نص الرسالة إلى الحافظة بنجاح");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("تعذر نسخ النص");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo">
      {/* Modal Dialog Card [1:24789] */}
      <div
        dir="rtl"
        className="bg-white rounded-[24px] w-full max-w-[580px] overflow-hidden shadow-2xl border border-[#E5E8E2] flex flex-col max-h-[92vh] animate-in fade-in-50 zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-[#EBEFE6] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <h2 className="text-[20px] font-bold text-[#181D17]">معاينة الرسالة</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EBEFE6] text-[#454840]">
              Meta Cloud API
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#454840] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Template Info Sub-banner */}
          <div className="bg-[#F1F5EB] rounded-[14px] px-4 py-2.5 flex items-center justify-between">
            <div className="text-xs text-[#454840]">
              <span>اسم القالب: </span>
              <span className="font-bold text-[#181D17]">{templateTitle}</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D8E8CB] text-[#34422A] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34422A]" />
              <span>قالب معتمد ومفعّل</span>
            </span>
          </div>

          {/* WhatsApp Chat Simulation Container */}
          <div className="bg-[#EFECE6] rounded-[20px] p-4 space-y-3 border border-[#E5E8E2]">
            {/* Business Chat Header */}
            <div className="flex items-center justify-between bg-transparent pb-1">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#34422A] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[13px] font-bold text-[#181D17]">
                    <span>أبراج لإدارة الأصول العقارية</span>
                    <BadgeCheck className="w-4 h-4 text-[#3E8A5A] fill-[#3E8A5A]/20" />
                  </div>
                  <div className="text-[11px] text-[#75786F]">حساب أعمال رسمي موثّق</div>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-white/80 text-[10px] font-medium text-[#454840] border border-black/5">
                حساب موثق
              </span>
            </div>

            {/* Chat Date Badge */}
            <div className="text-center pt-1">
              <span className="px-3 py-0.5 rounded-full bg-white/90 text-[#75786F] text-[10px] font-semibold shadow-2xs">
                اليوم
              </span>
            </div>

            {/* WhatsApp Message Bubble */}
            <div className="bg-[#E7FFDB] rounded-[18px] rounded-tr-none p-4 shadow-xs border border-[#D5ECC9] space-y-2 text-right relative">
              <div className="text-[13px] font-bold text-[#181D17]">
                مرحبًا خالد العتيبي،
              </div>
              <p className="text-[12.5px] text-[#181D17] leading-relaxed">
                يسعدنا استقبالكم في عمارة النخيل - الوحدة 204.
              </p>

              <div className="space-y-1.5 py-1 text-[12.5px] text-[#181D17]">
                <div>
                  <span className="font-semibold">📅 تاريخ الوصول: </span>
                  <span>18 سبتمبر 2026 الساعة 02:00 م</span>
                </div>
                <div>
                  <span className="font-semibold">📅 تاريخ المغادرة: </span>
                  <span>21 سبتمبر 2026 الساعة 12:00 م</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold">🔑 كود الدخول للباب الذكي: </span>
                  <span className="bg-white px-2.5 py-0.5 rounded-md font-mono font-bold text-[#181D17] shadow-2xs border border-[#CDE8BD]">
                    482913
                  </span>
                </div>
                <div>
                  <span className="font-semibold">⚙ رابط الموقع: </span>
                  <a
                    href="https://maps.abraj.sa/loc/nakheel-204"
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-[#181D17] font-medium hover:text-[#4B5940] transition-colors"
                  >
                    https://maps.abraj.sa/loc/nakheel-204
                  </a>
                </div>
              </div>

              <p className="text-[12.5px] text-[#181D17] leading-relaxed">
                نتمنى لكم إقامة ممتعة وخدمة ممتازة!
              </p>

              {/* Timestamp & read check */}
              <div className="flex items-center justify-start gap-1 text-[10px] text-[#75786F] pt-1">
                <span>10:30 ص</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => toast.info("فتح الموقع في الخرائط")}
                className="w-full py-2.5 px-3 rounded-[12px] bg-white hover:bg-gray-50 text-[#181D17] text-xs font-bold flex items-center justify-center gap-2 border border-[#E5E8E2] shadow-2xs transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#4B5940]" />
                <span>فتح الموقع في الخرائط</span>
              </button>

              <button
                type="button"
                onClick={() => toast.info("دليل كود الدخول والتعليمات")}
                className="w-full py-2.5 px-3 rounded-[12px] bg-white hover:bg-gray-50 text-[#181D17] text-xs font-bold flex items-center justify-center gap-2 border border-[#E5E8E2] shadow-2xs transition-colors cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-[#4B5940]" />
                <span>دليل كود الدخول والتعليمات</span>
              </button>
            </div>
          </div>

          {/* Dynamic Variables Card [1:24789] */}
          <div className="bg-[#F1F5EB] rounded-[18px] p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#181D17]">
                <span>&#123; &#125;</span>
                <span>المتغيرات المستخدمة في القالب</span>
              </div>
              <span className="text-[#75786F] text-[11px]">7 حقول ديناميكية</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded-[10px] px-3 py-2 flex items-center justify-between border border-[#E5E8E2]/60">
                <span className="text-[#75786F]">اسم العميل:</span>
                <span className="font-bold text-[#181D17]">خالد العتيبي</span>
              </div>

              <div className="bg-white rounded-[10px] px-3 py-2 flex items-center justify-between border border-[#E5E8E2]/60">
                <span className="text-[#75786F]">اسم العقار:</span>
                <span className="font-bold text-[#181D17]">عمارة النخيل</span>
              </div>

              <div className="bg-white rounded-[10px] px-3 py-2 flex items-center justify-between border border-[#E5E8E2]/60">
                <span className="text-[#75786F]">رقم الوحدة:</span>
                <span className="font-bold text-[#181D17]">204</span>
              </div>

              <div className="bg-white rounded-[10px] px-3 py-2 flex items-center justify-between border border-[#E5E8E2]/60">
                <span className="text-[#75786F]">كود الدخول:</span>
                <span className="font-bold text-[#181D17]">482913</span>
              </div>

              <div className="bg-white rounded-[10px] px-3 py-2 flex items-center justify-between border border-[#E5E8E2]/60">
                <span className="text-[#75786F]">تاريخ الوصول:</span>
                <span className="font-bold text-[#181D17]">18 سبتمبر 2026</span>
              </div>

              <div className="bg-white rounded-[10px] px-3 py-2 flex items-center justify-between border border-[#E5E8E2]/60">
                <span className="text-[#75786F]">تاريخ المغادرة:</span>
                <span className="font-bold text-[#181D17]">21 سبتمبر 2026</span>
              </div>

              <div className="sm:col-span-2 bg-white rounded-[10px] px-3 py-2 flex items-center justify-between border border-[#E5E8E2]/60">
                <span className="text-[#75786F]">رابط الموقع:</span>
                <span className="font-bold text-[#181D17] font-mono text-[11px] underline">
                  https://maps.abraj.sa/loc/nakheel-204
                </span>
              </div>
            </div>
          </div>

          {/* Operational Notice */}
          <div className="bg-[#EBEFE6] rounded-[14px] p-3.5 flex items-start gap-2.5 text-xs text-[#454840] leading-relaxed">
            <Info className="w-4 h-4 text-[#75786F] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#181D17]">معاينة تشغيلية فقط: </strong>
              يتم سحب هذه المتغيرات تلقائياً من بيانات الحجز المؤكد عند إطلاق الأتمتة. لا يتم إرسال أي رسائل حقيقية من شاشة المعاينة.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAFBF9] border-t border-[#E5E8E2] flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-[12px] bg-[#4B5940] hover:bg-[#3D4934] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            إغلاق
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            className="px-4 py-2.5 rounded-[12px] bg-white hover:bg-gray-50 border border-[#E5E8E2] text-[#181D17] text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#454840]" />
                <span>نسخ نص الرسالة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
