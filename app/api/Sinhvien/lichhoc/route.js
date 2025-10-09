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
    // Lấy danh sách khóa học sinh viên đã đăng ký
    const { data: dangky, error: errDangKy } = await supabase
      .from("dangkyhoc")
      .select(`
        ma_khoahoc,
        khoahoc (
          ten_khoahoc,
          mo_ta,
          ma_giangvien,
          giangvien:nguoidung (ho_ten, email)
        )
      `)
      .eq("ma_sinhvien", userId);

    if (errDangKy) throw errDangKy;

    // Lấy tất cả buổi học từ bảng LichHoc cho những khóa học đã đăng ký
    const maKhoaHoc = dangky.map(dk => dk.ma_khoahoc);
    const { data: lichhoc, error: errLichHoc } = await supabase
      .from("lichhoc")
      .select(`
        ma_lichhoc,
        ma_khoahoc,
        ngay_hoc,
        gio_batdau,
        gio_ketthuc,
        phong_hoc,
        ghi_chu
      `)
      .in("ma_khoahoc", maKhoaHoc);

    if (errLichHoc) throw errLichHoc;

    // Map dữ liệu thành mảng các buổi học với thông tin khóa học
    const result = lichhoc.map((lh) => {
      const kh = dangky.find(dk => dk.ma_khoahoc === lh.ma_khoahoc)?.khoahoc;
      return {
        id: lh.ma_lichhoc,
        title: kh?.ten_khoahoc || "Chưa có tên khóa học",
        start: `${lh.ngay_hoc}T${lh.gio_batdau}`,
        end: `${lh.ngay_hoc}T${lh.gio_ketthuc}`,
        giangvien: kh?.giangvien?.ho_ten || "Chưa có giảng viên",
        phong: lh.phong_hoc || "Chưa có phòng",
        ghi_chu: lh.ghi_chu || "",
      };
    });

    return NextResponse.json({ lichhoc: result });
  } catch (err) {
    console.error("❌ Lỗi API lịch học:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
