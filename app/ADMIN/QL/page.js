"use client"; // bắt buộc cho useRouter và hook

import React, { useState, useEffect } from "react"; 
import { useRouter } from "next/navigation";
import { Trash2, ArrowLeft } from "lucide-react";

export default function QuanLyNguoiDung() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/ADMIN/users");
      const data = await res.json();
      const filtered = Array.isArray(data)
        ? data.filter((u) => u.vai_tro !== "quantri")
        : [];
      setUsers(filtered);
    } catch (err) {
      console.error("Lỗi lấy người dùng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa người dùng này không?")) return;
    const res = await fetch(`/api/ADMIN/users?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Đã xóa thành công!");
      fetchUsers();
    } else {
      alert("Xóa thất bại!");
    }
  };

  if (loading) return <div className="p-10 text-lg text-black">Đang tải...</div>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen text-black">
      {/* Nút quay lại */}
      <button
        onClick={() => router.push("/ADMIN/home")}
        className="flex items-center gap-2 mb-6 text-blue-600 font-medium hover:underline"
      >
        <ArrowLeft size={18} /> Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-6 text-blue-700"> Quản lý người dùng</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="p-3 w-20">Avatar</th>
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Vai trò</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.ma_nguoidung} className="border-t hover:bg-gray-50 text-black">
                <td className="p-3">
                  <img
                    src={u.avatar}
                    alt={u.ho_ten}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="p-3">{u.ho_ten}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.vai_tro}</td>
                <td className="p-3 text-center">
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(u.ma_nguoidung)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-6">Chưa có người dùng nào.</p>
        )}
      </div>
    </div>
  );
}
