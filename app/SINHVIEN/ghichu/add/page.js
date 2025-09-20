"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function ThemGhiChu() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("study-notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("study-notes", JSON.stringify(newNotes));
  };

  const handleAdd = () => {
    if (!content.trim()) return;
    const date = new Date().toLocaleDateString();
    saveNotes([...notes, { content, date }]);
    router.push("/ghichu"); // quay lại danh sách
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Thêm Ghi Chú Mới</h1>
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <Home size={16} /> Home
          </button>
        </div>

        <label className="block mb-2 font-medium text-black">
          Nội dung ghi chú
        </label>
        <textarea
          placeholder="Nội dung"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 text-black"
          rows={6}
        />

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Thêm
          </button>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
