"use client";

import { useState, useMemo, useEffect, useCallback, useSyncExternalStore } from "react";
import { toast } from "sonner";
import { AutomationRule } from "../types";
import { useAppDataStore, ensureStoreHydrated } from "@/stores/use-app-data-store";

const emptyRules: AutomationRule[] = [];

export function useAutomationRulesManager(initialRules?: AutomationRule[]) {
  const storeRules = useSyncExternalStore(
    useAppDataStore.subscribe,
    () => useAppDataStore.getState().automationRules,
    () => emptyRules
  );
  const rules = initialRules || storeRules;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await ensureStoreHydrated();
    } catch (err: any) {
      console.error("Error loading automation rules:", err);
      setError("فشل في تحميل قواعد الأتمتة. يرجى إعادة المحاولة.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [triggerFilter, setTriggerFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isEmptyPreview, setIsEmptyPreview] = useState(false);

  const activeFiltersCount =
    (categoryFilter !== "all" ? 1 : 0) +
    (triggerFilter !== "all" ? 1 : 0) +
    (actionFilter !== "all" ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0);

  // Modals state
  const [activeRuleForModal, setActiveRuleForModal] =
    useState<AutomationRule | null>(null);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setTriggerFilter("all");
    setActionFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
    toast.info("تمت استعادة إعدادات التصفية الافتراضية.");
  };

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      if (statusFilter !== "all" && rule.status !== statusFilter) return false;
      if (categoryFilter !== "all" && rule.category !== categoryFilter) return false;
      if (triggerFilter !== "all" && rule.triggerType !== triggerFilter) return false;
      if (actionFilter !== "all" && rule.actionType !== actionFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          rule.title.toLowerCase().includes(q) ||
          rule.ruleCode.toLowerCase().includes(q) ||
          rule.triggerLabel.toLowerCase().includes(q) ||
          rule.description.toLowerCase().includes(q) ||
          rule.actionSummary.toLowerCase().includes(q) ||
          rule.categoryLabel.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [rules, statusFilter, categoryFilter, triggerFilter, actionFilter, searchQuery]);

  const totalFiltered = filteredRules.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedRules = filteredRules.slice(startIndex, startIndex + pageSize);

  const handleExport = () => {
    toast.success("جاري تصدير قائمة قواعد الأتمتة...");
  };

  const handleToggleStatus = (rule: AutomationRule) => {
    setActiveRuleForModal(rule);
    if (rule.status === "active") {
      setIsPauseOpen(true);
    } else {
      setIsActivateOpen(true);
    }
  };

  const handlePauseRule = (rule: AutomationRule) => {
    setActiveRuleForModal(rule);
    setIsPauseOpen(true);
  };

  const handleActivateRule = (rule: AutomationRule) => {
    setActiveRuleForModal(rule);
    setIsActivateOpen(true);
  };

  const handleDeleteRule = (rule: AutomationRule) => {
    setActiveRuleForModal(rule);
    setIsDeleteOpen(true);
  };

  const confirmPause = () => {
    if (activeRuleForModal) {
      useAppDataStore.getState().updateAutomationRule(activeRuleForModal.id, {
        status: "paused",
        statusLabel: "متوقفة",
      });
      toast.success(`تم إيقاف القاعدة: ${activeRuleForModal.title}`);
      setIsPauseOpen(false);
    }
  };

  const confirmActivate = () => {
    if (activeRuleForModal) {
      useAppDataStore.getState().updateAutomationRule(activeRuleForModal.id, {
        status: "active",
        statusLabel: "مفعلة",
      });
      toast.success(`تم تفعيل القاعدة: ${activeRuleForModal.title}`);
      setIsActivateOpen(false);
    }
  };

  const confirmDelete = () => {
    if (activeRuleForModal) {
      useAppDataStore.getState().deleteAutomationRule(activeRuleForModal.id);
      toast.success(`تم حذف القاعدة: ${activeRuleForModal.title}`);
      setIsDeleteOpen(false);
    }
  };

  return {
    rules,
    searchQuery,
    categoryFilter,
    triggerFilter,
    actionFilter,
    statusFilter,
    activeFiltersCount,
    isEmptyPreview,
    activeRuleForModal,
    isPauseOpen,
    isActivateOpen,
    isDeleteOpen,
    filteredRules,
    setSearchQuery,
    setCategoryFilter,
    setTriggerFilter,
    setActionFilter,
    setStatusFilter,
    handleResetFilters,
    setIsEmptyPreview,
    setIsPauseOpen,
    setIsActivateOpen,
    setIsDeleteOpen,
    handleExport,
    handleToggleStatus,
    handlePauseRule,
    handleActivateRule,
    handleDeleteRule,
    confirmPause,
    confirmActivate,
    confirmDelete,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    totalFiltered,
    totalPages,
    activePage,
    startIndex,
    paginatedRules,
    isLoading,
    error,
    reloadRules: loadData,
  };
}
