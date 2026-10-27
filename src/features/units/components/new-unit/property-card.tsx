import {
  Building,
  ExternalLink,
  Plus,
} from "lucide-react";
import { SectionCard, InnerPanel, CaptionLine } from "./ui";
import { PickerPropertyRow } from "./picker-data";

interface PropertyCardProps {
  property?: PickerPropertyRow | null;
  onChangeClick?: () => void;
}

export function PropertyCard({ property, onChangeClick }: PropertyCardProps) {
  return (
    <SectionCard
      number="٢"
      title="العقار المستهدف"
      required
      trailing={
        <button
          type="button"
          onClick={onChangeClick}
          className="text-[11.5px] font-semibold text-[#2C3527] transition-colors hover:text-[#181D17] cursor-pointer"
        >
          {property ? "تغيير العقار" : "تحديد العقار"}
        </button>
      }
    >
      <InnerPanel>
        {property ? (
          <>
            {/* Property identity */}
            <div className="flex items-start gap-3">
              <span className="w-11 h-11 shrink-0 rounded-[11px] bg-[#E3EAD7] flex items-center justify-center">
                <Building
                  className="w-[21px] h-[21px] text-[#34422A]"
                  strokeWidth={1.9}
                />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[18px] leading-[25px] font-bold text-[#181D17]">
                    {property.name}
                  </span>
                  <span className="shrink-0 h-[22px] px-2 rounded-full bg-[#D8E8CB] text-[10.5px] font-bold text-[#2F5A22] flex items-center">
                    {property.code}
                  </span>
                </div>
                <p className="text-[11.5px] leading-[17px] text-[#7C8773] mt-1.5">
                  {property.city} — {property.district}
                </p>
              </div>

              <button
                type="button"
                onClick={onChangeClick}
                className="shrink-0 flex items-center gap-1.5 text-[11.5px] font-semibold text-[#2C3527] transition-colors hover:text-[#181D17] cursor-pointer"
              >
                <span>تغيير</span>
                <ExternalLink className="w-[13px] h-[13px]" strokeWidth={1.9} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-x-4 gap-y-2 flex-wrap text-[11.5px] text-[#4A5440]">
              <span>إجمالي الوحدات بالعقار: {property.unitsCount} وحدات</span>
              <span>•</span>
              <span className="text-[#6E7A66]">
                {property.active ? "عقار نشط ومعتمد" : "قيد المراجعة"}
              </span>
            </div>
          </>
        ) : (
          <div className="py-4 text-center space-y-2">
            <p className="text-[13px] font-bold text-[#181D17]">لا يوجد عقار محدد</p>
            <p className="text-[11.5px] text-[#7C8773]">يرجى اختيار العقار الذي تنتمي إليه هذه الوحدة</p>
            <button
              type="button"
              onClick={onChangeClick}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4B5940] text-white text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>تحديد العقار</span>
            </button>
          </div>
        )}
      </InnerPanel>

      <CaptionLine className="mt-3">
        ترتبط تراخيص التشغيل وإعدادات الصيانة مباشرة بملف هذا العقار.
      </CaptionLine>
    </SectionCard>
  );
}
