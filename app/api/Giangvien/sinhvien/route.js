import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import jwt from "jsonwebtoken";

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
      { error: "Bạn chưa đăng nhập hoặc không tìm thấy giáo viên" },
      { status: 401 }
    );
  }

  try {
    /**
     * Truy vấn:
     * - Lấy danh sách sinh viên (từ bảng nguoidung)
     * - Đăng ký khóa học (dangkyhoc)
     * - Khóa học thuộc về giáo viên hiện tại (khoahoc.ma_giangvien = userId)
     */
    const { data, error } = await supabase
      .from("dangkyhoc")
      .select(`
        ma_dangky,
        ma_khoahoc,
        ma_sinhvien,
        khoahoc (
          ma_khoahoc,
          ten_khoahoc,
          ma_giangvien
        ),
        nguoidung:ma_sinhvien (
          ma_nguoidung,
          ho_ten,
          email,
          so_dien_thoai,
          avatar
        )
      `)
      .eq("khoahoc.ma_giangvien", userId);

    if (error) throw error;

    // Gom nhóm sinh viên theo khóa học
    const grouped = {};
    data.forEach((item) => {
      const course = item.khoahoc;
      const student = item.nguoidung;

      if (!course) return;
      if (!grouped[course.ma_khoahoc]) {
        grouped[course.ma_khoahoc] = {
          ma_khoahoc: course.ma_khoahoc,
          ten_khoahoc: course.ten_khoahoc,
          sinhvien: [],
        };
      }

      if (student) grouped[course.ma_khoahoc].sinhvien.push(student);
    });

    return NextResponse.json(Object.values(grouped));
  } catch (err) {
    console.error("Lỗi API danh sách sinh viên:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
