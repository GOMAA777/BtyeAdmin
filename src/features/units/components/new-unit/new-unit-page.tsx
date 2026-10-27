"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { propertiesService } from "@/services/properties-service";
import { ownersService } from "@/services/owners-service";
import { unitsService } from "@/services/units-service";
import { NewUnitHeaderCard } from "./header-card";
import { OwnerCard } from "./owner-card";
import { PropertyCard } from "./property-card";
import { UnitSpecsCard } from "./unit-specs-card";
import { PricingCard } from "./pricing-card";
import { OccupancyCard } from "./occupancy-card";
import { AccessCodeCard } from "./access-code-card";
import { OperationalStatusCard } from "./operational-status-card";
import { DescriptionCard } from "./description-card";
import { FormFooterBar } from "./form-footer-bar";
import { PropertyPickerPopup } from "./property-picker-popup";
import { OwnerPickerPopup } from "./owner-picker-popup";
import { UnitSuccessScreen } from "./success-screen";
import { PickerPropertyRow, PickerOwnerRow } from "./picker-data";

export function NewUnitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirm = useConfirm();

  const [properties, setProperties] = useState<PickerPropertyRow[]>([]);
  const [owners, setOwners] = useState<PickerOwnerRow[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showPropertyPicker, setShowPropertyPicker] = useState(false);
  const [showOwnerPicker, setShowOwnerPicker] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState("");

  // Working Form State
  const [unitNumber, setUnitNumber] = useState("");
  const [floor, setFloor] = useState("الطابق الثاني (الدور 2)");
  const [area, setArea] = useState("");
  const [unitType, setUnitType] = useState("full");
  const [price, setPrice] = useState("320");
  const [billingCycle, setBillingCycle] = useState<"night" | "month">("night");
  const [maxGuests, setMaxGuests] = useState(2);
  const [bedDistribution, setBedDistribution] = useState("1 سرير مزدوج كبير (King)");
  const [description, setDescription] = useState("");

  const [showSuccess, setShowSuccess] = useState(
    searchParams?.get("success") === "true"
  );

  const loadData = useCallback(async () => {
    try {
      const [rawProps, rawOwners] = await Promise.all([
        propertiesService.getAll(),
        ownersService.getAll(),
      ]);

      const formattedProps: PickerPropertyRow[] = rawProps.map((p) => ({
        id: p.id,
        name: p.title || p.name || "",
        code: p.id,
        district: p.district,
        city: p.city,
        unitsCount: p.totalUnits || p.unitsCount || 0,
        active: p.status === "active",
      }));

      const formattedOwners: PickerOwnerRow[] = rawOwners.map((o) => ({
        id: o.id,
        name: o.name,
        code: o.id,
        initials: o.initials || o.name.charAt(0) || "م",
        propertiesCount: o.propertiesCount,
        phone: o.phone,
        active: o.status === "active",
      }));

      setProperties(formattedProps);
      setOwners(formattedOwners);

      if (formattedProps.length > 0 && !selectedPropertyId) {
        setSelectedPropertyId(formattedProps[0].id);
      }
      if (formattedOwners.length > 0 && !selectedOwnerId) {
        setSelectedOwnerId(formattedOwners[0].id);
      }
    } finally {
      setIsLoadingData(false);
    }
  }, [selectedPropertyId, selectedOwnerId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const selectedProperty =
    properties.find((p) => p.id === selectedPropertyId) || null;
  const selectedOwner =
    owners.find((o) => o.id === selectedOwnerId) || null;

  const handleSave = async () => {
    if (!unitNumber.trim()) {
      toast.error("يرجى إدخال رقم الوحدة");
      return;
    }

    if (!selectedProperty) {
      toast.error("يرجى اختيار العقار التابع أولاً");
      return;
    }

    const ok = await confirm({
      title: "تأكيد إضافة الوحدة",
      message: `هل أنت متأكد من حفظ الوحدة "${unitNumber}" وإضافتها إلى عقار "${selectedProperty.name}"؟`,
      confirmLabel: "حفظ واعتماد الوحدة",
      variant: "default",
    });
    if (!ok) return;

    try {
      const typeLabels: Record<string, string> = {
        studio: "استوديو",
        room: "غرفة منفصلة",
        full: "شقة كاملة",
        luxury: "جناح فاخر",
        custom: "تصنيف مخصص",
      };

      await unitsService.create({
        name: `وحدة ${unitNumber.trim()}`,
        unitNumber: unitNumber.trim(),
        propertyId: selectedProperty.id,
        propertyName: selectedProperty.name,
        type: unitType,
        typeLabel: typeLabels[unitType] || "شقة كاملة",
        floor: floor,
        rooms: unitType === "studio" ? "استوديو" : "غرفتين وصالة",
        area: area ? `${area} م²` : "65 م²",
        pricePerNight: parseInt(price, 10) || 320,
        maxGuests: maxGuests,
        status: "available",
      });

      toast.success("تم تسجيل بيانات الوحدة واعتمادها بنجاح!");
      setShowSuccess(true);
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set("success", "true");
      router.push(`?${params.toString()}`);
    } catch {
      toast.error("حدث خطأ أثناء حفظ الوحدة");
    }
  };

  const handleAddAnother = () => {
    setShowSuccess(false);
    setUnitNumber("");
    router.push("/units/new/");
  };

  if (showSuccess) {
    return (
      <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F1F5EB] min-h-screen">
        <UnitSuccessScreen
          onAddAnother={handleAddAnother}
          onBackToList={() => router.push("/units/")}
          property={selectedProperty?.name || "العقار المعتمد"}
          owner={selectedOwner?.name || "المالك المسجل"}
        />
      </div>
    );
  }

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F1F5EB]">
      <div className="px-5 pt-5 space-y-6">
        {/* Page header */}
        <NewUnitHeaderCard />

        {/* Empty property notification if no properties exist (only after loading completes) */}
        {!isLoadingData && properties.length === 0 && (
          <div className="bg-[#FFF8E6] border border-[#F3E2B8] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#8A6300]">لا يوجد عقارات مسجلة في المنصة حتى الآن</p>
              <p className="text-xs text-[#A67C00]">يجب إضافة عقار أولاً لكي تتمكن من تعيين وحدات سكنية تابعة له.</p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/properties/new/")}
              className="bg-[#34422A] hover:bg-[#283520] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              + إضافة عقار جديد أولاً
            </button>
          </div>
        )}

        {/* ١ المالك + ٢ العقار */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            onClick={() => setShowOwnerPicker(true)}
            className="cursor-pointer"
          >
            <OwnerCard
              owner={selectedOwner}
              onChangeClick={() => setShowOwnerPicker(true)}
            />
          </div>
          <div
            onClick={() => setShowPropertyPicker(true)}
            className="cursor-pointer"
          >
            <PropertyCard
              property={selectedProperty}
              onChangeClick={() => setShowPropertyPicker(true)}
            />
          </div>
        </div>

        {/* ٣ بيانات ومواصفات الوحدة */}
        <UnitSpecsCard
          unitNumber={unitNumber}
          setUnitNumber={setUnitNumber}
          floor={floor}
          setFloor={setFloor}
          area={area}
          setArea={setArea}
          unitType={unitType}
          setUnitType={setUnitType}
          propertyName={selectedProperty?.name}
        />

        {/* ٤ التسعير + ٥ السعة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PricingCard
            price={price}
            setPrice={setPrice}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />
          <OccupancyCard
            maxGuests={maxGuests}
            setMaxGuests={setMaxGuests}
            bedDistribution={bedDistribution}
            setBedDistribution={setBedDistribution}
          />
        </div>

        {/* ٦ سياسة كود الدخول الذكي + ملاحظة الأمان */}
        <AccessCodeCard />

        {/* ٧ الحالة التشغيلية + ٨ الوصف */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OperationalStatusCard />
          <DescriptionCard
            description={description}
            setDescription={setDescription}
          />
        </div>

        {/* Docking footer */}
        <FormFooterBar
          onSaveDraft={handleSave}
          onCancel={() => router.push("/units/")}
          onSave={handleSave}
        />
      </div>

      {/* Popups */}
      <PropertyPickerPopup
        key={`property-${showPropertyPicker}`}
        open={showPropertyPicker}
        onClose={() => setShowPropertyPicker(false)}
        selectedId={selectedPropertyId}
        onSelect={setSelectedPropertyId}
        onConfirm={() => setShowPropertyPicker(false)}
        properties={properties}
        isLoading={isLoadingData}
      />

      <OwnerPickerPopup
        key={`owner-${showOwnerPicker}`}
        open={showOwnerPicker}
        onClose={() => setShowOwnerPicker(false)}
        selectedId={selectedOwnerId}
        onSelect={setSelectedOwnerId}
        onConfirm={() => setShowOwnerPicker(false)}
        owners={owners}
        isLoading={isLoadingData}
      />
    </div>
  );
}
