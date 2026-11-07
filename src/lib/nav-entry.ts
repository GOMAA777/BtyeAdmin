import { STATIC_SEGMENT_TITLES, getTopSection } from "@/lib/route-titles";
import { stripAppPath } from "@/lib/constants";

const FROM_KEY = "hb:nav-from";
const FRESH_KEY = "hb:nav-fresh-section";
const ENTRY_KEY = "hb:nav-entry-root";

export interface NavEntryRoot {
  title: string;
  href: string;
}

function isHomePath(pathname: string): boolean {
  const clean = stripAppPath(pathname || "/").replace(/\/$/, "") || "/";
  return clean === "/" || clean === "/dashboard";
}

function sectionRoot(section: string): NavEntryRoot | null {
  const meta = STATIC_SEGMENT_TITLES[section];
  if (!meta) return null;
  return { title: meta.title, href: `/${section}/` };
}

export function markNavFromCurrentPage(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      FROM_KEY,
      stripAppPath(window.location.pathname || "/")
    );
  } catch {
    /* ignore */
  }
}

/** Sidebar / intentional section switch: destination section is the trail root. */
export function markFreshSectionEntry(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(FRESH_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function readStoredEntryRoot(): NavEntryRoot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(ENTRY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as NavEntryRoot;
  } catch {
    return null;
  }
}

function writeStoredEntryRoot(entry: NavEntryRoot | null): void {
  if (typeof window === "undefined") return;
  try {
    if (!entry) sessionStorage.removeItem(ENTRY_KEY);
    else sessionStorage.setItem(ENTRY_KEY, JSON.stringify(entry));
  } catch {
    /* ignore */
  }
}

/**
 * Resolves which crumb is the trail root based on where the user came from.
 * - From الرئيسية → الرئيسية
 * - Fresh section (sidebar) → section itself (no parent root)
 * - Cross-section in-app → previous section
 * - Same section → keep previous entry
 */
export function resolveNavEntryRoot(
  prevPath: string | null,
  nextPath: string
): NavEntryRoot | null {
  const next = stripAppPath(nextPath || "/");

  if (isHomePath(next)) {
    writeStoredEntryRoot(null);
    return null;
  }

  let from = prevPath;
  let fresh = false;
  if (typeof window !== "undefined") {
    try {
      const storedFrom = sessionStorage.getItem(FROM_KEY);
      if (storedFrom) {
        from = storedFrom;
        sessionStorage.removeItem(FROM_KEY);
      }
      fresh = sessionStorage.getItem(FRESH_KEY) === "1";
      if (fresh) sessionStorage.removeItem(FRESH_KEY);
    } catch {
      /* ignore */
    }
  }

  const prev = from ? stripAppPath(from) : null;
  const prevEntry = readStoredEntryRoot();

  if (fresh) {
    writeStoredEntryRoot(null);
    return null;
  }

  if (prev && isHomePath(prev)) {
    const entry = { title: "الرئيسية", href: "/" };
    writeStoredEntryRoot(entry);
    return entry;
  }

  const prevSec = prev ? getTopSection(prev) : null;
  const nextSec = getTopSection(next);

  if (prevSec && nextSec && prevSec !== nextSec) {
    // Entered this section from another section — show origin
    const entry = sectionRoot(prevSec);
    writeStoredEntryRoot(entry);
    return entry;
  }

  // Same section (or first paint): keep stored entry, else section is its own root
  if (prevEntry) return prevEntry;
  writeStoredEntryRoot(null);
  return null;
}
