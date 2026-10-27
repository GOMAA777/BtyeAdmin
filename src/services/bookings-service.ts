import { useAppDataStore } from "@/stores/use-app-data-store";
import type { MainBookingItem, BookingStatus, BookingDetail } from "@/features/bookings/types";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateBookingDTO {
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitNumber: string;
  unitType?: string;
  checkInDate: string;
  checkInTime?: string;
  checkOutDate: string;
  checkOutTime?: string;
  adults?: number;
  adultsCount?: number;
  children?: number;
  childrenCount?: number;
  infants?: number;
  nightsCount?: number;
  source?: string;
  totalAmount?: string | number;
  paymentStatus?: string;
  notes?: string;
  status?: BookingStatus;
}

export const bookingsService = {
  async getAll(): Promise<MainBookingItem[]> {
    await delay();
    return useAppDataStore.getState().bookings;
  },

  async getById(id: string): Promise<MainBookingItem | null> {
    await delay();
    const booking = useAppDataStore.getState().bookings.find(
      (b) => b.id === id || b.bookingCode === id
    );
    return booking || null;
  },

  async getDetailById(id: string): Promise<BookingDetail | null> {
    await delay();
    const item = useAppDataStore.getState().bookings.find(
      (b) => b.id === id || b.bookingCode === id
    );
    if (!item) return null;

    const totalNum = parseFloat(String(item.amount.total).replace(/[^0-9.]/g, "")) || 1500;

    return {
      id: item.id,
      bookingCode: item.bookingCode,
      status: item.status,
      statusText: item.statusLabel,
      guest: {
        name: item.guest.name,
        initials: item.guest.avatarLetter,
        verified: true,
        badgeText: "هوية موثقة",
        phone: item.guest.phone,
        email: "guest@example.com",
        nationality: "سعودي",
        idVerification: "أبشر",
      },
      smartLock: {
        unitNumber: item.unit.unitNumber,
        pinCode: "8492",
        maskedCode: "••••",
        scheduleText: "صالح طوال فترة الإقامة",
        connected: true,
      },
      stay: {
        checkInDate: item.checkIn.date,
        checkInTime: item.checkIn.time || "03:00 م",
        checkOutDate: item.checkOut.date,
        checkOutTime: "12:00 م",
        nightsCount: parseInt(item.checkOut.nights) || 2,
        guestsCount: 2,
        guestsDescription: "2 بالغين",
        cancellationPolicy: "إلغاء مجاني قبل 24 ساعة",
      },
      assigned: {
        propertyName: item.propertyName,
        propertyCode: "PR-100",
        propertyLocation: "الرياض",
        propertyId: "p1",
        ownerName: "المالك المسجل",
        ownerId: "own-1",
        falLicense: "FAL-2026-9921",
        unitNumber: item.unit.unitNumber,
        unitTitle: `وحدة ${item.unit.unitNumber}`,
        unitFloor: "الدور الثاني",
        unitView: "إطلالة مميزة",
        unitSpecs: item.unit.unitType,
        operationalStatus: "جاهزة",
      },
      financial: {
        totalAmount: totalNum,
        collectedAmount: totalNum,
        remainingAmount: 0,
        currency: "ر.س",
        paymentStatus: item.amount.paymentStatus,
        baseStayRate: Math.round(totalNum * 0.8),
        baseStayNights: 2,
        baseStayTotal: Math.round(totalNum * 0.8),
        cleaningFee: Math.round(totalNum * 0.1),
        vatAmount: Math.round(totalNum * 0.1),
        vatRate: 15,
        paymentMethod: "مدى / بطاقة ائتمان",
      },
      automation: {
        channelStatus: "متصل عبر WhatsApp Cloud API",
        steps: [
          {
            id: "s1",
            stepNumber: 1,
            title: "تأكيد الحجز الفوري",
            description: "تم إرسال إيصال الحجز وتفاصيل الإقامة للنزيل",
            timestamp: "الآن",
            status: "completed",
          },
        ],
      },
      activityLog: [
        {
          id: "act-1",
          title: "تم اعتماد الحجز وإصدار كود الدخول الذكي",
          timestamp: "الآن",
          type: "create",
        },
      ],
    };
  },

  async create(dto: CreateBookingDTO): Promise<MainBookingItem> {
    await delay();
    const id = `bk-${Date.now()}`;
    const bookingCode = `BK-${Math.floor(10000 + Math.random() * 90000)}`;

    const nameParts = dto.guestName.trim().split(" ");
    const avatarLetter = nameParts[0]?.[0] || "ض";

    const formattedTotal = typeof dto.totalAmount === "number"
      ? `${dto.totalAmount.toLocaleString()} ر.س`
      : dto.totalAmount || "1,200 ر.س";

    const newBooking: MainBookingItem = {
      id,
      bookingCode,
      guest: {
        name: dto.guestName,
        phone: dto.guestPhone,
        avatarLetter,
      },
      propertyName: dto.propertyName,
      unit: {
        unitNumber: dto.unitNumber,
        unitType: dto.unitType || "شقة كاملة",
      },
      checkIn: {
        date: dto.checkInDate,
        time: dto.checkInTime || "03:00 م",
      },
      checkOut: {
        date: dto.checkOutDate,
        nights: "3 ليال",
      },
      source: dto.source || "حجز مباشر",
      amount: {
        total: formattedTotal,
        paymentStatus: dto.paymentStatus || "مدفوع بالكامل",
      },
      status: "upcoming",
      statusLabel: "قادم",
    };

    useAppDataStore.getState().addBooking(newBooking);

    // Update unit booking status if applicable
    if (dto.unitId) {
      useAppDataStore.getState().updateUnit(dto.unitId, {
        status: "occupied",
        currentBookingCode: bookingCode,
      });
    }

    return newBooking;
  },

  async update(id: string, updates: Partial<MainBookingItem>): Promise<MainBookingItem> {
    await delay();
    const existing = useAppDataStore.getState().bookings.find(
      (b) => b.id === id || b.bookingCode === id
    );
    if (!existing) {
      throw new Error(`الحجز غير موجود: ${id}`);
    }
    useAppDataStore.getState().updateBooking(existing.id, updates);
    return { ...existing, ...updates };
  },

  async cancel(id: string): Promise<boolean> {
    await delay();
    const existing = useAppDataStore.getState().bookings.find(
      (b) => b.id === id || b.bookingCode === id
    );
    if (existing) {
      useAppDataStore.getState().updateBooking(existing.id, {
        status: "cancelled",
        statusLabel: "ملغى",
      });
      return true;
    }
    return false;
  },

  async remove(id: string): Promise<boolean> {
    await delay();
    const existing = useAppDataStore.getState().bookings.find(
      (b) => b.id === id || b.bookingCode === id
    );
    if (existing) {
      useAppDataStore.getState().deleteBooking(existing.id);
      return true;
    }
    return false;
  },
};
