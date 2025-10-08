import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


export async function GET() {
  try {
    const { data, error } = await supabase
      .from("nguoidung")
      .select("ma_nguoidung, ho_ten, email, vai_tro, avatar")
      .neq("vai_tro", "quantri"); 

    if (error) {
      console.error("Lỗi lấy người dùng:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formatted = data.map((u) => ({
      ...u,
      avatar:
        u.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          u.ho_ten
        )}&background=random`,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("Lỗi server:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Thiếu mã người dùng" }, { status: 400 });
    }

    
    const { data: user } = await supabase
      .from("nguoidung")
      .select("vai_tro")
      .eq("ma_nguoidung", id)
      .single();

    if (user?.vai_tro === "quantri") {
      return NextResponse.json(
        { error: "Không thể xóa tài khoản quản trị!" },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from("nguoidung")
      .delete()
      .eq("ma_nguoidung", id);

    if (error) {
      console.error("Lỗi xóa:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lỗi server khi xóa:", err);
    return NextResponse.json({ error: "Lỗi máy chủ" }, { status: 500 });
  }
}
