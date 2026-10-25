"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import {
  generateFallbackTrail,
  resolveRouteTitle,
  getTopSection,
} from "@/lib/route-titles";
import { stripAppPath } from "@/lib/constants";
import {
  resolveNavEntryRoot,
  type NavEntryRoot,
} from "@/lib/nav-entry";

export interface TrailItem {
  title: string;
  href: string;
  badge?: string;
}

interface NavigationTrailContextType {
  trail: TrailItem[];
  resetTrail: (item: TrailItem) => void;
  pushTrail: (item: TrailItem) => void;
  updateCurrentTitle: (title: string, badge?: string) => void;
  setTrail: (items: TrailItem[]) => void;
}

const NavigationTrailContext = createContext<NavigationTrailContextType | null>(
  null
);

const REAL_TRAIL_KEY = "hb:real-nav-trail";
const NAV_DEPTH_KEY = "hb:app-nav-depth";

function norm(p: string): string {
  return stripAppPath(p || "/").replace(/\/+$/, "") || "/";
}

function normalizeTrailHref(p: string): string {
  const c = norm(p);
  return c === "/" ? "/" : `${c}/`;
}

export function NavigationTrailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [customTrail, setCustomTrail] = useState<TrailItem[] | null>(null);
  const [titleOverrides, setTitleOverrides] = useState<
    Record<string, { title: string; badge?: string }>
  >({});
  const [entryRoot, setEntryRoot] = useState<NavEntryRoot | null>(null);
  const [historyTrail, setHistoryTrail] = useState<TrailItem[]>([]);
  const prevPathRef = useRef<string | null>(null);
  const didInitRef = useRef(false);
  const titleOverridesRef = useRef(titleOverrides);

  useEffect(() => {
    titleOverridesRef.current = titleOverrides;
  }, [titleOverrides]);

  useEffect(() => {
    const next = pathname || "/";
    const prev = prevPathRef.current;
    const entry = resolveNavEntryRoot(prev, next);
    setEntryRoot(entry);

    const currentClean = norm(next);
    const currentHref = normalizeTrailHref(currentClean);

    let isFresh = false;
    let storedTrail: TrailItem[] = [];
    if (typeof window !== "undefined") {
      try {
        isFresh = sessionStorage.getItem("hb:nav-fresh-section") === "1";
        if (isFresh) {
          sessionStorage.removeItem("hb:nav-fresh-section");
        }
        const raw = sessionStorage.getItem(REAL_TRAIL_KEY);
        if (raw) {
          storedTrail = JSON.parse(raw);
        }
      } catch {
        storedTrail = [];
      }
    }

    let nextTrail: TrailItem[] = [];

    if (currentClean === "/" || currentClean === "/dashboard") {
      nextTrail = [{ title: "الرئيسية", href: "/" }];
      if (typeof window !== "undefined") {
        sessionStorage.setItem(NAV_DEPTH_KEY, "0");
      }
    } else if (isFresh || storedTrail.length === 0) {
      nextTrail = generateFallbackTrail(next, { entryRoot: entry });
      if (typeof window !== "undefined") {
        sessionStorage.setItem(NAV_DEPTH_KEY, "0");
      }
    } else {
      const matchIdx = storedTrail.findIndex(
        (item) => norm(item.href) === currentClean
      );

      if (matchIdx !== -1) {
        nextTrail = storedTrail.slice(0, matchIdx + 1);
        if (typeof window !== "undefined") {
          sessionStorage.setItem(NAV_DEPTH_KEY, String(matchIdx));
        }
      } else {
        const prevTop = getTopSection(
          storedTrail[storedTrail.length - 1]?.href || ""
        );
        const currTop = getTopSection(currentClean);

        if (
          prevTop &&
          currTop &&
          prevTop !== currTop &&
          !storedTrail.some((s) => getTopSection(s.href) === currTop)
        ) {
          nextTrail = generateFallbackTrail(next, { entryRoot: entry });
          if (typeof window !== "undefined") {
            sessionStorage.setItem(NAV_DEPTH_KEY, "0");
          }
        } else {
          const resolved = resolveRouteTitle(currentClean);
          const override = titleOverridesRef.current[currentClean];
          const newCrumb: TrailItem = {
            title: override?.title || resolved.title,
            href: currentHref,
            badge:
              override?.badge !== undefined ? override.badge : resolved.badge,
          };

          nextTrail = [...storedTrail, newCrumb];
          if (typeof window !== "undefined") {
            const curDepth = parseInt(
              sessionStorage.getItem(NAV_DEPTH_KEY) || "0",
              10
            );
            sessionStorage.setItem(NAV_DEPTH_KEY, String(curDepth + 1));
          }
        }
      }
    }

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(REAL_TRAIL_KEY, JSON.stringify(nextTrail));
      } catch {
        /* ignore */
      }
    }

    setHistoryTrail(nextTrail);
    prevPathRef.current = next;
    didInitRef.current = true;
  }, [pathname]);

  useEffect(() => {
    setCustomTrail(null);
  }, [pathname]);

  const trail: TrailItem[] = useMemo(() => {
    if (customTrail && customTrail.length > 0) {
      return customTrail;
    }

    const source =
      historyTrail.length > 0
        ? historyTrail
        : generateFallbackTrail(pathname || "/", {
            entryRoot: didInitRef.current ? entryRoot : null,
          });

    return source.map((item) => {
      const clean = norm(item.href);
      const override = titleOverrides[clean];
      if (override) {
        return {
          ...item,
          title: override.title,
          badge:
            override.badge !== undefined ? override.badge : item.badge,
        };
      }
      return item;
    });
  }, [pathname, customTrail, titleOverrides, entryRoot, historyTrail]);

  const updateCurrentTitle = useCallback(
    (title: string, badge?: string) => {
      const cleanCurrent = norm(pathname || "/");
      setTitleOverrides((prev) => ({
        ...prev,
        [cleanCurrent]: { title, badge },
      }));

      setHistoryTrail((prevTrail) => {
        if (!prevTrail || prevTrail.length === 0) return prevTrail;
        const updated = prevTrail.map((item) => {
          if (norm(item.href) === cleanCurrent) {
            return {
              ...item,
              title,
              badge: badge !== undefined ? badge : item.badge,
            };
          }
          return item;
        });
        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem(REAL_TRAIL_KEY, JSON.stringify(updated));
          } catch {
            /* ignore */
          }
        }
        return updated;
      });
    },
    [pathname]
  );

  const resetTrail = useCallback((_item: TrailItem) => {}, []);

  const pushTrail = useCallback((item: TrailItem) => {
    setCustomTrail((prev) => (prev ? [...prev, item] : [item]));
  }, []);

  const setTrail = useCallback((items: TrailItem[]) => {
    setCustomTrail(items);
  }, []);

  return (
    <NavigationTrailContext.Provider
      value={{
        trail,
        resetTrail,
        pushTrail,
        updateCurrentTitle,
        setTrail,
      }}
    >
      {children}
    </NavigationTrailContext.Provider>
  );
}

export function useNavigationTrail() {
  const context = useContext(NavigationTrailContext);
  if (!context) {
    throw new Error(
      "useNavigationTrail must be used within a NavigationTrailProvider"
    );
  }
  return context;
}
