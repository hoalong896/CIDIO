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
    console.error(" Lỗi decode token:", err);
    return null;
  }
}


export async function GET(req) {
  const userId = getUserIdFromReq(req);

  if (!userId) {
    return NextResponse.json({ error: "Không tìm thấy user" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("nguoidung")
    .select("ma_nguoidung, ho_ten, email, so_dien_thoai, ngay_sinh, avatar")
    .eq("ma_nguoidung", userId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || "Không tìm thấy user" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

// 📌 PUT update profile
export async function PUT(req) {
  const userId = getUserIdFromReq(req);

  if (!userId) {
    return NextResponse.json({ error: "Không tìm thấy user" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const { error } = await supabase
      .from("nguoidung")
      .update({
        ho_ten: body.ho_ten,
        email: body.email,
        so_dien_thoai: body.so_dien_thoai,
        ngay_sinh: body.ngay_sinh,
        avatar: body.avatar,
        ngay_capnhat: new Date().toISOString(),
      })
      .eq("ma_nguoidung", userId);

    if (error) throw error;

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (err) {
    console.error(" Lỗi update profile:", err);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật profile" },
      { status: 500 }
    );
  }
}
