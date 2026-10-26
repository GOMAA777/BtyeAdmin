"use client";

import React, { useRef, useState } from "react";
import {
  X,
  UploadCloud,
  CheckCircle2,
  Trash2,
  Save,
  Building2,
  Sparkles,
  FileText,
  Sliders,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface UpdateLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function UpdateLogoModal({ isOpen, onClose, onSuccess }: UpdateLogoModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
  } | null>({
    name: "abraj-brand-identity-2026.svg",
    size: "184 KB • صيغة SVG متجهة دقيقة",
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKb = Math.round(file.size / 1024);
      setSelectedFile({
        name: file.name,
        size: `${sizeKb} KB • صيغة ${file.name.split(".").pop()?.toUpperCase() || "SVG"}`,
      });
      toast.success("تم تحديد الشعار الجديد بنجاح");
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("تم إلغاء الملف المحدد");
  };

  const handleSaveLogo = () => {
    toast.success("تم حفظ واعتماد شعار المنصة الجديد بنجاح", {
      description: "سيظهر الشعار الآن في الترويسة وخطابات النظام وتذييل المنصة.",
    });
    onSuccess?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white w-full max-w-[620px] rounded-[16px] shadow-[0px_24px_50px_-12px_rgba(24,29,23,0.35)] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        data-node-id="1:29778"
        data-name="تحديث شعار المنصة"
      >
        {/* Modal Header */}
        <div className="border-[#ebefe6] border-b flex items-center justify-between pb-4 pt-5 px-6 shrink-0">
          <div className="flex gap-3.5 items-center">
            <div className="bg-[#d8e8cb] drop-shadow-sm flex items-center justify-center rounded-[12px] size-11 text-[#34422a]">
              <Sparkles className="size-5" />
            </div>
            <h2 className="font-cairo font-bold text-[#181d17] text-[20px] leading-[26px]">
              تحديث شعار المنصة
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] size-8 flex items-center justify-center hover:bg-[#f1f5eb] text-[#75786f] hover:text-[#181d17] transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* 1. Current Active Logo Section */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-cairo font-bold text-[#454840] text-[12px] tracking-[0.3px]">
                الشعار المعتمد حالياً في النظام
              </span>
              <div className="bg-[#d8e8cb] flex gap-1.5 items-center px-2.5 py-0.5 rounded-full">
                <span className="font-cairo font-semibold text-[#34422a] text-[11px] leading-[16px]">
                  نشط ومعتمد
                </span>
                <span className="bg-[#34422a] rounded-full size-1.5" />
              </div>
            </div>

            <div className="bg-[#f1f5eb] rounded-[12px] p-4 flex items-center justify-between">
              <div className="flex gap-3.5 items-center">
                <div className="bg-[#34422a] drop-shadow-sm flex flex-col items-center justify-center rounded-[12px] size-12 text-white">
                  <Building2 className="size-6 text-[#d8e8c7]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-1.5 items-baseline">
                    <span className="font-cairo font-bold text-[#181d17] text-[18px]">
                      ابراج
                    </span>
                    <span className="font-cairo text-[#75786f] text-[11px]">
                      / أبراج العقارية
                    </span>
                  </div>
                  <span className="font-cairo text-[#454840] text-[13px] leading-[18px]">
                    منظومة إدارة وتشغيل العقارات الموحدة
                  </span>
                </div>
              </div>
              <div className="text-left font-cairo">
                <p className="text-[#75786f] text-[11px] font-medium leading-[14px]">
                  SVG • 512×512px
                </p>
                <p className="text-[#75786f]/80 text-[10px] leading-[14px]">
                  مفرغ وشفاف
                </p>
              </div>
            </div>
          </div>

          {/* 2. Drag & Drop Upload Container */}
          <div className="space-y-1.5">
            <label className="font-cairo font-bold text-[#454840] text-[12px] block">
              رفع ملف الشعار الجديد
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".svg,.png,.jpg,.jpeg"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="bg-white rounded-[12px] p-6 border-2 border-dashed border-[#c5c8bd] flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#34422a] hover:bg-[#fafbfa] transition-colors"
            >
              <div className="bg-[#ebefe6] flex items-center justify-center rounded-[12px] size-12 text-[#34422a] mb-2">
                <UploadCloud className="size-6" />
              </div>
              <p className="font-cairo font-bold text-[14px] text-[#181d17]">
                اسحب الملف هنا أو{" "}
                <span className="text-[#34422a] underline decoration-1">
                  اختر من جهازك
                </span>
              </p>
              <p className="font-cairo text-[#75786f] text-[13px] mt-1 max-w-[380px]">
                يدعم نسق المتجهات الفائقة SVG (موصى به للأصول المؤسسية)، أو PNG و JPG
                عالية الدقة
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="bg-white drop-shadow-sm px-4 py-2 rounded-[8px] font-cairo font-medium text-[#181d17] text-[11px] border border-[#e5eae0] mt-3 hover:bg-slate-50 transition-colors"
              >
                استعراض الملفات المحلية
              </button>
            </div>
          </div>

          {/* 3. Technical Specs Badges */}
          <div className="bg-[#f1f5eb] rounded-[12px] p-2 grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center py-2 text-center">
              <span className="font-cairo text-[#75786f] text-[11px]">
                الأبعاد الموصى بها
              </span>
              <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                512×512 (1:1)
              </span>
            </div>
            <div className="border-r border-[rgba(197,200,189,0.4)] flex flex-col items-center justify-center py-2 text-center">
              <span className="font-cairo text-[#75786f] text-[11px]">
                الحجم الأقصى
              </span>
              <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                5 ميجابايت (MB)
              </span>
            </div>
            <div className="border-r border-[rgba(197,200,189,0.4)] flex flex-col items-center justify-center py-2 text-center">
              <span className="font-cairo text-[#75786f] text-[11px]">الشفافية</span>
              <span className="font-cairo font-semibold text-[#181d17] text-[12px]">
                خلفية مفرغة نقية
              </span>
            </div>
          </div>

          {/* 4. Uploaded File Live Dual Preview */}
          {selectedFile && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-cairo font-bold text-[#454840] text-[12px]">
                  معاينة الشعار الجديد والتوافق البصري
                </span>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="font-cairo font-medium text-[#ba1a1a] text-[11px] flex items-center gap-1 hover:underline"
                >
                  <span>إلغاء الملف</span>
                  <Trash2 className="size-3" />
                </button>
              </div>

              <div className="bg-white drop-shadow-sm rounded-[12px] p-4 border border-[#e5eae0] space-y-3">
                {/* File Telemetry Bar */}
                <div className="border-[#ebefe6] border-b pb-2 flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <CheckCircle2 className="size-4 text-[#34422a]" />
                    <div>
                      <p className="font-cairo font-bold text-[#181d17] text-[12px]">
                        {selectedFile.name}
                      </p>
                      <p className="font-cairo font-medium text-[#75786f] text-[11px]">
                        {selectedFile.size}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#d8e8cb] text-[#34422a] font-cairo font-medium text-[11px] px-2 py-0.5 rounded">
                    جاهز للاعتماد
                  </span>
                </div>

                {/* Dual Background Contrast Visualizer */}
                <div className="space-y-1.5">
                  <span className="font-cairo font-medium text-[#75786f] text-[11px]">
                    اختبار التباين (النمط الفاتح والنمط الداكن):
                  </span>
                  <div className="grid grid-cols-2 gap-2 h-24 rounded-[8px] overflow-hidden">
                    {/* Dark Canvas */}
                    <div className="bg-[#34422a] p-3 flex flex-col items-center justify-center relative rounded-[8px]">
                      <span className="font-cairo text-[#bfcfaf] text-[10px] absolute right-2 top-2">
                        النمط الداكن الرسمي
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="font-cairo font-bold text-white text-[14px] leading-[18px]">
                            ابراج
                          </p>
                          <p className="font-cairo text-[#bfcfaf] text-[10px] leading-[12px]">
                            أبراج العقارية
                          </p>
                        </div>
                        <div className="bg-[#4b5940] size-8 rounded-[8px] flex items-center justify-center text-white">
                          <Building2 className="size-4 text-[#d8e8c7]" />
                        </div>
                      </div>
                    </div>

                    {/* Light Canvas */}
                    <div className="bg-white border border-[#e5eae0] p-3 flex flex-col items-center justify-center relative rounded-[8px]">
                      <span className="font-cairo text-[#75786f] text-[10px] absolute right-2 top-2">
                        النمط الفاتح
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="font-cairo font-bold text-[#181d17] text-[14px] leading-[18px]">
                            ابراج
                          </p>
                          <p className="font-cairo text-[#75786f] text-[10px] leading-[12px]">
                            أبراج العقارية
                          </p>
                        </div>
                        <div className="bg-[#4b5940] size-8 rounded-[8px] flex items-center justify-center text-white">
                          <Building2 className="size-4 text-[#d8e8c7]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f1f5eb]/80 border-[#ebefe6] border-t p-4 flex items-center justify-start gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSaveLogo}
            disabled={!selectedFile}
            className="bg-[#34422a] text-white px-6 h-10 rounded-[12px] font-cairo font-semibold text-[14px] flex items-center gap-2 hover:bg-[#273220] transition-colors disabled:opacity-50"
          >
            <span>حفظ واعتماد الشعار</span>
            <Save className="size-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-white px-4 h-10 rounded-[12px] font-cairo font-semibold text-[#181d17] text-[14px] border border-[#e5eae0] hover:bg-slate-50 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
