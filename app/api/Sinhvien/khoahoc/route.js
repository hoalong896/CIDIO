import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


const supabase = createClient(
    process.env.SUPABASE_URL,            
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("khoahoc")
      .select(`
        ma_khoahoc,
        ten_khoahoc,
        mo_ta,
        ngay_batdau,
        ngay_ketthuc,
        gio_batdau,
        gio_ketthuc,
        giangvien:ma_giangvien (ho_ten, email)
      `)
      .order("ngay_batdau", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Lỗi GET:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
