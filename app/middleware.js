import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const url = req.nextUrl;
  // Chỉ áp dụng cho /api/profile
  if (url.pathname.startsWith("/api/profile")) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Thiếu token" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-id", decoded.ma_nguoidung.toString());

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      return NextResponse.json(
        { error: "Token không hợp lệ" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/profile/:path*"], // chỉ chạy cho profile
};
