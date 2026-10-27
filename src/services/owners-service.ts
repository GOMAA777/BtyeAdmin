import { useAppDataStore } from "@/stores/use-app-data-store";
import type { Owner, OwnerStatus } from "@/features/owners/types";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateOwnerDTO {
  name: string;
  email: string;
  phone: string;
  status?: OwnerStatus;
  propertiesCount?: number;
  unitsCount?: number;
}

export const ownersService = {
  async getAll(): Promise<Owner[]> {
    await delay();
    return useAppDataStore.getState().owners;
  },

  async getById(id: string): Promise<Owner | null> {
    await delay();
    const owner = useAppDataStore.getState().owners.find((o) => o.id === id);
    return owner || null;
  },

  async create(dto: CreateOwnerDTO): Promise<Owner> {
    await delay();
    const id = `owner-${Date.now()}`;
    const nameParts = dto.name.trim().split(" ");
    const initials = nameParts.length > 1
      ? `${nameParts[0][0] || ""}${nameParts[1][0] || ""}`
      : `${dto.name[0] || "م"}`;

    const now = new Date();
    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    const registrationDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const newOwner: Owner = {
      id,
      name: dto.name,
      initials,
      email: dto.email,
      phone: dto.phone,
      propertiesCount: dto.propertiesCount || 0,
      unitsCount: dto.unitsCount || 0,
      registrationDate,
      relativeTime: "(اليوم)",
      status: dto.status || "active",
    };

    useAppDataStore.getState().addOwner(newOwner);
    return newOwner;
  },

  async update(id: string, updates: Partial<Owner>): Promise<Owner> {
    await delay();
    const existing = useAppDataStore.getState().owners.find((o) => o.id === id);
    if (!existing) {
      throw new Error(`المالك غير موجود: ${id}`);
    }
    useAppDataStore.getState().updateOwner(id, updates);
    return { ...existing, ...updates };
  },

  async remove(id: string): Promise<boolean> {
    await delay();
    useAppDataStore.getState().deleteOwner(id);
    return true;
  },
};
