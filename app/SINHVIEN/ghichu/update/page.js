"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Home } from "lucide-react";

export default function SuaGhiChu() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id);

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("study-notes");
    if (stored) {
      const arr = JSON.parse(stored);
      setNotes(arr);
      if (arr[id]) setContent(arr[id].content);
    }
  }, [id]);

  const saveNotes = (newNotes) => {
    setNotes(newNotes);
    localStorage.setItem("study-notes", JSON.stringify(newNotes));
  };

  const handleSave = () => {
    if (!content.trim()) return;
    const newNotes = [...notes];
    newNotes[id].content = content;
    saveNotes(newNotes);
    router.push("/ghichu");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Sửa Ghi Chú</h1>
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <Home size={16} /> Home
          </button>
        </div>

        <label className="block mb-2 font-medium">Nội dung ghi chú</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6"
          rows={6}
        />

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Lưu
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
