"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  activeCount?: number;
  label?: string;
  size?: "sm" | "md";
}

/**
 * Standard data filter pill button matching platform design fidelity.
 * Features:
 * - Rounded-full pill container
 * - Text label ("فلتر" by default)
 * - Lucide SlidersHorizontal icon
 * - Active state with olive background (#4B5940) and numerical badge
 */
export function FilterButton({
  activeCount = 0,
  label = "فلتر",
  size = "md",
  className,
  type = "button",
  ...props
}: FilterButtonProps) {
  const isActive = activeCount > 0;

  return (
    <button
      type={type}
      className={cn(
        "rounded-full font-semibold flex items-center gap-2 transition-all cursor-pointer select-none font-cairo shrink-0",
        size === "sm" ? "h-9 px-3.5 text-xs" : "h-10 px-4 text-xs",
        isActive
          ? "bg-[#4B5940] text-white shadow-xs"
          : "bg-[#EFF2EB] hover:bg-[#E2E7DE] text-[#252A24]",
        className
      )}
      title={props.title || "تصفية البيانات"}
      {...props}
    >
      <span>{label}</span>
      <SlidersHorizontal
        className={cn(
          "w-3.5 h-3.5 shrink-0",
          isActive ? "text-white" : "text-[#252A24]"
        )}
      />
      {isActive && (
        <span className="min-w-4 h-4 px-1 rounded-full bg-white text-[#4B5940] text-[10px] font-bold flex items-center justify-center shrink-0 leading-none">
          {activeCount}
        </span>
      )}
    </button>
  );
}
