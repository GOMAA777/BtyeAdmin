"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe,
  Mail,
  Palette,
  Sparkles,
  Headphones,
  MessageSquare,
  ExternalLink,
  Power,
  Wrench,
  Calendar,
  Save,
  Clock,
  HelpCircle,
  ShieldAlert,
  Trash2,
  UploadCloud,
  CheckCircle2,
  Check,
} from "lucide-react";
import { useGeneralSettings } from "../controllers/use-general-settings";
import { UpdateLogoModal } from "./modals/update-logo-modal";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function GeneralSettingsView() {
  const {
    formData,
    updateInfo,
    updateSupport,
    updateMaintenance,
    isLogoModalOpen,
    setIsLogoModalOpen,
    handleSave,
    handleReset,
  } = useGeneralSettings();

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:29367"
      data-name="الإعدادات العامة"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:29369"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            الإعدادات العامة
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            إدارة البيانات الأساسية وهوية المنصة، معلومات الدعم الفني، وحالة التشغيل والصيانة.
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:29378"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Main Content Layout (12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* Right Column: Platform Info & Branding (Span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {/* SECTION 1: Platform Information */}
          <div
            className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4"
            data-node-id="1:29385"
          >
            <div className="border-[#e5eae0] border-b pb-3 flex items-center justify-start gap-3">
              <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Building2 className="size-5" />
              </div>
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                بيانات المنصة
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Platform Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[14px] flex items-center gap-1">
                  <span className="text-[#ba1a1a]">*</span>
                  <span>اسم المنصة</span>
                </label>
                <input
                  type="text"
                  value={formData.info.name}
                  onChange={(e) => updateInfo("name", e.target.value)}
                  className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 font-cairo text-[#181d17] text-[14px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none"
                />
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  الاسم المعتمد للعلامة في السجلات والترخيص
                </span>
              </div>

              {/* Official Website */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[14px] flex items-center gap-1">
                  <span className="text-[#ba1a1a]">*</span>
                  <span>الموقع الإلكتروني</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.info.website}
                    onChange={(e) => updateInfo("website", e.target.value)}
                    dir="ltr"
                    className="bg-[#f1f5eb] rounded-[12px] h-11 pl-10 pr-4 font-cairo text-[#181d17] text-[14px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none w-full text-left"
                  />
                  <Globe className="absolute left-3.5 top-3.5 size-4 text-[#75786f]" />
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  البوابة الرسمية والواجهة للمستخدمين
                </span>
              </div>

              {/* Description */}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                  الوصف المؤسسي
                </label>
                <textarea
                  rows={3}
                  value={formData.info.description}
                  onChange={(e) => updateInfo("description", e.target.value)}
                  className="bg-[#f1f5eb] rounded-[12px] p-4 font-cairo text-[#181d17] text-[14px] leading-[22.75px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none resize-none"
                />
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  يستخدم في المراسلات والعقود والبيانات الوصفية SEO
                </span>
              </div>

              {/* Official Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[14px] flex items-center gap-1">
                  <span className="text-[#ba1a1a]">*</span>
                  <span>البريد الإلكتروني الرسمي</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.info.officialEmail}
                    onChange={(e) => updateInfo("officialEmail", e.target.value)}
                    dir="ltr"
                    className="bg-[#f1f5eb] rounded-[12px] h-11 pl-10 pr-4 font-cairo text-[#181d17] text-[14px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none w-full text-left"
                  />
                  <Mail className="absolute left-3.5 top-3.5 size-4 text-[#75786f]" />
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  بريد استقبال التعاقدات والوثائق الإدارية
                </span>
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[14px] flex items-center gap-1">
                  <span className="text-[#ba1a1a]">*</span>
                  <span>رقم التواصل الرئيسي</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.info.contactNumber}
                    onChange={(e) => updateInfo("contactNumber", e.target.value)}
                    dir="ltr"
                    className="bg-[#f1f5eb] rounded-[12px] h-11 pl-14 pr-4 font-cairo font-medium text-[#181d17] text-[14px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none w-full text-left"
                  />
                  <div className="absolute left-3 flex items-center pr-2 border-r border-[#c5c8bd]">
                    <span className="text-[12px]">🇸🇦</span>
                  </div>
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  الرقم الموحد الموثق لدى هيئة الاتصالات
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: Platform Branding & Assets */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4"
            data-node-id="1:29451"
          >
            <div className="border-[#e5eae0] border-b pb-3 flex items-center justify-start gap-3">
              <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Palette className="size-5" />
              </div>
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                هوية المنصة
              </h2>
            </div>

            {/* Logo Management Row */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                {/* Visual Emblem Simulation */}
                <div className="bg-[#34422a] size-20 rounded-[16px] shadow-sm flex flex-col items-center justify-center text-white relative overflow-hidden shrink-0">
                  <Building2 className="size-7 text-[#d8e8c7]" />
                  <span className="font-cairo font-bold text-[#d8e8c7] text-[12px] tracking-[1.2px] mt-0.5">
                    رِواق
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex gap-2 items-center">
                    <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                      شعار المنصة الرئيسي
                    </span>
                    <span className="bg-[#ebefe6] text-[#454840] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded">
                      SVG
                    </span>
                  </div>
                  <span className="font-cairo text-[#454840] text-[13px] leading-[20px]">
                    BYTE HOME — إدارة الأصول العقارية (النسخة الداكنة)
                  </span>
                  <span className="font-cairo text-[#75786f] text-[11px] leading-[16px] mt-1">
                    PNG, SVG • الحد الأقصى 2MB • 512×512 بكسل
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-center self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setIsLogoModalOpen(true)}
                  className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-10 px-4 rounded-[12px] font-cairo font-bold text-[#34422a] text-[12px] flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer border border-[#e5eae0]"
                >
                  <UploadCloud className="size-3.5" />
                  <span>رفع شعار جديد</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogoModalOpen(true)}
                  className="bg-[#ebefe6] size-10 rounded-[12px] flex items-center justify-center opacity-60 hover:opacity-100 text-[#ba1a1a] transition-opacity cursor-pointer"
                  title="حذف الشعار"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Favicon Management Row */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                {/* Favicon Mockups */}
                <div className="flex gap-2 items-end shrink-0">
                  <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-9 rounded-[8px] flex items-center justify-center text-[#34422a]">
                    <Building2 className="size-4" />
                  </div>
                  <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] size-14 rounded-[12px] p-2 flex flex-col items-center justify-center">
                    <div className="bg-[#34422a] rounded-[8px] w-7 h-4.5 flex items-center justify-center text-[#d8e8c7]">
                      <Building2 className="size-3" />
                    </div>
                    <span className="font-cairo text-[#75786f] text-[9px] mt-1">
                      64×64
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                    أيقونة المفضلة
                  </span>
                  <span className="font-cairo text-[#454840] text-[13px] leading-[20px]">
                    الرمز المصغر لتبويبات التصفح وشاشات الجوال
                  </span>
                  <span className="font-cairo text-[#75786f] text-[11px] leading-[16px] mt-1">
                    يتم استخدام الأيقونة في تبويبات المتصفح واختصارات تطبيقات الويب PWA.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsLogoModalOpen(true)}
                className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] h-10 px-4 rounded-[12px] font-cairo font-bold text-[#34422a] text-[12px] flex items-center gap-2 hover:bg-slate-50 transition-colors self-end sm:self-center cursor-pointer border border-[#e5eae0]"
              >
                <UploadCloud className="size-3.5" />
                <span>رفع ايقون جديد</span>
              </button>
            </div>
          </div>
        </div>

        {/* Left Column: Support Info & System Status (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          {/* SECTION 3: Support Contact Information */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4"
            data-node-id="1:29516"
          >
            <div className="border-[#e5eae0] border-b pb-3 flex items-center justify-start gap-3">
              <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Headphones className="size-5" />
              </div>
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                بيانات الدعم الفني
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {/* Support Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                  البريد الإلكتروني للدعم
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.support.supportEmail}
                    onChange={(e) => updateSupport("supportEmail", e.target.value)}
                    dir="ltr"
                    className="bg-[#f1f5eb] rounded-[12px] h-11 pl-10 pr-4 font-cairo text-[#181d17] text-[14px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none w-full text-left"
                  />
                  <Mail className="absolute left-3.5 top-3.5 size-4 text-[#75786f]" />
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  مربوط بنظام إدارة تذاكر المساعدة الآلي
                </span>
              </div>

              {/* WhatsApp Support */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                    رقم WhatsApp الموثق
                  </label>
                  <div className="bg-[#d8e8cb] flex gap-1 items-center px-2 py-0.5 rounded-full text-[#54624c]">
                    <Check className="size-3" />
                    <span className="font-cairo font-semibold text-[12px]">
                      موثق تجارياً
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.support.whatsappNumber}
                    onChange={(e) => updateSupport("whatsappNumber", e.target.value)}
                    dir="ltr"
                    className="bg-[#f1f5eb] rounded-[12px] h-11 pl-10 pr-4 font-cairo text-[#181d17] text-[14px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none w-full text-left"
                  />
                  <MessageSquare className="absolute left-3.5 top-3.5 size-4 text-[#75786f]" />
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  دعم الحالات الطارئة واستفسارات الحجوزات 24/7
                </span>
              </div>

              {/* Help Center URL */}
              <div className="flex flex-col gap-1.5">
                <label className="font-cairo font-semibold text-[#181d17] text-[14px]">
                  رابط مركز المساعدة
                </label>
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formData.support.helpCenterUrl}
                      onChange={(e) => updateSupport("helpCenterUrl", e.target.value)}
                      dir="ltr"
                      className="bg-[#f1f5eb] rounded-[12px] h-11 pl-10 pr-4 font-cairo text-[#181d17] text-[14px] border-0 focus:ring-1 focus:ring-[#34422a] outline-none w-full text-left"
                    />
                    <ExternalLink className="absolute left-3.5 top-3.5 size-4 text-[#75786f]" />
                  </div>
                  <a
                    href={formData.support.helpCenterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ebefe6] text-[#34422a] h-11 px-3.5 rounded-[12px] font-cairo font-semibold text-[12px] flex items-center gap-1.5 hover:bg-[#dfe5d9] transition-colors shrink-0"
                  >
                    <span>معاينة الرابط</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>

              {/* Support Visibility Note */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3.5 flex gap-3 items-start">
                <HelpCircle className="size-4 text-[#75786f] shrink-0 mt-0.5" />
                <p className="font-cairo text-[#454840] text-[13px] leading-[21px]">
                  تظهر بيانات الدعم في تذييل لوحات تحكم ملاك العقارات وصفحات المساعدة الذاتية
                  ومركز الاستفسارات للمستأجرين.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: Platform System Status & Maintenance Mode */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4"
            data-node-id="1:29571"
          >
            <div className="border-[#e5eae0] border-b pb-3 flex items-center justify-start gap-3">
              <div className="bg-[#f1f5eb] size-10 rounded-[12px] flex items-center justify-center text-[#34422a]">
                <Power className="size-5" />
              </div>
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                حالة المنصة
              </h2>
            </div>

            {/* Radio Switcher */}
            <div className="grid grid-cols-2 gap-3">
              {/* Option 1: Maintenance */}
              <div
                onClick={() => updateMaintenance("isMaintenanceMode", true)}
                className={`rounded-[12px] p-3.5 flex flex-col justify-between cursor-pointer border-2 transition-all ${
                  formData.maintenance.isMaintenanceMode
                    ? "bg-[#ebefe6] border-[#34422a]"
                    : "bg-[#f1f5eb] border-transparent hover:border-[#c5c8bd]"
                }`}
              >
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex gap-2 items-center">
                    <span
                      className={`rounded-full size-2.5 ${
                        formData.maintenance.isMaintenanceMode
                          ? "bg-[#34422a]"
                          : "bg-[#75786f]"
                      }`}
                    />
                    <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                      وضع الصيانة
                    </span>
                  </div>
                  <Wrench className="size-4 text-[#75786f]" />
                </div>
                <p className="font-cairo text-[#75786f] text-[12px] leading-[19px]">
                  تعطيل الوصول للعامة وحصر الدخول للمشرفين.
                </p>
              </div>

              {/* Option 2: Active */}
              <div
                onClick={() => updateMaintenance("isMaintenanceMode", false)}
                className={`rounded-[12px] p-3.5 flex flex-col justify-between cursor-pointer border-2 transition-all ${
                  !formData.maintenance.isMaintenanceMode
                    ? "bg-[#ebefe6] border-[#34422a]"
                    : "bg-[#f1f5eb] border-transparent hover:border-[#c5c8bd]"
                }`}
              >
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex gap-2 items-center">
                    <span
                      className={`rounded-full size-2.5 ${
                        !formData.maintenance.isMaintenanceMode
                          ? "bg-[#34422a]"
                          : "bg-[#75786f]"
                      }`}
                    />
                    <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                      نشطة (طبيعي)
                    </span>
                  </div>
                  <CheckCircle2
                    className={`size-4 ${
                      !formData.maintenance.isMaintenanceMode
                        ? "text-[#34422a]"
                        : "text-[#75786f]"
                    }`}
                  />
                </div>
                <p className="font-cairo text-[#454840] text-[12px] leading-[19px]">
                  النظام يعمل بكفاءة لجميع المستخدمين والمستأجرين.
                </p>
              </div>
            </div>

            {/* Maintenance Configuration Box */}
            <div className="bg-[rgba(254,249,195,0.4)] border border-[#fef08a] rounded-[12px] p-4 space-y-3.5">
              <div className="flex items-center gap-2 text-[#854d0e]">
                <Wrench className="size-4" />
                <span className="font-cairo font-bold text-[14px]">
                  إعدادات رسالة الصيانة والجدول الزمني
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  عنوان رسالة الصيانة
                </label>
                <input
                  type="text"
                  value={formData.maintenance.title}
                  onChange={(e) => updateMaintenance("title", e.target.value)}
                  className="bg-white rounded-[12px] h-10 px-4 font-cairo text-[#181d17] text-[14px] border border-[#fef08a] focus:ring-1 focus:ring-[#34422a] outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  نص رسالة الصيانة للزوار
                </label>
                <textarea
                  rows={3}
                  value={formData.maintenance.message}
                  onChange={(e) => updateMaintenance("message", e.target.value)}
                  className="bg-white rounded-[12px] p-3 font-cairo text-[#181d17] text-[13px] leading-[21px] border border-[#fef08a] focus:ring-1 focus:ring-[#34422a] outline-none resize-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  وقت الانتهاء المتوقع للعمليات
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.maintenance.expectedEndTime}
                    onChange={(e) => updateMaintenance("expectedEndTime", e.target.value)}
                    className="bg-white rounded-[12px] h-10 pl-4 pr-10 font-cairo text-[#181d17] text-[14px] border border-[#fef08a] focus:ring-1 focus:ring-[#34422a] outline-none w-full"
                  />
                  <Calendar className="absolute right-3.5 top-2.5 size-4 text-[#75786f]" />
                </div>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  يتم عرض عدّاد تنازلي للمستخدمين بناءً على هذا التاريخ
                </span>
              </div>

              {/* Warning Alert */}
              <div className="bg-white/80 rounded-[12px] p-3 flex gap-2.5 items-start text-[#78350f]">
                <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                <p className="font-cairo text-[11px] leading-[18px]">
                  <span className="font-bold">تنبيه أمني:</span> عند تفعيل وضع الصيانة،
                  سيتم منع الوصول إلى المنصة للمستخدمين غير المصرح لهم فوراً، مع استمرار
                  صلاحيات مديري النظام المشرفين فقط عبر بوابات الإدارة المباشرة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Toolbar */}
      <DockingBottomBar>
        <div
          className="backdrop-blur-md bg-white/95 rounded-[16px] p-4 shadow-xl border border-[#e5eae0] flex flex-col sm:flex-row items-center justify-between gap-3 w-full"
          data-node-id="1:29637"
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

      {/* Logo Update Modal */}
      <UpdateLogoModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />
    </div>
  );
}
