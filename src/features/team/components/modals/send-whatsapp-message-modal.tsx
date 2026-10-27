"use client";

import { useState, useEffect } from "react";
import {
  X,
  MessageSquare,
  Lock,
  Send,
  Building2,
  Home,
  CheckSquare,
  Info,
  ShieldCheck,
  Eye,
  KeyRound,
  Bell,
  Clock,
  Sparkles,
} from "lucide-react";
import { SelectDropdown } from "@/components/shared/select-dropdown";
import { propertiesService } from "@/services/properties-service";
import { unitsService } from "@/services/units-service";
import { TeamMember } from "../../types";

interface SendWhatsappMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onSend: (memberId: string, templateTitle: string, note?: string) => void;
}

export function SendWhatsappMessageModal({
  isOpen,
  onClose,
  member,
  onSend,
}: SendWhatsappMessageModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [propertyList, setPropertyList] = useState<{ id: string; name: string }[]>([]);
  const [unitList, setUnitList] = useState<{ id: string; name: string }[]>([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [includeSmartLock, setIncludeSmartLock] = useState(true);

  useEffect(() => {
    propertiesService.getAll().then((props) => {
      setPropertyList(props.map((p) => ({ id: p.id, name: p.title })));
      if (props.length > 0 && !selectedProperty) {
        setSelectedProperty(props[0].title);
      }
    });
    unitsService.getAll().then((units) => {
      setUnitList(units.map((u) => ({ id: u.id, name: `شقة ${u.unitNumber}` })));
      if (units.length > 0 && !selectedUnit) {
        setSelectedUnit(`شقة ${units[0].unitNumber}`);
      }
    });
  }, []);

  if (!isOpen || !member) return null;

  const templates = [
    {
      id: 1,
      title: "تكليف مهمة جديدة فورية",
      subtitle: "شامل الموقع والرمز",
      icon: Sparkles,
      message: `مرحباً ${member.name}، لديك مهمة تشغيلية جديدة:
📍 الموقع: ${selectedProperty} — ${selectedUnit.split(" — ")[0]}
⏰ التوقيت المطلوب: بدء التجهيز الساعة 01:00 ظهراً
${includeSmartLock ? "🔑 كود الدخول الذكي المؤقت: [سيتم توليده وتفعيله فور بدء المهمة]\n" : ""}📋 المطلوب: تنظيف وتجهيز شامل، وتوثيق استلام الغرف عبر الرابط الميداني:
https://abraj.sa/task/CLN-2055`,
    },
    {
      id: 2,
      title: "تذكير بموعد تجهيز",
      subtitle: "تأكيد موعد الدخول",
      icon: Clock,
      message: `مرحباً ${member.name}، نود تذكيرك بالموعد المجدول لتجهيز ${selectedUnit.split(" — ")[0]} في ${selectedProperty} خلال 30 دقيقة. يرجى تأكيد استلام التنبيه والبدء فور الوصول.`,
    },
    {
      id: 3,
      title: "تحديث كود الدخول الذكي",
      subtitle: "رمز القفل الإلكتروني",
      icon: KeyRound,
      message: `تم تحديث كود الدخول الذكي المؤقت لوحدتك: ${selectedUnit.split(" — ")[0]}. الكود الجديد هو: 8492 وينتهي مفعوله تلقائياً فور إغلاق الباب.`,
    },
    {
      id: 4,
      title: "رسالة حرة / تنبيه عام",
      subtitle: "توجيهات إدارية مباشرة",
      icon: Bell,
      message: `تنبيه إداري: نرجو من كافة أعضاء فريق التشغيل الالتزام بمعايير الفحص المعتمدة وتوثيق صور الغرف قبل المغادرة. شكراً لجهودكم.`,
    },
  ];

  const currentTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" dir="rtl">
      <div
        className="bg-white relative w-full max-w-[740px] max-h-[92vh] rounded-[16px] shadow-[0px_20px_40px_-8px_rgba(37,42,36,0.18)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-[#f1f5eb] shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-[12px] bg-[#34422a] text-white flex items-center justify-center shrink-0 shadow-sm relative">
              <MessageSquare className="size-5" />
              <div className="absolute -bottom-1 -left-1 size-4 bg-[#f2e1c0] text-[#231a06] rounded-full flex items-center justify-center text-[9px] font-bold">
                ⚡
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[19px] font-bold text-[#181d17] font-cairo">
                  إرسال رسالة تشغيلية عبر WhatsApp
                </h2>
                <span className="bg-[#f2e1c0] text-[#6f6349] text-[10px] font-bold px-2 py-0.5 rounded-full font-cairo">
                  WhatsApp Business API
                </span>
              </div>
              <p className="text-[12px] text-[#454840] font-cairo">
                المستلم: <span className="font-semibold text-[#34422a]">{member.fullName}</span> • {member.roleLabel} • {member.phone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-[10px] bg-[#ebefe6] text-[#454840] flex items-center justify-center hover:bg-[#dfe4db] transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Section 1: Template Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[13px] font-cairo">
              <span className="font-bold text-[#181d17]">
                اختر نوع التكليف أو القالب المعتمد:
              </span>
              <span className="text-[11px] text-[#75786f]">
                القوالب معتمدة مسبقاً وتتجاوز القيود
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {templates.map((tpl) => {
                const isActive = tpl.id === selectedTemplate;
                const Icon = tpl.icon;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`p-3 rounded-[12px] text-right transition-all flex flex-col justify-between h-[92px] ${
                      isActive
                        ? "bg-[#f1f5eb] border border-[#34422a] shadow-sm"
                        : "bg-[#ebefe6] border border-transparent hover:bg-[#dfe4db]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Icon className={`size-4 ${isActive ? "text-[#34422a]" : "text-[#75786f]"}`} />
                      {isActive && <div className="size-2 rounded-full bg-[#34422a]" />}
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-[#181d17] leading-tight font-cairo">
                        {tpl.title}
                      </div>
                      <div className="text-[10px] text-[#75786f] mt-0.5 font-cairo">
                        {tpl.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Operational Context */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-[#181d17] flex items-center gap-1.5 font-cairo">
                  <Building2 className="size-3.5 text-[#34422a]" />
                  <span>العقار المستهدف:</span>
                </label>
                <SelectDropdown
                  value={selectedProperty}
                  onChange={setSelectedProperty}
                  options={
                    propertyList.length > 0
                      ? propertyList.map((p) => p.name)
                      : ["لا توجد عقارات مسجلة حالياً"]
                  }
                  placeholder="اختر العقار..."
                  triggerClassName="w-full bg-white border border-[#dfe4db] rounded-[10px] h-11 px-3 text-[13px] font-medium text-[#181d17] shadow-sm font-cairo"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-bold text-[#181d17] flex items-center gap-1.5 font-cairo">
                  <Home className="size-3.5 text-[#34422a]" />
                  <span>الوحدة السكنية والجدول:</span>
                </label>
                <SelectDropdown
                  value={selectedUnit}
                  onChange={setSelectedUnit}
                  options={
                    unitList.length > 0
                      ? unitList.map((u) => u.name)
                      : ["لا توجد وحدات مسجلة حالياً"]
                  }
                  placeholder="اختر الوحدة..."
                  triggerClassName="w-full bg-white border border-[#dfe4db] rounded-[10px] h-11 px-3 text-[13px] font-medium text-[#181d17] shadow-sm font-cairo"
                />
              </div>
            </div>

            {/* Smart Lock Option */}
            <div
              onClick={() => setIncludeSmartLock(!includeSmartLock)}
              className="flex items-center gap-2 pt-1 cursor-pointer select-none"
            >
              {includeSmartLock ? (
                <CheckSquare className="size-4.5 text-[#34422a] fill-[#34422a]/10" />
              ) : (
                <div className="size-4.5 rounded border border-[#75786f] bg-white" />
              )}
              <div>
                <span className="text-[12px] font-bold text-[#181d17] font-cairo">
                  تضمين كود الدخول المؤقت الذكي
                </span>
                <span className="text-[11px] text-[#75786f] me-2 font-cairo">
                  — ينشط تلقائياً للباب الذكي عند استلام المهمة
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Live Message Body Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[12.5px] font-cairo">
              <span className="font-bold text-[#181d17] flex items-center gap-1.5">
                <Eye className="size-4 text-[#34422a]" />
                نص الرسالة الموجهة (معاينة التنسيق التشغيلي المباشر):
              </span>
              <span className="text-[11px] text-[#75786f]">
                المتغيرات تستبدل آلياً عبر محرك الإرسال
              </span>
            </div>

            {/* WhatsApp Bubble Preview */}
            <div className="bg-white border border-[#dfe4db] rounded-[12px] p-4 shadow-sm space-y-3">
              <div className="bg-[#f1f5eb] rounded-[8px] px-3 py-1.5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-[#454840] font-medium font-cairo">
                  <Lock className="size-3 text-[#34422a]" />
                  <span>رسالة تشفير طرفي معتمدة • محرك BYTE HOME العقاري</span>
                </div>
                <span className="text-[#75786f] font-cairo">اليوم، 12:45 م</span>
              </div>

              <div className="bg-[#f9faf7] rounded-[8px] p-3 border border-[#dfe4db]/70 text-[13.5px] leading-relaxed text-[#181d17] font-cairo whitespace-pre-line font-medium" dir="rtl">
                {currentTemplate.message}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#75786f] pt-1 font-cairo">
                <div className="flex items-center gap-1">
                  <Info className="size-3.5 text-[#75786f]" />
                  <span>سيتم إرفاق باركود الدخول المباشر في مرفق تفاعلي أسفل الرسالة</span>
                </div>
                <span className="font-semibold text-[#454840]">248 حرف</span>
              </div>
            </div>
          </div>

          {/* Section 4: Security Notice */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-3 flex items-start gap-2.5 text-[12px] text-[#454840] font-cairo">
            <ShieldCheck className="size-4 text-[#059669] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              الرسالة ستُرسل مباشرة عبر <strong className="text-[#181d17]">Meta WhatsApp Business API</strong> الرسمية، وتُوثق في سجل العمليات الفورية وسجل الحضور والانصراف لعضو الفريق لضمان مطابقة معايير هيئة العقار.
            </p>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 px-6 border-t border-[#f1f5eb] flex items-center justify-between shrink-0 bg-white">
          <button
            onClick={onClose}
            className="text-[15px] font-semibold text-[#454840] hover:text-[#181d17] transition-colors font-cairo"
          >
            إلغاء وتراجع
          </button>
          <button
            onClick={() => onSend(member.id, currentTemplate.title, currentTemplate.message)}
            className="px-8 py-2.5 rounded-[12px] bg-[#4b5940] hover:bg-[#34422a] text-white font-bold text-[15px] flex items-center gap-2 shadow-sm transition-colors font-cairo"
          >
            <Send className="size-4 rotate-180" />
            <span>إرسال الرسالة عبر WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
