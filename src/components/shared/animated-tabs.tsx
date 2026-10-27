"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface AnimatedTabItem {
  id: string;
  label: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: ReactNode;
}

interface AnimatedTabsProps {
  tabs: AnimatedTabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Unique per tab group so pills don't fight across pages */
  layoutId: string;
  /**
   * dark = owner-detail style (olive pill + white text)
   * light = list filter style (white pill on grey track)
   */
  variant?: "dark" | "light";
  className?: string;
  trackClassName?: string;
  size?: "sm" | "md";
}

const SPRING = { type: "spring" as const, stiffness: 350, damping: 28 };

/**
 * Sliding-pill tab bar — same motion language as owner detail tabs.
 */
export function AnimatedTabs({
  tabs,
  value,
  onChange,
  layoutId,
  variant = "light",
  className,
  trackClassName,
  size = "sm",
}: AnimatedTabsProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex items-center gap-1 overflow-x-auto no-scrollbar",
        isDark
          ? "bg-white rounded-2xl p-1.5 border border-[#E2E6DC] shadow-2xs gap-2"
          : "p-1 bg-[#EFF2EB] rounded-full",
        trackClassName,
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative whitespace-nowrap cursor-pointer select-none transition-colors duration-200 flex items-center gap-2",
              size === "md"
                ? isDark ? "px-4 py-2.5 rounded-xl text-xs font-bold" : "px-4 py-2.5 rounded-full text-xs font-bold"
                : isDark ? "px-3.5 py-1.5 rounded-xl text-xs font-semibold" : "px-3.5 py-1.5 rounded-full text-xs font-semibold",
              isDark
                ? isActive
                  ? "text-white"
                  : "text-[#556350] hover:text-[#172115] hover:bg-[#F6F8F4]"
                : isActive
                  ? "text-[#252A24] font-bold"
                  : "text-[#687163] hover:text-[#252A24] font-medium"
            )}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className={cn(
                  "absolute inset-0 z-0 shadow-2xs",
                  isDark
                    ? "bg-[#34432E] rounded-xl"
                    : "bg-white rounded-full shadow-xs"
                )}
                transition={SPRING}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {Icon && (
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors duration-200",
                    isDark
                      ? isActive
                        ? "text-white"
                        : "text-[#7D8A78]"
                      : isActive
                        ? "text-[#252A24]"
                        : "text-[#687163]"
                  )}
                />
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[11px] font-bold",
                    isDark
                      ? isActive
                        ? "bg-white/15 text-white"
                        : "bg-[#EFF2EB] text-[#687163]"
                      : isActive
                        ? "bg-[#EFF2EB] text-[#4B5940]"
                        : "bg-white/70 text-[#687163]"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface AnimatedTabPanelProps {
  tabKey: string;
  children: ReactNode;
  className?: string;
}

/** Fade/slide panel swap — same as owner detail tab content. */
export function AnimatedTabPanel({ tabKey, children, className }: AnimatedTabPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tabKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
