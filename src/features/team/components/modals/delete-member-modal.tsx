"use client";

import { useState } from "react";
import { X, UserX, AlertCircle, ClipboardList, ArrowRightLeft, Trash2 } from "lucide-react";
import { TeamMember } from "../../types";

interface DeleteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  availableSubstitutes: TeamMember[];
  onConfirm: (memberId: string, substituteId?: string) => void;
}

export function DeleteMemberModal({
  isOpen,
  onClose,
  member,
  availableSubstitutes,
  onConfirm,
}: DeleteMemberModalProps) {
  const [selectedSubstituteId, setSelectedSubstituteId] = useState<string>(
    availableSubstitutes.find((s) => s.id !== member?.id)?.id || "3"
  );
  const [confirmedAgreement, setConfirmedAgreement] = useState(false);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
      <div
        className="bg-white relative w-full max-w-[560px] rounded-[16px] shadow-[0px_20px_48px_-12px_rgba(24,29,23,0.22)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle Red Status Stripe */}
        <div className="h-[6px] w-full bg-[#ba1a1a]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 size-8 flex items-center justify-center rounded-full bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق النافذة"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-5">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-[16px] bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 shadow-sm">
              <UserX className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[24px] font-bold text-[#181d17] leading-tight font-cairo">
                حذف عضو الفريق؟
              </h2>
              <p className="text-[14px] text-[#454840] font-medium font-cairo">
                {member.fullName} — {member.roleLabel}
              </p>
              <p className="text-[11px] text-[#75786f] font-medium font-cairo">
                المعرّف النظامي: {member.systemId}
              </p>
            </div>
          </div>

          {/* Operational Impact Notice */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 text-[13.5px] leading-relaxed text-[#454840] font-cairo">
            سيتم إزالة العضو نهائياً من دليل فريق العمل النشط، وإلغاء صلاحيات دخوله إلى بوابات التشغيل الميدانية والأكواد الذكية المرتبطة به فور تأكيد الحذف.
          </div>

          {/* Mandatory Resolution of Open Tasks */}
          <div className="bg-[#ebefe6] rounded-[12px] p-4 space-y-3">
            <div className="flex items-center gap-2 text-[#ba1a1a]">
              <AlertCircle className="size-4 shrink-0" />
              <span className="text-[13.5px] font-bold font-cairo">
                لا يمكن إتمام الحذف مع وجود مهام مفتوحة دون إعادة إسنادها
              </span>
            </div>

            <div className="bg-white rounded-[12px] p-3 flex items-center justify-between text-[12px] shadow-sm">
              <div className="flex items-center gap-2">
                <ClipboardList className="size-4 text-[#181d17]" />
                <span className="font-semibold text-[#181d17] font-cairo">
                  المهام الميدانية المعلّقة:
                </span>
              </div>
              <span className="bg-[#f2e1c0] text-[#231a06] text-[11px] font-bold px-2.5 py-1 rounded-[6px] font-cairo">
                {member.openTasksCount || 2} مهام مفتوحة تتطلب تحويلاً فورياً
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <label className="text-[12px] font-semibold text-[#181d17] flex items-center gap-1 font-cairo">
                <span className="text-[#ba1a1a]">*</span>
                <span>تحويل كافة المهام المفتوحة والمسؤوليات الحالية إلى:</span>
              </label>
              <div className="relative">
                <select
                  value={selectedSubstituteId}
                  onChange={(e) => setSelectedSubstituteId(e.target.value)}
                  className="w-full bg-white border border-[#dfe4db] rounded-[12px] h-12 px-4 text-[13.5px] font-medium text-[#181d17] shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#ba1a1a] font-cairo"
                >
                  {availableSubstitutes
                    .filter((s) => s.id !== member.id)
                    .map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.fullName} — {sub.roleLabel} (متفرغ حالياً)
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-[11px] text-[#454840] flex items-center gap-1.5 pt-1 font-cairo">
                <ArrowRightLeft className="size-3 text-[#75786f]" />
                <span>سيصل إشعار واتساب تلقائي للمعيّن الجديد بجدول التسليم وأكواد الشقق الذكية.</span>
              </p>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={confirmedAgreement}
              onChange={(e) => setConfirmedAgreement(e.target.checked)}
              className="accent-[#ba1a1a] size-4.5 rounded mt-0.5"
            />
            <span className="text-[12px] font-semibold text-[#181d17] leading-relaxed font-cairo">
              أقر بإزالة العضو نهائياً من الفريق النشط وإعادة تعيين مهامه الميدانية المعلّقة وإلغاء بطاقته الذكية.
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-[12px] border border-[#dfe4db] text-[#454840] font-semibold text-[14px] hover:bg-[#f1f5eb] transition-colors font-cairo"
            >
              إلغاء
            </button>
            <button
              onClick={() => onConfirm(member.id, selectedSubstituteId)}
              disabled={!confirmedAgreement}
              className={`px-6 py-2.5 rounded-[12px] text-white font-semibold text-[14px] flex items-center gap-2 shadow-sm transition-all font-cairo ${
                confirmedAgreement
                  ? "bg-[#ba1a1a] hover:bg-[#961515] cursor-pointer"
                  : "bg-[#d69595] cursor-not-allowed opacity-75"
              }`}
            >
              <Trash2 className="size-4" />
              <span>حذف العضو نهائياً</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
