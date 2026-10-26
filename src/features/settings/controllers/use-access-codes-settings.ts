"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { AccessCodesSettingsState, DefaultCodeType, CodeLengthOption } from "../types";

export function useAccessCodesSettings() {
  const initialData: AccessCodesSettingsState = {
    defaultCodeType: "per_booking",
    autoGenerateOnConfirm: true,
    codeLength: 6,
    allowRepeatedOrSequentialDigits: false,
    validityStartMinutesBeforeCheckin: 30,
    validityEndMinutesAfterCheckout: 30,
    maskCodeByDefault: true,
    requireVerificationBeforeReveal: true,
    logAllCodeViews: true,
    autoSyncOnBookingModification: true,
    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [config, setConfig] = useState<AccessCodesSettingsState>(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [isChangeMethodModalOpen, setIsChangeMethodModalOpen] = useState(false);

  const updateField = <K extends keyof AccessCodesSettingsState>(
    key: K,
    value: AccessCodesSettingsState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleSelectCodeType = (type: DefaultCodeType) => {
    if (type === "static_unit" && config.defaultCodeType === "per_booking") {
      // Transitioning to Static Unit code requires security confirmation modal
      setIsChangeMethodModalOpen(true);
    } else if (type === "per_booking" && config.defaultCodeType === "static_unit") {
      updateField("defaultCodeType", "per_booking");
      toast.success("تم تفعيل نمط كود لكل حجز الافتراضي", {
        description: "المعيار الموصى به لضمان عزل النزلاء والأمان التلقائي الدوري.",
      });
    }
  };

  const confirmMethodChange = () => {
    updateField("defaultCodeType", "static_unit");
    setIsChangeMethodModalOpen(false);
    toast.success("تم تغيير طريقة توليد أكواد الدخول إلى كود ثابت للوحدة بنجاح", {
      description: "تم تحديث المعيار وتطبيق سياسة الحوكمة والتدوير اليدوي عبر 11,290 وحدة.",
    });
  };

  const handleCodeLengthChange = (length: CodeLengthOption) => {
    updateField("codeLength", length);
    if (length === 6) {
      toast.info("تم اختيار 6 أرقام (المعيار المعتمد للمنصة • أعلى حماية)");
    } else {
      toast.info("تم اختيار 4 أرقام (سريع للأقفال الكلاسيكية)");
    }
  };

  // Sample simulated live code based on selected length
  const sampleDigits = useMemo(() => {
    if (config.codeLength === 4) {
      return ["8", "3", "9", "2"];
    }
    return ["1", "2", "9", "3", "8", "5"];
  }, [config.codeLength]);

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات أكواد الدخول بنجاح", {
      description: "تمت مزامنة معايير الأقفال الذكية مع البوابات السحابية وسجل WORM.",
    });
  };

  const handleReset = () => {
    setConfig(initialData);
    setIsDirty(false);
    toast.info("تم إلغاء التعديلات واستعادة القواعد الافتراضية");
  };

  return {
    config,
    updateField,
    isDirty,
    sampleDigits,
    isChangeMethodModalOpen,
    setIsChangeMethodModalOpen,
    handleSelectCodeType,
    confirmMethodChange,
    handleCodeLengthChange,
    handleSave,
    handleReset,
  };
}
