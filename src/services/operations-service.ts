import { useAppDataStore } from "@/stores/use-app-data-store";
import type { OperationTask } from "@/features/operations/types";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateOperationTaskDTO {
  title: string;
  type: "cleaning" | "maintenance";
  propertyId: string;
  propertyName: string;
  unitId: string;
  unitNumber: string;
  priority?: "low" | "medium" | "high" | "urgent";
  assigneeName?: string;
  scheduledDate?: string;
  notes?: string;
  ownerName?: string;
}

export const operationsService = {
  async getAll(): Promise<OperationTask[]> {
    await delay();
    return useAppDataStore.getState().operations;
  },

  async getById(id: string): Promise<OperationTask | null> {
    await delay();
    const task = useAppDataStore.getState().operations.find((t) => t.id === id);
    return task || null;
  },

  async create(dto: CreateOperationTaskDTO): Promise<OperationTask> {
    await delay();
    const id = `task-${Date.now()}`;
    const code = dto.type === "cleaning"
      ? `CLN-${Math.floor(1000 + Math.random() * 9000)}`
      : `MNT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTask: OperationTask = {
      id,
      taskNumber: code,
      type: dto.type,
      status: "pending",
      statusLabel: "قيد الانتظار",
      priority: dto.priority || "medium",
      propertyId: dto.propertyId,
      propertyName: dto.propertyName,
      unitId: dto.unitId,
      unitName: dto.unitNumber || "الوحدة",
      floor: "1",
      city: "الرياض",
      ownerId: "own-1",
      ownerName: dto.ownerName || "المالك المسجل",
      ownerCode: "OWN-01",
      assigneeName: dto.assigneeName || "غير معيّن",
      createdAt: "اليوم",
      createdAtTime: "الآن",
      notes: dto.notes,
    };

    useAppDataStore.getState().addOperation(newTask);
    return newTask;
  },

  async update(id: string, updates: Partial<OperationTask>): Promise<OperationTask> {
    await delay();
    const existing = useAppDataStore.getState().operations.find((t) => t.id === id);
    if (!existing) {
      throw new Error(`المهمة غير موجودة: ${id}`);
    }
    useAppDataStore.getState().updateOperation(id, updates);
    return { ...existing, ...updates };
  },

  async remove(id: string): Promise<boolean> {
    await delay();
    useAppDataStore.getState().deleteOperation(id);
    return true;
  },
};
