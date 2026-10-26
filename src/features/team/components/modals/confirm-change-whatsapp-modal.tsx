"use client";

import { useState } from "react";
import { X, MessageSquare, Clock, ShieldCheck, Hourglass, CheckSquare } from "lucide-react";
import { TeamMember } from "../../types";

interface ConfirmChangeWhatsappModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onConfirm: (memberId: string, newNumber: string, updatePrimaryPhone: boolean) => void;
}

export function ConfirmChangeWhatsappModal({
  isOpen,
  onClose,
  member,
  onConfirm,
}: ConfirmChangeWhatsappModalProps) {
  const [newNumber, setNewNumber] = useState("+966 55 912 3456");
  const [updatePrimaryPhone, setUpdatePrimaryPhone] = useState(true);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
      <div
        className="bg-white relative w-full max-w-[580px] rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Decorative Stripe */}
        <div className="h-[6px] w-full bg-[#34422a]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 size-9 flex items-center justify-center rounded-[12px] bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق النافذة"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-[12px] bg-[rgba(216,232,199,0.5)] text-[#34422a] flex items-center justify-center shrink-0 shadow-sm border border-[#d8e8c7]">
              <MessageSquare className="size-6 fill-[#34422a]/20" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[24px] font-bold text-[#181d17] leading-tight font-cairo">
                تأكيد تغيير رقم واتساب
              </h2>
              <p className="text-[14px] text-[#454840] font-medium font-cairo">
                {member.fullName} — {member.roleLabel}
              </p>
              <p className="text-[11px] text-[#75786f] font-medium font-cairo">
                المعرّف النظامي: {member.systemId}
              </p>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-2">
            <h3 className="text-[12px] font-bold text-[#454840] font-cairo">
              مقارنة أرقام القناة
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Old Number Card */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#75786f] font-cairo">
                      الرقم الحالي المعتمد
                    </span>
                    <span className="bg-[#e5eae0] text-[#454840] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 font-cairo">
                      <span className="size-1.5 rounded-full bg-[#75786f]" />
                      نشط حالياً
                    </span>
                  </div>
                  <div className="text-[18px] font-bold text-[#181d17] tracking-wider py-1 font-cairo" dir="ltr">
                    {member.whatsapp}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#75786f] font-cairo">
                  <Clock className="size-3" />
                  <span>مسجل منذ 7 أشهر</span>
                </div>
              </div>

              {/* New Number Card */}
              <div className="bg-[rgba(242,225,192,0.3)] border border-[#f2e1c0] rounded-[12px] p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#51452d] font-cairo">
                      رقم WhatsApp الجديد
                    </span>
                    <span className="bg-[#f2e1c0] text-[#231a06] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 font-cairo">
                      <span className="size-1.5 rounded-full bg-[#34422a]" />
                      قيد التعيين
                    </span>
                  </div>
                  <div className="bg-white rounded-[8px] h-11 px-3 flex items-center shadow-sm">
                    <input
                      type="text"
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                      className="w-full text-[17px] font-bold text-[#34422a] tracking-wider focus:outline-none font-cairo"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#34422a] font-cairo">
                  <ShieldCheck className="size-3.5 text-[#059669]" />
                  <span>رقم خاضع للتحقق المباشر</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification & Channel Status State */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#181d17] font-cairo">
                <Hourglass className="size-4 text-[#6f6349]" />
                <span>حالة قناة الاستلام:</span>
              </div>
              <span className="bg-[#f2e1c0] text-[#6f6349] text-[11px] font-bold px-2.5 py-0.5 rounded-full font-cairo">
                بانتظار الإرسال والتأكيد
              </span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#454840] font-cairo">
              ستعتمد المنصة الرقم الجديد لإرسال كافة التنبيهات التشغيلية المستقبلية، جداول النظافة، وروابط فتح الأقفال الذكية فور الحفظ. سيتم إرسال رسالة ترحيبية آلية مع رمز ربط سريع للرقم الجديد للتثبت من جاهزية المحادثة.
            </p>
          </div>

          {/* Checkbox */}
          <label
            onClick={() => setUpdatePrimaryPhone(!updatePrimaryPhone)}
            className="flex items-center gap-2 cursor-pointer select-none text-[13px] font-semibold text-[#181d17] font-cairo"
          >
            {updatePrimaryPhone ? (
              <CheckSquare className="size-5 text-[#34422a] fill-[#34422a]/10" />
            ) : (
              <div className="size-5 rounded border border-[#75786f] bg-white" />
            )}
            <span>تحديث رقم الجوال الأساسي بنفس الرقم الجديد تلقائياً</span>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-[12px] border border-[#dfe4db] text-[#454840] font-semibold text-[14px] hover:bg-[#f1f5eb] transition-colors font-cairo"
            >
              إلغاء
            </button>
            <button
              onClick={() => onConfirm(member.id, newNumber, updatePrimaryPhone)}
              className="px-6 py-2.5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-semibold text-[14px] flex items-center gap-2 shadow-sm transition-colors font-cairo"
            >
              <span>تأكيد التغيير</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
