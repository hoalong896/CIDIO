"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, BarChart3, Users } from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("vai_tro");

    if (!storedUser && storedRole !== "quantri") {
      router.push("/");
      return;
    }

    const user = storedUser
      ? JSON.parse(storedUser)
      : { ho_ten: "Quản trị viên", vai_tro: "quantri" };

    if (user.vai_tro !== "quantri") {
      alert("Bạn không có quyền truy cập trang này!");
      router.push("/");
      return;
    }

    setUser(user);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-700">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar trái */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-10 tracking-wide text-center">
          Admin Panel
        </h2>

        <nav className="space-y-3">
          <SidebarItem
            icon={<Users size={20} />}
            text="Quản lý người dùng"
            href="/ADMIN/QL"
          />
          <SidebarItem
            icon={<User size={20} />}
            text="Quản lý giảng viên"
            href="/ADMIN/teachers"
          />
          <SidebarItem
            icon={<BarChart3 size={20} />}
            text="Thống kê"
            href="/ADMIN/thongke"
          />
        </nav>
<div className="mt-auto pt-6 border-t border-blue-600 text-sm text-blue-100 flex flex-col gap-2">
  <p className="font-medium">Xin chào</p>
  <p>{user?.ho_ten}</p>

  {/* Nút đăng xuất */}
  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("vai_tro");
      router.push("/");
    }}
    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
  >
    Đăng xuất
  </button>
</div>

      </aside>

      {/* Nội dung chính */}
      <main className="flex-1 p-10 overflow-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Bảng điều khiển quản trị
        </h1>
        <p className="text-gray-600 mb-10">
          Chào mừng <span className="font-semibold">{user?.ho_ten}</span>, đây
          là trung tâm quản trị hệ thống.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Tổng số người dùng" value="125" color="blue" />
          <StatCard label="Số khóa học" value="32" color="green" />
          <StatCard label="Giảng viên" value="8" color="yellow" />
          <StatCard label="Đang hoạt động" value="5" color="red" />
        </div>
      </main>
    </div>
  );
}


function SidebarItem({ icon, text, href }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-600 hover:text-white cursor-pointer transition-all"
    >
      {icon}
      <span className="font-medium">{text}</span>
    </Link>
  );
}


function StatCard({ label, value, color }) {
  const colorMap = {
    blue: "text-blue-600 border-blue-600 bg-blue-50",
    green: "text-green-600 border-green-600 bg-green-50",
    yellow: "text-yellow-600 border-yellow-600 bg-yellow-50",
    red: "text-red-600 border-red-600 bg-red-50",
  };

  return (
    <div
      className={`rounded-2xl shadow bg-white p-6 border-l-4 ${colorMap[color]} border-current hover:scale-105 transition-transform`}
    >
      <h3 className="text-gray-500 text-sm mb-2">{label}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
