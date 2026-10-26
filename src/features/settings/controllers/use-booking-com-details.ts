"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BookingComDetailsState } from "../types";

export function useBookingComDetails() {
  const initialData: BookingComDetailsState = {
    accountId: "BCOM-SA-8291••••••••",
    secretToken: "••••••••••••••••••••••••••••••••",
    protocol: "Direct XML / REST v3.2",
    partnerTier: "Partner Tier 1",
    firstConnectedDate: "15 سبتمبر 2026",
    lastSyncTime: "5 أكتوبر 2026 — 08:20 ص",
    lastSyncStatus: "قبل دقيقتين",
    apiLatency: "115ms (استجابة فائقة)",
    webhookUrl: "https://api.rowaq.sa/webhooks/booking",
    webhookStatus: "متصل (Listening)",
    totalPropertiesServed: "1,482",
    totalUnitsServed: "11,290",
    scopes: {
      bookings: true,
      availability: true,
      ratesAndPolicies: true,
    },
    recentLogs: [
      {
        id: "log-1",
        timestamp: "08:20:12 ص",
        statusCode: "200 OK",
        action: "مزامنة حجز فندقي وارد #BK-89021",
        target: "— برج النخيل ريزيدنس (شقة ديلوكس)",
      },
      {
        id: "log-2",
        timestamp: "08:15:00 ص",
        statusCode: "200 OK",
        action: "تحديث قائمة التوافر لـ 24 وحدة",
        target: "— مجمع واحة الدرعية",
      },
    ],
    pendingErrorsCount: 0,
  };

  const [state, setState] = useState<BookingComDetailsState>(initialData);

  const toggleScope = (scopeKey: keyof BookingComDetailsState["scopes"]) => {
    setState((prev) => {
      const next = !prev.scopes[scopeKey];
      const scopeLabels = {
        bookings: "مزامنة الحجوزات",
        availability: "التوافر والمخزون",
        ratesAndPolicies: "الأسعار والسياسات",
      };
      if (next) {
        toast.success(`تم تفعيل ${scopeLabels[scopeKey]}`);
      } else {
        toast.warning(`تم تعطيل ${scopeLabels[scopeKey]}`);
      }
      return {
        ...prev,
        scopes: {
          ...prev.scopes,
          [scopeKey]: next,
        },
      };
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    toast.success(`تم نسخ ${label} بنجاح`, {
      description: text,
    });
  };

  const handleTestConnection = () => {
    toast.loading("جاري فحص قناة اتصال Booking.com ومصادقة المفاتيح...", {
      duration: 1200,
    });
    setTimeout(() => {
      toast.success("قناة Booking.com متصلة وتعمل بأعلى درجات الكفاءة (115ms)");
    }, 1200);
  };

  const handleFullResync = () => {
    toast.loading("جاري تشغيل إعادة المزامنة الشاملة لكافة الوحدات والتقاويم...", {
      duration: 1500,
    });
    setTimeout(() => {
      toast.success("اكتملت إعادة المزامنة الشاملة بنجاح", {
        description: "تمت مواءمة 11,290 وحدة سكنية مع مركز التوزيع الفندقي.",
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    toast.error("تم طلب فصل قناة Booking.com", {
      description: "يرجى تأكيد الإجراء من خلال لوحة إدارة الشركاء الرئيسية.",
    });
  };

  return {
    state,
    toggleScope,
    copyToClipboard,
    handleTestConnection,
    handleFullResync,
    handleDisconnect,
  };
}
