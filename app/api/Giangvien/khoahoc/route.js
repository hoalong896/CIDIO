import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 👉 Chuyển từ dd/mm/yyyy -> yyyy-mm-dd
function toISODate(dmy) {
  if (!dmy) return null;
  if (dmy.includes("-")) return dmy; // đã là yyyy-mm-dd
  const [day, month, year] = dmy.split("/").map(Number);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.ma_giangvien || decoded.id;

    if (!userId) {
      return NextResponse.json({ error: "Token không hợp lệ" }, { status: 400 });
    }

    const body = await req.json();
    const { ten_khoahoc, mo_ta, ngay_batdau, gio_batdau, ngay_ketthuc, gio_ketthuc } = body;

    if (!ten_khoahoc || !ngay_batdau || !gio_batdau || !ngay_ketthuc || !gio_ketthuc) {
      return NextResponse.json({ error: "Thiếu dữ liệu bắt buộc" }, { status: 400 });
    }

    // Chuẩn hóa ngày
    const startDate = toISODate(ngay_batdau);
    const endDate = toISODate(ngay_ketthuc);

    // Insert vào bảng khoahoc
    const { data, error } = await supabase
      .from("khoahoc")
      .insert([
        {
          ten_khoahoc,
          mo_ta,
          ngay_batdau: startDate,
          gio_batdau,
          ngay_ketthuc: endDate,
          gio_ketthuc,
          ma_giangvien: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Tạo khóa học thành công", khoaHoc: data },
      { status: 201 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Lỗi server: " + err.message }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.ma_giangvien || decoded.id;

    if (!userId) {
      return NextResponse.json({ error: "Token không hợp lệ" }, { status: 400 });
    }

    
    const { data, error } = await supabase
      .from("khoahoc")
      .select("*")
      .eq("ma_giangvien", userId)
      .order("ngay_batdau", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Lỗi server: " + err.message }, { status: 500 });
  }
}
