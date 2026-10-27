"use client";

import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, MoreHorizontal, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfirm, type ConfirmOptions } from "@/hooks/use-confirm";
import { hardNavigate } from "@/lib/constants";

export interface ActionDropdownItem {
  label: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "active" | "destructive";
  confirm?: ConfirmOptions;
}

interface ActionDropdownProps {
  items: ActionDropdownItem[];
  triggerIcon?: "vertical" | "horizontal" | ReactNode;
  triggerClassName?: string;
  align?: "end" | "start" | "center";
  ariaLabel?: string;
}

export function ActionDropdown({
  items,
  triggerIcon = "vertical",
  triggerClassName,
  align = "end",
  ariaLabel = "خيارات إضافية",
}: ActionDropdownProps) {
  const confirm = useConfirm();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 208; // w-52 = 13rem = 208px
    const estimatedHeight = items.length * 44 + 20;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Flip upwards if not enough space below AND there is more room above
    const openUp = spaceBelow < estimatedHeight + 12 && spaceAbove > spaceBelow;

    // In RTL tables, the 3-dots button is on the left edge.
    // By default, align the menu to start at trigger's left edge and extend inward,
    // clamped to viewport edges.
    let left = rect.left;
    if (align === "start") {
      left = rect.right - menuWidth;
    } else if (align === "center") {
      left = rect.left + rect.width / 2 - menuWidth / 2;
    }

    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }
    if (left < 12) {
      left = 12;
    }

    if (openUp) {
      const bottom = Math.min(
        Math.max(12, window.innerHeight - rect.top + 6),
        window.innerHeight - 24
      );
      setCoords({ bottom, left });
    } else {
      const top = Math.min(
        Math.max(12, rect.bottom + 6),
        Math.max(12, window.innerHeight - estimatedHeight - 12)
      );
      setCoords({ top, left });
    }
  }, [items.length, align]);

  // Recalculate position when opening
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  // Close on outside click, Escape, or window scroll/resize
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleScrollOrResize() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        setIsOpen(false);
      } else {
        updatePosition();
      }
    }

    // Use click (not mousedown) so menu item navigations aren't cancelled
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleDropdown}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        data-dropdown-trigger="true"
        className={cn(
          "w-8 h-8 rounded-full border border-transparent hover:border-[#4B5940]/40 hover:bg-[#F8FAF4] text-[#7D8A78] hover:text-[#172115] inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none active:scale-[0.96]",
          triggerClassName,
          isOpen && "!bg-white !text-[#4B5940] !border-[#4B5940] ring-4 ring-[#4B5940]/20 shadow-sm"
        )}
      >
        {triggerIcon === "vertical" ? (
          <MoreVertical className={cn("w-4 h-4 transition-colors", isOpen && "text-[#4B5940]")} />
        ) : triggerIcon === "horizontal" ? (
          <MoreHorizontal className={cn("w-4 h-4 transition-colors", isOpen && "text-[#4B5940]")} />
        ) : (
          triggerIcon
        )}
      </button>

      {/* Popover Menu rendered via Portal to document.body: Prevents any table scrollbar or clipping */}
      {isMounted && isOpen && coords &&
        createPortal(
          <div
            ref={menuRef}
            dir="rtl"
            style={{
              position: "fixed",
              ...(coords.top !== undefined ? { top: `${coords.top}px` } : {}),
              ...(coords.bottom !== undefined ? { bottom: `${coords.bottom}px` } : {}),
              left: `${coords.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-48 sm:w-52 max-h-[calc(100vh-24px)] overflow-y-auto bg-white rounded-2xl p-2 border border-[#E2E6DC] shadow-[0_12px_32px_rgba(0,0,0,0.14)] z-[9999] animate-in fade-in zoom-in-95 duration-150 space-y-1 font-cairo select-none"
          >
            {items.map((item, idx) => {
              const Icon = item.icon;
              const isDestructive = item.variant === "destructive";
              const isActive = item.variant === "active";

              const itemClasses = cn(
                "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none text-right",
                isDestructive
                  ? "text-[#C93B2B] hover:bg-[#FDF2F0] hover:text-[#B92A1A] bg-transparent"
                  : isActive
                  ? "bg-[#EEF2E6] text-[#2E3C29] hover:bg-[#E5EAE0]"
                  : "text-[#172115] hover:bg-[#EEF2E6] hover:text-[#172115] bg-transparent"
              );

              const content = (
                <>
                  {/* Text on the Right (First child in RTL) */}
                  <span className="truncate">{item.label}</span>

                  {/* Icon on the Left (Second child in RTL) */}
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 stroke-[2.2]",
                      isDestructive
                        ? "text-[#C93B2B]"
                        : isActive
                        ? "text-[#2E3C29]"
                        : "text-[#172115]"
                    )}
                  />
                </>
              );

              if (item.href) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      hardNavigate(item.href!);
                    }}
                    className={itemClasses}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={async () => {
                    setIsOpen(false);
                    if (item.confirm) {
                      const ok = await confirm(item.confirm);
                      if (!ok) return;
                    }
                    if (item.onClick) item.onClick();
                  }}
                  className={itemClasses}
                >
                  {content}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
