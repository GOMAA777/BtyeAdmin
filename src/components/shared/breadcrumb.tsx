"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ChevronLeft,
  ArrowLeft,
  X,
  MoreHorizontal,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hardNavigate } from "@/lib/constants";
import { resolveSectionIcon } from "@/lib/route-titles";
import { useNavigationTrail, type TrailItem } from "@/hooks/use-navigation-trail";

export interface BreadcrumbProps {
  items?: TrailItem[];
  className?: string;
  variant?: "navbar" | "card";
}

export function Breadcrumb({
  items: customItems,
  className,
  variant = "navbar",
}: BreadcrumbProps) {
  const { trail } = useNavigationTrail();
  const breadcrumbs = customItems && customItems.length > 0 ? customItems : trail;

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  // Schema.org BreadcrumbList for rich results
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.title,
      item: crumb.href ? `https://abraj.sa${crumb.href}` : undefined,
    })),
  };

  // 1. Navbar Variant (Rendered in Topbar)
  if (variant === "navbar") {
    // From 3 crumbs: icon (root) → •• (middle) → current page title
    const isLongTrail = breadcrumbs.length >= 3;
    const firstCrumb = breadcrumbs[0];
    const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
    const middleCrumbs = isLongTrail ? breadcrumbs.slice(1, breadcrumbs.length - 1) : [];

    return (
      <nav
        aria-label="مسار التنقل الفعلي"
        className={cn("flex items-center min-w-0 select-none", className)}
        dir="rtl"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <ol className="flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto no-scrollbar text-xs">
          {!isLongTrail ? (
            /* Short trail (< 3) — show every crumb in full */
            breadcrumbs.map((crumb, index) => {
              const isFirst = index === 0;
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li
                  key={`${crumb.href}-${index}`}
                  className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0"
                >
                  {!isFirst && (
                    <ChevronLeft
                      className="w-3.5 h-3.5 text-[#9BA896] shrink-0"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  )}

                  {isLast ? (
                    <ActiveLeafCrumb crumb={crumb} isFirst={isFirst} />
                  ) : (
                    <LinkCrumb crumb={crumb} isFirst={isFirst} />
                  )}
                </li>
              );
            })
          ) : (
            /* Long trail (≥ 3): icon → dots → last page title */
            <>
              {/* 1. First Root Crumb — icon only */}
              <li className="inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
                <LinkCrumb crumb={firstCrumb} isFirst={true} iconOnly />
              </li>

              {/* Separator */}
              <li aria-hidden="true" className="shrink-0">
                <ChevronLeft
                  className="w-3.5 h-3.5 text-[#9BA896]"
                  strokeWidth={2.2}
                />
              </li>

              {/* 2. Middle Items: Individual Dots on Desktop (pop > .. > .. > ld) */}
              <li className="hidden md:inline-flex items-center gap-1 sm:gap-1.5 shrink-0">
                {middleCrumbs.map((crumb, idx) => {
                  const actualIndex = idx + 1;
                  return (
                    <div
                      key={`${crumb.href}-${actualIndex}`}
                      className="inline-flex items-center gap-1 sm:gap-1.5"
                    >
                      {idx > 0 && (
                        <ChevronLeft
                          className="w-3.5 h-3.5 text-[#9BA896] shrink-0"
                          strokeWidth={2.2}
                          aria-hidden="true"
                        />
                      )}
                      <BreadcrumbDotItem
                        crumb={crumb}
                        index={actualIndex}
                        total={breadcrumbs.length}
                        allCrumbs={breadcrumbs}
                      />
                    </div>
                  );
                })}
              </li>

              {/* 2b. Middle Items: Consolidated dots pill on Mobile / Tablet (< md) */}
              <li className="inline-flex md:hidden items-center shrink-0">
                <BreadcrumbGroupDots
                  items={middleCrumbs}
                  startIndex={1}
                  total={breadcrumbs.length}
                />
              </li>

              {/* Separator */}
              <li aria-hidden="true" className="shrink-0">
                <ChevronLeft
                  className="w-3.5 h-3.5 text-[#9BA896]"
                  strokeWidth={2.2}
                />
              </li>

              {/* 3. Last Active Leaf Crumb */}
              <li className="inline-flex items-center shrink-0">
                <ActiveLeafCrumb crumb={lastCrumb} isFirst={false} />
              </li>
            </>
          )}
        </ol>
      </nav>
    );
  }

  // 2. Card Variant
  return (
    <nav
      aria-label="مسار التنقل الفعلي"
      className={cn(
        "bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E6DC] shadow-2xs select-none",
        className
      )}
      dir="rtl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <ol className="flex items-center gap-2 flex-wrap text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={`${crumb.href}-${index}`}
              className="inline-flex items-center gap-2"
            >
              {!isFirst && (
                <ChevronLeft
                  className="w-4 h-4 text-[#9BA896] shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}

              {isLast ? (
                <span
                  className="font-bold text-[#181D17] bg-[#EEF2E6] px-3 py-1.5 rounded-xl border border-[#CCDBC4] inline-flex items-center gap-1.5"
                  aria-current="page"
                >
                  <span>{crumb.title}</span>
                  {crumb.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-white text-xs font-mono font-bold text-[#34422A] border border-[#CBD7C3]">
                      {crumb.badge}
                    </span>
                  )}
                </span>
              ) : (
                <Link
                  href={crumb.href || "/"}
                  prefetch={true}
                  className="text-[#54624C] hover:text-[#181D17] hover:underline font-medium transition-colors"
                >
                  {crumb.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Section-root link. iconOnly (long trail) = section icon button only.
 */
function LinkCrumb({
  crumb,
  isFirst,
  iconOnly = false,
}: {
  crumb: TrailItem;
  isFirst: boolean;
  iconOnly?: boolean;
}) {
  const SectionIcon =
    (isFirst && resolveSectionIcon(crumb.href)) || (isFirst ? LayoutGrid : null);

  if (iconOnly) {
    const Icon = SectionIcon || LayoutGrid;
    return (
      <Link
        href={crumb.href || "/"}
        prefetch={true}
        onClick={(e) => {
          e.preventDefault();
          hardNavigate(crumb.href || "/");
        }}
        title={crumb.title}
        aria-label={crumb.title}
        className={cn(
          "inline-flex items-center justify-center size-7 rounded-lg text-[#34422E] hover:text-[#181D17] hover:bg-[#F1F5EB] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#34422E]/30 cursor-pointer shrink-0",
          "border border-transparent hover:border-[#DCE2D7]"
        )}
      >
        <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
      </Link>
    );
  }

  return (
    <Link
      href={crumb.href || "/"}
      prefetch={true}
      onClick={(e) => {
        e.preventDefault();
        hardNavigate(crumb.href || "/");
      }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium text-[#54624C] hover:text-[#181D17] hover:bg-[#F1F5EB] transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[#34422E]/30 whitespace-nowrap cursor-pointer",
        isFirst && "text-[#34422E] font-semibold"
      )}
    >
      {SectionIcon && (
        <SectionIcon className="w-3.5 h-3.5 text-[#34432E] shrink-0" strokeWidth={2.2} />
      )}
      <span>{crumb.title}</span>
      {crumb.badge && (
        <span className="px-1.5 py-0.5 rounded bg-[#E5EAE0] text-[10px] font-mono text-[#54624C]">
          {crumb.badge}
        </span>
      )}
    </Link>
  );
}

/**
 * Active Leaf Crumb Item (Last Page)
 */
function ActiveLeafCrumb({ crumb, isFirst }: { crumb: TrailItem; isFirst: boolean }) {
  const SectionIcon =
    (isFirst && resolveSectionIcon(crumb.href)) || (isFirst ? LayoutGrid : null);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shadow-3xs",
        "bg-[#EEF2E6] text-[#181D17] border border-[#CCDBC4]"
      )}
      aria-current="page"
    >
      {SectionIcon && (
        <SectionIcon className="w-3.5 h-3.5 text-[#34432E] shrink-0" strokeWidth={2.2} />
      )}
      <span className="truncate max-w-[130px] sm:max-w-[200px] md:max-w-[260px]">
        {crumb.title}
      </span>
      {!isFirst && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#34422A] shrink-0" />
      )}
      {crumb.badge && (
        <span className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono font-bold text-[#34422A] border border-[#CBD7C3]">
          {crumb.badge}
        </span>
      )}
    </div>
  );
}

/**
 * Collapsed middle crumb ("••"): styled hover card shows the page name; click navigates.
 */
function BreadcrumbDotItem({
  crumb,
  index,
  total,
}: {
  crumb: TrailItem;
  index: number;
  total: number;
  allCrumbs: TrailItem[];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const width = 240;
    let left = rect.left + rect.width / 2 - width / 2;
    if (left + width > window.innerWidth - 12) {
      left = window.innerWidth - width - 12;
    }
    if (left < 12) left = 12;
    setCoords({ top: rect.bottom + 8, left });
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    updatePosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setIsHovered(false), 120);
  };

  const showTip = isMounted && isHovered;

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        ref={triggerRef}
        href={crumb.href || "/"}
        prefetch={true}
        onClick={(e) => {
          e.preventDefault();
          hardNavigate(crumb.href || "/");
        }}
        aria-label={`الانتقال إلى: ${crumb.title}`}
        className={cn(
          "h-6.5 min-w-[28px] px-1.5 rounded-[8px] text-[11px] font-bold transition-all duration-150 select-none inline-flex items-center justify-center gap-0.5 cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[#34422A]/30",
          isHovered
            ? "bg-[#34422A] text-white shadow-xs scale-105 border border-[#34422A]"
            : "bg-[#F1F5EB] hover:bg-[#E4EBDC] text-[#54624C] hover:text-[#181D17] border border-[#DCE2D7] hover:border-[#CCDBC4]"
        )}
        data-crumb-index={index}
      >
        <span className="tracking-widest font-mono text-[12px] leading-none select-none px-0.5">
          ••
        </span>
      </Link>

      {showTip &&
        createPortal(
          <div
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed z-[9999] w-[240px] pointer-events-auto font-cairo animate-in fade-in zoom-in-95 duration-150"
            dir="rtl"
          >
            {/* Arrow */}
            <div className="flex justify-center -mb-px">
              <span className="w-2.5 h-2.5 rotate-45 bg-white border-t border-s border-[#CCDBC4] shadow-xs" />
            </div>

            <div className="relative bg-white rounded-[14px] border border-[#CCDBC4] shadow-[0_10px_28px_rgba(36,48,32,0.14)] p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#55694D] bg-[#EEF2E6] px-2 py-0.5 rounded-md border border-[#DCE2D7]">
                  محطة {index + 1} من {total}
                </span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#8A9584] shrink-0" />
              </div>

              <div className="space-y-1">
                <p className="text-[13px] font-bold text-[#181D17] leading-snug">
                  {crumb.title}
                </p>
                {crumb.badge && (
                  <span className="inline-flex px-1.5 py-0.5 rounded-md bg-[#F1F5EB] text-[10px] font-mono font-bold text-[#34422A] border border-[#DCE2D7]">
                    {crumb.badge}
                  </span>
                )}
              </div>

              <p className="text-[10.5px] text-[#78716C] pt-1 border-t border-[#EEF2E6]">
                اضغط للانتقال إلى هذه الصفحة
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

/**
 * Consolidated Ellipsis Pill Button (e.g. on Mobile or for 4+ middle items)
 */
function BreadcrumbGroupDots({
  items,
  startIndex,
  total,
}: {
  items: TrailItem[];
  startIndex: number;
  total: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const width = 310;
    let left = rect.left + rect.width / 2 - width / 2;
    if (left + width > window.innerWidth - 12) {
      left = window.innerWidth - width - 12;
    }
    if (left < 12) {
      left = 12;
    }
    setCoords({
      top: rect.bottom + 8,
      left,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    updatePosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (!isOpen) {
        setIsHovered(false);
      }
    }, 180);
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setIsOpen((prev) => !prev);
    setIsHovered(true);
  };

  const isVisible = isMounted && (isOpen || isHovered);

  return (
    <div className="relative inline-flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "h-6.5 px-2 rounded-[8px] text-xs font-bold transition-all duration-150 select-none flex items-center justify-center gap-1 cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-[#34422A]/30",
          isOpen || isHovered
            ? "bg-[#34422A] text-white shadow-xs scale-105 border border-[#34422A]"
            : "bg-[#F1F5EB] hover:bg-[#E4EBDC] text-[#54624C] hover:text-[#181D17] border border-[#DCE2D7] hover:border-[#CCDBC4]"
        )}
        aria-label={`المسار الأوسط المقتطع، ${items.length} صفحات`}
        aria-expanded={isVisible}
      >
        <MoreHorizontal className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono font-bold px-1 py-0.5 rounded bg-black/10">
          +{items.length}
        </span>
      </button>

      {isVisible &&
        createPortal(
          <div
            ref={popoverRef}
            style={{ top: coords.top, left: coords.left }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="fixed z-[9999] w-[300px] sm:w-[330px] max-h-[380px] overflow-hidden flex flex-col bg-white rounded-[18px] border border-[#CCDBC4] shadow-xl text-start font-cairo animate-in fade-in zoom-in-95 duration-150 select-none"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-3.5 pb-2.5 border-b border-[#EEF2E6] flex items-center justify-between">
              <div>
                <h4 className="text-[13px] font-bold text-[#181D17]">
                  المسار الأوسط ({items.length} محطات)
                </h4>
                <p className="text-[11px] text-[#78716C] mt-0.5">
                  انقر على أي صفحة للانتقال إليها
                </p>
              </div>
              {isOpen && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsHovered(false);
                  }}
                  className="w-6 h-6 rounded-md hover:bg-[#F1F5EB] text-[#78716C] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* List */}
            <div className="p-2 space-y-1 overflow-y-auto max-h-[260px]">
              {items.map((item, idx) => (
                <Link
                  key={`${item.href}-${idx}`}
                  href={item.href || "/"}
                  prefetch={true}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setIsHovered(false);
                    hardNavigate(item.href || "/");
                  }}
                  className="flex items-center justify-between p-2 rounded-[12px] hover:bg-[#F1F5EB] text-[#181D17] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-[#EEF2E6] group-hover:bg-[#34422A] group-hover:text-white text-[10px] font-mono font-bold text-[#34422A] flex items-center justify-center shrink-0 transition-colors">
                      {startIndex + idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-bold text-[#181D17] truncate">
                        {item.title}
                      </div>
                      {item.badge && (
                        <span className="text-[10px] text-[#55694D] font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#8A9584] group-hover:text-[#181D17] group-hover:-translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
