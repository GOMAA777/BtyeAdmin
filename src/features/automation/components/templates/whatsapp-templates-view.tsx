"use client";

import { useState, useMemo, useRef, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  RefreshCw,
  Eye,
  Edit3,
  PauseCircle,
  MoreVertical,
  ShieldCheck,
  MessageSquare,
  Navigation,
  KeyRound,
  Clock,
  CheckCircle2,
  CreditCard,
  XCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useAppDataStore } from "@/stores/use-app-data-store";
import { TablePagination } from "@/components/shared/table-pagination";
import { TableToolbar } from "@/components/shared/table-toolbar";
import { ActionDropdown } from "@/components/shared/action-dropdown";
import { WhatsAppTemplate, AutomationMainTab } from "../../types";
import { initialWhatsAppTemplates } from "../../data/mock-automation";
import { AutomationTabsNav } from "../automation-tabs-nav";
import { PreviewTemplateModal } from "./modals/preview-template-modal";
import { PauseTemplateModal } from "./modals/pause-template-modal";
import { AutomationEmptyStateCard } from "../automation-empty-state-card";
import { WhatsAppTemplatesFilterDrawer } from "./whatsapp-templates-filter-drawer";
import {
  WhatsAppCaptionsIcon,
  MetaPolicyShieldIcon,
  MetaVerifiedBadgeIcon,
} from "../automation-figma-icons";

interface WhatsAppTemplatesViewProps {
  onTabChange?: (tab: AutomationMainTab) => void;
}

export function WhatsAppTemplatesView({ onTabChange }: WhatsAppTemplatesViewProps) {
  const router = useRouter();
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(initialWhatsAppTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isEmptyPreview, setIsEmptyPreview] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const activeFiltersCount =
    (statusFilter !== "all" ? 1 : 0) +
    (languageFilter !== "all" ? 1 : 0);

  const handleResetAllFilters = () => {
    setSelectedCategory("all");
    setStatusFilter("all");
    setLanguageFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState<WhatsAppTemplate | null>(null);
  const [pauseTargetTemplate, setPauseTargetTemplate] = useState<WhatsAppTemplate | null>(null);

  const categories = useMemo(
    () => [
      { id: "all", label: `الكل (${templates.length})` },
      { id: "bookings", label: `الحجوزات (${templates.filter((t) => t.category === "bookings").length})` },
      { id: "arrival", label: `الوصول (${templates.filter((t) => t.category === "arrival").length})` },
      { id: "door_pin", label: `كود الدخول (${templates.filter((t) => t.category === "door_pin").length})` },
    ],
    [templates]
  );

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.templateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.triggerLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;

      const matchesStatus =
        statusFilter === "all" || template.status === statusFilter;

      const matchesLanguage =
        languageFilter === "all" || template.language === languageFilter;

      return matchesSearch && matchesCategory && matchesStatus && matchesLanguage;
    });
  }, [templates, searchQuery, selectedCategory, statusFilter, languageFilter]);

  const totalFiltered = filteredTemplates.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedTemplates = filteredTemplates.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleSyncWithMeta = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("تمت مزامنة جميع القوالب بنجاح مع Meta WhatsApp Cloud API");
    }, 1200);
  };

  const handlePauseConfirm = () => {
    if (!pauseTargetTemplate) return;

    setTemplates((prev) =>
      prev.map((t) =>
        t.id === pauseTargetTemplate.id
          ? { ...t, status: "paused", statusLabel: "متوقفة" }
          : t
      )
    );
    toast.success(`تم إيقاف قالب واتساب (${pauseTargetTemplate.templateCode}) بنجاح.`);
    setPauseTargetTemplate(null);
  };

  const getTemplateIcon = (id: string) => {
    switch (id) {
      case "tpl_booking_confirm_v2":
        return <MessageSquare className="w-4 h-4 text-[#4B5940]" />;
      case "tpl_arrival_guide_v3":
        return <Navigation className="w-4 h-4 text-[#4B5940]" />;
      case "tpl_door_pin_otp":
        return <KeyRound className="w-4 h-4 text-[#4B5940]" />;
      case "tpl_checkout_reminder":
        return <Clock className="w-4 h-4 text-[#4B5940]" />;
      case "tpl_stay_completed":
        return <CheckCircle2 className="w-4 h-4 text-[#4B5940]" />;
      case "tpl_payment_failed_alert":
        return <CreditCard className="w-4 h-4 text-[#75786F]" />;
      case "tpl_booking_cancelled":
        return <XCircle className="w-4 h-4 text-[#75786F]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[#4B5940]" />;
    }
  };

  const rulesCount = useSyncExternalStore(
    useAppDataStore.subscribe,
    () => useAppDataStore.getState().automationRules.length,
    () => 0
  );

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      {/* 3 Main Tabs Nav (with templates active) */}
      <AutomationTabsNav
        activeTab="templates"
        onTabChange={onTabChange}
        counts={{ rules: rulesCount, templates: templates.length, logs: 0 }}
      />

      {/* 2. Top Header & Actions [1:26440] */}
      <div className="bg-white rounded-[16px] p-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5eae0] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-[24px] font-bold text-[#181D17] leading-[34px]">قوالب واتساب</h1>
            <span className="bg-[#d8e8cb] text-[#3d4b36] rounded-full px-[12px] py-[4px] text-[11px] font-semibold inline-flex items-center gap-[6px]">
              <MetaVerifiedBadgeIcon className="size-[14px]" />
              <span>Meta Cloud API معتمد</span>
            </span>
          </div>
          <p className="text-[14px] text-[#454840] font-normal mt-1.5 leading-[20px]">
            إدارة الرسائل الجاهزة المستخدمة في الأتمتة لضمان جودة وسرعة تواصل المنظومة مع الضيوف والشركاء.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Link
            href="/automation/templates/new/"
            className="bg-[#4b5940] hover:bg-[#34422a] rounded-[12px] px-[20px] py-[10px] text-white text-[14px] font-medium leading-[20px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] inline-flex items-center gap-[8px] transition-colors shadow-2xs"
          >
            <span>إنشاء قالب</span>
            <Plus className="size-[14px]" />
          </Link>

          <button
            type="button"
            onClick={handleSyncWithMeta}
            disabled={isSyncing}
            className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] border border-[#e5e8e2] text-[#181d17] text-[14px] font-semibold h-[44px] px-[16px] rounded-[12px] inline-flex items-center gap-[8px] hover:bg-[#f6f7f4] transition-colors cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`size-[14px] text-[#181d17] ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "جارٍ المزامنة..." : "مزامنة القوالب"}</span>
          </button>
        </div>
      </div>

      {/* 3. Filters and Search Bar */}
      <TableToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="ابحث باسم القالب، الرمز أو المحفز..."
        tabs={categories}
        currentTab={selectedCategory}
        onTabChange={setSelectedCategory}
        onOpenAdvancedFilter={() => setIsFilterDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
        filterButtonTitle="تصفية قوالب واتساب المتقدمة"
        onResetFilter={handleResetAllFilters}
        tabsLayoutId="whatsappTemplatesCategoryPill"
      />

      {/* 4. Empty State View [1:26359] vs Templates Table */}
      {templates.length === 0 ? (
        <AutomationEmptyStateCard
          icon={<WhatsAppCaptionsIcon className="size-[40px]" />}
          title="لا توجد قوالب واتساب"
          description={
            <>
              <p>يمكنك إنشاء قوالب معتمدة لرسائل تأكيد الحجز، إرسال أكواد الدخول الذكية للوحدات، تذكير موعد</p>
              <p>المغادرة، واستبيانات تقييم الإقامة مع دعم المتغيرات الديناميكية.</p>
            </>
          }
          secondaryAction={{
            label: "تحديث الصفحة",
            onClick: () => {
              setSearchQuery("");
              setSelectedCategory("all");
            },
          }}
          primaryAction={{
            label: "إنشاء قالب",
            href: "/automation/templates/new/",
            icon: <Plus className="size-[16px] text-white" />,
          }}
        />
      ) : filteredTemplates.length === 0 ? (
        <div className="bg-white rounded-[16px] border border-[#e5e8e2] p-12 text-center">
          <p className="text-[16px] font-bold text-[#181d17]">لا توجد نتائج مطابقة لمعايير البحث</p>
          <p className="text-[13px] text-[#454840] mt-1">جرّب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setStatusFilter("all");
              setLanguageFilter("all");
            }}
            className="mt-4 px-4 py-2 bg-[#f1f5eb] text-[#34422a] rounded-[10px] text-[13px] font-semibold hover:bg-[#e2ead9] transition-colors cursor-pointer"
          >
            إعادة ضبط التصفية
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[16px] border border-[#E5E8E2] overflow-hidden space-y-4 p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
            <thead>
              <tr className="bg-[#FAFBF9] border-b border-[#E5E8E2] text-[#454840] font-bold">
                <th className="py-3.5 pr-4">اسم القالب والرمز</th>
                <th className="py-3.5 px-3">التصنيف</th>
                <th className="py-3.5 px-3">المحفز المرتبط</th>
                <th className="py-3.5 px-3">اللغة</th>
                <th className="py-3.5 px-3">المتغيرات الديناميكية</th>
                <th className="py-3.5 px-3">الحالة</th>
                <th className="py-3.5 px-3">آخر تعديل</th>
                <th className="py-3.5 pl-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5EB] text-[#181D17]">
              {paginatedTemplates.map((template) => (
                <tr
                  key={template.id}
                  className="hover:bg-[#FAFBF9]/80 transition-colors group"
                >
                  {/* Name & Code */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[10px] bg-[#EAF1E8] flex items-center justify-center shrink-0">
                        {getTemplateIcon(template.id)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#181D17] group-hover:text-[#4B5940] transition-colors">
                          {template.title}
                        </div>
                        <div className="font-mono text-[11px] text-[#75786F] mt-0.5">
                          {template.templateCode}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-3">
                    <span className="inline-block px-2.5 py-1 rounded-[8px] text-[11px] font-semibold bg-[#EAF1E8] text-[#34422A]">
                      {template.categoryLabel}
                    </span>
                  </td>

                  {/* Trigger */}
                  <td className="py-4 px-3">
                    <div className="text-xs text-[#181D17] font-medium max-w-[160px] leading-relaxed">
                      {template.triggerLabel}
                    </div>
                  </td>

                  {/* Language */}
                  <td className="py-4 px-3">
                    <div className="text-xs font-semibold text-[#181D17]">
                      {template.language}
                    </div>
                  </td>

                  {/* Dynamic Variables Chips */}
                  <td className="py-4 px-3">
                    <div className="flex flex-col gap-1 max-w-[140px]">
                      {template.variables.map((v, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-0.5 rounded-[6px] text-[10.5px] font-mono text-[#454840] bg-[#F1F5EB] w-fit"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-3">
                    {template.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#D8E8CB] text-[#34422A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34422A]" />
                        <span>مفعلة</span>
                      </span>
                    ) : template.status === "paused" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E5EAE0] text-[#75786F]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#75786F]" />
                        <span>متوقفة</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFF4E5] text-[#E99A38]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E99A38]" />
                        <span>مسودة</span>
                      </span>
                    )}
                  </td>

                  {/* Last Modified */}
                  <td className="py-4 px-3 text-[#454840]">
                    <div className="text-xs font-medium text-[#181D17]">{template.lastModifiedDate}</div>
                    <div className="text-[11px] text-[#75786F] mt-0.5">{template.lastModifiedAuthor}</div>
                  </td>

                  {/* Actions (3-dots menu) */}
                  <td className="py-4 pl-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center">
                      <ActionDropdown
                        items={[
                          {
                            label: "عرض القالب",
                            icon: Eye,
                            onClick: () => setPreviewTemplate(template),
                          },
                          {
                            label: "معاينة الرسالة",
                            icon: Eye,
                            onClick: () => setPreviewTemplate(template),
                          },
                          {
                            label: "تعديل القالب",
                            icon: Edit3,
                            href: `/automation/templates/new?id=${template.id}`,
                          },
                          {
                            label: "إيقاف القالب",
                            icon: PauseCircle,
                            variant: "destructive",
                            confirm: {
                              title: "إيقاف القالب",
                              message: `هل أنت متأكد من رغبتك في إيقاف تشغيل قالب "${template.title}"؟`,
                              confirmLabel: "إيقاف القالب",
                              cancelLabel: "تراجع",
                              variant: "destructive",
                            },
                            onClick: () => setPauseTargetTemplate(template),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <TablePagination
          currentPage={activePage}
          totalPages={totalPages}
          totalCount={totalFiltered}
          fromIndex={totalFiltered === 0 ? 0 : startIndex + 1}
          toIndex={Math.min(startIndex + pageSize, totalFiltered)}
          pageSize={pageSize}
          pageSizeOptions={[5, 10]}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          entityName="قالب"
          pluralEntityName="قوالب"
          registeredLabel="معتمد"
        />
      </div>
    )}

      {/* Bottom Compliance Notice Banner [1:26434] */}
      <div className="bg-[#f1f5eb] rounded-[16px] p-[16px] flex items-center justify-between gap-[16px] border border-[#e5e8e2]/60">
        <p className="text-[12px] text-[#454840] font-semibold leading-[19.5px]">
          جميع القوالب معتمدة تلقائياً عبر Meta WhatsApp Business Cloud API لضمان سرعة وموثوقية التسليم، وتخضع لسياسات الجودة والاستخدام المعتمدة في المملكة العربية السعودية ودول الخليج.
        </p>
        <div className="bg-[#d8e8cb] rounded-[12px] size-[32px] flex items-center justify-center shrink-0">
          <MetaPolicyShieldIcon className="size-[15px]" />
        </div>
      </div>

      {/* Preview Template Modal [1:24789] */}
      {previewTemplate && (
        <PreviewTemplateModal
          isOpen={!!previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          template={previewTemplate}
        />
      )}

      {/* Pause Template Modal [1:24945] */}
      {pauseTargetTemplate && (
        <PauseTemplateModal
          isOpen={!!pauseTargetTemplate}
          onClose={() => setPauseTargetTemplate(null)}
          onConfirm={handlePauseConfirm}
          templateCode={pauseTargetTemplate.templateCode}
          templateTitle={pauseTargetTemplate.title}
        />
      )}

      {/* Advanced Filter Drawer */}
      <WhatsAppTemplatesFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={{
          category: selectedCategory,
          status: statusFilter,
          language: languageFilter,
        }}
        onApplyFilters={(newFilters) => {
          setSelectedCategory(newFilters.category);
          setStatusFilter(newFilters.status);
          setLanguageFilter(newFilters.language);
        }}
        onResetFilters={handleResetAllFilters}
        totalResultsCount={totalFiltered}
      />
    </div>
  );
}
