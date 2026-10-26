"use client";

import React from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  Server,
  Globe,
  CalendarDays,
  Wrench,
  KeyRound,
  Bell,
  MessageSquare,
  Network,
  CreditCard,
  ShieldCheck,
  Users2,
  History,
  ArrowLeft,
  LucideIcon,
} from "lucide-react";

interface SettingCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant: "green" | "blue" | "gray";
  };
  href?: string;
  dataNodeId?: string;
}

function SettingCard({
  title,
  description,
  icon: Icon,
  badge,
  href,
  dataNodeId,
}: SettingCardProps) {
  const content = (
    <div
      className="bg-white border border-[rgba(197,200,189,0.6)] rounded-[16px] p-6 flex flex-col justify-between h-full hover:shadow-md transition-all duration-200 group text-right cursor-pointer"
      data-node-id={dataNodeId}
    >
      <div className="space-y-4">
        {/* Top row: Badge and Icon */}
        <div className="flex items-center justify-between">
          {badge ? (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold font-cairo ${
                badge.variant === "green"
                  ? "bg-[#eaf1e8] text-[#3e8a5a]"
                  : badge.variant === "blue"
                  ? "bg-[#eef4ff] text-[#4e7cc7]"
                  : "bg-[#ebefe6] text-[#454840]"
              }`}
            >
              <span>{badge.text}</span>
              <span
                className={`size-1.5 rounded-full ${
                  badge.variant === "green"
                    ? "bg-[#3e8a5a]"
                    : badge.variant === "blue"
                    ? "bg-[#4e7cc7]"
                    : "bg-[#75786f]"
                }`}
              />
            </div>
          ) : (
            <div />
          )}

          <div className="bg-[rgba(216,232,203,0.6)] rounded-[12px] size-11 flex items-center justify-center text-[#34422a] group-hover:bg-[#d8e8cb] transition-colors">
            <Icon className="size-5" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <h3 className="font-cairo font-bold text-[#181d17] text-[18px] leading-[28px] group-hover:text-[#34422a] transition-colors">
            {title}
          </h3>
          <p className="font-cairo text-[#454840] text-[14px] leading-[22.75px]">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom arrow line */}
      <div className="border-t border-[rgba(229,234,224,0.6)] pt-2.5 mt-5 flex items-center justify-start">
        <div className="size-3.5 text-[#75786f] group-hover:text-[#34422a] group-hover:-translate-x-1 transition-all">
          <ArrowLeft className="size-3.5" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

export function SettingsOverviewView() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-16 space-y-8"
      dir="rtl"
      data-node-id="1:28982"
      data-name="الإعدادات"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB]"
        data-node-id="1:28984"
      >
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]">
            الإعدادات
          </h1>
          <p className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]">
            إدارة إعدادات المنصة وقواعد التشغيل والتكاملات والأمان لضمان استقرار العمليات.
          </p>
        </div>
      </div>

      {/* SECTION 1: Platform Configuration (إعدادات المنصة) */}
      <div className="w-full space-y-4" data-node-id="1:28993">
        <div className="flex items-center justify-between">
          <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
            3 أقسام إدارية
          </span>
          <div className="flex items-center gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              إعدادات المنصة
            </h2>
            <div className="bg-[#4b5940] h-6 w-1.5 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SettingCard
            title="الإعدادات العامة"
            description="إعدادات هوية المنصة، الشعار، النطاقات الرسمية، وسياسات الخدمة والخصوصية."
            icon={SlidersHorizontal}
            badge={{ text: "مكتملة التهيئة", variant: "green" }}
            href="/settings/general"
            dataNodeId="1:29039"
          />
          <SettingCard
            title="إعدادات المنصة"
            description="خيارات النشر السحابي، سعة المحافظ، فترات التجربة المجانية، والحدود التشغيلية العامة."
            icon={Server}
            badge={{ text: "محدث • الإصدار 2.4.0", variant: "blue" }}
            href="/settings/platform"
            dataNodeId="1:29021"
          />
          <SettingCard
            title="اللغة والمنطقة"
            description="اللغة الافتراضية (العربية)، تنسيق التواريخ الهجرية والميلادية، وتوقيت الرياض (GMT+3)."
            icon={Globe}
            badge={{ text: "العربية (RTL) • الرياض", variant: "gray" }}
            dataNodeId="1:29002"
          />
        </div>
      </div>

      {/* SECTION 2: Operations Management (إدارة التشغيل) */}
      <div className="w-full space-y-4" data-node-id="1:29057">
        <div className="flex items-center justify-between">
          <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
            4 أقسام إدارية
          </span>
          <div className="flex items-center gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              إدارة التشغيل
            </h2>
            <div className="bg-[#4b5940] h-6 w-1.5 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SettingCard
            title="إعدادات الحجوزات"
            description="سياسات تأكيد الحجز الآلي، نوافذ الإلغاء، معايير التحقق من توافر الوحدات ومنع التعارض."
            icon={CalendarDays}
            badge={{ text: "قواعد موحدة", variant: "green" }}
            href="/settings/booking"
            dataNodeId="1:29112"
          />
          <SettingCard
            title="إعدادات التشغيل"
            description="قواعد إسناد مهام النظافة التلقائية بعد المغادرة، معايير بلاغات الصيانة الطارئة."
            icon={Wrench}
            badge={{ text: "أتمتة ذكية", variant: "green" }}
            href="/settings/operations"
            dataNodeId="1:29096"
          />
          <SettingCard
            title="إعدادات أكواد الدخول"
            description="قواعد توليد أكواد الأقفال الذكية، مدة صلاحية كود النزيل، وآليات التشفير السحابي."
            icon={KeyRound}
            href="/settings/access-codes"
            dataNodeId="1:29081"
          />
          <SettingCard
            title="الإشعارات"
            description="تنبيهات المنصة الإدارية، إشعارات البريد والرسائل النصية SMS للفواتير والعمليات الهامة."
            icon={Bell}
            badge={{ text: "مصفوفة الأحداث", variant: "green" }}
            href="/settings/notifications"
            dataNodeId="1:29066"
          />
        </div>
      </div>

      {/* SECTION 3: Integrations & Services (التكاملات والخدمات) */}
      <div className="w-full space-y-4" data-node-id="1:29128">
        <div className="flex items-center justify-between">
          <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
            3 أقسام تكاملية
          </span>
          <div className="flex items-center gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              التكاملات والخدمات
            </h2>
            <div className="bg-[#4b5940] h-6 w-1.5 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SettingCard
            title="WhatsApp"
            description="إدارة اتصال WhatsApp Business Cloud API وإعدادات إرسال الرسائل والقوالب المعتمدة."
            icon={MessageSquare}
            badge={{ text: "متصل • Meta Cloud API", variant: "green" }}
            href="/settings/whatsapp"
            dataNodeId="1:29173"
          />
          <SettingCard
            title="التكاملات"
            description="ربط قنوات الحجز (Booking.com, Airbnb)، مزامنة iCal، والربط الحكومي الموحد (بلدي، شموس)."
            icon={Network}
            badge={{ text: "3 قنوات متصلة", variant: "blue" }}
            href="/settings/integrations"
            dataNodeId="1:29155"
          />
          <SettingCard
            title="الدفع والفوترة"
            description="بوابات الدفع الإلكتروني (مدى، Apple Pay)، والربط مع منظومة الفوترة (ZATCA المرحلة 2)."
            icon={CreditCard}
            badge={{ text: "معتمد ZATCA • نشط", variant: "green" }}
            href="/settings/billing"
            dataNodeId="1:29137"
          />
        </div>
      </div>

      {/* SECTION 4: Security & Governance (الأمان والإدارة) */}
      <div className="w-full space-y-4" data-node-id="1:29191">
        <div className="flex items-center justify-between">
          <span className="font-cairo font-medium text-[#75786f] text-[11px] leading-[16px]">
            3 أقسام حوكمة
          </span>
          <div className="flex items-center gap-2">
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[30px]">
              الأمان والإدارة
            </h2>
            <div className="bg-[#4b5940] h-6 w-1.5 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SettingCard
            title="الأمان"
            description="إعدادات المصادقة الثنائية (2FA)، سياسات كلمات المرور، وإدارة الجلسات وسجلات الدخول المشبوهة."
            icon={ShieldCheck}
            href="/settings/security"
            dataNodeId="1:29230"
          />
          <SettingCard
            title="المستخدمون والصلاحيات"
            description="إدارة حسابات مديري المنصة، الأدوار الوظيفية (Role-based RBAC)، ومصفوفة الصلاحيات."
            icon={Users2}
            dataNodeId="1:29215"
          />
          <SettingCard
            title="السجل والنشاط"
            description="سجل التدقيق الشامل (Audit Trail) لكافة التعديلات الإدارية على إعدادات المنصة وحسابات الملاك."
            icon={History}
            href="/activity"
            dataNodeId="1:29200"
          />
        </div>
      </div>
    </div>
  );
}
