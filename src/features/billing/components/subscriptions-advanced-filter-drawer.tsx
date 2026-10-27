"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  CreditCard,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SubscriptionsFilterState {
  packageFilter: string;
  statusFilter: string;
  paymentStatusFilter: string;
  billingCycleFilter: string;
}

export const initialSubscriptionsFilterState: SubscriptionsFilterState = {
  packageFilter: "all",
  statusFilter: "all",
  paymentStatusFilter: "all",
  billingCycleFilter: "all",
};

interface SubscriptionsAdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SubscriptionsFilterState;
  onApplyFilters: (filters: SubscriptionsFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function SubscriptionsAdvancedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: SubscriptionsAdvancedFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<SubscriptionsFilterState>(filters);

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
    setLocalFilters(initialSubscriptionsFilterState);
    onResetFilters();
    onClose();
  };

  const packageOptions = [
    { id: "all", label: "جميع الباقات" },
    { id: "standard", label: "باقة الشقق المرخصة" },
  ];

  const statusOptions = [
    { id: "all", label: "جميع الحالات" },
    { id: "active", label: "نشط" },
    { id: "pending_payment", label: "بانتظار الدفع" },
    { id: "expiring_soon", label: "قريب الانتهاء" },
    { id: "paused", label: "موقوف" },
  ];

  const paymentOptions = [
    { id: "all", label: "جميع حالات الدفع" },
    { id: "paid", label: "مسدد تلقائياً" },
    { id: "pending", label: "فاتورة معلقة" },
  ];

  const cycleOptions = [
    { id: "all", label: "جميع الدورات" },
    { id: "monthly", label: "شهري" },
    { id: "annual", label: "سنوي" },
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
        <div className="w-screen sm:w-[440px] bg-white shadow-2xl flex flex-col border-e border-[#E2E6DC] animate-in slide-in-from-left duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EEF2E6] flex items-center justify-between bg-[#FAFCF8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E6] text-[#2E3C29] flex items-center justify-center shadow-2xs">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  تصفية الاشتراكات والفوترة
                </h2>
                <p className="text-xs text-[#556350]">
                  تحديد فلاتر دقيقة لباقات الملاك وحالات السداد
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#EEF2E6] flex items-center justify-center text-[#556350] hover:text-[#172115] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* 1. Subscription Status */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <ShieldCheck className="w-4 h-4 text-[#4B5940]" />
                <span>حالة الاشتراك</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((opt) => {
                  const isSelected = localFilters.statusFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, statusFilter: opt.id })}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-xs"
                          : "bg-white text-[#252A24] border-[#E2E6DC] hover:bg-[#F6F8F4]"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Payment Status */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <CreditCard className="w-4 h-4 text-[#4B5940]" />
                <span>حالة السداد والتحصيل</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {paymentOptions.map((opt) => {
                  const isSelected = localFilters.paymentStatusFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, paymentStatusFilter: opt.id })}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-xs"
                          : "bg-white text-[#252A24] border-[#E2E6DC] hover:bg-[#F6F8F4]"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Billing Cycle */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Calendar className="w-4 h-4 text-[#4B5940]" />
                <span>دورة الفوترة</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cycleOptions.map((opt) => {
                  const isSelected = localFilters.billingCycleFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, billingCycleFilter: opt.id })}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-xs"
                          : "bg-white text-[#252A24] border-[#E2E6DC] hover:bg-[#F6F8F4]"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Package Type */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Layers className="w-4 h-4 text-[#4B5940]" />
                <span>نوع الباقة</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {packageOptions.map((opt) => {
                  const isSelected = localFilters.packageFilter === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, packageFilter: opt.id })}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
                        isSelected
                          ? "bg-[#4B5940] text-white border-[#4B5940] shadow-xs"
                          : "bg-white text-[#252A24] border-[#E2E6DC] hover:bg-[#F6F8F4]"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-[#EEF2E6] bg-[#FAFCF8] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="h-10 px-4 rounded-xl border border-[#CCD4C6] bg-white hover:bg-[#F6F8F4] text-xs font-semibold text-[#556350] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط</span>
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="flex-1 h-10 px-5 rounded-xl bg-[#4B5940] hover:bg-[#3D4934] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>تطبيق الفلتر ({totalResultsCount} اشتراك)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
