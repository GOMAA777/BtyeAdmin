"use client";

import { useState } from "react";
import { toast } from "sonner";
import { OperationsSettingsState } from "../types";

const initialOperationsSettings: OperationsSettingsState = {
  autoCreateCleaningAfterCheckout: true,
  defaultUnitStatusOnSchedule: "يحتاج تنظيف",
  cleaningAssignmentMethod: "تعيين تلقائي لمشرف الموقع",
  requireCleaningCompletionApproval: true,
  lockUnitReadinessUntilCleaningComplete: true,

  requireMaintenanceFieldCompletion: true,
  mandatoryCleaningAfterMaintenance: true,
  autoCreateCleaningAfterMaintenanceClose: true,

  autoPreparationBuffer: "3 ساعات (موصى به)",

  lastUpdated: "5 أكتوبر 2026",
  updatedBy: "مدير النظام (محمد أحمد)",
};

export function useOperationsSettings() {
  const [settings, setSettings] = useState<OperationsSettingsState>(initialOperationsSettings);
  const [savedSettings, setSavedSettings] = useState<OperationsSettingsState>(initialOperationsSettings);

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  const updateSetting = <K extends keyof OperationsSettingsState>(
    key: K,
    value: OperationsSettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSettings(savedSettings);
    toast.info("تم إلغاء التعديلات واستعادة إعدادات التشغيل الأصلية");
  };

  const handleSave = () => {
    setSavedSettings(settings);
    toast.success("تم حفظ إعدادات التشغيل ومحرك الأتمتة الميدانية بنجاح!");
  };

  return {
    settings,
    isDirty,
    updateSetting,
    handleReset,
    handleSave,
  };
}
