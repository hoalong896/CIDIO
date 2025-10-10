import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import jwt from "jsonwebtoken";

// 🔹 Hàm lấy userId từ JWT trong header Authorization
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

// ==================== 📌 LẤY TẤT CẢ GHI CHÚ CỦA SINH VIÊN ====================
export async function GET(req) {
  const userId = getUserIdFromReq(req);

  if (!userId) {
    return NextResponse.json(
      { error: " Không có token hoặc JWT sai" },
      { status: 401 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("ghichuhoctap")
      .select("*")
      .eq("ma_sinhvien", userId)
      .order("ngay_tao", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Lỗi khi lấy ghi chú:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ==================== ✏️ THÊM GHI CHÚ MỚI ====================
export async function POST(req) {
  const userId = getUserIdFromReq(req);

  if (!userId) {
    return NextResponse.json(
      { error: " Không có token hoặc JWT sai" },
      { status: 401 }
    );
  }

  try {
    const { noi_dung } = await req.json();

    if (!noi_dung || !noi_dung.trim()) {
      return NextResponse.json(
        { error: "Nội dung ghi chú không được để trống!" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("ghichuhoctap")
      .insert([{ ma_sinhvien: userId, noi_dung }]);

    if (error) throw error;

    return NextResponse.json({ message: " Ghi chú đã được thêm thành công!" });
  } catch (err) {
    console.error("Lỗi khi thêm ghi chú:", err);
    return NextResponse.json({ error: "Lỗi khi thêm ghi chú!" }, { status: 500 });
  }
}

// ==================== 🗑️ XOÁ GHI CHÚ ====================
export async function DELETE(req) {
  const userId = getUserIdFromReq(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ma_ghichu } = await req.json();
  if (!ma_ghichu)
    return NextResponse.json({ error: "Thiếu mã ghi chú" }, { status: 400 });

  try {
    const { error } = await supabase
      .from("ghichuhoctap")
      .delete()
      .eq("ma_ghichu", ma_ghichu)
      .eq("ma_sinhvien", userId);

    if (error) throw error;
    return NextResponse.json({ message: " Đã xóa ghi chú thành công!" });
  } catch (err) {
    console.error("Lỗi khi xóa ghi chú:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
// ==================== ✏️ CẬP NHẬT GHI CHÚ ====================
export async function PUT(req) {
  const userId = getUserIdFromReq(req);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ma_ghichu, noi_dung } = await req.json();

  if (!ma_ghichu) {
    return NextResponse.json({ error: "Thiếu mã ghi chú" }, { status: 400 });
  }

  if (!noi_dung || !noi_dung.trim()) {
    return NextResponse.json(
      { error: "Nội dung ghi chú không được để trống!" },
      { status: 400 }
    );
  }

  try {
    const { error } = await supabase
      .from("ghichuhoctap")
      .update({ noi_dung, ngay_tao: new Date() })
      .eq("ma_ghichu", ma_ghichu)
      .eq("ma_sinhvien", userId);

    if (error) throw error;

    return NextResponse.json({ message: "Cập nhật ghi chú thành công!" });
  } catch (err) {
    console.error("Lỗi khi cập nhật ghi chú:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
