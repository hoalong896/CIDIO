"use client";

import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ThongKePage() {
  // dữ liệu giả
  const subjects = [
    { name: "Toán", score: 8.5, hours: 40 },
    { name: "Ngữ văn", score: 7.8, hours: 35 },
    { name: "Tiếng Anh", score: 9.0, hours: 50 },
    { name: "Vật lý", score: 8.0, hours: 30 },
    { name: "Hóa học", score: 7.5, hours: 28 },
  ];

  const totalSubjects = subjects.length;
  const totalHours = subjects.reduce((sum, s) => sum + s.hours, 0);

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between max-w-4xl mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 /> Thống kê học tập
        </h1>

        {/* Nút quay lại Home */}
        <Link
          href="/home"
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} /> Quay lại Home
        </Link>
      </div>

      {/* Tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold">Số môn học</h2>
          <p className="text-3xl font-bold mt-2">{totalSubjects}</p>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-center">
          <h2 className="text-lg font-semibold">Tổng giờ học</h2>
          <p className="text-3xl font-bold mt-2">{totalHours} giờ</p>
        </div>
      </div>

      {/* Bảng điểm */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Bảng điểm</h2>
        <table className="w-full bg-white text-gray-800 rounded-xl shadow-md overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Môn học</th>
              <th className="p-3 text-center">Điểm trung bình</th>
              <th className="p-3 text-center">Giờ học</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-3">{s.name}</td>
                <td className="p-3 text-center font-semibold">{s.score}</td>
                <td className="p-3 text-center">{s.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Biểu đồ */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Biểu đồ điểm</h2>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={subjects}
              margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="score" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
