"use client";

import { BadgeCheck, CreditCard } from "lucide-react";
import { SectionCard, InfoPanel } from "./ui";

interface PricingCardProps {
  price?: string;
  setPrice?: (val: string) => void;
  billingCycle?: "night" | "month";
  setBillingCycle?: (val: "night" | "month") => void;
}

export function PricingCard({
  price = "320",
  setPrice,
  billingCycle = "night",
  setBillingCycle,
}: PricingCardProps) {
  return (
    <SectionCard
      number="٤"
      title="التسعير والرسوم"
      required
      trailing={
        <CreditCard className="w-[18px] h-[18px] text-[#7C8773]" strokeWidth={1.8} />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
        {/* السعر الأساسي */}
        <div>
          <label className="block text-[12.5px] font-bold text-[#181D17]">
            السعر الأساسي القياسي<span className="text-[#E5484D] ms-1">*</span>
          </label>
          <div className="mt-2 h-11 px-3.5 rounded-[10px] border border-[#EDF1E6] bg-white flex items-center justify-between">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice?.(e.target.value)}
              placeholder="320"
              className="w-full text-[16px] font-bold text-[#181D17] bg-transparent border-0 focus:outline-none"
            />
            <span className="text-[12.5px] text-[#7C8773] shrink-0">ر.س</span>
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            السعر المعتمد قبل المواسم والخصومات
          </p>
        </div>

        {/* دورة التسعير */}
        <div>
          <label className="block text-[12.5px] font-bold text-[#181D17]">
            دورة التسعير المستهدفة<span className="text-[#E5484D] ms-1">*</span>
          </label>
          <div className="mt-2 h-11 rounded-[10px] bg-[#F1F5EB] p-1 flex items-stretch gap-1">
            <button
              type="button"
              onClick={() => setBillingCycle?.("night")}
              className={`flex-1 rounded-[8px] text-[12.5px] font-bold transition-all cursor-pointer ${
                billingCycle === "night"
                  ? "bg-white shadow-[0_1px_2px_rgba(24,29,23,0.08)] text-[#181D17]"
                  : "text-[#7C8773] hover:text-[#3F4A36]"
              }`}
            >
              ليلة واحدة
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle?.("month")}
              className={`flex-1 rounded-[8px] text-[12.5px] font-bold transition-all cursor-pointer ${
                billingCycle === "month"
                  ? "bg-white shadow-[0_1px_2px_rgba(24,29,23,0.08)] text-[#181D17]"
                  : "text-[#7C8773] hover:text-[#3F4A36]"
              }`}
            >
              للشهر
            </button>
          </div>
        </div>
      </div>

      <InfoPanel
        className="mt-5"
        iconTile={false}
        icon={<BadgeCheck className="w-[22px] h-[22px]" strokeWidth={1.7} />}
      >
        يشمل السعر تلقائيًا نسبة ضريبة القيمة المضافة (15%) ورسوم الخدمة
        والتنظيف المحددة في اشتراك المالك، مع إمكانية تعديل الأسعار عبر محرك
        التسعير الديناميكي.
      </InfoPanel>
    </SectionCard>
  );
}
