import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
   
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Thiếu token" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "JWT_SECRET chưa cấu hình" }, { status: 500 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Token không hợp lệ hoặc hết hạn" }, { status: 401 });
    }

    const ma_sinhvien = decoded.userId;
    if (!ma_sinhvien) {
      return NextResponse.json({ error: "Không xác định được sinh viên" }, { status: 400 });
    }
    
    const body = await req.json().catch(() => ({}));
    const { ma_khoahoc } = body;
    if (!ma_khoahoc) {
      return NextResponse.json({ error: "Thiếu thông tin khóa học" }, { status: 400 });
    }

   
    const { data: existing, error: checkError } = await supabase
      .from("dangkyhoc")
      .select("*")
      .eq("ma_sinhvien", ma_sinhvien)
      .eq("ma_khoahoc", ma_khoahoc)
      .maybeSingle();

    if (checkError) throw checkError;
    if (existing) {
      return NextResponse.json({ message: "Bạn đã đăng ký khóa học này" }, { status: 409 });
    }

    const { data, error: insertError } = await supabase
      .from("dangkyhoc")
      .insert([{ ma_sinhvien, ma_khoahoc }])
      .select()
      .maybeSingle();

    if (insertError) throw insertError;

    return NextResponse.json(
      {
        message: "Đăng ký khóa học thành công",
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Lỗi đăng ký khóa học:", err);
    return NextResponse.json({ error: err.message || "Lỗi server" }, { status: 500 });
  }
}
