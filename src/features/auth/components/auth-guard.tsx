"use client";

import { useEffect, useState } from "react";
import { isUserAuthenticated } from "@/lib/auth-session";
import { APP_CONFIG } from "@/lib/constants";

/**
 * Protects dashboard routes. Renders children immediately so static-export
 * HTML is real content (not a spinner). Redirects client-side if unauthenticated.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (isUserAuthenticated()) {
      setAllowed(true);
      return;
    }
    setAllowed(false);
    const prefix = APP_CONFIG.basePath || "";
    window.location.replace(`${prefix}/login/`);
  }, []);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
