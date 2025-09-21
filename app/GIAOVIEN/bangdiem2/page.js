"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TeacherScoreView() {
  const router = useRouter();

  // Dữ liệu mẫu
  const [scores] = useState([
    {
      maMon: "MATH101",
      maLop: "L01",
      tenMon: "Toán cao cấp",
      stc: 3,
      diemGoc: 8,
      diemChu: "A",
      diemQD: 4.0,
    },
    {
      maMon: "PHYS101",
      maLop: "L02",
      tenMon: "Vật lý đại cương",
      stc: 3,
      diemGoc: 7,
      diemChu: "B",
      diemQD: 3.0,
    },
    {
      maMon: "CHEM101",
      maLop: "L03",
      tenMon: "Hóa học cơ bản",
      stc: 2,
      diemGoc: 9,
      diemChu: "A+",
      diemQD: 4.0,
    },
  ]);

  const [hocKy, setHocKy] = useState("HKI");
  const [namHoc, setNamHoc] = useState("2023-2024");

  const handleExport = () => {
    alert(`Xuất bảng điểm ${namHoc} - ${hocKy}`);
  };

  return (
    <div className="min-h-screen bg-[#1e1e2f] p-6 flex flex-col items-center relative">
      {/* Nút quay lại */}
      <button
        onClick={() => router.push("/home")}
        className="fixed top-4 left-4 flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 shadow-lg z-50 transition-all"
      >
        <ArrowLeft size={16} /> Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Xem bảng điểm
      </h1>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl p-6">
        {/* Bộ lọc */}
        <div className="flex gap-3 mb-4 items-center text-black">
          <label className="font-semibold">Học Kỳ:</label>
          <select
            className="border rounded-lg px-3 py-2"
            value={hocKy}
            onChange={(e) => setHocKy(e.target.value)}
          >
            <option value="HKI">Học kỳ I</option>
            <option value="HKII">Học kỳ II</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2"
            value={namHoc}
            onChange={(e) => setNamHoc(e.target.value)}
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>

          <button
            onClick={handleExport}
            className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-500 shadow"
          >
            Xuất
          </button>
        </div>

        {/* Bảng điểm */}
        <table className="w-full border-collapse text-gray-800">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-3 py-2">Mã Môn</th>
              <th className="px-3 py-2">Mã Lớp</th>
              <th className="px-3 py-2">Tên Môn</th>
              <th className="px-3 py-2">STC</th>
              <th className="px-3 py-2">Điểm gốc</th>
              <th className="px-3 py-2">Điểm chữ</th>
              <th className="px-3 py-2">Điểm quy đổi</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((row, index) => (
              <tr key={index} className="border-b">
                <td className="px-3 py-2">{row.maMon}</td>
                <td className="px-3 py-2">{row.maLop}</td>
                <td className="px-3 py-2">{row.tenMon}</td>
                <td className="px-3 py-2 text-center">{row.stc}</td>
                <td className="px-3 py-2 text-center">{row.diemGoc}</td>
                <td className="px-3 py-2 text-center">{row.diemChu}</td>
                <td className="px-3 py-2 text-center">{row.diemQD}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
