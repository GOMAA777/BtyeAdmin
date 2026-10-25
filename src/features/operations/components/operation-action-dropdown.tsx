"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { MoreHorizontal, Eye, UserPlus, Wrench, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { OperationTask } from "../types";

interface OperationActionDropdownProps {
  task: OperationTask;
  onAssign?: (task: OperationTask) => void;
}

export function OperationActionDropdown({
  task,
  onAssign,
}: OperationActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuWidth = 208; // w-52 = 208px
    const estimatedHeight = 4 * 44 + 20;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const openUp = spaceBelow < estimatedHeight + 12 && spaceAbove > spaceBelow;

    let left = rect.left;
    if (left + menuWidth > window.innerWidth - 12) {
      left = window.innerWidth - menuWidth - 12;
    }
    if (left < 12) {
      left = 12;
    }

    if (openUp) {
      setCoords({
        bottom: Math.max(10, window.innerHeight - rect.top + 6),
        left,
      });
    } else {
      setCoords({
        top: Math.max(10, rect.bottom + 6),
        left,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setIsOpen(false);
    }

    function handleScrollOrResize() {
      updatePosition();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const isCleaning = task.type === "cleaning";
  const detailHref = isCleaning
    ? `/operations/cleaning/${task.id}/`
    : `/operations/maintenance/${task.id}/`;

  return (
    <>
      {/* 3 Dots Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleDropdown}
        aria-label="خيارات الإجراءات"
        aria-expanded={isOpen}
        className={cn(
          "w-8 h-8 rounded-full border border-transparent hover:border-[#D5DDD0] hover:bg-[#EEF2E6] text-[#7D8A78] hover:text-[#172115] inline-flex items-center justify-center transition-all cursor-pointer select-none",
          isOpen && "bg-[#EEF2E6] text-[#172115] border-[#CCD5C5] shadow-2xs"
        )}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {/* Popover Action Menu rendered via Portal */}
      {isMounted &&
        isOpen &&
        coords &&
        createPortal(
          <div
            ref={menuRef}
            dir="rtl"
            style={{
              position: "fixed",
              ...(coords.top !== undefined ? { top: `${coords.top}px` } : {}),
              ...(coords.bottom !== undefined
                ? { bottom: `${coords.bottom}px` }
                : {}),
              left: `${coords.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-52 bg-white rounded-2xl p-1.5 border border-[#E2E6DC] shadow-[0_12px_32px_rgba(0,0,0,0.14)] z-[9999] animate-in fade-in zoom-in-95 duration-150 space-y-1 font-cairo"
          >
            {/* 1. تفاصيل العملية */}
            <Link
              href={detailHref}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-right bg-[#EEF2E6] text-[#2E3C29] hover:bg-[#E5EAE0]"
            >
              <span>تفاصيل العملية</span>
              <Eye className="w-4 h-4 shrink-0 text-[#2E3C29]" />
            </Link>

            {/* 2. تعيين مسؤول */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onAssign?.(task);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-right text-[#172115] hover:bg-[#EEF2E6] hover:text-[#2E3C29] cursor-pointer"
            >
              <span>تعيين مسؤول</span>
              <UserPlus className="w-4 h-4 shrink-0 text-[#172115]" />
            </button>

            {/* 3. إنشاء بلاغ */}
            <Link
              href="/operations/maintenance/new/"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-right text-[#172115] hover:bg-[#EEF2E6] hover:text-[#2E3C29]"
            >
              <span>إنشاء بلاغ</span>
              <Wrench className="w-4 h-4 shrink-0 text-[#172115]" />
            </Link>

            {/* 4. سجل التشغيل */}
            <Link
              href={`/operations/log/?unitId=${task.unitId || "204"}`}
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-right text-[#172115] hover:bg-[#EEF2E6] hover:text-[#2E3C29]"
            >
              <span>سجل التشغيل</span>
              <History className="w-4 h-4 shrink-0 text-[#172115]" />
            </Link>
          </div>,
          document.body
        )}
    </>
  );
}
