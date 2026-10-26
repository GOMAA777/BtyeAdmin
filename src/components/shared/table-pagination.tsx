"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  fromIndex?: number;
  toIndex?: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  entityName: string; // e.g. "عقار", "مالك", "وحدة", "حجز", "فاتورة", "عملية"
  pluralEntityName?: string; // e.g. "عقارات", "ملاك", "وحدات", "حجوزات", "فواتير", "عمليات"
  registeredLabel?: string; // e.g. "مسجل" or "مسجلة", defaults to "مسجل"
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  totalCount,
  fromIndex,
  toIndex,
  pageSize,
  pageSizeOptions = [5, 10],
  onPageChange,
  onPageSizeChange,
  entityName,
  pluralEntityName,
  registeredLabel = "مسجل",
  className,
}: TablePaginationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const safeTotalPages = Math.max(1, totalPages);
  const safeActivePage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const plural = pluralEntityName || entityName;

  const calculatedFrom =
    fromIndex !== undefined
      ? fromIndex
      : totalCount === 0
      ? 0
      : (safeActivePage - 1) * pageSize + 1;
  const calculatedTo =
    toIndex !== undefined
      ? toIndex
      : Math.min(safeActivePage * pageSize, totalCount);

  // Sliding window of visible pages
  const getVisiblePages = (current: number, total: number) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (current >= total - 2) {
      return [total - 4, total - 3, total - 2, total - 1, total];
    }
    return [current - 2, current - 1, current, current + 1, current + 2];
  };

  const visiblePages = getVisiblePages(safeActivePage, safeTotalPages);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        "bg-white border-t border-[#E5E8E2] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#54624C]",
        className
      )}
    >
      {/* Right Side in RTL: Item Count & Rows Per Page Dropdown */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[12px] font-semibold text-[#54624C]">
        <p className="leading-[18px]">
          عرض <span className="text-[#181D17] font-semibold">{calculatedFrom}</span> إلى{" "}
          <span className="text-[#181D17] font-semibold">{calculatedTo}</span> من أصل{" "}
          <span className="text-[#181D17] font-semibold">{totalCount}</span> {entityName}
          {registeredLabel ? ` ${registeredLabel}` : ""}
        </p>

        <span className="hidden sm:inline-block w-px h-4 bg-[#E5E7EB]" />

        {/* Rows Per Page Selector */}
        <div className="flex items-center gap-2 relative">
          <span className="text-[#54624C] text-[11px] font-medium">الصفوف لكل صفحة:</span>
          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border border-[#E5E8E2] px-3 py-1.5 rounded-[8px] text-[12px] font-semibold text-[#181D17] flex items-center gap-1.5 hover:bg-[#F9FAF8] transition-colors cursor-pointer select-none"
            >
              <span>
                {pageSize} {plural}
              </span>
              <ChevronDown className="w-3 h-3 text-[#73786F]" />
            </button>

            {/* Dropdown Menu (Opens upwards to prevent overflow clipping) */}
            {isOpen && (
              <div
                ref={menuRef}
                className="absolute start-0 bottom-full mb-1.5 w-28 bg-white border border-[#E5E8E2] rounded-[8px] shadow-lg py-1 z-30"
              >
                {pageSizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      onPageSizeChange(size);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-start px-3 py-1.5 text-xs transition-colors hover:bg-[#F1F5EB] cursor-pointer",
                      pageSize === size
                        ? "font-bold text-[#4B5940] bg-[#EAF1E8]"
                        : "text-[#181D17]"
                    )}
                  >
                    {size} {plural}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Left Side in RTL: Pagination Controls [السابق >]  [1]  [< التالي] */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button (Right in RTL flow) */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, safeActivePage - 1))}
          disabled={safeActivePage === 1}
          className={cn(
            "bg-white border border-[#E5E8E2] rounded-[8px] px-3.5 py-1.5 text-[12px] font-normal flex items-center gap-1.5 transition-colors select-none",
            safeActivePage === 1
              ? "opacity-50 cursor-not-allowed text-[#A0A59C]"
              : "text-[#181D17] hover:bg-[#F9FAF8] cursor-pointer"
          )}
        >
          <span>السابق</span>
          <ChevronRight className="w-3.5 h-3.5 text-current" />
        </button>

        {/* Dynamic Page Numbers */}
        {visiblePages.map((pageNum) => {
          const isActive = pageNum === safeActivePage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "rounded-[8px] px-3.5 py-1 text-[12px] select-none min-w-[32px] h-[32px] flex items-center justify-center transition-colors border",
                isActive
                  ? "bg-[#EAF1E8] border-[#D6DED4] font-bold text-[#4B5940]"
                  : "bg-white border-[#E5E8E2] font-normal text-[#181D17] hover:bg-[#F9FAF8] cursor-pointer"
              )}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button (Left in RTL flow) */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(safeTotalPages, safeActivePage + 1))}
          disabled={safeActivePage === safeTotalPages}
          className={cn(
            "bg-white border border-[#E5E8E2] rounded-[8px] px-3.5 py-1.5 text-[12px] font-normal flex items-center gap-1.5 transition-colors select-none",
            safeActivePage === safeTotalPages
              ? "opacity-50 cursor-not-allowed text-[#A0A59C]"
              : "text-[#181D17] hover:bg-[#F9FAF8] cursor-pointer"
          )}
        >
          <ChevronLeft className="w-3.5 h-3.5 text-current" />
          <span>التالي</span>
        </button>
      </div>
    </div>
  );
}
