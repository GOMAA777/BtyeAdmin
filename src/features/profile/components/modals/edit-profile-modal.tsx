"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, UserCheck, Phone, Clock, FileText, Check } from "lucide-react";
import { updateProfileSchema, UpdateProfileInput } from "../../schemas/profile.schema";
import { UserProfileData } from "../../types";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileData;
  onSave: (data: UpdateProfileInput) => void;
}

export function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: profile.fullName,
      name: profile.name,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      contractType: profile.contractType,
      workingHours: profile.workingHours,
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: UpdateProfileInput) => {
    onSave(data);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white relative w-full max-w-[580px] rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(24,29,23,0.22)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Decorative Olive Stripe */}
        <div className="h-[6px] w-full bg-gradient-to-r from-[#4b5940] via-[#d8e8c7] to-[#34422a]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 left-5 size-8 flex items-center justify-center rounded-full bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-[12px] bg-[#ebefe6] text-[#34422a] flex items-center justify-center shrink-0 shadow-sm border border-[#dfe4db]">
              <UserCheck className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[22px] font-bold text-[#181d17] leading-tight font-cairo">
                تعديل البيانات الأساسية وتفاصيل الاتصال
              </h2>
              <p className="text-[13px] text-[#454840] font-medium font-cairo">
                تحديث معلومات الحساب الرسمي وساعات العمل والتواصل
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5 font-cairo">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  الاسم الكامل الرسمي
                </label>
                <input
                  {...register("fullName")}
                  className="w-full h-10 px-3 rounded-[10px] bg-[#f1f5eb] border border-[#dfe4db] text-[13px] text-[#181d17] focus:bg-white focus:border-[#4b5940] focus:outline-none transition-colors"
                  placeholder="الاسم الثلاثي أو الرباعي"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-[#ba1a1a]">{errors.fullName.message}</p>
                )}
              </div>

              {/* Short Name */}
              <div className="space-y-1.5 font-cairo">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  الاسم المختصر للعرض
                </label>
                <input
                  {...register("name")}
                  className="w-full h-10 px-3 rounded-[10px] bg-[#f1f5eb] border border-[#dfe4db] text-[13px] text-[#181d17] focus:bg-white focus:border-[#4b5940] focus:outline-none transition-colors"
                  placeholder="مثال: محمد أحمد"
                />
                {errors.name && (
                  <p className="text-[11px] text-[#ba1a1a]">{errors.name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5 font-cairo">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  رقم الجوال الشخصي
                </label>
                <div className="relative">
                  <input
                    {...register("phone")}
                    dir="ltr"
                    className="w-full h-10 ps-9 pe-3 rounded-[10px] bg-[#f1f5eb] border border-[#dfe4db] text-[13px] text-[#181d17] focus:bg-white focus:border-[#4b5940] focus:outline-none transition-colors text-right"
                    placeholder="050 284 9182"
                  />
                  <Phone className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-[#75786f]" />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-[#ba1a1a]">{errors.phone.message}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div className="space-y-1.5 font-cairo">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  رقم الواتساب المعتمد
                </label>
                <div className="relative">
                  <input
                    {...register("whatsapp")}
                    dir="ltr"
                    className="w-full h-10 ps-9 pe-3 rounded-[10px] bg-[#f1f5eb] border border-[#dfe4db] text-[13px] text-[#181d17] focus:bg-white focus:border-[#4b5940] focus:outline-none transition-colors text-right"
                    placeholder="+966 50 284 9182"
                  />
                  <Phone className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-[#059669]" />
                </div>
                {errors.whatsapp && (
                  <p className="text-[11px] text-[#ba1a1a]">{errors.whatsapp.message}</p>
                )}
              </div>

              {/* Contract Type */}
              <div className="space-y-1.5 font-cairo">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  نوع التكليف والتعاقد
                </label>
                <div className="relative">
                  <input
                    {...register("contractType")}
                    className="w-full h-10 ps-3 pe-8 rounded-[10px] bg-[#f1f5eb] border border-[#dfe4db] text-[13px] text-[#181d17] focus:bg-white focus:border-[#4b5940] focus:outline-none transition-colors"
                    placeholder="دوام كامل مرن"
                  />
                  <FileText className="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-[#75786f]" />
                </div>
                {errors.contractType && (
                  <p className="text-[11px] text-[#ba1a1a]">{errors.contractType.message}</p>
                )}
              </div>

              {/* Working Hours */}
              <div className="space-y-1.5 font-cairo">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  ساعات العمل اليومية
                </label>
                <div className="relative">
                  <input
                    {...register("workingHours")}
                    className="w-full h-10 ps-3 pe-8 rounded-[10px] bg-[#f1f5eb] border border-[#dfe4db] text-[13px] text-[#181d17] focus:bg-white focus:border-[#4b5940] focus:outline-none transition-colors"
                    placeholder="08:00 صباحاً — 05:00 مساءً"
                  />
                  <Clock className="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-[#75786f]" />
                </div>
                {errors.workingHours && (
                  <p className="text-[11px] text-[#ba1a1a]">{errors.workingHours.message}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5eb]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-[10px] bg-[#ebefe6] text-[#454840] font-bold text-[13px] hover:bg-[#dfe4db] transition-colors font-cairo"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-[10px] bg-[#4b5940] hover:bg-[#34422a] text-white font-bold text-[13px] flex items-center gap-2 shadow-sm transition-colors font-cairo disabled:opacity-50"
              >
                <Check className="size-4 stroke-[3]" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
