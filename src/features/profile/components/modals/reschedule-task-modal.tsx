"use client";

import { useState } from "react";
import { X, Calendar, Clock, Check } from "lucide-react";
import { ProfileTask } from "../../types";

interface RescheduleTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ProfileTask | null;
  onSave: (taskId: string, newTime: string) => void;
}

export function RescheduleTaskModal({
  isOpen,
  onClose,
  task,
  onSave,
}: RescheduleTaskModalProps) {
  const [selectedTime, setSelectedTime] = useState("02:00 م اليوم");
  const [date, setDate] = useState("اليوم");

  if (!isOpen || !task) return null;

  const times = [
    "12:00 م اليوم",
    "02:00 م اليوم",
    "04:30 م اليوم",
    "07:00 م اليوم",
    "09:00 ص غداً",
  ];

  const handleSave = () => {
    onSave(task.id, `مجدولة (الساعة ${selectedTime})`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="bg-white relative w-full max-w-[480px] rounded-[16px] shadow-[0px_24px_48px_-12px_rgba(24,29,23,0.22)] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-[6px] w-full bg-gradient-to-r from-[#4b5940] via-[#d8e8c7] to-[#34422a]" />

        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 left-5 size-8 flex items-center justify-center rounded-full bg-[#f1f5eb] text-[#454840] hover:bg-[#dfe4db] transition-colors"
          aria-label="إغلاق"
        >
          <X className="size-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-[12px] bg-[#ebefe6] text-[#34422a] flex items-center justify-center shrink-0 shadow-sm border border-[#dfe4db]">
              <Clock className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-[20px] font-bold text-[#181d17] leading-tight font-cairo">
                تعديل موعد المهمة
              </h2>
              <p className="text-[13px] text-[#454840] font-medium font-cairo">
                {task.title} ({task.code})
              </p>
            </div>
          </div>

          <div className="space-y-4 font-cairo">
            <div className="p-3 rounded-[10px] bg-[#f1f5eb] text-[12px] text-[#454840] space-y-1">
              <div className="font-bold text-[#181d17]">{task.property} — {task.location}</div>
              <div>الوحدة: {task.unitLabel} {task.unitBadge}</div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#181d17] block">
                اختر الموعد الجديد
              </label>
              <div className="space-y-2">
                {times.map((timeOption) => (
                  <div
                    key={timeOption}
                    onClick={() => setSelectedTime(timeOption)}
                    className={`p-3 rounded-[10px] border flex items-center justify-between cursor-pointer transition-colors ${
                      selectedTime === timeOption
                        ? "bg-[#ebefe6] border-[#34422a] text-[#181d17] font-bold"
                        : "bg-white border-[#dfe4db] text-[#454840] hover:bg-[#f1f5eb]/50"
                    }`}
                  >
                    <span>{timeOption}</span>
                    <div
                      className={`size-4 rounded-full border flex items-center justify-center ${
                        selectedTime === timeOption
                          ? "bg-[#34422a] border-[#34422a] text-white"
                          : "border-[#dfe4db]"
                      }`}
                    >
                      {selectedTime === timeOption && <Check className="size-2.5 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5eb]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[10px] bg-[#ebefe6] text-[#454840] font-bold text-[13px] hover:bg-[#dfe4db] transition-colors font-cairo"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-[10px] bg-[#4b5940] hover:bg-[#34422a] text-white font-bold text-[13px] flex items-center gap-2 shadow-sm transition-colors font-cairo"
            >
              <Check className="size-4 stroke-[3]" />
              <span>تأكيد الموعد</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
