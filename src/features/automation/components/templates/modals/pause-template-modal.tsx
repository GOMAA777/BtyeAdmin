"use client";

import { X, Pause, ShieldCheck, Info, MinusCircle, MessageSquare } from "lucide-react";

interface PauseTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  templateCode?: string;
  templateTitle?: string;
}

export function PauseTemplateModal({
  isOpen,
  onClose,
  onConfirm,
  templateCode = "tpl_arrival_guide_v3",
  templateTitle = "تفاصيل الوصول",
}: PauseTemplateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo">
      {/* Modal Dialog Card [1:24945] */}
      <div
        dir="rtl"
        className="bg-white rounded-[24px] w-full max-w-[490px] overflow-hidden shadow-2xl border border-[#E5E8E2] flex flex-col animate-in fade-in-50 zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#EBEFE6] flex items-center justify-between bg-white shrink-0">
          <h2 className="text-[22px] font-bold text-[#181D17]">إيقاف قالب واتساب؟</h2>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#454840] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-4 text-right">
          {/* Template Identification Card [1:24945] */}
          <div className="bg-[#F1F5EB] rounded-[20px] p-4 space-y-3.5 border border-[#E5E8E2]/60">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBEFE6] text-[#4B5940] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#4B5940]" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[14px] font-bold text-[#181D17]">{templateTitle}</span>
                  <span className="text-[11px] font-mono text-[#75786F]">{templateCode}</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#3E8A5A] border border-black/5 shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E8A5A]" />
                <span>مفعّل حالياً</span>
              </span>
            </div>

            {/* Quick Metrics (2 cards) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white rounded-[12px] p-3 border border-[#E5E8E2]/50">
                <div className="text-[11px] text-[#75786F]">تصنيف الاستخدام</div>
                <div className="text-[13px] font-bold text-[#181D17] mt-1">
                  إرشادات الوصول والاستلام
                </div>
              </div>

              <div className="bg-white rounded-[12px] p-3 border border-[#E5E8E2]/50">
                <div className="text-[11px] text-[#75786F]">الارتباط التشغيلي</div>
                <div className="text-[13px] font-bold text-[#181D17] mt-1">
                  3 قواعد أتمتة مركزية
                </div>
              </div>
            </div>

            {/* Affected Rules Box */}
            <div className="bg-white rounded-[14px] p-3 border border-[#E5E8E2]/50 space-y-2">
              <div className="text-[11px] font-semibold text-[#454840]">
                القواعد المتأثرة مباشرة:
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F1F5EB] text-[11px] font-medium text-[#454840]">
                  إرسال تفاصيل الوصول قبل 24 ساعة
                </span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F1F5EB] text-[11px] font-medium text-[#454840]">
                  تذكير يوم الوصول الصباحي
                </span>
                <span className="px-2.5 py-1 rounded-[8px] bg-[#F1F5EB] text-[11px] font-medium text-[#454840]">
                  تحديثات الدخول المتأخر
                </span>
              </div>
            </div>
          </div>

          {/* Bullet Warning */}
          <div className="flex items-center gap-2 px-1 text-xs text-[#181D17] font-medium">
            <MinusCircle className="w-4 h-4 text-[#454840] shrink-0" />
            <span>لن يتم استخدام هذا القالب في الرسائل التلقائية الجديدة أثناء إيقافه.</span>
          </div>

          {/* Alert Box 1 (Audit Notification) */}
          <div className="bg-[#F1F5EB] rounded-[16px] p-4 space-y-1.5 border border-[#E5E8E2]/50">
            <div className="flex items-center gap-2 font-bold text-xs text-[#181D17]">
              <ShieldCheck className="w-4 h-4 text-[#4B5940] shrink-0" />
              <span>تنبيه مهم للتدقيق</span>
            </div>
            <p className="text-[11.5px] text-[#454840] leading-relaxed">
              الرسائل التي تم إرسالها سابقًا لن تتأثر، وسجلات التسليم التاريخية في سجلات التدقيق ستبقى محفوظة بالكامل مع تقارير الامتثال.
            </p>
          </div>

          {/* Alert Box 2 (Operational Stoppage Notice) */}
          <div className="bg-[#F1F5EB] rounded-[14px] p-3.5 flex items-start gap-2.5 text-[11.5px] text-[#454840] leading-relaxed border border-[#E5E8E2]/50">
            <Info className="w-4 h-4 text-[#75786F] shrink-0 mt-0.5" />
            <p>
              قواعد الأتمتة الـ 3 المرتبطة ستتوقف عن إرسال هذه الرسالة تلقائياً للنزلاء حتى تتم إعادة تفعيل القالب أو تعيين قالب بديل.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#FAFBF9] border-t border-[#E5E8E2] flex items-center justify-start gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-[12px] bg-[#4B5940] hover:bg-[#3D4934] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Pause className="w-3.5 h-3.5" />
            <span>إيقاف القالب</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-[12px] bg-white hover:bg-gray-50 border border-[#E5E8E2] text-[#181D17] text-xs font-semibold transition-colors cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
