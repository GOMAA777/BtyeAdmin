"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Clock, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string; // Format: "03:00 م" or "12:00 م"
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
}

const HOURS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const MINUTES = ["00", "15", "30", "45"];
const PERIODS = [
  { id: "ص", label: "صباحاً (ص)" },
  { id: "م", label: "مساءً (م)" },
];

const QUICK_TIMES = [
  "09:00 ص",
  "12:00 م",
  "01:00 م",
  "03:00 م",
  "04:00 م",
  "06:00 م",
  "08:00 م",
  "10:00 م",
];

export function TimePicker({
  value,
  onChange,
  placeholder = "اختر الوقت...",
  className,
  triggerClassName,
  disabled = false,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");

  // Parse current value
  const parseTime = (val?: string) => {
    if (!val) return { hour: "03", minute: "00", period: "م" };
    const match = val.match(/(\d{1,2}):(\d{2})\s*(ص|م)/);
    if (match) {
      return {
        hour: match[1].padStart(2, "0"),
        minute: match[2],
        period: match[3],
      };
    }
    return { hour: "03", minute: "00", period: "م" };
  };

  const current = parseTime(value);
  const [selectedHour, setSelectedHour] = useState(current.hour);
  const [selectedMinute, setSelectedMinute] = useState(current.minute);
  const [selectedPeriod, setSelectedPeriod] = useState(current.period);

  useEffect(() => {
    if (value) {
      const parsed = parseTime(value);
      setSelectedHour(parsed.hour);
      setSelectedMinute(parsed.minute);
      setSelectedPeriod(parsed.period);
    }
  }, [value]);

  const calculatePlacement = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const popupHeight = 280;

    if (spaceBelow < popupHeight && rect.top > spaceBelow) {
      setPlacement("top");
    } else {
      setPlacement("bottom");
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      calculatePlacement();
    }
  }, [isOpen, calculatePlacement]);

  // Click outside and escape handling
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

  const handleApply = (hour: string, min: string, per: string) => {
    setSelectedHour(hour);
    setSelectedMinute(min);
    setSelectedPeriod(per);
    onChange(`${hour}:${min} ${per}`);
  };

  const handleQuickSelect = (timeStr: string) => {
    const parsed = parseTime(timeStr);
    setSelectedHour(parsed.hour);
    setSelectedMinute(parsed.minute);
    setSelectedPeriod(parsed.period);
    onChange(timeStr);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block w-full font-cairo", className)}
      dir="rtl"
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full h-11 px-3.5 rounded-[12px] bg-white border border-[#E2E6DC] text-right flex items-center justify-between gap-2.5 transition-all text-xs sm:text-sm shadow-3xs cursor-pointer select-none",
          "hover:border-[#4B5940]/60 hover:bg-[#FBFDF9]",
          "focus:outline-none focus:ring-2 focus:ring-[#4B5940]/25 focus:border-[#4B5940]",
          isOpen && "ring-2 ring-[#4B5940]/25 border-[#4B5940]",
          disabled && "opacity-50 cursor-not-allowed bg-[#F4F6F0]",
          triggerClassName
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Clock className="w-4 h-4 text-[#7D8A78] shrink-0" />
          <span
            className={cn(
              "truncate font-medium",
              value ? "text-[#181D17]" : "text-[#8A9584]"
            )}
          >
            {value || placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-[#7D8A78] shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          ref={popupRef}
          className={cn(
            "absolute z-50 w-72 bg-white rounded-2xl border border-[#E2E6DC] shadow-xl p-3.5 animate-in fade-in zoom-in-95 duration-150",
            placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
            "start-0"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F3EB]">
            <span className="text-xs font-bold text-[#181D17]">تحديد الوقت</span>
            <span className="text-xs font-mono font-bold text-[#34422A] bg-[#EEF2E6] px-2 py-0.5 rounded-md" dir="ltr">
              {selectedHour}:{selectedMinute} {selectedPeriod}
            </span>
          </div>

          {/* Quick Select Chips */}
          <div className="mb-3">
            <span className="text-[10px] font-medium text-[#7D8A78] block mb-1.5">أوقات شائعة</span>
            <div className="grid grid-cols-4 gap-1">
              {QUICK_TIMES.map((qt) => (
                <button
                  key={qt}
                  type="button"
                  onClick={() => handleQuickSelect(qt)}
                  className={cn(
                    "text-[10.5px] py-1 px-1 rounded-lg border text-center transition-colors cursor-pointer select-none",
                    value === qt
                      ? "bg-[#34422A] text-white border-[#34422A] font-bold"
                      : "bg-[#F7F9F4] text-[#2C3527] border-[#E8EDE2] hover:bg-[#EEF2E6]"
                  )}
                >
                  {qt}
                </button>
              ))}
            </div>
          </div>

          {/* Time Picker Columns */}
          <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#F7F9F4] rounded-xl border border-[#EEF2E6]">
            {/* Hours */}
            <div>
              <span className="block text-[10px] text-center font-bold text-[#687163] mb-1">الساعة</span>
              <div className="max-h-32 overflow-y-auto space-y-0.5 scrollbar-thin">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleApply(h, selectedMinute, selectedPeriod)}
                    className={cn(
                      "w-full text-center py-1 text-xs rounded-md font-mono transition-colors cursor-pointer",
                      selectedHour === h
                        ? "bg-[#34422A] text-white font-bold"
                        : "hover:bg-[#EAEFE4] text-[#181D17]"
                    )}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div>
              <span className="block text-[10px] text-center font-bold text-[#687163] mb-1">الدقيقة</span>
              <div className="max-h-32 overflow-y-auto space-y-0.5 scrollbar-thin">
                {MINUTES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleApply(selectedHour, m, selectedPeriod)}
                    className={cn(
                      "w-full text-center py-1 text-xs rounded-md font-mono transition-colors cursor-pointer",
                      selectedMinute === m
                        ? "bg-[#34422A] text-white font-bold"
                        : "hover:bg-[#EAEFE4] text-[#181D17]"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Period */}
            <div>
              <span className="block text-[10px] text-center font-bold text-[#687163] mb-1">الفترة</span>
              <div className="space-y-1">
                {PERIODS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleApply(selectedHour, selectedMinute, p.id)}
                    className={cn(
                      "w-full text-center py-2 text-xs rounded-lg font-bold transition-colors cursor-pointer",
                      selectedPeriod === p.id
                        ? "bg-[#34422A] text-white"
                        : "bg-white border border-[#E2E6DC] text-[#2C3527] hover:bg-[#EEF2E6]"
                    )}
                  >
                    {p.id === "ص" ? "ص" : "م"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="mt-3 flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-1.5 px-3 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white text-xs font-bold transition-colors cursor-pointer select-none"
            >
              تم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
