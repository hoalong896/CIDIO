import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Khởi tạo Supabase backend client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    // Lấy dữ liệu từ body
    const body = await req.json().catch(() => ({}));
    const { ten_dangnhap, mat_khau } = body;

    // 1️⃣ Kiểm tra dữ liệu bắt buộc
    if (!ten_dangnhap || !mat_khau) {
      return NextResponse.json({ error: "Tên đăng nhập và mật khẩu là bắt buộc" }, { status: 400 });
    }

    // 2️⃣ Tìm user theo tên đăng nhập
    const { data: user, error } = await supabase
      .from("nguoidung")
      .select("*")
      .eq("ten_dangnhap", ten_dangnhap)
      .maybeSingle(); // tránh lỗi nếu không có user

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Lỗi kết nối cơ sở dữ liệu" }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" }, { status: 401 });
    }

    // 3️⃣ So sánh mật khẩu
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      return NextResponse.json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" }, { status: 401 });
    }

    // 4️⃣ Sinh JWT token
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "JWT_SECRET chưa được cấu hình" }, { status: 500 });
    }

    const token = jwt.sign(
      { userId: user.ma_nguoidung, vai_tro: user.vai_tro },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Trả dữ liệu user + token
    return NextResponse.json(
      {
        token,
        user: {
          ma_nguoidung: user.ma_nguoidung,
          ten_dangnhap: user.ten_dangnhap,
          ho_ten: user.ho_ten,
          email: user.email,
          vai_tro: user.vai_tro,
          avatar: user.avatar || null,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Lỗi server: " + err.message }, { status: 500 });
  }
}
