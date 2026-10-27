"use client";

import { useState } from "react";
import { toast } from "sonner";
import { GeneralSettingsState } from "../types";

export function useGeneralSettings() {
  const initialData: GeneralSettingsState = {
    info: {
      name: "BYTE HOME",
      website: "https://bytehome-sa.com",
      description: "المنصة المؤسسية لإدارة وتشغيل الأصول العقارية",
      officialEmail: "contact@bytehome-sa.com",
      contactNumber: "+966 11 400 8899",
    },
    support: {
      supportEmail: "support@abraj-sa.com",
      whatsappNumber: "+966 50 123 4567",
      helpCenterUrl: "https://help.abraj-sa.com",
    },
    maintenance: {
      isMaintenanceMode: false,
      title: "أعمال صيانة دورية مجدولة",
      message:
        "نقوم حالياً بإجراء تحديثات وتحسينات دورية على خوادم المنصة لضمان أعلى مستويات الأمان والأداء. سنعود للعمل قريباً.",
      expectedEndTime: "2026-10-06 04:00 ص",
    },
    activeLogoName: "bytehome-brand-identity-2026.svg",
    activeLogoSvg: "",
    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [formData, setFormData] = useState<GeneralSettingsState>(initialData);
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [isFaviconModalOpen, setIsFaviconModalOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const updateInfo = (key: keyof GeneralSettingsState["info"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      info: { ...prev.info, [key]: value },
    }));
    setIsDirty(true);
  };

  const updateSupport = (key: keyof GeneralSettingsState["support"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      support: { ...prev.support, [key]: value },
    }));
    setIsDirty(true);
  };

  const updateMaintenance = (
    key: keyof GeneralSettingsState["maintenance"],
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      maintenance: { ...prev.maintenance, [key]: value },
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات المنصة العامة بنجاح", {
      description: "تم تحديث البيانات وهوية النظام وسجل التدقيق الإداري.",
    });
  };

  const handleReset = () => {
    setFormData(initialData);
    setIsDirty(false);
    toast.info("تم التراجع عن التعديلات واستعادة القيم الأصلية");
  };

  return {
    formData,
    updateInfo,
    updateSupport,
    updateMaintenance,
    isLogoModalOpen,
    setIsLogoModalOpen,
    isFaviconModalOpen,
    setIsFaviconModalOpen,
    isDirty,
    handleSave,
    handleReset,
  };
}
