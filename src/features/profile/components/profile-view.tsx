"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MessageSquare,
  Clock,
  Zap,
  ShieldCheck,
  Check,
  CheckCheck,
  Lock,
  Hourglass,
  Pencil,
  Pause,
  Play,
  RotateCw,
  Phone,
  Building,
  Building2,
  SlidersHorizontal,
  ArrowRight,
  Radio,
  User,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { UserProfileData, ProfileTask } from "../types";
import { EditProfileModal } from "./modals/edit-profile-modal";
import { EditPermissionsModal } from "./modals/edit-permissions-modal";
import { SendOperationalWhatsappModal } from "./modals/send-operational-whatsapp-modal";
import { RescheduleTaskModal } from "./modals/reschedule-task-modal";
import { setAuthSession } from "@/lib/auth-session";
import { UpdateProfileInput } from "../schemas/profile.schema";

interface ProfileViewProps {
  initialProfile: UserProfileData;
}

export function ProfileView({ initialProfile }: ProfileViewProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfileData>(initialProfile);

  // Modals state
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editPermissionsOpen, setEditPermissionsOpen] = useState(false);
  const [sendWhatsappOpen, setSendWhatsappOpen] = useState(false);
  const [rescheduleTaskOpen, setRescheduleTaskOpen] = useState(false);
  const [selectedTaskForReschedule, setSelectedTaskForReschedule] = useState<ProfileTask | null>(null);

  // Dynamic code refresh state
  const [isRefreshingCode, setIsRefreshingCode] = useState(false);

  // Toggle user suspension/active status
  const handleToggleStatus = () => {
    setProfile((prev) => {
      const nextStatus = prev.status === "active" ? "suspended" : "active";
      const nextLabel = nextStatus === "active" ? "نشط" : "موقوف مؤقتاً";
      toast.success(
        nextStatus === "active"
          ? "تم إعادة تنشيط الحساب بنجاح"
          : "تم إيقاف الحساب مؤقتاً"
      );
      return {
        ...prev,
        status: nextStatus,
        statusLabel: nextLabel,
      };
    });
  };

  // Save profile updates
  const handleSaveProfile = (data: UpdateProfileInput) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));

    // Sync to auth-session localStorage so Sidebar & Topbar reflect instantly
    setAuthSession(
      {
        fullName: data.fullName,
        identifier: data.phone,
        role: profile.role,
      },
      true
    );

    toast.success("تم تحديث بيانات الملف الشخصي بنجاح");
  };

  // Save permissions updates
  const handleSavePermissions = (
    scope: "all" | "custom",
    propertyIds: string[],
    permissions: UserProfileData["permissions"]
  ) => {
    setProfile((prev) => ({
      ...prev,
      coverageScope: scope,
      coverageLabel: scope === "all" ? "شامل لكافة العقارات" : "عقارات مخصصة",
      assignedProperties: prev.assignedProperties.map((p) => ({
        ...p,
        isActive: propertyIds.includes(p.id),
      })),
      permissions,
    }));
    toast.success("تم حفظ وتحديث نطاق الصلاحيات");
  };

  // Generate new random smart passcode
  const handleRefreshPasscode = () => {
    setIsRefreshingCode(true);
    setTimeout(() => {
      const newRandomCode = Math.floor(1000 + Math.random() * 9000).toString();
      setProfile((prev) => ({
        ...prev,
        activeSmartLock: {
          ...prev.activeSmartLock,
          code: newRandomCode,
          expiresInMinutes: 45,
        },
      }));
      setIsRefreshingCode(false);
      toast.success(`تم توليد كود دخول رقمي ذكي جديد: ${newRandomCode}`);
    }, 400);
  };

  // Copy passcode
  const handleCopyPasscode = () => {
    navigator.clipboard.writeText(profile.activeSmartLock.code);
    toast.success(`تم نسخ كود الدخول (${profile.activeSmartLock.code}) إلى الحافظة`);
  };

  // Send WhatsApp message
  const handleSendWhatsappMessage = (title: string) => {
    setSendWhatsappOpen(false);
    toast.success(`تم إرسال إشعار WhatsApp عبر القناة الآلية: ${title}`);
  };

  // Reschedule Task
  const handleSaveReschedule = (taskId: string, newTime: string) => {
    setProfile((prev) => ({
      ...prev,
      recentTasks: prev.recentTasks.map((t) =>
        t.id === taskId ? { ...t, statusText: newTime } : t
      ),
    }));
    toast.success("تم تعديل موعد المهمة المجدولة بنجاح");
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Breadcrumb Trail */}
      <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-[13px] text-[#75786f] font-cairo">
        <Link href="/" className="hover:text-[#181d17] transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-[#181d17] font-semibold">الملف الشخصي</span>
      </nav>

      {/* ========================================================================= */}
      {/* 1. MEMBER BANNER & IDENTITY CARD (Exact Figma Node 1:37562)              */}
      {/* ========================================================================= */}
      <section
        aria-label="بطاقة الهوية والبيانات الرئيسية"
        className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 relative overflow-hidden font-cairo"
      >
        {/* Ambient Decorative Blur Gradients from Figma */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 size-72 rounded-full bg-[rgba(242,225,192,0.3)] blur-[32px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 left-1/3 w-80 h-64 rounded-full bg-[rgba(216,232,199,0.25)] blur-[20px] pointer-events-none"
        />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Start (Right in RTL): Avatar + Personal Identity Details */}
          <div className="flex items-start sm:items-center gap-4">
            {/* Avatar with Status Ring */}
            <div className="relative shrink-0">
              <div className="size-20 rounded-[16px] bg-[#34422a] text-white flex items-center justify-center text-[24px] font-bold font-cairo shadow-md">
                {profile.initials}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 size-5 rounded-full ${
                  profile.status === "active" ? "bg-[#059669]" : "bg-[#ba1a1a]"
                } text-white flex items-center justify-center ring-4 ring-white shadow-sm`}
                title={profile.statusLabel}
              >
                <Check className="size-3 stroke-[3]" />
              </div>
            </div>

            {/* Name, Badges, WhatsApp & Date */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[28px] sm:text-[32px] font-bold text-[#181d17] tracking-tight leading-none">
                  {profile.name}
                </h1>
                <span className="bg-[#d8e8c7] text-[#131f0b] text-[12px] font-semibold px-3 py-0.5 rounded-full">
                  {profile.role}
                </span>
                <span
                  className={`text-[12px] font-semibold px-3 py-0.5 rounded-full flex items-center gap-1.5 ${
                    profile.status === "active"
                      ? "bg-[#f1f5eb] text-[#065f46]"
                      : "bg-[#fff8e6] text-[#ba1a1a]"
                  }`}
                >
                  <span
                    className={`size-2 rounded-full ${
                      profile.status === "active" ? "bg-[#059669]" : "bg-[#ba1a1a]"
                    }`}
                  />
                  <span>{profile.statusLabel}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#454840]">
                {/* Mobile / WhatsApp Pill */}
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(true)}
                  className="bg-[#f1f5eb] hover:bg-[#dfe4db] px-2.5 py-1 rounded-[8px] flex items-center gap-1.5 text-[#181d17] font-bold transition-colors cursor-pointer"
                  title="تحديث وسيلة التواصل"
                  dir="ltr"
                >
                  <MessageSquare className="size-3.5 text-[#34422a] fill-current" />
                  <span>{profile.whatsapp}</span>
                </button>

                {/* Membership Date */}
                <div className="flex items-center gap-1.5 text-[#454840]">
                  <Calendar className="size-3.5 text-[#75786f]" />
                  <span>عضو منذ {profile.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* End (Left in RTL): Action Buttons Group */}
          <div className="flex items-center gap-2 w-full lg:w-auto self-stretch lg:self-center">
            {/* Options / Settings Button */}
            <button
              type="button"
              onClick={() => router.push("/settings")}
              className="size-11 rounded-[12px] bg-[#ebefe6] hover:bg-[#dfe4db] text-[#34422a] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="إعدادات الحساب والنظام"
              aria-label="الإعدادات"
            >
              <SlidersHorizontal className="size-4.5" />
            </button>

            {/* Suspend / Active Toggle Button */}
            <button
              type="button"
              onClick={handleToggleStatus}
              className="h-11 px-4 rounded-[12px] bg-white border border-[#dfe4db] text-[#181d17] font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm hover:bg-[#f1f5eb] transition-colors cursor-pointer font-cairo"
            >
              {profile.status === "active" ? (
                <>
                  <Pause className="size-4" />
                  <span>إيقاف مؤقت</span>
                </>
              ) : (
                <>
                  <Play className="size-4" />
                  <span>تنشيط الحساب</span>
                </>
              )}
            </button>

            {/* Primary Action Button: تعديل البيانات */}
            <button
              type="button"
              onClick={() => setEditProfileOpen(true)}
              className="h-11 px-5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-medium text-[14px] flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer font-cairo"
            >
              <Pencil className="size-4" />
              <span>تعديل البيانات</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TAB CONTENT GRID: Right Area (2/3) + Left Column (1/3)                */}
      {/* In RTL: Right Column (col-span-8) appears first at START                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-cairo">
        {/* ======================================================================= */}
        {/* MAIN COLUMN (8 cols): Stat Cards, Essential Data, Operational Tasks   */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* Row 1: Key Metrics (3 Stat Cards matching Figma) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Stat Card 1 (Right): المهام المفتوحة والجارية */}
            <div className="bg-white rounded-[16px] p-4 sm:p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 flex flex-col justify-between h-[172px]">
              <div>
                <span className="text-[12px] font-semibold text-[#454840] block">
                  المهام المفتوحة والجارية
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[40px] font-bold text-[#181d17] leading-tight">
                    {profile.stats.openAndRunning}
                  </span>
                  <span className="text-[12px] font-bold text-[#695d43]">
                    مهام قيد التنفيذ
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[14px] text-[#454840] truncate">
                  {profile.stats.currentRunningDetail}
                </p>
                <div className="w-full bg-[#ebefe6] h-[6px] rounded-full overflow-hidden">
                  <div className="bg-[#695d43] h-full rounded-full w-[65%]" />
                </div>
              </div>
            </div>

            {/* Stat Card 2 (Middle): المهام المكتملة هذا الشهر */}
            <div className="bg-white rounded-[16px] p-4 sm:p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 flex flex-col justify-between h-[172px]">
              <div>
                <span className="text-[12px] font-semibold text-[#454840] block">
                  المهام المكتملة هذا الشهر
                </span>
                <div className="mt-2">
                  <span className="text-[40px] font-bold text-[#181d17] leading-tight">
                    {profile.stats.completedThisMonth}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[14px] text-[#454840]">
                  من إجمالي {profile.stats.totalAssignedThisMonth}
                </p>
                <div className="w-full bg-[#ebefe6] h-[6px] rounded-full overflow-hidden">
                  <div className="bg-[#34422a] h-full rounded-full w-[97%]" />
                </div>
              </div>
            </div>

            {/* Stat Card 3 (Left): متوسط وقت التجهيز */}
            <div className="bg-white rounded-[16px] p-4 sm:p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 flex flex-col justify-between h-[172px]">
              <div>
                <span className="text-[12px] font-semibold text-[#454840] block">
                  متوسط وقت التجهيز
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[40px] font-bold text-[#181d17] leading-tight">
                    {profile.stats.avgPrepTimeMinutes}
                  </span>
                  <span className="text-[12px] font-semibold text-[#454840]">
                    دقيقة / وحدة
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#065f46]">
                  <Zap className="size-4 fill-current" />
                  <span>أسرع بـ {profile.stats.fasterByMinutes} دقائق</span>
                </div>
                <div className="w-full bg-[#ebefe6] h-[6px] rounded-full overflow-hidden">
                  <div className="bg-[#d5c5a5] h-full rounded-full w-[82%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: البيانات الأساسية وتفاصيل الاتصال (Essential Data) */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-[8px] bg-[#ebefe6] text-[#34422a] flex items-center justify-center">
                  <User className="size-4.5" />
                </div>
                <h2 className="text-[20px] font-bold text-[#181d17]">
                  البيانات الأساسية وتفاصيل الاتصال
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditProfileOpen(true)}
                className="text-[12px] font-semibold text-[#34422a] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Pencil className="size-3.5" />
                <span>تحديث البيانات</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box 1: الاسم الكامل الرسمي */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3 space-y-1">
                <span className="text-[11px] font-medium text-[#454840] block">
                  الاسم الكامل الرسمي
                </span>
                <div className="text-[18px] font-bold text-[#181d17]">
                  {profile.fullName}
                </div>
              </div>

              {/* Box 2: رقم الجوال الشخصي */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-[#454840] block">
                    رقم الجوال الشخصي
                  </span>
                  <div className="text-[18px] font-bold text-[#181d17]" dir="ltr">
                    {profile.phone}
                  </div>
                </div>
                <a
                  href={`tel:${profile.phone}`}
                  className="size-8 rounded-[6px] bg-white/70 hover:bg-white text-[#34422a] flex items-center justify-center transition-colors"
                  title="اتصال هاتفي"
                >
                  <Phone className="size-3.5" />
                </a>
              </div>

              {/* Box 3: رقم الواتساب */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-[#454840] block">
                    رقم الواتساب
                  </span>
                  <div className="text-[18px] font-bold text-[#181d17]" dir="ltr">
                    {profile.whatsapp}
                  </div>
                </div>
                <span className="bg-[#ebefe6] text-[#065f46] text-[11px] font-semibold px-2 py-0.5 rounded-[4px] flex items-center gap-1">
                  <span>مربوط ومفعل</span>
                  <Check className="size-3 stroke-[3]" />
                </span>
              </div>

              {/* Box 4: نوع التكليف والتعاقد */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3 space-y-1">
                <span className="text-[11px] font-medium text-[#454840] block">
                  نوع التكليف والتعاقد
                </span>
                <div className="text-[18px] font-bold text-[#181d17]">
                  {profile.contractType}
                </div>
              </div>

              {/* Box 5: تاريخ الانضمام للمنصة */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3 space-y-1">
                <span className="text-[11px] font-medium text-[#454840] block">
                  تاريخ الانضمام للمنصة
                </span>
                <div className="text-[18px] font-bold text-[#181d17]">
                  {profile.joinedDate} ({profile.tenure})
                </div>
              </div>

              {/* Box 6: ساعات العمل */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-3 space-y-1">
                <span className="text-[11px] font-medium text-[#454840] block">
                  ساعات العمل
                </span>
                <div className="text-[18px] font-bold text-[#181d17]">
                  {profile.workingHours}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: المهام الحديثة والتشغيل الميداني */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-[8px] bg-[#ebefe6] text-[#34422a] flex items-center justify-center">
                  <Clock className="size-4.5" />
                </div>
                <h2 className="text-[20px] font-bold text-[#181d17]">
                  المهام الحديثة والتشغيل الميداني
                </h2>
              </div>
              <Link
                href="/operations"
                className="text-[12px] font-bold text-[#34422a] hover:underline flex items-center gap-1"
              >
                <span>عرض كل المهام</span>
                <ArrowRight className="size-3.5 rotate-180" />
              </Link>
            </div>

            <div className="space-y-3">
              {profile.recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    {/* Unit Box Badge matching Figma */}
                    <div
                      className="size-12 rounded-[12px] flex flex-col items-center justify-center shrink-0 shadow-2xs"
                      style={{
                        backgroundColor: task.unitBadgeBg,
                        color: task.unitBadgeText,
                      }}
                    >
                      <span className="text-[11px] font-medium leading-tight">
                        {task.unitLabel}
                      </span>
                      <span className="text-[18px] font-semibold leading-tight">
                        {task.unitBadge}
                      </span>
                    </div>

                    {/* Task Title & Details */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[18px] font-bold text-[#181d17]">
                          {task.title}
                        </span>
                        <span className="text-[11px] font-bold text-[#695d43]">
                          {task.code}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                            task.statusType === "in_progress"
                              ? "bg-[#f2e1c0] text-[#231a06]"
                              : task.statusType === "scheduled"
                              ? "bg-[#dfe4db] text-[#454840]"
                              : "bg-[#ebefe6] text-[#065f46]"
                          }`}
                        >
                          {task.statusType === "in_progress" && (
                            <span className="size-1.5 rounded-full bg-[#231a06]" />
                          )}
                          {task.statusType === "completed" && (
                            <Check className="size-3 stroke-[3]" />
                          )}
                          <span>{task.statusText}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[14px] text-[#454840] flex-wrap">
                        <span className="flex items-center gap-1">
                          <Building className="size-3.5 text-[#454840]" />
                          <span>{task.property} - {task.location}</span>
                        </span>
                        {task.smartLockStatus && (
                          <>
                            <span>•</span>
                            <span className="text-[#34422a] font-medium flex items-center gap-1">
                              <Lock className="size-3 text-[#34422a]" />
                              <span>{task.smartLockStatus}</span>
                            </span>
                          </>
                        )}
                        {task.whatsappNotification && (
                          <>
                            <span>•</span>
                            <span className="text-[#065f46] flex items-center gap-1">
                              <MessageSquare className="size-3" />
                              <span>{task.whatsappNotification}</span>
                            </span>
                          </>
                        )}
                        {task.durationOrPhotos && (
                          <>
                            <span>•</span>
                            <span>{task.durationOrPhotos}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Reschedule Button on Scheduled Task */}
                  {task.statusType === "scheduled" && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTaskForReschedule(task);
                        setRescheduleTaskOpen(true);
                      }}
                      className="bg-white hover:bg-[#f1f5eb] text-[#181d17] text-[12px] font-semibold px-4 py-1.5 rounded-[8px] shadow-sm border border-[#dfe4db] cursor-pointer shrink-0 transition-colors"
                    >
                      تعديل الموعد
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* SIDE COLUMN (4 cols): Permissions, Smart Locks, WhatsApp Bot Card     */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: نطاق الصلاحيات ونوع المهام */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-[#181d17]" />
                <h3 className="text-[18px] font-bold text-[#181d17] leading-tight">
                  نطاق الصلاحيات ونوع المهام
                </h3>
              </div>
              <span className="bg-[#f2e1c0] text-[#231a06] text-[11px] font-bold px-2 py-0.5 rounded-[6px]">
                محدد
              </span>
            </div>

            {/* Geographic Coverage */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-3 space-y-2">
              <span className="text-[11px] font-medium text-[#454840] block">
                نطاق التغطية الجغرافية
              </span>
              <div className="text-[18px] font-bold text-[#181d17]">
                {profile.coverageLabel}
              </div>
              <div className="flex flex-col gap-1.5 pt-1">
                {profile.assignedProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-[#ebefe6] text-[11px] font-semibold text-[#181d17] px-2 py-1 rounded-[6px] flex items-center gap-1.5 w-fit"
                  >
                    <Building2 className="size-3 text-[#34422a]" />
                    <span>{prop.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Units Pill */}
            <div className="bg-[rgba(216,232,199,0.3)] rounded-[12px] p-3 flex items-center justify-between text-[#3d4b33]">
              <span className="text-[12px] font-semibold">
                إجمالي الوحدات المشمولة
              </span>
              <span className="text-[16px] font-bold">
                {profile.totalUnitsCount} وحدة
              </span>
            </div>

            {/* Permitted Task Types Checklist */}
            <div className="space-y-2 pt-1 border-t border-[#f1f5eb]">
              <span className="text-[11px] font-bold text-[#454840] uppercase tracking-wider block">
                أنواع المهام المصرح بها
              </span>

              <div className="space-y-2">
                {/* Item 1 */}
                <div className="bg-[rgba(241,245,235,0.6)] rounded-[8px] p-2.5 flex items-start gap-2.5">
                  <div className="size-4 rounded-[4px] bg-[#34422a] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[14px] font-bold text-[#181d17] leading-snug">
                      تنظيف وتجهيز الوحدات بعد المغادرة
                    </div>
                    <div className="text-[11px] font-medium text-[#454840]">
                      رفع الصور والتقارير عبر الجوال
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-[rgba(241,245,235,0.6)] rounded-[8px] p-2.5 flex items-start gap-2.5">
                  <div className="size-4 rounded-[4px] bg-[#34422a] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[14px] font-bold text-[#181d17] leading-snug">
                      التفتيش الدوري وتوثيق النواقص
                    </div>
                    <div className="text-[11px] font-medium text-[#454840]">
                      تسجيل الاستهلاك والمفقودات
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-[rgba(241,245,235,0.3)] opacity-70 rounded-[8px] p-2.5 flex items-start gap-2.5">
                  <div className="size-4 rounded-[4px] border border-[#dfe4db] bg-white flex items-center justify-center shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-[14px] font-medium text-[#75786f] leading-snug">
                      صيانة الأعطال الفنية والكهربائية
                    </div>
                    <div className="text-[11px] font-medium text-[#75786f]">
                      غير مصرح - لفريق الصيانة المتخصص
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Permissions CTA */}
            <button
              type="button"
              onClick={() => setEditPermissionsOpen(true)}
              className="w-full py-2.5 rounded-[12px] bg-[#ebefe6] hover:bg-[#dfe4db] text-[#34422a] font-bold text-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>تعديل نطاق الصلاحيات</span>
              <ArrowRight className="size-3.5 rotate-180" />
            </button>
          </div>

          {/* Card 2: أكواد الدخول (Smart Locks) */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2">
                <Lock className="size-4.5 text-[#181d17]" />
                <h3 className="text-[18px] font-bold text-[#181d17]">
                  أكواد الدخول
                </h3>
              </div>
              <span className="bg-[#f2e1c0] text-[#231a06] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                مشفر
              </span>
            </div>

            <p className="text-[14px] text-[#454840] leading-relaxed">
              نظام TTLock & Tuya السحابي يولد كود دخول رقمي ذكي ينشط فقط عند بدء مهمة التنظيف المعتمدة وينتهي مفعوله فور إغلاق الباب.
            </p>

            {/* Current Active Passcode Widget */}
            <div className="bg-[#364132] rounded-[12px] p-4 text-white space-y-3 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#dfe4db]">
                  كود الدخول المؤقت للمهمة الحالية
                </span>
                <span className="bg-[#4d5848] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
                  فعّال
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="text-[11px] font-medium text-[#dfe4db]">
                  {profile.activeSmartLock.unit}
                </div>
                <div className="font-mono text-[32px] font-bold tracking-[3.2px] text-white flex items-center gap-2">
                  <span>••</span>
                  <span>{profile.activeSmartLock.code}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleCopyPasscode}
                    className="size-8 rounded-[8px] bg-[#4d5848] hover:bg-[#5b6855] text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="نسخ الكود"
                  >
                    <Copy className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRefreshPasscode}
                    disabled={isRefreshingCode}
                    className="size-8 rounded-[8px] bg-[#4d5848] hover:bg-[#5b6855] text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                    title="توليد كود جديد"
                  >
                    <RotateCw className={`size-3.5 ${isRefreshingCode ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#dfe4db] pt-1 border-t border-white/10">
                <Hourglass className="size-3.5" />
                <span>ينتهي الكود تلقائياً بعد {profile.activeSmartLock.expiresInMinutes} دقيقة</span>
              </div>
            </div>
          </div>

          {/* Card 3: بوابة WhatsApp الآلية */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4.5 text-[#059669] fill-current" />
                <h3 className="text-[18px] font-bold text-[#181d17]">
                  بوابة WhatsApp الآلية
                </h3>
              </div>
              <span className="size-2.5 rounded-full bg-[#059669] animate-pulse" />
            </div>

            {/* Alert Channel Status */}
            <div className="bg-[#f1f5eb] rounded-[12px] p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#181d17]">
                <Radio className="size-3.5 text-[#059669]" />
                <span>{profile.whatsappGateway.channelName}</span>
              </div>
              <p className="text-[14px] text-[#454840] leading-relaxed">
                {profile.whatsappGateway.description}
              </p>
            </div>

            {/* Latest Notification Ping */}
            <div className="bg-[#ebefe6] rounded-[12px] p-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#695d43]">آخر إشعار تم تسليمه</span>
                <span className="text-[#454840]">{profile.whatsappGateway.lastMessageTime}</span>
              </div>
              <p className="text-[14px] font-medium text-[#181d17]">
                {profile.whatsappGateway.lastMessageContent}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#065f46] pt-1">
                <CheckCheck className="size-3.5" />
                <span>{profile.whatsappGateway.lastMessageStatus}</span>
              </div>
            </div>

            {/* Operational WhatsApp CTA */}
            <button
              type="button"
              onClick={() => setSendWhatsappOpen(true)}
              className="w-full py-2.5 rounded-[12px] bg-[#f1f5eb] hover:bg-[#dfe4db] text-[#181d17] font-bold text-[12px] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageSquare className="size-4 text-[#059669]" />
              <span>إرسال رسالة تشغيلية عبر WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <EditPermissionsModal
        isOpen={editPermissionsOpen}
        onClose={() => setEditPermissionsOpen(false)}
        profile={profile}
        onSave={handleSavePermissions}
      />

      <SendOperationalWhatsappModal
        isOpen={sendWhatsappOpen}
        onClose={() => setSendWhatsappOpen(false)}
        onSend={handleSendWhatsappMessage}
      />

      <RescheduleTaskModal
        isOpen={rescheduleTaskOpen}
        onClose={() => setRescheduleTaskOpen(false)}
        task={selectedTaskForReschedule}
        onSave={handleSaveReschedule}
      />
    </div>
  );
}
