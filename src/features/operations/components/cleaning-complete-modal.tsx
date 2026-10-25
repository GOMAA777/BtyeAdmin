"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface CleaningCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes?: string) => void;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
  assigneeName?: string;
}

export function CleaningCompleteModal({
  isOpen,
  onClose,
  onConfirm,
  unitName = "الوحدة 204 (الطابق الثاني)",
  propertyName = "عمارة النخيل — حي العليا",
  ownerName = "محمد العتيبي (OWN-4491)",
  assigneeName = "أحمد سالم (مشرف معتمد — النقاء)",
}: CleaningCompleteModalProps) {
  const confirm = useConfirm();
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "تأكيد اكتمال التنظيف واعتماد الجاهزية",
      message: `هل أنت متأكد من اكتمال مهام التنظيف لـ (${unitName} — ${propertyName})؟ سيتم تحويل حالة الوحدة فورياً إلى «متاحة» في التقويم المركزي.`,
      confirmLabel: "تأكيد اكتمال التنظيف",
      variant: "default",
    });
    if (!ok) return;

    onConfirm(notes);
    toast.success("تم تأكيد اكتمال التنظيف واعتماد جاهزية الوحدة تلقائياً!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo">
      <div
        className="bg-white content-stretch flex flex-col items-start p-[24px] relative rounded-[16px] shadow-[0px_20px_45px_-10px_rgba(43,51,38,0.22)] w-full max-w-[580px] animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
        data-node-id="1:19721"
      >
        {/* MODAL HEADER */}
        <div className="content-stretch flex items-center justify-between pb-[4px] relative shrink-0 w-full">
          <h2 className="text-[#181d17] text-[24px] font-semibold tracking-[-0.4px] leading-[24px] m-0">
            تأكيد اكتمال التنظيف
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="content-stretch flex items-center justify-center rounded-[12px] size-[36px] hover:bg-[#f1f5eb] text-[#75786f] hover:text-[#181d17] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 11.6667 11.6667"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M1.16667 11.6667L0 10.5L4.66667 5.83333L0 1.16667L1.16667 0L5.83333 4.66667L10.5 0L11.6667 1.16667L7 5.83333L11.6667 10.5L10.5 11.6667L5.83333 7L1.16667 11.6667V11.6667"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* CONTEXT SUMMARY CARD */}
        <div className="content-stretch flex flex-col items-start py-[12px] relative shrink-0 w-full">
          <div className="bg-[#f1f5eb] content-stretch flex flex-col gap-[10px] items-center p-[16px] relative rounded-[12px] shrink-0 w-full">
            {/* Header */}
            <div className="content-stretch flex items-center justify-start relative shrink-0 w-full">
              <span className="text-[#181d17] text-[16px] font-bold leading-[24px]">
                ملخص المهمة الميدانية
              </span>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-2 gap-x-[16px] gap-y-[12px] relative shrink-0 w-full text-right">
              {/* Row 1 Col 1 (Right in RTL) */}
              <div className="content-stretch flex flex-col items-start">
                <span className="text-[#54624c] text-[16px] font-normal leading-[24px]">
                  الوحدة المستهدفة
                </span>
                <span className="text-[#181d17] text-[16px] font-bold leading-[24px]">
                  {unitName}
                </span>
              </div>

              {/* Row 1 Col 2 (Left in RTL) */}
              <div className="content-stretch flex flex-col items-start">
                <span className="text-[#54624c] text-[16px] font-normal leading-[24px]">
                  الأصل العقاري
                </span>
                <span className="text-[#181d17] text-[16px] font-bold leading-[24px]">
                  {propertyName}
                </span>
              </div>

              {/* Row 2 Col 1 (Right in RTL) */}
              <div className="content-stretch flex flex-col items-start">
                <span className="text-[#54624c] text-[16px] font-normal leading-[24px]">
                  المالك المسجل
                </span>
                <span className="text-[#181d17] text-[16px] font-medium leading-[24px]">
                  {ownerName}
                </span>
              </div>

              {/* Row 2 Col 2 (Left in RTL) */}
              <div className="content-stretch flex flex-col items-start">
                <span className="text-[#54624c] text-[16px] font-normal leading-[24px]">
                  نوع الإجراء المعتمد
                </span>
                <span className="text-[#181d17] text-[16px] font-medium leading-[24px]">
                  مغادرة وتسليم فوري
                </span>
              </div>

              {/* Bottom Row Inner Box */}
              <div className="col-span-2 bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col items-start p-[10px] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                  <span className="text-[#54624c] text-[16px] font-normal leading-[24px]">
                    المسؤول المنفذ:
                  </span>
                  <span className="text-[#181d17] text-[16px] font-semibold leading-[24px]">
                    {assigneeName}
                  </span>
                </div>
                <div className="content-stretch flex items-center justify-between pt-[4px] relative shrink-0 w-full">
                  <span className="text-[#54624c] text-[16px] font-normal leading-[24px]">
                    وقت البدء والمدة:
                  </span>
                  <span className="text-[#34422a] text-[16px] font-bold leading-[24px]">
                    18 سبتمبر 2026 - 12:25 م (مدة العمل: 42 دقيقة)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OPERATIONAL IMPACT & AUTOMATION GOVERNANCE BOX */}
        <div className="content-stretch flex flex-col items-start pb-[12px] relative shrink-0 w-full">
          <div className="bg-[#e5eae0] content-stretch flex flex-col gap-[8px] items-start p-[14px] relative rounded-[12px] shrink-0 w-full">
            {/* Header */}
            <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
              <div className="h-[14.25px] relative shrink-0 w-[13.5px]">
                <svg
                  width="13.5"
                  height="14.25"
                  viewBox="0 0 13.5 14.25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M0 14.25V12.75H9V14.25H0V14.25M4.2375 10.6125L0 6.375L1.575 4.7625L5.85 9L4.2375 10.6125V10.6125M9 5.85L4.7625 1.575L6.375 0L10.6125 4.2375L9 5.85V5.85M12.45 13.5L2.6625 3.7125L3.7125 2.6625L13.5 12.45L12.45 13.5V13.5"
                    fill="#34422A"
                  />
                </svg>
              </div>
              <span className="text-[#34422a] text-[16px] font-bold leading-[24px]">
                الحوكمة التشغيلية والأتمتة النظامية
              </span>
            </div>

            {/* List */}
            <div className="content-stretch flex flex-col gap-[6px] items-start pr-[4px] relative shrink-0 w-full text-right">
              {/* Item 1 */}
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <div className="h-[15.33px] relative shrink-0 w-[13.33px] mt-1">
                  <svg
                    width="13.33"
                    height="15.33"
                    viewBox="0 0 13.3333 15.3333"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M6.7 13.3333L8.6 11.45L6.7 9.56667L6 10.2667L6.71667 10.9833C6.40556 10.9944 6.10278 10.9444 5.80833 10.8333C5.51389 10.7222 5.25 10.55 5.01667 10.3167C4.79444 10.0944 4.625 9.83889 4.50833 9.55C4.39167 9.26111 4.33333 8.97222 4.33333 8.68333C4.33333 8.49444 4.35833 8.30556 4.40833 8.11667C4.45833 7.92778 4.52778 7.74444 4.61667 7.56667L3.88333 6.83333C3.69444 7.11111 3.55556 7.40556 3.46667 7.71667C3.37778 8.02778 3.33333 8.34444 3.33333 8.66667C3.33333 9.08889 3.41667 9.50556 3.58333 9.91667C3.75 10.3278 3.99444 10.6944 4.31667 11.0167C4.63889 11.3389 5 11.5806 5.4 11.7417C5.8 11.9028 6.21111 11.9889 6.63333 12L6 12.6333L6.7 13.3333V13.3333M9.45 10.5C9.63889 10.2222 9.77778 9.92778 9.86667 9.61667C9.95556 9.30556 10 8.98889 10 8.66667C10 8.24444 9.91944 7.825 9.75833 7.40833C9.59722 6.99167 9.35556 6.62222 9.03333 6.3C8.71111 5.97778 8.34722 5.73889 7.94167 5.58333C7.53611 5.42778 7.12222 5.35 6.7 5.35L7.33333 4.7L6.63333 4L4.73333 5.88333L6.63333 7.76667L7.33333 7.06667L6.6 6.33333C6.9 6.33333 7.20556 6.39167 7.51667 6.50833C7.82778 6.625 8.09444 6.79444 8.31667 7.01667C8.53889 7.23889 8.70833 7.49444 8.825 7.78333C8.94167 8.07222 9 8.36111 9 8.65C9 8.83889 8.975 9.02778 8.925 9.21667C8.875 9.40556 8.80556 9.58889 8.71667 9.76667L9.45 10.5V10.5M6.66667 15.3333C5.74444 15.3333 4.87778 15.1583 4.06667 14.8083C3.25556 14.4583 2.55 13.9833 1.95 13.3833C1.35 12.7833 0.875 12.0778 0.525 11.2667C0.175 10.4556 0 9.58889 0 8.66667C0 7.74444 0.175 6.87778 0.525 6.06667C0.875 5.25556 1.35 4.55 1.95 3.95C2.55 3.35 3.25556 2.875 4.06667 2.525C4.87778 2.175 5.74444 2 6.66667 2C7.58889 2 8.45555 2.175 9.26667 2.525C10.0778 2.875 10.7833 3.35 11.3833 3.95C11.9833 4.55 12.4583 5.25556 12.8083 6.06667C13.1583 6.87778 13.3333 7.74444 13.3333 8.66667C13.3333 9.58889 13.1583 10.4556 12.8083 11.2667C12.4583 12.0778 11.9833 12.7833 11.3833 13.3833C10.7833 13.9833 10.0778 14.4583 9.26667 14.8083C8.45555 15.1583 7.58889 15.3333 6.66667 15.3333V15.3333M6.66667 14C8.15556 14 9.41667 13.4833 10.45 12.45C11.4833 11.4167 12 10.1556 12 8.66667C12 7.17778 11.4833 5.91667 10.45 4.88333C9.41667 3.85 8.15556 3.33333 6.66667 3.33333C5.17778 3.33333 3.91667 3.85 2.88333 4.88333C1.85 5.91667 1.33333 7.17778 1.33333 8.66667C1.33333 10.1556 1.85 11.4167 2.88333 12.45C3.91667 13.4833 5.17778 14 6.66667 14V14M6.66667 8.66667V8.66667V8.66667V8.66667V8.66667V8.66667V8.66667V8.66667V8.66667V8.66667"
                      fill="#34422A"
                    />
                  </svg>
                </div>
                <p className="text-[#454840] text-[16px] font-normal leading-[24px] m-0">
                  <span className="font-semibold text-[#181d17]">تحديث حالة المهمة: </span>
                  تتحول فوراً إلى مكتملة مع قيد زمن الإكمال الفعلي (18 سبتمبر 2026 - 01:07 م)
                </p>
              </div>

              {/* Item 2 */}
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <div className="h-[14px] relative shrink-0 w-[14.67px] mt-1">
                  <svg
                    width="14.67"
                    height="14"
                    viewBox="0 0 14.6667 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M6.61667 9.36667L10.4 5.6L9.45 4.65L6.61667 7.48333L5.2 6.06667L4.26667 7L6.61667 9.36667V9.36667M0 14V12.6667H14.6667V14H0V14M2 12C1.63333 12 1.31944 11.8694 1.05833 11.6083C0.797222 11.3472 0.666667 11.0333 0.666667 10.6667V3.33333C0.666667 2.96667 0.797222 2.65278 1.05833 2.39167C1.31944 2.13056 1.63333 2 2 2H12.6667C13.0333 2 13.3472 2.13056 13.6083 2.39167C13.8694 2.65278 14 2.96667 14 3.33333V10.6667C14 11.0333 13.8694 11.3472 13.6083 11.6083C13.3472 11.8694 13.0333 12 12.6667 12H2V12M2 10.6667H12.6667V10.6667V10.6667V3.33333V3.33333V3.33333H2V3.33333V3.33333V10.6667V10.6667V10.6667V10.6667M2 10.6667V10.6667V10.6667V3.33333V3.33333V3.33333V3.33333V3.33333V3.33333V10.6667V10.6667V10.6667V10.6667V10.6667"
                      fill="#34422A"
                    />
                  </svg>
                </div>
                <p className="text-[#454840] text-[16px] font-normal leading-[24px] m-0">
                  <span className="font-semibold text-[#181d17]">حوكمة حالة الوحدة: </span>
                  تتحول الوحدة 204 تلقائياً إلى متاحة في محركات الحجز (لعدم وجود تعارض مع حجوزات قادمة فورية أو بلاغات صيانة نشطة). لا يُسمح بتعديل الحالة يدوياً.
                </p>
              </div>

              {/* Item 3 */}
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <div className="h-[15.33px] relative shrink-0 w-[12px] mt-1">
                  <svg
                    width="12"
                    height="15.33"
                    viewBox="0 0 12 15.3333"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M5.06667 12.0333L9.76667 7.33333L8.83333 6.4L5.06667 10.1667L3.16667 8.26667L2.23333 9.2L5.06667 12.0333V12.0333M1.33333 15.3333C0.966667 15.3333 0.652778 15.2028 0.391667 14.9417C0.130556 14.6806 0 14.3667 0 14V4.66667C0 4.3 0.130556 3.98611 0.391667 3.725C0.652778 3.46389 0.966667 3.33333 1.33333 3.33333H4.13333C4.27778 2.93333 4.51944 2.61111 4.85833 2.36667C5.19722 2.12222 5.57778 2 6 2C6.42222 2 6.80278 2.12222 7.14167 2.36667C7.48056 2.61111 7.72222 2.93333 7.86667 3.33333H10.6667C11.0333 3.33333 11.3472 3.46389 11.6083 3.725C11.8694 3.98611 12 4.3 12 4.66667V14C12 14.3667 11.8694 14.6806 11.6083 14.9417C11.3472 15.2028 11.0333 15.3333 10.6667 15.3333H1.33333V15.3333M1.33333 14H10.6667V14V14V4.66667V4.66667V4.66667H1.33333V4.66667V4.66667V14V14V14V14M6 4.16667C6.14444 4.16667 6.26389 4.11944 6.35833 4.025C6.45278 3.93056 6.5 3.81111 6.5 3.66667C6.5 3.52222 6.45278 3.40278 6.35833 3.30833C6.26389 3.21389 6.14444 3.16667 6 3.16667C5.85556 3.16667 5.73611 3.21389 5.64167 3.30833C5.54722 3.40278 5.5 3.52222 5.5 3.66667C5.5 3.81111 5.54722 3.93056 5.64167 4.025C5.73611 4.11944 5.85556 4.16667 6 4.16667V4.16667M1.33333 14V14V14V4.66667V4.66667V4.66667V4.66667V4.66667V4.66667V14V14V14V14V14"
                      fill="#34422A"
                    />
                  </svg>
                </div>
                <p className="text-[#454840] text-[16px] font-normal leading-[24px] m-0">
                  <span className="font-semibold text-[#181d17]">قيد السجل الرسمي: </span>
                  إدراج توثيق دائم في سجل التدقيق: تم إكمال مهمة التنظيف بواسطة أحمد سالم واعتماد جاهزية الوحدة.
                </p>
              </div>

              {/* Item 4 */}
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                <div className="h-[15.15px] relative shrink-0 w-[15.33px] mt-1">
                  <svg
                    width="15.33"
                    height="15.15"
                    viewBox="0 0 15.3333 15.15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M12.5 15.15L7.46667 10.1167V10.1167C7.11111 10.7167 6.62778 11.1972 6.01667 11.5583C5.40556 11.9194 4.73333 12.1 4 12.1C2.88889 12.1 1.94444 11.7111 1.16667 10.9333C0.388889 10.1556 0 9.21111 0 8.1C0 7.36667 0.180556 6.69444 0.541667 6.08333C0.902778 5.47222 1.38333 4.98889 1.98333 4.63333L0.283333 2.93333L1.23333 2L13.4333 14.2167L12.5 15.15V15.15M13.3333 6.1L15.3333 8.1L12.2833 11.15L10.1667 9.05V9.05V9.05L11 8.43333L12.2 9.33333L13.45 8.1L12.7833 7.43333H8.55L7.21667 6.1H13.3333V6.1M4 10.7667C4.56667 10.7667 5.06944 10.6139 5.50833 10.3083C5.94722 10.0028 6.26667 9.60556 6.46667 9.11667V9.11667C6.12222 8.77222 5.81111 8.46111 5.53333 8.18333C5.25556 7.90556 4.98611 7.63611 4.725 7.375C4.46389 7.11389 4.19444 6.84444 3.91667 6.56667C3.63889 6.28889 3.32778 5.97778 2.98333 5.63333C2.49444 5.83333 2.09722 6.15278 1.79167 6.59167C1.48611 7.03056 1.33333 7.53333 1.33333 8.1C1.33333 8.83333 1.59444 9.46111 2.11667 9.98333C2.63889 10.5056 3.26667 10.7667 4 10.7667V10.7667M4 9.43333C3.63333 9.43333 3.31944 9.30278 3.05833 9.04167C2.79722 8.78056 2.66667 8.46667 2.66667 8.1C2.66667 7.73333 2.79722 7.41944 3.05833 7.15833C3.31944 6.89722 3.63889 6.76667 4 6.76667C4.36667 6.76667 4.68056 6.89722 4.94167 7.15833C5.20278 7.41944 5.33333 7.73333 5.33333 8.1V8.1C5.33333 8.46667 5.20278 8.78056 4.94167 9.04167C4.68056 9.30278 4.36667 9.43333 4 9.43333V9.43333"
                      fill="#34422A"
                    />
                  </svg>
                </div>
                <p className="text-[#454840] text-[16px] font-normal leading-[24px] m-0">
                  <span className="font-semibold text-[#181d17]">الأقفال الذكية: </span>
                  إلغاء صلاحية كود الدخول المؤقت لطاقم التنظيف تلقائياً وبشكل فوري بمجرد إغلاق الباب.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OPTIONAL FIELD: OPERATIONAL NOTES */}
        <form onSubmit={handleComplete} className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
          <label className="text-[#181d17] text-[16px] font-semibold leading-[24px] text-right block">
            ملاحظات إضافية (اختياري)
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="bg-[#f1f5eb] border border-transparent focus:border-[#34422a] focus:bg-white content-stretch flex flex-col items-start overflow-auto px-[14px] py-[10px] relative rounded-[12px] shrink-0 w-full text-[#181d17] placeholder:text-[#54624c] text-[16px] leading-[24px] font-normal text-right focus:outline-none resize-none transition-colors"
            placeholder="أضف أي ملاحظات تشغيلية أو تنبيهات متعلقة بسلامة الوحدة (مثال: تم إغلاق النوافذ، فحص بطارية القفل، إلخ)..."
          />

          {/* MODAL ACTION BUTTONS */}
          <div className="content-stretch flex gap-[8px] items-center pt-[8px] relative shrink-0 w-full">
            <button
              type="submit"
              className="bg-[#34422a] hover:bg-[#283320] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[24px] py-[10px] rounded-[12px] text-white text-[16px] font-normal transition-colors cursor-pointer"
            >
              <span>تأكيد اكتمال التنظيف</span>
              <svg
                width="14"
                height="10"
                viewBox="0 0 13.5833 10.0208"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M4.75 10.0208L0 5.27083L1.1875 4.08333L4.75 7.64583L12.3958 0L13.5833 1.1875L4.75 10.0208V10.0208"
                  fill="white"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="content-stretch flex items-center justify-center px-[20px] py-[10px] rounded-[12px] text-[#54624c] hover:text-[#181d17] hover:bg-[#f1f5eb] text-[16px] font-normal transition-colors cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
