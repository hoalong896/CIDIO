"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TienDoHocTap() {
  const router = useRouter();

  const [students] = useState([
    { id: 1, ten: "Nguyen Van A", lop: "CNTT1", tienDo: 80, trangThai: "Đang học" },
    { id: 2, ten: "Tran Thi B", lop: "CNTT2", tienDo: 100, trangThai: "Hoàn thành" },
    { id: 3, ten: "Le Van C", lop: "CNTT1", tienDo: 45, trangThai: "Chậm tiến độ" },
    { id: 4, ten: "Pham Thi D", lop: "CNTT2", tienDo: 60, trangThai: "Đang học" },
    { id: 5, ten: "Hoang Van E", lop: "CNTT3", tienDo: 30, trangThai: "Chậm tiến độ" },
  ]);

  const classes = [...new Set(students.map((sv) => sv.lop))];
  const [selectedClass, setSelectedClass] = useState(null);

  const filteredStudents = students.filter((sv) => sv.lop === selectedClass);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#1A1A2E" }}>
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
        {/* Nút quay lại trang chủ */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">Tiến Độ Học Tập</h1>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            ← Về Trang Chủ
          </button>
        </div>

        {!selectedClass ? (
          // Hiển thị danh sách lớp
          <div className="flex gap-3 mb-6">
            {classes.map((lop) => (
              <button
                key={lop}
                onClick={() => setSelectedClass(lop)}
                className="px-4 py-2 rounded-lg font-medium border bg-gray-200 text-black hover:bg-gray-300"
              >
                {lop}
              </button>
            ))}
          </div>
        ) : (
          // Hiển thị danh sách sinh viên theo lớp
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-black">Lớp: {selectedClass}</h2>
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                ← Quay lại danh sách lớp
              </button>
            </div>

            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left text-black">Mã SV</th>
                  <th className="p-3 text-left text-black">Tên sinh viên</th>
                  <th className="p-3 text-left text-black">Tiến độ (%)</th>
                  <th className="p-3 text-left text-black">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((sv) => (
                  <tr key={sv.id} className="border-t hover:bg-gray-100">
                    <td className="p-3 text-black">{sv.id}</td>
                    <td className="p-3 text-black">{sv.ten}</td>
                    <td className="p-3 text-black">
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full ${
                            sv.tienDo >= 80
                              ? "bg-green-500"
                              : sv.tienDo >= 50
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${sv.tienDo}%` }}
                        ></div>
                      </div>
                      <span className="text-sm ml-2">{sv.tienDo}%</span>
                    </td>
                    <td className="p-3 text-black">{sv.trangThai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
