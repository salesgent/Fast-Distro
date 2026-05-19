import { NextResponse } from "next/server";
import {
  BRAND_STOCK_HOME,
  isBrandStockAllowedPath,
} from "./src/constants/brandStockOnly";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (isBrandStockAllowedPath(pathname)) {
    return NextResponse.next();
  }

  // Public folder assets (e.g. /logo.png, /images/foo.png)
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(BRAND_STOCK_HOME, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
