import { useAppDataStore, ensureStoreHydrated } from "@/stores/use-app-data-store";
import type { AutomationRule, RuleCategory, RuleStatus } from "@/features/automation/types";

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CreateAutomationRuleDTO {
  title: string;
  description: string;
  category: RuleCategory;
  categoryLabel?: string;
  triggerType: string;
  triggerLabel: string;
  triggerTime: string;
  actionSummary: string;
  actionType: "whatsapp" | "cleaning_task" | "security_alert" | "smart_lock" | "review";
  scope: string;
  status?: RuleStatus;
}

export const automationService = {
  async getAll(): Promise<AutomationRule[]> {
    await ensureStoreHydrated();
    await delay();
    return useAppDataStore.getState().automationRules;
  },

  async getById(id: string): Promise<AutomationRule | null> {
    await ensureStoreHydrated();
    await delay();
    const rule = useAppDataStore.getState().automationRules.find((r) => r.id === id);
    return rule || null;
  },

  async create(dto: CreateAutomationRuleDTO): Promise<AutomationRule> {
    await delay();
    const id = `AUT-${Math.floor(100 + Math.random() * 900)}`;

    const newRule: AutomationRule = {
      id,
      ruleCode: id,
      title: dto.title,
      description: dto.description,
      category: dto.category,
      categoryLabel: dto.categoryLabel || "أتمتة عامة",
      triggerType: dto.triggerType,
      triggerLabel: dto.triggerLabel,
      triggerTime: dto.triggerTime,
      actionSummary: dto.actionSummary,
      actionType: dto.actionType,
      scope: dto.scope,
      status: dto.status || "active",
      statusLabel: dto.status === "paused" ? "موقفة" : "مفعلة",
      lastExecution: "لم تنفذ بعد",
      successRate: "100%",
      creatorName: "مدير النظام",
      createdAt: "اليوم",
      lastModified: "الآن",
    };

    useAppDataStore.getState().addAutomationRule(newRule);
    return newRule;
  },

  async update(id: string, updates: Partial<AutomationRule>): Promise<AutomationRule> {
    await delay();
    const existing = useAppDataStore.getState().automationRules.find((r) => r.id === id);
    if (!existing) {
      throw new Error(`قاعدة الأتمتة غير موجودة: ${id}`);
    }
    useAppDataStore.getState().updateAutomationRule(id, updates);
    return { ...existing, ...updates };
  },

  async remove(id: string): Promise<boolean> {
    await delay();
    useAppDataStore.getState().deleteAutomationRule(id);
    return true;
  },
};
