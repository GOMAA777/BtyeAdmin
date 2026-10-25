"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { hardNavigate } from "@/lib/constants";
import { AutomationRule } from "../../types";

// Exact SVG Icons extracted directly from Figma node 1:23723

function RuleEyeIcon({ className, color = "#4B5940" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 8C10 9.10383 9.10383 10 8 10C6.89617 10 6 9.10383 6 8C6 6.89617 6.89617 6 8 6C9.10383 6 10 6.89617 10 8V8"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
      <path
        d="M1.63867 8C2.488 5.29533 5.01533 3.33333 8 3.33333C10.9853 3.33333 13.512 5.29533 14.3613 8C13.512 10.7047 10.9853 12.6667 8 12.6667C5.01533 12.6667 2.488 10.7047 1.63867 8H1.63867"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
    </svg>
  );
}

function RuleEditIcon({ className, color = "#252A24" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 15 15.0188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 15.0188C1.0875 15.0188 0.734375 14.8719 0.440625 14.5781C0.146875 14.2844 0 13.9313 0 13.5188V3.01875C0 2.60625 0.146875 2.25312 0.440625 1.95938C0.734375 1.66563 1.0875 1.51875 1.5 1.51875H8.19375L6.69375 3.01875H1.5V13.5188H12V8.30625L13.5 6.80625V13.5188C13.5 13.9313 13.3531 14.2844 13.0594 14.5781C12.7656 14.8719 12.4125 15.0188 12 15.0188H1.5M4.5 10.5188V7.33125L11.3813 0.45C11.5312 0.3 11.7 0.1875 11.8875 0.1125C12.075 0.0375 12.2625 0 12.45 0C12.65 0 12.8406 0.0375 13.0219 0.1125C13.2031 0.1875 13.3688 0.3 13.5188 0.45L14.5688 1.51875C14.7063 1.66875 14.8125 1.83438 14.8875 2.01562C14.9625 2.19688 15 2.38125 15 2.56875C15 2.75625 14.9656 2.94062 14.8969 3.12188C14.8281 3.30313 14.7188 3.46875 14.5688 3.61875L7.6875 10.5188H4.5M13.5188 2.56875L12.4688 1.51875L13.5188 2.56875M6 9.01875H7.05L11.4 4.66875L10.875 4.14375L10.3313 3.61875L6 7.95V9.01875"
        fill={color}
      />
    </svg>
  );
}

function RulePauseIcon({ className, color = "#181D17" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.25 10.5H6.75V4.5H5.25V10.5ZM8.25 10.5H9.75V4.5H8.25V10.5ZM7.5 15C6.4625 15 5.4875 14.8031 4.575 14.4094C3.6625 14.0156 2.86875 13.4812 2.19375 12.8062C1.51875 12.1312 0.984375 11.3375 0.590625 10.425C0.196875 9.5125 0 8.5375 0 7.5C0 6.4625 0.196875 5.4875 0.590625 4.575C0.984375 3.6625 1.51875 2.86875 2.19375 2.19375C2.86875 1.51875 3.6625 0.984375 4.575 0.590625C5.4875 0.196875 6.4625 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.5375 14.8031 9.5125 14.4094 10.425C14.0156 11.3375 13.4812 12.1312 12.8062 12.8062C12.1312 13.4812 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15ZM7.5 13.5C9.175 13.5 10.5938 12.9188 11.7563 11.7563C12.9188 10.5938 13.5 9.175 13.5 7.5C13.5 5.825 12.9188 4.40625 11.7563 3.24375C10.5938 2.08125 9.175 1.5 7.5 1.5C5.825 1.5 4.40625 2.08125 3.24375 3.24375C2.08125 4.40625 1.5 5.825 1.5 7.5C1.5 9.175 2.08125 10.5938 3.24375 11.7563C4.40625 12.9188 5.825 13.5 7.5 13.5Z"
        fill={color}
      />
    </svg>
  );
}

function RuleRefreshIcon({ className, color = "#252A24" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="16"
      viewBox="0 0 13.5 15.75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.75 15.75C5.8125 15.75 4.93437 15.5719 4.11562 15.2156C3.29688 14.8594 2.58437 14.3781 1.97812 13.7719C1.37188 13.1656 0.890625 12.4531 0.534375 11.6344C0.178125 10.8156 0 9.9375 0 9H1.5C1.5 10.4625 2.00938 11.7031 3.02813 12.7219C4.04688 13.7406 5.2875 14.25 6.75 14.25C8.2125 14.25 9.45312 13.7406 10.4719 12.7219C11.4906 11.7031 12 10.4625 12 9C12 7.5375 11.4906 6.29688 10.4719 5.27812C9.45312 4.25937 8.2125 3.75 6.75 3.75H6.6375L7.8 4.9125L6.75 6L3.75 3L6.75 0L7.8 1.0875L6.6375 2.25H6.75C7.6875 2.25 8.56562 2.42812 9.38437 2.78437C10.2031 3.14062 10.9156 3.62188 11.5219 4.22813C12.1281 4.83437 12.6094 5.54688 12.9656 6.36562C13.3219 7.18437 13.5 8.0625 13.5 9C13.5 9.9375 13.3219 10.8156 12.9656 11.6344C12.6094 12.4531 12.1281 13.1656 11.5219 13.7719C10.9156 14.3781 10.2031 14.8594 9.38437 15.2156C8.56562 15.5719 7.6875 15.75 6.75 15.75Z"
        fill={color}
      />
    </svg>
  );
}

function RuleTrashIcon({ className, color = "#B12515" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="14"
      viewBox="0 0 12 13.3333"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6667 3.33333L10.0887 11.428C10.039 12.1259 9.45832 12.6667 8.75867 12.6667H3.24133C2.54168 12.6667 1.96101 12.1259 1.91133 11.428L1.33333 3.33333M4.66667 6V10M7.33333 6V10M8 3.33333V1.33333C8 0.96539 7.70128 0.666667 7.33333 0.666667H4.66667C4.29872 0.666667 4 0.96539 4 1.33333V3.33333M0.666667 3.33333H11.3333"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
    </svg>
  );
}

function ThreeDotsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="3"
      height="12"
      viewBox="0 0 3 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
      <circle cx="1.5" cy="6" r="1.5" fill="currentColor" />
      <circle cx="1.5" cy="10.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

interface AutomationRuleActionDropdownProps {
  rule: AutomationRule;
  onPause?: (rule: AutomationRule) => void;
  onActivate?: (rule: AutomationRule) => void;
  onDelete?: (rule: AutomationRule) => void;
  className?: string;
}

export function AutomationRuleActionDropdown({
  rule,
  onPause,
  onActivate,
  onDelete,
  className,
}: AutomationRuleActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
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
    const menuWidth = 208; // Exact Figma width: 208px
    const menuHeight = 190; // Exact Figma height: 190px

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const openUp = spaceBelow < menuHeight + 12 && spaceAbove > spaceBelow;

    // In RTL tables, the actions button is positioned near the left edge.
    // We align the menu to the button, clamped safely within the viewport.
    let left = rect.left;
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }
    if (left < 12) {
      left = 12;
    }

    if (openUp) {
      setCoords({
        bottom: Math.max(10, window.innerHeight - rect.top + 6),
        left,
      });
    } else {
      setCoords({
        top: Math.max(10, rect.bottom + 6),
        left,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      setHoveredIndex(0); // Default selection on initial open matches Figma screenshot
    }
  }, [isOpen, updatePosition]);

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

  const handleActionClick = (action: () => void) => {
    setIsOpen(false);
    action();
  };

  return (
    <>
      {/* Trigger Button - 32x32px rounded-lg with 3 vertical dots (Figma 1:21467) */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleDropdown}
        aria-label="الاجراءات"
        aria-expanded={isOpen}
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center text-[#73786F] hover:text-[#181D17] hover:bg-[#EBEFE6] transition-colors cursor-pointer select-none",
          isOpen && "bg-[#EBEFE6] text-[#181D17]",
          className
        )}
      >
        <ThreeDotsIcon className="text-current" />
      </button>

      {/* Popover Menu: 100% exact match to Figma node 1:23723 ("الاجراءات") */}
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
            onMouseLeave={() => setHoveredIndex(0)}
            className="w-[208px] bg-white border border-[#E5E8E2] rounded-[14px] p-[7px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex flex-col gap-[4px] z-[9999] font-cairo select-none animate-in fade-in zoom-in-95 duration-100"
          >
            {/* Item 1: تفاصيل قاعدة الأتمتة (Figma 1:23725) */}
            <button
              type="button"
              onMouseEnter={() => setHoveredIndex(0)}
              onClick={() =>
                handleActionClick(() => hardNavigate(`/automation/rules/${rule.id}/`))
              }
              className={cn(
                "h-[32px] w-full rounded-[8px] px-2.5 flex items-center gap-[10px] text-right transition-colors cursor-pointer",
                hoveredIndex === 0
                  ? "bg-[#EAF1E8] text-[#4B5940] font-bold"
                  : "text-[#252A24] font-semibold hover:bg-[#EAF1E8]/60 hover:text-[#4B5940]"
              )}
            >
              <div className="size-4 shrink-0 flex items-center justify-center">
                <RuleEyeIcon color={hoveredIndex === 0 ? "#4B5940" : "#252A24"} />
              </div>
              <span className="text-[12px] leading-[16px] whitespace-nowrap">
                تفاصيل قاعدة الأتمتة
              </span>
            </button>

            {/* Item 2: تعديل قاعدة الأتمتة (Figma 1:23731) */}
            <button
              type="button"
              onMouseEnter={() => setHoveredIndex(1)}
              onClick={() =>
                handleActionClick(() => hardNavigate(`/automation/rules/${rule.id}/edit/`))
              }
              className={cn(
                "h-[32px] w-full rounded-[8px] px-2.5 flex items-center gap-[10px] text-right transition-colors cursor-pointer text-[#252A24]",
                hoveredIndex === 1
                  ? "bg-[#F3F6F1] font-bold"
                  : "font-semibold hover:bg-[#F3F6F1]"
              )}
            >
              <div className="size-4 shrink-0 flex items-center justify-center">
                <RuleEditIcon color="#252A24" />
              </div>
              <span className="text-[12px] leading-[16px] whitespace-nowrap">
                تعديل قاعدة الأتمتة
              </span>
            </button>

            {/* Item 3: إيقاف قاعدة الأتمتة (Figma 1:23736) */}
            <button
              type="button"
              onMouseEnter={() => setHoveredIndex(2)}
              onClick={() => handleActionClick(() => onPause?.(rule))}
              className={cn(
                "h-[32px] w-full rounded-[8px] px-2.5 flex items-center gap-[10px] text-right transition-colors cursor-pointer text-[#252A24]",
                hoveredIndex === 2
                  ? "bg-[#F3F6F1] font-bold"
                  : "font-semibold hover:bg-[#F3F6F1]"
              )}
            >
              <div className="size-4 shrink-0 flex items-center justify-center">
                <RulePauseIcon color="#181D17" />
              </div>
              <span className="text-[12px] leading-[16px] whitespace-nowrap">
                إيقاف قاعدة الأتمتة
              </span>
            </button>

            {/* Item 4: إعادة تفعيل قاعدة الأتمتة (Figma 1:23742) */}
            <button
              type="button"
              onMouseEnter={() => setHoveredIndex(3)}
              onClick={() => handleActionClick(() => onActivate?.(rule))}
              className={cn(
                "h-[32px] w-full rounded-[8px] px-2.5 flex items-center gap-[10px] text-right transition-colors cursor-pointer text-[#252A24]",
                hoveredIndex === 3
                  ? "bg-[#F3F6F1] font-bold"
                  : "font-semibold hover:bg-[#F3F6F1]"
              )}
            >
              <div className="size-4 shrink-0 flex items-center justify-center">
                <RuleRefreshIcon color="#252A24" />
              </div>
              <span className="text-[12px] leading-[16px] whitespace-nowrap">
                إعادة تفعيل قاعدة الأتمتة
              </span>
            </button>

            {/* Item 5: حذف قاعدة الأتمتة (Figma 1:23750) */}
            <button
              type="button"
              onMouseEnter={() => setHoveredIndex(4)}
              onClick={() => handleActionClick(() => onDelete?.(rule))}
              className={cn(
                "h-[32px] w-full rounded-[8px] px-2.5 flex items-center gap-[10px] text-right transition-colors cursor-pointer text-[#B02515]",
                hoveredIndex === 4
                  ? "bg-[#FDF3F2] font-bold"
                  : "font-semibold hover:bg-[#FDF3F2]"
              )}
            >
              <div className="size-4 shrink-0 flex items-center justify-center">
                <RuleTrashIcon color="#B12515" />
              </div>
              <span className="text-[12px] leading-[16px] whitespace-nowrap">
                حذف قاعدة الأتمتة
              </span>
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
