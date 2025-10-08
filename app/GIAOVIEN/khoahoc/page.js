"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaoKhoaHocDonGian() {
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const [moTa, setMoTa] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [gioBatDau, setGioBatDau] = useState("");
  const [gioKetThuc, setGioKetThuc] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidDate = (str) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(str)) return false;
    const [day, month, year] = str.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date &&
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!tenKhoaHoc || !ngayBatDau || !ngayKetThuc || !gioBatDau || !gioKetThuc) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }

    if (!isValidDate(ngayBatDau) || !isValidDate(ngayKetThuc)) {
      setMessage("Ngày không hợp lệ (dd/mm/yyyy)");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/Giangvien/khoahoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          ten_khoahoc: tenKhoaHoc,
          mo_ta: moTa,
          ngay_batdau: ngayBatDau,
          gio_batdau: gioBatDau,
          ngay_ketthuc: ngayKetThuc,
          gio_ketthuc: gioKetThuc,
          lich_hoc: [],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Tạo khóa học thành công!");
        setTenKhoaHoc("");
        setMoTa("");
        setNgayBatDau("");
        setNgayKetThuc("");
        setGioBatDau("");
        setGioKetThuc("");
      } else {
        setMessage(data.error || "Có lỗi xảy ra");
      }
    } catch (err) {
      setMessage("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      {/* Header với nút quay lại */}
      <div className="p-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 bg-white/80 text-purple-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-white transition"
        >
          <span className="text-lg">←</span> Quay lại
        </button>
      </div>

      {/* Nội dung chính */}
      <main className="flex flex-1 items-center justify-center px-4 pb-8">
        <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-lg text-black">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
            TẠO KHÓA HỌC
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Tên khóa học</label>
              <input
                type="text"
                placeholder="Nhập tên khóa học"
                value={tenKhoaHoc}
                onChange={(e) => setTenKhoaHoc(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Mô tả (tùy chọn)</label>
              <textarea
                placeholder="Nhập mô tả khóa học"
                value={moTa}
                onChange={(e) => setMoTa(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Ngày bắt đầu (dd/mm/yyyy)</label>
                <input
                  type="text"
                  value={ngayBatDau}
                  onChange={(e) => setNgayBatDau(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Giờ bắt đầu</label>
                <input
                  type="time"
                  value={gioBatDau}
                  onChange={(e) => setGioBatDau(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Ngày kết thúc (dd/mm/yyyy)</label>
                <input
                  type="text"
                  value={ngayKetThuc}
                  onChange={(e) => setNgayKetThuc(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Giờ kết thúc</label>
                <input
                  type="time"
                  value={gioKetThuc}
                  onChange={(e) => setGioKetThuc(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-purple-800 disabled:opacity-50 transition"
            >
              {loading ? "Đang tạo..." : "Tạo khóa học"}
            </button>

            {message && (
              <p
                className={`text-center mt-3 font-medium ${
                  message.includes("thành công") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
