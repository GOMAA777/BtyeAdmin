"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface CleaningAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (assignee: string, notes?: string) => void;
  taskNumber?: string;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
}

export function CleaningAssignModal({
  isOpen,
  onClose,
  onConfirm,
  taskNumber = "CL-10482",
  unitName = "الوحدة 204 (الطابق الثاني)",
  propertyName = "عمارة النخيل (الرياض - حي العليا)",
  ownerName = "محمد العتيبي",
}: CleaningAssignModalProps) {
  const confirm = useConfirm();
  const [selectedAssignee, setSelectedAssignee] = useState({
    name: "أحمد سالم",
    company: "شركة النقاء للتشغيل الفندقي",
    role: "مشرف تنظيف معتمد",
    rating: "4.9",
    status: "متاح حالياً",
    initials: "أس",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notes, setNotes] = useState(
    "يرجى فحص بطارية القفل الذكي والتأكد من إغلاق النوافذ والشرفات بعد انتهاء التهوية."
  );

  const availableSupervisors = [
    {
      name: "أحمد سالم",
      company: "شركة النقاء للتشغيل الفندقي",
      role: "مشرف تنظيف معتمد",
      rating: "4.9",
      status: "متاح حالياً",
      initials: "أس",
    },
    {
      name: "سعد الحربي",
      company: "مؤسسة اللمسة النقية للخدمات",
      role: "فني تنظيف معتمد",
      rating: "4.8",
      status: "متاح حالياً",
      initials: "سح",
    },
    {
      name: "طارق الغامدي",
      company: "شركة مدار الأفق لإدارة المرافق",
      role: "مشرف جودة وضيافة",
      rating: "4.95",
      status: "متاح حالياً",
      initials: "طغ",
    },
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedAssignee = `${selectedAssignee.name} (${selectedAssignee.company})`;
    const ok = await confirm({
      title: "تأكيد تعيين مسؤول التنظيف",
      message: `هل أنت متأكد من تعيين (${selectedAssignee.name}) لمهمة تنظيف (${unitName})؟ سيتم توليد كود دخول مؤقت وإرسال الإشعار آلياً.`,
      confirmLabel: "حفظ الإعداد",
      variant: "default",
    });
    if (!ok) return;

    onConfirm(formattedAssignee, notes);
    toast.success("تم تعيين مسؤول التنظيف وتوليد كود الدخول المؤقت بنجاح!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo">
      <div
        className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] w-full max-w-[540px] animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
        data-node-id="1:19524"
      >
        {/* MODAL HEADER */}
        <div className="bg-white content-stretch flex flex-col gap-[4px] items-start pb-[16px] pt-[24px] px-[24px] relative shrink-0 w-full">
          {/* Title Row with Close Button */}
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <h2 className="text-[#181d17] text-[24px] font-semibold leading-[34px] m-0">
              تعيين مسؤول التنظيف
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[36px] hover:bg-[#f1f5eb] text-[#75786f] hover:text-[#181d17] transition-colors cursor-pointer"
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

          {/* Subtitle Context & Metadata Badge Strip */}
          <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full">
            <div className="flex flex-wrap items-center gap-[6px] text-right">
              <span className="text-[#34422a] text-[11px] font-bold leading-[16px]">
                مهمة التنظيف: {taskNumber}
              </span>
              <span className="bg-[#c5c8bd] rounded-full size-[4px] shrink-0" />
              <span className="text-[#454840] text-[11px] font-medium leading-[16px]">
                {unitName} — {propertyName}
              </span>
              <span className="bg-[#c5c8bd] rounded-full size-[4px] shrink-0" />
              <span className="text-[#454840] text-[11px] font-medium leading-[16px]">
                المالك: {ownerName}
              </span>
            </div>
          </div>

          {/* Badge Strip */}
          <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-full">
            <div className="bg-[#ebefe6] content-stretch flex gap-[6px] items-center px-[8px] py-[2px] relative rounded-full shrink-0">
              <span className="text-[#454840] text-[11px] font-medium leading-[16px]">
                أولوية قياسية • مغادرة نزيل وتسليم فوري
              </span>
              <span className="bg-[#54624c] relative rounded-full shrink-0 size-[6px]" />
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="content-stretch flex flex-col h-px items-start px-[24px] relative shrink-0 w-full">
          <div className="bg-[#ebefe6] h-px relative shrink-0 w-full" />
        </div>

        {/* MODAL FORM BODY */}
        <form
          onSubmit={handleSubmit}
          className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative shrink-0 w-full"
        >
          {/* 1. Operational Context Summary Box */}
          <div className="bg-[#f1f5eb] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
            {/* Row 1 */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <span className="text-[#454840] text-[12px] font-semibold leading-[18px]">
                موقع الوحدة:
              </span>
              <span className="text-[#181d17] text-[12px] font-semibold leading-[18px]">
                {unitName}
              </span>
            </div>

            {/* Row 2 */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <span className="text-[#454840] text-[12px] font-semibold leading-[18px]">
                مدة التنظيف المستهدفة:
              </span>
              <span className="text-[#34422a] text-[12px] font-bold leading-[18px]">
                45 دقيقة (تبدأ فور الاستلام الميداني)
              </span>
            </div>

            {/* Row 3 */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <span className="text-[#454840] text-[12px] font-semibold leading-[18px]">
                حالة المهمة الحالية:
              </span>
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                <span className="bg-[#bccbb0] relative rounded-full shrink-0 size-[8px]" />
                <span className="text-[#5a6952] text-[12px] font-medium leading-[18px]">
                  بانتظار الإسناد الميداني
                </span>
              </div>
            </div>
          </div>

          {/* 2. Field: Field Operator Selection */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <label className="content-stretch flex gap-[4px] items-center relative shrink-0 cursor-pointer">
                <span className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                  المسؤول الميداني المكلف
                </span>
                <span className="text-[#ba1a1a] text-[14px] font-bold leading-[20px]">
                  *
                </span>
              </label>
              <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                3 متاحين حالياً في النطاق
              </span>
            </div>

            {/* Dropdown trigger */}
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="bg-white border border-[#dfe4db] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex h-[48px] items-center justify-between px-[16px] relative rounded-[12px] shrink-0 w-full text-right cursor-pointer hover:border-[#34422a] transition-all"
              >
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#4b5940] content-stretch flex items-center justify-center relative rounded-full shrink-0 size-[28px]">
                    <span className="text-[#bfcfaf] text-[12px] font-bold leading-none">
                      {selectedAssignee.initials}
                    </span>
                  </div>
                  <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 text-right">
                    <span className="text-[#181d17] text-[12px] font-semibold leading-[18px] whitespace-nowrap">
                      {selectedAssignee.name} ({selectedAssignee.company})
                    </span>
                    <span className="text-[#454840] text-[11px] font-medium leading-[16px] whitespace-nowrap">
                      {selectedAssignee.role} • ★ {selectedAssignee.rating} • {selectedAssignee.status}
                    </span>
                  </div>
                </div>

                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-[#75786f] transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M1 1L5.5 5.5L10 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Options list dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-[52px] inset-x-0 bg-white border border-[#dfe4db] rounded-[12px] shadow-lg z-20 overflow-hidden divide-y divide-[#f1f5eb]">
                  {availableSupervisors.map((sup) => (
                    <button
                      key={sup.name}
                      type="button"
                      onClick={() => {
                        setSelectedAssignee(sup);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-[16px] py-[10px] flex items-center justify-between hover:bg-[#f1f5eb] transition-colors cursor-pointer text-right"
                    >
                      <div className="flex items-center gap-[8px]">
                        <div className="bg-[#4b5940] flex items-center justify-center rounded-full size-[28px] text-[#bfcfaf] font-bold text-[12px]">
                          {sup.initials}
                        </div>
                        <div>
                          <p className="text-[#181d17] text-[12px] font-semibold leading-[18px]">
                            {sup.name} ({sup.company})
                          </p>
                          <p className="text-[#454840] text-[11px] font-medium leading-[16px]">
                            {sup.role} • ★ {sup.rating} • {sup.status}
                          </p>
                        </div>
                      </div>
                      {selectedAssignee.name === sup.name && (
                        <span className="size-[8px] rounded-full bg-[#34422a]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0 w-full">
              <p className="text-[#75786f] text-[11px] font-medium leading-[16px] text-right m-0">
                سيتم إرسال إشعار فوري وتصريح كود الدخول المؤقت عبر تطبيق المشغل فور التعيين.
              </p>
            </div>
          </div>

          {/* 3. Field: Special Instructions (Notes) */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <label className="text-right cursor-pointer">
                <span className="text-[#181d17] text-[14px] font-semibold leading-[20px]">
                  ملاحظات وتوجيهات خاصة{" "}
                </span>
                <span className="text-[#75786f] text-[11px] font-normal leading-[16px]">
                  (اختياري)
                </span>
              </label>
              <span className="text-[#75786f] text-[11px] font-medium leading-[16px]">
                تعليمات موجهة للطاقم الميداني
              </span>
            </div>

            <div className="content-stretch flex flex-col items-start pb-[6px] relative shrink-0 w-full">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="bg-white border border-[#e5eae0] content-stretch flex items-start overflow-auto p-[16px] relative rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full text-[#181d17] text-[13px] font-normal leading-[20px] text-right focus:outline-none focus:ring-1 focus:ring-[#34422a] resize-none"
                placeholder="اكتب التوجيهات هنا..."
              />
            </div>
          </div>

          {/* 4. Automated Action Notice (Operational Workflow Info) */}
          <div className="bg-[#e5eae0] rounded-[12px] p-[16px] flex items-start justify-between gap-[12px] w-full">
            <div className="flex flex-col gap-[2px] items-start text-right flex-1">
              <span className="text-[#181d17] text-[13px] font-semibold leading-[20px]">
                الإجراءات الآلية عند التأكيد:
              </span>
              <p className="text-[#454840] text-[13px] font-normal leading-[21.13px] m-0">
                يتم تحديث المسؤول إلى{" "}
                <span className="font-semibold text-[#181d17]">
                  [{selectedAssignee.name}]
                </span>
                ، وتوليد كود دخول إلكتروني مؤقت صالح لمدة ساعتين، مع تسجيل رسمي في سجل نشاط المهمة:{" "}
                <span className="font-medium text-[#454840]">
                  &ldquo;تم تعيين مهمة التنظيف إلى {selectedAssignee.name}&rdquo;
                </span>
                .
              </p>
            </div>

            <div className="bg-[#dfe4db] flex items-center justify-center rounded-[8px] shrink-0 size-[28px] mt-0.5">
              <svg
                width="17.25"
                height="9"
                viewBox="0 0 17.25 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M4.5 6C4.0875 6 3.73438 5.85312 3.44062 5.55937C3.14687 5.26562 3 4.9125 3 4.5C3 4.0875 3.14687 3.73438 3.44062 3.44062C3.73438 3.14687 4.0875 3 4.5 3C4.9125 3 5.26562 3.14687 5.55937 3.44062C5.85312 3.73438 6 4.0875 6 4.5C6 4.9125 5.85312 5.26562 5.55937 5.55937C5.26562 5.85312 4.9125 6 4.5 6V6M4.5 9C3.25 9 2.1875 8.5625 1.3125 7.6875C0.4375 6.8125 0 5.75 0 4.5C0 3.25 0.4375 2.1875 1.3125 1.3125C2.1875 0.4375 3.25 0 4.5 0C5.3375 0 6.09687 0.20625 6.77812 0.61875C7.45937 1.03125 8 1.575 8.4 2.25H15L17.25 4.5L13.875 7.875L12.375 6.75L10.875 7.875L9.28125 6.75H8.4C8 7.425 7.45937 7.96875 6.77812 8.38125C6.09687 8.79375 5.3375 9 4.5 9V9M4.5 7.5C5.2 7.5 5.81563 7.2875 6.34688 6.8625C6.87813 6.4375 7.23125 5.9 7.40625 5.25H9.75L10.8375 6.01875L12.375 4.875L13.7063 5.90625L15.1125 4.5L14.3625 3.75H7.40625C7.23125 3.1 6.87813 2.5625 6.34688 2.1375C5.81563 1.7125 5.2 1.5 4.5 1.5C3.675 1.5 2.96875 1.79375 2.38125 2.38125C1.79375 2.96875 1.5 3.675 1.5 4.5C1.5 5.325 1.79375 6.03125 2.38125 6.61875C2.96875 7.20625 3.675 7.5 4.5 7.5V7.5"
                  fill="#34422A"
                />
              </svg>
            </div>
          </div>

          {/* MODAL FOOTER ACTIONS */}
          <div className="content-stretch flex gap-[16px] items-center pt-[8px] relative shrink-0 w-full">
            <button
              type="submit"
              className="bg-[#34422a] hover:bg-[#283320] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] h-[44px] items-center justify-center px-[28px] relative rounded-[12px] shrink-0 text-white font-semibold text-[14px] transition-colors cursor-pointer"
            >
              <span>حفظ الإعداد</span>
              <svg
                width="16.67"
                height="16.67"
                viewBox="0 0 16.6667 16.6667"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M7.16667 12.1667L13.0417 6.29167L11.875 5.125L7.16667 9.83333L4.79167 7.45833L3.625 8.625L7.16667 12.1667V12.1667M8.33333 16.6667C7.18056 16.6667 6.09722 16.4479 5.08333 16.0104C4.06944 15.5729 3.1875 14.9792 2.4375 14.2292C1.6875 13.4792 1.09375 12.5972 0.65625 11.5833C0.21875 10.5694 0 9.48611 0 8.33333C0 7.18056 0.21875 6.09722 0.65625 5.08333C1.09375 4.06944 1.6875 3.1875 2.4375 2.4375C3.1875 1.6875 4.06944 1.09375 5.08333 0.65625C6.09722 0.21875 7.18056 0 8.33333 0C9.48611 0 10.5694 0.21875 11.5833 0.65625C12.5972 1.09375 13.4792 1.6875 14.2292 2.4375C14.9792 3.1875 15.5729 4.06944 16.0104 5.08333C16.4479 6.09722 16.6667 7.18056 16.6667 8.33333C16.6667 9.48611 16.4479 10.5694 16.0104 11.5833C15.5729 12.5972 14.9792 13.4792 14.2292 14.2292C13.4792 14.9792 12.5972 15.5729 11.5833 16.0104C10.5694 16.4479 9.48611 16.6667 8.33333 16.6667V16.6667M8.33333 15C10.1944 15 11.7708 14.3542 13.0625 13.0625C14.3542 11.7708 15 10.1944 15 8.33333C15 6.47222 14.3542 4.89583 13.0625 3.60417C11.7708 2.3125 10.1944 1.66667 8.33333 1.66667C6.47222 1.66667 4.89583 2.3125 3.60417 3.60417C2.3125 4.89583 1.66667 6.47222 1.66667 8.33333C1.66667 10.1944 2.3125 11.7708 3.60417 13.0625C4.89583 14.3542 6.47222 15 8.33333 15V15"
                  fill="white"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-[20px] py-[10px] rounded-[12px] text-[#75786f] hover:text-[#181d17] font-semibold text-[14px] transition-colors cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
