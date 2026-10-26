"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CentralBillingState } from "../types";

export function useCentralBillingSettings() {
  const initialData: CentralBillingState = {
    activeGateway: "بوابة الدفع الوطنية",
    environment: "live",
    merchantId: "MID-SA-9482•••••••••••",
    isGatewayConnected: true,

    taxNumber: "310492817200003",
    isTaxNumberVerified: true,
    invoicePrefix: "INV",
    currency: "ريال سعودي (ر.س - SAR)",
    invoiceDueDays: 7,
    vatEnabled: true,
    vatRate: 15,
    qrAutoEncrypt: true,

    enableMadaAndCreditCards: true,
    enableApplePay: true,
    enableStcPay: true,
    enableDirectBankTransfer: true,

    autoSendInvoice: true,
    autoSendPaymentReceipt: true,
    smartPaymentReminder: true,

    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [state, setState] = useState<CentralBillingState>(initialData);
  const [isDirty, setIsDirty] = useState(false);

  const updateField = <K extends keyof CentralBillingState>(
    key: K,
    value: CentralBillingState[K]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    toast.success(`تم نسخ ${label} بنجاح`, {
      description: text,
    });
  };

  const handleTestConnection = () => {
    toast.loading("جاري اختبار الاتصال ببوابة الدفع المعتمدة والتشفير المصرفي...", {
      duration: 1200,
    });
    setTimeout(() => {
      toast.success("بوابة الدفع الإلكتروني الوطنية متصلة وتعمل بصورة سليمة (Live Production)");
    }, 1200);
  };

  const handleDisconnectGateway = () => {
    toast.warning("تم طلب فصل بوابة الدفع", {
      description: "تنبيه: سيؤدي فصل البوابة إلى تعليق استقبال المدفوعات التلقائية للمحافظ.",
    });
  };

  const handleChangeGateway = () => {
    toast.info("تغيير بوابة الدفع", {
      description: "يمكنك تهيئة موفر دفع جديد من خلال الاتصال بالدعم أو الربط المباشر.",
    });
  };

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات الدفع والفوترة المركزية بنجاح", {
      description: "تم تحديث قواعد الفوترة والضوابط المالية لكافة عقارات المنصة.",
    });
  };

  const handleReset = () => {
    setState(initialData);
    setIsDirty(false);
    toast.info("تم التراجع عن التعديلات واستعادة القيم الأصلية");
  };

  return {
    state,
    isDirty,
    updateField,
    copyToClipboard,
    handleTestConnection,
    handleDisconnectGateway,
    handleChangeGateway,
    handleSave,
    handleReset,
  };
}
