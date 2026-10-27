"use client";

import { BedDouble, Users, Minus, Plus } from "lucide-react";
import { SectionCard, InfoPanel } from "./ui";
import { SelectDropdown } from "@/components/shared/select-dropdown";

const BED_OPTIONS = [
  "1 سرير مزدوج كبير (King)",
  "2 سرير فردي (Single)",
  "1 سرير مزدوج + أريكة سرير",
  "2 سرير مزدوج كبير",
  "استوديو متكامل (سرير ماستر)",
];

interface OccupancyCardProps {
  maxGuests?: number;
  setMaxGuests?: (val: number | ((prev: number) => number)) => void;
  bedDistribution?: string;
  setBedDistribution?: (val: string) => void;
}

export function OccupancyCard({
  maxGuests = 2,
  setMaxGuests,
  bedDistribution = "1 سرير مزدوج كبير (King)",
  setBedDistribution,
}: OccupancyCardProps) {
  const handleDecrement = () => {
    if (setMaxGuests) {
      setMaxGuests((prev) => Math.max(1, prev - 1));
    }
  };

  const handleIncrement = () => {
    if (setMaxGuests) {
      setMaxGuests((prev) => Math.min(20, prev + 1));
    }
  };

  return (
    <SectionCard
      number="٥"
      title="السعة القصوى والإشغال"
      required
      trailing={<Users className="w-[18px] h-[18px] text-[#7C8773]" strokeWidth={1.8} />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
        {/* الحد الأقصى للضيوف */}
        <div>
          <label className="block text-[12.5px] font-bold text-[#181D17]">
            الحد الأقصى للضيوف<span className="text-[#E5484D] ms-1">*</span>
          </label>
          <div className="mt-2 flex items-center gap-3.5">
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="إنقاص"
              className="w-11 h-11 rounded-[10px] bg-[#F1F5EB] text-[#3F4A36] flex items-center justify-center transition-colors cursor-pointer hover:bg-[#E8EEDD]"
            >
              <Minus className="w-[18px] h-[18px]" strokeWidth={1.9} />
            </button>
            <span className="text-[19px] font-bold text-[#181D17] min-w-[70px] text-center">
              {maxGuests} {maxGuests === 1 ? "ضيف" : maxGuests === 2 ? "ضيفين" : "ضيوف"}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="زيادة"
              className="w-11 h-11 rounded-[10px] bg-[#F1F5EB] text-[#3F4A36] flex items-center justify-center transition-colors cursor-pointer hover:bg-[#E8EEDD]"
            >
              <Plus className="w-[18px] h-[18px]" strokeWidth={1.9} />
            </button>
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            العدد الإجمالي المصرح به في العقود
          </p>
        </div>

        {/* توزيع الأسرّة */}
        <div>
          <label className="block text-[12.5px] font-bold text-[#181D17]">
            توزيع الأسرّة الأساسية
          </label>
          <div className="mt-2">
            <SelectDropdown
              value={bedDistribution}
              onChange={(val) => setBedDistribution?.(val)}
              options={BED_OPTIONS}
              triggerClassName="h-11 px-3.5 rounded-[10px] border border-[#EDF1E6] bg-white text-[13px] text-[#181D17] font-semibold"
            />
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            مطابق لاشتراطات السياحة والسلامة
          </p>
        </div>
      </div>

      <InfoPanel
        className="mt-5"
        iconTile={false}
        icon={<BedDouble className="w-[22px] h-[22px]" strokeWidth={1.7} />}
      >
        يُسمح بإضافة أسرّة أطفال إضافية عند الطلب وفق اشتراطات المنصة المعتمدة
        للسياحة والضيافة في المملكة.
      </InfoPanel>
    </SectionCard>
  );
}
