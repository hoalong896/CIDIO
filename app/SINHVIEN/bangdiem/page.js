"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PersonalScore() {
  const router = useRouter();

  // Dữ liệu tạm
  // const [scores] = useState([
  //   {
  //     maMon: "MATH101",
  //     maLop: "L01",
  //     tenMon: "Toán cao cấp",
  //     stc: 3,
  //     diemGoc: 8,
  //     diemChu: "A",
  //     diemQD: 4.0,
  //   },
  //   {
  //     maMon: "PHYS101",
  //     maLop: "L01",
  //     tenMon: "Vật lý đại cương",
  //     stc: 3,
  //     diemGoc: 7,
  //     diemChu: "B",
  //     diemQD: 3.0,
  //   },
  //   {
  //     maMon: "CHEM101",
  //     maLop: "L02",
  //     tenMon: "Hóa học cơ bản",
  //     stc: 2,
  //     diemGoc: 9,
  //     diemChu: "A+",
  //     diemQD: 4.0,
  //   },
  // ]);

  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");

  // const filteredScores = scores.filter(
  //   (item) =>
  //     (filter ? item.maMon === filter : true) &&
  //     (keyword ? item.maMon.includes(keyword) : true)
  // );

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
        Bảng điểm Sinh Viên
      </h1>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6">
        {/* Bộ lọc */}
        <div className="flex gap-3 mb-4 items-center text-black">
          <select
            className="border rounded-lg px-3 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Chọn Môn Học</option>
            {/* {scores.map((s) => (
              <option key={s.maMon} value={s.maMon}>
                {s.tenMon}
              </option>
            ))} */}
          </select>

          <input
            type="text"
            placeholder="Nhập Mã Số Môn Học ..."
            className="border rounded-lg px-3 py-2 flex-1"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-500 shadow">
            Tìm Kiếm
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
          {/* <tbody>
            {filteredScores.length > 0 ? (
              filteredScores.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="px-3 py-2">{row.maMon}</td>
                  <td className="px-3 py-2">{row.maLop}</td>
                  <td className="px-3 py-2">{row.tenMon}</td>
                  <td className="px-3 py-2 text-center">{row.stc}</td>
                  <td className="px-3 py-2 text-center">{row.diemGoc}</td>
                  <td className="px-3 py-2 text-center">{row.diemChu}</td>
                  <td className="px-3 py-2 text-center">{row.diemQD}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}
