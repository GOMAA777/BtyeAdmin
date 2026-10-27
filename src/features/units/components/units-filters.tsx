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
}: UnitsFiltersProps) {
  const tabs = [
    { id: "all", label: `الكل (${counts.all})` },
    { id: "available", label: `متاحة (${counts.available})` },
    { id: "occupied", label: `مشغولة (${counts.occupied})` },
    { id: "cleaning", label: `تحت التنظيف (${counts.cleaning})` },
    { id: "maintenance", label: `تحت الصيانة (${counts.maintenance})` },
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
