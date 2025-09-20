"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Star, Trash2, Edit, Home } from "lucide-react";

export default function GhiChuList() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("study-notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("study-notes", JSON.stringify(newNotes));
  };

  const handleDelete = (index) => {
    if (confirm("Bạn có chắc muốn xóa ghi chú này?")) {
      const newNotes = [...notes];
      newNotes.splice(index, 1);
      saveNotes(newNotes);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-black">
          <Star /> Quản lý ghi chú
        </h1>
        <Link
          href="/home"
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          <Home size={18} /> Quay lại Home
        </Link>
      </div>

      {/* Nút thêm ghi chú */}
      <Link
        href="/ghichu/add"
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-6"
      >
        <Plus size={18} /> Thêm ghi chú mới
      </Link>

      {/* Danh sách ghi chú */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {notes.length === 0 && (
          <p className="text-gray-500 col-span-2 text-center">
            Chưa có ghi chú nào.
          </p>
        )}
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-bold">Ghi chú #{index + 1}</h2>
              <Star size={20} className="text-yellow-400" />
            </div>
            <p className="text-gray-700 mb-2">{note.content}</p>
            <p className="text-gray-400 text-sm mb-4">
              Ngày tạo: {note.date || "xx/xx/xxxx"}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/ghichu/update/${index}`)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Edit size={16} /> Sửa
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <Trash2 size={16} /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
