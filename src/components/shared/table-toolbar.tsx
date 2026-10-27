"use client";

import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedTabs, type AnimatedTabItem } from "./animated-tabs";
import { FilterButton } from "./filter-button";

export interface TableToolbarProps {
  /** Current search input string */
  searchQuery: string;
  /** Callback when search input value changes */
  onSearchChange: (query: string) => void;
  /** Placeholder for the search input box */
  searchPlaceholder?: string;
  /** Optional custom width class for search input box (default: w-full md:w-80 lg:w-[440px]) */
  searchWidthClassName?: string;

  /** Callback when clicking the filter button (if omitted, filter button is not rendered) */
  onOpenAdvancedFilter?: () => void;
  /** Active filters count badge for filter button */
  activeFiltersCount?: number;
  /** Filter button hover title */
  filterButtonTitle?: string;
  /** Filter button label (default: "فلتر") */
  filterButtonLabel?: string;

  /** Callback when clicking reset filter button */
  onResetFilter?: () => void;
  /** Reset filter button title / tooltip */
  resetFilterTitle?: string;
  /** Whether to show reset filter button (default: true) */
  showResetFilter?: boolean;

  /** Status tabs items */
  tabs?: AnimatedTabItem[];
  /** Currently active tab id */
  currentTab?: string;
  /** Callback when active tab changes */
  onTabChange?: (tabId: string) => void;
  /** Unique layoutId for Framer Motion pill */
  tabsLayoutId?: string;

  /** Additional actions or filter dropdowns rendered alongside filter/tabs */
  children?: React.ReactNode;
  /** Custom wrapper styling */
  className?: string;
}

/**
 * Standard Unified Search & Filter Toolbar matching platform Figma design fidelity.
 * Features:
 * - Rounded-full white pill container with soft border (#DCE2D7)
 * - Rounded-full sage search box (#EAEFE6) with Search icon on start (right in RTL)
 * - Rounded-full reset filter icon button with RotateCcw
 * - Rounded-full filter pill button with badge
 * - Rounded-full animated status tabs with sliding white pill
 */
export function TableToolbar({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "ابحث...",
  searchWidthClassName,
  onOpenAdvancedFilter,
  activeFiltersCount = 0,
  filterButtonTitle = "التصفية المتقدمة",
  filterButtonLabel = "فلتر",
  onResetFilter,
  resetFilterTitle = "إعادة ضبط الفلاتر",
  showResetFilter = true,
  tabs,
  currentTab,
  onTabChange,
  tabsLayoutId = "tableToolbarFilterPill",
  children,
  className,
}: TableToolbarProps) {
  const handleReset = () => {
    if (onResetFilter) {
      onResetFilter();
    }
    if (searchQuery) {
      onSearchChange("");
    }
    if (tabs && tabs.length > 0 && onTabChange && currentTab !== tabs[0]?.id) {
      onTabChange(tabs[0].id);
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-[28px] md:rounded-full p-2 sm:px-3 sm:py-2 border border-[#DCE2D7] flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs font-cairo w-full",
        className
      )}
    >
      {/* Search Input Box (Right in RTL) */}
      <div className={cn("relative w-full md:w-80 lg:w-[440px]", searchWidthClassName)}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full h-10 pe-4 ps-11 rounded-full bg-[#EAEFE6] border border-[#CCD4C6] text-xs text-[#252A24] placeholder:text-[#727A6E] focus:bg-white focus:border-[#4B5940] focus:outline-none focus:ring-2 focus:ring-[#4B5940]/20 transition-all shadow-2xs font-medium font-cairo"
        />
        <div className="absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#727A6E]">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Filter Button & Tabs Section (Left in RTL) */}
      <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap justify-start md:justify-end">
        {/* Reset Filter Button */}
        {showResetFilter && (
          <button
            type="button"
            onClick={handleReset}
            className="w-10 h-10 rounded-full bg-[#EFF2EB] hover:bg-[#E2E7DE] text-[#252A24] flex items-center justify-center transition-all cursor-pointer shrink-0 select-none active:scale-95 group"
            title={resetFilterTitle}
            aria-label={resetFilterTitle}
          >
            <RotateCcw className="w-4 h-4 text-[#252A24] group-hover:-rotate-45 transition-transform duration-200" />
          </button>
        )}

        {onOpenAdvancedFilter && (
          <FilterButton
            onClick={onOpenAdvancedFilter}
            activeCount={activeFiltersCount}
            title={filterButtonTitle}
            label={filterButtonLabel}
          />
        )}

        {tabs && tabs.length > 0 && currentTab !== undefined && onTabChange && (
          <AnimatedTabs
            tabs={tabs}
            value={currentTab}
            onChange={onTabChange}
            layoutId={tabsLayoutId}
            variant="light"
          />
        )}

        {children}
      </div>
    </div>
  );
}
