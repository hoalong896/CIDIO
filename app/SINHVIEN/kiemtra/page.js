"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function KiemTraList() {
  const tests = [
    { id: 1, title: "Bài kiểm tra React" },
    { id: 2, title: "Bài kiểm tra Next.js" },
  ];

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between max-w-2xl mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen /> Danh sách bài kiểm tra
        </h1>

        {/* Nút quay lại Home */}
        <Link
          href="/home"
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} /> Quay lại Home
        </Link>
      </div>

      {/* Danh sách kiểm tra */}
      <div className="grid gap-4 w-full max-w-2xl">
        {tests.map((test) => (
          <Link
            key={test.id}
            href={`/kiemtra/${test.id}`}
            className="bg-white text-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="font-semibold">{test.title}</h2>
            <p className="text-sm text-gray-500">Nhấn để bắt đầu</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
