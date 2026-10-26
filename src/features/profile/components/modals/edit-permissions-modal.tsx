"use client";

import { useState } from "react";
import { X, ShieldCheck, Check, Building2 } from "lucide-react";
import { UserProfileData } from "../../types";

interface EditPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileData;
  onSave: (scope: "all" | "custom", propertyIds: string[], permissions: UserProfileData["permissions"]) => void;
}

export function EditPermissionsModal({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditPermissionsModalProps) {
  const [scope, setScope] = useState<"all" | "custom">(profile.coverageScope);
  const [assignedProperties, setAssignedProperties] = useState(profile.assignedProperties);
  const [permissions, setPermissions] = useState(profile.permissions);

  if (!isOpen) return null;

  const toggleProperty = (id: string) => {
    setAssignedProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleSave = () => {
    const activePropertyIds = assignedProperties.filter((p) => p.isActive).map((p) => p.id);
    onSave(scope, activePropertyIds, permissions);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white relative w-full max-w-[540px] rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(24,29,23,0.22)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-[6px] w-full bg-gradient-to-r from-[#4b5940] via-[#d8e8c7] to-[#34422a]" />

        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 left-5 size-8 flex items-center justify-center rounded-full bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-[12px] bg-[#ebefe6] text-[#34422a] flex items-center justify-center shrink-0 shadow-sm border border-[#dfe4db]">
              <ShieldCheck className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[22px] font-bold text-[#181d17] leading-tight font-cairo">
                تعديل نطاق الصلاحيات ونوع المهام
              </h2>
              <p className="text-[13px] text-[#454840] font-medium font-cairo">
                تحديد التغطية الجغرافية للعقارات والمهام المصرح بها في النظام
              </p>
            </div>
          </div>

          <div className="space-y-5 font-cairo">
            {/* Scope Selection */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#181d17] block">
                نطاق التغطية الجغرافية
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setScope("custom")}
                  className={`p-3 rounded-[12px] text-right border transition-all ${
                    scope === "custom"
                      ? "bg-[#f1f5eb] border-[#34422a] text-[#181d17] ring-1 ring-[#34422a]"
                      : "bg-white border-[#dfe4db] text-[#454840] hover:bg-[#f1f5eb]/50"
                  }`}
                >
                  <div className="font-bold text-[13px]">عقارات مخصصة</div>
                  <div className="text-[11px] text-[#75786f]">تحديد عقارات ووحدات معينة</div>
                </button>
                <button
                  type="button"
                  onClick={() => setScope("all")}
                  className={`p-3 rounded-[12px] text-right border transition-all ${
                    scope === "all"
                      ? "bg-[#f1f5eb] border-[#34422a] text-[#181d17] ring-1 ring-[#34422a]"
                      : "bg-white border-[#dfe4db] text-[#454840] hover:bg-[#f1f5eb]/50"
                  }`}
                >
                  <div className="font-bold text-[13px]">شامل لكافة العقارات</div>
                  <div className="text-[11px] text-[#75786f]">صلاحيات الإشراف على كامل المحفظة</div>
                </button>
              </div>
            </div>

            {/* Properties Checklist if custom */}
            {scope === "custom" && (
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#181d17] block">
                  العقارات المعينة
                </label>
                <div className="space-y-2">
                  {assignedProperties.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => toggleProperty(p.id)}
                      className={`p-3 rounded-[10px] border flex items-center justify-between cursor-pointer transition-colors ${
                        p.isActive
                          ? "bg-[#ebefe6] border-[#34422a]/30 text-[#181d17]"
                          : "bg-white border-[#dfe4db] text-[#75786f] opacity-70"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Building2 className="size-4 text-[#34422a]" />
                        <span className="font-semibold text-[13px]">{p.name}</span>
                      </div>
                      <div className={`size-5 rounded-[6px] border flex items-center justify-center ${
                        p.isActive ? "bg-[#34422a] border-[#34422a] text-white" : "border-[#dfe4db]"
                      }`}>
                        {p.isActive && <Check className="size-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Permitted Task Types */}
            <div className="space-y-2 pt-2 border-t border-[#f1f5eb]">
              <label className="text-[12px] font-bold text-[#181d17] block">
                أنواع المهام المصرح بها
              </label>
              <div className="space-y-2">
                <div
                  onClick={() => setPermissions((prev) => ({ ...prev, cleaning: !prev.cleaning }))}
                  className="p-3 rounded-[10px] bg-[#f1f5eb] flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-[13px] text-[#181d17]">
                      تنظيف وتجهيز الوحدات بعد المغادرة
                    </div>
                    <div className="text-[11px] text-[#75786f]">
                      رفع الصور والتقارير عبر الجوال
                    </div>
                  </div>
                  <div className={`size-5 rounded-[6px] border flex items-center justify-center ${
                    permissions.cleaning ? "bg-[#34422a] border-[#34422a] text-white" : "border-[#dfe4db]"
                  }`}>
                    {permissions.cleaning && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div
                  onClick={() => setPermissions((prev) => ({ ...prev, inspection: !prev.inspection }))}
                  className="p-3 rounded-[10px] bg-[#f1f5eb] flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-[13px] text-[#181d17]">
                      التفتيش الدوري وتوثيق النواقص
                    </div>
                    <div className="text-[11px] text-[#75786f]">
                      تسجيل الاستهلاك والمفقودات
                    </div>
                  </div>
                  <div className={`size-5 rounded-[6px] border flex items-center justify-center ${
                    permissions.inspection ? "bg-[#34422a] border-[#34422a] text-white" : "border-[#dfe4db]"
                  }`}>
                    {permissions.inspection && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                </div>

                <div
                  onClick={() => setPermissions((prev) => ({ ...prev, maintenance: !prev.maintenance }))}
                  className="p-3 rounded-[10px] bg-[#f1f5eb] flex items-center justify-between cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-[13px] text-[#181d17]">
                      صيانة الأعطال الفنية والكهربائية
                    </div>
                    <div className="text-[11px] text-[#75786f]">
                      فريق الصيانة المتخصص
                    </div>
                  </div>
                  <div className={`size-5 rounded-[6px] border flex items-center justify-center ${
                    permissions.maintenance ? "bg-[#34422a] border-[#34422a] text-white" : "border-[#dfe4db]"
                  }`}>
                    {permissions.maintenance && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5eb]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[10px] bg-[#ebefe6] text-[#454840] font-bold text-[13px] hover:bg-[#dfe4db] transition-colors font-cairo"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-[10px] bg-[#4b5940] hover:bg-[#34422a] text-white font-bold text-[13px] flex items-center gap-2 shadow-sm transition-colors font-cairo"
            >
              <Check className="size-4 stroke-[3]" />
              <span>تحديث الصلاحيات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
