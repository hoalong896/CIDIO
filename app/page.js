"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/dangnhap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ten_dangnhap: tenDangNhap,
          mat_khau: matKhau,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Đăng nhập thất bại");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("vai_tro", data.user.vai_tro);

      if (data.user.vai_tro === "quantri") {
        router.push("/ADMIN/home");
      } else {
        router.push("/home");
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay sáng hơn */}
      <div className="absolute inset-0 bg-white/10 backdrop-brightness-125"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl p-6">
        {/* Khối trái */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl font-bold mb-4 text-black">
            NÂNG TẦM TRI THỨC VIỆT
          </h1>
          <p className="mb-8 text-black/80">
            Hãy vì tương lai của chúng ta, đăng ký ngay
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
  <Link href="/dangky">
    <button className="bg-white border border-black text-black px-5 py-2 rounded-full shadow hover:bg-gray-100 transition">
      Đăng ký ngay
    </button>
  </Link>
  <Link href="/">
    <button className="bg-white/50 border border-black text-black px-5 py-2 rounded-full shadow hover:bg-white/70 transition">
      Đăng nhập
    </button>
  </Link>
</div>

        </div>

        {/* Khối phải: form login */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            ĐĂNG NHẬP
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1 text-black/80">
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                placeholder="Nhập tên đăng nhập"
                className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-black/80">
                Mật khẩu
              </label>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full border rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Đăng nhập
            </button>
          </form>

          <div className="text-right mt-2">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <p className="text-center text-sm mt-4 text-black/70">
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
