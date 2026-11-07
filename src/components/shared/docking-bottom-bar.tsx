"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUIStore } from "@/stores/use-ui-store";
import { cn } from "@/lib/utils";

interface DockingBottomBarProps {
  children: React.ReactNode;
  dockedClassName?: string;
  floatingClassName?: string;
  innerClassName?: string;
}

/**
 * Floats fixed at the viewport bottom while scrolling a long form.
 * Once the natural end of the page is reached, docks in-flow under the
 * content and stops moving (no leftover empty gap).
 */
export function DockingBottomBar({
  children,
  dockedClassName = "mt-4",
  floatingClassName = "p-3 sm:p-4",
  innerClassName,
}: DockingBottomBarProps) {
  const { sidebarOpen } = useUIStore();
  const anchorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [isDocked, setIsDocked] = useState(false);
  const [barHeight, setBarHeight] = useState(72);
  const dockedRef = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const update = () => {
      const h = el.offsetHeight;
      if (h > 0) setBarHeight(h);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const checkDocked = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const anchorTop = anchor.getBoundingClientRect().top;
    const dockLine = window.innerHeight - barHeight;
    // Hysteresis: dock earlier / undock later to avoid flicker at the boundary
    const next = dockedRef.current
      ? anchorTop <= dockLine + 12
      : anchorTop <= dockLine - 4;

    if (next !== dockedRef.current) {
      dockedRef.current = next;
      setIsDocked(next);
    }
  }, [barHeight]);

  useEffect(() => {
    checkDocked();
    window.addEventListener("scroll", checkDocked, { passive: true });
    window.addEventListener("resize", checkDocked, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkDocked);
      window.removeEventListener("resize", checkDocked);
    };
  }, [checkDocked]);

  // Re-check after dock toggle (layout shift from spacer)
  useEffect(() => {
    const id = requestAnimationFrame(checkDocked);
    return () => cancelAnimationFrame(id);
  }, [isDocked, checkDocked]);

  return (
    <div className="w-full">
      {/* Natural resting place of the bar (end of form content) */}
      <div ref={anchorRef} className="h-0 w-full" aria-hidden="true" />

      {/*
        Placeholder only while floating — exact bar height so last fields
        can scroll above the fixed bar, without a large empty tail.
      */}
      {!isDocked && (
        <div
          aria-hidden="true"
          className="w-full pointer-events-none"
          style={{ height: barHeight }}
        />
      )}

      <div
        ref={barRef}
        className={cn(
          isDocked
            ? cn("relative w-full", dockedClassName)
            : cn(
                "fixed bottom-0 end-0 z-40",
                sidebarOpen ? "lg:start-64" : "lg:start-[72px]",
                "start-0",
                floatingClassName
              )
        )}
      >
        <div className={innerClassName}>{children}</div>
      </div>
    </div>
  );
}
