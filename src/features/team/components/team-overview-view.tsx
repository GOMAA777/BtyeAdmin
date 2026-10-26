"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Download,
  ClipboardList,
  CalendarX2,
  CheckCircle2,
  Users,
  RotateCw,
  RotateCcw,
  Search,
  ChevronDown,
  KeyRound,
  Pencil,
  Copy,
  MessageSquare,
  Wrench,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useTeamManager } from "../controllers/use-team-manager";
import { SuspendMemberModal } from "./modals/suspend-member-modal";
import { DeleteMemberModal } from "./modals/delete-member-modal";
import { ConfirmChangeWhatsappModal } from "./modals/confirm-change-whatsapp-modal";
import { EditPermissionsModal } from "./modals/edit-permissions-modal";
import { SendWhatsappMessageModal } from "./modals/send-whatsapp-message-modal";
import { TeamMember, TeamRole } from "../types";

export function TeamOverviewView() {
  const router = useRouter();
  const {
    members,
    stats,
    activeTab,
    setActiveTab,
    counts,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    propertyFilter,
    setPropertyFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedMembers,
    resetFilters,
    // Modals
    suspendModalOpen,
    setSuspendModalOpen,
    deleteModalOpen,
    setDeleteModalOpen,
    changeWhatsappModalOpen,
    setChangeWhatsappModalOpen,
    permissionsModalOpen,
    setPermissionsModalOpen,
    sendWhatsappModalOpen,
    setSendWhatsappModalOpen,
    activeMember,
    openSuspendModal,
    openDeleteModal,
    openChangeWhatsappModal,
    openPermissionsModal,
    openSendWhatsappModal,
    // Mutations
    handleSuspendMember,
    handleDeleteMember,
    handleChangeWhatsapp,
    handleUpdatePermissions,
    handleSendWhatsappMessage,
  } = useTeamManager();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`تم نسخ ${label} إلى الحافظة: ${text}`);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* SECTION 1: TOP HERO GREETING BAR */}
      <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-[24px] font-bold text-[#181d17] font-cairo leading-[34px]">
            فريق العمل
          </h1>
          <p className="text-[13px] font-medium text-[#454840] font-cairo leading-[20px]">
            إدارة الكوادر والمشرفين الميدانيين وتوزيع مسؤوليات الوحدات، صلاحيات أكواد الدخول، والتواصل التلقائي عبر WhatsApp.
          </p>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-2 self-stretch md:self-auto shrink-0">
          <Link
            href="/team/new"
            className="flex-1 md:flex-none h-11 px-5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-medium text-[14px] flex items-center justify-center gap-2 shadow-sm transition-colors font-cairo"
          >
            <UserPlus className="size-4.5" />
            <span>إضافة عضو للفريق</span>
          </Link>

          <button
            onClick={() => toast.success("جاري تصدير سجل فريق العمل بصيغة Excel...")}
            className="h-11 px-4 rounded-[12px] bg-white border border-[#dfe4db] text-[#181d17] font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm hover:bg-[#f1f5eb] transition-colors font-cairo"
          >
            <Download className="size-4" />
            <span>تصدير السجل</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: METRIC OVERVIEW CARDS (Asymmetric Data Strip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active In-progress Tasks */}
        <div className="bg-[rgba(242,225,192,0.3)] rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4 border border-[#f2e1c0]/40">
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-[12px] bg-[#f2e1c0] flex items-center justify-center text-[#6f6349] shrink-0">
              <ClipboardList className="size-6" />
            </div>
            <div className="text-right">
              <span className="text-[12px] font-semibold text-[#6f6349] font-cairo">
                مهام جارية الميدان
              </span>
              <div className="flex items-baseline gap-1 mt-1 justify-end">
                <span className="text-[40px] font-bold text-[#231a06] leading-none font-cairo">
                  {stats.runningTasksCount}
                </span>
                <span className="text-[14px] text-[#6f6349] font-normal font-cairo">
                  مهمة عمل
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium text-[#6f6349] font-cairo pt-2 border-t border-[#f2e1c0]/50">
            <div className="flex items-center gap-1">
              <Wrench className="size-3" />
              <span>{stats.maintenanceTasksCount} صيانة</span>
            </div>
            <span className="size-1 rounded-full bg-[#d5c5a5]" />
            <div className="flex items-center gap-1">
              <Sparkles className="size-3" />
              <span>{stats.cleaningTasksCount} تنظيف</span>
            </div>
          </div>
        </div>

        {/* Card 2: Paused / Leave */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4 border border-[#dfe4db]/50">
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-[12px] bg-[#dfe4db] flex items-center justify-center text-[#454840] shrink-0">
              <CalendarX2 className="size-6" />
            </div>
            <div className="text-right">
              <span className="text-[12px] font-medium text-[#454840] font-cairo">
                موقوفون / إجازة
              </span>
              <div className="flex items-baseline gap-1 mt-1 justify-end">
                <span className="text-[40px] font-bold text-[#181d17] leading-none font-cairo">
                  {stats.pausedOrLeaveCount}
                </span>
                <span className="text-[14px] text-[#75786f] font-normal font-cairo">
                  غير متاحين مؤقتاً
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] font-cairo pt-2 border-t border-[#dfe4db]/50">
            <span className="font-bold text-[#695d43]">{stats.pausedLeaveStatus}</span>
            <span className="font-medium text-[#454840]">{stats.pausedLeaveSubtitle}</span>
          </div>
        </div>

        {/* Card 3: Active Members */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4 border border-[#dfe4db]/50">
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-[12px] bg-[rgba(242,225,192,0.6)] flex items-center justify-center text-[#34422a] shrink-0">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="text-right">
              <span className="text-[12px] font-medium text-[#454840] font-cairo">
                النشطون حالياً
              </span>
              <div className="flex items-baseline gap-1 mt-1 justify-end">
                <span className="text-[40px] font-bold text-[#181d17] leading-none font-cairo">
                  {stats.activeMembers}
                </span>
                <span className="text-[14px] text-[#34422a] font-bold font-cairo">
                  جاهزون للمهام
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#454840] font-cairo pt-2 border-t border-[#dfe4db]/50">
            <span className="size-2 rounded-full bg-[#34422a] shrink-0 animate-pulse" />
            <span>{stats.onlineWhatsappCount} أعضاء متصلون بالنظام عبر الواتساب الآن</span>
          </div>
        </div>

        {/* Card 4: Total Team */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-4 border border-[#dfe4db]/50">
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-[12px] bg-[rgba(216,232,199,0.6)] flex items-center justify-center text-[#34422a] shrink-0">
              <Users className="size-6" />
            </div>
            <div className="text-right">
              <span className="text-[12px] font-medium text-[#454840] font-cairo">
                إجمالي الفريق
              </span>
              <div className="flex items-baseline gap-1 mt-1 justify-end">
                <span className="text-[40px] font-bold text-[#181d17] leading-none font-cairo">
                  {stats.totalMembers}
                </span>
                <span className="text-[14px] text-[#75786f] font-normal font-cairo">
                  عضواً مسجلاً
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] font-cairo pt-2 border-t border-[#dfe4db]/50">
            <span className="font-bold text-[#34422a]">{stats.locationsCount} مواقع</span>
            <span className="font-medium text-[#454840]">{stats.totalSubtitle}</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: FILTER & CONTROL PANEL CONTAINER */}
      <div className="bg-white rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] space-y-4">
        {/* Category Tabs & Auto Sync Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="bg-[#ebefe6] p-1 rounded-[12px] flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-1.5 rounded-[8px] flex items-center gap-2 text-[12px] font-semibold transition-all font-cairo shrink-0 ${
                activeTab === "all"
                  ? "bg-[#34422a] text-white shadow-sm"
                  : "text-[#454840] hover:text-[#181d17]"
              }`}
            >
              <span>الكل</span>
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === "all" ? "bg-white/20 text-white" : "bg-[#dfe4db] text-[#181d17]"
                }`}
              >
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("cleaner")}
              className={`px-4 py-1.5 rounded-[8px] flex items-center gap-2 text-[12px] font-semibold transition-all font-cairo shrink-0 ${
                activeTab === "cleaner"
                  ? "bg-[#34422a] text-white shadow-sm"
                  : "text-[#454840] hover:text-[#181d17]"
              }`}
            >
              <span>عمال النظافة</span>
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === "cleaner" ? "bg-white/20 text-white" : "bg-[#dfe4db] text-[#181d17]"
                }`}
              >
                {counts.cleaner}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("maintenance")}
              className={`px-4 py-1.5 rounded-[8px] flex items-center gap-2 text-[12px] font-semibold transition-all font-cairo shrink-0 ${
                activeTab === "maintenance"
                  ? "bg-[#34422a] text-white shadow-sm"
                  : "text-[#454840] hover:text-[#181d17]"
              }`}
            >
              <span>فنيو الصيانة</span>
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === "maintenance" ? "bg-white/20 text-white" : "bg-[#dfe4db] text-[#181d17]"
                }`}
              >
                {counts.maintenance}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("supervisor")}
              className={`px-4 py-1.5 rounded-[8px] flex items-center gap-2 text-[12px] font-semibold transition-all font-cairo shrink-0 ${
                activeTab === "supervisor"
                  ? "bg-[#34422a] text-white shadow-sm"
                  : "text-[#454840] hover:text-[#181d17]"
              }`}
            >
              <span>المشرفون</span>
              <span
                className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                  activeTab === "supervisor" ? "bg-white/20 text-white" : "bg-[#dfe4db] text-[#181d17]"
                }`}
              >
                {counts.supervisor}
              </span>
            </button>
          </div>

          {/* Sync status */}
          <div className="flex items-center gap-1.5 text-[11px] font-cairo">
            <RotateCw className="size-3 text-[#34422a]" />
            <span className="text-[#454840] font-medium">مزامنة المهام التلقائية:</span>
            <span className="font-bold text-[#181d17]">فعالة (كل 5 دقائق)</span>
          </div>
        </div>

        {/* Detailed Search & Dropdown Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 pt-1">
          {/* Search Input (Takes 5 cols) */}
          <div className="lg:col-span-4 relative">
            <div className="h-11 bg-[#f1f5eb] rounded-[12px] px-3 pr-10 flex items-center shadow-inner">
              <input
                type="text"
                placeholder="ابحث باسم العضو، رقم الواتساب، أو العقار..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[13.5px] text-[#181d17] placeholder-[#75786f] focus:outline-none font-cairo"
              />
            </div>
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#75786f] pointer-events-none" />
          </div>

          {/* Role Filter (Takes 2 cols) */}
          <div className="lg:col-span-2 relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full h-11 bg-[#f1f5eb] rounded-[12px] px-4 pl-8 text-[13.5px] font-normal text-[#181d17] appearance-none focus:outline-none font-cairo"
            >
              <option value="all">نوع العضو (الكل)</option>
              <option value="cleaner">عامل نظافة</option>
              <option value="maintenance">فني صيانة</option>
              <option value="supervisor">مشرف</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#75786f] pointer-events-none" />
          </div>

          {/* Status Filter (Takes 2 cols) */}
          <div className="lg:col-span-2 relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-11 bg-[#f1f5eb] rounded-[12px] px-4 pl-8 text-[13.5px] font-normal text-[#181d17] appearance-none focus:outline-none font-cairo"
            >
              <option value="all">الحالة (الكل)</option>
              <option value="active">نشط</option>
              <option value="suspended">موقوف مؤقتاً</option>
              <option value="leave">في إجازة</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#75786f] pointer-events-none" />
          </div>

          {/* Property Filter (Takes 2 cols) */}
          <div className="lg:col-span-2 relative">
            <select
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
              className="w-full h-11 bg-[#f1f5eb] rounded-[12px] px-4 pl-8 text-[13.5px] font-normal text-[#181d17] appearance-none focus:outline-none font-cairo"
            >
              <option value="all">العقار (الكل)</option>
              <option value="عمارة النخيل">عمارة النخيل</option>
              <option value="برج الياسمين">برج الياسمين</option>
              <option value="فيلا النرجس">فيلا النرجس</option>
            </select>
            <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#75786f] pointer-events-none" />
          </div>

          {/* Reset Action (Takes 2 cols) */}
          <div className="lg:col-span-2">
            <button
              onClick={resetFilters}
              className="w-full h-11 bg-[#ebefe6] hover:bg-[#dfe4db] rounded-[12px] px-3 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-[#454840] transition-colors font-cairo"
            >
              <RotateCcw className="size-3.5" />
              <span>إعادة ضبط</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 4: DATA TABLE */}
      <div className="space-y-3">
        {/* Table Header Labels */}
        <div className="hidden lg:grid grid-cols-12 gap-3 px-6 text-[12px] font-bold text-[#75786f] font-cairo">
          <div className="col-span-3">اسم العضو والتخصص</div>
          <div className="col-span-1 text-center">نوع العضو</div>
          <div className="col-span-2 text-center">واتساب التواصل</div>
          <div className="col-span-2">العقارات المعيّن عليها</div>
          <div className="col-span-1 text-center">نطاق الوحدات</div>
          <div className="col-span-1 text-center">المهام المفتوحة</div>
          <div className="col-span-1 text-center">الحالة</div>
          <div className="col-span-1 text-center">الإجراءات</div>
        </div>

        {/* Member Rows */}
        {paginatedMembers.length === 0 ? (
          <div className="bg-white rounded-[16px] p-12 text-center space-y-3">
            <Users className="size-12 text-[#75786f] mx-auto opacity-40" />
            <h3 className="text-[16px] font-bold text-[#181d17] font-cairo">لا يوجد أعضاء يطابقون معايير البحث</h3>
            <p className="text-[13px] text-[#75786f] font-cairo">جرّب تغيير كلمات البحث أو إعادة ضبط عوامل التصفية.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#f1f5eb] rounded-[8px] text-[12px] font-bold text-[#34422a] font-cairo"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          paginatedMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-[16px] p-4 sm:p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#dfe4db]/40 hover:border-[#34422a]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
            >
              {/* Col 1: Member name & specialty */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="size-11 rounded-full bg-[#dfe4db] flex items-center justify-center text-[14px] font-bold text-[#181d17] font-cairo shadow-sm">
                    {member.initials}
                  </div>
                  {member.isOnline && (
                    <span className="absolute bottom-0 right-0 size-3 rounded-full bg-[#059669] border-2 border-white" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <Link
                    href={`/team/${member.id}`}
                    className="text-[15px] font-bold text-[#181d17] hover:text-[#34422a] transition-colors font-cairo block"
                  >
                    {member.name}
                  </Link>
                  <p className="text-[12px] text-[#75786f] font-medium font-cairo">
                    {member.specialty}
                  </p>
                </div>
              </div>

              {/* Col 2: Role Badge */}
              <div className="lg:col-span-1 flex lg:justify-center">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 font-cairo ${
                    member.role === "cleaner"
                      ? "bg-[#d8e8c7] text-[#131f0b]"
                      : member.role === "maintenance"
                      ? "bg-[#f2e1c0] text-[#231a06]"
                      : "bg-[#ebefe6] text-[#181d17]"
                  }`}
                >
                  {member.role === "cleaner" ? (
                    <Sparkles className="size-3" />
                  ) : member.role === "maintenance" ? (
                    <Wrench className="size-3" />
                  ) : (
                    <Users className="size-3" />
                  )}
                  <span>{member.roleLabel}</span>
                </span>
              </div>

              {/* Col 3: WhatsApp Contact */}
              <div className="lg:col-span-2 flex items-center lg:justify-center gap-2">
                <button
                  type="button"
                  onClick={() => openSendWhatsappModal(member)}
                  className="size-7 rounded-[8px] bg-[#f1f5eb] hover:bg-[#d8e8c7] text-[#34422a] flex items-center justify-center transition-colors"
                  title="إرسال رسالة واتساب"
                >
                  <MessageSquare className="size-3.5" />
                </button>
                <span className="text-[12px] font-bold text-[#181d17] font-cairo" dir="ltr">
                  {member.whatsapp}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(member.whatsapp, "رقم الواتساب")}
                  className="text-[#75786f] hover:text-[#181d17] transition-colors p-1"
                  title="نسخ الرقم"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>

              {/* Col 4: Property */}
              <div className="lg:col-span-2 space-y-0.5">
                <div className="text-[13px] font-bold text-[#181d17] font-cairo">
                  {member.property}
                </div>
                <div className="text-[11px] text-[#75786f] font-medium font-cairo">
                  {member.propertyLocation}
                </div>
              </div>

              {/* Col 5: Units Scope */}
              <div className="lg:col-span-1 flex lg:justify-center">
                <span className="bg-[#ebefe6] text-[#454840] text-[11px] font-semibold px-2 py-1 rounded-[8px] font-cairo">
                  {member.unitsScope}
                </span>
              </div>

              {/* Col 6: Open Tasks */}
              <div className="lg:col-span-1 flex lg:justify-center">
                <span className="bg-[#f2e1c0] text-[#231a06] text-[11px] font-bold px-2 py-1 rounded-full flex items-center gap-1.5 font-cairo">
                  <span className="size-1.5 rounded-full bg-[#e99a38]" />
                  <span>{member.openTasksLabel}</span>
                </span>
              </div>

              {/* Col 7: Status */}
              <div className="lg:col-span-1 flex lg:justify-center">
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 font-cairo ${
                    member.status === "active"
                      ? "bg-[#f1f5eb] text-[#065f46]"
                      : member.status === "suspended"
                      ? "bg-[#ffdad6] text-[#ba1a1a]"
                      : "bg-[#ebefe6] text-[#75786f]"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      member.status === "active"
                        ? "bg-[#059669]"
                        : member.status === "suspended"
                        ? "bg-[#ba1a1a]"
                        : "bg-[#75786f]"
                    }`}
                  />
                  <span>{member.statusLabel}</span>
                </span>
              </div>

              {/* Col 8: Actions */}
              <div className="lg:col-span-1 flex items-center lg:justify-center gap-2">
                <button
                  type="button"
                  onClick={() => openPermissionsModal(member)}
                  className="size-8 rounded-[8px] border border-[#dfe4db] hover:bg-[#f1f5eb] text-[#454840] flex items-center justify-center transition-colors"
                  title="تعديل نطاق الصلاحيات"
                >
                  <KeyRound className="size-3.5" />
                </button>
                <Link
                  href={`/team/${member.id}`}
                  className="size-8 rounded-[8px] border border-[#dfe4db] hover:bg-[#f1f5eb] text-[#454840] flex items-center justify-center transition-colors"
                  title="تعديل الملف الشخصي"
                >
                  <Pencil className="size-3.5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SECTION 5: PAGINATION BAR */}
      <div className="bg-white rounded-[16px] p-4 px-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[13px] font-medium text-[#75786f] font-cairo">
          عرض 1 - 8 من أصل 248 اشتراك مسجل
        </span>

        <div className="flex items-center gap-1 font-cairo text-[13px]">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-[8px] border border-[#dfe4db] text-[#454840] hover:bg-[#f1f5eb] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1"
          >
            <ChevronRight className="size-4" />
            <span>السابق</span>
          </button>

          <button
            onClick={() => setCurrentPage(1)}
            className={`size-8 rounded-full font-bold flex items-center justify-center transition-colors ${
              currentPage === 1 ? "bg-[#34422a] text-white" : "text-[#454840] hover:bg-[#f1f5eb]"
            }`}
          >
            1
          </button>

          <button
            onClick={() => setCurrentPage(2)}
            className={`size-8 rounded-full font-bold flex items-center justify-center transition-colors ${
              currentPage === 2 ? "bg-[#34422a] text-white" : "text-[#454840] hover:bg-[#f1f5eb]"
            }`}
          >
            2
          </button>

          <button
            onClick={() => setCurrentPage(3)}
            className={`size-8 rounded-full font-bold flex items-center justify-center transition-colors ${
              currentPage === 3 ? "bg-[#34422a] text-white" : "text-[#454840] hover:bg-[#f1f5eb]"
            }`}
          >
            3
          </button>

          <span className="px-1 text-[#75786f]">...</span>

          <button
            onClick={() => setCurrentPage(31)}
            className={`size-8 rounded-full font-bold flex items-center justify-center transition-colors ${
              currentPage === 31 ? "bg-[#34422a] text-white" : "text-[#454840] hover:bg-[#f1f5eb]"
            }`}
          >
            31
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.min(31, p + 1))}
            disabled={currentPage === 31}
            className="px-3 py-1.5 rounded-[8px] border border-[#dfe4db] text-[#454840] hover:bg-[#f1f5eb] disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1"
          >
            <span>التالي</span>
            <ChevronLeft className="size-4" />
          </button>
        </div>
      </div>

      {/* MODALS */}
      <SuspendMemberModal
        isOpen={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        member={activeMember}
        availableSubstitutes={members}
        onConfirm={handleSuspendMember}
      />

      <DeleteMemberModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        member={activeMember}
        availableSubstitutes={members}
        onConfirm={handleDeleteMember}
      />

      <ConfirmChangeWhatsappModal
        isOpen={changeWhatsappModalOpen}
        onClose={() => setChangeWhatsappModalOpen(false)}
        member={activeMember}
        onConfirm={handleChangeWhatsapp}
      />

      <EditPermissionsModal
        isOpen={permissionsModalOpen}
        onClose={() => setPermissionsModalOpen(false)}
        member={activeMember}
        onConfirm={handleUpdatePermissions}
      />

      <SendWhatsappMessageModal
        isOpen={sendWhatsappModalOpen}
        onClose={() => setSendWhatsappModalOpen(false)}
        member={activeMember}
        onSend={handleSendWhatsappMessage}
      />
    </div>
  );
}
