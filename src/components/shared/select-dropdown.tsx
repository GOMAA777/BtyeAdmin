"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface SelectDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: (string | SelectOption)[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  disabled?: boolean;
  name?: string;
  ariaLabel?: string;
}

export function SelectDropdown({
  value,
  onChange,
  options,
  placeholder = "اختر...",
  className,
  triggerClassName,
  menuClassName,
  disabled = false,
  name,
  ariaLabel,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Normalize options
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Dynamic placement (open top if close to viewport bottom)
  const calculatePlacement = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const estimatedHeight = Math.min(normalizedOptions.length * 40 + 16, 240);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < estimatedHeight + 16 && spaceAbove > spaceBelow) {
      setPlacement("top");
    } else {
      setPlacement("bottom");
    }
  }, [normalizedOptions.length]);

  useEffect(() => {
    if (isOpen) {
      calculatePlacement();
    }
  }, [isOpen, calculatePlacement]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optValue: string, isOptDisabled?: boolean) => {
    if (isOptDisabled) return;
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      dir="rtl"
    >
      {/* Hidden input for native form compatibility */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={cn(
          "w-full bg-[#F1F5EB] border border-[#E0E5D8]/70 hover:border-[#CCD5C5] focus:outline-none focus:bg-white focus:border-[#CCD5C5] rounded-2xl h-12 px-4 text-xs font-semibold text-[#172115] flex items-center justify-between transition-all cursor-pointer select-none text-right",
          isOpen && "bg-white border-[#34432E]/60 ring-2 ring-[#34432E]/10 shadow-2xs",
          disabled && "opacity-50 cursor-not-allowed",
          triggerClassName
        )}
      >
        {/* Selected Label or Placeholder */}
        <span
          className={cn(
            "truncate",
            !selectedOption && "text-[#7D8A78]/70 font-normal"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Chevron Icon on Left (start in RTL) */}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#7D8A78] shrink-0 transition-transform duration-200",
            isOpen && "rotate-180 text-[#34432E]"
          )}
        />
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute z-50 w-full bg-white rounded-2xl border border-[#E2E6DC] shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5 space-y-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-150",
            placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
            menuClassName
          )}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            const Icon = opt.icon;

            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={opt.disabled}
                onClick={() => handleSelect(opt.value, opt.disabled)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer select-none text-right",
                  isSelected
                    ? "bg-[#EEF2E6] text-[#2E3C29] font-bold"
                    : "text-[#172115] font-medium hover:bg-[#F4F6F0] hover:text-[#2E3C29]",
                  opt.disabled && "opacity-40 cursor-not-allowed hover:bg-transparent"
                )}
              >
                {/* Text & optional Icon on Right (RTL start) */}
                <div className="flex items-center gap-2 truncate">
                  {Icon && <Icon className="w-4 h-4 shrink-0 text-[#7D8A78]" />}
                  <span className="truncate">{opt.label}</span>
                </div>

                {/* Checkmark on Left when selected */}
                {isSelected && (
                  <Check className="w-4 h-4 text-[#34432E] shrink-0 stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
