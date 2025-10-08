import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Khởi tạo Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET() {
  try {
    // Thống kê người dùng (role = sinhvien)
    const { count: userCount, error: userError } = await supabase
      .from("nguoidung")
      .select("*", { count: "exact" })
      .neq("vai_tro", "quantri"); // loại bỏ admin

    if (userError) throw userError;

    // Thống kê giảng viên (role = giangvien)
    const { count: teacherCount, error: teacherError } = await supabase
      .from("nguoidung")
      .select("*", { count: "exact" })
      .eq("vai_tro", "giangvien");

    if (teacherError) throw teacherError;

    return NextResponse.json({
      users: userCount || 0,
      teachers: teacherCount || 0,
    });
  } catch (err) {
    console.error("Lỗi thống kê:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
