"use client";

import { useState } from "react";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  Calendar,
  FileText,
  BarChart3,
  BookOpen,
  StickyNote,
  FileCheck,
  Bell,
  Clock,
  GraduationCap,
  MonitorPlay,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState({
    hocTap: true,
    ketQua: false,
    congCu: false,
  });

  const toggleGroup = (group) =>
    setOpenGroups((prev) => ({ ...prev, [group]: !prev[group] }));

  const groups = [
    {
      title: "Học tập",
      key: "hocTap",
      items: [
        { href: "/SINHVIEN/lichhoc", icon: Calendar, label: "Lịch học" },
        { href: "/SINHVIEN/monhoc", icon: BookOpen, label: "Môn học" },
        { href: "/SINHVIEN/kiemtra", icon: FileCheck, label: "Kiểm tra" },
        { href: "/SINHVIEN/hoc_onl", icon: MonitorPlay, label: "Học tập online" },
      ],
    },
    {
      title: "Kết quả & Tiến độ",
      key: "ketQua",
      items: [
        { href: "/SINHVIEN/bangdiem", icon: FileText, label: "Bảng điểm" },
        { href: "/SINHVIEN/thongke", icon: BarChart3, label: "Thống kê học tập" },
        { href: "/SINHVIEN/tiendo", icon: TrendingUp, label: "Theo dõi tiến độ" },
      ],
    },
    {
      title: "Công cụ hỗ trợ",
      key: "congCu",
      items: [
        { href: "/SINHVIEN/ghichu", icon: StickyNote, label: "Ghi chú học tập" },
        { href: "/SINHVIEN/remind", icon: Bell, label: "Nhắc nhở học tập" },
        { href: "/SINHVIEN/dongho", icon: Clock, label: "Đồng hồ học tập" },
      ],
    },
    {
      title: "Khóa học",
      key: "khoahoc",
      items: [
        { href: "/SINHVIEN/khoahoc", icon: GraduationCap, label: "Đăng ký khóa học" },
      ],
    },
  ];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-[#0f1c2e] text-white flex flex-col transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 font-bold text-lg border-b border-gray-700">
        <span className="flex items-center gap-2">
          {open && <span>NGƯỜI DÙNG</span>}
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="hover:bg-gray-700 p-2 rounded"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4 space-y-1 px-2 text-sm font-medium overflow-y-auto">
        {groups.map((group) => (
          <div key={group.key}>
            {/* Nhóm */}
            <button
              onClick={() => toggleGroup(group.key)}
              className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded-md transition"
            >
              <div className="flex items-center gap-2">
                {open && (
                  <span className="text-gray-300 uppercase text-xs font-semibold tracking-wider">
                    {group.title}
                  </span>
                )}
              </div>
              {open &&
                (openGroups[group.key] ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                ))}
            </button>

            {/* Mục con */}
            {openGroups[group.key] && (
              <div className="pl-3 mt-1 space-y-1">
                {group.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md transition"
                    >
                      <Icon size={18} className="flex-shrink-0" />
                      {open && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
