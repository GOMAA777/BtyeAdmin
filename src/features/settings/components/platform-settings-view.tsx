"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Home,
  Users2,
  Zap,
  Lock,
  Clock,
  Save,
  ChevronDown,
  Check,
  ShieldCheck,
  CalendarDays,
  Calendar,
  CalendarRange,
  Plus,
  Minus,
  Award,
} from "lucide-react";
import { usePlatformSettings } from "../controllers/use-platform-settings";
import { ConfirmPlatformSettingModal } from "./modals/confirm-platform-setting-modal";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function PlatformSettingsView() {
  const {
    config,
    updateField,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    handleToggleAddProperties,
    confirmDisableAddProperties,
    handleIncrementGuests,
    handleDecrementGuests,
    handleSave,
    handleReset,
  } = usePlatformSettings();

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:29917"
      data-name="إعدادات المنصة"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:29919"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            إعدادات المنصة
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            إدارة القواعد التشغيلية الموحدة والمعايير الافتراضية المطبقة على عقارات ووحدات ومحافظ
            الملاك عبر المملكة
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:29928"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* 2-Column Responsive Config Matrix (2x2 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-start">
        {/* SECTION 1: Default Properties Configuration (Right Column Top) */}
        <div
          className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6"
          data-node-id="1:29934"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-[#e5eae0] border-b pb-3">
            <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-medium text-[11px] px-2.5 py-0.5 rounded-full">
              عقارات جديدة
            </span>
            <div className="flex items-center gap-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                إعدادات العقارات الافتراضية
              </h2>
              <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Building2 className="size-5" />
              </div>
            </div>
          </div>

          {/* Setting 1: Default Property Status */}
          <div className="flex flex-col gap-2">
            <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
              الحالة الافتراضية للعقار الجديد
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Option 1: Active */}
              <div
                onClick={() => updateField("defaultPropertyStatus", "active")}
                className={`p-3.5 rounded-[12px] flex flex-col justify-between cursor-pointer transition-all drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ${
                  config.defaultPropertyStatus === "active"
                    ? "bg-[#f1f5eb] border border-[#34422a]/40"
                    : "bg-white border border-[#e5eae0] hover:border-[#c5c8bd]"
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    نشط
                  </span>
                  <div
                    className={`size-5 rounded-full flex items-center justify-center ${
                      config.defaultPropertyStatus === "active"
                        ? "bg-[#34422a] text-white"
                        : "bg-[#e5eae0]"
                    }`}
                  >
                    {config.defaultPropertyStatus === "active" && (
                      <Check className="size-3 stroke-[3]" />
                    )}
                  </div>
                </div>
                <span className="font-cairo font-medium text-[#454840] text-[11px]">
                  مفعّل فور الإدراج
                </span>
              </div>

              {/* Option 2: Draft */}
              <div
                onClick={() => updateField("defaultPropertyStatus", "draft")}
                className={`p-3.5 rounded-[12px] flex flex-col justify-between cursor-pointer transition-all drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ${
                  config.defaultPropertyStatus === "draft"
                    ? "bg-[#f1f5eb] border border-[#34422a]/40"
                    : "bg-white border border-[#e5eae0] hover:border-[#c5c8bd]"
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    مسودة
                  </span>
                  <div
                    className={`size-5 rounded-full flex items-center justify-center ${
                      config.defaultPropertyStatus === "draft"
                        ? "bg-[#34422a] text-white"
                        : "bg-[#e5eae0]"
                    }`}
                  >
                    {config.defaultPropertyStatus === "draft" && (
                      <Check className="size-3 stroke-[3]" />
                    )}
                  </div>
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  يتطلب اعتماد يدوي
                </span>
              </div>

              {/* Option 3: Review */}
              <div
                onClick={() => updateField("defaultPropertyStatus", "review")}
                className={`p-3.5 rounded-[12px] flex flex-col justify-between cursor-pointer transition-all drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] ${
                  config.defaultPropertyStatus === "review"
                    ? "bg-[#f1f5eb] border border-[#34422a]/40"
                    : "bg-white border border-[#e5eae0] hover:border-[#c5c8bd]"
                }`}
              >
                <div className="flex items-center justify-between pb-1">
                  <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    تحت المراجعة
                  </span>
                  <div
                    className={`size-5 rounded-full flex items-center justify-center ${
                      config.defaultPropertyStatus === "review"
                        ? "bg-[#34422a] text-white"
                        : "bg-[#e5eae0]"
                    }`}
                  >
                    {config.defaultPropertyStatus === "review" && (
                      <Check className="size-3 stroke-[3]" />
                    )}
                  </div>
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  تدقيق مكتبي صارم
                </span>
              </div>
            </div>
          </div>

          {/* Setting 2: Default Property Type */}
          <div className="flex flex-col gap-1.5">
            <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
              النمط المعماري والتصنيفي الافتراضي
            </label>
            <div className="relative">
              <div className="bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px] cursor-pointer">
                <span>عمارة سكنية (معتمد وموصى به للمحافظ الكبرى)</span>
                <ChevronDown className="size-4 text-[#75786f]" />
              </div>
            </div>
          </div>

          {/* Setting 3: National Address Verification Toggle */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4">
            <div className="flex gap-3 items-start">
              <div className="size-5 text-[#34422a] mt-0.5 shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                  التحقق الإلزامي من العنوان الوطني السعودي
                </span>
                <span className="font-cairo text-[#454840] text-[13px] leading-[20px] mt-0.5">
                  حظر تسجيل أي عقار دون مطابقة الرمز البريدي والرقم الإضافي مع الخرائط الوطنية الموحدة
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField("nationalAddressVerification", !config.nationalAddressVerification)
              }
              className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                config.nationalAddressVerification ? "bg-[#34422a]" : "bg-[#c5c8bd]"
              }`}
            >
              <div
                className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                  config.nationalAddressVerification ? "-translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* SECTION 2: Default Units & Pricing (Left Column Top) */}
        <div
          className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6"
          data-node-id="1:30000"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-[#e5eae0] border-b pb-3">
            <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-medium text-[11px] px-2.5 py-0.5 rounded-full">
              محددات مالية
            </span>
            <div className="flex items-center gap-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                إعدادات الوحدات والتسعير
              </h2>
              <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Home className="size-5" />
              </div>
            </div>
          </div>

          {/* Two items row: Status and Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Unit Status */}
            <div className="flex flex-col gap-1.5">
              <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                حالة الوحدة الافتراضية
              </label>
              <div className="bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between">
                <span className="font-cairo font-medium text-[#54624c] text-[11px]">
                  استقبال فوري
                </span>
                <div className="flex gap-2 items-center">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    متاحة للحجز
                  </span>
                  <span className="bg-[#34422a] rounded-full size-2.5" />
                </div>
              </div>
              <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                تتاح الوحدات على محرك الحجز تلقائياً
              </span>
            </div>

            {/* Currency */}
            <div className="flex flex-col gap-1.5">
              <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                العملة الأساسية المعتمدة
              </label>
              <div className="bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between">
                <span className="bg-[#e5eae0] text-[#454840] font-cairo font-medium text-[11px] px-2 py-0.5 rounded">
                  مقفل مركزياً
                </span>
                <div className="flex gap-2 items-center">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    ريال سعودي
                  </span>
                  <Lock className="size-3.5 text-[#75786f]" />
                </div>
              </div>
              <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                كافة التسويات المصرفية والضريبية بالريال
              </span>
            </div>
          </div>

          {/* Pricing Model Pills */}
          <div className="flex flex-col gap-1.5">
            <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
              نموذج التسعير والتعاقد الافتراضي
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Daily */}
              <button
                type="button"
                onClick={() => updateField("defaultPricingModel", "daily")}
                className={`h-11 rounded-[12px] flex items-center justify-center gap-2 font-cairo text-[14px] transition-all cursor-pointer ${
                  config.defaultPricingModel === "daily"
                    ? "bg-[#34422a] text-white font-bold drop-shadow-sm"
                    : "bg-[#f1f5eb] text-[#181d17] font-semibold hover:bg-[#e4ebdc]"
                }`}
              >
                <span>لكل ليلة (يومي)</span>
                <CalendarDays className="size-4" />
              </button>

              {/* Monthly */}
              <button
                type="button"
                onClick={() => updateField("defaultPricingModel", "monthly")}
                className={`h-11 rounded-[12px] flex items-center justify-center gap-2 font-cairo text-[14px] transition-all cursor-pointer ${
                  config.defaultPricingModel === "monthly"
                    ? "bg-[#34422a] text-white font-bold drop-shadow-sm"
                    : "bg-[#f1f5eb] text-[#181d17] font-semibold hover:bg-[#e4ebdc]"
                }`}
              >
                <span>شهري</span>
                <Calendar className="size-4" />
              </button>

              {/* Yearly */}
              <button
                type="button"
                onClick={() => updateField("defaultPricingModel", "yearly")}
                className={`h-11 rounded-[12px] flex items-center justify-center gap-2 font-cairo text-[14px] transition-all cursor-pointer ${
                  config.defaultPricingModel === "yearly"
                    ? "bg-[#34422a] text-white font-bold drop-shadow-sm"
                    : "bg-[#f1f5eb] text-[#181d17] font-semibold hover:bg-[#e4ebdc]"
                }`}
              >
                <span>سنوي (إيجار)</span>
                <CalendarRange className="size-4" />
              </button>
            </div>
          </div>

          {/* Guests & Booking Notice Steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Max Guests */}
            <div className="flex flex-col gap-1">
              <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                الحد الأقصى للضيوف
              </label>
              <div className="bg-[#f1f5eb] h-11.5 px-2 rounded-[12px] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleDecrementGuests}
                  className="bg-white size-8 rounded-[8px] flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Minus className="size-3.5" />
                </button>
                <div className="flex gap-1.5 items-baseline">
                  <span className="font-cairo font-bold text-[#181d17] text-[18px]">
                    {config.maximumGuests}
                  </span>
                  <span className="font-cairo text-[#75786f] text-[12px]">
                    ضيوف للوحدة
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleIncrementGuests}
                  className="bg-white size-8 rounded-[8px] flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                المعيار القياسي للشقق المتوسطة
              </span>
            </div>

            {/* Advance Notice */}
            <div className="flex flex-col gap-1">
              <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                مهلة الحجز المسبق الأدنى
              </label>
              <div className="bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between">
                <Clock className="size-4 text-[#75786f]" />
                <span className="font-cairo text-[#181d17] text-[14px]">
                  ساعتان
                </span>
              </div>
              <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                فترة كافية لإشعار طاقم الضيافة الميداني
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Owner Accounts & Registration (Right Column Bottom) */}
        <div
          className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4"
          data-node-id="1:30143"
        >
          {/* Header */}
          <div className="flex items-center justify-start gap-3 border-[#e5eae0] border-b pb-3">
            <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
              <Users2 className="size-5" />
            </div>
            <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
              إعدادات حسابات الملاك والتسجيل
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* Toggle 1: Self-registration */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  updateField(
                    "allowOwnerSelfRegistration",
                    !config.allowOwnerSelfRegistration
                  )
                }
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                  config.allowOwnerSelfRegistration ? "bg-[#34422a]" : "bg-[#c5c8bd]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.allowOwnerSelfRegistration
                      ? "-translate-x-6"
                      : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex flex-col text-right">
                <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                  السماح بالتسجيل الذاتي لملاك العقارات
                </span>
                <span className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                  إتاحة بوابة التسجيل الرقمي للملاك دون دعوة إدارية مسبقة
                </span>
              </div>
            </div>

            {/* Toggle 2: Admin Approval */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  updateField("requireAdminApproval", !config.requireAdminApproval)
                }
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                  config.requireAdminApproval ? "bg-[#34422a]" : "bg-[#c5c8bd]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.requireAdminApproval ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex flex-col text-right">
                <div className="flex gap-2 items-center justify-end">
                  <span className="bg-[#d8e8cb] text-[#3d4b36] font-cairo font-medium text-[11px] px-2 py-0.5 rounded-full">
                    أمان عالي
                  </span>
                  <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                    اشتراط موافقة المشرف الإداري قبل التفعيل
                  </span>
                </div>
                <span className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                  إيقاف الحساب بوضع معلق لحين التحقق من السجل التجاري والهوية العقارية
                </span>
              </div>
            </div>

            {/* Toggle 3: Direct Property Additions (Triggers Confirmation Modal!) */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  handleToggleAddProperties(!config.allowOwnersAddPropertiesDirectly)
                }
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                  config.allowOwnersAddPropertiesDirectly
                    ? "bg-[#34422a]"
                    : "bg-[#c5c8bd]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.allowOwnersAddPropertiesDirectly
                      ? "-translate-x-6"
                      : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex flex-col text-right">
                <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                  تمكين المالك من إضافة وإدراج العقارات مباشرة
                </span>
                <span className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                  السماح بإنشاء ملفات العقارات دون الرجوع للدعم الفني طالما لم يتجاوز حد الباقة
                </span>
              </div>
            </div>

            {/* Default Plan Dropdown */}
            <div className="flex flex-col gap-1 pt-1">
              <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                الباقة الافتراضية للحسابات الجديدة
              </label>
              <div className="bg-[#f1f5eb] h-11 px-4 rounded-[12px] flex items-center justify-between font-cairo text-[#181d17] text-[14px]">
                <Award className="size-4 text-[#75786f]" />
                <span>الباقة الفضية (14 يوماً تجريبية مجانية - 5 عقارات)</span>
              </div>
              <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                تمنح الفترة التجريبية فور التحقق دون طلب بطاقة ائتمانية
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 4: Core System & Automation Engine Rules (Left Column Bottom) */}
        <div
          className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4"
          data-node-id="1:30088"
        >
          {/* Header */}
          <div className="flex items-center justify-start gap-3 border-[#e5eae0] border-b pb-3">
            <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
              <Zap className="size-5" />
            </div>
            <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
              قواعد النظام والأتمتة المركزية
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* Automation 1: Status Sync */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  updateField("autoUnitStatusSync", !config.autoUnitStatusSync)
                }
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                  config.autoUnitStatusSync ? "bg-[#34422a]" : "bg-[#c5c8bd]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.autoUnitStatusSync ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex flex-col text-right">
                <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                  تحديث حالة الوحدات تلقائياً
                </span>
                <span className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                  تبديل الحالة بين (مشغولة، تحت التنظيف، متاحة) فورياً وفق أوقات الدخول والخروج
                </span>
              </div>
            </div>

            {/* Automation 2: WORM Audit Trail (Locked) */}
            <div className="bg-[rgba(229,234,224,0.6)] rounded-[12px] p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-12 h-6 rounded-full p-0.5 bg-[#34422a]/70">
                  <div className="bg-white size-5 rounded-full shadow-sm -translate-x-6" />
                </div>
                <Lock className="size-3.5 text-[#75786f]" />
              </div>
              <div className="flex flex-col text-right">
                <div className="flex gap-2 items-center justify-end">
                  <span className="bg-[#d8e8cb] text-[#454840] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded">
                    إلزامي
                  </span>
                  <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                    توثيق سجلات التدقيق الصارمة
                  </span>
                </div>
                <span className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                  تسجيل ومطابقة كل عملية مالية وتعديل صلاحيات في دفتر أستاذ غير قابل للحذف أو التغيير
                </span>
              </div>
            </div>

            {/* Automation 3: OTA Sync */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  updateField("realtimeOtaSync", !config.realtimeOtaSync)
                }
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                  config.realtimeOtaSync ? "bg-[#34422a]" : "bg-[#c5c8bd]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.realtimeOtaSync ? "-translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex flex-col text-right">
                <div className="flex gap-2 items-center justify-end">
                  <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-medium text-[11px] px-2 py-0.5 rounded">
                    Booking / Airbnb
                  </span>
                  <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                    المزامنة اللحظية مع منصات الحجز الخارجية (OTA Sync)
                  </span>
                </div>
                <span className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                  حجب المواعيد وتعديل الأسعار المشتركة خلال أقل من 120 ثانية لتفادي الحجز المزدوج
                </span>
              </div>
            </div>

            {/* Automation 4: Platform Broadcast Notices */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  updateField(
                    "broadcastSystemAnnouncements",
                    !config.broadcastSystemAnnouncements
                  )
                }
                className={`w-12 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                  config.broadcastSystemAnnouncements ? "bg-[#34422a]" : "bg-[#c5c8bd]"
                }`}
              >
                <div
                  className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                    config.broadcastSystemAnnouncements
                      ? "-translate-x-6"
                      : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex flex-col text-right">
                <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                  إظهار الإعلانات والتنبيهات النظامية للملاك
                </span>
                <span className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                  بث تحديثات منصة «ابراج» والتنبيهات الضريبية وهيئة العقار في لوحات تحكم الملاك
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Toolbar */}
      <DockingBottomBar>
        <div
          className="backdrop-blur-md bg-white/95 rounded-[16px] p-4 shadow-xl border border-[#e5eae0] flex flex-col sm:flex-row items-center justify-between gap-3 w-full"
          data-node-id="1:30194"
        >
          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#34422a] text-white px-6 py-2.5 rounded-[12px] font-cairo font-semibold text-[12px] flex items-center justify-center gap-2 hover:bg-[#273220] transition-colors shadow-sm flex-1 sm:flex-none cursor-pointer"
            >
              <span>حفظ التغييرات</span>
              <Save className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#ebefe6] text-[#181d17] px-4 py-2.5 rounded-[12px] font-cairo font-semibold text-[12px] hover:bg-[#dde4d7] transition-colors flex-1 sm:flex-none cursor-pointer"
            >
              إلغاء التعديلات
            </button>
          </div>

          {/* Audit Telemetry */}
          <div className="flex items-center gap-2 text-[#75786f] text-[13px] font-cairo">
            <Clock className="size-3.5" />
            <p>
              <span>آخر تحديث: </span>
              <strong className="text-[#181d17] font-semibold">5 أكتوبر 2026</strong>
              <span> — بواسطة مدير النظام (</span>
              <span className="text-[#34422a] font-medium">محمد أحمد</span>
              <span>)</span>
            </p>
          </div>
        </div>
      </DockingBottomBar>

      {/* Security Confirmation Modal */}
      <ConfirmPlatformSettingModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDisableAddProperties}
      />
    </div>
  );
}
