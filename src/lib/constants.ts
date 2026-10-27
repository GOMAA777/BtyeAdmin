/**
 * Core application constants and configuration.
 */
const isDev = process.env.NODE_ENV === "development";

export const APP_CONFIG = {
  name: "BYTE HOME",
  subtitle: "منظومة إدارة وتشغيل العقارات",
  /** Matches cPanel path public_html/Edaret_Amlak */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (isDev ? "" : "/Edaret_Amlak"),
} as const;

/**
 * Strips basePath and a leading /dashboard segment for route matching.
 */
export function stripAppPath(pathname: string): string {
  let clean = pathname || "/";
  const base = APP_CONFIG.basePath;
  if (base && (clean === base || clean.startsWith(`${base}/`))) {
    clean = clean.slice(base.length) || "/";
  }
  clean = clean.replace(/^\/dashboard(?=\/|$)/i, "") || "/";
  return clean.replace(/\/+$/, "") || "/";
}

/**
 * Full-page navigation that always includes basePath.
 * Prefer this over Next soft-nav on Apache static hosting.
 * Records the current page so breadcrumb can show "entered from".
 */
export function hardNavigate(path: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      "hb:nav-from",
      stripAppPath(window.location.pathname || "/")
    );
  } catch {
    /* ignore */
  }
  const prefix = APP_CONFIG.basePath || "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  const url =
    prefix && (clean === prefix || clean.startsWith(`${prefix}/`))
      ? clean
      : `${prefix}${clean}`;
  window.location.assign(url);
}

/**
 * Resolves a public asset path by prefixing the application basePath if required.
 * Handles subfolder deployments when NEXT_PUBLIC_BASE_PATH is set.
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (!APP_CONFIG.basePath) {
    return cleanPath;
  }
  if (cleanPath.startsWith(APP_CONFIG.basePath)) {
    return cleanPath;
  }
  return `${APP_CONFIG.basePath}${cleanPath}`;
}
