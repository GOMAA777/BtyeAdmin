"use client";

import { AnimatedTabs } from "@/components/shared/animated-tabs";
import { OperationCategoryFilter } from "../types";

interface OperationsStatusSummaryProps {
  currentCategory: OperationCategoryFilter;
  onCategoryChange: (category: OperationCategoryFilter) => void;
  counts: {
    all: number;
    cleaning: number;
    maintenance: number;
  };
}

export function OperationsStatusSummary({
  currentCategory,
  onCategoryChange,
  counts,
}: OperationsStatusSummaryProps) {
  const tabs = [
    { id: "all", label: "كل العمليات", badge: counts.all },
    { id: "cleaning", label: "التنظيف", badge: counts.cleaning },
    { id: "maintenance", label: "الصيانة", badge: counts.maintenance },
  ];

  return (
    <div className="flex items-center justify-start my-1" dir="rtl">
      <AnimatedTabs
        tabs={tabs}
        value={currentCategory}
        onChange={(id) => onCategoryChange(id as OperationCategoryFilter)}
        layoutId="operationsCategoryPill"
        variant="light"
        size="md"
        trackClassName="bg-[#EDF2EC] p-1.5 rounded-full border border-[#E0E7DE] gap-1.5"
      />
    </div>
  );
}
