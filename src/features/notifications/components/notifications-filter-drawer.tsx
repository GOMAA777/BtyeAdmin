"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Bell,
  CalendarDays,
  Wrench,
  Receipt,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationCategory, NotificationPriority } from "../types";

export interface NotificationsFilterState {
  readStatus: "all" | "unread" | "read";
  priority: "all" | NotificationPriority;
  category: "all" | NotificationCategory;
}

export const initialNotificationsFilterState: NotificationsFilterState = {
  readStatus: "all",
  priority: "all",
  category: "all",
};

interface NotificationsFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: NotificationsFilterState;
  onApplyFilters: (filters: NotificationsFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount?: number;
}

export function NotificationsFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: NotificationsFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<NotificationsFilterState>(filters);

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

  // Lock body scroll when drawer is open
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

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters(initialNotificationsFilterState);
    onResetFilters();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-cairo" dir="rtl">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Container (Side drawer in RTL, slides from right) */}
      <div className="absolute inset-y-0 end-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white border-s border-[#DCE2D7] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          {/* 1. Drawer Header */}
          <div className="p-5 border-b border-[#DCE2D7] flex items-center justify-between gap-3 bg-[#F9FAF8]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#4B5940] text-white flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#252A24]">
                  تصفية الإشعارات
                </h3>
                <p className="text-xs text-[#687163] mt-0.5">
                  تحديد دقيق للإشعارات حسب القراءة والأولوية والقسم
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-[#DCE2D7] text-[#687163] hover:text-[#252A24] hover:bg-[#EFF2EB] flex items-center justify-center transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Drawer Body: Filter Controls */}
          <div className="p-5 space-y-6 overflow-y-auto flex-1 divide-y divide-[#EFF2EB]">
            {/* Filter 1: Read Status */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#252A24] block">
                حالة القراءة
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "unread", label: "غير مقروءة" },
                  { id: "read", label: "مقروءة" },
                ].map((opt) => {
                  const isSelected = localFilters.readStatus === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          readStatus: opt.id as "all" | "unread" | "read",
                        }))
                      }
                      className={cn(
                        "h-9 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-2xs"
                          : "bg-[#EFF2EB] text-[#687163] border-[#CCD4C6] hover:bg-[#E2E7DE] hover:text-[#252A24]"
                      )}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 2: Priority */}
            <div className="pt-5 space-y-3">
              <label className="text-xs font-bold text-[#252A24] block">
                مستوى الأولوية
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "كافة المستويات", icon: AlertTriangle },
                  { id: "urgent", label: "عاجل جداً", icon: AlertTriangle },
                  { id: "high", label: "هام", icon: AlertTriangle },
                  { id: "normal", label: "عادي", icon: Check },
                  { id: "low", label: "منخفض", icon: Check },
                ].map((opt) => {
                  const isSelected = localFilters.priority === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          priority: opt.id as "all" | NotificationPriority,
                        }))
                      }
                      className={cn(
                        "h-10 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 select-none",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-2xs"
                          : "bg-[#EFF2EB] text-[#687163] border-[#CCD4C6] hover:bg-[#E2E7DE] hover:text-[#252A24]"
                      )}
                    >
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                          isSelected
                            ? "border-white bg-white/20"
                            : "border-[#CCD4C6] bg-white"
                        )}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter 3: Category */}
            <div className="pt-5 space-y-3">
              <label className="text-xs font-bold text-[#252A24] block">
                القسم والتصنيف
              </label>
              <div className="space-y-2">
                {[
                  { id: "all", label: "كافة الأقسام", icon: Bell },
                  { id: "bookings", label: "الحجوزات والنزلاء", icon: CalendarDays },
                  { id: "operations", label: "الصيانة والتشغيل", icon: Wrench },
                  { id: "billing", label: "الاشتراكات والفوترة المالية", icon: Receipt },
                  { id: "automation", label: "الأتمتة والرسائل", icon: Zap },
                  { id: "system", label: "الأمان والنظام", icon: ShieldCheck },
                ].map((cat) => {
                  const isSelected = localFilters.category === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters((prev) => ({
                          ...prev,
                          category: cat.id as "all" | NotificationCategory,
                        }))
                      }
                      className={cn(
                        "w-full h-11 px-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between select-none",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-2xs"
                          : "bg-[#EFF2EB]/70 hover:bg-[#EFF2EB] text-[#252A24] border-[#CCD4C6]"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{cat.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Drawer Footer: Action Buttons */}
          <div className="p-4 border-t border-[#DCE2D7] bg-[#F9FAF8] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-[#CCD4C6] bg-white hover:bg-[#EFF2EB] text-[#687163] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>تطبيق التصفية</span>
              {totalResultsCount !== undefined && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
                  {totalResultsCount} نتيجة
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
