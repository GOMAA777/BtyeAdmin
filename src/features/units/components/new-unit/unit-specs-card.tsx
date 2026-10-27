"use client";

import {
  Armchair,
  BedDouble,
  Building2,
  DoorOpen,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionCard, RadioDot, TickIcon } from "./ui";
import { SelectDropdown } from "@/components/shared/select-dropdown";

const UNIT_TYPES = [
  { id: "studio", label: "استوديو", icon: BedDouble },
  { id: "room", label: "غرفة منفصلة", icon: DoorOpen },
  { id: "full", label: "شقة كاملة", icon: Building2 },
  { id: "luxury", label: "جناح فاخر", icon: Armchair },
  { id: "custom", label: "تصنيف مخصص", icon: SlidersHorizontal },
];

const FLOOR_OPTIONS = [
  "الطابق الأرضي (الدور 0)",
  "الطابق الأول (الدور 1)",
  "الطابق الثاني (الدور 2)",
  "الطابق الثالث (الدور 3)",
  "الطابق الرابع (الدور 4)",
  "الطابق الخامس (الدور 5)",
  "بنتهاوس / السطح",
];

interface UnitSpecsCardProps {
  unitNumber?: string;
  setUnitNumber?: (val: string) => void;
  floor?: string;
  setFloor?: (val: string) => void;
  area?: string;
  setArea?: (val: string) => void;
  unitType?: string;
  setUnitType?: (val: string) => void;
  propertyName?: string;
}

export function UnitSpecsCard({
  unitNumber = "",
  setUnitNumber,
  floor = "الطابق الثاني (الدور 2)",
  setFloor,
  area = "",
  setArea,
  unitType = "full",
  setUnitType,
  propertyName = "العقار المختار",
}: UnitSpecsCardProps) {
  const generatedCode = unitNumber ? `UNT-1048-${unitNumber}` : "UNT-Auto";

  return (
    <SectionCard
      number="٣"
      title="بيانات ومواصفات الوحدة"
      required
      trailing={
        <span className="text-[11px] text-[#8A9384] whitespace-nowrap">
          حقول إلزامية محددة بعلامة (*)
        </span>
      }
    >
      {/* Fields row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
        {/* رقم الوحدة */}
        <div>
          <label className="block text-[12.5px] font-bold text-[#181D17]">
            رقم الوحدة<span className="text-[#E5484D] ms-1">*</span>
          </label>
          <div className="mt-2 h-11 px-3 rounded-[9px] border border-[#EDF1E6] bg-white flex items-center justify-between">
            <input
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber?.(e.target.value)}
              placeholder="مثال: 205"
              className="w-full text-[14px] text-[#181D17] font-semibold bg-transparent border-0 focus:outline-none"
            />
            {unitNumber && <TickIcon className="w-[17px] h-[17px] shrink-0" />}
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-[#3F8A3F] mt-2">
            <TickIcon className="w-[12px] h-[12px]" />
            رقم الوحدة في {propertyName}
          </p>
        </div>

        {/* الدور / الطابق */}
        <div>
          <label className="block text-[12.5px] font-bold text-[#181D17]">
            الدور / الطابق<span className="text-[#E5484D] ms-1">*</span>
          </label>
          <div className="mt-2">
            <SelectDropdown
              value={floor}
              onChange={(val) => setFloor?.(val)}
              options={FLOOR_OPTIONS}
              triggerClassName="h-11 px-3 rounded-[9px] border border-[#EDF1E6] bg-white text-[13px] text-[#181D17] font-semibold"
            />
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            يساعد الضيوف وأطقم النظافة بالوصول
          </p>
        </div>

        {/* مساحة الوحدة */}
        <div>
          <label className="block text-[12px] font-medium text-[#7C8773]">
            مساحة الوحدة (اختياري)
          </label>
          <div className="mt-2 h-11 px-3 rounded-[9px] border border-[#EDF1E6] bg-white flex items-center justify-between">
            <input
              type="number"
              value={area}
              onChange={(e) => setArea?.(e.target.value)}
              placeholder="65"
              className="w-full text-[14px] text-[#181D17] font-semibold bg-transparent border-0 focus:outline-none"
            />
            <span className="text-[11.5px] text-[#7C8773] shrink-0">م²</span>
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            المساحة الداخلية الصافية
          </p>
        </div>

        {/* المعرّف الفريد */}
        <div>
          <label className="block text-[12.5px] font-bold text-[#181D17]">
            المعرّف الفريد للوحدة
          </label>
          <div className="mt-2 h-11 px-3 rounded-[9px] bg-[#EFF6EA] flex items-center justify-center">
            <span className="text-[12.5px] text-[#5E6B56] font-semibold">{generatedCode}</span>
          </div>
          <p className="text-[11px] text-[#8A9384] mt-2">
            توليد آلي حسب ترميز العقار
          </p>
        </div>
      </div>

      {/* نوع الوحدة */}
      <div className="mt-9">
        <label className="block text-[13px] font-bold text-[#181D17]">
          نوع وتصنيف الوحدة<span className="text-[#E5484D] ms-1">*</span>
        </label>

        <div className="flex gap-3 mt-3 flex-wrap sm:flex-nowrap">
          {UNIT_TYPES.map((type) => {
            const isSelected = unitType === type.id;
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setUnitType?.(type.id)}
                className={cn(
                  "flex-1 min-w-[110px] h-[37px] px-3 rounded-full flex items-center justify-between gap-2 text-[12.5px] transition-colors cursor-pointer",
                  isSelected
                    ? "bg-[#EFF6EA] font-bold text-[#181D17]"
                    : "bg-[#F1F5EB] font-semibold text-[#2C3527] hover:bg-[#ECF1E2]"
                )}
              >
                <RadioDot small selected={isSelected} />
                <span className="truncate text-center flex-1">{type.label}</span>
                <Icon
                  className="w-[15px] h-[15px] shrink-0 text-[#3F4A36]"
                  strokeWidth={1.7}
                />
              </button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
