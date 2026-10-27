"use client";

import { TableToolbar } from "@/components/shared/table-toolbar";

interface PropertiesFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    active: number;
    inactive: number;
    archived: number;
  };
  onOpenAdvancedFilter?: () => void;
  activeFiltersCount?: number;
  onResetFilter?: () => void;
  isLoading?: boolean;
}

export function PropertiesFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
  onResetFilter,
  isLoading = false,
}: PropertiesFiltersProps) {
  const tabs = [
    { id: "all", label: isLoading ? "الكل" : `الكل (${counts.all})` },
    { id: "active", label: isLoading ? "نشط" : `نشط (${counts.active})` },
    { id: "inactive", label: isLoading ? "غير نشط" : `غير نشط (${counts.inactive})` },
    { id: "archived", label: isLoading ? "مؤرشف" : `مؤرشف (${counts.archived})` },
  ];

  return (
    <TableToolbar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="ابحث باسم العقار، المالك أو المدينة..."
      onOpenAdvancedFilter={onOpenAdvancedFilter}
      activeFiltersCount={activeFiltersCount}
      filterButtonTitle="تصفية العقارات المتقدمة"
      onResetFilter={onResetFilter}
      tabs={tabs}
      currentTab={currentFilter}
      onTabChange={onFilterChange}
      tabsLayoutId="propertiesFilterActiveTab"
    />
  );
}
