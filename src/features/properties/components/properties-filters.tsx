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
}

export function PropertiesFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
}: PropertiesFiltersProps) {
  const tabs = [
    { id: "all", label: `الكل (${counts.all})` },
    { id: "active", label: `نشط (${counts.active})` },
    { id: "inactive", label: `غير نشط (${counts.inactive})` },
    { id: "archived", label: `مؤرشف (${counts.archived})` },
  ];

  return (
    <TableToolbar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="ابحث باسم العقار، المالك أو المدينة..."
      onOpenAdvancedFilter={onOpenAdvancedFilter}
      activeFiltersCount={activeFiltersCount}
      filterButtonTitle="تصفية العقارات المتقدمة"
      tabs={tabs}
      currentTab={currentFilter}
      onTabChange={onFilterChange}
      tabsLayoutId="propertiesFilterActiveTab"
    />
  );
}
