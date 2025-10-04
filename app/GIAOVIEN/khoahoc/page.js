"use client";
import { useState } from "react";
import Header from "../../components/khoahoc";

export default function TaoKhoaHocDonGian() {
  const [tenKhoaHoc, setTenKhoaHoc] = useState("");
  const [moTa, setMoTa] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");
  const [gioBatDau, setGioBatDau] = useState("");
  const [gioKetThuc, setGioKetThuc] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      setMessage("Ngày không hợp lệ (đúng định dạng dd/mm/yyyy)");
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
      {/* Header luôn trên đầu */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-black">
          <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
            TẠO KHÓA HỌC
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tên khóa học"
              value={tenKhoaHoc}
              onChange={(e) => setTenKhoaHoc(e.target.value)}
              className="border p-2 rounded-lg w-full"
              required
            />

            <input
              type="text"
              placeholder="Mô tả (tùy chọn)"
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              className="border p-2 rounded-lg w-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Ngày bắt đầu (dd/mm/yyyy)
                </label>
                <input
                  type="text"
                  value={ngayBatDau}
                  onChange={(e) => setNgayBatDau(e.target.value)}
                  className="border p-2 rounded-lg w-full"
                  placeholder="dd/mm/yyyy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Giờ bắt đầu</label>
                <input
                  type="time"
                  value={gioBatDau}
                  onChange={(e) => setGioBatDau(e.target.value)}
                  className="border p-2 rounded-lg w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Ngày kết thúc (dd/mm/yyyy)
                </label>
                <input
                  type="text"
                  value={ngayKetThuc}
                  onChange={(e) => setNgayKetThuc(e.target.value)}
                  className="border p-2 rounded-lg w-full"
                  placeholder="dd/mm/yyyy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Giờ kết thúc</label>
                <input
                  type="time"
                  value={gioKetThuc}
                  onChange={(e) => setGioKetThuc(e.target.value)}
                  className="border p-2 rounded-lg w-full"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 mt-4 disabled:opacity-50"
            >
              {loading ? "Đang tạo..." : "Tạo khóa học"}
            </button>

            {message && (
              <p
                className={`text-center mt-2 font-medium ${
                  message.includes("thành công")
                    ? "text-green-600"
                    : "text-red-600"
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
