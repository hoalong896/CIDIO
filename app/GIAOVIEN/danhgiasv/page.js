"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DanhGiaSinhVien() {
  const [form, setForm] = useState({
    ten: "",
    lop: "",
    chuyenCan: "",
    thaiDo: "",
    nhanXet: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Đánh giá đã gửi:", form);
    alert("Đã lưu đánh giá cho sinh viên!");
    // fetch("/api/danhgia", { method: "POST", body: JSON.stringify(form) })
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#1A1A2E" }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Đánh Giá Sinh Viên
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white shadow-md rounded-xl p-6"
        >
          <div>
            <label className="block text-sm font-bold mb-1 text-black">
              Tên sinh viên
            </label>
            <input
              type="text"
              name="ten"
              value={form.ten}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-black">
              Lớp
            </label>
            <input
              type="text"
              name="lop"
              value={form.lop}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-black">
              Chuyên cần
            </label>
            <select
              name="chuyenCan"
              value={form.chuyenCan}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            >
              <option value="">-- Chọn mức --</option>
              <option value="Tốt">Tốt</option>
              <option value="Khá">Khá</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Kém">Kém</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-black">
              Thái độ học tập
            </label>
            <select
              name="thaiDo"
              value={form.thaiDo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            >
              <option value="">-- Chọn mức --</option>
              <option value="Tích cực">Tích cực</option>
              <option value="Bình thường">Bình thường</option>
              <option value="Thiếu cố gắng">Thiếu cố gắng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-1 text-black">
              Nhận xét
            </label>
            <textarea
              name="nhanXet"
              value={form.nhanXet}
              onChange={handleChange}
              rows="4"
              className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Lưu đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
