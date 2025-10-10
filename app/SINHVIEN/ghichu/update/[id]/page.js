"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Home } from "lucide-react";

export default function SuaGhiChu() {
  const router = useRouter();
  const { id } = useParams();
  const [noi_dung, setNoiDung] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/Sinhvien/ghichu", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const note = data.find((n) => n.ma_ghichu == id);
      if (note) setNoiDung(note.noi_dung);
      setLoading(false);
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    if (!noi_dung.trim()) return alert("Không được để trống!");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/Sinhvien/ghichu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ma_ghichu: id, noi_dung }),
      });
      if (!res.ok) throw new Error("Cập nhật thất bại!");
      router.push("/SINHVIEN/ghichu");
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-10 animate-pulse">
        Đang tải ghi chú...
      </div>
    );

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-700">Sửa ghi chú</h1>
          <button
            onClick={() => router.push("/home")}
            className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <Home size={16} /> Home
          </button>
        </div>

        <textarea
          value={noi_dung}
          onChange={(e) => setNoiDung(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6 text-black"
          rows={6}
        />

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Lưu
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
