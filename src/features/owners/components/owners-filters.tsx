"use client";

import { TableToolbar } from "@/components/shared/table-toolbar";

interface OwnersFiltersProps {
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
  onResetFilter?: () => void;
  isLoading?: boolean;
}

export function OwnersFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
  onResetFilter,
  isLoading = false,
}: OwnersFiltersProps) {
  const tabs = [
    { id: "all", label: isLoading ? "الكل" : `الكل (${counts.all})` },
    { id: "active", label: isLoading ? "نشط" : `نشط (${counts.active})` },
    { id: "pending", label: isLoading ? "بانتظار المراجعة" : `بانتظار المراجعة (${counts.pending})` },
    { id: "inactive", label: isLoading ? "غير نشط" : `غير نشط (${counts.inactive})` },
  ];

  return (
    <TableToolbar
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="ابحث باسم المالك أو رقم الجوال أو البريد الإلكتروني..."
      onOpenAdvancedFilter={onOpenAdvancedFilter}
      activeFiltersCount={activeFiltersCount}
      filterButtonTitle="التصفية المتقدمة"
      onResetFilter={onResetFilter}
      tabs={tabs}
      currentTab={currentFilter}
      onTabChange={onFilterChange}
      tabsLayoutId="ownersFilterPill"
    />
  );
}
