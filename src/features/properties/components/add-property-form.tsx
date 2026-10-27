"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";
import { FloatingConfirmationBar } from "@/components/shared/floating-confirmation-bar";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import { ownersService } from "@/services/owners-service";
import { propertiesService } from "@/services/properties-service";
import { AddOwnerModal } from "@/features/owners/components/add-owner-modal";
import type { Owner } from "@/features/owners/types";

const PROPERTY_TYPE_OPTIONS = [
  "عمارة سكنية تجارية",
  "مجمع سكني",
  "أبراج سكنية",
  "فيلا استثمارية",
];

const CITY_OPTIONS = [
  "الرياض",
  "جدة",
  "الدمام",
  "الخبر",
  "مكة المكرمة",
  "المدينة المنورة",
];

interface AmenityItem {
  id: string;
  title: string;
  subtitle: string;
}

const AMENITIES_LIST: AmenityItem[] = [
  { id: "ev", title: "شواحن EV مخصصة", subtitle: "للسيارات الكهربائية" },
  { id: "elevators", title: "مصاعد أوتيس الذكية", subtitle: "تحكم بالبطاقات الذكية" },
  { id: "parking", title: "مواقف سفلية مظللة", subtitle: "مواقف بدروم مخصصة" },
  { id: "cctv", title: "مراقبة CCTV 24/7", subtitle: "تغطية أمنية لكافة المداخل" },
  { id: "smart_locks", title: "بوابة أقفال ذكية متصلة", subtitle: "دخول إلكتروني ورمز QR" },
  { id: "fire_system", title: "نظام إطفاء وإنذار ذكي", subtitle: "معتمد من الدفاع المدني" },
];

const DEFAULT_OWNER: Owner = {
  id: "owner-default",
  name: "محمد بن سعود العتيبي",
  initials: "م",
  email: "m.alotaibi@domain.sa",
  phone: "+966 55 123 4567",
  propertiesCount: 6,
  unitsCount: 24,
  registrationDate: "12 أكتوبر 2026",
  relativeTime: "(موثق)",
  status: "active",
};

interface AddPropertyFormProps {
  onSuccess?: () => void;
}

export function AddPropertyForm({ onSuccess }: AddPropertyFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Owners list & dynamic selection
  const [owners, setOwners] = useState<Owner[]>([DEFAULT_OWNER]);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string>("owner-default");
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false);
  const [isAddOwnerModalOpen, setIsAddOwnerModalOpen] = useState(false);

  // Form State initialized to match Figma design defaults
  const [propertyName, setPropertyName] = useState("عمارة النخيل السكنية");
  const [propertyType, setPropertyType] = useState("عمارة سكنية تجارية");
  const [city, setCity] = useState("الرياض");
  const [district, setDistrict] = useState("حي النخيل الغربي");
  const [unitsCount, setUnitsCount] = useState("24");
  const [addressDetails, setAddressDetails] = useState(
    "طريق الإمام سعود بن فيصل، بالقرب من تقاطع الملك فهد، مبنى رقم 482"
  );
  const [description, setDescription] = useState(
    "عقار سكني حديث التشطيب مكون من 4 أدوار، مزود بمصعدين حديثين ومواقف سفلية مخصصة لكل وحدة، كاميرات مراقبة وحراسة أمنية متكاملة على مدار الساعة."
  );
  const [operationalStatus, setOperationalStatus] = useState<"active" | "inactive">("active");

  // Property Photo Upload & Preview
  const [previewImage, setPreviewImage] = useState<string>("/properties/figma_nakheel.png");
  const [imageRotation, setImageRotation] = useState<number>(0);

  // Selected Amenities (all 6 pre-selected as per Figma design)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "ev",
    "elevators",
    "parking",
    "cctv",
    "smart_locks",
    "fire_system",
  ]);

  // Map state
  const [mapMode, setMapMode] = useState<"static" | "satellite">("static");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadOwners = useCallback(async () => {
    try {
      const data = await ownersService.getAll();
      if (data && data.length > 0) {
        setOwners(data);
        if (!selectedOwnerId || selectedOwnerId === "owner-default") {
          setSelectedOwnerId(data[0].id);
        }
      }
    } catch {
      // Keep default owner if service is empty
    }
  }, [selectedOwnerId]);

  useEffect(() => {
    loadOwners();
  }, [loadOwners]);

  const confirm = useConfirm();

  const currentOwner = owners.find((o) => o.id === selectedOwnerId) || DEFAULT_OWNER;

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("حجم الصورة يتجاوز الحد الأقصى 10 ميجابايت");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
          toast.success("تم رفع صورة واجهة العقار بنجاح");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewImage("");
    toast.info("تمت إزالة الصورة");
  };

  const handleRotateImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageRotation((prev) => (prev + 90) % 360);
    toast.info("تم تدوير الصورة");
  };

  const handleSubmit = async (e?: React.FormEvent, continueToUnits = false) => {
    if (e) e.preventDefault();

    if (!propertyName.trim()) {
      toast.error("يرجى إدخال اسم العقار");
      return;
    }

    if (!selectedOwnerId) {
      toast.error("يرجى اختيار مالك العقار أولاً أو تسجيل مالك جديد");
      return;
    }

    const ok = await confirm({
      title: "تأكيد حفظ العقار",
      message: `هل أنت متأكد من حفظ وتفعيل بيانات العقار "${propertyName}" في محفظة المالك "${currentOwner.name}"؟`,
      confirmLabel: "حفظ واعتماد العقار",
      variant: "default",
    });
    if (!ok) return;

    try {
      setIsSubmitting(true);
      await propertiesService.create({
        name: propertyName.trim(),
        title: propertyName.trim(),
        type: propertyType,
        city,
        district: district.trim(),
        address: addressDetails.trim(),
        description: description.trim(),
        unitsCount: parseInt(unitsCount, 10) || 24,
        totalUnits: parseInt(unitsCount, 10) || 24,
        ownerId: currentOwner.id,
        ownerName: currentOwner.name,
        status: operationalStatus,
      });

      toast.success("تم تسجيل وتفعيل بيانات العقار واعتماده بنجاح");
      if (continueToUnits) {
        router.push("/units/");
      } else if (onSuccess) {
        onSuccess();
      } else {
        router.push("/properties/");
      }
    } catch {
      toast.error("حدث خطأ أثناء حفظ بيانات العقار");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e, false)}
        className="space-y-6 pb-20 animate-in fade-in duration-300"
        dir="rtl"
      >
        {/* ======================================================== */}
        {/* SECTION A: TOP HERO GREETING BAR (Figma Node 1:5)        */}
        {/* ======================================================== */}
        <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] px-6 sm:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Right side in RTL: Title & Subtitle */}
          <div className="space-y-1 text-right">
            <h1 className="text-2xl font-bold text-[#181D17] leading-[34px]">
              إضافة عقار جديد
            </h1>
            <p className="text-sm font-normal text-[#454840] leading-[22px]">
              إدراج عقار جديد وتعيينه لمالك مسجل في المنصة وربط التراخيص والبيانات الجغرافية بدقة.
            </p>
          </div>

          {/* Left side in RTL: Overlay+Shadow Certification Card */}
          <div className="bg-[rgba(216,232,203,0.4)] rounded-[16px] px-4 py-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="text-right">
              <div className="text-[11px] font-semibold text-[#34422A] leading-[16px]">
                إجراء إداري معتمد
              </div>
              <div className="text-[13px] font-normal text-[#454840] leading-[20px]">
                يرتبط العقار مباشرة بمحفظة المالك المحددة مع إشعار فوري.
              </div>
            </div>
            <div className="w-8 h-8 rounded-[12px] bg-[#4B5940] flex items-center justify-center shrink-0">
              <Image
                src="/properties/figma_icons/hero_shield.svg"
                alt="شعار التوثيق"
                width={14}
                height={16}
                className="w-3.5 h-4 object-contain brightness-0 invert"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN 12-COLUMN FORM CANVAS (Figma Node 1:23)             */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ====================================================== */}
          {/* RIGHT COLUMN (8 COLS): CORE DATA & LOCATION (Node 1:24)*/}
          {/* ====================================================== */}
          <div className="lg:col-span-8 space-y-6">
            {/* ---------------------------------------------------- */}
            {/* SECTION 1: مالك العقار (Figma Node 1:25)             */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="bg-[#D8E8C7] text-[#131F0B] text-[11px] font-semibold px-3 py-1 rounded-full select-none">
                  مطلوب إلزامياً
                </span>
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <h2 className="text-lg font-bold text-[#181D17] leading-[28px]">
                      مالك العقار
                    </h2>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      المالك القانوني المقيد في هيئة العقار ووثائق الملكية
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-[12px] bg-[#EBEFE6] flex items-center justify-center shrink-0">
                    <Image
                      src="/properties/figma_icons/owner_header.svg"
                      alt="مالك العقار"
                      width={18}
                      height={18}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                </div>
              </div>

              {/* Searchable Selector Bar */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#181D17] text-right">
                  البحث عن المالك وتحديده
                </label>
                <div className="relative">
                  <div className="bg-[#F1F5EB] rounded-[12px] h-11 flex items-center justify-between px-3 pr-10">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOwnerDropdownOpen((prev) => !prev)}
                        className="bg-[#E5EAE0] hover:bg-[#DCE3D6] text-[#454840] text-[11px] font-medium rounded-[8px] h-8 px-3 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Image
                          src="/properties/figma_icons/change_switch.svg"
                          alt="تغيير"
                          width={12}
                          height={10}
                          className="w-3 h-2.5"
                        />
                        <span>تغيير</span>
                      </button>
                    </div>

                    <div className="text-sm font-normal text-[#181D17] text-right truncate">
                      {currentOwner.name} ({currentOwner.name === "محمد بن سعود العتيبي" ? "مؤسسة محمد العتيبي العقارية" : "مالك مسجل"})
                    </div>

                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Image
                        src="/properties/figma_icons/search.svg"
                        alt="بحث"
                        width={17}
                        height={16}
                        className="w-4 h-4 opacity-75"
                      />
                    </div>
                  </div>

                  {/* Owner selection popover when clicking تغيير */}
                  {isOwnerDropdownOpen && (
                    <div className="absolute z-30 top-full mt-2 inset-x-0 bg-white rounded-2xl border border-[#E2E6DC] shadow-xl p-2 space-y-1 max-h-60 overflow-y-auto">
                      <div className="px-3 py-1.5 text-xs text-[#75786F] font-semibold border-b border-[#E2E6DC] flex items-center justify-between">
                        <span>قائمة الملاك المسجلين</span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsOwnerDropdownOpen(false);
                            setIsAddOwnerModalOpen(true);
                          }}
                          className="text-[#34422A] hover:underline font-bold"
                        >
                          + تسجيل مالك جديد
                        </button>
                      </div>
                      {owners.map((owner) => (
                        <button
                          key={owner.id}
                          type="button"
                          onClick={() => {
                            setSelectedOwnerId(owner.id);
                            setIsOwnerDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-right px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#F1F5EB] transition-colors",
                            owner.id === selectedOwnerId && "bg-[#F1F5EB] font-bold text-[#34422A]"
                          )}
                        >
                          <span>{owner.name}</span>
                          <span className="text-[11px] text-[#75786F]" dir="ltr">{owner.phone}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Active Selected Owner Card */}
              <div className="bg-[rgba(241,245,235,0.6)] rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#E8EDE2]/60">
                <Link
                  href={`/owners/${currentOwner.id}/`}
                  className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[12px] h-9 px-3.5 text-[12px] font-semibold text-[#34422A] flex items-center gap-1.5 hover:bg-[#FAFBF9] transition-colors shrink-0 self-start sm:self-center"
                >
                  <Image
                    src="/properties/figma_icons/external_link.svg"
                    alt="رابط"
                    width={12}
                    height={12}
                    className="w-3 h-3"
                  />
                  <span>ملف المالك</span>
                </Link>

                <div className="flex items-center gap-3.5 text-right">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="bg-[#DFE4DB] text-[#454840] text-[11px] font-medium px-2 py-0.5 rounded">
                        {currentOwner.status === "active" ? "حساب موثق" : "قيد المراجعة"}
                      </span>
                      <h3 className="text-lg font-bold text-[#181D17]">
                        {currentOwner.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-[13px] font-normal text-[#454840] flex-wrap justify-end">
                      <span className="truncate">مؤسسة محمد العتيبي للتطوير العقاري</span>
                      <span className="w-1 h-1 rounded-full bg-[#C5C8BD]" />
                      <div className="flex items-center gap-1">
                        <span>رخصة فال:</span>
                        <span className="font-bold text-[#181D17]">1200028491</span>
                        <Image
                          src="/properties/figma_icons/fal_license.svg"
                          alt="رخصة فال"
                          width={14}
                          height={13}
                          className="w-3.5 h-3"
                        />
                      </div>
                      <span className="w-1 h-1 rounded-full bg-[#C5C8BD]" />
                      <div className="flex items-center gap-1">
                        <span dir="ltr">{currentOwner.phone}</span>
                        <Image
                          src="/properties/figma_icons/phone.svg"
                          alt="هاتف"
                          width={11}
                          height={11}
                          className="w-3 h-3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#4B5940] text-white text-lg font-bold flex items-center justify-center">
                      {currentOwner.initials || "م"}
                    </div>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#059669] shadow-[0px_0px_0px_2px_white] absolute bottom-0 right-0" />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SECTION 2: بيانات العقار الأساسية (Figma Node 1:87)  */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3 justify-end text-right">
                <div>
                  <h2 className="text-lg font-bold text-[#181D17] leading-[28px]">
                    بيانات العقار الأساسية
                  </h2>
                  <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                    الاسم التجاري وتصنيف الأصل وموقعه الإداري
                  </p>
                </div>
                <div className="w-10 h-10 rounded-[12px] bg-[#EBEFE6] flex items-center justify-center shrink-0">
                  <Image
                    src="/properties/figma_icons/property_info.svg"
                    alt="بيانات العقار"
                    width={18}
                    height={16}
                    className="w-[18px] h-4"
                  />
                </div>
              </div>

              {/* Form Grid */}
              <div className="space-y-5">
                {/* Row 1: اسم العقار */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-right">
                    <span className="text-[11px] font-medium text-[#75786F]">
                      كما يظهر في منصات التأجير والعقود
                    </span>
                    <label className="text-sm font-semibold text-[#181D17]">
                      اسم العقار <span className="text-[#BA1A1A]">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    placeholder="عمارة النخيل السكنية"
                    className="w-full bg-[#F1F5EB] focus:bg-white border border-[#E0E5D8]/70 focus:border-[#34422A] rounded-[12px] h-11 px-4 text-sm text-[#181D17] text-right focus:outline-none transition-all"
                  />
                </div>

                {/* Row 2: نوع العقار & المدينة */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#181D17] text-right">
                      نوع العقار <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <SelectDropdown
                      value={propertyType}
                      onChange={setPropertyType}
                      options={PROPERTY_TYPE_OPTIONS}
                      placeholder="اختر نوع العقار..."
                      triggerClassName="rounded-[12px] h-11 bg-[#F1F5EB] border-[#E0E5D8]/70 text-sm font-normal text-[#181D17]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#181D17] text-right">
                      المدينة <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <SelectDropdown
                      value={city}
                      onChange={setCity}
                      options={CITY_OPTIONS}
                      placeholder="اختر المدينة..."
                      triggerClassName="rounded-[12px] h-11 bg-[#F1F5EB] border-[#E0E5D8]/70 text-sm font-normal text-[#181D17]"
                    />
                  </div>
                </div>

                {/* Row 3: الحي & عدد الوحدات التقديري */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#181D17] text-right">
                      الحي <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="حي النخيل الغربي"
                      className="w-full bg-[#F1F5EB] focus:bg-white border border-[#E0E5D8]/70 focus:border-[#34422A] rounded-[12px] h-11 px-4 text-sm text-[#181D17] text-right focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-[#181D17] text-right">
                      عدد الوحدات التقديري
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={unitsCount}
                        onChange={(e) => setUnitsCount(e.target.value)}
                        placeholder="24"
                        className="w-full bg-[#F1F5EB] focus:bg-white border border-[#E0E5D8]/70 focus:border-[#34422A] rounded-[12px] h-11 pr-4 pl-10 text-sm text-[#181D17] text-right focus:outline-none transition-all"
                      />
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Image
                          src="/properties/figma_icons/units_door.svg"
                          alt="وحدات"
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5 opacity-70"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 4: العنوان التفصيلي والشارع */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-[#181D17] text-right">
                    العنوان التفصيلي والشارع
                  </label>
                  <input
                    type="text"
                    value={addressDetails}
                    onChange={(e) => setAddressDetails(e.target.value)}
                    placeholder="طريق الإمام سعود بن فيصل، بالقرب من تقاطع الملك فهد، مبنى رقم 482"
                    className="w-full bg-[#F1F5EB] focus:bg-white border border-[#E0E5D8]/70 focus:border-[#34422A] rounded-[12px] h-11 px-4 text-sm text-[#181D17] text-right focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SECTION: صورة العقار والواجهة (Figma Node 1:151)     */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white border border-[#E3EBE0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="bg-[#EFF6EC] text-[#485D41] text-[11px] font-semibold px-2.5 py-1 rounded-[6px]">
                  صورة عالية الدقة
                </span>
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <h3 className="text-base font-bold text-[#1D2919] leading-[24px]">
                      صورة العقار الرئيسية والواجهة المعمارية
                    </h3>
                    <p className="text-xs font-normal text-[#71826D] leading-[16px]">
                      إدراج الصورة الأساسية للمبنى للظهور في تقارير الملاك ومنصة العقود
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-[12px] bg-[#F0F6ED] border border-[#D6E2D1] flex items-center justify-center shrink-0">
                    <Image
                      src="/properties/figma_icons/photo_header.svg"
                      alt="صورة العقار"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              </div>

              {/* Upload & Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Right: Drag & Drop Zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#FAFDF8] border-2 border-dashed border-[#CCD9C7] hover:border-[#4B5940] hover:bg-[#F2F7EE] rounded-[12px] h-48 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-[#EAF3E5] group-hover:scale-105 flex items-center justify-center mb-2 transition-transform">
                    <Image
                      src="/properties/figma_icons/upload_cloud.svg"
                      alt="رفع"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <p className="text-xs leading-4">
                    <span className="text-[#23311F] font-bold">اسحب صورة إضافية هنا أو </span>
                    <span className="text-[#4B5940] underline font-bold">استعرض الملفات</span>
                  </p>
                  <p className="text-[11px] text-[#788A73] font-normal mt-1 leading-[16.5px]">
                    يدعم تنسيقات JPG, PNG, WEBP بدقة عالية حتى 10MB
                  </p>
                </div>

                {/* Left: Uploaded Preview */}
                <div className="border border-[#DCE8D8] rounded-[12px] h-48 relative overflow-hidden bg-[#F8FBF6]">
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="واجهة عمارة النخيل السكنية"
                        style={{ transform: `rotate(${imageRotation}deg)` }}
                        className="w-full h-full object-cover transition-transform duration-300"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-3 text-right">
                        <p className="text-xs font-bold text-white leading-[16.5px] truncate">
                          واجهة عمارة النخيل السكنية - المنظر الخارجي
                        </p>
                        <div className="flex items-center justify-between mt-1 pt-1">
                          <span className="text-[10px] text-[#E5E7EB] font-normal">
                            صورة افتراضية معتمدة • 3.2 MB
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              title="حذف الصورة"
                              className="bg-red-500/80 hover:bg-red-600 rounded p-1 text-white transition-colors cursor-pointer"
                            >
                              <Image
                                src="/properties/figma_icons/trash.svg"
                                alt="حذف"
                                width={14}
                                height={14}
                                className="w-3.5 h-3.5"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={handleRotateImage}
                              title="تدوير الصورة"
                              className="bg-white/20 hover:bg-white/30 rounded p-1 text-white transition-colors cursor-pointer"
                            >
                              <Image
                                src="/properties/figma_icons/rotate.svg"
                                alt="تدوير"
                                width={14}
                                height={14}
                                className="w-3.5 h-3.5"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#788A73] text-xs">
                      لا توجد صورة محددة
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SECTION: المرافق والمواصفات الإضافية (Node 1:192)    */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white border border-[#E3EBE0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="bg-[#F1F7ED] text-[#35482D] text-[11px] font-bold px-3 py-1 rounded-full select-none">
                  {selectedAmenities.length} مرافق محددة
                </span>
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <h3 className="text-base font-bold text-[#1D2919] leading-[24px]">
                      المرافق والمواصفات الإضافية
                    </h3>
                    <p className="text-xs font-normal text-[#71826D] leading-[16px]">
                      حدد التجهيزات الذكية ومرافق الراحة المتوفرة في العقار
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-[12px] bg-[#F0F6ED] border border-[#D6E2D1] flex items-center justify-center shrink-0">
                    <Image
                      src="/properties/figma_icons/amenities_header.svg"
                      alt="المرافق"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {AMENITIES_LIST.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity.id);
                  return (
                    <div
                      key={amenity.id}
                      onClick={() => toggleAmenity(amenity.id)}
                      className={cn(
                        "rounded-[12px] p-3.5 flex items-center justify-between cursor-pointer select-none transition-all",
                        isChecked
                          ? "bg-[#F2F7EE] border border-[#4B5940]"
                          : "bg-white border border-[#E3EBE0] hover:bg-[#F9FBF8]"
                      )}
                    >
                      {/* Checkbox box */}
                      <div
                        className={cn(
                          "w-4.5 h-4.5 rounded-[4px] flex items-center justify-center shrink-0 transition-colors",
                          isChecked ? "bg-[#4B5940]" : "bg-white border border-[#CCD5C5]"
                        )}
                      >
                        {isChecked && (
                          <Image
                            src="/properties/figma_icons/checked.svg"
                            alt="محدد"
                            width={16}
                            height={16}
                            className="w-3.5 h-3.5"
                          />
                        )}
                      </div>

                      {/* Text */}
                      <div className="text-right">
                        <p className="text-xs font-bold text-[#1D281A] leading-4">
                          {amenity.title}
                        </p>
                        <p className="text-[10px] font-normal text-[#6B7D66] leading-[15px] mt-0.5">
                          {amenity.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SECTION 3: الموقع الجغرافي (Figma Node 1:262)        */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toast.success("تم تحديد الموقع عبر GPS بدقة")}
                  className="bg-[#EBEFE6] hover:bg-[#DFE5D9] text-[#34422A] text-xs font-semibold rounded-[12px] h-9 px-4 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Image
                    src="/properties/figma_icons/gps.svg"
                    alt="GPS"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span>تحديد الموقع عبر GPS</span>
                </button>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <h2 className="text-lg font-bold text-[#181D17] leading-[28px]">
                      الموقع الجغرافي وإحداثيات الخريطة
                    </h2>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      تثبيت الموقع لربطه بالخدمات اللوجستية وعقود منصة إيجار
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-[12px] bg-[#EBEFE6] flex items-center justify-center shrink-0">
                    <Image
                      src="/properties/figma_icons/map_header.svg"
                      alt="خريطة"
                      width={16}
                      height={18}
                      className="w-4 h-4.5"
                    />
                  </div>
                </div>
              </div>

              {/* Address Search input */}
              <div className="relative">
                <div className="bg-[#F1F5EB] rounded-[12px] h-11 flex items-center justify-between px-3 pl-28 pr-10">
                  <div className="text-sm font-normal text-[#181D17] text-right truncate">
                    حي النخيل، الرياض، المملكة العربية السعودية
                  </div>

                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Image
                      src="/properties/figma_icons/map_pin.svg"
                      alt="موقع"
                      width={12}
                      height={17}
                      className="w-3 h-4"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => toast.info("تم تأكيد النقطة الجغرافية للعقار")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#34422A] hover:bg-[#283520] text-white text-[11px] font-medium rounded-[8px] h-8 px-3 transition-colors cursor-pointer"
                  >
                    تأكيد النقطة
                  </button>
                </div>
              </div>

              {/* Map Canvas Container */}
              <div className="h-72 rounded-[16px] overflow-hidden relative border border-[#E2E6DC] bg-[#E5EAE0]">
                {mapMode === "static" ? (
                  <img
                    src="/properties/figma_map.png"
                    alt="خريطة حي النخيل الرياض"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src="https://maps.google.com/maps?q=24.7136,46.6753&hl=ar&z=15&t=k&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0 absolute inset-0"
                    title="خريطة قمر صناعي"
                  />
                )}

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(52,66,42,0.3)] via-transparent to-transparent pointer-events-none" />

                {/* Centered Pin Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[rgba(52,66,42,0.2)] absolute" />
                    <div className="w-11 h-11 rounded-full bg-[#34422A] flex items-center justify-center shadow-lg relative">
                      <Image
                        src="/properties/figma_icons/building_marker.svg"
                        alt="عقار"
                        width={18}
                        height={18}
                        className="w-4.5 h-4.5 brightness-0 invert"
                      />
                    </div>
                  </div>
                  <div className="mt-2 backdrop-blur-[4px] bg-[rgba(45,50,44,0.9)] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                    <span className="text-[11px] font-medium text-[#EEF2E9]">
                      عمارة النخيل السكنية (محدد بدقة)
                    </span>
                  </div>
                </div>

                {/* Bottom Coordinates Overlay Card */}
                <div className="absolute bottom-3 inset-x-3 backdrop-blur-[6px] bg-[rgba(255,255,255,0.95)] rounded-[12px] px-4 py-2.5 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center justify-between gap-3 border border-black/5 z-20">
                  {/* Left buttons in RTL */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        window.open("https://maps.google.com/?q=24.7136,46.6753", "_blank")
                      }
                      className="bg-[#4B5940] hover:bg-[#3D4A34] text-white text-[11px] font-medium rounded-[8px] h-7 px-2.5 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Image
                        src="/properties/figma_icons/google_maps.svg"
                        alt="Google"
                        width={11}
                        height={11}
                        className="w-2.5 h-2.5 brightness-0 invert"
                      />
                      <span>خرائط Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapMode((prev) => (prev === "static" ? "satellite" : "static"))}
                      className="bg-[#EBEFE6] hover:bg-[#DFE5D9] text-[#454840] text-[11px] font-medium rounded-[8px] h-7 px-2.5 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Image
                        src="/properties/figma_icons/satellite.svg"
                        alt="قمر صناعي"
                        width={11}
                        height={11}
                        className="w-2.5 h-2.5"
                      />
                      <span>{mapMode === "static" ? "قمر صناعي" : "خريطة شوارع"}</span>
                    </button>
                  </div>

                  {/* Right in RTL: Coordinates & Zone */}
                  <div className="flex items-center gap-3 text-xs flex-wrap justify-end text-right">
                    <span className="text-[13px] font-normal text-[#454840]">
                      المنطقة الوسطى · نطاق أمانة منطقة الرياض
                    </span>
                    <span className="w-1 h-3 rounded bg-[#C5C8BD]" />
                    <span className="text-xs font-bold text-[#454840]" dir="ltr">
                      24.7136° N, 46.6753° E
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-[#181D17]">الإحداثيات:</span>
                      <Image
                        src="/properties/figma_icons/coords_pin.svg"
                        alt="إحداثيات"
                        width={13}
                        height={13}
                        className="w-3.5 h-3.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* LEFT COLUMN (4 COLS): DESCRIPTION & STATUS (Node 1:326) */}
          {/* ====================================================== */}
          <div className="lg:col-span-4 space-y-6">
            {/* ---------------------------------------------------- */}
            {/* SECTION 4: بيانات إضافية (Figma Node 1:327)          */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3 justify-end text-right">
                <div>
                  <h2 className="text-lg font-bold text-[#181D17] leading-[28px]">
                    بيانات إضافية
                  </h2>
                  <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                    معلومات تسويقية وتفاصيل تشغيلية
                  </p>
                </div>
                <div className="w-10 h-10 rounded-[12px] bg-[#EBEFE6] flex items-center justify-center shrink-0">
                  <Image
                    src="/properties/figma_icons/additional_info.svg"
                    alt="بيانات إضافية"
                    width={17}
                    height={11}
                    className="w-4 h-3"
                  />
                </div>
              </div>

              {/* Field: وصف العقار */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-right">
                  <span className="text-[11px] font-medium text-[#75786F]">اختياري</span>
                  <label className="text-sm font-semibold text-[#181D17]">وصف العقار</label>
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="أدخل وصف العقار..."
                  className="w-full bg-[#F1F5EB] focus:bg-white border border-[#E0E5D8]/70 focus:border-[#34422A] rounded-[12px] p-3.5 text-sm text-[#181D17] leading-relaxed text-right focus:outline-none transition-all"
                />
              </div>

              {/* Sub-card: إعداد الوحدات الفردية */}
              <div className="bg-[rgba(235,239,230,0.5)] rounded-[12px] p-3.5 flex gap-3 items-start border border-[#E8EDE2]/60 text-right">
                <div className="space-y-1">
                  <h4 className="text-[11px] font-semibold text-[#181D17] leading-[16px]">
                    إعداد الوحدات الفردية
                  </h4>
                  <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                    سيتم إنشاء وترقيم الوحدات الفردية (شقق، أجنحة، مكاتب) ومساحاتها وأسعار عقودها فور الانتهاء من حفظ العقار.
                  </p>
                </div>
                <div className="shrink-0 mt-0.5">
                  <Image
                    src="/properties/figma_icons/units_notice.svg"
                    alt="إعداد الوحدات"
                    width={14}
                    height={20}
                    className="w-3.5 h-5"
                  />
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SECTION 5: الحالة التشغيلية (Figma Node 1:354)       */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3 justify-end text-right">
                <div>
                  <h2 className="text-lg font-bold text-[#181D17] leading-[28px]">
                    الحالة التشغيلية
                  </h2>
                  <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                    تحديد إمكانية التسكين والظهور
                  </p>
                </div>
                <div className="w-10 h-10 rounded-[12px] bg-[#EBEFE6] flex items-center justify-center shrink-0">
                  <Image
                    src="/properties/figma_icons/status_header.svg"
                    alt="الحالة"
                    width={20}
                    height={11}
                    className="w-5 h-3"
                  />
                </div>
              </div>

              {/* Radio Cards */}
              <div className="space-y-3">
                {/* Option 1: عقار نشط (موصى به) */}
                <div
                  onClick={() => setOperationalStatus("active")}
                  className={cn(
                    "rounded-[12px] p-3.5 flex items-start justify-between cursor-pointer select-none transition-all",
                    operationalStatus === "active"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422A]/20"
                      : "bg-[#F1F5EB] border border-transparent hover:bg-[#EAEFE4]"
                  )}
                >
                  {/* Radio Indicator on Left */}
                  <div className="w-[13px] h-[13px] rounded-full border border-[#34422A] bg-white flex items-center justify-center shrink-0 mt-1">
                    {operationalStatus === "active" && (
                      <div className="w-[7.8px] h-[7.8px] rounded-full bg-[#34422A]" />
                    )}
                  </div>

                  {/* Content on Right */}
                  <div className="space-y-0.5 text-right pr-2">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-sm font-semibold text-[#181D17]">
                        عقار نشط (موصى به)
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#059669] shrink-0" />
                    </div>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      جاهز للإدراج الفوري، قبول العقود، وربط المستأجرين والوحدات بالنظام.
                    </p>
                  </div>
                </div>

                {/* Option 2: غير نشط (قيد التجهيز) */}
                <div
                  onClick={() => setOperationalStatus("inactive")}
                  className={cn(
                    "rounded-[12px] p-3.5 flex items-start justify-between cursor-pointer select-none transition-all",
                    operationalStatus === "inactive"
                      ? "bg-[rgba(216,232,203,0.3)] border border-[#34422A]/20"
                      : "bg-[#F1F5EB] border border-transparent hover:bg-[#EAEFE4]"
                  )}
                >
                  {/* Radio Indicator on Left */}
                  <div className="w-[13px] h-[13px] rounded-full border border-[#767676] bg-white flex items-center justify-center shrink-0 mt-1">
                    {operationalStatus === "inactive" && (
                      <div className="w-[7.8px] h-[7.8px] rounded-full bg-[#34422A]" />
                    )}
                  </div>

                  {/* Content on Right */}
                  <div className="space-y-0.5 text-right pr-2">
                    <span className="text-sm font-semibold text-[#181D17]">
                      غير نشط (قيد التجهيز)
                    </span>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      يُحفظ كمسودة أولية معطلة عن العمليات المالية لحين اكتمال أوراق التراخيص.
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Audit Stamp Box */}
              <div className="bg-[rgba(235,239,230,0.6)] rounded-[12px] p-3.5 space-y-1.5 border border-[#E8EDE2]/60 text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-[11px] font-semibold text-[#181D17]">
                    توثيق سجل العمليات الإدارية (Audit Trail)
                  </span>
                  <Image
                    src="/properties/figma_icons/audit_shield.svg"
                    alt="توثيق"
                    width={11}
                    height={13}
                    className="w-3 h-3.5"
                  />
                </div>
                <div className="text-[13px] leading-[21.13px] space-y-0.5">
                  <div>
                    <span className="text-[#454840]">المشرف المنفذ: </span>
                    <span className="font-semibold text-[#181D17]">محمد أحمد</span>
                    <span className="text-[#454840]"> (مدير المنصة).</span>
                  </div>
                  <div className="text-[#454840]">
                    سيتم تسجيل وقت الإضافة والبصمة الرقمية للنظام تلقائياً.
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* SECTION 6: سعة المحفظة الحالية للمالك (Node 1:397)   */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white rounded-[16px] p-6 space-y-3">
              <div className="flex items-center justify-between text-right">
                <span className="text-lg font-bold text-[#34422A]">6 عقارات</span>
                <span className="text-[11px] font-medium text-[#454840]">
                  سعة المحفظة الحالية للمالك
                </span>
              </div>

              {/* Progress Bar */}
              <div className="bg-[#E5EAE0] h-2 rounded-full overflow-hidden">
                <div className="bg-[#34422A] h-full rounded-full w-[70%]" />
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium text-[#75786F] text-right">
                <span>باقة أعمال غير محدودة</span>
                <span>المستخدم: 70% من باقة المحفظة</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STICKY BOTTOM ACTIONS BAR (Figma Node 1:410)             */}
        {/* ======================================================== */}
        <FloatingConfirmationBar
          className="rounded-[16px] shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.06)] border border-[#E2E6DC]"
          rightContent={
            <div className="flex items-center gap-3 text-right">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
              <span className="text-[13px] font-normal text-[#454840]">
                جميع الحقول الأساسية مكتملة وجاهزة للاعتماد في النظام المركزي.
              </span>
            </div>
          }
        >
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/properties/"
              className="bg-[#F1F5EB] hover:bg-[#E5EAE0] text-[#181D17] text-sm font-semibold rounded-[12px] h-11 px-6 flex items-center justify-center transition-colors"
            >
              إلغاء
            </Link>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(undefined, true)}
              className="bg-[#D8E8CB] hover:bg-[#CADDC0] text-[#5A6952] text-sm font-semibold rounded-[12px] h-11 px-5 flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Image
                src="/properties/figma_icons/continue_arrow.svg"
                alt="متابعة"
                width={12}
                height={12}
                className="w-3 h-3"
              />
              <span>حفظ ومتابعة لإضافة الوحدات</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#34422A] hover:bg-[#283520] text-white text-sm font-semibold rounded-[12px] h-11 px-7 flex items-center gap-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "جاري الحفظ..." : "حفظ العقار"}</span>
              <Image
                src="/properties/figma_icons/save_check.svg"
                alt="حفظ"
                width={16}
                height={16}
                className="w-4 h-4 brightness-0 invert"
              />
            </button>
          </div>
        </FloatingConfirmationBar>
      </form>

      {/* Add Owner Modal for creating a new owner */}
      <AddOwnerModal
        isOpen={isAddOwnerModalOpen}
        onClose={() => setIsAddOwnerModalOpen(false)}
        onSuccess={(newOwner) => {
          setOwners((prev) => [newOwner, ...prev]);
          setSelectedOwnerId(newOwner.id);
          setIsOwnerDropdownOpen(false);
          toast.success(`تم اختيار المالك ${newOwner.name} بنجاح`);
        }}
      />
    </>
  );
}
