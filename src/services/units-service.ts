import { useAppDataStore } from "@/stores/use-app-data-store";
import type { Unit, UnitStatus, UnitType, UnitIconType } from "@/features/units/types";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateUnitDTO {
  unitNumber: string;
  name?: string;
  floor: string;
  floorNumber?: number;
  propertyId: string;
  propertyName: string;
  ownerId?: string;
  ownerName?: string;
  type?: UnitType;
  typeLabel?: string;
  pricePerNight?: number;
  status?: UnitStatus;
  iconType?: UnitIconType;
  area?: string;
  rooms?: string;
  maxGuests?: number;
  description?: string;
  accessCode?: string;
}

export const unitsService = {
  async getAll(): Promise<Unit[]> {
    await delay();
    return useAppDataStore.getState().units;
  },

  async getById(id: string): Promise<Unit | null> {
    await delay();
    const unit = useAppDataStore.getState().units.find((u) => u.id === id);
    return unit || null;
  },

  async getByProperty(propertyId: string): Promise<Unit[]> {
    await delay();
    return useAppDataStore.getState().units.filter((u) => u.propertyId === propertyId);
  },

  async create(dto: CreateUnitDTO): Promise<Unit> {
    await delay();
    const id = `unit-${Date.now()}`;
    const now = new Date();
    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const lastUpdateDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const lastUpdateTime = now.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });

    const ownerName = dto.ownerName || "المالك المسجل";
    const nameParts = ownerName.trim().split(" ");
    const ownerInitials = nameParts.length > 1
      ? `${nameParts[0][0] || ""}${nameParts[1][0] || ""}`
      : `${ownerName[0] || "م"}`;

    const newUnit: Unit = {
      id,
      unitNumber: dto.unitNumber,
      name: dto.name || `وحدة ${dto.unitNumber}`,
      typeLabel: dto.typeLabel || String(dto.type || "شقة"),
      floor: dto.floor || "الدور الأول",
      floorNumber: dto.floorNumber || 1,
      iconType: dto.iconType || "door",
      propertyId: dto.propertyId,
      propertyName: dto.propertyName,
      ownerId: dto.ownerId || "owner-1",
      ownerName,
      ownerInitials,
      type: dto.type || "شقة",
      pricePerNight: dto.pricePerNight || 300,
      status: dto.status || "available",
      currentBookingCode: null,
      lastUpdateDate,
      lastUpdateTime,
    };

    useAppDataStore.getState().addUnit(newUnit);

    // Update property units count
    const property = useAppDataStore.getState().properties.find((p) => p.id === dto.propertyId);
    if (property) {
      useAppDataStore.getState().updateProperty(property.id, {
        totalUnits: (property.totalUnits || 0) + 1,
        availableUnits: (property.availableUnits || 0) + 1,
      });
    }

    return newUnit;
  },

  async update(id: string, updates: Partial<Unit>): Promise<Unit> {
    await delay();
    const existing = useAppDataStore.getState().units.find((u) => u.id === id);
    if (!existing) {
      throw new Error(`الوحدة غير موجودة: ${id}`);
    }
    useAppDataStore.getState().updateUnit(id, updates);
    return { ...existing, ...updates };
  },

  async remove(id: string): Promise<boolean> {
    await delay();
    const unit = useAppDataStore.getState().units.find((u) => u.id === id);
    if (unit) {
      const property = useAppDataStore.getState().properties.find((p) => p.id === unit.propertyId);
      if (property && property.totalUnits > 0) {
        useAppDataStore.getState().updateProperty(property.id, {
          totalUnits: Math.max(0, property.totalUnits - 1),
          availableUnits: Math.max(0, property.availableUnits - 1),
        });
      }
    }
    useAppDataStore.getState().deleteUnit(id);
    return true;
  },
};
