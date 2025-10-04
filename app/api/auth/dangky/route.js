import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Supabase service_role key (chỉ dùng trong backend)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    // 1️⃣ Kiểm tra các trường bắt buộc
    if (!ten_dangnhap || !email || !mat_khau || !ho_ten) {
      return new Response(
        JSON.stringify({
          error: "Tên đăng nhập, email, mật khẩu và họ tên là bắt buộc",
        }),
        { status: 400 }
      );
    }

    // 2️⃣ Kiểm tra trùng username/email
    const { data: existingUser, error: checkError } = await supabase
      .from("nguoidung")
      .select("ma_nguoidung")
      .or(`ten_dangnhap.eq.${ten_dangnhap},email.eq.${email}`)
      .maybeSingle();

    if (checkError) {
      console.log("Check existing user error:", checkError);
      return new Response(JSON.stringify({ error: checkError.message }), { status: 400 });
    }

    if (existingUser) {
      return new Response(JSON.stringify({ error: "Tên đăng nhập hoặc email đã tồn tại" }), { status: 400 });
    }

    // 3️⃣ Hash mật khẩu
    const hashedPassword = await bcrypt.hash(mat_khau, 10);

    // 4️⃣ Vai trò hợp lệ
    const validRoles = ["sinhvien", "giangvien", "quantri"];
    const role = validRoles.includes(vai_tro) ? vai_tro : "sinhvien";

    // 5️⃣ Insert user vào Supabase
    const { data, error } = await supabase
      .from("nguoidung")
      .insert([{
        ten_dangnhap,
        email,
        mat_khau: hashedPassword,
        ho_ten,
        so_dien_thoai,
        ngay_sinh,
        vai_tro: role,
        avatar: null,
        ngay_tao: new Date(),
        ngay_capnhat: new Date(),
      }])
      .select()
      .maybeSingle();
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "NULL");

    if (error) {
      console.log("Insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Đăng ký thành công", user: data }), { status: 201 });

  } catch (err) {
    console.log("Server error:", err);
    return new Response(JSON.stringify({ error: "Lỗi server: " + err.message }), { status: 500 });
  }
  
}
