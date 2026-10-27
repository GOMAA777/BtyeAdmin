"use client";

import { useState } from "react";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { WhatsAppTopFilter } from "../types";
import {
  WhatsAppFilterDrawer,
  type WhatsAppFilterState,
} from "./whatsapp-filter-drawer";

interface WhatsAppFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedProperty: string;
  onPropertyChange: (property: string) => void;
  activeFilter: WhatsAppTopFilter;
  onFilterChange: (filter: WhatsAppTopFilter) => void;
}

export function WhatsAppFilterBar({
  searchQuery,
  onSearchChange,
  selectedProperty,
  onPropertyChange,
  activeFilter,
  onFilterChange,
}: WhatsAppFilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<WhatsAppFilterState>({
    property: selectedProperty,
    conversationType: "all",
    readStatus: "all",
    windowStatus: "all",
  });

  const activeFiltersCount =
    (selectedProperty !== "all" ? 1 : 0) +
    (advancedFilters.conversationType !== "all" ? 1 : 0) +
    (advancedFilters.readStatus !== "all" ? 1 : 0) +
    (advancedFilters.windowStatus !== "all" ? 1 : 0);

  const tabs = [
    { id: "all", label: "الكل (18)" },
    { id: "unread", label: "غير مقروء (3)" },
    { id: "maintenance", label: "بلاغات صيانة (6)" },
    { id: "extension", label: "تمديد إقامة (4)" },
  ];

  const handleResetAllFilters = () => {
    setAdvancedFilters({
      property: "all",
      conversationType: "all",
      readStatus: "all",
      windowStatus: "all",
    });
    onPropertyChange("all");
    onFilterChange("all");
    onSearchChange("");
  };

  return (
    <>
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        searchPlaceholder="بحث باسم المستأجر، رقم الوحدة..."
        tabs={tabs}
        currentTab={activeFilter}
        onTabChange={(id) => onFilterChange(id as WhatsAppTopFilter)}
        onOpenAdvancedFilter={() => setIsDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
        filterButtonTitle="تصفية محادثات واتساب"
        onResetFilter={handleResetAllFilters}
        tabsLayoutId="whatsappFilterPill"
      />

      <WhatsAppFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={{
          ...advancedFilters,
          property: selectedProperty,
        }}
        onApplyFilters={(newFilters) => {
          setAdvancedFilters(newFilters);
          onPropertyChange(newFilters.property);
        }}
        onResetFilters={handleResetAllFilters}
      />
    </>
  );
}
