"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  MessageSquare,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Hourglass,
  Pencil,
  Pause,
  Trash2,
  KeyRound,
  Phone,
  ArrowRight,
  Building,
  Home,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { TeamMember } from "../types";
import { SuspendMemberModal } from "./modals/suspend-member-modal";
import { DeleteMemberModal } from "./modals/delete-member-modal";
import { ConfirmChangeWhatsappModal } from "./modals/confirm-change-whatsapp-modal";
import { EditPermissionsModal } from "./modals/edit-permissions-modal";
import { SendWhatsappMessageModal } from "./modals/send-whatsapp-message-modal";

interface TeamMemberProfileViewProps {
  initialMember: TeamMember;
  allMembers: TeamMember[];
}

export function TeamMemberProfileView({
  initialMember,
  allMembers,
}: TeamMemberProfileViewProps) {
  const router = useRouter();
  const [member, setMember] = useState<TeamMember>(initialMember);

  // Modals
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeWhatsappModalOpen, setChangeWhatsappModalOpen] = useState(false);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [sendWhatsappModalOpen, setSendWhatsappModalOpen] = useState(false);

  const handleSuspend = (id: string, substituteId?: string) => {
    setMember((prev) => ({
      ...prev,
      status: "suspended",
      statusLabel: "موقوف مؤقتاً",
      openTasksCount: 0,
      openTasksLabel: "لا مهام معلقة",
    }));
    setSuspendModalOpen(false);
    toast.success("تم إيقاف حساب عضو الفريق مؤقتاً");
  };

  const handleDelete = (id: string, substituteId?: string) => {
    setDeleteModalOpen(false);
    toast.success("تم حذف العضو بنجاح");
    router.push("/team");
  };

  const handleChangeWhatsapp = (id: string, newNumber: string, updatePhone: boolean) => {
    setMember((prev) => ({
      ...prev,
      whatsapp: newNumber,
      phone: updatePhone ? newNumber : prev.phone,
    }));
    setChangeWhatsappModalOpen(false);
    toast.success("تم تحديث وتأكيد رقم WhatsApp بنجاح");
  };

  const handleUpdatePermissions = (id: string, scope: "all" | "custom", propertyIds: string[]) => {
    setMember((prev) => ({
      ...prev,
      coverageScope: scope,
      assignedProperties: prev.assignedProperties.map((p) => ({
        ...p,
        isActive: propertyIds.includes(p.id),
      })),
    }));
    setPermissionsModalOpen(false);
    toast.success("تم تحديث نطاق الصلاحيات بنجاح");
  };

  const handleSendWhatsapp = (id: string, title: string) => {
    setSendWhatsappModalOpen(false);
    toast.success(`تم إرسال الرسالة عبر WhatsApp Business API: ${title}`);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Back button breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-[#75786f] font-cairo">
        <Link href="/team" className="hover:text-[#181d17] transition-colors">
          فريق العمل
        </Link>
        <span>/</span>
        <span className="text-[#181d17] font-semibold">{member.name}</span>
      </div>

      {/* SECTION 1: MEMBER BANNER & IDENTITY CARD */}
      <div className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 relative overflow-hidden">
        {/* Soft Ambient decorative gradients matching Figma */}
        <div className="absolute -top-24 -left-24 size-72 rounded-full bg-[rgba(242,225,192,0.3)] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-64 rounded-full bg-[rgba(216,232,199,0.25)] blur-2xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Right side: Avatar and identity */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <div className="size-20 rounded-[16px] bg-[#34422a] text-white flex items-center justify-center text-[24px] font-bold font-cairo shadow-md">
                {member.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-[#059669] text-white flex items-center justify-center border-2 border-white shadow-sm">
                <Check className="size-3 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-[28px] sm:text-[32px] font-bold text-[#181d17] tracking-tight font-cairo leading-none">
                  {member.name}
                </h1>
                <span className="bg-[#d8e8c7] text-[#131f0b] text-[12px] font-semibold px-3 py-0.5 rounded-full font-cairo">
                  {member.roleLabel}
                </span>
                <span className="bg-[#f1f5eb] text-[#065f46] text-[12px] font-semibold px-3 py-0.5 rounded-full flex items-center gap-1.5 font-cairo">
                  <span className="size-2 rounded-full bg-[#059669]" />
                  <span>{member.statusLabel}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#454840] font-cairo">
                <button
                  type="button"
                  onClick={() => setChangeWhatsappModalOpen(true)}
                  className="bg-[#f1f5eb] hover:bg-[#dfe4db] px-2.5 py-1 rounded-[8px] flex items-center gap-2 text-[#181d17] font-bold transition-colors"
                  title="تغيير رقم الواتساب"
                  dir="ltr"
                >
                  <MessageSquare className="size-3.5 text-[#34422a]" />
                  <span>{member.whatsapp}</span>
                </button>

                <div className="flex items-center gap-1.5 text-[#454840]">
                  <Calendar className="size-3.5 text-[#75786f]" />
                  <span>عضو منذ {member.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left side: Action Group */}
          <div className="flex items-center gap-2 w-full lg:w-auto self-stretch lg:self-center">
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="size-11 rounded-[12px] bg-[#ebefe6] hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center transition-colors"
              title="حذف عضو الفريق"
            >
              <Trash2 className="size-4.5" />
            </button>

            <button
              onClick={() => setSuspendModalOpen(true)}
              className="h-11 px-4 rounded-[12px] bg-white border border-[#dfe4db] text-[#181d17] font-semibold text-[14px] flex items-center justify-center gap-2 shadow-sm hover:bg-[#f1f5eb] transition-colors font-cairo"
            >
              <Pause className="size-4" />
              <span>إيقاف مؤقت</span>
            </button>

            <button
              onClick={() => toast.info("وضع تعديل بيانات العضو نشط")}
              className="h-11 px-5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-medium text-[14px] flex items-center justify-center gap-2 shadow-sm transition-colors font-cairo"
            >
              <Pencil className="size-4" />
              <span>تعديل البيانات</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: 3 METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: المهام المفتوحة والجارية */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 flex flex-col justify-between space-y-3">
          <span className="text-[12px] font-medium text-[#454840] font-cairo">
            المهام المفتوحة والجارية
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-[#181d17] leading-none font-cairo">
              {member.stats.openAndRunning}
            </span>
            <span className="text-[13px] font-semibold text-[#75786f] font-cairo">
              مهام قيد التنفيذ
            </span>
          </div>
          <p className="text-[11px] text-[#75786f] font-cairo pt-2 border-t border-[#f1f5eb]">
            {member.stats.currentRunningDetail}
          </p>
        </div>

        {/* Card 2: المهام المكتملة هذا الشهر */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 flex flex-col justify-between space-y-3">
          <span className="text-[12px] font-medium text-[#454840] font-cairo">
            المهام المكتملة هذا الشهر
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-[#181d17] leading-none font-cairo">
              {member.stats.completedThisMonth}
            </span>
            <span className="text-[13px] font-semibold text-[#75786f] font-cairo">
              من إجمالي {member.stats.totalAssignedThisMonth}
            </span>
          </div>
          <div className="w-full bg-[#ebefe6] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#34422a] h-full rounded-full"
              style={{
                width: `${Math.round((member.stats.completedThisMonth / member.stats.totalAssignedThisMonth) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Card 3: متوسط وقت التجهيز */}
        <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 flex flex-col justify-between space-y-3">
          <span className="text-[12px] font-medium text-[#454840] font-cairo">
            متوسط وقت التجهيز
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[40px] font-bold text-[#181d17] leading-none font-cairo">
              {member.stats.avgPrepTimeMinutes}
            </span>
            <span className="text-[13px] font-semibold text-[#75786f] font-cairo">
              دقيقة / وحدة
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#059669] font-cairo pt-2 border-t border-[#f1f5eb]">
            <Zap className="size-3.5 fill-current" />
            <span>أسرع بـ {member.stats.fasterByMinutes} دقائق</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: TWO COLUMN MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* RIGHT COLUMN (In RTL: Left side in layout, takes 4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: نطاق الصلاحيات ونوع المهام */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <h3 className="text-[16px] font-bold text-[#181d17] font-cairo">
                نطاق الصلاحيات ونوع المهام
              </h3>
              <span className="bg-[#f2e1c0] text-[#231a06] text-[10px] font-bold px-2 py-0.5 rounded-full font-cairo">
                محدد
              </span>
            </div>

            <div className="bg-[#f1f5eb] rounded-[12px] p-3 space-y-2 text-[12px] font-cairo">
              <span className="text-[#75786f] font-medium block">نطاق التغطية الجغرافية</span>
              <div className="font-bold text-[#181d17]">عقارات مخصصة</div>
              <div className="space-y-1 text-[#454840] text-[11px]">
                <div className="flex items-center gap-1">
                  <Building className="size-3 text-[#34422a]" />
                  <span>عمارة النخيل (8 وحدات)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="size-3 text-[#34422a]" />
                  <span>برج الياسمين (6 وحدات)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[12.5px] font-cairo px-1">
              <span className="text-[#75786f]">إجمالي الوحدات المشمولة</span>
              <span className="font-bold text-[#181d17]">{member.unitsCount} وحدة</span>
            </div>

            {/* Allowed Task Types */}
            <div className="space-y-2 pt-2 border-t border-[#f1f5eb]">
              <span className="text-[12px] font-bold text-[#181d17] font-cairo block">
                أنواع المهام المصرح بها
              </span>

              <div className="space-y-2 text-[11.5px] font-cairo">
                <div className="bg-[#f1f5eb] p-2.5 rounded-[8px] space-y-0.5">
                  <div className="flex items-center gap-2 font-bold text-[#181d17]">
                    <Check className="size-3.5 text-[#34422a] stroke-[3]" />
                    <span>تنظيف وتجهيز الوحدات بعد المغادرة</span>
                  </div>
                  <p className="text-[#75786f] ps-5">رفع الصور والتقارير عبر الجوال</p>
                </div>

                <div className="bg-[#f1f5eb] p-2.5 rounded-[8px] space-y-0.5">
                  <div className="flex items-center gap-2 font-bold text-[#181d17]">
                    <Check className="size-3.5 text-[#34422a] stroke-[3]" />
                    <span>التفتيش الدوري وتوثيق النواقص</span>
                  </div>
                  <p className="text-[#75786f] ps-5">تسجيل الاستهلاك والمفقودات</p>
                </div>

                <div className="bg-[#f1f5eb]/50 opacity-60 p-2.5 rounded-[8px] space-y-0.5">
                  <div className="flex items-center gap-2 font-bold text-[#75786f]">
                    <X className="size-3.5 text-[#ba1a1a]" />
                    <span>صيانة الأعطال الفنية والكهربائية</span>
                  </div>
                  <p className="text-[#75786f] ps-5">غير مصرح — لفريق الصيانة المتخصص</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setPermissionsModalOpen(true)}
              className="w-full py-2.5 rounded-[10px] bg-[#ebefe6] hover:bg-[#dfe4db] text-[#34422a] font-bold text-[13px] flex items-center justify-center gap-2 transition-colors font-cairo"
            >
              <span>تعديل نطاق الصلاحيات</span>
              <ArrowRight className="size-3.5 rotate-180" />
            </button>
          </div>

          {/* Card 2: أكواد الدخول */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-[#34422a]" />
                <h3 className="text-[16px] font-bold text-[#181d17] font-cairo">
                  أكواد الدخول
                </h3>
              </div>
              <span className="bg-[#f2e1c0] text-[#231a06] text-[10px] font-bold px-2 py-0.5 rounded-full font-cairo">
                مشفر
              </span>
            </div>

            <p className="text-[12px] text-[#454840] leading-relaxed font-cairo">
              نظام TTlock & Tuya السحابي يولد كود دخول رقمي ذكي ينشط فقط عند بدء مهمة التنظيف المعتمدة وينتهي مفعوله فور إغلاق الباب.
            </p>

            {/* Dark Pin Box */}
            <div className="bg-[#2a3324] text-white rounded-[14px] p-5 space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="bg-[#059669] text-white font-bold px-2 py-0.5 rounded font-cairo">
                  فعّال
                </span>
                <span className="text-[#d8e8c7] font-medium font-cairo">
                  شقة 204
                </span>
              </div>

              <div className="text-center py-2">
                <div className="text-[32px] font-bold tracking-[0.35em] text-[#f2e1c0] font-mono">
                  {member.activeSmartLock?.code || "8 4 9 2"}
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#dfe4db] font-cairo">
                <Hourglass className="size-3 text-[#f2e1c0]" />
                <span>ينتهي الكود تلقائياً بعد 35 دقيقة</span>
              </div>
            </div>
          </div>

          {/* Card 3: بوابة WhatsApp الآلية */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-[#059669]" />
                <h3 className="text-[16px] font-bold text-[#181d17] font-cairo">
                  بوابة WhatsApp الآلية
                </h3>
              </div>
              <span className="size-2 rounded-full bg-[#059669] animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-[12px] font-bold text-[#34422a] block font-cairo">
                قناة التنبيهات المباشرة: متصلة ونشطة
              </span>
              <p className="text-[11.5px] text-[#75786f] font-cairo leading-relaxed">
                يستلم العامل روابط البدء وتوجيهات التجهيز، ورفع الصور مباشرة عبر محادثة البوت دون الحاجة لتطبيق منفصل.
              </p>
            </div>

            <div className="bg-[#f1f5eb] rounded-[10px] p-3 text-[11.5px] font-cairo space-y-1">
              <div className="flex items-center justify-between text-[#75786f]">
                <span>آخر إشعار تم تسليمه</span>
                <span>11:02 ص</span>
              </div>
              <p className="font-semibold text-[#181d17]">
                &quot;مهمة جديدة: شقة 204 النخيل، اضغط ا...&quot;
              </p>
              <div className="flex items-center gap-1 text-[10.5px] text-[#059669] font-bold pt-1">
                <Check className="size-3" />
                <span>تم القراءة والبدء</span>
              </div>
            </div>

            <button
              onClick={() => setSendWhatsappModalOpen(true)}
              className="w-full py-2.5 rounded-[10px] bg-[#f1f5eb] hover:bg-[#d8e8c7] text-[#34422a] font-bold text-[13px] flex items-center justify-center gap-2 transition-colors font-cairo"
            >
              <MessageSquare className="size-4" />
              <span>إرسال رسالة تشغيلية عبر WhatsApp</span>
            </button>
          </div>
        </div>

        {/* LEFT COLUMN (In RTL: Main content area, takes 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: البيانات الأساسية وتفاصيل الاتصال */}
          <div className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-5 text-[#34422a]" />
                <h2 className="text-[18px] font-bold text-[#181d17] font-cairo">
                  البيانات الأساسية وتفاصيل الاتصال
                </h2>
              </div>
              <button
                type="button"
                onClick={() => toast.info("وضع تحديث البيانات مفتوح")}
                className="text-[12px] font-bold text-[#34422a] hover:underline flex items-center gap-1 font-cairo"
              >
                <Pencil className="size-3.5" />
                <span>تحديث البيانات</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box 1 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-1">
                <span className="text-[11px] font-medium text-[#75786f] font-cairo block">
                  الاسم الكامل الرسمي
                </span>
                <div className="text-[15px] font-bold text-[#181d17] font-cairo">
                  {member.fullName}
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-1">
                <span className="text-[11px] font-medium text-[#75786f] font-cairo block">
                  رقم الجوال الشخصي
                </span>
                <div className="text-[15px] font-bold text-[#181d17] font-cairo flex items-center gap-2" dir="ltr">
                  <Phone className="size-4 text-[#75786f]" />
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-[#75786f] font-cairo block">
                    رقم الواتساب
                  </span>
                  <div className="text-[15px] font-bold text-[#181d17] font-cairo" dir="ltr">
                    {member.whatsapp}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChangeWhatsappModalOpen(true)}
                  className="bg-[#d8e8c7] hover:bg-[#c5dbb0] text-[#131f0b] text-[11px] font-bold px-2.5 py-1 rounded-[6px] transition-colors font-cairo"
                >
                  مربوط ومفعل
                </button>
              </div>

              {/* Box 4 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-1">
                <span className="text-[11px] font-medium text-[#75786f] font-cairo block">
                  نوع التكليف والتعاقد
                </span>
                <div className="text-[15px] font-bold text-[#181d17] font-cairo">
                  {member.contractType}
                </div>
              </div>

              {/* Box 5 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-1">
                <span className="text-[11px] font-medium text-[#75786f] font-cairo block">
                  تاريخ الانضمام للمنصة
                </span>
                <div className="text-[15px] font-bold text-[#181d17] font-cairo">
                  {member.joinedDate} ({member.tenure})
                </div>
              </div>

              {/* Box 6 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-1">
                <span className="text-[11px] font-medium text-[#75786f] font-cairo block">
                  ساعات العمل
                </span>
                <div className="text-[15px] font-bold text-[#181d17] font-cairo">
                  {member.workingHours}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: المهام الحديثة والتشغيل الميداني */}
          <div className="bg-white rounded-[16px] p-6 sm:p-8 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#dfe4db]/50 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5eb]">
              <div className="flex items-center gap-2.5">
                <Clock className="size-5 text-[#34422a]" />
                <h2 className="text-[18px] font-bold text-[#181d17] font-cairo">
                  المهام الحديثة والتشغيل الميداني
                </h2>
              </div>
              <button
                type="button"
                onClick={() => router.push("/operations")}
                className="text-[12px] font-bold text-[#34422a] hover:underline flex items-center gap-1 font-cairo"
              >
                <span>عرض كل المهام</span>
                <ArrowRight className="size-3.5 rotate-180" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Task 1 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="bg-[#f2e1c0] text-[#231a06] text-[12px] font-bold px-2.5 py-1 rounded-[8px] font-cairo shrink-0 mt-0.5">
                    شقة 204
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px] font-bold text-[#181d17] font-cairo">
                        تنظيف وتجهيز ما بعد المغادرة
                      </span>
                      <span className="text-[11px] font-mono text-[#75786f]">#CLN-2048</span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#454840] font-cairo">
                      <span>عمارة النخيل — الرياض</span>
                      <span>•</span>
                      <span className="text-[#059669] font-medium">كود القفل الذكي: فعال ومسجل الدخول</span>
                    </div>
                  </div>
                </div>

                <span className="bg-[#fff8e6] border border-[#f2e1c0] text-[#6f6349] text-[11px] font-bold px-3 py-1 rounded-full font-cairo shrink-0 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#e99a38] animate-ping" />
                  <span>جاري التنظيف (منذ 25 دقيقة)</span>
                </span>
              </div>

              {/* Task 2 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="bg-[#dfe4db] text-[#181d17] text-[12px] font-bold px-2.5 py-1 rounded-[8px] font-cairo shrink-0 mt-0.5">
                    جناح 202
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px] font-bold text-[#181d17] font-cairo">
                        تنظيف دوري وتفقد الأجهزة
                      </span>
                      <span className="text-[11px] font-mono text-[#75786f]">#CLN-2041</span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#454840] font-cairo">
                      <span>برج الياسمين — الرياض</span>
                      <span>•</span>
                      <span className="text-[#34422a] font-medium">تم إرسال رابط المهمة عبر واتساب</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="bg-[#ebefe6] text-[#454840] text-[11px] font-semibold px-3 py-1 rounded-full font-cairo">
                    مجدولة (الساعة 02:00 م اليوم)
                  </span>
                  <button
                    type="button"
                    onClick={() => toast.info("فتح جدولة المهمة")}
                    className="px-2.5 py-1 rounded-[6px] bg-white border border-[#dfe4db] text-[11px] font-bold text-[#181d17] hover:bg-[#f1f5eb] font-cairo"
                  >
                    تعديل الموعد
                  </button>
                </div>
              </div>

              {/* Task 3 */}
              <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="bg-[#d8e8c7] text-[#131f0b] text-[12px] font-bold px-2.5 py-1 rounded-[8px] font-cairo shrink-0 mt-0.5">
                    شقة 104
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px] font-bold text-[#181d17] font-cairo">
                        تنظيف عميق وتجهيز المفارش الفندقية
                      </span>
                      <span className="text-[11px] font-mono text-[#75786f]">#CLN-2035</span>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-[#454840] font-cairo">
                      <span>عمارة النخيل — الرياض</span>
                      <span>•</span>
                      <span>استغرق 38 دقيقة • تم اعتماد 6 صور توثيق</span>
                    </div>
                  </div>
                </div>

                <span className="bg-[#e5eae0] text-[#065f46] text-[11px] font-bold px-3 py-1 rounded-full font-cairo shrink-0 flex items-center gap-1">
                  <Check className="size-3" />
                  <span>مكتملة ومعتمدة (اليوم 10:30 ص)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modals */}
      <SuspendMemberModal
        isOpen={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        member={member}
        availableSubstitutes={allMembers}
        onConfirm={handleSuspend}
      />

      <DeleteMemberModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        member={member}
        availableSubstitutes={allMembers}
        onConfirm={handleDelete}
      />

      <ConfirmChangeWhatsappModal
        isOpen={changeWhatsappModalOpen}
        onClose={() => setChangeWhatsappModalOpen(false)}
        member={member}
        onConfirm={handleChangeWhatsapp}
      />

      <EditPermissionsModal
        isOpen={permissionsModalOpen}
        onClose={() => setPermissionsModalOpen(false)}
        member={member}
        onConfirm={handleUpdatePermissions}
      />

      <SendWhatsappMessageModal
        isOpen={sendWhatsappModalOpen}
        onClose={() => setSendWhatsappModalOpen(false)}
        member={member}
        onSend={handleSendWhatsapp}
      />
    </div>
  );
}
