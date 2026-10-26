"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ActivityLogSettingsState, DataRetentionPeriod } from "../types";

export function useActivityLogSettings() {
  const initialData: ActivityLogSettingsState = {
    trackSystemActivity: true,
    trackUserBehavior: true,
    trackPropertyChanges: true,
    trackBookingChanges: true,
    trackSubscriptionChanges: true,
    trackFinancialPayments: true,
    trackIntegrationChanges: true,
    trackAccessCodes: true,
    trackAutomationEvents: true,

    retentionPeriod: "5_years",

    allowAdminViewAuditLog: true,
    allowExportAuditLog: false,

    lastUpdated: "اليوم",
    updatedBy: "محمد أحمد",
  };

  const [config, setConfig] = useState<ActivityLogSettingsState>(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = <K extends keyof ActivityLogSettingsState>(
    key: K,
    value: ActivityLogSettingsState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const setRetention = (period: DataRetentionPeriod) => {
    setConfig((prev) => ({ ...prev, retentionPeriod: period }));
    setIsDirty(true);
    toast.info(`تم ضبط فترة الاحتفاظ: ${
      period === "1_year"
        ? "سنة واحدة (تشغيلي أساسي)"
        : period === "2_years"
        ? "سنتان (متوسط)"
        : period === "5_years"
        ? "5 سنوات (موصى به - متوافق مع ZATCA)"
        : "غير محدود (أرشيف مطلق)"
    }`);
  };

  const handleToggleExport = (checked: boolean) => {
    if (checked) {
      toast.warning("تصدير السجلات يتطلب موافقة أمنية ثنائية", {
        description: "يلزم اعتماد رمز توثيق OTP ورسالة موافقة خطية من المشرف العام.",
      });
      // Toggle remains restricted/disabled by policy or requires OTP
      updateField("allowExportAuditLog", false);
    } else {
      updateField("allowExportAuditLog", false);
    }
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات السجل والنشاط بنجاح", {
      description: "تسري تعديلات سياسات التتبع فوراً، وتم توثيق هذا الإجراء في سجل التدقيق الإداري.",
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
    setRetention,
    handleToggleExport,
    isDirty,
    handleSave,
    handleReset,
  };
}
