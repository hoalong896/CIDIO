import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


function parseDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;

  const [hours, minutes] = timeStr.split(":").map(Number);

  if (dateStr.includes("-")) {
    // yyyy-mm-dd
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  } else if (dateStr.includes("/")) {
    // dd/mm/yyyy
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }
  return null;
}

export async function GET(req) {
  try {
    // Lấy token từ header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Lấy danh sách khóa học theo giảng viên
    const { data: khoaHocs, error } = await supabase
      .from("khoahoc")
      .select("*")
      .eq("ma_giangvien", userId);

    if (error) {
      console.error(" Lỗi query Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!khoaHocs || khoaHocs.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

   
    const events = khoaHocs
      .map((kh) => {
        const startDate = parseDateTime(kh.ngay_batdau, kh.gio_batdau);
        const endDate = parseDateTime(kh.ngay_ketthuc, kh.gio_ketthuc);
        if (!startDate || !endDate) return null;

        return {
          id: kh.ma_khoahoc,
          title: kh.ten_khoahoc,
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          location: kh.phong_hoc || "Học Online",
          description: kh.mo_ta || "",
        };
      })
      .filter(Boolean);

    return NextResponse.json(events, { status: 200 });
  } catch (err) {
    console.error(" Server error:", err);
    return NextResponse.json({ error: "Lỗi server: " + err.message }, { status: 500 });
  }
}
