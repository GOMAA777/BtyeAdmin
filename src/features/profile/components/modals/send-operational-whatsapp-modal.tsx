"use client";

import { useState } from "react";
import { X, Send, MessageSquare, Check } from "lucide-react";

interface SendOperationalWhatsappModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (messageTitle: string) => void;
}

export function SendOperationalWhatsappModal({
  isOpen,
  onClose,
  onSend,
}: SendOperationalWhatsappModalProps) {
  const [template, setTemplate] = useState<string>("task_dispatch");
  const [customNote, setCustomNote] = useState<string>("");

  if (!isOpen) return null;

  const templates = [
    {
      id: "task_dispatch",
      title: "توجيه مهمة تشغيلية عاجلة",
      description: "إرسال رابط المهمة، تفاصيل الوحدة، وتوقيت الدخول الفوري.",
    },
    {
      id: "access_code",
      title: "إرسال كود القفل الذكي",
      description: "توليد وإرسال رمز الدخول المؤقت إلى الواتساب مباشرة.",
    },
    {
      id: "inspection_request",
      title: "طلب توثيق وصور فحص الوحدة",
      description: "طلب رفع 6 صور فوتوغرافية لتوثيق الجاهزية قبل وصول الضيف.",
    },
    {
      id: "custom_ping",
      title: "رسالة إدارية مخصصة",
      description: "كتابة تعليمات حرة ترسل عبر البوت الآلي المعتمد.",
    },
  ];

  const handleSend = () => {
    const selected = templates.find((t) => t.id === template)?.title || "رسالة تشغيلية";
    onSend(selected);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white relative w-full max-w-[540px] rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(24,29,23,0.22)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-[6px] w-full bg-gradient-to-r from-[#059669] via-[#d8e8c7] to-[#059669]" />

        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 left-5 size-8 flex items-center justify-center rounded-full bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-[12px] bg-[#f1f5eb] text-[#059669] flex items-center justify-center shrink-0 shadow-sm border border-[#dfe4db]">
              <MessageSquare className="size-6 fill-current" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[22px] font-bold text-[#181d17] leading-tight font-cairo">
                إرسال رسالة تشغيلية عبر WhatsApp
              </h2>
              <p className="text-[13px] text-[#454840] font-medium font-cairo">
                بث إشعار تشغيلي فوري عبر قناة WhatsApp Business الآلية
              </p>
            </div>
          </div>

          <div className="space-y-3 font-cairo">
            <label className="text-[12px] font-bold text-[#181d17] block">
              اختر نوع الرسالة أو القالب
            </label>
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`p-3.5 rounded-[12px] border cursor-pointer transition-all ${
                  template === t.id
                    ? "bg-[#f1f5eb] border-[#059669] ring-1 ring-[#059669]"
                    : "bg-white border-[#dfe4db] hover:bg-[#f1f5eb]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[13px] text-[#181d17]">{t.title}</div>
                  <div
                    className={`size-4 rounded-full border flex items-center justify-center ${
                      template === t.id
                        ? "bg-[#059669] border-[#059669] text-white"
                        : "border-[#dfe4db]"
                    }`}
                  >
                    {template === t.id && <Check className="size-2.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[11.5px] text-[#75786f] mt-1">{t.description}</p>
              </div>
            ))}

            {template === "custom_ping" && (
              <div className="space-y-1.5 pt-2">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  نص التوجيه المخصص
                </label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-[10px] bg-[#f1f5eb] border border-[#dfe4db] text-[13px] text-[#181d17] focus:bg-white focus:border-[#059669] focus:outline-none"
                  placeholder="اكتب التوجيهات التشغيلية المطلوب إرسالها..."
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5eb]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[10px] bg-[#ebefe6] text-[#454840] font-bold text-[13px] hover:bg-[#dfe4db] transition-colors font-cairo"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="px-6 py-2.5 rounded-[10px] bg-[#059669] hover:bg-[#047857] text-white font-bold text-[13px] flex items-center gap-2 shadow-sm transition-colors font-cairo"
            >
              <Send className="size-4" />
              <span>إرسال عبر WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
