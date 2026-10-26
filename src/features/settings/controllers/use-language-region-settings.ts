"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LanguageRegionSettingsState, TimeFormatType, CurrencyPositionType } from "../types";

export function useLanguageRegionSettings() {
  const initialData: LanguageRegionSettingsState = {
    defaultLanguage: "العربية (Arabic - RTL) — اللغة الافتراضية للنظام",
    enableEnglishLanguage: true,
    allowUserLanguageOverride: true,
    dictionaryVersion: "v4.8",

    country: "المملكة العربية السعودية (KSA)",
    timezone: "توقيت الرياض —  (GMT+03:00)",
    timeFormat: "12h",
    dateFormat: "DD/MM/YYYY (يوم / شهر / سنة) — المعتمد في السجلات السعودية (مثال: 05/10/2026)",

    currencyCode: "SAR",
    currencyName: "الريال السعودي",
    currencyPosition: "after",
    numberFormatting: "فاصلة لآلاف ونقطة  (1,250.00 )",
    showDecimals: true,

    weekStartDay: "السبت (Saturday)",
    baseCalendar: "التقويم الميلادي ",
    showDualHijriDate: true,

    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [config, setConfig] = useState<LanguageRegionSettingsState>(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = <K extends keyof LanguageRegionSettingsState>(
    key: K,
    value: LanguageRegionSettingsState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const setTimeFormat = (format: TimeFormatType) => {
    updateField("timeFormat", format);
  };

  const setCurrencyPosition = (pos: CurrencyPositionType) => {
    updateField("currencyPosition", pos);
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات اللغة والمنطقة بنجاح", {
      description: "تم تحديث المعايير الإقليمية الفندقية وضوابط ZATCA.",
    });
  };

  const handleReset = () => {
    setConfig(initialData);
    setIsDirty(false);
    toast.info("تم التراجع عن التعديلات واستعادة القواعد الافتراضية");
  };

  return {
    config,
    updateField,
    setTimeFormat,
    setCurrencyPosition,
    isDirty,
    handleSave,
    handleReset,
  };
}
