"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UsersPermissionsSettingsState, DefaultPlatformRole } from "../types";

export function useUsersPermissionsSettings() {
  const initialData: UsersPermissionsSettingsState = {
    requireAdminApproval: true,
    mandatoryEmailVerification: true,
    mandatoryMfa: true,
    dormantAccountAction: true,
    dormantAccountDays: 60,

    defaultRole: "viewer",

    allowExportReports: false,
    allowDirectDeletion: false,
    allowPlatformSettingsAccess: false,
    allowFinancialBillingAccess: false,
    allowUserManagementAccess: false,

    activeUsersCount: 48,
    pendingApprovalsCount: 2,
    mfaCompliancePercent: 100,
    approvedRolesCount: 6,

    lastUpdated: "اليوم، 09:15 ص",
    updatedBy: "محمد أحمد",
    policyId: "POL-SEC-2026-DEF",
    complianceStandard: "NCA ECC-1:2018",
  };

  const [config, setConfig] = useState<UsersPermissionsSettingsState>(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = <K extends keyof UsersPermissionsSettingsState>(
    key: K,
    value: UsersPermissionsSettingsState[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const setRole = (role: DefaultPlatformRole) => {
    setConfig((prev) => ({ ...prev, defaultRole: role }));
    setIsDirty(true);
    toast.info(`تم اختيار الدور الافتراضي: ${
      role === "viewer"
        ? "مشاهد (Viewer)"
        : role === "operator"
        ? "مشرف تشغيلي (Operator)"
        : role === "auditor"
        ? "مدقق مالي (Auditor)"
        : "مدير عقارات (Manager)"
    }`);
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات المستخدمين والصلاحيات بنجاح", {
      description: "تم توثيق السياسات وفق ضوابط الأمن السيبراني NCA ECC-1:2018.",
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
    setRole,
    isDirty,
    handleSave,
    handleReset,
  };
}
