"use client";

import { TableToolbar } from "@/components/shared/table-toolbar";

interface UnitsFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    available: number;
    occupied: number;
    cleaning: number;
    maintenance: number;
  };
  onOpenAdvancedFilter?: () => void;
  activeFiltersCount?: number;
  onResetFilter?: () => void;
  isLoading?: boolean;
}

export function UnitsFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
  onResetFilter,
  isLoading = false,
}: UnitsFiltersProps) {
  const tabs = [
    { id: "all", label: isLoading ? "الكل" : `الكل (${counts.all})` },
    { id: "available", label: isLoading ? "متاحة" : `متاحة (${counts.available})` },
    { id: "occupied", label: isLoading ? "مشغولة" : `مشغولة (${counts.occupied})` },
    { id: "cleaning", label: isLoading ? "تحت التنظيف" : `تحت التنظيف (${counts.cleaning})` },
    { id: "maintenance", label: isLoading ? "تحت الصيانة" : `تحت الصيانة (${counts.maintenance})` },
  ];

  return (
    <TableToolbar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="ابحث برقم الوحدة، اسم العقار أو المالك..."
      onOpenAdvancedFilter={onOpenAdvancedFilter}
      activeFiltersCount={activeFiltersCount}
      filterButtonTitle="تصفية الوحدات"
      onResetFilter={onResetFilter}
      tabs={tabs}
      currentTab={currentFilter}
      onTabChange={onFilterChange}
      tabsLayoutId="unitsFilterPill"
    />
  );
}
