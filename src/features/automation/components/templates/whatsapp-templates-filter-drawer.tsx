"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Layers,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface WhatsAppTemplatesFilterState {
  category: string;
  status: string;
  language: string;
}

export const initialWhatsAppTemplatesFilterState: WhatsAppTemplatesFilterState = {
  category: "all",
  status: "all",
  language: "all",
};

interface WhatsAppTemplatesFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: WhatsAppTemplatesFilterState;
  onApplyFilters: (filters: WhatsAppTemplatesFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount?: number;
}

export function WhatsAppTemplatesFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: WhatsAppTemplatesFilterDrawerProps) {
  const [localFilters, setLocalFilters] =
    useState<WhatsAppTemplatesFilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(initialWhatsAppTemplatesFilterState);
    onResetFilters();
    onClose();
  };

  const categoryOptions = [
    { id: "all", label: "جميع الفئات" },
    { id: "bookings", label: "الحجوزات" },
    { id: "arrival", label: "الوصول" },
    { id: "door_pin", label: "كود الدخول" },
    { id: "departure", label: "المغادرة" },
    { id: "operations", label: "التشغيل" },
  ];

  const statusOptions = [
    { id: "all", label: "جميع الحالات" },
    { id: "active", label: "مفعل (معتمد من Meta)" },
    { id: "paused", label: "متوقف مؤقتاً" },
    { id: "draft", label: "مسودة قيد المراجعة" },
  ];

  const languageOptions = [
    { id: "all", label: "جميع اللغات" },
    { id: "ar", label: "العربية (ar)" },
    { id: "en", label: "الإنجليزية (en)" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-cairo" dir="rtl">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel on Left in RTL */}
      <div className="fixed inset-y-0 left-0 max-w-full flex z-50">
        <div className="w-screen sm:w-[460px] bg-white shadow-2xl flex flex-col border-e border-[#E2E6DC] animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EEF2E6] flex items-center justify-between bg-[#FAFCF8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  تصفية قوالب واتساب المتقدمة
                </h2>
                <p className="text-xs text-[#556350]">
                  تخصيص تصنيف القوالب وحالة الاعتماد واللغة
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#EEF2E6] flex items-center justify-center text-[#556350] hover:text-[#172115] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 1. Category Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Layers className="w-4 h-4 text-[#4B5940]" />
                <span>فئة القالب</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((opt) => {
                  const isSelected = localFilters.category === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, category: opt.id })
                      }
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-start",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-xs"
                          : "bg-white text-[#252A24] border-[#E2E6DC] hover:bg-[#F6F8F4]"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Status Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <ShieldCheck className="w-4 h-4 text-[#4B5940]" />
                <span>حالة الاعتماد في Meta</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {statusOptions.map((opt) => {
                  const isSelected = localFilters.status === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, status: opt.id })
                      }
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-start",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-xs"
                          : "bg-white text-[#252A24] border-[#E2E6DC] hover:bg-[#F6F8F4]"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Language Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Globe className="w-4 h-4 text-[#4B5940]" />
                <span>لغة القالب</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {languageOptions.map((opt) => {
                  const isSelected = localFilters.language === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, language: opt.id })
                      }
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer text-start",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-xs"
                          : "bg-white text-[#252A24] border-[#E2E6DC] hover:bg-[#F6F8F4]"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-[#EEF2E6] bg-[#FAFCF8] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-[#DCE2D7] hover:bg-[#F0F4EC] text-xs font-semibold text-[#454840] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#4B5940] hover:bg-[#3D4934] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>
                تطبيق التصفية
                {totalResultsCount !== undefined ? ` (${totalResultsCount})` : ""}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
