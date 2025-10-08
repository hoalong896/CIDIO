import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    // 🔹 Kiểm tra xem admin đã tồn tại chưa
    const { data: admin, error: checkError } = await supabase
      .from("nguoidung")
      .select("*")
      .eq("ten_dangnhap", "admin")
      .maybeSingle();

    if (checkError) throw checkError;

    if (admin) {
      return new Response(
        JSON.stringify({ message: "✅ Admin đã tồn tại." }),
        { status: 200 }
      );
    }

    // 🔹 Hash mật khẩu
    const hashed = await bcrypt.hash("123456", 10);

    // 🔹 Thêm tài khoản admin
    const { error: insertError } = await supabase.from("nguoidung").insert([
      {
        ten_dangnhap: "admin",
        mat_khau: hashed,
        vai_tro: "quantri",
        ho_ten: "Quản trị viên hệ thống",
        email: "admin@example.com",
        so_dien_thoai: "0123456789",
        ngay_sinh: "1990-01-01",
        ngay_tao: new Date(),
        ngay_capnhat: new Date(),
      },
    ]);

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ message: "🎉 Tạo admin thành công (admin / 123456)" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Lỗi tạo admin:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Lỗi server" }),
      { status: 500 }
    );
  }
}
