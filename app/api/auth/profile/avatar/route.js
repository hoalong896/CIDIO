import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public/avatars"); // thư mục public/avatars
    const files = fs.readdirSync(dir);
    const avatars = files.map((file) => `/avatars/${file}`);

    return Response.json({ success: true, avatars });
  } catch (err) {
    return Response.json(
      { success: false, error: "Không thể load avatar: " + err.message },
      { status: 500 }
    );
  }
}
