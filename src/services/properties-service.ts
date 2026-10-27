import { useAppDataStore, ensureStoreHydrated } from "@/stores/use-app-data-store";
import type { Property, PropertyStatus } from "@/features/properties/types";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreatePropertyDTO {
  title?: string;
  name?: string;
  type: string;
  city: string;
  district: string;
  address?: string;
  addressDetails?: string;
  description?: string;
  totalUnits?: number;
  unitsCount?: number;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerInitials?: string;
  status?: PropertyStatus;
}

export const propertiesService = {
  async getAll(): Promise<Property[]> {
    await ensureStoreHydrated();
    await delay();
    return useAppDataStore.getState().properties;
  },

  async getById(id: string): Promise<Property | null> {
    await ensureStoreHydrated();
    await delay();
    const property = useAppDataStore.getState().properties.find((p) => p.id === id);
    return property || null;
  },

  async create(dto: CreatePropertyDTO): Promise<Property> {
    await delay();
    const id = `prop-${Date.now()}`;
    const code = `PR-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const dateAdded = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const newProperty: Property = {
      id,
      title: dto.title || dto.name || "عقار جديد",
      name: dto.name || dto.title || "عقار جديد",
      type: dto.type,
      code,
      ownerId: dto.ownerId,
      ownerName: dto.ownerName || "غير محدد",
      ownerInitials: dto.ownerInitials || "ع",
      ownerEmail: dto.ownerEmail || "owner@domain.sa",
      city: dto.city,
      district: dto.district,
      totalUnits: dto.totalUnits || dto.unitsCount || 0,
      unitsCount: dto.unitsCount || dto.totalUnits || 0,
      occupiedUnits: 0,
      availableUnits: dto.totalUnits || 0,
      activeBookings: 0,
      dateAdded,
      relativeTime: "(اليوم)",
      status: dto.status || "active",
    };

    useAppDataStore.getState().addProperty(newProperty);
    return newProperty;
  },

  async update(id: string, updates: Partial<Property>): Promise<Property> {
    await delay();
    const existing = useAppDataStore.getState().properties.find((p) => p.id === id);
    if (!existing) {
      throw new Error(`العقار غير موجود: ${id}`);
    }
    useAppDataStore.getState().updateProperty(id, updates);
    return { ...existing, ...updates };
  },

  async remove(id: string): Promise<boolean> {
    await delay();
    useAppDataStore.getState().deleteProperty(id);
    return true;
  },
};
