"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PlatformConfigState, PropertyInitialStatus, PricingModel } from "../types";

export function usePlatformSettings() {
  const initialData: PlatformConfigState = {
    defaultPropertyStatus: "active",
    defaultArchitectureType: "عمارة سكنية (معتمد وموصى به للمحافظ الكبرى)",
    nationalAddressVerification: true,

    defaultUnitStatus: "available",
    baseCurrency: "SAR",
    defaultPricingModel: "daily",
    minimumNoticeHours: 2,
    maximumGuests: 4,

    allowOwnerSelfRegistration: true,
    requireAdminApproval: true,
    allowOwnersAddPropertiesDirectly: true,
    defaultPlan: "الباقة الفضية (14 يوماً تجريبية مجانية - 5 عقارات)",

    autoUnitStatusSync: true,
    strictAuditLogWorm: true,
    realtimeOtaSync: true,
    broadcastSystemAnnouncements: true,

    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [config, setConfig] = useState<PlatformConfigState>(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const updateField = <K extends keyof PlatformConfigState>(
    key: K,
    value: PlatformConfigState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleToggleAddProperties = (checked: boolean) => {
    if (!checked) {
      // Trying to disable direct property additions triggers security confirmation modal!
      setIsConfirmModalOpen(true);
    } else {
      updateField("allowOwnersAddPropertiesDirectly", true);
    }
  };

  const confirmDisableAddProperties = () => {
    updateField("allowOwnersAddPropertiesDirectly", false);
    setIsConfirmModalOpen(false);
    toast.warning("تم تقييد إضافة العقارات المباشرة للملاك", {
      description: "سيتم تطبيق التدقيق والموافقة المسبقة على كافة الملاك المسجلين.",
    });
  };

  const handleIncrementGuests = () => {
    setConfig((prev) => ({
      ...prev,
      maximumGuests: Math.min(prev.maximumGuests + 1, 20),
    }));
    setIsDirty(true);
  };

  const handleDecrementGuests = () => {
    setConfig((prev) => ({
      ...prev,
      maximumGuests: Math.max(prev.maximumGuests - 1, 1),
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات المنصة وقواعد التشغيل بنجاح", {
      description: "تم توثيق التغييرات في سجل التدقيق الأمني WORM.",
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
    isDirty,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleToggleAddProperties,
    confirmDisableAddProperties,
    handleIncrementGuests,
    handleDecrementGuests,
    handleSave,
    handleReset,
  };
}
