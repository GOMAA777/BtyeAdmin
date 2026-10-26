"use client";

import { useState } from "react";
import { toast } from "sonner";
import { WhatsAppSettingsState } from "../types";

export function useWhatsAppSettings() {
  const initialData: WhatsAppSettingsState = {
    account: {
      accountName: "ابراج لإدارة العقارات الفندقية",
      osName: "Rawaq Living OS",
      wabaId: "WABA-948201948271032",
      officialPhoneNumber: "+966 11 482 9000",
      provider: "Meta Cloud API (v20.0)",
      serverRegion: "مركز استضافة الشرق الأوسط",
      webhookLatency: "140ms",
      certificateExpiryDate: "14 يناير 2026",
      certificateStatus: "(سارٍ حتى 14 يناير 2027)",
      isConnected: true,
    },
    kpis: {
      totalSent: 24812,
      totalSentTrend: "+8.4%",
      delivered: 24590,
      deliveredRate: "99.1%",
      read: 22940,
      readRate: "93.3%",
      failed: 42,
      failedRate: "0.17%",
    },
    automations: {
      bookingConfirmation: true,
      smartAccessPin: true,
      checkoutReminderAndSurvey: true,
      maintenanceStatusAlert: true,
      stayExtensionAndReceipt: true,
      masterBroadcastEnabled: true,
    },
    rateLimits: {
      tierName: "Tier 3 Meta Quota",
      dailyQuotaLimit: 100000,
      dailyQuotaUsed: 24812,
      quotaUsedPercentage: 24.8,
      retryAttempts: "3 محاولات تلقائية (الموصى به من Meta)",
      retryDelay: "5 دقائق (Exponential Backoff الموصى به)",
      quietHoursEnabled: true,
    },
    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [config, setConfig] = useState<WhatsAppSettingsState>(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const toggleAutomation = (
    key: keyof WhatsAppSettingsState["automations"]
  ) => {
    setConfig((prev) => ({
      ...prev,
      automations: {
        ...prev.automations,
        [key]: !prev.automations[key],
      },
    }));
    setIsDirty(true);
  };

  const toggleMasterBroadcast = (checked: boolean) => {
    setConfig((prev) => ({
      ...prev,
      automations: {
        ...prev.automations,
        masterBroadcastEnabled: checked,
      },
    }));
    setIsDirty(true);
  };

  const toggleQuietHours = (checked: boolean) => {
    setConfig((prev) => ({
      ...prev,
      rateLimits: {
        ...prev.rateLimits,
        quietHoursEnabled: checked,
      },
    }));
    setIsDirty(true);
  };

  const setRetryAttempts = (value: string) => {
    setConfig((prev) => ({
      ...prev,
      rateLimits: {
        ...prev.rateLimits,
        retryAttempts: value,
      },
    }));
    setIsDirty(true);
  };

  const setRetryDelay = (value: string) => {
    setConfig((prev) => ({
      ...prev,
      rateLimits: {
        ...prev.rateLimits,
        retryDelay: value,
      },
    }));
    setIsDirty(true);
  };

  const handleResync = () => {
    setIsSyncing(true);
    toast.info("جاري مزامنة حالة الخطاف وبوابة Meta السحابية...");
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("تمت إعادة المزامنة بنجاح", {
        description: "استجابة الخطاف: 138ms • البوابة متصلة ومحدثة بالكامل.",
      });
    }, 900);
  };

  const handleOpenDisconnectModal = () => {
    setIsAcknowledged(false);
    setIsDisconnectModalOpen(true);
  };

  const handleCloseDisconnectModal = () => {
    setIsDisconnectModalOpen(false);
    setIsAcknowledged(false);
  };

  const handleConfirmDisconnect = () => {
    setConfig((prev) => ({
      ...prev,
      account: {
        ...prev.account,
        isConnected: false,
      },
    }));
    setIsDisconnectModalOpen(false);
    setIsAcknowledged(false);
    setIsDirty(true);
    toast.error("تم فصل اتصال WhatsApp بنجاح", {
      description: "توقفت كافة الرسائل الفورية ومسارات الأتمتة على مستوى المنصة.",
    });
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات وتيرة وبث WhatsApp بنجاح", {
      description: "تم تحديث قواعد الأتمتة المباشرة وسجل التدقيق الأمني.",
    });
  };

  const handleReset = () => {
    setConfig(initialData);
    setIsDirty(false);
    toast.info("تم إلغاء التعديلات واستعادة الحالة السابقة");
  };

  return {
    config,
    isDirty,
    isDisconnectModalOpen,
    isSyncing,
    isAcknowledged,
    setIsAcknowledged,
    toggleAutomation,
    toggleMasterBroadcast,
    toggleQuietHours,
    setRetryAttempts,
    setRetryDelay,
    handleResync,
    handleOpenDisconnectModal,
    handleCloseDisconnectModal,
    handleConfirmDisconnect,
    handleSave,
    handleReset,
  };
}
