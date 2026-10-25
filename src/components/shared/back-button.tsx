"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BackButtonProps {
  fallbackHref: string;
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function BackButton({
  fallbackHref,
  className,
  children,
  "aria-label": ariaLabel,
  icon,
  onClick,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) {
        return;
      }
    }

    if (typeof window !== "undefined") {
      const depth = parseInt(sessionStorage.getItem("hb:app-nav-depth") || "0", 10);
      const isSameOriginReferrer = Boolean(
        document.referrer && document.referrer.startsWith(window.location.origin)
      );

      if (window.history.length > 1 && (depth > 0 || isSameOriginReferrer)) {
        router.back();
        return;
      }
    }

    router.push(fallbackHref);
  };

  if (children) {
    return (
      <button
        type="button"
        onClick={handleBack}
        aria-label={ariaLabel || "العودة"}
        className={cn("cursor-pointer", className)}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label={ariaLabel || "العودة"}
      className={cn(
        "w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors shrink-0 cursor-pointer",
        className
      )}
    >
      {icon ?? <ArrowRight className="w-4 h-4" />}
    </button>
  );
}
