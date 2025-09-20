"use client";
import { useState } from "react";
import Link from "next/link";

export default function DangKy() {
  const [formData, setFormData] = useState({
    ten_dangnhap: "",
    ho_ten: "",
    email: "",
    mat_khau: "",
    vai_tro: "nguoidung",
    so_dien_thoai: "",
    ngay_sinh: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/dangky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(" Đăng ký thành công! Bạn có thể đăng nhập.");
      } else {
        setMessage(" " + (data.error || "Có lỗi xảy ra"));
      }
    } catch (err) {
      setMessage("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center p-6 text-black"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-[450px]">
        <h1 className="text-2xl font-bold mb-6 text-center">ĐĂNG KÝ</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Vai trò */}
          <div>
            <p className="mb-2 font-medium">Bạn là:</p>
            <div className="flex justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="vai_tro"
                  value="giaovien"
                  checked={formData.vai_tro === "giaovien"}
                  onChange={handleChange}
                />
                Giáo viên
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="vai_tro"
                  value="nguoidung"
                  checked={formData.vai_tro === "nguoidung"}
                  onChange={handleChange}
                />
                Người dùng
              </label>
            </div>
          </div>

          {/* Tên đăng nhập */}
          <input
            type="text"
            name="ten_dangnhap"
            value={formData.ten_dangnhap}
            onChange={handleChange}
            placeholder="Tên đăng nhập"
            className="border p-2 rounded bg-white/80"
            required
          />

          {/* Họ tên */}
          <input
            type="text"
            name="ho_ten"
            value={formData.ho_ten}
            onChange={handleChange}
            placeholder="Họ và tên"
            className="border p-2 rounded bg-white/80"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded bg-white/80"
            required
          />

          {/* Mật khẩu */}
          <input
            type="password"
            name="mat_khau"
            value={formData.mat_khau}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="border p-2 rounded bg-white/80"
            required
          />

          {/* Số điện thoại */}
          <input
            type="text"
            name="so_dien_thoai"
            value={formData.so_dien_thoai}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="border p-2 rounded bg-white/80"
          />

          {/* Ngày sinh */}
          <input
            type="date"
            name="ngay_sinh"
            value={formData.ngay_sinh}
            onChange={handleChange}
            className="border p-2 rounded bg-white/80"
          />

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>

          {/* Thông báo */}
          {message && (
            <p className="text-center text-sm font-medium">{message}</p>
          )}

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
