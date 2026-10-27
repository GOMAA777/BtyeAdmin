"use client";

import { TableToolbar } from "@/components/shared/table-toolbar";
import { OperationSubFilter } from "../types";

interface OperationsFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentSubFilter: OperationSubFilter;
  onSubFilterChange: (filter: OperationSubFilter) => void;
  subCounts: {
    all: number;
    pending: number;
    current: number;
    in_progress: number;
  };
  onOpenAdvancedFilter?: () => void;
  activeFiltersCount?: number;
}

export function OperationsFilters({
  searchQuery,
  onSearchChange,
  currentSubFilter,
  onSubFilterChange,
  subCounts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
}: OperationsFiltersProps) {
  const subFilters = [
    { id: "all", label: `الكل (${subCounts.all})` },
    { id: "pending", label: `قيد الانتظار (${subCounts.pending})` },
    { id: "current", label: `الحالية (${subCounts.current})` },
    { id: "in_progress", label: `جاري التنفيذ (${subCounts.in_progress})` },
  ];

  return (
    <TableToolbar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="ابحث برقم الوحدة، العقار، المالك أو رقم المهمة..."
      onOpenAdvancedFilter={onOpenAdvancedFilter}
      activeFiltersCount={activeFiltersCount}
      filterButtonTitle="التصفية المتقدمة"
      tabs={subFilters}
      currentTab={currentSubFilter}
      onTabChange={(id) => onSubFilterChange(id as OperationSubFilter)}
      tabsLayoutId="operationsFilterPill"
    />
  );
}
