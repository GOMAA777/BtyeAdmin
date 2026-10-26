"use client";

import { Search } from "lucide-react";
import { AnimatedTabs } from "@/components/shared/animated-tabs";
import { FilterButton } from "@/components/shared/filter-button";

interface TeamFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    active: number;
    pending: number;
    inactive: number;
  };
  onOpenAdvancedFilter: () => void;
  activeFiltersCount?: number;
}

export function TeamFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
}: TeamFiltersProps) {
  const tabs = [
    { id: "all", label: `الكل (${counts.all})` },
    { id: "active", label: `نشط (${counts.active})` },
    { id: "pending", label: `بانتظار المراجعة (${counts.pending})` },
    { id: "inactive", label: `غير نشط (${counts.inactive})` },
  ];

  return (
    <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-[#DCE2D7] flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs font-cairo">
      {/* Search Input Box (Right in RTL) */}
      <div className="relative w-full md:w-96 lg:w-[440px]">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث باسم العضو، رقم الواتساب، أو العقار..."
          className="w-full h-10 pe-4 ps-11 rounded-xl bg-[#EAEFE6] border border-[#CCD4C6] text-xs text-[#252A24] placeholder:text-[#727A6E] focus:bg-white focus:border-[#4B5940] focus:outline-none focus:ring-2 focus:ring-[#4B5940]/20 transition-all shadow-2xs"
        />
        <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727A6E]">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Filter Button & Tabs Section (Left in RTL) */}
      <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
        {/* Advanced Filter Button */}
        <FilterButton
          onClick={onOpenAdvancedFilter}
          activeCount={activeFiltersCount}
          title="تصفية أعضاء الفريق المتقدمة"
        />

        <AnimatedTabs
          tabs={tabs}
          value={currentFilter}
          onChange={onFilterChange}
          layoutId="teamFilterPill"
          variant="light"
        />
      </div>
    </div>
  );
}
