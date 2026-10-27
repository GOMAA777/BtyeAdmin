"use client";

import { useEffect, useState } from "react";
import {
  X,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Building,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface WhatsAppFilterState {
  property: string;
  conversationType: string;
  readStatus: string;
  windowStatus: string;
}

export const initialWhatsAppFilterState: WhatsAppFilterState = {
  property: "all",
  conversationType: "all",
  readStatus: "all",
  windowStatus: "all",
};

interface WhatsAppFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: WhatsAppFilterState;
  onApplyFilters: (filters: WhatsAppFilterState) => void;
  onResetFilters: () => void;
  totalResultsCount?: number;
}

export function WhatsAppFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalResultsCount,
}: WhatsAppFilterDrawerProps) {
  const [localFilters, setLocalFilters] =
    useState<WhatsAppFilterState>(filters);

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
    setLocalFilters(initialWhatsAppFilterState);
    onResetFilters();
    onClose();
  };

  const propertyOptions = [
    { id: "all", label: "جميع العقارات" },
    { id: "nakheel", label: "عمارة النخيل السكنية" },
    { id: "malqa", label: "برج الملقا الفاخر" },
    { id: "sahafa", label: "مجمع الصحافة السكني" },
  ];

  const conversationTypeOptions = [
    { id: "all", label: "جميع الأنواع" },
    { id: "booking", label: "استفسار حجز" },
    { id: "maintenance", label: "صيانة وطوارئ" },
    { id: "cleaning", label: "تنظيف وتشغيل" },
    { id: "security", label: "أمان وأكواد دخول" },
  ];

  const readStatusOptions = [
    { id: "all", label: "الكل" },
    { id: "unread", label: "غير مقروءة فقط" },
    { id: "read", label: "مقروءة" },
  ];

  const windowStatusOptions = [
    { id: "all", label: "الكل" },
    { id: "active", label: "نافذة نشطة (أقل من 24 ساعة)" },
    { id: "expired", label: "نافذة منتهية (تتطلب قالب)" },
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
                  تصفية محادثات واتساب
                </h2>
                <p className="text-xs text-[#556350]">
                  تخصيص الفرز ومعايير عرض الرسائل والمحادثات
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
            {/* 1. Property Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Building className="w-4 h-4 text-[#4B5940]" />
                <span>العقار / المجمع السكني</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {propertyOptions.map((opt) => {
                  const isSelected = localFilters.property === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({ ...localFilters, property: opt.id })
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

            {/* 2. Conversation Type */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <MessageSquare className="w-4 h-4 text-[#4B5940]" />
                <span>نوع المحادثة والتصنيف</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {conversationTypeOptions.map((opt) => {
                  const isSelected = localFilters.conversationType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          conversationType: opt.id,
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

            {/* 3. Read Status */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <CheckCircle2 className="w-4 h-4 text-[#4B5940]" />
                <span>حالة القراءة</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {readStatusOptions.map((opt) => {
                  const isSelected = localFilters.readStatus === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          readStatus: opt.id,
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

            {/* 4. Session Window */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                <Clock className="w-4 h-4 text-[#4B5940]" />
                <span>نافذة مراسلة WhatsApp</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {windowStatusOptions.map((opt) => {
                  const isSelected = localFilters.windowStatus === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setLocalFilters({
                          ...localFilters,
                          windowStatus: opt.id,
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
              <span>تطبيق التصفية</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
