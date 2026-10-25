"use client";

import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";

interface CleaningStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskNumber?: string;
  unitName?: string;
  propertyName?: string;
  ownerName?: string;
  assigneeName?: string;
}

export function CleaningStartModal({
  isOpen,
  onClose,
  onConfirm,
  taskNumber = "CL-10482",
  unitName = "الوحدة 204 (الطابق الثاني)",
  propertyName = "عمارة النخيل — الرياض (حي العليا)",
  ownerName = "محمد العتيبي (OWN-4491)",
  assigneeName = "أحمد سالم",
}: CleaningStartModalProps) {
  const confirm = useConfirm();

  if (!isOpen) return null;

  const handleStart = async () => {
    const ok = await confirm({
      title: "تأكيد بدء مهمة التنظيف",
      message: `هل أنت متأكد من بدء تنفيذ مهمة التنظيف (${taskNumber}) لـ ${unitName}؟ سيتم تفعيل كود الدخول الذكي وبدء احتساب مؤشر SLA.`,
      confirmLabel: "بدء التنظيف",
      variant: "default",
    });
    if (!ok) return;

    onConfirm();
    toast.success("تم بدء مهمة التنظيف وتفعيل كود الدخول الذكي للطاقم!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-cairo">
      <div
        className="bg-white content-stretch flex flex-col gap-[16px] items-start p-[24px] relative rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-[540px] animate-in fade-in zoom-in-95 duration-200"
        dir="rtl"
        data-node-id="1:19627"
      >
        {/* Modal Top Header Strip */}
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <h3 className="text-[#181d17] text-[24px] font-semibold tracking-[-0.4px] leading-[24px] m-0">
            بدء التنظيف
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#f1f5eb] hover:bg-[#e5eae0] content-stretch flex h-[32px] w-[32px] items-center justify-center relative rounded-[8px] shrink-0 text-[#75786f] hover:text-[#181d17] transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 10.5 10.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M1.05 10.5L0 9.45L4.2 5.25L0 1.05L1.05 0L5.25 4.2L9.45 0L10.5 1.05L6.3 5.25L10.5 9.45L9.45 10.5L5.25 6.3L1.05 10.5V10.5"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Structured Context Summary Box */}
        <div className="bg-[#f1f5eb] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
          {/* Row 1: Unit & Property */}
          <div className="content-stretch flex gap-[8px] items-start justify-between pb-[4px] relative shrink-0 w-full">
            {/* Right col */}
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px text-right">
              <span className="text-[#75786f] text-[14px] md:text-[16px] font-normal leading-[24px]">
                الوحدة المستهدفة
              </span>
              <span className="text-[#181d17] text-[14px] md:text-[16px] font-bold leading-[24px]">
                {unitName}
              </span>
            </div>

            {/* Left col */}
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px text-right">
              <span className="text-[#75786f] text-[14px] md:text-[16px] font-normal leading-[24px]">
                العقار والموقع
              </span>
              <span className="text-[#181d17] text-[14px] md:text-[16px] font-medium leading-[24px]">
                {propertyName}
              </span>
            </div>
          </div>

          <div className="bg-[#dfe4db] h-px relative shrink-0 w-full" />

          {/* Row 2: Owner & Task Ref */}
          <div className="content-stretch flex gap-[8px] items-start justify-between py-[4px] relative shrink-0 w-full">
            {/* Right col */}
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px text-right">
              <span className="text-[#75786f] text-[14px] md:text-[16px] font-normal leading-[24px]">
                المالك المسجل
              </span>
              <div className="text-[14px] md:text-[16px] leading-[24px]">
                <span className="font-semibold text-[#181d17]">
                  {ownerName.split("(")[0]?.trim()}
                </span>{" "}
                <span className="font-normal text-[#75786f]">
                  ({ownerName.includes("(") ? ownerName.split("(")[1]?.replace(")", "") : "OWN-4491"})
                </span>
              </div>
            </div>

            {/* Left col */}
            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px text-right">
              <span className="text-[#75786f] text-[14px] md:text-[16px] font-normal leading-[24px]">
                رقم أمر العمل
              </span>
              <div className="text-[14px] md:text-[16px] leading-[24px]">
                <span className="font-bold text-[#34422a]">{taskNumber} </span>
                <span className="text-[#75786f] text-[12px] font-normal">
                  (مغادرة وتسليم فوري)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#dfe4db] h-px relative shrink-0 w-full" />

          {/* Row 3: Assigned Supervisor */}
          <div className="content-stretch flex items-center justify-between pt-[4px] relative shrink-0 w-full">
            <span className="text-[#75786f] text-[14px] md:text-[16px] font-normal leading-[24px]">
              المسؤول المكلف بالمباشرة:
            </span>

            <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
              <div className="bg-[#dfe4db] content-stretch flex items-center px-[8px] py-[2px] relative rounded-full shrink-0">
                <span className="text-[#454840] text-[11px] font-medium leading-[16.5px]">
                  مشرف تنظيف معتمد
                </span>
              </div>
              <span className="text-[#181d17] text-[14px] md:text-[16px] font-bold leading-[24px]">
                {assigneeName}
              </span>
              <div className="bg-[#34422a] content-stretch flex items-center justify-center relative rounded-full shrink-0 size-[24px]">
                <span className="text-[11px] font-bold text-center text-white leading-none">
                  أس
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Impact & Governance Notice (صندوق الأثر التشغيلي) */}
        <div className="bg-[rgba(216,232,203,0.4)] content-stretch flex flex-col gap-[8px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full">
          <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
            <div className="h-[15px] relative shrink-0 w-[12px]">
              <svg
                width="12"
                height="15"
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M5.2125 10.1625L9.45 5.925L8.38125 4.85625L5.2125 8.025L3.6375 6.45L2.56875 7.51875L5.2125 10.1625V10.1625M6 15C4.2625 14.5625 2.82812 13.5656 1.69687 12.0094C0.565625 10.4531 0 8.725 0 6.825V2.25L6 0L12 2.25V6.825C12 8.725 11.4344 10.4531 10.3031 12.0094C9.17188 13.5656 7.7375 14.5625 6 15V15M6 13.425C7.3 13.0125 8.375 12.1875 9.225 10.95C10.075 9.7125 10.5 8.3375 10.5 6.825V3.28125L6 1.59375L1.5 3.28125V6.825C1.5 8.3375 1.925 9.7125 2.775 10.95C3.625 12.1875 4.7 13.0125 6 13.425V13.425M6 7.5V7.5V7.5V7.5V7.5V7.5V7.5V7.5V7.5V7.5"
                  fill="#34422A"
                />
              </svg>
            </div>
            <span className="text-[#34422a] text-[15px] md:text-[16px] font-bold leading-[24px]">
              الأثر التشغيلي عند التأكيد:
            </span>
          </div>

          <div className="content-stretch flex flex-col gap-[6px] items-start pr-[4px] relative shrink-0 w-full text-right">
            {/* Item 1 */}
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
              <div className="bg-[#34422a] relative rounded-full shrink-0 size-[6px] mt-[9px]" />
              <p className="text-[#454840] text-[14px] md:text-[16px] font-normal leading-[24px] m-0">
                تحديث حالة المهمة فوراً إلى:{" "}
                <span className="font-bold text-[#181d17]">«جاري التنظيف»</span>{" "}
                (تسجيل وقت البدء: 18 سبتمبر 2026 - 12:25 م).
              </p>
            </div>

            {/* Item 2 */}
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
              <div className="bg-[#34422a] relative rounded-full shrink-0 size-[6px] mt-[9px]" />
              <p className="text-[#454840] text-[14px] md:text-[16px] font-normal leading-[24px] m-0">
                إدراج قيد رسمي في سجل نشاط العقار:{" "}
                <span className="font-bold text-[#181d17]">
                  «بدأ {assigneeName} تنفيذ مهمة التنظيف.»
                </span>
              </p>
            </div>

            {/* Item 3 */}
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
              <div className="bg-[#34422a] relative rounded-full shrink-0 size-[6px] mt-[9px]" />
              <p className="text-[#454840] text-[14px] md:text-[16px] font-normal leading-[24px] m-0">
                حالة {unitName.split("(")[0]?.trim()} بالمنظومة المركزية:{" "}
                <span className="font-bold text-[#181d17]">«تحت التنظيف»</span>{" "}
                (محظورة برمجياً من الحجز والاستقبال حتى اكتمال كافة بنود الفحص).
              </p>
            </div>

            {/* Item 4 */}
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
              <div className="bg-[#34422a] relative rounded-full shrink-0 size-[6px] mt-[9px]" />
              <p className="text-[#454840] text-[14px] md:text-[16px] font-normal leading-[24px] m-0">
                تفعيل كود الدخول الرقمي الذكي المخصص لطاقم التنظيف تلقائياً وصلاحيته{" "}
                <span className="font-bold text-[#181d17]">ساعتين</span> من الآن.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="content-stretch flex gap-[8px] items-center pt-[4px] relative shrink-0 w-full">
          <button
            type="button"
            onClick={handleStart}
            className="bg-[#34422a] hover:bg-[#283320] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-[8px] items-center px-[24px] py-[10px] relative rounded-[12px] shrink-0 text-white text-[15px] md:text-[16px] font-normal transition-colors cursor-pointer"
          >
            <span>بدء التنظيف</span>
            <svg
              width="8.25"
              height="10.5"
              viewBox="0 0 8.25 10.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M0 10.5V0L8.25 5.25L0 10.5V10.5M1.5 5.25V5.25V5.25V5.25V5.25M1.5 7.7625L5.4375 5.25L1.5 2.7375V7.7625V7.7625"
                fill="white"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-white hover:bg-[#f1f5eb] text-[#75786f] hover:text-[#181d17] content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[12px] shrink-0 text-[15px] md:text-[16px] font-normal transition-colors cursor-pointer"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
