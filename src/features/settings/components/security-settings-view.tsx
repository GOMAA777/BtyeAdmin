"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Users2,
  Monitor,
  AlertTriangle,
  Database,
  Lock,
  UserCheck,
  Smartphone,
  Mail,
  History,
  KeyRound,
  Network,
  Check,
  ChevronDown,
  Info,
  Radio,
} from "lucide-react";
import { useSecuritySettings } from "../controllers/use-security-settings";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function SecuritySettingsView() {
  const {
    state,
    updateField,
    handleToggleEmergencyLockout,
    handleSave,
    handleReset,
  } = useSecuritySettings();

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:34630"
      data-name="إعدادات الأمان"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:34632"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            إعدادات الأمان
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            تهيئة السياسات الأمنية الإلزامية للمنصة، معايير التحقق، المصادقة الثنائية (2FA)، وإجراءات منع الاختراق المعتمدة
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:34641"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Main Content 2-Column Architectural Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start" data-node-id="1:34647">
        {/* MAIN COLUMN (8 cols): Configuration Modules */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full order-2 lg:order-1">
          {/* SECTION 1: Login & Identity Verification */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34736"
          >
            <div className="flex items-center justify-end gap-3 text-right border-b border-[#f1f5eb] pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                تسجيل الدخول والتحقق من الهوية
              </h2>
              <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                <UserCheck className="size-4" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Item 1: Strong Passwords */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateField("enforceStrongPassword", !state.enforceStrongPassword)
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.enforceStrongPassword ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.enforceStrongPassword ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    فرض كلمات مرور قوية ومعقدة
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    إلزام المستخدمين باحتواء كلمة المرور على أحرف كبيرة وصغيرة وأرقام ورموز خاصة وفق معيار
                  </p>
                </div>
              </div>

              {/* Item 2: Minimum Length */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-center justify-between gap-4">
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between min-w-[140px]">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                    {state.minPasswordLength} خانات (موصى به)
                  </span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    الحد الأدنى لطول كلمة المرور
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    يُوصى بألا يقل عن 10 خانات لضمان صعوبة التخمين الآلي.
                  </p>
                </div>
              </div>

              {/* Item 3: Email Verification */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "mandatoryEmailVerification",
                      !state.mandatoryEmailVerification
                    )
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.mandatoryEmailVerification ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.mandatoryEmailVerification ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    التحقق الإلزامي من البريد الإلكتروني
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    إلزام تفعيل الحساب برابط تحقق صالح لمدة 24 ساعة قبل منح صلاحية استعراض الأملاك ولوحات المعلومات.
                  </p>
                </div>
              </div>

              {/* Item 4: Phone OTP */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateField("mandatoryPhoneOtp", !state.mandatoryPhoneOtp)
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.mandatoryPhoneOtp ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.mandatoryPhoneOtp ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    التحقق الإلزامي من رقم الجوال (OTP)
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    مطابقة رقم الجوال الوطني عبر رمز تحقق فوري من 4 أرقام عند التسجيل وإجراء المعاملات المالية والعقود.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Two-Factor Authentication (2FA) */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34790"
          >
            <div className="flex items-center justify-between border-b border-[#f1f5eb] pb-3">
              <span className="bg-[#d8e8cb] px-2.5 py-0.5 rounded-full font-cairo font-semibold text-[#5a6952] text-[11px]">
                موصى به لحسابات الإدارة
              </span>
              <div className="flex items-center gap-3">
                <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                  المصادقة الثنائية
                </h2>
                <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                  <ShieldCheck className="size-4" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Toggle 2FA */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => updateField("twoFactorEnabled", !state.twoFactorEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.twoFactorEnabled ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.twoFactorEnabled ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    تفعيل المصادقة الثنائية
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    إتاحة تسجيل الدخول متعدد العوامل لكافة ملاك العقارات والمشرفين عبر التطبيقات المعتمدة أو الرسائل النصية.
                  </p>
                </div>
              </div>

              {/* Allowed Methods Box */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-3 text-right">
                <span className="font-cairo font-bold text-[#181d17] text-[12px]">
                  الطرق والوسائط المسموح بها:
                </span>
                <div className="space-y-2">
                  <label
                    onClick={() =>
                      updateField("allowAuthenticatorApp", !state.allowAuthenticatorApp)
                    }
                    className="flex items-center justify-end gap-3 cursor-pointer"
                  >
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                      تطبيق المصادقة (Authenticator App: Google/Microsoft) - موصى به و محمي
                    </span>
                    <div className="size-5 rounded-[2.5px] bg-[#34422a] flex items-center justify-center text-white shrink-0">
                      {state.allowAuthenticatorApp && <Check className="size-3.5" />}
                    </div>
                  </label>

                  <label
                    onClick={() => updateField("allowSmsOtp", !state.allowSmsOtp)}
                    className="flex items-center justify-end gap-3 cursor-pointer"
                  >
                    <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                      رسائل التحقق النصية (SMS Gateway)
                    </span>
                    <div className="size-5 rounded-[2.5px] bg-[#34422a] flex items-center justify-center text-white shrink-0">
                      {state.allowSmsOtp && <Check className="size-3.5" />}
                    </div>
                  </label>
                </div>
              </div>

              {/* Mandatory Admin 2FA */}
              <div className="bg-[rgba(216,232,203,0.3)] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() => updateField("mandatoryAdmin2fa", !state.mandatoryAdmin2fa)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.mandatoryAdmin2fa ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.mandatoryAdmin2fa ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    إلزامية المصادقة الثنائية لمديري النظام
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    حظر تسجيل دخول أي حساب بصلاحيات إدارة المنصة بدون مصادقة ثنائية نشطة لحماية بيانات المحافظ العقارية.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Session Management */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34837"
          >
            <div className="flex items-center justify-between border-b border-[#f1f5eb] pb-3">
              <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                ضوابط التصفح
              </span>
              <div className="flex items-center gap-3">
                <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                  إدارة الجلسات والأجهزة
                </h2>
                <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                  <Monitor className="size-4" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Session Timeout */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-center justify-between gap-4">
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between min-w-[140px]">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                    {state.sessionTimeoutMinutes} دقيقة (موصى به)
                  </span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    مهلة خمول الجلسة
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    تسجيل الخروج التلقائي عند عدم وجود نشاط على لوحة التحكم لمنع الوصول غير المصرح به.
                  </p>
                </div>
              </div>

              {/* Multiple Sessions */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateField("allowMultipleSessions", !state.allowMultipleSessions)
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.allowMultipleSessions ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.allowMultipleSessions ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    السماح بتعدد الجلسات النشطة في وقت واحد
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    معطل — يُسمح بجلسة واحدة نشطة لكل مستخدم لتقليل مخاطر مشاركة الحسابات ومنع اختطاف الجلسات النشطة.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Lockout & Brute-force Protection */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34871"
          >
            <div className="flex items-center justify-end gap-3 text-right border-b border-[#f1f5eb] pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                محاولات الدخول وحماية الحسابات
              </h2>
              <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                <Lock className="size-4" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lockout Duration */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
                <div className="space-y-1">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    مدة تجميد الحساب المؤقت
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px]">
                    فترة الحظر التلقائي عند استنفاد المحاولات:
                  </p>
                </div>
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                    {state.lockoutDurationMinutes} دقيقة
                  </span>
                </div>
              </div>

              {/* Max Attempts */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex flex-col justify-between gap-3 text-right">
                <div className="space-y-1">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    الحد الأقصى لمحاولات الدخول الخاطئة
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px]">
                    عدد المحاولات الفاشلة المسموح بها قبل التجميد:
                  </p>
                </div>
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between">
                  <span className="text-[#75786f] text-[13px]">#</span>
                  <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                    {state.maxFailedLoginAttempts} محاولات
                  </span>
                </div>
              </div>
            </div>

            {/* Helper Note */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-3 flex items-center justify-end gap-2 text-right">
              <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px]">
                يتم إرسال إشعار تنبيهي فوري إلى البريد المسجل عند حظر الحساب بسبب تجاوز المحاولات مع رابط إلغاء الحظر المشروط.
              </p>
              <Info className="size-4 text-[#454840] shrink-0" />
            </div>
          </div>

          {/* SECTION 5: Password Policies */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34906"
          >
            <div className="flex items-center justify-between border-b border-[#f1f5eb] pb-3">
              <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                دورة حياة البيانات
              </span>
              <div className="flex items-center gap-3">
                <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                  سياسات دورية وتكرار كلمات المرور
                </h2>
                <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                  <History className="size-4" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Expiry */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-center justify-between gap-4">
                <div className="bg-[#f1f5eb] rounded-[12px] h-11 px-4 flex items-center justify-between min-w-[150px]">
                  <ChevronDown className="size-4 text-[#75786f]" />
                  <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                    اختياري / كل {state.passwordExpiryDays} يوماً
                  </span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    صلاحية كلمة المرور
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    إلزام تجديد رمز المرور بشكل دوري لموظفي الدعم والإشراف.
                  </p>
                </div>
              </div>

              {/* Password Reuse */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateField("preventPasswordReuse", !state.preventPasswordReuse)
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.preventPasswordReuse ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.preventPasswordReuse ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    منع إعادة استخدام كلمات المرور السابقة
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    حظر تكرار آخر 5 كلمات مرور تم استخدامها مسبقاً لكل حساب مستخدم.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: Technical & Infrastructure Security */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34940"
          >
            <div className="flex items-center justify-between border-b border-[#f1f5eb] pb-3">
              <span className="font-cairo font-medium text-[#54624c] text-[11px]">
                مستوى الشبكة والسجلات
              </span>
              <div className="flex items-center gap-3">
                <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                  الأمان التقني وضوابط الوصول
                </h2>
                <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                  <Network className="size-4" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* IP Whitelist */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 space-y-2 text-right">
                <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                  تقييد عناوين الـ IP لمديري المنصة (IP Whitelist)
                </span>
                <p className="font-cairo font-normal text-[#454840] text-[13px]">
                  حصر الدخول الإداري بنطاقات العناوين المعتمدة لمكاتب الإدارة ومراكز العمليات:
                </p>
                <div className="bg-[#f1f5eb] rounded-[12px] p-2 flex flex-wrap items-center justify-end gap-2 pt-2">
                  {state.ipWhitelist.map((ip) => (
                    <div
                      key={ip}
                      className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] px-3 py-1 rounded-[8px] flex items-center gap-1.5 font-cairo font-regular text-[#181d17] text-[12px]"
                    >
                      <Check className="size-3 text-[#34422a]" />
                      <span>{ip}</span>
                    </div>
                  ))}
                  <span className="font-cairo font-medium text-[#75786f] text-[11px] px-2">
                    مسموح بها
                  </span>
                </div>
              </div>

              {/* Immutable Audit Log */}
              <div className="bg-[#f6fbf1] rounded-[12px] p-4 flex items-start justify-between gap-4">
                <button
                  type="button"
                  onClick={() =>
                    updateField("immutableAuditLogging", !state.immutableAuditLogging)
                  }
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 mt-1 shrink-0 ${
                    state.immutableAuditLogging ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                      state.immutableAuditLogging ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <div className="flex flex-col items-end text-right">
                  <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                    التسجيل اللحظي لنشاط الدخول وسجل التدقيق
                  </span>
                  <p className="font-cairo font-normal text-[#454840] text-[13px] leading-[20px] pt-1">
                    تسجيل كافة عناوين IP، نوع المتصفح، والموقع الجغرافي لكل محاولة دخول ناجحة أو فاشلة في سجل غير قابل للتعديل لضمان المساءلة الكاملة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECONDARY COLUMN (4 cols): Telemetry, Posture, Quick Responders */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full order-1 lg:order-2">
          {/* Card: Security Posture Summary */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-5"
            data-node-id="1:34649"
          >
            <div className="flex items-center justify-end gap-2.5 text-right border-b border-[#f1f5eb] pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                ملخص الحالة الأمنية
              </h2>
              <ShieldCheck className="size-5 text-[#34422a]" />
            </div>

            {/* Gauge Box */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-3">
              {/* Circular Gauge Visualization */}
              <div className="relative size-20 flex items-center justify-center shrink-0">
                <svg className="size-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#dfe4db]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#34422a]"
                    strokeDasharray="98, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#34422a]">
                  <ShieldCheck className="size-6" />
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <span className="font-cairo font-medium text-[#454840] text-[11px]">
                  مؤشر الجاهزية والامتثال
                </span>
                <span className="font-cairo font-semibold text-[#75786f] text-[14px]">
                  98/100
                </span>
                <span className="font-cairo font-bold text-[#34422a] text-[12px] leading-[18px]">
                  درجة الأمان العامة: ممتازة
                </span>
              </div>
            </div>

            {/* Telemetry Metrics List */}
            <div className="space-y-2">
              <div className="bg-[#f6fbf1] rounded-[12px] p-2.5 flex items-center justify-between text-right">
                <span className="font-cairo font-semibold text-[#34422a] text-[12px]">
                  {state.admin2faCount}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-cairo font-normal text-[#181d17] text-[13px]">
                    مسؤولو النظام مع 2FA مفعّل
                  </span>
                  <ShieldCheck className="size-4 text-[#34422a]" />
                </div>
              </div>

              <div className="bg-[#f6fbf1] rounded-[12px] p-2.5 flex items-center justify-between text-right">
                <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                  {state.activeSessionsCount} جلسة
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-cairo font-normal text-[#181d17] text-[13px]">
                    جلسات نشطة مراقبة
                  </span>
                  <Monitor className="size-4 text-[#75786f]" />
                </div>
              </div>

              <div className="bg-[#f6fbf1] rounded-[12px] p-2.5 flex items-center justify-between text-right">
                <span className="font-cairo font-semibold text-[#ba1a1a] text-[12px]">
                  {state.blockedAttacks24h} محاولة
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-cairo font-normal text-[#181d17] text-[13px]">
                    محاولات مشبوهة محظورة (24 ساعة)
                  </span>
                  <AlertTriangle className="size-4 text-[#ba1a1a]" />
                </div>
              </div>

              <div className="bg-[#f6fbf1] rounded-[12px] p-2.5 flex items-center justify-between text-right">
                <span className="font-cairo font-bold text-[#454840] text-[12px]">
                  {state.encryptionStandard}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-cairo font-normal text-[#181d17] text-[13px]">
                    معيار تشفير البيانات المخزنة
                  </span>
                  <Database className="size-4 text-[#75786f]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card: Incident Response Hub */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] space-y-4"
            data-node-id="1:34706"
          >
            <div className="flex items-center justify-end gap-2.5 text-right border-b border-[#f1f5eb] pb-3">
              <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                مركز الاستجابة للطوارئ
              </h3>
              <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
                <ShieldAlert className="size-4" />
              </div>
            </div>

            {/* Notification alert banner */}
            <div className="bg-[rgba(216,232,203,0.4)] rounded-[12px] p-2.5 flex items-center justify-end gap-2 text-right">
              <p className="font-cairo font-normal text-[#5a6952] text-[13px] leading-[18px]">
                إنذارات الأمان الفورية: مفعّلة ومربوطة عبر الرسائل القصيرة والبريد.
              </p>
              <Radio className="size-4 text-[#34422a] shrink-0" />
            </div>

            {/* SOC Status */}
            <div className="bg-[#f6fbf1] rounded-[12px] p-2.5 flex items-center justify-between text-right">
              <span className="font-cairo font-bold text-[#34422a] text-[12px]">
                متاح 24/7 عبر الخط الآمن
              </span>
              <div className="flex items-center gap-2">
                <span className="font-cairo font-medium text-[#454840] text-[11px]">
                  فريق العمليات (SOC)
                </span>
                <span className="size-2 rounded-full bg-[#34422a]" />
              </div>
            </div>

            {/* Emergency Lockout Switch */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  handleToggleEmergencyLockout(!state.emergencyLockoutActive)
                }
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 shrink-0 ${
                  state.emergencyLockoutActive ? "bg-[#ba1a1a]" : "bg-[#dfe4db]"
                }`}
              >
                <div
                  className={`size-5 rounded-full bg-white shadow-sm transition-transform ${
                    state.emergencyLockoutActive ? "-translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <div className="flex flex-col items-end text-right">
                <span className="font-cairo font-bold text-[#181d17] text-[12px]">
                  إقفال الأمان الطارئ
                </span>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  حظر فوري لكافة الجلسات الخارجية
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PERSISTENT DOCKING BAR */}
      <DockingBottomBar>
        <div
          className="bg-white/95 backdrop-blur-md rounded-[16px] p-4 border border-[rgba(197,200,189,0.6)] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto w-full"
          data-node-id="1:34983"
        >
          {/* Actions Left */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="bg-[#4b5940] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#34422a] transition-colors flex items-center gap-2 px-9 h-11 rounded-[12px] font-cairo font-normal text-white text-[14px]"
            >
              <span>حفظ التغييرات</span>
              <Check className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-[#ebefe6] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:bg-[#dfe4db] transition-colors px-6 h-11 rounded-[12px] font-cairo font-normal text-[#181d17] text-[14px]"
            >
              الغاء
            </button>
          </div>

          {/* Telemetry compliance note Right */}
          <div className="flex items-center gap-2.5 text-right">
            <p className="font-cairo font-semibold text-[#454840] text-[12px] leading-[18px]">
              <span>تسري هذه السياسات على كافة مستخدمي المنصة (المشرفين وملاك العقارات) فور حفظ </span>
              <span className="font-medium">الإعدادات.</span>
            </p>
            <div className="bg-[#f1f5eb] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
              <ShieldCheck className="size-4" />
            </div>
          </div>
        </div>
      </DockingBottomBar>
    </div>
  );
}
