import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import jwt from "jsonwebtoken";

// Lấy userId từ token JWT
function getUserIdFromReq(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId || null;
  } catch (err) {
    console.error("Lỗi decode token:", err);
    return null;
  }
}


export async function GET(req) {
  const userId = getUserIdFromReq(req);

  if (!userId) {
    return NextResponse.json(
      { error: "Bạn chưa đăng nhập hoặc không tìm thấy sinh viên" },
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("dangkyhoc")
      .select(`
        ma_khoahoc,
        khoahoc (
          ten_khoahoc,
          mo_ta,
          ngay_batdau,
          ngay_ketthuc,
          giangvien:nguoidung (ho_ten, email)
        )
      `)
      .eq("ma_sinhvien", userId);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Lỗi API danh sách khóa học:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
