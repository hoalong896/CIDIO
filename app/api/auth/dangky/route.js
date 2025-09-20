import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      ten_dangnhap,
      email,
      mat_khau,
      ho_ten,
      so_dien_thoai,
      ngay_sinh,
      vai_tro,
    } = body;

    if (!ten_dangnhap || !email || !mat_khau) {
      return new Response(
        JSON.stringify({
          error: "Tên đăng nhập, email và mật khẩu là bắt buộc",
        }),
        { status: 400 }
      );
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    // Chỉ cho phép 3 vai trò này
    const validRoles = ["user", "admin", "giaovien"];
    const role = validRoles.includes(vai_tro) ? vai_tro : "user";

    // Thêm người dùng vào Supabase
    const { data, error } = await supabase
      .from("nguoidung")
      .insert([
        {
          ten_dangnhap,
          email,
          mat_khau: hashedPassword,
          ho_ten,
          so_dien_thoai,
          ngay_sinh,
          vai_tro: role,
          ngay_tao: new Date(),
          ngay_capnhat: new Date(),
        },
      ])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({ message: "Đăng ký thành công", user: data }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Lỗi server: " + err.message }),
      { status: 500 }
    );
  }
}
