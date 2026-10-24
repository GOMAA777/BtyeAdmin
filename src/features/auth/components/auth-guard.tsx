"use client";

import { useEffect, useSyncExternalStore } from "react";
import { isUserAuthenticated } from "@/lib/auth-session";
import { APP_CONFIG } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

const emptySubscribe = () => () => {};

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSyncExternalStore(
    emptySubscribe,
    isUserAuthenticated,
    () => null
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      const prefix = APP_CONFIG.basePath || "";
      window.location.replace(`${prefix}/login/`);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#EFF3EA] p-6 text-[#172115] select-none">
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-[#344230] border border-[#273323] flex items-center justify-center p-3 shadow-md animate-pulse">
              <Logo size={40} priority />
            </div>
            <div className="absolute -inset-2 rounded-3xl border-2 border-[#344230]/20 border-t-[#344230] animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#172115]">ابراج</h2>
            <p className="text-xs text-[#616E5D] font-medium animate-pulse">
              جاري التحقق من صلاحيات الدخول...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
