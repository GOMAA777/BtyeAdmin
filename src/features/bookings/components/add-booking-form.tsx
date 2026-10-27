"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveAssetUrl } from "@/lib/constants";
import {
  Copy,
  Receipt,
  CheckCircle2,
  Clock,
  Lock,
  Building2,
  User,
  ChevronDown,
  DoorClosed,
  AlertTriangle,
  Calendar,
  Plane,
  Plus,
  Minus,
  Users,
  Phone,
  Mail,
  Key,
  StickyNote,
  ExternalLink,
  UserSearch,
  Smartphone,
  Banknote,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { FloatingConfirmationBar } from "@/components/shared/floating-confirmation-bar";
import { DatePicker } from "@/components/shared/date-picker";
import { TimePicker } from "@/components/shared/time-picker";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import { bookingsService } from "@/services/bookings-service";
import { propertiesService } from "@/services/properties-service";
import { unitsService } from "@/services/units-service";
import { ownersService } from "@/services/owners-service";
import type { Property } from "@/features/properties/types";
import type { Unit } from "@/features/units/types";
import type { Owner } from "@/features/owners/types";

interface AddBookingFormProps {
  onSuccess: () => void;
}

export function AddBookingForm({ onSuccess }: AddBookingFormProps) {
  const confirm = useConfirm();

  // Entities state from services
  const [properties, setProperties] = useState<Property[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Guest Steppers State
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Form Fields State (starts empty for user entry)
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState("2026-10-27");
  const [checkInTime, setCheckInTime] = useState("15:00");
  const [checkOutDate, setCheckOutDate] = useState("2026-10-28");
  const [checkOutTime, setCheckOutTime] = useState("12:00");
  const [notes, setNotes] = useState("");

  const loadData = useCallback(async () => {
    const [pList, uList, oList] = await Promise.all([
      propertiesService.getAll(),
      unitsService.getAll(),
      ownersService.getAll(),
    ]);
    setProperties(pList);
    setUnits(uList);
    setOwners(oList);

    if (pList.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(pList[0].id);
      const firstPropUnits = uList.filter((u) => u.propertyId === pList[0].id);
      if (firstPropUnits.length > 0) {
        setSelectedUnitId(firstPropUnits[0].id);
      }
    }
  }, [selectedPropertyId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);
  const availableUnits = units.filter((u) => u.propertyId === selectedPropertyId);
  const selectedUnit = availableUnits.find((u) => u.id === selectedUnitId) || availableUnits[0];
  const matchedOwner = owners.find(
    (o) => o.id === selectedProperty?.ownerId || o.name === selectedProperty?.ownerName
  );

  const nightsCount = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    const d1 = new Date(checkInDate).getTime();
    const d2 = new Date(checkOutDate).getTime();
    if (isNaN(d1) || isNaN(d2) || d2 <= d1) return 1;
    return Math.round((d2 - d1) / (1000 * 3600 * 24));
  }, [checkInDate, checkOutDate]);

  const copyBookingCode = () => {
    navigator.clipboard.writeText("BK-10483");
    toast.success("تم نسخ رقم المعاملة: BK-10483");
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!guestName.trim()) {
      toast.error("يرجى إدخال اسم العميل");
      return;
    }
    if (!guestPhone.trim()) {
      toast.error("يرجى إدخال رقم جوال العميل");
      return;
    }
    if (!selectedPropertyId) {
      toast.error("يرجى اختيار العقار التابع");
      return;
    }
    if (!selectedUnit) {
      toast.error("يرجى اختيار الوحدة المستهدفة");
      return;
    }

    const ok = await confirm({
      title: "تأكيد اعتماد الحجز",
      message: `هل أنت متأكد من حفظ واعتماد الحجز الجديد باسم "${guestName}" للوحدة "${selectedUnit.name || selectedUnit.unitNumber}"؟`,
      confirmLabel: "حفظ واعتماد الحجز",
      variant: "default",
    });
    if (!ok) return;

    try {
      setIsSubmitting(true);
      await bookingsService.create({
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        guestEmail: guestEmail.trim(),
        propertyId: selectedProperty?.id || "",
        propertyName: selectedProperty?.title || selectedProperty?.name || "عقار غير محدد",
        unitId: selectedUnit.id,
        unitNumber: selectedUnit.unitNumber || selectedUnit.name || "101",
        unitType: String(selectedUnit.type || selectedUnit.typeLabel || "شقة كاملة"),
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
        nightsCount,
        adultsCount: adults,
        childrenCount: children,
        totalAmount: (selectedUnit.pricePerNight || 320) * nightsCount,
        notes: notes.trim(),
        status: "upcoming",
      });

      toast.success("تم اعتماد الحجز بنجاح!");
      onSuccess();
    } catch {
      toast.error("حدث خطأ أثناء حفظ الحجز");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 lg:space-y-10 pb-8" dir="rtl">
      {/* 1. Page Header Card (Matching exact user crop in media_1792324248844.png) */}
      <div className="bg-white rounded-[28px] py-7 px-8 sm:px-10 border border-[#E2E6DC] flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-2xs">
        {/* Right side: Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-[#172115] tracking-tight">
            إضافة حجز
          </h1>
          <p className="text-xs sm:text-sm text-[#7D8A78] font-normal leading-relaxed">
            إدراج عقار جديد وتعيينه لمالك مسجل في المنصة وربط التراخيص والبيانات الجغرافية بدقة.
          </p>
        </div>

        {/* Left side: Soft-tinted Sage Pill Badge (No border, rounded-2xl, matching exact design) */}
        <div className="bg-[#EAF0E6] px-5 py-3 rounded-2xl flex items-center gap-3 text-xs self-start md:self-auto shrink-0 select-none">
          <span className="text-[#556350] font-medium">رقم المعاملة التلقائي:</span>
          <span className="font-bold text-sm text-[#172115] font-mono">BK-10483</span>
          <button
            type="button"
            onClick={copyBookingCode}
            title="نسخ رقم المعاملة"
            className="text-[#556350] hover:text-[#172115] transition-colors cursor-pointer ms-1 p-0.5"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* RIGHT COLUMN (8 cols): Main Form Sections */}
        <div className="lg:col-span-8 space-y-8 lg:space-y-10 order-1">
          {/* Section 1: بيانات تخصيص الأصل العقاري */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EEF2E8] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#172115]">
                  بيانات تخصيص الأصل العقاري
                </h2>
                <p className="text-xs text-[#7D8A78] mt-0.5 font-medium">
                  حدد المالك أولا لاستعراض العقارات والوحدات المتاحة المرتبطة به
                </p>
              </div>
            </div>

            {/* Field: مالك العقار */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#172115]">
                  مالك العقار <span className="text-red-500">*</span>
                </label>
                <span className="text-[#7D8A78] font-medium">
                  مرخص برخصة فال العقارية
                </span>
              </div>

            {/* Owner Section */}
            {matchedOwner && (
              <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#D5E0CD] text-[#34432E] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    {matchedOwner.initials || matchedOwner.name.charAt(0)}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#172115]">
                        {matchedOwner.name}
                      </span>
                      <span className="bg-[#DDE5D6] text-[#34432E] text-[11px] font-bold px-2 py-0.5 rounded-md">
                        مالك معتمد
                      </span>
                    </div>
                    <div className="text-xs text-[#7D8A78] flex items-center gap-1.5 font-medium">
                      <Smartphone className="w-3.5 h-3.5 text-[#7D8A78]" />
                      <span dir="ltr">{matchedOwner.phone}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/owners/${matchedOwner.id}/`}
                  className="bg-white hover:bg-[#FAFBF9] border border-[#E2E6DC] text-xs font-bold text-[#172115] px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs self-start sm:self-auto"
                >
                  <span>عرض ملف المالك</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#7D8A78]" />
                </Link>
              </div>
            )}
            </div>

            {/* Selectors: العقار التابع & الوحدة المستهدفة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              {/* العقار التابع */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#172115] text-start">
                    العقار التابع <span className="text-red-500">*</span>
                  </label>
                  {properties.length === 0 && (
                    <Link href="/properties/new/" className="text-[11px] font-bold text-[#34422A] hover:underline">
                      + إضافة عقار
                    </Link>
                  )}
                </div>
                {properties.length === 0 ? (
                  <div className="bg-[#FFF8E6] border border-[#F3E2B8] rounded-2xl p-3 text-xs text-[#8A6300]">
                    لا توجد عقارات مسجلة حتى الآن.{" "}
                    <Link href="/properties/new/" className="underline font-bold">
                      أضف عقاراً أولاً
                    </Link>
                  </div>
                ) : (
                  <SelectDropdown
                    value={selectedPropertyId}
                    onChange={(val) => {
                      setSelectedPropertyId(val);
                      const propUnits = units.filter((u) => u.propertyId === val);
                      if (propUnits.length > 0) {
                        setSelectedUnitId(propUnits[0].id);
                      } else {
                        setSelectedUnitId("");
                      }
                    }}
                    options={properties.map((p) => ({
                      value: p.id,
                      label: `${p.title || p.name || "عقار"} (${p.city} - ${p.district})`,
                    }))}
                    placeholder="اختر العقار..."
                    triggerClassName="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-3.5 text-xs font-semibold text-[#172115]"
                  />
                )}
              </div>

              {/* الوحدة المستهدفة */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#172115] text-start">
                    الوحدة المستهدفة <span className="text-red-500">*</span>
                  </label>
                  {availableUnits.length === 0 && (
                    <Link href="/units/new/" className="text-[11px] font-bold text-[#34422A] hover:underline">
                      + إضافة وحدة
                    </Link>
                  )}
                </div>
                {availableUnits.length === 0 ? (
                  <div className="bg-[#FFF8E6] border border-[#F3E2B8] rounded-2xl p-3 text-xs text-[#8A6300]">
                    لا توجد وحدات في هذا العقار.{" "}
                    <Link href="/units/new/" className="underline font-bold">
                      أضف وحدة جديدة
                    </Link>
                  </div>
                ) : (
                  <SelectDropdown
                    value={selectedUnitId}
                    onChange={setSelectedUnitId}
                    options={availableUnits.map((u) => ({
                      value: u.id,
                      label: `${u.name || `وحدة ${u.unitNumber}`} — ${u.type || u.typeLabel || "شقة"} (${u.floor})`,
                    }))}
                    placeholder="اختر الوحدة..."
                    triggerClassName="w-full bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-3.5 text-xs font-semibold text-[#172115]"
                  />
                )}
              </div>
            </div>

            <p className="text-xs text-[#7D8A78] text-center pt-1 font-medium">
              يتم عرض الوحدات التابعة للعقار المحدد فقط وتحديث حالتها بالوقت الفعلي
            </p>

            {/* Warning Alert Banner */}
            <div className="bg-[#FFF8E6] border border-[#FDE68A] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-[#C05621] shrink-0" />
                <div className="text-xs leading-relaxed text-start">
                  <span className="font-bold text-[#7B341E]">
                    تنبيه فحص التوافر الزمني:{" "}
                  </span>
                  <span className="text-[#9C4221] font-medium">
                    الوحدة غير متاحة في بعض أيام التمديد المحتملة لوجود حجز تالٍ مؤكد.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.info("عرض الحجوزات المتعارضة: BK-10476")}
                className="bg-[#FEEBC8] hover:bg-[#FBD38D] text-[#7B341E] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
              >
                <span>عرض الحجوزات المتعارضة (BK-10476)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#7B341E]" />
              </button>
            </div>
          </div>

          {/* Section 2: بيانات الإقامة والمواعيد */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF0E6] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#2E3C29]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#172115]">
                    بيانات الإقامة والمواعيد
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5">
                    تحديد فترات تسجيل الوصول، المغادرة ومصدر الحجز الوارد
                  </p>
                </div>
              </div>

              <span className="bg-[#DCE6D5] text-[#2E3C29] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                <span>مدة الإقامة: {nightsCount} ليال</span>
              </span>
            </div>

            {/* Check-in & Check-out Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check-in Card */}
              <div className="bg-[#F4F6F0] rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                  <Plane className="w-4 h-4 text-[#2E3C29] rotate-45" />
                  <span>تاريخ ووقت الوصول (Check-in)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white rounded-xl p-2 shadow-2xs space-y-1">
                    <label className="text-[10px] text-[#7D8A78] font-bold block">التاريخ</label>
                    <DatePicker
                      value={checkInDate}
                      onChange={setCheckInDate}
                      placeholder="تاريخ الوصول..."
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-2xs space-y-1">
                    <label className="text-[10px] text-[#7D8A78] font-bold block">وقت الدخول</label>
                    <TimePicker
                      value={checkInTime}
                      onChange={setCheckInTime}
                      placeholder="وقت الدخول..."
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Check-out Card */}
              <div className="bg-[#F4F6F0] rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#172115]">
                  <Plane className="w-4 h-4 text-[#2E3C29] -rotate-45" />
                  <span>تاريخ ووقت المغادرة (Check-out)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-white rounded-xl p-2 shadow-2xs space-y-1">
                    <label className="text-[10px] text-[#7D8A78] font-bold block">التاريخ</label>
                    <DatePicker
                      value={checkOutDate}
                      onChange={setCheckOutDate}
                      placeholder="تاريخ المغادرة..."
                      className="w-full"
                    />
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-2xs space-y-1">
                    <label className="text-[10px] text-[#7D8A78] font-bold block">وقت الخروج</label>
                    <TimePicker
                      value={checkOutTime}
                      onChange={setCheckOutTime}
                      placeholder="وقت الخروج..."
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Steppers: توزيع النزلاء والمرافقين */}
            <div className="space-y-2.5 pt-1">
              <label className="block text-xs font-bold text-[#172115]">
                توزيع النزلاء والمرافقين
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. البالغون */}
                <div className="bg-[#F4F6F0] rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#172115]">البالغون</div>
                    <div className="text-[10px] text-[#7D8A78]">عمر 13 سنة وأكثر</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none shadow-2xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#172115]">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 2. الأطفال */}
                <div className="bg-[#F4F6F0] rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#172115]">الأطفال</div>
                    <div className="text-[10px] text-[#7D8A78]">من عمر 2 إلى 12 سنة</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none shadow-2xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#172115]">
                      {children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildren((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 3. الرضع */}
                <div className="bg-[#F4F6F0] rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-[#172115]">الرضع</div>
                    <div className="text-[10px] text-[#7D8A78]">أقل من عامين</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none shadow-2xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#172115]">
                      {infants}
                    </span>
                    <button
                      type="button"
                      onClick={() => setInfants((prev) => prev + 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#172115] hover:bg-[#EEF2E6] transition-colors cursor-pointer select-none shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: بيانات العميل (النزيل الرئيسي) */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF0E6] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#2E3C29]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#172115]">
                    بيانات العميل (النزيل الرئيسي)
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5">
                    معلومات الاتصال والتحقق لإرسال بيانات الدخول الرقمية
                  </p>
                </div>
              </div>

              <span className="bg-[#DCE6D5] text-[#2E7D32] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 self-start sm:self-auto">
                <span>إرسال آلي عبر WhatsApp</span>
              </span>
            </div>

            {/* Inputs: الاسم ورقم الجوال */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* اسم العميل */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172115]">
                  اسم العميل الكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#F4F6F0] rounded-xl px-4 py-3 pe-10 text-xs font-medium text-[#172115] border border-[#E0E5D8]/80 focus:bg-white focus:border-[#4B5940] focus:outline-none transition-all duration-200"
                  />
                  <User className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* رقم الجوال */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#172115]">
                  رقم الجوال النشط <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    dir="ltr"
                    className="w-full bg-[#F4F6F0] rounded-xl px-4 py-3 pe-10 text-xs font-medium text-[#172115] border border-[#E0E5D8]/80 focus:bg-white focus:border-[#4B5940] focus:outline-none transition-all duration-200 text-right"
                  />
                  <Phone className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#172115]">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  dir="ltr"
                  className="w-full bg-[#F4F6F0] rounded-xl px-4 py-3 pe-10 text-xs font-medium text-[#172115] border border-[#E0E5D8]/80 focus:bg-white focus:border-[#4B5940] focus:outline-none transition-all duration-200 text-right"
                />
                <Mail className="w-4 h-4 text-[#7D8A78] absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Smart Lock Generation Note */}
            <div className="bg-[#F4F6F0] rounded-2xl p-4 flex items-center gap-3 text-xs text-[#556350] leading-relaxed">
              <Key className="w-4 h-4 text-[#556350] shrink-0" />
              <p>
                سيتم توليد رمز القفل الذكي للباب الخارجي للوحدة 204 تلقائياً ومشاركته مع النزيل قبل موعد الوصول بـ 3 ساعات عبر رسالة نصية وقناة الواتساب الرسمية الموثقة.
              </p>
            </div>
          </div>

          {/* Section 4: ملاحظات وتشغيل داخلي */}
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-[#E2E6DC] shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#EAF0E6] flex items-center justify-center shrink-0">
                  <StickyNote className="w-5 h-5 text-[#2E3C29]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#172115]">
                    ملاحظات وتشغيل داخلي
                  </h2>
                  <p className="text-xs text-[#7D8A78] mt-0.5">
                    مخصصة لفريق الاستقبال ومديري العمليات والضيافة فقط
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-[#7D8A78] font-medium">
                لا تظهر للنزيل
              </span>
            </div>

            {/* Textarea */}
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F4F6F0] rounded-2xl p-4 text-xs text-[#172115] border border-[#E0E5D8]/80 focus:bg-white focus:border-[#4B5940] focus:outline-none leading-relaxed transition-all duration-200 resize-none"
            />
          </div>
        </div>

        {/* LEFT COLUMN (4 cols): Summary, Unit Preview & System Actions */}
        <div className="lg:col-span-4 space-y-8 lg:space-y-10 order-2">
          {/* Card 1: الدفع والرسوم */}
          <div className="bg-white rounded-[28px] p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              {/* Right in RTL: Icon + Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2E8] text-[#34432E] flex items-center justify-center shrink-0 shadow-2xs">
                  <Banknote className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#172115]">الدفع والرسوم</h3>
              </div>

              {/* Left in RTL: Currency Pill */}
              <span className="bg-[#EEF2E8] border border-[#E0E5D8]/70 text-[#7D8A78] text-[11px] font-bold px-2.5 py-1 rounded-xl">
                ريال سعودي
              </span>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[#556350] font-medium">سعر الليلة الأساسي (× 4 ليالٍ)</span>
                <span className="font-bold text-[#172115]">2,800 ر.س</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#556350] font-medium">رسوم الخدمة والنظافة المعتمدة</span>
                <span className="font-bold text-[#172115]">156 ر.س</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#556350] font-medium">ضريبة القيمة المضافة (15%)</span>
                <span className="font-bold text-[#172115]">444 ر.س</span>
              </div>
            </div>

            {/* Total Highlight Box */}
            <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div className="text-start">
                <div className="font-bold text-xs text-[#7D8A78]">
                  المبلغ الإجمالي المستحق
                </div>
                <div className="text-[11px] text-[#7D8A78] mt-0.5 font-medium">
                  شامل الضريبة والرسوم
                </div>
              </div>
              <div className="flex items-baseline gap-1 text-end">
                <span className="text-3xl font-black text-[#172115]">3,400</span>
                <span className="text-xs text-[#7D8A78] font-bold">ر.س</span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-[#E2E6DC]/70 my-3" />

            {/* Split Status Pills */}
            <div className="space-y-2.5">
              <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-3.5 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span className="font-bold text-[#10B981]">
                    المبلغ المدفوع (مسبقاً)
                  </span>
                </div>
                <span className="font-bold text-[#10B981]">1,700 ر.س</span>
              </div>

              <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-3.5 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-[#7D8A78] flex items-center justify-center">
                    <div className="flex items-center gap-[1.5px]">
                      <span className="w-[2px] h-[2px] rounded-full bg-[#7D8A78]" />
                      <span className="w-[2px] h-[2px] rounded-full bg-[#7D8A78]" />
                      <span className="w-[2px] h-[2px] rounded-full bg-[#7D8A78]" />
                    </div>
                  </div>
                  <span className="font-bold text-[#172115]">
                    المتبقي عند الوصول
                  </span>
                </div>
                <span className="font-bold text-[#172115]">1,700 ر.س</span>
              </div>
            </div>

            {/* Escrow Guarantee Note */}
            <div className="bg-[#EEF2E8] border border-[#E0E5D8]/70 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <Lock className="w-4 h-4 text-[#34432E] shrink-0" />
              <div className="text-xs leading-relaxed text-start">
                <div>
                  <span className="font-bold text-[#172115]">طريقة الاستلام: </span>
                  <span className="font-bold text-[#172115]">حساب وسيط المنصة</span>
                </div>
                <div className="text-[#7D8A78] font-medium">
                  لضمان حقوق المالك والمستأجر.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: معاينة الوحدة (Image bleeds to edges of card up to half, text padded below) */}
          <div className="bg-white rounded-[28px] border border-[#E2E6DC] shadow-2xs overflow-hidden">
            {/* Top Half: Image Preview flush to card edges */}
            <div className="relative h-60 sm:h-64 w-full bg-[#EEF2E6]">
              <Image
                src={resolveAssetUrl("/properties/suite_204_interior.webp")}
                alt="جناح تنفيذي 204"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Floating Mini Booking Modal Preview at top-right (start-3.5 in RTL) */}
              <div className="absolute top-3.5 start-3.5 w-32 sm:w-36 bg-white/95 backdrop-blur-xs rounded-xl p-2 border border-white/60 shadow-lg select-none pointer-events-none">
                <div className="text-[7.5px] font-bold text-[#172115] text-center border-b border-[#E2E6DC] pb-1 mb-1.5 leading-tight">
                  إضافة حجز - لوحة تحكم المنصة
                </div>
                <div className="space-y-1">
                  <div className="h-3.5 rounded bg-[#F0F4EC] border border-[#E0E5D8]/60 px-1 flex items-center justify-between text-[6.5px] text-[#7D8A78]">
                    <span>اسم العميل</span>
                  </div>
                  <div className="h-3.5 rounded bg-[#F0F4EC] border border-[#E0E5D8]/60 px-1 flex items-center justify-between text-[6.5px] text-[#7D8A78]">
                    <span>تاريخ الوصول</span>
                  </div>
                  <div className="h-3.5 rounded bg-[#F0F4EC] border border-[#E0E5D8]/60 px-1 flex items-center justify-between text-[6.5px] text-[#7D8A78]">
                    <span>تاريخ المغادرة</span>
                  </div>
                  <div className="h-3.5 rounded bg-[#F0F4EC] border border-[#E0E5D8]/60 px-1 flex items-center justify-between text-[6.5px] text-[#7D8A78]">
                    <span>نوع الوحدة</span>
                  </div>
                  <div className="h-3.5 rounded bg-[#F0F4EC] border border-[#E0E5D8]/60 px-1 flex items-center justify-between text-[6.5px] text-[#7D8A78]">
                    <span>السعر الإجمالي</span>
                  </div>
                </div>
                <div className="mt-1.5 bg-[#384633] text-white text-[7px] font-bold py-0.5 rounded text-center">
                  حفظ الحجز
                </div>
                <div className="text-[6px] text-[#7D8A78] text-center mt-0.5">
                  إلغاء
                </div>
              </div>

              {/* Furnished Pill Badge at bottom-left (end-3.5 in RTL) */}
              <div className="absolute bottom-3.5 end-3.5">
                <span className="bg-[#56604E]/80 backdrop-blur-xs border border-white/20 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-xs">
                  مفروشة بالكامل
                </span>
              </div>

              {/* Title & Location at bottom-right (start-3.5 in RTL) */}
              <div className="absolute bottom-3.5 start-3.5 text-white text-right">
                <div className="font-bold text-base sm:text-lg tracking-tight">
                  جناح تنفيذي 204
                </div>
                <div className="text-xs text-white/90 mt-0.5 font-normal">
                  عمارة النخيل • العليا
                </div>
              </div>
            </div>

            {/* Bottom Half: Unit Details Grid with clean padding below the image */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#7D8A78] text-sm font-normal">مساحة الوحدة:</span>
                <span className="font-bold text-[#172115] text-sm">94 م²</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7D8A78] text-sm font-normal">نوع التأجير:</span>
                <span className="font-bold text-[#172115] text-sm">يومي / قصير المدى</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7D8A78] text-sm font-normal">كود القفل الرقمي:</span>
                <span className="font-bold font-mono text-[#172115] text-sm">#9284-A</span>
              </div>
            </div>
          </div>

          {/* Card 3: إجراءات النظام الفورية بعد الحفظ */}
          <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-[#E2E6DC] shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 text-sm font-bold text-[#172115]">
              <CheckCircle2 className="w-5 h-5 text-[#172115] shrink-0" />
              <span>إجراءات النظام الفورية بعد الحفظ</span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-[13px] text-[#556350]">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                <span className="font-medium leading-relaxed">
                  تحديث حالة التقويم في Whatsapp API
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                <span className="font-medium leading-relaxed">
                  إصدار سند قبض إلكتروني بمبلغ 1,700 ر.س
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                <span className="font-medium leading-relaxed">
                  إشعار مالك العقار عبر لوحة تحكم الشركاء
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Floating Confirmation & Save Bar */}
      <FloatingConfirmationBar
        rightContent={
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shrink-0 animate-pulse" />
              <span className="font-bold text-sm text-[#172115]">
                جاهز للتأكيد والمزامنة الفورية
              </span>
            </div>
            <div className="text-xs text-[#7D8A78] mt-0.5 font-normal">
              سيتم قفل التواريخ ومزامنة الأقفال الذكية وقنوات التوزيع فور الاعتماد
            </div>
          </div>
        }
        actions={[
          {
            label: "إلغاء",
            href: "/bookings/",
            variant: "secondary",
          },
          {
            label: "حفظ كمسودة",
            onClick: () => toast.info("تم حفظ مسودة الحجز بنجاح"),
            variant: "draft",
          },
          {
            label: "حفظ واعتماد الحجز",
            onClick: () => handleSubmit(),
            variant: "primary",
            icon: CheckCircle2,
          },
        ]}
      />
    </div>
  );
}
