"use client";

import { Sliders, MessageSquare, History } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { AutomationMainTab } from "../types";

interface AutomationTabsNavProps {
  activeTab?: AutomationMainTab;
  currentTab?: AutomationMainTab;
  onTabChange?: (tab: AutomationMainTab) => void;
  counts?: {
    rules: number;
    templates: number;
    logs: number;
  };
}

export function AutomationTabsNav({
  activeTab,
  currentTab,
  onTabChange,
  counts = { rules: 0, templates: 0, logs: 0 },
}: AutomationTabsNavProps) {
  const selectedTab = activeTab || currentTab || "rules";

  const tabs = [
    {
      id: "rules" as const,
      label: "قواعد الأتمتة",
      icon: Sliders,
      badge: `${counts.rules} قاعدة نشطة`,
    },
    {
      id: "templates" as const,
      label: "قوالب واتساب",
      icon: MessageSquare,
      badge: `${counts.templates} قوالب`,
    },
    {
      id: "logs" as const,
      label: "سجل التنفيذ",
      icon: History,
      badge: `${counts.logs.toLocaleString()} عملية`,
    },
  ];

  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[6px] flex items-center gap-[8px] font-cairo overflow-x-auto w-fit select-none">
      {tabs.map((tab) => {
        const isActive = selectedTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              "relative px-[16px] py-[10px] rounded-[12px] flex items-center gap-[8px] text-[14px] leading-[20px] transition-colors cursor-pointer whitespace-nowrap",
              isActive
                ? "font-bold text-[#34422a]"
                : "font-semibold text-[#454840] hover:text-[#181d17] hover:bg-[#f6fbf1]/50"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="automationNavActiveIndicator"
                className="absolute inset-0 bg-[#f6fbf1] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] z-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-[8px]">
              <Icon
                className={cn(
                  "size-[16px] transition-colors",
                  isActive ? "text-[#34422a]" : "text-[#454840]"
                )}
              />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-[8px] py-[2px] rounded-full text-[11px] leading-[16px] transition-colors",
                  isActive
                    ? "bg-[#d8e8cb] text-[#5a6952] font-semibold"
                    : "bg-[#dfe4db] text-[#454840] font-medium"
                )}
              >
                {tab.badge}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
