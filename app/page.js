import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6 text-black"
      style={{ backgroundImage: "url('/bg.jpg')" }} // thay bg.jpg bằng ảnh của bạn
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Khối bên trái */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold mb-4">NÂNG TẦM TRI THỨC VIỆT</h1>
          <p className="mb-8">Hãy vì tương lai của chúng ta, Đăng ký ngay</p>
          <div className="flex gap-4">
            {/* Nút đăng ký điều hướng */}
            <Link href="/dangky">
              <button className="flex items-center gap-2 bg-white/70 border px-5 py-2 rounded-full shadow hover:bg-gray-200">
                <span>🔑</span> Đăng ký ngay
              </button>
            </Link>

            {/* Nút đăng nhập */}
            <Link href="/dang-nhap">
              <button className="flex items-center gap-2 bg-white/70 border px-5 py-2 rounded-full shadow hover:bg-gray-200">
                <span>➡️</span> Đăng nhập
              </button>
            </Link>
          </div>
        </div>

        {/* Khối bên phải (Form đăng nhập) */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">ĐĂNG NHẬP</h2>
          <form className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="Nhập Email"
                className="w-full border rounded-lg px-3 py-2 text-black bg-white/80"
              />
            </div>
            {/* Mật khẩu */}
            <div>
              <label className="block text-sm mb-1">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className="w-full border rounded-lg px-3 py-2 text-black bg-white/80"
              />
            </div>
            {/* Nút đăng nhập */}
            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              Đăng nhập
            </button>
          </form>

          {/* Quên mật khẩu */}
          <div className="text-right mt-2">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          {/* Chưa có tài khoản */}
          <p className="text-center text-sm mt-4">
            Chưa có tài khoản?{" "}
            <Link href="/dangky" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
