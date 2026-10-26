"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  NotificationsSettingsState,
  NotificationCategory,
  NotificationChannel,
  NotificationEventDefinition,
  NotificationGatewayStatus,
} from "../types";

export const NOTIFICATION_EVENTS: NotificationEventDefinition[] = [
  // Group A: أحداث الحجوزات والنزلاء
  {
    id: "booking_new",
    name: "حجز جديد مؤكد",
    description: "إشعار النزيل والمالك فور سداد الحجز وتأكيد التوفر",
    category: "bookings",
    defaultChannels: { in_app: true, email: true, whatsapp: true, sms: false, push: true },
  },
  {
    id: "booking_modified",
    name: "تعديل حجز",
    description: "تعديل التواريخ أو عدد النزلاء أو الخدمات الإضافية",
    category: "bookings",
    defaultChannels: { in_app: true, email: true, whatsapp: true, sms: false, push: true },
  },
  {
    id: "booking_cancelled",
    name: "إلغاء حجز",
    description: "إلغاء من قبل النزيل أو الإدارة مع تطبيق سياسة الإلغاء",
    category: "bookings",
    defaultChannels: { in_app: true, email: true, whatsapp: true, sms: true, push: true },
  },
  {
    id: "checkin_reminder_24h",
    name: "اقتراب موعد الوصول (Check-in T-24h)",
    description: "تذكير النزيل بالوصول وإرسال تعليمات الدخول الذكي وتحديد الموقع",
    category: "bookings",
    defaultChannels: { in_app: true, email: false, whatsapp: true, sms: false, push: true },
  },
  {
    id: "checkout_reminder_4h",
    name: "اقتراب موعد المغادرة (Check-out T-4h)",
    description: "تذكير بموعد الخروج وإجراءات تسليم المفتاح أو إغلاق القفل الذكي",
    category: "bookings",
    defaultChannels: { in_app: true, email: false, whatsapp: true, sms: false, push: true },
  },
  {
    id: "booking_completed",
    name: "انتهاء الحجز وإغلاق الملف",
    description: "إرسال استبيان تقييم الإقامة ودعوة النزيل للتقييم على المنصة",
    category: "bookings",
    defaultChannels: { in_app: true, email: true, whatsapp: false, sms: false, push: true },
  },

  // Group B: أحداث العمليات والتشغيل الميداني
  {
    id: "cleaning_task_created",
    name: "إنشاء مهمة تنظيف دورية أو طارئة",
    description: "إسناد تلقائي لفرق التنظيف فور خروج النزيل أو طلب يدوي",
    category: "operations",
    defaultChannels: { in_app: true, email: false, whatsapp: true, sms: false, push: true },
  },
  {
    id: "maintenance_ticket_created",
    name: "إنشاء بلاغ صيانة ومرافق",
    description: "إشعار الفنيين بمشكلة سباكة، كهرباء أو أجهزة داخل الوحدة",
    category: "operations",
    defaultChannels: { in_app: true, email: true, whatsapp: true, sms: true, push: true },
  },
  {
    id: "cleaning_completed",
    name: "اكتمال التنظيف واعتماد الجاهزية",
    description: "تغيير حالة الوحدة إلى 'جاهزة للنزول' ورفع التقرير المصور",
    category: "operations",
    defaultChannels: { in_app: true, email: false, whatsapp: false, sms: false, push: true },
  },
  {
    id: "maintenance_completed",
    name: "اكتمال الصيانة والفحص الفني",
    description: "إرفاق تقرير التكلفة، الفاتورة وإلغاء حظر الحجز إن وجد",
    category: "operations",
    defaultChannels: { in_app: true, email: true, whatsapp: false, sms: false, push: true },
  },

  // Group C: أحداث المنصة وحوكمة النظام
  {
    id: "ota_sync_failure",
    name: "فشل مزامنة الأسعار أو التوفر",
    description: "تعثر التزامن مع Booking.com أو Airbnb مما قد يسبب حجزاً مزدوجاً",
    category: "platform",
    badge: { text: "حرج للغاية", variant: "critical" },
    defaultChannels: { in_app: true, email: true, whatsapp: true, sms: true, push: true },
  },
  {
    id: "subscription_expiry_reminder",
    name: "اقتراب انتهاء اشتراك المالك (Subscription Expiry)",
    description: "تنبيه قبل 15 يوماً من تجديد الباقة السنوية للمالك",
    category: "platform",
    defaultChannels: { in_app: true, email: true, whatsapp: true, sms: true, push: true },
  },
  {
    id: "payment_charge_failure",
    name: "فشل تحصيل الدفع أو البطاقة الائتمانية",
    description: "تعثر تسوية عمولة منصة أو مدفوعات بوابة الدفع الإلكتروني",
    category: "platform",
    badge: { text: "مالي حرج", variant: "critical" },
    defaultChannels: { in_app: true, email: true, whatsapp: true, sms: true, push: true },
  },
];

export const NOTIFICATION_GATEWAYS: NotificationGatewayStatus[] = [
  {
    id: "push",
    name: "مزود Push (APNs / FCM)",
    subtitle: "Apple APNs & Google FCM",
    status: "connected",
    statusLabel: "متصل",
    metric: "99.98% نجاح",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business API",
    subtitle: "Meta Cloud Platform",
    status: "active",
    statusLabel: "نشط",
    metric: "1.2 ث استجابة",
  },
  {
    id: "email",
    name: "خوادم البريد (SMTP)",
    subtitle: "Dedicated Cluster",
    status: "verified",
    statusLabel: "موثق",
    metric: "SPF / DKIM ساري",
  },
  {
    id: "sms",
    name: "الرسائل النصية المحلية",
    subtitle: "Saudi Telecom (CITC)",
    status: "certified",
    statusLabel: "معتمد",
    metric: "مرسل: EBARQ",
  },
];

export const DAILY_CONSUMPTION_STATS = {
  total: "24,812",
  dateLabel: "اليوم 2026-10-18",
  description: "إجمالي التنبيهات المرسلة خلال الـ 24 ساعة الماضية",
  channels: [
    { id: "in_app", name: "داخل النظام", count: "14,208", percentage: 57, color: "#34422a" },
    { id: "whatsapp", name: "واتساب", count: "5,420", percentage: 22, color: "#54624c" },
    { id: "push", name: "تطبيق الجوال", count: "3,910", percentage: 16, color: "#75866b" },
    { id: "email", name: "البريد الإلكتروني", count: "1,120", percentage: 4.5, color: "#a3b398" },
    { id: "sms", name: "رسائل نصية", count: "162", percentage: 0.5, color: "#d8e8cb" },
  ],
};

export function useNotificationsSettings() {
  const initialData: NotificationsSettingsState = {
    allowOwnersCustomizeNotifications: true,
    mandatoryEmergencyAndSafetyAlerts: true,
    events: NOTIFICATION_EVENTS.reduce((acc, event) => {
      acc[event.id] = { ...event.defaultChannels };
      return acc;
    }, {} as Record<string, NotificationEventDefinition["defaultChannels"]>),
    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [config, setConfig] = useState<NotificationsSettingsState>(initialData);
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>("all");
  const [isDirty, setIsDirty] = useState(false);

  // Toggle individual channel on an event
  const toggleChannel = (eventId: string, channel: NotificationChannel) => {
    setConfig((prev) => {
      const currentEventChannels = prev.events[eventId] || {
        in_app: false,
        email: false,
        whatsapp: false,
        sms: false,
        push: false,
      };

      const updated = {
        ...prev,
        events: {
          ...prev.events,
          [eventId]: {
            ...currentEventChannels,
            [channel]: !currentEventChannels[channel],
          },
        },
      };

      return updated;
    });
    setIsDirty(true);
  };

  // Toggle governance boolean options
  const updateGovernanceOption = (
    key: "allowOwnersCustomizeNotifications" | "mandatoryEmergencyAndSafetyAlerts",
    value: boolean
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
    setIsDirty(true);
  };

  // Filtered events based on active category pill
  const filteredEvents = useMemo(() => {
    if (activeCategory === "all") return NOTIFICATION_EVENTS;
    return NOTIFICATION_EVENTS.filter((e) => e.category === activeCategory);
  }, [activeCategory]);

  // Counts for pills
  const counts = useMemo(() => {
    return {
      all: NOTIFICATION_EVENTS.length,
      bookings: NOTIFICATION_EVENTS.filter((e) => e.category === "bookings").length,
      operations: NOTIFICATION_EVENTS.filter((e) => e.category === "operations").length,
      platform: NOTIFICATION_EVENTS.filter((e) => e.category === "platform").length,
    };
  }, []);

  const handleSave = () => {
    setIsDirty(false);
    toast.success("تم حفظ إعدادات ومصفوفة الإشعارات بنجاح", {
      description: "تم تحديث استجابة القنوات لكافة أحداث المنصة وحوكمة الملاك.",
    });
  };

  const handleReset = () => {
    setConfig(initialData);
    setIsDirty(false);
    toast.info("تم التراجع عن التعديلات غير المحفوظة والعودة للقيم الافتراضية");
  };

  return {
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
  };
}
