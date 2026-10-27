"use client";

import React from "react";
import { Folder } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string | React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      dir="rtl"
      className={`py-14 px-4 flex flex-col items-center justify-center text-center space-y-3 font-cairo ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#EBEFE6] text-[#4B5940] flex items-center justify-center shadow-xs">
        {icon || <Folder className="w-7 h-7" />}
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="text-base font-bold text-[#181D17]">{title}</h3>
        {description && (
          <div className="text-xs sm:text-sm text-[#75786F] leading-relaxed">
            {description}
          </div>
        )}
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-2 bg-[#4B5940] hover:bg-[#3D4934] text-white text-xs sm:text-sm font-semibold h-10 px-5 rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer select-none"
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      )}
    </div>
  );
}
