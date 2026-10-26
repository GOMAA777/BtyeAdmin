"use client";

import { useState } from "react";
import { toast } from "sonner";
import { IntegrationsSettingsState } from "../types";

export function useIntegrationsSettings() {
  const initialData: IntegrationsSettingsState = {
    airbnb: {
      id: "airbnb",
      title: "Airbnb Partner API",
      subtitle: "Official Host API v3 • Fast Webhook",
      description:
        "تحديث تقاويم الوحدات، حجب التواريخ المحجوزة، وتوزيع الوحدات الفاخرة لحظياً بما يضمن انسيابية الحجوزات السكنية والسياحية.",
      category: "ota",
      status: "connected_active",
      statusLabel: "متصل ونشط",
      responseTime: "142ms • معدل نجاح 99.89%",
      lastSync: "منذ 8 دقائق (ناجحة)",
      identifierLabel: "Host Client ID",
      identifierKey: "ABNB-9024••••••••",
      isConnected: true,
    },
    bookingCom: {
      id: "booking-com",
      title: "Booking.com Channel API",
      subtitle: "Direct XML / Two-way Real-time Sync",
      description:
        "مزامنة الأسعار، التوافر اللحظي، واستيراد حجوزات الإقامة الفندقية والشقق السكنية آلياً عبر بوابة الربط المباشرة مع الحماية من التعارض.",
      category: "ota",
      status: "connected_active",
      statusLabel: "متصل ونشط",
      responseTime: "115ms • معدل نجاح 99.95%",
      lastSync: "منذ 4 دقائق (ناجحة)",
      identifierLabel: "API Account ID",
      identifierKey: "BCOM-SA-8291••••••••",
      isConnected: true,
      detailsUrl: "/settings/integrations/booking-com",
    },
    saudiPayment: {
      id: "saudi-payment",
      title: "بوابة الدفع الإلكتروني (Saudi Payment Gateway)",
      subtitle: "مدى Mada • فيزا Visa • ماستركارد • Apple Pay",
      description:
        "معالجة المدفوعات والبطاقات البنكية المعتمدة وتسوية العوائد مباشرة في الحسابات البنكية للملاك والمشغلين وفق معايير البنك المركزي السعودي (SAMA).",
      category: "payment",
      status: "connected",
      statusLabel: "متصل",
      responseTime: "PCI-DSS Level 1 المعتمدة",
      lastSync: "منذ دقيقتين (مباشر)",
      identifierLabel: "Merchant ID",
      identifierKey: "RWQ-SAMA-7731••••••••",
      isConnected: true,
      detailsUrl: "/settings/billing",
    },
    googleMaps: {
      id: "google-maps",
      title: "Google Maps Platform & Places API",
      subtitle: "Geocoding & Directions Enterprise",
      description:
        "تحديد إحداثيات العقارات بدقة، عرض خرائط الوصول للنزلاء، وتفعيل التحقق الجغرافي للتشغيل الميداني وتوجيه فرق الصيانة والخدمات اللوجستية.",
      category: "maps",
      status: "connected",
      statusLabel: "متصل",
      responseTime: "18,450 طلب (ضمن الباقة)",
      lastSync: "متصل سحابياً (استهلاك نشط)",
      identifierLabel: "Maps API Key",
      identifierKey: "AIzaSyD94••••••••••••",
      isConnected: true,
    },
    whatsapp: {
      id: "whatsapp",
      title: "WhatsApp Business API (Meta Cloud)",
      subtitle: "بوابة إشعارات النزلاء وأكواد الدخول الذكية",
      description:
        "بث رسائل تأكيد الحجز المباشرة، أكواد الدخول المشفرة للأقفال الرقمية، وإشعارات تسجيل الوصول والمغادرة الفورية لضيوف المنصة وملاك الأصول.",
      category: "messaging",
      status: "connected",
      statusLabel: "متصل",
      responseTime: "عالي جداً (Tier 3 - Green)",
      lastSync: "منذ دقيقة واحدة",
      identifierLabel: "WABA ID",
      identifierKey: "96820194••••••••",
      isConnected: true,
      detailsUrl: "/whatsapp",
    },
    smsFailover: {
      id: "sms-failover",
      title: "بوابة الرسائل النصية الاحتياطية (SMS Gateway Failover - CITC)",
      subtitle: "مسار الطوارئ للرسائل النصية السريعة OTP",
      description:
        "إرسال رسائل التحقق النصية OTP والإنذارات الميدانية الحرجة في حالات انقطاع أو تباطؤ خدمة واتساب المعتمدة.",
      category: "failover",
      status: "disconnected_standby",
      statusLabel: "غير متصل / استعداد",
      responseTime: "مسار طوارئ احتياطي",
      lastSync: "بانتظار تفعيل الحساب",
      identifierLabel: "Gateway Token",
      identifierKey: "غير مسجل حالياً",
      isConnected: false,
    },
    lastUpdated: "5 أكتوبر 2026",
    updatedBy: "محمد أحمد",
  };

  const [state, setState] = useState<IntegrationsSettingsState>(initialData);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    toast.success(`تم نسخ ${label} بنجاح`, {
      description: text,
    });
  };

  const testConnection = (title: string) => {
    toast.loading(`جاري اختبار الاتصال بقناة ${title}...`, {
      duration: 1200,
    });
    setTimeout(() => {
      toast.success(`تم التحقق من استقرار اتصال ${title} بنجاح`, {
        description: "معدل الاستجابة فائق وحالة الويب هوك نشطة بنسبة 100%.",
      });
    }, 1200);
  };

  const toggleDisconnect = (channelKey: keyof IntegrationsSettingsState) => {
    const channel = state[channelKey];
    if (typeof channel !== "object" || !("isConnected" in channel)) return;

    if (channel.isConnected) {
      toast.warning(`تم فصل الاتصال بقناة ${channel.title}`, {
        description: "تم تعطيل تدفق البيانات مؤقتاً لحين إعادة الربط.",
      });
      setState((prev) => ({
        ...prev,
        [channelKey]: {
          ...channel,
          isConnected: false,
          status: "disconnected_standby",
          statusLabel: "غير متصل",
        },
      }));
    } else {
      toast.success(`تم تفعيل الاتصال بقناة ${channel.title}`, {
        description: "جاري استئناف تدفق المزامنة اللحظية.",
      });
      setState((prev) => ({
        ...prev,
        [channelKey]: {
          ...channel,
          isConnected: true,
          status: "connected",
          statusLabel: "متصل",
        },
      }));
    }
  };

  const handleExportReport = () => {
    toast.success("تم تصدير تقرير حالة التكاملات والربط السحابي", {
      description: "تم تجهيز ملف PDF المعتمد وتنزيله بنجاح.",
    });
  };

  return {
    state,
    copyToClipboard,
    testConnection,
    toggleDisconnect,
    handleExportReport,
  };
}
