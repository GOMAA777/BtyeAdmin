"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { showFigmaSuccessToast } from "@/components/ui/sonner";
import { useConfirm } from "@/hooks/use-confirm";

export function usePricingManager() {
  const router = useRouter();
  const confirm = useConfirm();

  const [monthlyPrice, setMonthlyPrice] = useState<number>(99);
  const [annualPrice, setAnnualPrice] = useState<number>(999);
  const [effectiveDate, setEffectiveDate] = useState<string>("1 نوفمبر 2026");
  const [notes, setNotes] = useState<string>(
    "تثبيت تعرفة التسعير السنوي الموحدة عند 999 ر.س لكل وحدة سكنية مع إبقاء التسعير التناسبي Prorated."
  );

  // Financial calculations
  const yearlyFromMonthly = monthlyPrice * 12;
  const savings = Math.max(0, yearlyFromMonthly - annualPrice);
  const discountPercent =
    yearlyFromMonthly > 0
      ? ((savings / yearlyFromMonthly) * 100).toFixed(1)
      : "0";

  // Tax breakdown (Saudi VAT 15% standard)
  const monthlyVat = (monthlyPrice * 0.15 * (100 / 115)).toFixed(2);
  const monthlyBasic = (monthlyPrice - parseFloat(monthlyVat)).toFixed(2);

  const annualVat = (annualPrice * 0.15 * (100 / 115)).toFixed(2);
  const annualBasic = (annualPrice - parseFloat(annualVat)).toFixed(2);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleSaveDraft = async () => {
    const ok = await confirm({
      title: "حفظ مسودة التسعير",
      message: "هل أنت متأكد من حفظ الإعدادات الحالية كمسودة غير منشورة؟",
      confirmLabel: "حفظ كمسودة",
      variant: "default",
    });
    if (!ok) return;
    toast.success("تم حفظ مسودة إعدادات التسعير بنجاح");
  };

  const handleOpenPublishModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmPublish = async () => {
    setIsConfirmModalOpen(false);
    showFigmaSuccessToast({
      title: "تم تسجيل التحديث بنجاح",
      version: "V3.3",
      description: "أُدرجت المعاملة في سجل التدقيق الإداري بواسطة محمد أحمد...",
    });
    router.push("/billing/");
  };

  return {
    monthlyPrice,
    setMonthlyPrice,
    annualPrice,
    setAnnualPrice,
    effectiveDate,
    setEffectiveDate,
    notes,
    setNotes,
    yearlyFromMonthly,
    savings,
    discountPercent,
    monthlyVat,
    monthlyBasic,
    annualVat,
    annualBasic,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleOpenPublishModal,
    handleSaveDraft,
    handleConfirmPublish,
  };
}
