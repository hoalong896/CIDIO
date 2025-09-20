import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { ten_dangnhap, mat_khau } = body;

    if (!ten_dangnhap || !mat_khau) {
      return NextResponse.json(
        { error: "Tên đăng nhập và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    // ✅ Tìm user theo tên đăng nhập
    const { data: user, error } = await supabase
      .from("nguoidung")
      .select("*")
      .eq("ten_dangnhap", ten_dangnhap)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: "Tên đăng nhập hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // ✅ So sánh mật khẩu
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Tên đăng nhập hoặc mật khẩu không đúng" },
        { status: 401 }
      );
    }

    // ✅ Sinh JWT token, nhớ nhúng ma_nguoidung
    const token = jwt.sign(
      {
        userId: user.ma_nguoidung, // 🔑 khóa chính trong DB
        vai_tro: user.vai_tro,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        token,
        user: {
          ma_nguoidung: user.ma_nguoidung,
          ten_dangnhap: user.ten_dangnhap,
          ho_ten: user.ho_ten,
          email: user.email,
          vai_tro: user.vai_tro,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Lỗi server: " + err.message },
      { status: 500 }
    );
  }
}
