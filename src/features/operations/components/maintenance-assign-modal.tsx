"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface MaintenanceAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (assignee: string, notes?: string) => void;
  ticketNumber?: string;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
}

export function MaintenanceAssignModal({
  isOpen,
  onClose,
  onConfirm,
  ticketNumber = "MT-2048",
  unitName = "الوحدة 305 (الطابق الثالث - جناح A)",
  propertyName = "برج الياسمين (حي الملقا، الرياض)",
  ownerName = "سارة القحطاني",
}: MaintenanceAssignModalProps) {
  const confirm = useConfirm();
  const [selectedTechnician, setSelectedTechnician] = useState({
    name: "م. طارق العسيري",
    specialty: "فريق الصيانة الفنية المعتمد - تخصص أقفال ذكية",
    rating: "4.95",
    status: "مكلف حالياً",
    initials: "ط",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notes, setNotes] = useState(
    "يرجى استبدال مجموعة التروس الداخلية للقفل الذكي وإعادة معايرة وحدة الاتصال اللاسلكية."
  );

  const availableTechnicians = [
    {
      name: "م. طارق العسيري",
      specialty: "فريق الصيانة الفنية المعتمد - تخصص أقفال ذكية",
      rating: "4.95",
      status: "مكلف حالياً",
      initials: "ط",
    },
    {
      name: "م. فيصل الغامدي",
      specialty: "فريق الصيانة الإلكترونية - أنظمة الدخول والشبكات",
      rating: "4.90",
      status: "متاح فوراً",
      initials: "ف",
    },
    {
      name: "م. حسام الشمري",
      specialty: "فريق الصيانة العامة - أجهزة وكهرباء",
      rating: "4.85",
      status: "متاح فوراً",
      initials: "ح",
    },
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "تأكيد إعادة تعيين الفني الميداني",
      message: `هل أنت متأكد من إسناد بلاغ الصيانة (${ticketNumber}) إلى (${selectedTechnician.name})؟ سيتم تحديث جدول المهام وتوجيه إشعار فوري للفني.`,
      confirmLabel: "تأكيد الإسناد",
      variant: "default",
    });
    if (!ok) return;

    onConfirm(selectedTechnician.name, notes);
    toast.success(`تم إسناد البلاغ بنجاح إلى ${selectedTechnician.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo">
      <div
        className="bg-white flex flex-col items-start overflow-clip relative rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] w-full max-w-[540px] animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* MODAL HEADER */}
        <div className="bg-white flex flex-col gap-[4px] items-start pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full">
          <div className="flex items-center justify-between relative shrink-0 w-full">
            <h2 className="text-[#181d17] text-[22px] font-bold leading-[32px] m-0">
              تعيين فني صيانة آخر
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center rounded-[12px] size-[36px] hover:bg-[#f1f5eb] text-[#75786f] hover:text-[#181d17] transition-colors cursor-pointer"
              aria-label="إغلاق"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 12.8333 12.8333"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M1.28333 12.8333L0 11.55L5.13333 6.41667L0 1.28333L1.28333 0L6.41667 5.13333L11.55 0L12.8333 1.28333L7.7 6.41667L12.8333 11.55L11.55 12.8333L6.41667 7.7L1.28333 12.8333V12.8333"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-[6px] text-right pt-[4px]">
            <span className="text-[#34422a] text-[11px] font-bold leading-[16px]">
              بلاغ الصيانة: {ticketNumber}
            </span>
            <span className="bg-[#c5c8bd] rounded-full size-[4px] shrink-0" />
            <span className="text-[#454840] text-[11px] font-medium leading-[16px]">
              {unitName}
            </span>
            <span className="bg-[#c5c8bd] rounded-full size-[4px] shrink-0" />
            <span className="text-[#454840] text-[11px] font-medium leading-[16px]">
              {propertyName}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#ebefe6]" />

        {/* MODAL FORM BODY */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] p-[24px] w-full">
          {/* Summary Box */}
          <div className="bg-[#f1f5eb] flex flex-col gap-[8px] p-[16px] rounded-[12px] w-full text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#454840] font-semibold">طبيعة العطل:</span>
              <span className="text-[#c24343] font-bold">عطل قفل الباب الذكي (Smart Lock Failure)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#454840] font-semibold">حالة الارتباط بالنزيل:</span>
              <span className="text-[#92400e] font-bold">حجز قادم (فهد السبيعي - بعد 22 ساعة)</span>
            </div>
          </div>

          {/* Select Technician */}
          <div className="flex flex-col gap-[6px] w-full relative">
            <label className="text-[#181d17] text-[13px] font-semibold">
              اختر الفني الميداني المعتمد:
            </label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#f8faf6] border border-[#dfe4db] rounded-[12px] p-[12px] flex items-center justify-between hover:border-[#34422a] transition-colors text-right cursor-pointer"
            >
              <div className="flex items-center gap-[10px]">
                <div className="bg-[#4b5940] rounded-full size-[32px] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                  {selectedTechnician.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                    {selectedTechnician.name}
                  </span>
                  <span className="text-[#75786f] text-[11px] leading-[16px]">
                    {selectedTechnician.specialty}
                  </span>
                </div>
              </div>
              <span className="text-[11px] bg-[#d8e8cb] text-[#34422a] px-[8px] py-[2px] rounded-full font-medium">
                {selectedTechnician.status}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-10 bg-white border border-[#dfe4db] rounded-[12px] shadow-lg overflow-hidden">
                {availableTechnicians.map((tech) => (
                  <button
                    key={tech.name}
                    type="button"
                    onClick={() => {
                      setSelectedTechnician(tech);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full p-[12px] flex items-center justify-between hover:bg-[#f1f5eb] transition-colors text-right cursor-pointer border-b border-[#f1f5eb] last:border-b-0 ${
                      selectedTechnician.name === tech.name ? "bg-[#f1f5eb]/60" : ""
                    }`}
                  >
                    <div className="flex items-center gap-[10px]">
                      <div className="bg-[#4b5940] rounded-full size-[32px] text-white text-[12px] font-bold flex items-center justify-center shrink-0">
                        {tech.initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#181d17] text-[13px] font-semibold">
                          {tech.name}
                        </span>
                        <span className="text-[#75786f] text-[11px]">
                          {tech.specialty}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#54624c] bg-[rgba(216,232,203,0.5)] px-[8px] py-[2px] rounded-full">
                      {tech.status}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes textarea */}
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[#181d17] text-[13px] font-semibold">
              توجيهات وملاحظات إضافية للفني:
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-[#f8faf6] border border-[#dfe4db] rounded-[12px] p-[12px] text-[13px] text-[#181d17] focus:outline-none focus:border-[#34422a] leading-relaxed resize-none"
              placeholder="اكتب التوجيهات الفنية المباشرة..."
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-[10px] pt-[8px] w-full">
            <button
              type="button"
              onClick={onClose}
              className="px-[16px] h-[40px] rounded-[10px] text-[13px] font-semibold text-[#454840] hover:bg-[#f1f5eb] transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#34422a] hover:bg-[#283320] text-white px-[20px] h-[40px] rounded-[10px] text-[13px] font-semibold transition-colors cursor-pointer"
            >
              تأكيد وحفظ الإسناد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
