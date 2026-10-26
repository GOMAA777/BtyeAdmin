"use client";

import { useState } from "react";
import { X, Pause, ClipboardList, ShieldCheck, ArrowRightLeft, User } from "lucide-react";
import { TeamMember } from "../../types";

interface SuspendMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  availableSubstitutes: TeamMember[];
  onConfirm: (memberId: string, substituteId?: string) => void;
}

export function SuspendMemberModal({
  isOpen,
  onClose,
  member,
  availableSubstitutes,
  onConfirm,
}: SuspendMemberModalProps) {
  const [reassignOption, setReassignOption] = useState<"auto" | "keep_pending">("auto");
  const [selectedSubstituteId, setSelectedSubstituteId] = useState<string>(
    availableSubstitutes.find((s) => s.id !== member?.id)?.id || "3"
  );

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
      <div
        className="bg-white relative w-full max-w-[560px] rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(24,29,23,0.22)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Decorative Amber Stripe */}
        <div className="h-[6px] w-full bg-gradient-to-r from-[#e99a38] via-[#f2e1c0] to-[#e99a38]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 size-8 flex items-center justify-center rounded-full bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق النافذة"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-[12px] bg-[#fff8e6] text-[#e99a38] flex items-center justify-center shrink-0 shadow-sm border border-[#f2e1c0]">
              <Pause className="size-6 fill-current" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[24px] font-bold text-[#181d17] leading-tight font-cairo">
                ايقاف عضو الفريق؟
              </h2>
              <p className="text-[14px] text-[#454840] font-medium font-cairo">
                {member.fullName} — {member.roleLabel}
              </p>
              <p className="text-[11px] text-[#75786f] font-medium font-cairo">
                المعرّف النظامي: {member.systemId}
              </p>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 text-[13.5px] leading-relaxed text-[#454840] font-cairo">
            عند إيقاف هذا العضو، سيتم{" "}
            <span className="font-bold text-[#181d17]">تعليق حسابه مؤقتاً</span> ولن يتمكن من استقبال
            أي مهام تشغيلية جديدة أو استلام تنبيهات الروابط المشفرة عبر WhatsApp حتى يُعاد تفعيله من قبل الإدارة.
          </div>

          {/* Open Tasks Reassignment Box */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardList className="size-4 text-[#6f6349]" />
                <span className="text-[14px] font-bold text-[#181d17] font-cairo">
                  المهام المفتوحة الجارية ({member.openTasksCount || 2} مهام قيد الإسناد)
                </span>
              </div>
              <span className="bg-[#f2e1c0] text-[#231a06] text-[11px] font-semibold px-2 py-0.5 rounded-full font-cairo">
                تتطلب إجراءً
              </span>
            </div>

            {/* Tasks Mini List */}
            <div className="space-y-1.5">
              <div className="bg-white rounded-[8px] p-2.5 flex items-center justify-between text-[12px] shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-[#e99a38]" />
                  <span className="font-semibold text-[#181d17] font-cairo">
                    CLN-2048: تنظيف وتجهيز ما بعد المغادرة
                  </span>
                </div>
                <span className="bg-[#ebefe6] text-[#454840] text-[11px] px-2 py-0.5 rounded font-cairo">
                  عمارة النخيل (شقة 204)
                </span>
              </div>
              <div className="bg-white rounded-[8px] p-2.5 flex items-center justify-between text-[12px] shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-[#e99a38]" />
                  <span className="font-semibold text-[#181d17] font-cairo">
                    CLN-2041: تنظيف دوري وتفقد الأجهزة
                  </span>
                </div>
                <span className="bg-[#ebefe6] text-[#454840] text-[11px] px-2 py-0.5 rounded font-cairo">
                  برج الياسمين (جناح 202)
                </span>
              </div>
            </div>

            {/* Reassignment Options */}
            <div className="space-y-2 pt-2">
              <label
                onClick={() => setReassignOption("auto")}
                className={`flex flex-col gap-2 p-3 rounded-[12px] border cursor-pointer transition-all ${
                  reassignOption === "auto"
                    ? "bg-white border-[#34422a] shadow-sm"
                    : "bg-white/60 border-transparent hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="reassign"
                      checked={reassignOption === "auto"}
                      onChange={() => setReassignOption("auto")}
                      className="accent-[#34422a] size-4"
                    />
                    <span className="text-[13px] font-bold text-[#181d17] font-cairo">
                      إعادة توزيع المهام تلقائياً لعضو بديل متاح
                    </span>
                  </div>
                  <span className="bg-[#d8e8c7] text-[#131f0b] text-[10px] font-bold px-2 py-0.5 rounded font-cairo">
                    موصى به
                  </span>
                </div>
                <p className="text-[11px] text-[#75786f] ps-6 font-cairo">
                  تحويل التكليفات وإرسال تحديث المهام فوراً عبر واتساب
                </p>

                {reassignOption === "auto" && (
                  <div className="mt-1 ps-6">
                    <div className="relative">
                      <select
                        value={selectedSubstituteId}
                        onChange={(e) => setSelectedSubstituteId(e.target.value)}
                        className="w-full bg-[#f1f5eb] border border-[#dfe4db] rounded-[8px] py-2 px-3 pr-8 text-[12px] font-medium text-[#181d17] appearance-none focus:outline-none focus:ring-1 focus:ring-[#34422a] font-cairo"
                      >
                        {availableSubstitutes
                          .filter((s) => s.id !== member.id)
                          .map((sub) => (
                            <option key={sub.id} value={sub.id}>
                              {sub.fullName} ({sub.roleLabel} — متواجد بالنطاق)
                            </option>
                          ))}
                      </select>
                      <User className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#75786f] pointer-events-none" />
                      <ArrowRightLeft className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#75786f] pointer-events-none" />
                    </div>
                  </div>
                )}
              </label>

              <label
                onClick={() => setReassignOption("keep_pending")}
                className={`flex flex-col gap-1 p-3 rounded-[12px] border cursor-pointer transition-all ${
                  reassignOption === "keep_pending"
                    ? "bg-white border-[#34422a] shadow-sm"
                    : "bg-white/60 border-transparent hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="reassign"
                    checked={reassignOption === "keep_pending"}
                    onChange={() => setReassignOption("keep_pending")}
                    className="accent-[#34422a] size-4"
                  />
                  <span className="text-[13px] font-bold text-[#181d17] font-cairo">
                    إبقاء المهام معلقة مع تنبيه مشرف التشغيل
                  </span>
                </div>
                <p className="text-[11px] text-[#75786f] ps-6 font-cairo">
                  سيتلقى مشرف العقار إشعاراً عاجلاً لإعادة الإسناد يدوياً
                </p>
              </label>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="flex items-center gap-2 text-[11px] text-[#75786f] font-cairo">
            <ShieldCheck className="size-4 text-[#059669] shrink-0" />
            <span>
              سجلات العمليات السابقة، تقارير النظافة المعتمدة، وسجل إشعارات WhatsApp ستبقى محفوظة ومؤرخة بالكامل.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-[12px] border border-[#dfe4db] text-[#454840] font-semibold text-[14px] hover:bg-[#f1f5eb] transition-colors font-cairo"
            >
              إلغاء
            </button>
            <button
              onClick={() => onConfirm(member.id, reassignOption === "auto" ? selectedSubstituteId : undefined)}
              className="px-6 py-2.5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-semibold text-[14px] flex items-center gap-2 shadow-sm transition-colors font-cairo"
            >
              <Pause className="size-4 fill-current" />
              <span>إيقاف مؤقت</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
