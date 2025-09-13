import Link from "next/link";

export default function DangKy() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6 text-black"
      style={{ backgroundImage: "url('/bg.jpg')" }} // thay bg.jpg bằng ảnh nền của bạn
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">ĐĂNG KÝ</h1>

        <form className="flex flex-col gap-4">
          {/* Chọn vai trò */}
          <div>
            <p className="mb-2 font-medium">Bạn là:</p>
            <div className="flex justify-between">
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="teacher" />
                Giáo viên
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="role" value="student" />
                Người dùng
              </label>
            </div>
          </div>

          {/* Họ và tên */}
          <input
            type="text"
            placeholder="Họ và tên"
            className="border p-2 rounded bg-white/80"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded bg-white/80"
          />

          {/* Mật khẩu */}
          <input
            type="password"
            placeholder="Mật khẩu"
            className="border p-2 rounded bg-white/80"
          />

          {/* Nút đăng ký */}
          <button className="bg-black text-white py-2 rounded hover:bg-gray-800">
            Đăng ký
          </button>

          {/* Nút trở lại */}
          <Link href="/">
            <button
              type="button"
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            >
              Trở lại
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
