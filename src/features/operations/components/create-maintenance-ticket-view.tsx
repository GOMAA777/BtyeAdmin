"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { BackButton } from "@/components/shared/back-button";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import { useAppDataStore } from "@/stores/use-app-data-store";
import { operationsService } from "@/services/operations-service";

interface AttachedFile {
  name: string;
  size: string;
  thumbnailUrl: string;
}

const CATEGORY_OPTIONS = [
  "أقفال ومداخل إلكترونية",
  "تكييف وتبريد",
  "سباكة وصرف صحي",
  "كهرباء وإنارة",
  "أثاث وديكور",
];

const IMPACT_OPTIONS = [
  "تعطيل وصول النزيل كلياً",
  "تأثير جزئي على إقامة النزيل",
  "عطل جمالي لا يؤثر على التشغيل",
];

export function CreateMaintenanceTicketView() {
  const router = useRouter();
  const confirm = useConfirm();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { owners, properties, units, team } = useAppDataStore();

  // Form states starting empty with validation
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [category, setCategory] = useState("");
  const [impactScope, setImpactScope] = useState("");
  const [priority, setPriority] = useState<"urgent" | "high" | "med" | "low">("urgent");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [timeWindow, setTimeWindow] = useState("اليوم — الفترة الصباحية (خلال 90 دقيقة)");

  // Attached files
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ownerOptions = owners.map((o) => ({ value: o.name, label: o.name }));
  const propertyOptions = properties.map((p) => ({ value: p.title, label: p.title }));
  const unitOptions = units
    .filter((u) => !selectedProperty || u.propertyName === selectedProperty)
    .map((u) => ({ value: `الوحدة ${u.unitNumber} (${u.floor})`, label: `الوحدة ${u.unitNumber} (${u.floor})` }));

  const assigneeOptions = team
    .filter((m) => m.role === "maintenance" || m.role === "supervisor")
    .map((m) => ({ value: m.name, label: `${m.name} (${m.roleLabel})` }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProperty) {
      toast.error("يرجى اختيار العقار المستضاف أولاً");
      return;
    }
    if (!selectedUnit) {
      toast.error("يرجى تحديد الوحدة");
      return;
    }
    if (!category) {
      toast.error("يرجى تحديد فئة العطل الفني");
      return;
    }

    const ok = await confirm({
      title: "تأكيد إنشاء بلاغ الصيانة",
      message: `هل أنت متأكد من إنشاء بلاغ الصيانة لـ (${selectedUnit})؟ سيتم حظر الوحدة آلياً وإخطار الفريق الفني.`,
      confirmLabel: "تأكيد وبدء البلاغ",
      variant: "default",
    });
    if (!ok) return;

    try {
      setIsSubmitting(true);
      const propObj = properties.find((p) => p.title === selectedProperty);
      const unitObj = units.find((u) => selectedUnit.includes(u.unitNumber));

      const created = await operationsService.create({
        title: `صيانة: ${category}`,
        type: "maintenance",
        propertyId: propObj?.id || "prop-1",
        propertyName: selectedProperty,
        unitId: unitObj?.id || "unit-1",
        unitNumber: unitObj?.unitNumber || selectedUnit,
        priority: priority === "urgent" ? "urgent" : priority === "high" ? "high" : "medium",
        assigneeName: assignee,
        notes: description,
        ownerName: selectedOwner,
      });

      toast.success(`تم إنشاء بلاغ الصيانة ${created.taskNumber || created.id} بنجاح!`);
      router.push("/operations/");
    } catch {
      toast.error("حدث خطأ أثناء حفظ بلاغ الصيانة");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveFile = async (fileName: string) => {
    const ok = await confirm({
      title: "تأكيد حذف الملف المرفق",
      message: `هل أنت متأكد من رغبتك في حذف الملف "${fileName}" من مرفقات البلاغ؟`,
      confirmLabel: "حذف الملف",
      variant: "destructive",
    });
    if (!ok) return;

    setFiles((prev) => prev.filter((f) => f.name !== fileName));
    toast.info(`تم حذف الملف ${fileName}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const uploadedFile = e.target.files[0];
    const sizeInMB = (uploadedFile.size / (1024 * 1024)).toFixed(1);
    const sizeFormatted = `${sizeInMB} MB`;

    const newAttachedFile: AttachedFile = {
      name: uploadedFile.name,
      size: sizeFormatted,
      thumbnailUrl: "/images/operations/new-maintenance/lock_panel_thumb.png",
    };

    setFiles((prev) => [...prev, newAttachedFile]);
    toast.success(`تم إرفاق الملف ${uploadedFile.name} بنجاح`);
    e.target.value = "";
  };

  return (
    <div className="space-y-[24px] font-cairo" dir="rtl">
      {/* PAGE HEADER BAR - Matches Figma Node 1:20246 */}
      <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-[12px]">
          <BackButton
            fallbackHref="/operations/"
            aria-label="العودة لجدول العمليات"
            className="w-8 h-8 rounded-[10px] bg-[#f1f5eb] hover:bg-[#e4ebdc] flex items-center justify-center text-[#34422a] transition-colors shrink-0"
          />
          <div>
            <h1 className="text-[24px] font-semibold text-[#181d17] tracking-[-0.6px] leading-[34px]">
              إنشاء بلاغ صيانة جديد
            </h1>
            <p className="text-[14px] font-normal text-[#454840] leading-[22px] mt-1">
              تسجيل عطل تشغيلي أو بلاغ صيانة ميداني لربطه بالأصل العقاري وجدولته فورياً وفق بروتوكولات الحوكمة.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid Form Structure - Matches Figma Node 1:20252 */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
          {/* Primary Form Stream (Cols: 8) - Matches Figma Node 1:20253 */}
          <div className="lg:col-span-8 flex flex-col gap-[24px]">
            {/* SECTION A: Target Real Estate Asset Hierarchy - Node 1:20254 */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              {/* Section Header */}
              <div className="flex items-center gap-[8px]">
                <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_sec_a_asset.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="size-[18px]"
                  />
                </div>
                <h2 className="text-[18px] font-semibold text-[#181d17] leading-[28px]">
                  الأصل العقاري المستهدف
                </h2>
              </div>

              {/* 3 Select Dropdowns Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
                {/* 1. Owner Select */}
                <div className="flex flex-col gap-[6px]">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>المالك المسجل</span>
                  </label>
                  <SelectDropdown
                    value={selectedOwner}
                    onChange={(val) => setSelectedOwner(val)}
                    options={ownerOptions}
                    placeholder="اختر المالك..."
                    triggerClassName="h-[44px] rounded-[12px] bg-[#f1f5eb]"
                  />
                </div>

                {/* 2. Property Select */}
                <div className="flex flex-col gap-[6px]">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>العقار المستضاف</span>
                  </label>
                  <SelectDropdown
                    value={selectedProperty}
                    onChange={(val) => setSelectedProperty(val)}
                    options={propertyOptions}
                    placeholder="اختر العقار..."
                    triggerClassName="h-[44px] rounded-[12px] bg-[#f1f5eb]"
                  />
                </div>

                {/* 3. Unit Select */}
                <div className="flex flex-col gap-[6px]">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>الوحدة المحددة</span>
                  </label>
                  <SelectDropdown
                    value={selectedUnit}
                    onChange={(val) => setSelectedUnit(val)}
                    options={unitOptions}
                    placeholder="اختر الوحدة..."
                    triggerClassName="h-[44px] rounded-[12px] bg-[#f1f5eb]"
                  />
                </div>
              </div>

              {/* Selected Asset Teardown Strip - Node 1:20301 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Right side in RTL: Icon + Unit title & sub */}
                <div className="flex items-center gap-[16px]">
                  <div className="size-[40px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                    <Image
                      src="/icons/maintenance/new-ticket/icon_unit_teardown.svg"
                      alt=""
                      width={16.5}
                      height={16.5}
                    />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#181d17] leading-[20px]">
                      الوحدة 305 (جناح عائلي تنفيذي - 3 غرف نوم)
                    </h3>
                    <p className="text-[13px] font-normal text-[#454840] leading-[20px]">
                      عقد الاستثمار النشط: #CON-9022 • نوع التشغيل: إيجار موسمي
                    </p>
                  </div>
                </div>

                {/* Left side in RTL: Insurance Badge */}
                <div className="bg-white rounded-[8px] px-[8px] py-[4px] flex items-center gap-[4px] shrink-0 self-start sm:self-auto">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_insurance_shield.svg"
                    alt=""
                    width={12}
                    height={15}
                  />
                  <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    الوثيقة التأمينية سارية
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION B: Classification & Priority - Node 1:20316 */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[20px]">
              {/* Section Header */}
              <div className="flex items-center gap-[8px]">
                <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_sec_b_classify.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                </div>
                <h2 className="text-[18px] font-semibold text-[#181d17] leading-[28px]">
                  تصنيف وطبيعة البلاغ التشغيلي
                </h2>
              </div>

              {/* 2 Fields: Category & Field Impact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                {/* Problem Category */}
                <div className="flex flex-col gap-[6px]">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>فئة العطل الفني</span>
                  </label>
                  <SelectDropdown
                    value={category}
                    onChange={(val) => setCategory(val)}
                    options={CATEGORY_OPTIONS}
                    placeholder="اختر فئة العطل..."
                    triggerClassName="h-[44px] rounded-[12px] bg-[#f1f5eb]"
                  />
                </div>

                {/* Field Impact */}
                <div className="flex flex-col gap-[6px]">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>نطاق التأثير الميداني</span>
                  </label>
                  <SelectDropdown
                    value={impactScope}
                    onChange={(val) => setImpactScope(val)}
                    options={IMPACT_OPTIONS}
                    placeholder="اختر نطاق التأثير..."
                    triggerClassName="h-[44px] rounded-[12px] bg-[#f1f5eb]"
                  />
                  <p className="text-[11px] font-medium text-[#454840] leading-[16px] text-right">
                    يتم بناءً عليه تحديد مهلة الاستجابة المتوقعة (SLA)
                  </p>
                </div>
              </div>

              {/* Priority Selector (Segmented Radio) - Node 1:20354 */}
              <div className="flex flex-col gap-[8px] pt-[4px]">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>درجة الأولوية وزمن الاستجابة</span>
                  </label>

                  <div className="flex items-center gap-[4px] text-[#ba1a1a]">
                    <Image
                      src="/icons/maintenance/new-ticket/icon_bell_alert.svg"
                      alt=""
                      width={13.3}
                      height={13.4}
                    />
                    <span className="text-[11px] font-semibold leading-[16px]">
                      يوجد حجز استلام مجدول خلال أقل من 24 ساعة
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[8px]">
                  {/* Urgent / عاجلة وفورية */}
                  <button
                    type="button"
                    onClick={() => setPriority("urgent")}
                    className={`rounded-[12px] p-[8px] flex flex-col items-center justify-center gap-[4px] cursor-pointer transition-colors ${
                      priority === "urgent"
                        ? "bg-[#ffdad6] ring-1 ring-[#93000a]/20"
                        : "bg-[#f1f5eb] hover:bg-[#e4ebdc]"
                    }`}
                  >
                    <div className="flex items-center gap-[4px]">
                      <Image
                        src="/icons/maintenance/new-ticket/icon_urgent_sparkle.svg"
                        alt=""
                        width={11.5}
                        height={12}
                      />
                      <span
                        className={`text-[12px] font-bold leading-[18px] ${
                          priority === "urgent" ? "text-[#93000a]" : "text-[#181d17]"
                        }`}
                      >
                        عاجلة وفورية
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-semibold leading-[16px] ${
                        priority === "urgent" ? "text-[#93000a]" : "text-[#54624c]"
                      }`}
                    >
                      استجابة فورية (&lt; 2 ساعة)
                    </span>
                  </button>

                  {/* High / عالية */}
                  <button
                    type="button"
                    onClick={() => setPriority("high")}
                    className={`rounded-[12px] p-[8px] flex flex-col items-center justify-center gap-[4px] cursor-pointer transition-colors ${
                      priority === "high"
                        ? "bg-[#ffdad6] ring-1 ring-[#93000a]/20"
                        : "bg-[#f1f5eb] hover:bg-[#e4ebdc]"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-semibold leading-[18px] ${
                        priority === "high" ? "text-[#93000a] font-bold" : "text-[#181d17]"
                      }`}
                    >
                      عالية (High)
                    </span>
                    <span
                      className={`text-[11px] font-medium leading-[16px] ${
                        priority === "high" ? "text-[#93000a] font-semibold" : "text-[#54624c]"
                      }`}
                    >
                      خلال 8 ساعات
                    </span>
                  </button>

                  {/* Medium / متوسطة */}
                  <button
                    type="button"
                    onClick={() => setPriority("med")}
                    className={`rounded-[12px] p-[8px] flex flex-col items-center justify-center gap-[4px] cursor-pointer transition-colors ${
                      priority === "med"
                        ? "bg-[#ffdad6] ring-1 ring-[#93000a]/20"
                        : "bg-[#f1f5eb] hover:bg-[#e4ebdc]"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-semibold leading-[18px] ${
                        priority === "med" ? "text-[#93000a] font-bold" : "text-[#181d17]"
                      }`}
                    >
                      متوسطة (Med)
                    </span>
                    <span
                      className={`text-[11px] font-medium leading-[16px] ${
                        priority === "med" ? "text-[#93000a] font-semibold" : "text-[#75786f]"
                      }`}
                    >
                      خلال 24 ساعة
                    </span>
                  </button>

                  {/* Low / عادية */}
                  <button
                    type="button"
                    onClick={() => setPriority("low")}
                    className={`rounded-[12px] p-[8px] flex flex-col items-center justify-center gap-[4px] cursor-pointer transition-colors ${
                      priority === "low"
                        ? "bg-[#ffdad6] ring-1 ring-[#93000a]/20"
                        : "bg-[#f1f5eb] hover:bg-[#e4ebdc]"
                    }`}
                  >
                    <span
                      className={`text-[12px] font-semibold leading-[18px] ${
                        priority === "low" ? "text-[#93000a] font-bold" : "text-[#181d17]"
                      }`}
                    >
                      عادية (Low)
                    </span>
                    <span
                      className={`text-[11px] font-medium leading-[16px] ${
                        priority === "low" ? "text-[#93000a] font-semibold" : "text-[#75786f]"
                      }`}
                    >
                      خلال 48 ساعة
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION C: Operational Details & Assignment - Node 1:20389 */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[20px]">
              {/* Section Header */}
              <div className="flex items-center gap-[8px]">
                <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_sec_c_description.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                </div>
                <h2 className="text-[18px] font-semibold text-[#181d17] leading-[28px]">
                  التفاصيل والوصف الفني للخلل
                </h2>
              </div>

              {/* Problem Description Field */}
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>وصف المشكلة بدقة والأعراض الميدانية</span>
                  </label>
                  <span className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                    {description.length} / 500 حرف
                  </span>
                </div>
                <textarea
                  value={description}
                  maxLength={500}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-[#f1f5eb] rounded-[12px] p-[16px] text-[14px] leading-[22px] font-normal text-[#181d17] focus:outline-none focus:ring-1 focus:ring-[#34422a] border-0 resize-y min-h-[92px]"
                />
              </div>

              {/* Responsible Assignee & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                {/* Assignee */}
                <div className="flex flex-col gap-[6px]">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span>المسؤول المكلف بالمتابعة والمعالجة</span>
                    <span className="text-[#454840] font-normal">(اختياري)</span>
                  </label>
                  <SelectDropdown
                    value={assignee}
                    onChange={(val) => setAssignee(val)}
                    options={assigneeOptions}
                    placeholder="اختر الفني المسؤول..."
                    triggerClassName="h-[44px] rounded-[12px] bg-[#f1f5eb]"
                  />
                  <p className="text-[11px] font-medium text-[#54624c] leading-[16px] text-right">
                    إرسال إشعار فوري إلى تطبيق الفني الميداني
                  </p>
                </div>

                {/* Time Window */}
                <div className="flex flex-col gap-[6px]">
                  <label className="flex items-center gap-[4px] text-[12px] font-semibold text-[#181d17] leading-[18px]">
                    <span className="text-[#ba1a1a]">*</span>
                    <span>نافذة الزيارة الفنية المتاحة</span>
                  </label>
                  <div className="bg-[#f1f5eb] h-[44px] rounded-[12px] px-[16px] flex items-center justify-between text-[14px] font-normal text-[#181d17] leading-[22px]">
                    <div className="flex items-center gap-[8px]">
                      <Image
                        src="/icons/maintenance/new-ticket/icon_calendar.svg"
                        alt=""
                        width={15}
                        height={16.7}
                      />
                      <span>{timeWindow}</span>
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-[#454840] leading-[16px] text-right">
                    تم التنسيق مع أمن مجمع برج الياسمين للتصاريح
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION D: Attachments & Media Documentation - Node 1:20437 */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[20px]">
              {/* Section Header */}
              <div className="flex items-center gap-[8px]">
                <div className="size-[32px] rounded-[8px] bg-[#ebefe6] flex items-center justify-center shrink-0">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_sec_d_attachments.svg"
                    alt=""
                    width={20}
                    height={12.5}
                  />
                </div>
                <h2 className="text-[18px] font-semibold text-[#181d17] leading-[28px]">
                  المرفقات وتوثيق المعاينة الميدانية
                </h2>
              </div>

              {/* Dropzone Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#f1f5eb] rounded-[16px] p-[24px] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#ebefe6] transition-colors border border-dashed border-[#c5c8bd]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/png,image/jpeg,image/heic,application/pdf"
                />
                <div className="size-[48px] rounded-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-center mb-[8px]">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_cloud_upload.svg"
                    alt=""
                    width={22}
                    height={16}
                  />
                </div>
                <p className="text-[14px] font-semibold text-[#181d17] leading-[20px] mb-[4px]">
                  اسحب وأفلت صور العطل أو تقرير المعاينة هنا، أو{" "}
                  <span className="text-[#34422a] font-bold underline">استعرض الملفات</span>
                </p>
                <p className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                  يدعم الامتدادات (PNG, JPG, PDF, HEIC) بحد أقصى 15MB لكل ملف
                </p>
              </div>

              {/* File Previews Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="bg-[#f1f5eb] rounded-[12px] p-[8px] flex items-center justify-between"
                  >
                    {/* File Thumbnail & Info */}
                    <div className="flex items-center gap-[8px] overflow-hidden">
                      <div className="size-[48px] rounded-[8px] overflow-hidden shrink-0 relative bg-gray-200">
                        <Image
                          src={file.thumbnailUrl}
                          alt={file.name}
                          fill
                          className="object-cover rounded-[8px]"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[12px] font-semibold text-[#181d17] leading-[18px] font-mono truncate">
                          {file.name}
                        </p>
                        <p className="text-[11px] font-medium text-[#75786f] leading-[16px]">
                          {file.size} • تم الفحص بنجاح
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.name)}
                      aria-label="حذف الملف"
                      className="p-[6px] hover:bg-black/5 rounded-[8px] transition-colors shrink-0 cursor-pointer"
                    >
                      <Image
                        src="/icons/maintenance/new-ticket/icon_file_remove.svg"
                        alt="حذف"
                        width={12}
                        height={12}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail: Governance, Telemetry & Impact Summary (Cols: 4) - Matches Figma Node 1:20480 */}
          <div className="lg:col-span-4 flex flex-col gap-[24px]">
            {/* SECTION E: System Impact & Automated Workflow Notice - Node 1:20481 */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              {/* Header */}
              <div className="flex items-center gap-[8px]">
                <Image
                  src="/icons/maintenance/new-ticket/icon_sec_e_governance.svg"
                  alt=""
                  width={20.2}
                  height={19.3}
                />
                <h3 className="text-[18px] font-semibold text-[#181d17] leading-[28px]">
                  حوكمة وأثر الإجراء البرمجي
                </h3>
              </div>

              {/* Impact Items Box */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[16px] flex flex-col gap-[12px]">
                {/* Item 1: Ticket Generated */}
                <div className="flex items-start gap-[8px]">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_gov_ticket.svg"
                    alt=""
                    width={15}
                    height={14}
                    className="mt-[3px] shrink-0"
                  />
                  <p className="text-[13px] leading-[21.13px] text-[#181d17]">
                    <strong className="font-bold">توليد تذكرة رسمية:</strong> تتحول حالة البلاغ فوراً إلى «بلاغ صيانة» برقم تذكرة آلي موثق (
                    <strong className="font-bold text-[#34422a]">MT-2048</strong>
                    )
                  </p>
                </div>

                {/* Item 2: Lock Unit */}
                <div className="flex items-start gap-[8px]">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_gov_lock.svg"
                    alt=""
                    width={15}
                    height={17}
                    className="mt-[3px] shrink-0"
                  />
                  <p className="text-[13px] leading-[21.13px] text-[#181d17]">
                    <strong className="font-bold">حظر الوحدة آلياً:</strong> تتحول حالة <strong className="font-bold">الوحدة 305</strong> تلقائياً من «متاحة» إلى «تحت الصيانة» ويتم حظرها برمجياً من كافة محركات الحجز والقنوات المتصلة (OTAs).
                  </p>
                </div>

                {/* Item 3: Audit Log */}
                <div className="flex items-start gap-[8px]">
                  <Image
                    src="/icons/maintenance/new-ticket/icon_gov_audit.svg"
                    alt=""
                    width={14.6}
                    height={14}
                    className="mt-[3px] shrink-0"
                  />
                  <p className="text-[13px] leading-[21.13px] text-[#181d17]">
                    <strong className="font-bold">سجل التدقيق المؤسسي:</strong> إدراج قيد رسمي غير قابل للإلغاء في سجل نشاط العقار موثقاً باسم مدير المنصة المركزية (<strong className="font-bold">محمد أحمد</strong>)
                  </p>
                </div>
              </div>

              {/* Progress: Automation Readiness */}
              <div className="flex flex-col gap-[4px] pt-[4px]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-[#454840]">مدى جاهزية الإجراء للأتمتة</span>
                  <span className="font-bold text-[#34422a]">100%</span>
                </div>
                <div className="bg-[#ebefe6] h-[8px] rounded-full overflow-hidden w-full">
                  <div className="bg-[#34422a] h-full w-full rounded-full" />
                </div>
              </div>
            </div>

            {/* Unit Visual Context Card - Node 1:20524 */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[16px]">
              <h3 className="text-[18px] font-semibold text-[#181d17] leading-[28px]">
                معاينة الأصل المرتبط
              </h3>

              {/* Apartment Image Banner */}
              <div className="h-[144px] rounded-[12px] relative overflow-hidden flex flex-col justify-end p-[16px]">
                <Image
                  src="/images/operations/new-maintenance/unit_apartment_hero.png"
                  alt="برج الياسمين الفاخر"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(52,66,42,0.85)] via-[rgba(52,66,42,0.3)] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <h4 className="text-[14px] font-bold text-white leading-[20px]">
                    برج الياسمين الفاخر
                  </h4>
                  <p className="text-[13px] font-normal text-[#d8e8c7] leading-[20px] opacity-90">
                    شقة 305 • حي الملقا، الرياض
                  </p>
                </div>
              </div>

              {/* Next Guest & Lock Code Boxes */}
              <div className="grid grid-cols-2 gap-[8px] pt-[4px]">
                {/* Next Guest */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-[8px] flex flex-col items-start gap-[2px]">
                  <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    النزيل القادم
                  </span>
                  <span className="text-[14px] font-semibold text-[#181d17] leading-[20px] truncate w-full">
                    سلطان الدوسري
                  </span>
                  <span className="text-[11px] font-medium text-[#54624c] leading-[16px]">
                    غداً، 03:00 م
                  </span>
                </div>

                {/* Current Lock Code */}
                <div className="bg-[#f1f5eb] rounded-[12px] p-[8px] flex flex-col items-start gap-[2px]">
                  <span className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    رمز القفل الحالي
                  </span>
                  <span className="text-[14px] font-bold text-[#181d17] tracking-[0.7px] font-mono leading-[20px]">
                    #6629*
                  </span>
                  <span className="text-[11px] font-semibold text-[#ba1a1a] leading-[16px]">
                    غير متجاوب
                  </span>
                </div>
              </div>

              {/* Direct Contact with Property Manager */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-[8px] flex items-center gap-[8px]">
                <Image
                  src="/icons/maintenance/new-ticket/icon_phone_contact.svg"
                  alt=""
                  width={20}
                  height={15}
                  className="shrink-0"
                />
                <div>
                  <p className="text-[11px] font-medium text-[#454840] leading-[16px]">
                    التواصل المباشر مع مديرة العقار
                  </p>
                  <p className="text-[12px] font-bold text-[#34422a] leading-[18px]">
                    سارة القحطاني (+966 50 123 4567)
                  </p>
                </div>
              </div>
            </div>

            {/* Action Confirmation Bar (Sticky on Desktop) - Node 1:20558 */}
            <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[24px] flex flex-col gap-[8px] lg:sticky lg:top-[90px]">
              {/* Primary Submit Button */}
              <button
                type="submit"
                className="bg-[#34422a] hover:bg-[#2b3723] text-white h-[48px] rounded-[12px] w-full flex items-center justify-center gap-[8px] text-[14px] font-semibold shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-colors cursor-pointer"
              >
                <span>إنشاء البلاغ وتثبيت الحالة</span>
                <Image
                  src="/icons/maintenance/new-ticket/icon_confirm_check.svg"
                  alt=""
                  width={16.7}
                  height={16.7}
                />
              </button>

              {/* Secondary Cancel Button */}
              <BackButton
                fallbackHref="/operations/"
                className="bg-[#f1f5eb] hover:bg-[#e4ebdc] text-[#181d17] h-[44px] rounded-[12px] w-full flex items-center justify-center gap-[8px] text-[14px] font-semibold transition-colors cursor-pointer"
              >
                <span>إلغاء والعودة لجدول البلاغات</span>
                <Image
                  src="/icons/maintenance/new-ticket/icon_cancel_arrow.svg"
                  alt=""
                  width={12}
                  height={12}
                />
              </BackButton>

              {/* Disclaimer */}
              <p className="text-[11px] font-medium text-[#75786f] text-center leading-[16px] pt-[4px]">
                بالضغط على &quot;إنشاء البلاغ&quot;، يتم تفويض وتوثيق أمر العمل فورياً وفق السياسات الإجرائية.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
