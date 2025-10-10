"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit, Home, BookOpen } from "lucide-react";

export default function GhiChuList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/Sinhvien/ghichu", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setNotes(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa ghi chú này?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/Sinhvien/ghichu", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ma_ghichu: id }),
      });
      setNotes(notes.filter((n) => n.ma_ghichu !== id));
    } catch (e) {
      alert("Lỗi khi xóa ghi chú!");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-500 animate-pulse">
        Đang tải ghi chú...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
          <BookOpen /> Ghi chú học tập
        </h1>
        <Link
          href="/home"
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          <Home size={18} /> Home
        </Link>
      </div>

      <Link
        href="/SINHVIEN/ghichu/add"
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mb-6 transition"
      >
        <Plus size={18} /> Thêm ghi chú
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-500 col-span-3 text-center">
            Bạn chưa có ghi chú nào.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.ma_ghichu}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >
              <p className="text-gray-700 mb-3">{note.noi_dung}</p>
              <p className="text-gray-400 text-sm mb-4">
                Ngày tạo: {new Date(note.ngay_tao).toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    router.push(`/SINHVIEN/ghichu/update/${note.ma_ghichu}`)
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Edit size={16} /> Sửa
                </button>
                <button
                  onClick={() => handleDelete(note.ma_ghichu)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <Trash2 size={16} /> Xóa
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
