"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, UserPlus, Phone, Mail, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { ownersService } from "@/services/owners-service";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import type { Owner } from "@/features/owners/types";

interface AddOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (owner: Owner) => void;
}

export function AddOwnerModal({ isOpen, onClose, onSuccess }: AddOwnerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"active" | "pending">("active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const confirm = useConfirm();

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollLock(isOpen);

  if (!isOpen || !mounted) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "يرجى إدخال اسم مالك العقار";
    if (!phone.trim()) newErrors.phone = "يرجى إدخال رقم الجوال";
    if (!email.trim()) newErrors.email = "يرجى إدخال البريد الإلكتروني";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validate()) return;

    const ok = await confirm({
      title: "تأكيد تسجيل مالك العقار",
      message: `هل أنت متأكد من تسجيل المالك "${name}" وإضافته إلى قائمة الملاك المعتمدين؟`,
      confirmLabel: "تسجيل المالك",
      variant: "default",
    });
    if (!ok) return;

    try {
      setIsSubmitting(true);
      const created = await ownersService.create({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        status,
      });

      toast.success("تم تسجيل المالك بنجاح");
      setName("");
      setPhone("");
      setEmail("");
      setErrors({});
      onClose();
      if (onSuccess) onSuccess(created);
    } catch {
      toast.error("حدث خطأ أثناء حفظ بيانات المالك");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200" dir="rtl">
      <div
        className="bg-white relative w-full max-w-[500px] rounded-3xl shadow-[0px_20px_48px_-12px_rgba(24,29,23,0.22)] overflow-hidden border border-[#DCE2D7]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8EDE2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF0E6] text-[#34422A] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#181D17]">إضافة مالك عقار جديد</h2>
              <p className="text-xs text-[#75786F]">تسجيل مالك جديد لربط العقارات والوحدات بمحفظته</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F1F5EB] hover:bg-[#E5EAE0] flex items-center justify-center text-[#454840] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#181D17]">
              اسم المالك بالكامل <span className="text-[#BA1A1A]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="مثال: خالد محمد السعيد"
                className="w-full h-11 px-3.5 pr-10 rounded-xl bg-[#F8FAF6] border border-[#DCE2D7] text-sm text-[#181D17] focus:bg-white focus:border-[#4B5940] focus:outline-none transition-all placeholder:text-[#A0A89C]"
              />
              <User className="w-4 h-4 text-[#75786F] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.name && <p className="text-xs text-[#BA1A1A] font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#181D17]">
              رقم الجوال <span className="text-[#BA1A1A]">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                }}
                placeholder="+966 50 123 4567"
                dir="ltr"
                className="w-full h-11 px-3.5 pl-10 rounded-xl bg-[#F8FAF6] border border-[#DCE2D7] text-sm text-[#181D17] text-right focus:bg-white focus:border-[#4B5940] focus:outline-none transition-all placeholder:text-[#A0A89C]"
              />
              <Phone className="w-4 h-4 text-[#75786F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.phone && <p className="text-xs text-[#BA1A1A] font-medium">{errors.phone}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#181D17]">
              البريد الإلكتروني <span className="text-[#BA1A1A]">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="owner@example.com"
                dir="ltr"
                className="w-full h-11 px-3.5 pl-10 rounded-xl bg-[#F8FAF6] border border-[#DCE2D7] text-sm text-[#181D17] text-right focus:bg-white focus:border-[#4B5940] focus:outline-none transition-all placeholder:text-[#A0A89C]"
              />
              <Mail className="w-4 h-4 text-[#75786F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.email && <p className="text-xs text-[#BA1A1A] font-medium">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#181D17]">
              حالة الحساب الأولية
            </label>
            <SelectDropdown
              value={status}
              onChange={(val) => setStatus(val as "active" | "pending")}
              options={[
                { value: "active", label: "نشط ومعتمد" },
                { value: "pending", label: "قيد المراجعة والتوثيق" },
              ]}
              triggerClassName="w-full h-11 px-3.5 rounded-xl bg-[#F8FAF6] border border-[#DCE2D7] text-sm text-[#181D17]"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8EDE2]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#F1F5EB] hover:bg-[#E5EAE0] text-[#181D17] text-xs font-bold transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#4B5940] hover:bg-[#3E4A35] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "جاري الحفظ..." : "حفظ المالك"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
