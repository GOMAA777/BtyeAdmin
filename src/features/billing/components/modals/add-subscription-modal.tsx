"use client";

import React, { useState } from "react";
import { X, Plus, Calendar, Building2, User, Phone, DollarSign, Layers } from "lucide-react";
import { toast } from "sonner";
import { Subscription, BillingCycle, SubscriptionStatus } from "../../types";

export interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subscription: Subscription) => void;
}

export function AddSubscriptionModal({
  isOpen,
  onClose,
  onAdd,
}: AddSubscriptionModalProps) {
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerCompany, setOwnerCompany] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [purchasedUnits, setPurchasedUnits] = useState<number>(10);
  const [subscriptionPrice, setSubscriptionPrice] = useState<number>(990);
  const [status, setStatus] = useState<SubscriptionStatus>("active");
  const [startDate, setStartDate] = useState<string>("1 نوفمبر 2026");
  const [renewalDate, setRenewalDate] = useState<string>("1 ديسمبر 2026");

  if (!isOpen) return null;

  const handleCycleChange = (cycle: BillingCycle) => {
    setBillingCycle(cycle);
    if (cycle === "monthly") {
      setSubscriptionPrice(purchasedUnits * 99);
      setRenewalDate("1 ديسمبر 2026");
    } else {
      setSubscriptionPrice(purchasedUnits * 999);
      setRenewalDate("1 نوفمبر 2027");
    }
  };

  const handleUnitsChange = (units: number) => {
    setPurchasedUnits(units);
    if (billingCycle === "monthly") {
      setSubscriptionPrice(units * 99);
    } else {
      setSubscriptionPrice(units * 999);
    }
  };

  const getInitials = (name: string): string => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0] || ""}.${parts[1][0] || ""}`;
    }
    return parts[0]?.slice(0, 2) || "م.ك";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ownerName.trim()) {
      toast.error("يرجى إدخال اسم المالك.");
      return;
    }
    if (!ownerPhone.trim()) {
      toast.error("يرجى إدخال رقم هاتف المالك.");
      return;
    }
    if (purchasedUnits <= 0) {
      toast.error("يرجى تحديد عدد شقق صحيح.");
      return;
    }

    const uniqueId = String(Date.now());
    const randomCodeNum = Math.floor(100 + Math.random() * 900);
    const subCode = `SUB-${randomCodeNum}`;

    let statusLabel = "نشط";
    let statusBadgeVariant: Subscription["statusBadgeVariant"] = "active";
    if (status === "pending_payment") {
      statusLabel = "بانتظار الدفع";
      statusBadgeVariant = "pending";
    } else if (status === "trial") {
      statusLabel = "تجريبي";
      statusBadgeVariant = "trial";
    } else if (status === "paused") {
      statusLabel = "موقوف";
      statusBadgeVariant = "paused";
    }

    const newSub: Subscription = {
      id: uniqueId,
      subscriptionCode: subCode,
      ownerId: `owner-${uniqueId}`,
      ownerName: ownerName.trim(),
      ownerCompany: ownerCompany.trim() || undefined,
      ownerPhone: ownerPhone.trim(),
      avatarInitials: getInitials(ownerName),
      billingCycle,
      billingCycleLabel: billingCycle === "monthly" ? "شهري" : "سنوي",
      purchasedUnits,
      usedUnits: 0,
      remainingUnits: purchasedUnits,
      usagePercentage: 0,
      subscriptionPrice,
      priceFormatted: `${subscriptionPrice.toLocaleString("ar-SA")} ر.س`,
      vatNotice: billingCycle === "annual" ? "شامل الخصم السنوي" : "شامل ض.ق.م",
      startDate,
      renewalDate,
      renewalCountdownDays: billingCycle === "monthly" ? 30 : 365,
      status,
      statusLabel,
      statusBadgeVariant,
      statusSubText: status === "pending_payment" ? "مهلة السداد: 7 أيام" : undefined,
    };

    onAdd(newSub);
    toast.success(`تم إنشاء الاشتراك بنجاح بالرمز ${subCode}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      dir="rtl"
    >
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="bg-white rounded-[24px] shadow-[0px_24px_60px_-12px_rgba(24,29,23,0.22),0px_4px_16px_0px_rgba(24,29,23,0.08)] w-full max-w-[620px] overflow-hidden font-cairo border border-[#e5eae0]">
        {/* Top Decorative Header Accent */}
        <div className="h-[6px] w-full bg-[#4b5940]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-[#e5eae0]/80 flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-bold text-[#181d17]">
              إضافة اشتراك جديد
            </h2>
            <p className="text-[13px] text-[#454840] mt-1 font-medium">
              تسجيل باقة اشتراك لمالك عقار وتحديد السعة المرخصة وقواعد الفوترة
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-9 rounded-full bg-[#f1f5eb] hover:bg-[#e5eae0] flex items-center justify-center text-[#454840] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Row 1: Owner Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                اسم المالك <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="مثال: د. فهد السليمان"
                  className="w-full h-[42px] px-3 ps-9 rounded-[10px] bg-[#f1f5eb] border border-[#e5eae0] text-[13px] text-[#181d17] placeholder-[#75786f] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all"
                />
                <User className="w-4 h-4 text-[#75786f] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                رقم الجوال <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="مثال: 0505123456"
                  className="w-full h-[42px] px-3 ps-9 rounded-[10px] bg-[#f1f5eb] border border-[#e5eae0] text-[13px] text-[#181d17] placeholder-[#75786f] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all"
                  dir="ltr"
                />
                <Phone className="w-4 h-4 text-[#75786f] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Company Name */}
          <div>
            <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
              اسم المنشأة أو الشركة (اختياري)
            </label>
            <div className="relative">
              <input
                type="text"
                value={ownerCompany}
                onChange={(e) => setOwnerCompany(e.target.value)}
                placeholder="مثال: مجموعة السليمان للضيافة وإدارة الأصول"
                className="w-full h-[42px] px-3 ps-9 rounded-[10px] bg-[#f1f5eb] border border-[#e5eae0] text-[13px] text-[#181d17] placeholder-[#75786f] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all"
              />
              <Building2 className="w-4 h-4 text-[#75786f] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Row 3: Billing Cycle & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                دورة الفوترة
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCycleChange("monthly")}
                  className={`h-[42px] rounded-[10px] text-[13px] font-semibold border transition-all ${
                    billingCycle === "monthly"
                      ? "bg-[#4b5940] text-white border-[#4b5940]"
                      : "bg-[#f9faf7] text-[#454840] border-[#e5eae0] hover:bg-[#f1f5eb]"
                  }`}
                >
                  شهري (99 ر.س/شقة)
                </button>
                <button
                  type="button"
                  onClick={() => handleCycleChange("annual")}
                  className={`h-[42px] rounded-[10px] text-[13px] font-semibold border transition-all ${
                    billingCycle === "annual"
                      ? "bg-[#4b5940] text-white border-[#4b5940]"
                      : "bg-[#f9faf7] text-[#454840] border-[#e5eae0] hover:bg-[#f1f5eb]"
                  }`}
                >
                  سنوي (999 ر.س/شقة)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                حالة الاشتراك
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
                data-dropdown-trigger="true"
                className="w-full h-[42px] px-3 rounded-[10px] border border-[#e5eae0] text-[13px] text-[#181d17] bg-[#f1f5eb] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all cursor-pointer"
              >
                <option value="active">نشط (مفعل فورياً)</option>
                <option value="pending_payment">بانتظار الدفع</option>
                <option value="trial">تجريبي (فترة مجانية)</option>
                <option value="paused">موقوف مؤقتاً</option>
              </select>
            </div>
          </div>

          {/* Row 4: Purchased Units & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                عدد الشقق المرخصة (السعة)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={purchasedUnits}
                  onChange={(e) => handleUnitsChange(Number(e.target.value))}
                  className="w-full h-[42px] px-3 ps-9 rounded-[10px] bg-[#f1f5eb] border border-[#e5eae0] text-[13px] text-[#181d17] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all"
                />
                <Layers className="w-4 h-4 text-[#75786f] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                قيمة الاشتراك الإجمالية (ر.س)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  value={subscriptionPrice}
                  onChange={(e) => setSubscriptionPrice(Number(e.target.value))}
                  className="w-full h-[42px] px-3 ps-9 rounded-[10px] bg-[#f1f5eb] border border-[#e5eae0] text-[13px] text-[#181d17] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all"
                />
                <DollarSign className="w-4 h-4 text-[#75786f] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 5: Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                تاريخ البداية
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="مثال: 1 نوفمبر 2026"
                  className="w-full h-[42px] px-3 ps-9 rounded-[10px] bg-[#f1f5eb] border border-[#e5eae0] text-[13px] text-[#181d17] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all"
                />
                <Calendar className="w-4 h-4 text-[#75786f] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#181d17] mb-1.5">
                تاريخ التجديد القادم
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  placeholder="مثال: 1 ديسمبر 2026"
                  className="w-full h-[42px] px-3 ps-9 rounded-[10px] bg-[#f1f5eb] border border-[#e5eae0] text-[13px] text-[#181d17] focus:outline-none focus:bg-white focus:border-[#4b5940] transition-all"
                />
                <Calendar className="w-4 h-4 text-[#75786f] absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-3 text-[12px] text-[#454840] leading-relaxed border border-[#e5eae0]/60">
            سيتم تخصيص سعة <span className="font-bold text-[#181d17]">{purchasedUnits} شقة</span> للمالك{" "}
            <span className="font-bold text-[#181d17]">{ownerName || "المحدد"}</span> بدورة فوترة{" "}
            <span className="font-bold text-[#181d17]">{billingCycle === "monthly" ? "شهرية" : "سنوية"}</span> بإجمالي{" "}
            <span className="font-bold text-[#34422a]">{subscriptionPrice.toLocaleString("ar-SA")} ر.س</span>.
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-[42px] rounded-[12px] border border-[#e5eae0] text-[13px] font-medium text-[#454840] hover:bg-[#f9faf7] transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 h-[42px] rounded-[12px] bg-[#4b5940] hover:bg-[#3d4934] text-white text-[13px] font-medium flex items-center gap-2 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>حفظ وتفعيل الاشتراك</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
