/** Routes that stay reachable when the site is BrandStock-only. */
export const BRAND_STOCK_HOME = "/";

export const BRAND_STOCK_ALLOWED_PATHS = new Set([
  BRAND_STOCK_HOME,
  "/vendor-portal",
]);

export const BRAND_STOCK_ALLOWED_PREFIXES = [
  "/_next",
  "/api",
  "/images",
  "/favicon",
];

export function isBrandStockAllowedPath(pathname) {
  if (BRAND_STOCK_ALLOWED_PATHS.has(pathname)) {
    return true;
  }
  return BRAND_STOCK_ALLOWED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
}
