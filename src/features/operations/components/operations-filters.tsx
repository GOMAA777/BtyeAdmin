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
  onResetFilter?: () => void;
  isLoading?: boolean;
}

export function OperationsFilters({
  searchQuery,
  onSearchChange,
  currentSubFilter,
  onSubFilterChange,
  subCounts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
  onResetFilter,
  isLoading = false,
}: OperationsFiltersProps) {
  const subFilters = [
    { id: "all", label: isLoading ? "الكل" : `الكل (${subCounts.all})` },
    { id: "pending", label: isLoading ? "قيد الانتظار" : `قيد الانتظار (${subCounts.pending})` },
    { id: "current", label: isLoading ? "الحالية" : `الحالية (${subCounts.current})` },
    { id: "in_progress", label: isLoading ? "جاري التنفيذ" : `جاري التنفيذ (${subCounts.in_progress})` },
  ];

  return (
    <TableToolbar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="ابحث برقم الوحدة، العقار، المالك أو رقم المهمة..."
      onOpenAdvancedFilter={onOpenAdvancedFilter}
      activeFiltersCount={activeFiltersCount}
      filterButtonTitle="التصفية المتقدمة"
      onResetFilter={onResetFilter}
      tabs={subFilters}
      currentTab={currentSubFilter}
      onTabChange={(id) => onSubFilterChange(id as OperationSubFilter)}
      tabsLayoutId="operationsFilterPill"
    />
  );
}
