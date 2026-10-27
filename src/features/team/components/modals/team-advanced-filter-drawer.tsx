"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Users,
  ShieldCheck,
  Building,
  CheckCircle2,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamFilterState {
  role: string;
  status: string;
  property: string;
  whatsappLinked: string;
  sortBy: string;
}

export const initialTeamFilterState: TeamFilterState = {
  role: "all",
  status: "all",
  property: "all",
  whatsappLinked: "all",
  sortBy: "name_asc",
};

interface TeamAdvancedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: TeamFilterState;
  onApplyFilters: (filters: TeamFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function TeamAdvancedFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: TeamAdvancedFilterDrawerProps) {
  const [localFilters, setLocalFilters] = useState<TeamFilterState>(filters);

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
    setLocalFilters(initialTeamFilterState);
    onResetFilters();
    onClose();
  };

  const roleOptions = [
    { id: "all", label: "جميع الأدوار والتخصصات" },
    { id: "cleaner", label: "عمال النظافة" },
    { id: "maintenance", label: "فنيو الصيانة" },
    { id: "supervisor", label: "المشرفون الميدانيون" },
  ];

  const statusOptions = [
    { id: "all", label: "جميع الحالات" },
    { id: "active", label: "نشط بالعمل" },
    { id: "suspended", label: "موقوف مؤقتاً" },
    { id: "leave", label: "في إجازة" },
  ];

  const propertyOptions = [
    { id: "all", label: "جميع العقارات والمواقع" },
    { id: "عمارة النخيل", label: "عمارة النخيل" },
    { id: "برج الياسمين", label: "برج الياسمين" },
    { id: "فيلا النرجس", label: "فيلا النرجس" },
  ];

  const sortOptions = [
    { id: "name_asc", label: "الاسم (أ - ي)" },
    { id: "tasks_desc", label: "المهام الجارية (الأكثر)" },
    { id: "completed_desc", label: "المهام المنجزة (الأعلى)" },
    { id: "joined_desc", label: "الأحدث انضماماً" },
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
                  تصفية فريق العمل المتقدمة
                </h2>
                <p className="text-xs text-[#556350]">
                  تخصيص معايير البحث والفرز لأعضاء الفريق
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
            {/* 1. Member Role */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Users className="w-4 h-4 text-[#4B5940]" />
                <span>نوع التكليف / الدور</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map((opt) => {
                  const isSelected = localFilters.role === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, role: opt.id })}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
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

            {/* 2. Member Status */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <ShieldCheck className="w-4 h-4 text-[#4B5940]" />
                <span>الحالة التشغيلية</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((opt) => {
                  const isSelected = localFilters.status === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, status: opt.id })}
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

            {/* 3. Assigned Property */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Building className="w-4 h-4 text-[#4B5940]" />
                <span>نطاق التغطية / العقار</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {propertyOptions.map((opt) => {
                  const isSelected = localFilters.property === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, property: opt.id })}
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

            {/* 4. WhatsApp Integration */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <CheckCircle2 className="w-4 h-4 text-[#4B5940]" />
                <span>ربط WhatsApp وتلقي المهام</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "all", label: "الكل" },
                  { id: "linked", label: "مربوط ونشط" },
                  { id: "unlinked", label: "غير مربوط" },
                ].map((opt) => {
                  const isSelected = localFilters.whatsappLinked === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, whatsappLinked: opt.id })}
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

            {/* 5. Sort By */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <ArrowUpDown className="w-4 h-4 text-[#4B5940]" />
                <span>ترتيب النتائج</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {sortOptions.map((opt) => {
                  const isSelected = localFilters.sortBy === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocalFilters({ ...localFilters, sortBy: opt.id })}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer",
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
              <span>تطبيق الفلتر ({totalResultsCount} عضو)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
