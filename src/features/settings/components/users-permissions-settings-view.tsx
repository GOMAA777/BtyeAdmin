"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  MailCheck,
  Smartphone,
  UserX,
  ChevronDown,
  Check,
  Eye,
  FileX,
  Sliders,
  Receipt,
  FileSpreadsheet,
  Coins,
  Building2,
  Lock,
  Download,
  Trash2,
  SlidersHorizontal,
  CreditCard,
  UserPlus,
  Users,
  Award,
  Clock,
  Save,
  ShieldAlert,
} from "lucide-react";
import { useUsersPermissionsSettings } from "../controllers/use-users-permissions-settings";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";
import { DefaultPlatformRole } from "../types";

export function UsersPermissionsSettingsView() {
  const {
    config,
    updateField,
    setRole,
    handleSave,
    handleReset,
  } = useUsersPermissionsSettings();

  const [dormantDropdownOpen, setDormantDropdownOpen] = useState(false);

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:35121"
      data-name="إعدادات المستخدمين والصلاحيات"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:35123"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            إعدادات المستخدمين والصلاحيات
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            تهيئة السياسات الأمنية الافتراضية للحسابات الجديدة، الأدوار التلقائية، وحدود الوصول المبدئية لمستخدمي و مشرفي المنصة.
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0"
          data-node-id="1:35132"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* 2-COLUMN WORKSPACE GRID (approx 65% Primary / 35% Side Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* PRIMARY WORKSPACE (8 cols on desktop, on right in RTL) */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* 1. SECTION: Onboarding & Account Security */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6"
            data-node-id="1:35157"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-[#e5eae0] border-b pb-3">
              <span className="bg-[#ebefe6] text-[#75786f] font-cairo font-semibold text-[11px] px-2.5 py-1 rounded-[6px]">
                4 ضوابط نشطة
              </span>
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                إعدادات الحسابات والتحقق الأمني
              </h2>
            </div>

            {/* List of 4 items */}
            <div className="flex flex-col gap-4">
              {/* Item 1: Admin Approval */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-start justify-between gap-4"
                data-node-id="1:35166"
              >
                {/* Switch (on left in RTL) */}
                <button
                  type="button"
                  onClick={() => updateField("requireAdminApproval", !config.requireAdminApproval)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 mt-1 cursor-pointer ${
                    config.requireAdminApproval ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                  data-node-id="1:35168"
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.requireAdminApproval ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                {/* Content */}
                <div className="flex gap-3 items-start flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        إلزامي مؤسسياً
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                        الموافقة المسبقة على المشرفين الجدد
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[19.5px] mt-1">
                      يتطلب تفعيل أي حساب إداري أو إشرافي جديد مراجعة واعتماد خطي مباشر من مدير النظام الرئيسي قبل منح أي صلاحية نفاذ.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
                    <UserCheck className="size-4" />
                  </div>
                </div>
              </div>

              {/* Item 2: Email Verification */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-start justify-between gap-4"
                data-node-id="1:35185"
              >
                {/* Switch */}
                <button
                  type="button"
                  onClick={() => updateField("mandatoryEmailVerification", !config.mandatoryEmailVerification)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 mt-1 cursor-pointer ${
                    config.mandatoryEmailVerification ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                  data-node-id="1:35187"
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.mandatoryEmailVerification ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                {/* Content */}
                <div className="flex gap-3 items-start flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        نشط
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                        التحقق الإلزامي من البريد الإلكتروني
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[19.5px] mt-1">
                      إرسال رابط توثيق مشفر وصالح لمدة 24 ساعة للبريد المؤسسي فقط قبل تمكين الحساب من استقبال رمز الدخول الأولي.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
                    <MailCheck className="size-4" />
                  </div>
                </div>
              </div>

              {/* Item 3: MFA / 2FA */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-start justify-between gap-4"
                data-node-id="1:35204"
              >
                {/* Switch */}
                <button
                  type="button"
                  onClick={() => updateField("mandatoryMfa", !config.mandatoryMfa)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 mt-1 cursor-pointer ${
                    config.mandatoryMfa ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                  data-node-id="1:35206"
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.mandatoryMfa ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                {/* Content */}
                <div className="flex gap-3 items-start flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        صارم
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                        المصادقة الثنائية الإلزامية
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[19.5px] mt-1">
                      إلزام تفعيل المصادقة متعددة العوامل عبر تطبيق المصادقة المعتمد (Authenticator TOTP) فور أول عملية تسجيل دخول وبدون خيار التخطي.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
                    <Smartphone className="size-4" />
                  </div>
                </div>
              </div>

              {/* Item 4: Account Dormancy */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                data-node-id="1:35223"
              >
                {/* Switch and Dropdown on left in RTL */}
                <div className="flex items-center gap-3 order-2 sm:order-1">
                  <button
                    type="button"
                    onClick={() => updateField("dormantAccountAction", !config.dormantAccountAction)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                      config.dormantAccountAction ? "bg-[#34422a]" : "bg-[#dfe4db]"
                    }`}
                    data-node-id="1:35225"
                  >
                    <div
                      className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                        config.dormantAccountAction ? "-translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDormantDropdownOpen(!dormantDropdownOpen)}
                      className="bg-white h-10 px-3.5 rounded-[12px] border border-[#e5eae0] flex items-center justify-between gap-2 font-cairo text-[#181d17] text-[11px] font-medium hover:border-[#c5c8bd] transition-colors cursor-pointer"
                    >
                      <ChevronDown className="size-3 text-[#75786f]" />
                      <span>بعد {config.dormantAccountDays} يوماً من عدم النشاط</span>
                    </button>

                    {dormantDropdownOpen && (
                      <div className="absolute top-full start-0 mt-1 bg-white border border-[#e5eae0] rounded-[12px] shadow-lg py-1 z-30 min-w-[180px] font-cairo text-[12px] text-right">
                        {[30, 60, 90, 180].map((days) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => {
                              updateField("dormantAccountDays", days);
                              setDormantDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-right hover:bg-[#f1f5eb] transition-colors ${
                              config.dormantAccountDays === days ? "font-bold text-[#34422a]" : "text-[#181d17]"
                            }`}
                          >
                            بعد {days} يوماً من عدم النشاط
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content on right in RTL */}
                <div className="flex gap-3 items-start order-1 sm:order-2 flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-cairo font-bold text-[#181d17] text-[14px] leading-[20px]">
                      تجميد الحسابات الخاملة تلقائياً
                    </span>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[19.5px] mt-1">
                      تعليق حسابات الموظفين التي لم تقم بأي نشاط لتفادي الثغرات الأمنية في الحسابات المتروكة.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0 mt-0.5">
                    <UserX className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SECTION: Default Role Assignment */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6"
            data-node-id="1:35245"
          >
            {/* Header */}
            <div className="flex flex-col items-start gap-1 text-right w-full border-[#e5eae0] border-b pb-3">
              <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                الدور والصلاحيات الافتراضية
              </h2>
              <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                الدور الممنوح تلقائياً عند إنشاء مستخدم منصة جديد:
              </span>
              <p className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                الدور الأمني الذي يتم تعيينه تلقائياً لأي عضو جديد ينضم لمنظومة «ابراج» قبل قيام مدير النظام بترقيته أو تعديل مصفوفة صلاحياته يدوياً.
              </p>
            </div>

            {/* 4 Role Selection Cards in 2x2 grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option 1: Viewer (مشاهد) */}
              <div
                onClick={() => setRole("viewer")}
                className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer transition-all drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-right ${
                  config.defaultRole === "viewer"
                    ? "bg-[#f1f5eb] border-2 border-[#34422a]"
                    : "bg-white border border-[#e5eae0] opacity-85 hover:opacity-100 hover:border-[#c5c8bd]"
                }`}
                data-node-id="1:35257"
              >
                <div>
                  <div className="flex items-start justify-between pb-2">
                    {config.defaultRole === "viewer" ? (
                      <span className="bg-[#34422a] text-white font-cairo font-bold text-[10px] px-2 py-0.5 rounded-full">
                        افتراضي نشط
                      </span>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                          مشاهد (Viewer)
                        </span>
                        <span className="font-cairo font-semibold text-[#34422a] text-[11px] leading-[16px]">
                          موصى به وفق مبدأ الحد الأدنى
                        </span>
                      </div>
                      <div
                        className={`size-6 rounded-full flex items-center justify-center ${
                          config.defaultRole === "viewer"
                            ? "bg-[#34422a] text-white"
                            : "bg-[#dfe4db]"
                        }`}
                      >
                        {config.defaultRole === "viewer" ? (
                          <Check className="size-3.5 stroke-[3]" />
                        ) : (
                          <div className="size-2 rounded-full bg-[#75786f]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="font-cairo text-[#454840] text-[13px] leading-[21px] mt-2">
                    يمنح المستخدم صلاحية استعراض البيانات الأساسية وجداول التشغيل فقط دون أي إمكانية للتعديل، التصدير، أو الحذف المالي والإداري.
                  </p>
                </div>

                <div className="border-t border-[#e5eae0]/60 pt-3 mt-4 flex items-center justify-end gap-2 text-[#75786f] text-[11px] font-cairo font-medium">
                  <div className="flex items-center gap-1">
                    <FileX className="size-3" />
                    <span>تصدير مقيد</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Eye className="size-3" />
                    <span>قراءة فقط</span>
                  </div>
                </div>
              </div>

              {/* Option 2: Operator (مشرف تشغيلي) */}
              <div
                onClick={() => setRole("operator")}
                className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer transition-all drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-right ${
                  config.defaultRole === "operator"
                    ? "bg-[#f1f5eb] border-2 border-[#34422a]"
                    : "bg-white border border-[#e5eae0] opacity-85 hover:opacity-100 hover:border-[#c5c8bd]"
                }`}
                data-node-id="1:35285"
              >
                <div>
                  <div className="flex items-start justify-between pb-2">
                    {config.defaultRole === "operator" ? (
                      <span className="bg-[#34422a] text-white font-cairo font-bold text-[10px] px-2 py-0.5 rounded-full">
                        افتراضي نشط
                      </span>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                          مشرف تشغيلي (Operator)
                        </span>
                        <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                          إدارة الحجوزات والوحدات
                        </span>
                      </div>
                      <div
                        className={`size-6 rounded-full flex items-center justify-center ${
                          config.defaultRole === "operator"
                            ? "bg-[#34422a] text-white"
                            : "bg-[#dfe4db]"
                        }`}
                      >
                        {config.defaultRole === "operator" ? (
                          <Check className="size-3.5 stroke-[3]" />
                        ) : (
                          <div className="size-2 rounded-full bg-[#75786f]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="font-cairo text-[#75786f] text-[13px] leading-[21px] mt-2">
                    صلاحيات تشغيلية لمعالجة حجوزات الضيوف اليومية ومتابعة جداول الصيانة وتحديث حالات الوحدات دون التدخل في الإيرادات والسياسات.
                  </p>
                </div>

                <div className="border-t border-[#e5eae0]/60 pt-3 mt-4 flex items-center justify-end gap-2 text-[#75786f] text-[11px] font-cairo font-medium">
                  <div className="flex items-center gap-1">
                    <Lock className="size-3" />
                    <span>فوترة محجوبة</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Sliders className="size-3" />
                    <span>تعديل تشغيلي</span>
                  </div>
                </div>
              </div>

              {/* Option 3: Auditor (مدقق مالي) */}
              <div
                onClick={() => setRole("auditor")}
                className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer transition-all drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-right ${
                  config.defaultRole === "auditor"
                    ? "bg-[#f1f5eb] border-2 border-[#34422a]"
                    : "bg-white border border-[#e5eae0] opacity-85 hover:opacity-100 hover:border-[#c5c8bd]"
                }`}
                data-node-id="1:35310"
              >
                <div>
                  <div className="flex items-start justify-between pb-2">
                    {config.defaultRole === "auditor" ? (
                      <span className="bg-[#34422a] text-white font-cairo font-bold text-[10px] px-2 py-0.5 rounded-full">
                        افتراضي نشط
                      </span>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                          مدقق مالي (Auditor)
                        </span>
                        <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                          محاسبة وتدقيق الفواتير
                        </span>
                      </div>
                      <div
                        className={`size-6 rounded-full flex items-center justify-center ${
                          config.defaultRole === "auditor"
                            ? "bg-[#34422a] text-white"
                            : "bg-[#dfe4db]"
                        }`}
                      >
                        {config.defaultRole === "auditor" ? (
                          <Check className="size-3.5 stroke-[3]" />
                        ) : (
                          <div className="size-2 rounded-full bg-[#75786f]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="font-cairo text-[#75786f] text-[13px] leading-[21px] mt-2">
                    الاطلاع على تقارير الأداء المالي، سجلات سداد الملاك، وفواتير ZATCA مع قفل إمكانية تغيير أسعار العقود أو حذف السجلات.
                  </p>
                </div>

                <div className="border-t border-[#e5eae0]/60 pt-3 mt-4 flex items-center justify-end gap-2 text-[#75786f] text-[11px] font-cairo font-medium">
                  <div className="flex items-center gap-1">
                    <FileSpreadsheet className="size-3" />
                    <span>تصدير محاسبي</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Coins className="size-3" />
                    <span>وصول مالي</span>
                  </div>
                </div>
              </div>

              {/* Option 4: Property Manager (مدير عقارات) */}
              <div
                onClick={() => setRole("manager")}
                className={`p-4 rounded-[16px] flex flex-col justify-between cursor-pointer transition-all drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] text-right ${
                  config.defaultRole === "manager"
                    ? "bg-[#f1f5eb] border-2 border-[#34422a]"
                    : "bg-white border border-[#e5eae0] opacity-85 hover:opacity-100 hover:border-[#c5c8bd]"
                }`}
                data-node-id="1:35335"
              >
                <div>
                  <div className="flex items-start justify-between pb-2">
                    {config.defaultRole === "manager" ? (
                      <span className="bg-[#34422a] text-white font-cairo font-bold text-[10px] px-2 py-0.5 rounded-full">
                        افتراضي نشط
                      </span>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end">
                        <span className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                          مدير عقارات (Manager)
                        </span>
                        <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
                          إشراف المحافظ والملاك
                        </span>
                      </div>
                      <div
                        className={`size-6 rounded-full flex items-center justify-center ${
                          config.defaultRole === "manager"
                            ? "bg-[#34422a] text-white"
                            : "bg-[#dfe4db]"
                        }`}
                      >
                        {config.defaultRole === "manager" ? (
                          <Check className="size-3.5 stroke-[3]" />
                        ) : (
                          <div className="size-2 rounded-full bg-[#75786f]" />
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="font-cairo text-[#75786f] text-[13px] leading-[21px] mt-2">
                    إدارة أصول محددة، تسجيل عقود جديدة، وتحديث بيانات الملاك بدون المساس بتهيئة النظام الشاملة أو صلاحيات المشرفين.
                  </p>
                </div>

                <div className="border-t border-[#e5eae0]/60 pt-3 mt-4 flex items-center justify-end gap-2 text-[#75786f] text-[11px] font-cairo font-medium">
                  <div className="flex items-center gap-1">
                    <Lock className="size-3" />
                    <span>إعدادات مقفلة</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Building2 className="size-3" />
                    <span>إدارة عقارية</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. SECTION: Default Access Boundaries (Least Privilege Restraints) */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-6"
            data-node-id="1:35360"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-[#e5eae0] border-b pb-3">
              <span className="bg-[#d8e8cb] text-[#5a6952] font-cairo font-bold text-[11px] px-2.5 py-1 rounded-[6px]">
                5 حواجز أمان نشطة
              </span>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <h2 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                    حدود الوصول الافتراضية (مصفوفة الحماية)
                  </h2>
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    Default Access Boundaries — Least Privilege Enforcement
                  </span>
                </div>
                <div className="bg-[#f1f5eb] size-9 rounded-[10px] flex items-center justify-center text-[#34422a]">
                  <ShieldAlert className="size-5" />
                </div>
              </div>
            </div>

            <p className="font-cairo text-[#75786f] text-[13px] leading-[20px] text-right">
              هذه الصلاحيات الحساسة تكون معطلة افتراضياً بنسبة 100% لأي حساب مستخدم جديد مهما كانت رتبته حتى يتم منحها استثنائياً بواسطة مدير النظام المعتمد.
            </p>

            {/* List of 5 Restraints */}
            <div className="flex flex-col gap-3">
              {/* Restraint 1: Export */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:35375"
              >
                <button
                  type="button"
                  onClick={() => updateField("allowExportReports", !config.allowExportReports)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                    config.allowExportReports ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.allowExportReports ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                <div className="flex gap-3 items-center flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#dfe4db] text-[#ba1a1a] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        معطل افتراضياً (محمي)
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                        السماح بتصدير التقارير والبيانات الافتراضي
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[20px] mt-0.5">
                      منع استخراج وتنزيل ملفات Excel أو CSV أو بيانات الملاك المالية افتراضياً لمنع تسريب قواعد البيانات.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-9 rounded-[12px] flex items-center justify-center text-[#454840] shrink-0">
                    <Download className="size-4" />
                  </div>
                </div>
              </div>

              {/* Restraint 2: Direct Deletion */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:35392"
              >
                <button
                  type="button"
                  onClick={() => updateField("allowDirectDeletion", !config.allowDirectDeletion)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                    config.allowDirectDeletion ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.allowDirectDeletion ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                <div className="flex gap-3 items-center flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#dfe4db] text-[#ba1a1a] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        معطل افتراضياً (محمي)
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                        السماح بالحذف المباشر (العقارات والوحدات)
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[20px] mt-0.5">
                      حظر حذف أي عقار، وحدة، حجز، أو مستند حتى منح الصلاحية الخاصة عبر مذكرة إدارية مسجلة.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-9 rounded-[12px] flex items-center justify-center text-[#454840] shrink-0">
                    <Trash2 className="size-4" />
                  </div>
                </div>
              </div>

              {/* Restraint 3: System Settings */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:35409"
              >
                <button
                  type="button"
                  onClick={() => updateField("allowPlatformSettingsAccess", !config.allowPlatformSettingsAccess)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                    config.allowPlatformSettingsAccess ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.allowPlatformSettingsAccess ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                <div className="flex gap-3 items-center flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#dfe4db] text-[#ba1a1a] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        معطل افتراضياً (محمي)
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                        الوصول لإعدادات النظام والمنصة
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[20px] mt-0.5">
                      حصر صفحات الإعدادات المركزية وتكاملات الـ API والربط السحابي بمديري النظام المعتمدين فقط.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-9 rounded-[12px] flex items-center justify-center text-[#454840] shrink-0">
                    <SlidersHorizontal className="size-4" />
                  </div>
                </div>
              </div>

              {/* Restraint 4: Billing & Finance */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:35426"
              >
                <button
                  type="button"
                  onClick={() => updateField("allowFinancialBillingAccess", !config.allowFinancialBillingAccess)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                    config.allowFinancialBillingAccess ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.allowFinancialBillingAccess ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                <div className="flex gap-3 items-center flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#dfe4db] text-[#ba1a1a] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        معطل افتراضياً (محمي)
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                        الوصول للمدفوعات والفوترة وحسابات ZATCA
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[20px] mt-0.5">
                      حجب بوابات الدفع الإلكتروني، حسابات الإيداع البنكي المباشر، ومسيرات مستحقات الشركاء والمستثمرين.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-9 rounded-[12px] flex items-center justify-center text-[#454840] shrink-0">
                    <CreditCard className="size-4" />
                  </div>
                </div>
              </div>

              {/* Restraint 5: User Management */}
              <div
                className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-4"
                data-node-id="1:35443"
              >
                <button
                  type="button"
                  onClick={() => updateField("allowUserManagementAccess", !config.allowUserManagementAccess)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 cursor-pointer ${
                    config.allowUserManagementAccess ? "bg-[#34422a]" : "bg-[#dfe4db]"
                  }`}
                >
                  <div
                    className={`bg-white size-5 rounded-full shadow-sm transition-transform ${
                      config.allowUserManagementAccess ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>

                <div className="flex gap-3 items-center flex-1 justify-end text-right">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#dfe4db] text-[#ba1a1a] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        معطل افتراضياً (محمي)
                      </span>
                      <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                        إدارة المستخدمين والصلاحيات الفرعية
                      </span>
                    </div>
                    <p className="font-cairo text-[#75786f] text-[13px] leading-[20px] mt-0.5">
                      منع إنشاء، دعوة، تعديل، أو ترقية حسابات المستخدمين الآخرين بدون إذن المشرف العام الأمني.
                    </p>
                  </div>

                  <div className="bg-[#dfe4db] size-9 rounded-[12px] flex items-center justify-center text-[#454840] shrink-0">
                    <UserPlus className="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AUDIT & TELEMETRY SIDE PANEL (4 cols on desktop, on left in RTL) */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          {/* CARD 1: Policy & Security Metric Summary */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4 text-right"
            data-node-id="1:35461"
          >
            <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
              مصفوفة الرقابة المطبقة
            </h3>

            {/* Telemetry Ring Widget */}
            <div
              className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between gap-3"
              data-node-id="1:35466"
            >
              {/* Circular Ring on Left */}
              <div className="relative size-16 flex items-center justify-center shrink-0">
                <svg className="size-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-[#dfe4db]"
                    strokeWidth="5"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-[#34422a]"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray="163.36"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-cairo font-bold text-[#34422a] text-[16px]">
                  100%
                </span>
              </div>

              {/* Text on Right */}
              <div className="flex flex-col items-end">
                <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                  امتثال الحد الأدنى
                </span>
                <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                  (Least Privilege)
                </span>
                <p className="font-cairo text-[#75786f] text-[12px] leading-[18px] mt-1">
                  جميع الحسابات الجديدة تبدأ بصلاحيات صفرية معدومة الضرر.
                </p>
              </div>
            </div>

            {/* Stat Ledger Pills */}
            <div className="flex flex-col gap-2">
              {/* Stat 1 */}
              <div className="bg-[#ebefe6] rounded-[8px] p-2.5 flex items-center justify-between">
                <div className="font-cairo font-bold text-[#181d17] text-[14px]">
                  <span>{config.activeUsersCount} </span>
                  <span className="text-[12px] font-normal">مستخدم</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="font-cairo text-[#181d17] text-[13px]">
                    إجمالي مستخدمي المنصة النشطين
                  </span>
                  <Users className="size-4 text-[#75786f]" />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-[#ebefe6] rounded-[8px] p-2.5 flex items-center justify-between">
                <span className="bg-[#ffdad6] text-[#93000a] font-cairo font-bold text-[11px] px-2.5 py-1 rounded-full">
                  {config.pendingApprovalsCount} حسابات جديدة
                </span>
                <div className="flex items-center gap-2 text-right">
                  <span className="font-cairo text-[#181d17] text-[13px]">
                    بانتظار الاعتماد الإداري
                  </span>
                  <Clock className="size-4 text-[#75786f]" />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-[#ebefe6] rounded-[8px] p-2.5 flex items-center justify-between">
                <div className="font-cairo font-bold text-[#34422a] text-[14px]">
                  {config.mfaCompliancePercent}% <span className="text-[11px] font-medium">(إلزامي)</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="font-cairo text-[#181d17] text-[13px]">
                    نسبة تفعيل المصادقة 2FA
                  </span>
                  <ShieldCheck className="size-4 text-[#75786f]" />
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-[#ebefe6] rounded-[8px] p-2.5 flex items-center justify-between">
                <span className="font-cairo font-bold text-[#181d17] text-[14px]">
                  {config.approvedRolesCount} أدوار
                </span>
                <div className="flex items-center gap-2 text-right">
                  <span className="font-cairo text-[#181d17] text-[13px]">
                    الأدوار القياسية المعتمدة
                  </span>
                  <Award className="size-4 text-[#75786f]" />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Security Audit & Governance Log */}
          <div
            className="bg-white rounded-[16px] p-6 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col gap-4 text-right"
            data-node-id="1:35511"
          >
            <div className="flex items-center justify-end gap-2 border-[#e5eae0] border-b pb-3">
              <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px]">
                سجل الحوكمة والتدقيق
              </h3>
              <ShieldCheck className="size-4 text-[#34422a]" />
            </div>

            <div className="flex flex-col gap-3">
              {/* Item 1 */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[13px]">
                    آخر تحديث لهذه القواعد :
                  </span>
                  <p className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                    {config.lastUpdated} — بواسطة مدير المنصة ({config.updatedBy})
                  </p>
                </div>
                <div className="size-2 rounded-full bg-[#34422a] mt-1.5 shrink-0" />
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[13px]">
                    مُعرّف السياسة الأمنية:
                  </span>
                  <span className="bg-[#ebefe6] text-[#34422a] font-cairo font-medium text-[12px] px-2 py-0.5 rounded-[4px] mt-0.5">
                    {config.policyId}
                  </span>
                </div>
                <div className="size-2 rounded-full bg-[#75786f] mt-1.5 shrink-0" />
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-2.5 justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-cairo font-semibold text-[#181d17] text-[13px]">
                    التشفير والامتثال:
                  </span>
                  <p className="font-cairo text-[#75786f] text-[13px] leading-[20px]">
                    معتمد ومطابق لضوابط الأمن السيبراني الأساسية {config.complianceStandard}
                  </p>
                </div>
                <div className="size-2 rounded-full bg-[#34422a] mt-1.5 shrink-0" />
              </div>
            </div>

            {/* Compliance Seal at Bottom */}
            <div className="border-t border-[#e5eae0] pt-3 flex items-center justify-between text-[#75786f] text-[11px] font-cairo font-medium">
              <span>إصدار السياسة: v4.2</span>
              <div className="flex items-center gap-1.5">
                <span>مشفّر ومؤمّن SHA-256</span>
                <Lock className="size-3 text-[#34422a]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PERSISTENT ACTION TOOLBAR */}
      <DockingBottomBar
        innerClassName="w-full bg-white/95 backdrop-blur-[6px] rounded-[16px] p-4 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border border-[#EBEBEB] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Buttons on Left in RTL */}
        <div className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1">
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#4b5940] hover:bg-[#3d4934] text-white px-8 py-2.5 rounded-[12px] font-cairo font-medium text-[14px] flex items-center justify-center gap-2 transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] cursor-pointer flex-1 sm:flex-none"
            data-node-id="1:35141"
          >
            <span>حفظ التغييرات</span>
            <Save className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-[#ebefe6] hover:bg-[#e0e5db] text-[#181d17] px-6 py-2.5 rounded-[12px] font-cairo font-normal text-[14px] transition-colors drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] cursor-pointer flex-1 sm:flex-none"
            data-node-id="1:35146"
          >
            الغاء
          </button>
        </div>

        {/* Security Notice on Right in RTL */}
        <div className="flex items-center gap-2.5 order-1 sm:order-2 text-right">
          <p className="font-cairo text-[#454840] text-[12px] leading-[18px]">
            <span>تسري هذه الضوابط التلقائية على كافة الحسابات المنشأة حديثاً عبر لوحة الإدارة أو الدعوات </span>
            <span className="font-semibold">البريدية.</span>
          </p>
          <div className="bg-[#f1f5eb] size-8 rounded-[8px] flex items-center justify-center text-[#34422a] shrink-0">
            <ShieldCheck className="size-4" />
          </div>
        </div>
      </DockingBottomBar>
    </div>
  );
}
