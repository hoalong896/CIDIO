"use client";

import { useState } from "react";
import { Menu, Calendar, FileText, BarChart3, BookOpen, StickyNote, FileCheck, Bell, Clock, GraduationCap, MonitorPlay, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { href: "/SINHVIEN/lichhoc", icon: Calendar, label: "Lịch học" },
    { href: "/SINHVIEN/bangdiem", icon: FileText, label: "Bảng điểm" },
    { href: "/SINHVIEN/thongke", icon: BarChart3, label: "Thống kê học tập" },
    { href: "/SINHVIEN/tiendo", icon: TrendingUp, label: "Theo dõi tiến độ" },
    { href: "/SINHVIEN/monhoc", icon: BookOpen, label: "Môn học" },
    { href: "/SINHVIEN/ghichu", icon: StickyNote, label: "Ghi chú học tập" },
    { href: "/SINHVIEN/kiemtra", icon: FileCheck, label: "Kiểm tra" },
    { href: "/SINHVIEN/remind", icon: Bell, label: "Nhắc nhở học tập" },
    { href: "/SINHVIEN/dongho", icon: Clock, label: "Đồng hồ học tập" },
    { href: "/SINHVIEN/khoahoc", icon: GraduationCap, label: "Đăng ký khóa học" },
    { href: "/SINHVIEN/hoc_onl", icon: MonitorPlay, label: "Học tập online" },
  ];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-[#0f1c2e] text-white flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 font-bold text-lg">
        <span className="flex items-center gap-2">
          {open && <span>NGƯỜI DÙNG</span>}
        </span>
        <button onClick={() => setOpen(!open)} className="hover:bg-gray-700 p-2 rounded">
          <Menu size={20} />
        </button>
      </div>

      {/* Nav menu */}
      <nav className="flex-1 mt-4 space-y-2 px-3 text-sm font-medium overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 hover:bg-gray-700 p-3 rounded cursor-pointer transition-colors"
            >
              <Icon size={20} className="flex-shrink-0" />
              {open && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}