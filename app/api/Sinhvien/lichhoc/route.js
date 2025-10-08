import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req) {
  try {
    // ✅ Lấy token từ header
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ma_sinhvien = decoded.userId;

    if (!ma_sinhvien) {
      return NextResponse.json({ error: "Token không hợp lệ" }, { status: 400 });
    }

    // ✅ Dùng đúng tên bảng & quan hệ (toàn chữ thường)
    const { data, error } = await supabase
      .from("dangkyhoc")
      .select(`
        ma_sinhvien,
        khoahoc (
          ma_khoahoc,
          ten_khoahoc,
          lichhoc (
            ma_lichhoc,
            ngay_hoc,
            gio_batdau,
            gio_ketthuc,
            phong_hoc
          )
        )
      `)
      .eq("ma_sinhvien", ma_sinhvien);

    if (error) {
      console.error("❌ Lỗi Supabase:", error);
      throw error;
    }

    // ✅ Chuyển dữ liệu sang format của react-big-calendar
    const lichhoc = data.flatMap((dk) => {
      if (!dk.khoahoc || !dk.khoahoc.lichhoc) return [];
      return dk.khoahoc.lichhoc.map((lh) => ({
        id: lh.ma_lichhoc,
        title: dk.khoahoc.ten_khoahoc,
        start: new Date(`${lh.ngay_hoc}T${lh.gio_batdau}`),
        end: new Date(`${lh.ngay_hoc}T${lh.gio_ketthuc}`),
        room: lh.phong_hoc || "Học Online",
      }));
    });

    return NextResponse.json({ lichhoc });
  } catch (err) {
    console.error("🔥 API Lỗi:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
