"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PersonalScore() {
  const router = useRouter();

  // Dữ liệu cá nhân tạm thời
  const [student] = useState({
    name: "Nguyễn Văn A",
    math: 8,
    physics: 7,
    chemistry: 9,
  });

  const average = (
    (student.math + student.physics + student.chemistry) /
    3
  ).toFixed(2);

  const rank = () => {
    if (average >= 8) return "Giỏi";
    if (average >= 6.5) return "Khá";
    if (average >= 5) return "Trung bình";
    return "Yếu";
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
        Bảng Điểm Cá Nhân
      </h1>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{student.name}</h2>

        <table className="w-full text-gray-800 mb-4">
          <tbody>
            <tr className="border-b">
              <td className="py-2">Toán</td>
              <td className="text-center">{student.math}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Vật Lý</td>
              <td className="text-center">{student.physics}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Hóa Học</td>
              <td className="text-center">{student.chemistry}</td>
            </tr>
            <tr className="border-t font-semibold">
              <td className="py-2">Trung Bình</td>
              <td className="text-center">{average}</td>
            </tr>
            <tr>
              <td className="py-2">Xếp Loại</td>
              <td className="text-center">
                <span
                  className={`px-2 py-1 rounded-full ${
                    rank() === "Giỏi"
                      ? "bg-green-400 text-white"
                      : rank() === "Khá"
                      ? "bg-blue-400 text-white"
                      : rank() === "Trung bình"
                      ? "bg-yellow-400 text-white"
                      : "bg-red-400 text-white"
                  }`}
                >
                  {rank()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
