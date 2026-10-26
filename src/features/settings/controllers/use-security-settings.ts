"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SecuritySettingsState } from "../types";

export function useSecuritySettings() {
  const initialData: SecuritySettingsState = {
    securityScore: 98,
    admin2faCount: "100% (12 / 12)",
    activeSessionsCount: 428,
    blockedAttacks24h: 19,
    encryptionStandard: "AES-256 GCM",
    emergencyLockoutActive: false,

    enforceStrongPassword: true,
    minPasswordLength: 10,
    mandatoryEmailVerification: true,
    mandatoryPhoneOtp: true,

    twoFactorEnabled: true,
    allowAuthenticatorApp: true,
    allowSmsOtp: true,
    mandatoryAdmin2fa: true,

    sessionTimeoutMinutes: 30,
    allowMultipleSessions: false,

    lockoutDurationMinutes: 15,
    maxFailedLoginAttempts: 5,

    passwordExpiryDays: 90,
    preventPasswordReuse: true,

    ipWhitelist: ["185.190.24.110/32", "192.168.1.0/24"],
    immutableAuditLogging: true,

    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [state, setState] = useState<SecuritySettingsState>(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = <K extends keyof SecuritySettingsState>(
    key: K,
    value: SecuritySettingsState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleToggleEmergencyLockout = (active: boolean) => {
    if (active) {
      toast.error("تم تفعيل إقفال الأمان الطارئ!", {
        description: "تم حظر كافة الجلسات الخارجية فورياً وتأمين النظام.",
      });
    } else {
      toast.info("تم إلغاء تفعيل إقفال الأمان الطارئ واستئناف الجلسات المصرح بها.");
    }
    updateField("emergencyLockoutActive", active);
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات الأمان بنجاح", {
      description: "تسري هذه السياسات على كافة مستخدمي المنصة فوراً.",
    });
  };

  const handleReset = () => {
    setState(initialData);
    setIsDirty(false);
    toast.info("تم التراجع عن تعديلات الأمان واستعادة الضوابط الموصى بها");
  };

  return {
    state,
    isDirty,
    updateField,
    handleToggleEmergencyLockout,
    handleSave,
    handleReset,
  };
}
