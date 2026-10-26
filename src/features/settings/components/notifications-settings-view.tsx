"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  SlidersHorizontal,
  Lock,
  Laptop,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
  Check,
  X,
  Calendar,
  Sparkles,
  ShieldAlert,
  Radio,
  Clock,
  Save,
  RotateCcw,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  useNotificationsSettings,
  NOTIFICATION_GATEWAYS,
  DAILY_CONSUMPTION_STATS,
} from "../controllers/use-notifications-settings";
import { NotificationChannel, NotificationCategory } from "../types";
import { DockingBottomBar } from "@/components/shared/docking-bottom-bar";

export function NotificationsSettingsView() {
  const {
    config,
    activeCategory,
    setActiveCategory,
    filteredEvents,
    counts,
    isDirty,
    toggleChannel,
    updateGovernanceOption,
    handleSave,
    handleReset,
  } = useNotificationsSettings();

  // Channel column definitions
  const CHANNELS: { id: NotificationChannel; label: string; icon: React.ElementType }[] = [
    { id: "in_app", label: "داخل النظام", icon: Laptop },
    { id: "email", label: "البريد الإلكتروني", icon: Mail },
    { id: "whatsapp", label: "واتساب", icon: MessageSquare },
    { id: "sms", label: "رسائل نصية", icon: Phone },
    { id: "push", label: "تطبيق الجوال", icon: Smartphone },
  ];

  // Group definitions for visual headers in the matrix
  const groups: {
    key: "bookings" | "operations" | "platform";
    title: string;
    icon: React.ElementType;
    countLabel: string;
  }[] = [
    {
      key: "bookings",
      title: "أ) أحداث الحجوزات والنزلاء",
      icon: Calendar,
      countLabel: "6 أحداث",
    },
    {
      key: "operations",
      title: "ب) أحداث العمليات والتشغيل الميداني",
      icon: Sparkles,
      countLabel: "4 أحداث",
    },
    {
      key: "platform",
      title: "ج) أحداث المنصة وحوكمة النظام",
      icon: ShieldAlert,
      countLabel: "3 أحداث",
    },
  ];

  return (
    <div
      className="content-stretch flex flex-col items-start relative w-full pb-24 space-y-6"
      dir="rtl"
      data-node-id="1:32061"
      data-name="إعدادات الإشعارات"
    >
      {/* SECTION 0: TOP HERO GREETING BAR */}
      <div
        className="w-full bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-6 border border-[#EBEBEB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        data-node-id="1:32063"
        data-name="Section - TOP HERO GREETING BAR"
      >
        <div className="flex flex-col items-start gap-1">
          <h1
            className="font-cairo font-bold text-[#181d17] text-[24px] leading-[34px]"
            data-node-id="1:32071"
          >
            إعدادات الإشعارات
          </h1>
          <p
            className="font-cairo font-normal text-[#454840] text-[14px] leading-[22px]"
            data-node-id="1:32067"
          >
            تحديد وضبط الأحداث التشغيلية التي تولد إشعارات فورية وتوزيعها عبر قنوات الإرسال المعتمدة على مستوى المنصة.
          </p>
        </div>

        <Link
          href="/settings"
          className="bg-[#f1f5eb] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex gap-2 items-center justify-center px-4 py-2.5 rounded-[12px] text-[#181d17] font-cairo font-semibold text-[14px] hover:bg-[#e4ebdc] transition-colors shrink-0 cursor-pointer"
          data-node-id="1:32072"
        >
          <span>العودة إلى الإعدادات</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Main 2-Column Responsive Layout (8 cols primary, 4 cols telemetry) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* PRIMARY COLUMN (8 Cols in RTL - Main Settings & Matrix Table) */}
        <div
          className="lg:col-span-8 flex flex-col gap-6 w-full"
          data-node-id="1:32078"
          data-name="Main Matrix & Settings Column"
        >
          {/* CARD 1: Owner Governance Card */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] p-6 flex flex-col gap-5"
            data-node-id="1:32079"
            data-name="Section - Owner Governance Card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="text-[#34422a]">
                  <SlidersHorizontal className="size-5" />
                </div>
                <h2 className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]">
                  التفضيلات الافتراضية وحوكمة الملاك
                </h2>
              </div>
              <span className="bg-[#e5eae0] text-[#454840] font-cairo font-medium text-[12px] px-3 py-1 rounded-full">
                2 ضوابط نشطة
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Toggle Row 1: Allow owners custom notifications */}
              <div
                className="flex items-start justify-between gap-4 p-4 rounded-[12px] bg-[#fdfefd] border border-[#f0f3ed] hover:border-[#e2e8de] transition-colors"
                data-node-id="1:32089"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-cairo font-semibold text-[#181d17] text-[15px] leading-[24px]">
                    سماح لأصحاب العقارات بتخصيص إعدادات الإشعارات الخاصة بهم
                  </span>
                  <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
                    عند تفعيل هذا الخيار، يُتاح لملاك العقارات تخصيص قنوات التنبيه في لوحاتهم الخاصة ضمن الحدود المعيارية المعتمدة للمنصة دون المساس بإشعارات الأمان والامتثال.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={config.allowOwnersCustomizeNotifications}
                  onClick={() =>
                    updateGovernanceOption(
                      "allowOwnersCustomizeNotifications",
                      !config.allowOwnersCustomizeNotifications
                    )
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    config.allowOwnersCustomizeNotifications ? "bg-[#34422a]" : "bg-[#d1d5db]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      config.allowOwnersCustomizeNotifications ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle Row 2: Mandatory emergency & safety */}
              <div
                className="flex items-start justify-between gap-4 p-4 rounded-[12px] bg-[#fdfefd] border border-[#f0f3ed] hover:border-[#e2e8de] transition-colors"
                data-node-id="1:32097"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-cairo font-semibold text-[#181d17] text-[15px] leading-[24px]">
                      إلزامية إشعار الأمان والطوارئ عبر كافة القنوات (SMS / Push)
                    </span>
                    <Lock className="size-3.5 text-[#34422a]" />
                  </div>
                  <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
                    يضمن هذا الإجراء إرسال تنبيهات الإخلاء، خروقات الحماية، وحالات التعدي عبر الرسائل النصية القصيرة والإشعارات الفورية بغض النظر عن تفضيلات المستأجر أو المالك.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={config.mandatoryEmergencyAndSafetyAlerts}
                  onClick={() =>
                    updateGovernanceOption(
                      "mandatoryEmergencyAndSafetyAlerts",
                      !config.mandatoryEmergencyAndSafetyAlerts
                    )
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    config.mandatoryEmergencyAndSafetyAlerts ? "bg-[#34422a]" : "bg-[#d1d5db]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      config.mandatoryEmergencyAndSafetyAlerts ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* CARD 2: Matrix Table Card */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] overflow-hidden flex flex-col"
            data-node-id="1:32108"
            data-name="Section - Matrix Table Card"
          >
            {/* Header: Title + Category Pills */}
            <div className="p-6 border-b border-[#e5eae0] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <div className="text-[#34422a]">
                    <Bell className="size-5" />
                  </div>
                  <h2 className="font-cairo font-semibold text-[#181d17] text-[20px] leading-[30px]">
                    مصفوفة أحداث النظام وقنوات الإرسال
                  </h2>
                </div>
                <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
                  تكوين استجابة الأحداث عبر 5 قنوات رئيسية لـ 13 حدثاً نظامياً
                </p>
              </div>

              {/* Quick Category Filter Pills */}
              <div
                className="bg-[#f6f9f3] p-1.5 rounded-[14px] flex items-center gap-1 border border-[#e5eae0] shrink-0"
                data-node-id="1:32110"
              >
                {(
                  [
                    { id: "all", label: `الكل (${counts.all})` },
                    { id: "bookings", label: `الحجوزات (${counts.bookings})` },
                    { id: "operations", label: `التشغيل (${counts.operations})` },
                    { id: "platform", label: `المنصة (${counts.platform})` },
                  ] as { id: NotificationCategory; label: string }[]
                ).map((pill) => {
                  const isSelected = activeCategory === pill.id;
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setActiveCategory(pill.id)}
                      className={`px-3 py-1.5 rounded-[10px] font-cairo text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#34422a] text-white shadow-sm"
                          : "text-[#454840] hover:bg-[#e8ede4] hover:text-[#181d17]"
                      }`}
                    >
                      {pill.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Matrix Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#fbfcf9] border-b border-[#e5eae0] text-[#454840]">
                    <th className="py-4 px-6 font-cairo font-semibold text-[13px] w-[35%]">
                      الحدث التشغيلي / الفئة
                    </th>
                    {CHANNELS.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <th
                          key={channel.id}
                          className="py-4 px-3 font-cairo font-semibold text-[12px] text-center w-[13%]"
                        >
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <Icon className="size-4 text-[#34422a]" />
                            <span className="whitespace-nowrap">{channel.label}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {groups.map((grp) => {
                    // Check if any events for this group exist under current filter
                    const groupEvents = filteredEvents.filter((e) => e.category === grp.key);
                    if (groupEvents.length === 0) return null;

                    const GroupIcon = grp.icon;

                    return (
                      <React.Fragment key={grp.key}>
                        {/* Group Header Row */}
                        <tr className="bg-[#f4f7f0] border-y border-[#e2e8de]">
                          <td colSpan={6} className="py-2.5 px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <GroupIcon className="size-4 text-[#34422a]" />
                                <span className="font-cairo font-bold text-[#181d17] text-[13px]">
                                  {grp.title}
                                </span>
                              </div>
                              <span className="bg-[#e5eae0] text-[#34422a] font-cairo font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                                {grp.countLabel}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {/* Event Rows */}
                        {groupEvents.map((event) => {
                          const eventChannels = config.events[event.id] || event.defaultChannels;

                          return (
                            <tr
                              key={event.id}
                              className="border-b border-[#f0f3ed] hover:bg-[#fafbf9] transition-colors"
                            >
                              {/* Event Name & Description */}
                              <td className="py-4 px-6 align-middle">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-cairo font-semibold text-[#181d17] text-[14px]">
                                      {event.name}
                                    </span>
                                    {event.badge && (
                                      <span className="bg-[#fee2e2] text-[#dc2626] font-cairo font-bold text-[10px] px-2 py-0.5 rounded-full">
                                        {event.badge.text}
                                      </span>
                                    )}
                                  </div>
                                  <p className="font-cairo font-normal text-[#75786f] text-[12px] leading-[18px]">
                                    {event.description}
                                  </p>
                                </div>
                              </td>

                              {/* Channel Toggle Buttons */}
                              {CHANNELS.map((channel) => {
                                const isEnabled = eventChannels[channel.id];

                                return (
                                  <td
                                    key={channel.id}
                                    className="py-4 px-3 text-center align-middle"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => toggleChannel(event.id, channel.id)}
                                      title={`${isEnabled ? "تعطيل" : "تفعيل"} ${channel.label} لـ ${event.name}`}
                                      className={`size-10 rounded-[12px] inline-flex items-center justify-center transition-all cursor-pointer ${
                                        isEnabled
                                          ? "bg-[#d8e8c7] text-[#34422a] hover:bg-[#cbe0b7] shadow-sm"
                                          : "bg-[#ebefe6] text-[#75786f] hover:bg-[#dfe4da]"
                                      }`}
                                    >
                                      {isEnabled ? (
                                        <Check className="size-4 stroke-[2.5]" />
                                      ) : (
                                        <X className="size-4 stroke-[2.5]" />
                                      )}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECONDARY TELEMETRY COLUMN (4 Cols in RTL - Delivery Gateways & Analytics) */}
        <div
          className="lg:col-span-4 flex flex-col gap-6 w-full"
          data-node-id="1:32518"
          data-name="Right Column (Operational Telemetry & Gateways Status)"
        >
          {/* CARD 1: Gateways Delivery Status */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] p-6 flex flex-col gap-5"
            data-node-id="1:32519"
            data-name="Card 1: Gateways Delivery Status"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-[#34422a]">
                  <Radio className="size-5" />
                </div>
                <h3 className="font-cairo font-semibold text-[#181d17] text-[18px]">
                  حالة بوابات الإرسال
                </h3>
              </div>
              <div className="flex items-center gap-1.5 bg-[#eaf3e3] px-2.5 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]" />
                </span>
                <span className="font-cairo font-semibold text-[#34422a] text-[11px]">
                  مباشر
                </span>
              </div>
            </div>

            <p className="font-cairo font-normal text-[#75786f] text-[13px] leading-[20px]">
              تكامل مباشر وموثوق مع مزودي البث المحليين والدوليين مع تكرار تشغيلي (Failover) لحظي.
            </p>

            {/* Gateway Items List */}
            <div className="flex flex-col gap-3">
              {NOTIFICATION_GATEWAYS.map((gw) => {
                let GatewayIcon = Smartphone;
                if (gw.id === "whatsapp") GatewayIcon = MessageSquare;
                if (gw.id === "email") GatewayIcon = Mail;
                if (gw.id === "sms") GatewayIcon = Phone;

                return (
                  <div
                    key={gw.id}
                    className="p-3.5 rounded-[12px] bg-[#fbfcf9] border border-[#f0f3ed] flex items-center justify-between gap-3 hover:border-[#dfe5da] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-[10px] bg-[#f1f5eb] text-[#34422a] flex items-center justify-center shrink-0">
                        <GatewayIcon className="size-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-cairo font-semibold text-[#181d17] text-[13px] leading-[18px]">
                          {gw.name}
                        </span>
                        <span className="font-cairo font-normal text-[#75786f] text-[11px] leading-[16px]">
                          {gw.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="bg-[#d8e8cb] text-[#34422a] font-cairo font-semibold text-[11px] px-2 py-0.5 rounded-[6px]">
                        {gw.statusLabel}
                      </span>
                      <span className="font-cairo font-medium text-[#454840] text-[11px] dir-ltr text-right">
                        {gw.metric}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CARD 2: Daily Volume Telemetry & Chart */}
          <div
            className="bg-white rounded-[16px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#EBEBEB] p-6 flex flex-col gap-5"
            data-node-id="1:32596"
            data-name="Card 2: Daily Volume Telemetry & Chart"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-[#34422a]">
                  <Calendar className="size-5" />
                </div>
                <h3 className="font-cairo font-semibold text-[#181d17] text-[18px]">
                  الاستهلاك اليومي للقنوات
                </h3>
              </div>
              <span className="font-cairo font-medium text-[#75786f] text-[12px]">
                {DAILY_CONSUMPTION_STATS.dateLabel}
              </span>
            </div>

            {/* Total Metric Header */}
            <div className="flex flex-col gap-1 p-4 rounded-[12px] bg-[#f7faf4] border border-[#e5eae0]">
              <span className="font-cairo font-bold text-[#181d17] text-[28px] leading-[36px]">
                {DAILY_CONSUMPTION_STATS.total}
              </span>
              <p className="font-cairo font-normal text-[#75786f] text-[12px] leading-[18px]">
                {DAILY_CONSUMPTION_STATS.description}
              </p>
            </div>

            {/* Donut Chart Visual Representation & Stats */}
            <div className="flex flex-col items-center gap-5 pt-2">
              {/* SVG Donut */}
              <div className="relative size-36 flex items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#ebefe6"
                    strokeWidth="12"
                  />
                  {/* Segment 1: In-App (57%) -> circumference = 251.3 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#34422a"
                    strokeWidth="12"
                    strokeDasharray="251.3"
                    strokeDashoffset={251.3 * (1 - 0.57)}
                    strokeLinecap="round"
                  />
                  {/* Segment 2: WhatsApp (22%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#54624c"
                    strokeWidth="12"
                    strokeDasharray="251.3"
                    strokeDashoffset={251.3 * (1 - 0.22)}
                    transform="rotate(205 50 50)"
                    strokeLinecap="round"
                  />
                  {/* Segment 3: Push (16%) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#75866b"
                    strokeWidth="12"
                    strokeDasharray="251.3"
                    strokeDashoffset={251.3 * (1 - 0.16)}
                    transform="rotate(284 50 50)"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Donut Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-cairo font-bold text-[#181d17] text-[20px] leading-tight">
                    57%
                  </span>
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    داخل النظام
                  </span>
                </div>
              </div>

              {/* Breakdown Legend Rows */}
              <div className="w-full flex flex-col gap-2.5">
                {DAILY_CONSUMPTION_STATS.channels.map((ch) => (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between text-xs py-1 border-b border-[#f3f6f1] last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: ch.color }}
                      />
                      <span className="font-cairo font-medium text-[#181d17]">
                        {ch.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-cairo font-semibold text-[#181d17]">
                        {ch.count}
                      </span>
                      <span className="font-cairo font-normal text-[#75786f] min-w-[32px] text-left">
                        ({ch.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOCKING BOTTOM ACTION TOOLBAR */}
      <DockingBottomBar
        innerClassName="bg-white/95 backdrop-blur-[6px] border border-[#e5eae0] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Left Side in RTL: Buttons */}
        <div className="flex items-center gap-3 order-2 sm:order-1 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty}
            className={`font-cairo font-semibold text-sm px-6 py-2.5 rounded-[12px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isDirty
                ? "bg-[#34422a] hover:bg-[#283320] text-white shadow-md"
                : "bg-[#e5eae0] text-[#75786f] cursor-not-allowed"
            }`}
          >
            <Save className="size-4" />
            <span>حفظ التغييرات</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={!isDirty}
            className={`font-cairo font-semibold text-sm px-5 py-2.5 rounded-[12px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isDirty
                ? "bg-[#ebefe6] hover:bg-[#dfe4da] text-[#181d17]"
                : "bg-[#f5f7f3] text-[#a0a59b] cursor-not-allowed"
            }`}
          >
            <RotateCcw className="size-4" />
            <span>إلغاء التعديلات</span>
          </button>
        </div>

        {/* Right Side in RTL: Audit Informational Text */}
        <div className="flex items-center gap-2 text-[#75786f] order-1 sm:order-2">
          <Clock className="size-4 shrink-0 text-[#75786f]" />
          <p className="font-cairo font-normal text-xs sm:text-sm">
            آخر تحديث: 5 أكتوبر 2026 — بواسطة مدير النظام (محمد أحمد)
          </p>
        </div>
      </DockingBottomBar>
    </div>
  );
}
