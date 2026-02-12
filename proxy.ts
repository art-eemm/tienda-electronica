import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // ruta al que el usuario quiere ir
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api")) {
    if (path.startsWith("/api/auth") || path === "/api/login") {
      return NextResponse.next();
    }

    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Falta el token de autorización" },
        { status: 401 },
      );
    }

    return NextResponse.next();
  }

  // zonas exclusivas de admin
  const isProtectedRoute =
    path.startsWith("/products") || path.startsWith("/sales");

  // buscar el token en cookies
  const hasSession = request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes("-auth-token"));

  // reglas
  if (isProtectedRoute && !hasSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path === "/" && hasSession) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
