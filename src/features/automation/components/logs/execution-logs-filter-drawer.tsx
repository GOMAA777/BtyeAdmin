"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Building,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExecutionLogsFilterState {
  status: string;
  actionType: string;
  propertyName: string;
}

export const initialExecutionLogsFilterState: ExecutionLogsFilterState = {
  status: "all",
  actionType: "all",
  propertyName: "all",
};

interface ExecutionLogsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ExecutionLogsFilterState;
  onApplyFilters: (filters: ExecutionLogsFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount?: number;
}

export function ExecutionLogsFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: ExecutionLogsFilterDrawerProps) {
  const [localFilters, setLocalFilters] =
    useState<ExecutionLogsFilterState>(filters);

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
    setLocalFilters(initialExecutionLogsFilterState);
    onResetFilters();
    onClose();
  };

  const statusOptions = [
    { id: "all", label: "جميع الحالات" },
    { id: "success", label: "نجح (مرسل بنجاح)" },
    { id: "failed", label: "فشل (تعذر الإرسال)" },
    { id: "in_progress", label: "قيد التنفيذ" },
  ];

  const actionTypeOptions = [
    { id: "all", label: "جميع الإجراءات" },
    { id: "whatsapp", label: "رسالة WhatsApp" },
    { id: "smart_lock", label: "كود القفل الذكي" },
    { id: "cleaning_task", label: "مهمة تنظيف" },
    { id: "security_alert", label: "تنبيه أمان / صيانة" },
    { id: "review", label: "طلب تقييم" },
  ];

  const propertyOptions = [
    { id: "all", label: "جميع العقارات" },
    { id: "عمارة النخيل السكنية", label: "عمارة النخيل السكنية" },
    { id: "برج الملقا الفاخر", label: "برج الملقا الفاخر" },
    { id: "مجمع الصحافة السكني", label: "مجمع الصحافة السكني" },
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
                  تصفية سجلات التنفيذ المتقدمة
                </h2>
                <p className="text-xs text-[#556350]">
                  تخصيص الفرز حسب الحالة، نوع الإجراء، والعقار
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
            {/* 1. Status Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <ShieldCheck className="w-4 h-4 text-[#4B5940]" />
                <span>حالة التنفيذ</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
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

            {/* 2. Action Type Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Activity className="w-4 h-4 text-[#4B5940]" />
                <span>نوع الإجراء التلقائي</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {actionTypeOptions.map((opt) => {
                  const isSelected = localFilters.actionType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, actionType: opt.id })
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

            {/* 3. Property Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Building className="w-4 h-4 text-[#4B5940]" />
                <span>العقار / المجمع السكني</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {propertyOptions.map((opt) => {
                  const isSelected = localFilters.propertyName === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          propertyName: opt.id,
                        })
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
