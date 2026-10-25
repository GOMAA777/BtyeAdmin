"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
import { WhatsAppTemplate, AutomationMainTab } from "../../types";
import { initialWhatsAppTemplates } from "../../data/mock-automation";
import { AutomationTabsNav } from "../automation-tabs-nav";
import { PreviewTemplateModal } from "./modals/preview-template-modal";
import { PauseTemplateModal } from "./modals/pause-template-modal";

interface WhatsAppTemplatesViewProps {
  onTabChange?: (tab: AutomationMainTab) => void;
}

export function WhatsAppTemplatesView({ onTabChange }: WhatsAppTemplatesViewProps) {
  const router = useRouter();
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(initialWhatsAppTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSyncing, setIsSyncing] = useState(false);

  // Active open dropdown menu template id
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState<WhatsAppTemplate | null>(null);
  const [pauseTargetTemplate, setPauseTargetTemplate] = useState<WhatsAppTemplate | null>(null);

  // Close dropdown menu on outside click
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { id: "all", label: "الكل", count: 7 },
    { id: "bookings", label: "الحجوزات", count: 12 },
    { id: "arrival", label: "الوصول", count: 2 },
    { id: "door_pin", label: "كود الدخول", count: 2 },
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.templateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.triggerLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, selectedCategory]);

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

  return (
    <div className="space-y-6 font-cairo" dir="rtl">
      {/* 3 Main Tabs Nav (with templates active) */}
      <AutomationTabsNav
        activeTab="templates"
        onTabChange={onTabChange}
        counts={{ rules: 12, templates: 8, logs: 1420 }}
      />

      {/* Main Container Card [1:23754] */}
      <div className="bg-white rounded-[24px] p-6 border border-[#EBEBEB] shadow-sm space-y-6">
        {/* Top Header & Actions [1:23754] */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3F4F6]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-[22px] font-bold text-[#181D17]">قوالب واتساب</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF1E8] text-[#34422A] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3E8A5A]" />
                <span>Meta Cloud API معتمد</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FAFBF9] text-[#75786F] border border-[#EBEFE6]">
                7 قوالب مسجلة
              </span>
            </div>
            <p className="text-xs text-[#454840] mt-1.5 leading-relaxed">
              إدارة الرسائل الجاهزة المستخدمة في الأتمتة لضمان جودة وسرعة تواصل المنظومة مع الضيوف والشركاء.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleSyncWithMeta}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-xs font-semibold bg-white hover:bg-gray-50 border border-[#E5E8E2] text-[#181D17] shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#454840] ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "جارٍ المزامنة..." : "مزامنة القوالب مع Meta"}</span>
            </button>

            <Link
              href="/automation/templates/new/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-xs font-bold bg-[#34422A] hover:bg-[#2B3723] text-white shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء قالب</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search Bar [1:23754] */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Categories Bar */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-[10px] text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#34422A] text-white shadow-2xs"
                    : "bg-[#FAFBF9] text-[#454840] hover:bg-gray-100 border border-transparent"
                }`}
              >
                <span>{cat.label}</span>
                <span className="ms-1.5 text-[11px] opacity-80">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#75786F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم القالب، الرمز أو المحفز..."
              className="w-full h-10 pr-3.5 pl-10 rounded-[12px] border border-[#E5E8E2] text-xs text-[#181D17] placeholder:text-[#75786F] focus:outline-none focus:border-[#4B5940] transition-colors"
            />
          </div>
        </div>

        {/* Templates Table [1:23754] */}
        <div className="overflow-x-auto rounded-[16px] border border-[#E5E8E2]">
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
              {filteredTemplates.map((template) => (
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

                  {/* Actions (3-dots menu) [1:24764] */}
                  <td className="py-4 pl-4 text-center relative">
                    <div className="inline-block">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === template.id ? null : template.id);
                        }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                          openMenuId === template.id
                            ? "bg-[#EAF1E8] text-[#34422A]"
                            : "hover:bg-gray-100 text-[#75786F]"
                        }`}
                        title="خيارات القالب"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Floating Dropdown Actions Menu [1:24764] */}
                      {openMenuId === template.id && (
                        <div
                          ref={menuRef}
                          className="w-[208px] bg-white border border-[#E5E8E2] rounded-[12px] p-[7px] flex flex-col gap-[4px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] absolute z-50 left-0 top-full mt-1 font-cairo text-right animate-in fade-in-50 zoom-in-95 duration-100"
                        >
                          {/* 1. عرض القالب */}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              setPreviewTemplate(template);
                            }}
                            className="h-[32px] rounded-[8px] bg-[#EAF1E8] hover:bg-[#E0EBE0] px-2.5 flex items-center justify-between text-right text-[12px] font-bold text-[#4B5940] transition-colors w-full cursor-pointer"
                          >
                            <span>عرض القالب</span>
                            <Eye className="w-4 h-4 text-[#4B5940]" />
                          </button>

                          {/* 2. معاينة الرسالة */}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              setPreviewTemplate(template);
                            }}
                            className="h-[32px] rounded-[8px] hover:bg-[#FAFBF9] px-2.5 flex items-center justify-between text-right text-[12px] font-semibold text-[#252A24] transition-colors w-full cursor-pointer"
                          >
                            <span>معاينة الرسالة</span>
                            <Eye className="w-4 h-4 text-[#252A24]" />
                          </button>

                          {/* 3. تعديل القالب */}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              router.push(`/automation/templates/new?id=${template.id}`);
                            }}
                            className="h-[32px] rounded-[8px] hover:bg-[#FAFBF9] px-2.5 flex items-center justify-between text-right text-[12px] font-semibold text-[#252A24] transition-colors w-full cursor-pointer"
                          >
                            <span>تعديل القالب</span>
                            <Edit3 className="w-4 h-4 text-[#252A24]" />
                          </button>

                          {/* 4. إيقاف القالب */}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              setPauseTargetTemplate(template);
                            }}
                            className="h-[32px] rounded-[8px] hover:bg-red-50/50 px-2.5 flex items-center justify-between text-right text-[12px] font-semibold text-[#B02515] transition-colors w-full cursor-pointer"
                          >
                            <span>إيقاف القالب</span>
                            <PauseCircle className="w-4 h-4 text-[#B02515]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination [1:23754] */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs text-[#454840]">
          <div>
            <span>عرض 1 - 7 من أصل 14 قالب</span>
          </div>

          <div className="flex items-center gap-6">
            <span>الصفوف لكل صفحة: 10 قوالب</span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="px-3 py-1.5 rounded-[8px] border border-[#E5E8E2] text-xs font-semibold text-[#75786F] hover:bg-gray-50 transition-colors disabled:opacity-40 cursor-pointer"
                disabled
              >
                السابق
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-[8px] bg-[#34422A] text-white text-xs font-bold flex items-center justify-center cursor-pointer shadow-2xs"
              >
                1
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-[8px] border border-[#E5E8E2] text-xs font-semibold text-[#75786F] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Compliance Notice Banner [1:23754] */}
      <div className="bg-[#F1F5EB] rounded-[18px] p-4 flex items-center gap-3 border border-[#E5E8E2]/60">
        <div className="w-8 h-8 rounded-full bg-[#EAF1E8] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#4B5940]" />
        </div>
        <p className="text-xs text-[#454840] leading-relaxed">
          جميع القوالب معتمدة تلقائياً عبر Meta WhatsApp Business Cloud API لضمان سرعة وموثوقية التسليم، وتخضع لسياسات الجودة والاستخدام المعتمدة في المملكة العربية السعودية ودول الخليج.
        </p>
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
    </div>
  );
}
