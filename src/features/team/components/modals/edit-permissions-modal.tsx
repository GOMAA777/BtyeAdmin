"use client";

import { useState } from "react";
import { X, ShieldCheck, CheckSquare, Check } from "lucide-react";
import { TeamMember } from "../../types";

interface EditPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onConfirm: (memberId: string, scope: "all" | "custom", propertyIds: string[]) => void;
}

export function EditPermissionsModal({
  isOpen,
  onClose,
  member,
  onConfirm,
}: EditPermissionsModalProps) {
  const [scope, setScope] = useState<"all" | "custom">(member?.coverageScope || "custom");
  const [selectedProps, setSelectedProps] = useState<string[]>(
    member?.assignedProperties.filter((p) => p.isActive !== false).map((p) => p.id) || ["p1", "p2"]
  );

  if (!isOpen || !member) return null;

  const toggleProperty = (id: string) => {
    setSelectedProps((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const propertiesList = [
    {
      id: "p1",
      name: "عمارة النخيل السكنية",
      location: "حي الصحافة، الرياض",
      unitsBadge: "كافة الوحدات (8 وحدات)",
      unitsCount: 8,
    },
    {
      id: "p2",
      name: "برج الياسمين الفندقي",
      location: "طريق الملك فهد، الرياض",
      unitsBadge: "الدور الثاني (6 وحدات: 201-206)",
      unitsCount: 6,
    },
    {
      id: "p3",
      name: "فيلا النرجس المستقلة",
      location: "حي النرجس، الرياض",
      unitsBadge: "غير مشمولة",
      unitsCount: 1,
    },
  ];

  const totalUnits = propertiesList
    .filter((p) => selectedProps.includes(p.id))
    .reduce((acc, p) => acc + p.unitsCount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
      <div
        className="bg-white relative w-full max-w-[560px] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 size-9 flex items-center justify-center rounded-[8px] bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="size-11 rounded-[12px] bg-[#d8e8c7] text-[#34422a] flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[20px] font-bold text-[#181d17] leading-tight font-cairo">
                تعديل نطاق الصلاحيات
              </h2>
              <div className="flex items-center gap-2 text-[12px] text-[#454840] font-cairo">
                <span className="font-semibold text-[#34422a]">
                  {member.roleLabel} ({member.systemId.replace("#", "")})
                </span>
                <span>•</span>
                <span>{member.fullName}</span>
              </div>
            </div>
          </div>

          {/* Section: Geographical & Property Scope */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-[#181d17] font-cairo">
                نطاق التغطية الجغرافية والعقارات
              </h3>
              <span className="bg-[#f2e1c0] text-[#231a06] text-[11px] font-bold px-2 py-0.5 rounded-full font-cairo">
                مخصص
              </span>
            </div>

            {/* Radio Scope Toggle */}
            <div className="bg-[#f1f5eb] p-1 rounded-[12px] grid grid-cols-2 gap-1 text-[12px] font-semibold font-cairo">
              <button
                type="button"
                onClick={() => setScope("custom")}
                className={`py-2 px-3 rounded-[8px] flex items-center justify-center gap-2 transition-all ${
                  scope === "custom"
                    ? "bg-white text-[#34422a] shadow-sm font-bold"
                    : "text-[#454840] hover:text-[#181d17]"
                }`}
              >
                <div className={`size-4 rounded-full border flex items-center justify-center ${scope === "custom" ? "border-[#34422a]" : "border-[#767676]"}`}>
                  {scope === "custom" && <div className="size-2 rounded-full bg-[#34422a]" />}
                </div>
                <span>عقارات مخصصة</span>
              </button>
              <button
                type="button"
                onClick={() => setScope("all")}
                className={`py-2 px-3 rounded-[8px] flex items-center justify-center gap-2 transition-all ${
                  scope === "all"
                    ? "bg-white text-[#34422a] shadow-sm font-bold"
                    : "text-[#454840] hover:text-[#181d17]"
                }`}
              >
                <div className={`size-4 rounded-full border flex items-center justify-center ${scope === "all" ? "border-[#34422a]" : "border-[#767676]"}`}>
                  {scope === "all" && <div className="size-2 rounded-full bg-[#34422a]" />}
                </div>
                <span>جميع عقاراتي</span>
              </button>
            </div>

            {/* Properties List */}
            <div className="space-y-2 pt-1">
              {propertiesList.map((prop) => {
                const isSelected = selectedProps.includes(prop.id);
                return (
                  <div
                    key={prop.id}
                    onClick={() => toggleProperty(prop.id)}
                    className={`p-3 rounded-[12px] flex items-center justify-between cursor-pointer border transition-all ${
                      isSelected
                        ? "bg-[#f1f5eb] border-[#d8e8c7]"
                        : "bg-[#f1f5eb]/60 border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`size-5 rounded flex items-center justify-center ${isSelected ? "bg-[#34422a] text-white" : "border border-[#767676] bg-white"}`}>
                        {isSelected && <Check className="size-3.5 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-[14px] font-bold text-[#181d17] font-cairo">
                          {prop.name}
                        </div>
                        <div className="text-[11px] text-[#454840] font-cairo">
                          {prop.location}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full font-cairo ${
                        isSelected
                          ? "bg-[#d8e8c7] text-[#131f0b]"
                          : "bg-[#dfe4db] text-[#454840]"
                      }`}
                    >
                      {isSelected ? prop.unitsBadge : "غير مشمولة"}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Actual Scope Summary */}
            <div className="bg-[#f1f5eb] rounded-[10px] p-3 flex items-center justify-between text-[12.5px] font-cairo border border-[#dfe4db]">
              <span className="text-[#454840] font-medium flex items-center gap-1.5">
                <CheckSquare className="size-4 text-[#34422a]" />
                الحصيلة الفعلية للتغطية:
              </span>
              <span className="font-bold text-[#181d17]">
                إجمالي الوحدات المشمولة حالياً: {totalUnits} وحدة سكنية
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-[12px] border border-[#dfe4db] text-[#454840] font-semibold text-[14px] hover:bg-[#f1f5eb] transition-colors font-cairo"
            >
              إلغاء
            </button>
            <button
              onClick={() => onConfirm(member.id, scope, selectedProps)}
              className="px-6 py-2.5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-semibold text-[14px] flex items-center gap-2 shadow-sm transition-colors font-cairo"
            >
              <span>حفظ التعديلات</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
