"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BookingSettingsState, BookingRuleComparisonItem } from "../types";

const initialBookingSettings: BookingSettingsState = {
  defaultCheckInTime: "15:00",
  defaultCheckOutTime: "12:00",
  allowSameDayBooking: true,
  minStayNights: 1,
  maxStayNights: 30,

  preventDoubleBooking: true,
  autoUpdateUnitStatus: true,
  autoCreateCleaningOnCheckout: true,

  enableBookingCom: true,
  enableAirbnb: true,
  enableDirectEngine: true,
  enableManualReception: true,

  retainCancelledBookings: true,
  allowPermanentDeleteCancelled: false,

  allowOwnerEditBookingDetails: true,
  allowOwnerChangeDates: true,
  allowOwnerExtendStay: true,
  requireAvailabilityCheckBeforeEdit: true,

  lastUpdated: "5 أكتوبر 2026",
  updatedBy: "مدير النظام (محمد أحمد)",
};

export function useBookingSettings() {
  const [settings, setSettings] = useState<BookingSettingsState>(initialBookingSettings);
  const [savedSettings, setSavedSettings] = useState<BookingSettingsState>(initialBookingSettings);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [comparisonItems, setComparisonItems] = useState<BookingRuleComparisonItem[]>([]);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const updateSetting = <K extends keyof BookingSettingsState>(
    key: K,
    value: BookingSettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSettings(savedSettings);
    toast.info("تم إلغاء التعديلات واستعادة القيم الأصلية");
  };

  const handleSaveClick = () => {
    // Generate comparison items for sensitive rules:
    const diffs: BookingRuleComparisonItem[] = [];

    if (settings.maxStayNights !== savedSettings.maxStayNights) {
      diffs.push({
        id: "maxStayNights",
        title: "مدة الحجز القصوى",
        tag: "قواعد التواريخ والمدد",
        oldValue: `${savedSettings.maxStayNights} ليلة`,
        newValue: `${settings.maxStayNights} ليلة`,
      });
    }

    if (settings.allowSameDayBooking !== savedSettings.allowSameDayBooking) {
      diffs.push({
        id: "allowSameDayBooking",
        title: "السماح بالحجز في نفس اليوم",
        tag: "قواعد التوافر",
        oldValue: savedSettings.allowSameDayBooking ? "مفعل (23:59)" : "معطل",
        newValue: settings.allowSameDayBooking ? "مفعل (إغلاق 18:00)" : "معطل",
      });
    }

    // If there are diffs or user wants to confirm the standard changes:
    const defaultDiffs: BookingRuleComparisonItem[] = diffs.length > 0 ? diffs : [
      {
        id: "maxStayNights",
        title: "مدة الحجز القصوى",
        tag: "قواعد التواريخ والمدد",
        oldValue: "30 ليلة",
        newValue: "60 ليلة",
      },
      {
        id: "allowSameDayBooking",
        title: "السماح بالحجز في نفس اليوم",
        tag: "قواعد التوافر",
        oldValue: "مفعل (23:59)",
        newValue: "مفعل (إغلاق 18:00)",
      },
      {
        id: "availabilityCheckTimeout",
        title: "مهلة التحقق من التوافر اللحظي",
        tag: "حماية المخزون",
        oldValue: "120 ثانية",
        newValue: "60 ثانية (فائق السرعة)",
      },
    ];

    setComparisonItems(defaultDiffs);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdate = () => {
    setSavedSettings(settings);
    setIsConfirmModalOpen(false);
    toast.success("تم تحديث قواعد وسياسات الحجوزات بنجاح وتوثيقها في سجل التدقيق!");
  };

  return {
    settings,
    isDirty,
    updateSetting,
    handleReset,
    handleSaveClick,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    comparisonItems,
    handleConfirmUpdate,
  };
}
