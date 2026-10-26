"use client";

import React from "react";
import Link from "next/link";
import { DecorativePlusBadge, FigmaRefreshIcon } from "./automation-figma-icons";

interface AutomationEmptyStateCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | React.ReactNode;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
  diagnosticPill?: {
    text: string;
    icon?: React.ReactNode;
  };
}

export function AutomationEmptyStateCard({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  diagnosticPill,
}: AutomationEmptyStateCardProps) {
  return (
    <div className="relative w-full bg-white border border-[#e5e8e2] rounded-[20px] shadow-[0px_4px_24px_0px_rgba(48,58,44,0.04)] min-h-[470px] overflow-hidden flex flex-col items-center justify-center p-8 md:p-12 text-center font-cairo">
      {/* Subtle Ambient Background Glows (Figma node 1:26175 & 1:26176) */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -start-24 size-96 rounded-full bg-[rgba(234,241,232,0.6)] blur-[32px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -end-24 size-96 rounded-full bg-[rgba(245,241,232,0.7)] blur-[32px] pointer-events-none"
      />

      {/* Central Decorative Icon Container (Figma node 1:26178) */}
      <div className="relative mb-6 z-10">
        <div
          className="relative size-[96px] rounded-[16px] border border-[#d9e3d5] p-px flex items-center justify-center shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgb(234, 241, 232) 0%, rgb(245, 241, 232) 100%)",
          }}
        >
          {icon}
        </div>
        <DecorativePlusBadge />
      </div>

      {/* Main Title & Narrative (Figma node 1:26193) */}
      <div className="relative z-10 max-w-[576px] space-y-3">
        <h2 className="text-[#232b20] font-bold text-[24px] leading-[32px]">
          {title}
        </h2>
        <div className="text-[#5f6c5b] font-normal text-[15px] leading-[24.4px]">
          {description}
        </div>

        {/* Primary & Secondary Action Buttons (Figma node 1:26198) */}
        {(primaryAction || secondaryAction) && (
          <div className="pt-4 flex items-center justify-center gap-[14px] flex-wrap">
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="bg-[#f7f8f5] border border-[#e5e8e2] rounded-[12px] h-[48px] px-[25px] text-[#303a2c] font-semibold text-[14px] leading-[20px] inline-flex items-center gap-[8px] hover:bg-[#ebefe6] transition-colors cursor-pointer"
              >
                <span>{secondaryAction.label}</span>
                <FigmaRefreshIcon className="size-[12px] text-[#63725F]" />
              </button>
            )}

            {primaryAction &&
              (primaryAction.href ? (
                <Link
                  href={primaryAction.href}
                  className="bg-[#4b5940] hover:bg-[#3d4b36] rounded-[12px] h-[48px] px-[32px] text-white font-bold text-[14px] leading-[20px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] inline-flex items-center gap-[8px] transition-colors cursor-pointer"
                >
                  <span>{primaryAction.label}</span>
                  {primaryAction.icon}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="bg-[#4b5940] hover:bg-[#3d4b36] rounded-[12px] h-[48px] px-[32px] text-white font-bold text-[14px] leading-[20px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] inline-flex items-center gap-[8px] transition-colors cursor-pointer"
                >
                  <span>{primaryAction.label}</span>
                  {primaryAction.icon}
                </button>
              ))}
          </div>
        )}

        {/* Operational State / Standby Diagnostic Pill (Figma node 1:26631) */}
        {diagnosticPill && (
          <div className="pt-4 flex justify-center">
            <div className="bg-[rgba(216,232,203,0.5)] rounded-full px-[16px] py-[8px] inline-flex items-center gap-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[rgba(216,232,203,0.8)]">
              <span className="size-[8px] rounded-full bg-[#34422a] shrink-0 animate-pulse" />
              <span className="text-[#5a6952] font-semibold text-[12px] leading-[18px]">
                {diagnosticPill.text}
              </span>
              {diagnosticPill.icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
