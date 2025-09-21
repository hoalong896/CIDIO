"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function SidebarGiaoVien() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-[#1e293b] text-white flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 font-bold text-lg">
        <span className="flex items-center gap-2">
          {open && <span>GIÁO VIÊN</span>}
        </span>
        <button onClick={() => setOpen(!open)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Nav menu */}
      <nav className="flex-1 mt-4 space-y-3 px-3 text-sm font-medium">
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link
            href="/giaovien/danhgia"
            className="flex items-center gap-2 w-full"
          >
            {open && "Đánh giá sinh viên"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link
            href="/GIAOVIEN/baikiemtra"
            className="flex items-center gap-2 w-full"
          >
            {open && "Tạo bài kiểm tra"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link
            href="/giaovien/tien-do"
            className="flex items-center gap-2 w-full"
          >
            {open && "Xem tiến độ học tập"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link
            href="/GIAOVIEN/bangdiem2"
            className="flex items-center gap-2 w-full"
          >
            {open && "Xem điểm"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link
            href="/GIAOVIEN/khoahoc"
            className="flex items-center gap-2 w-full"
          >
            {open && "Tạo khóa học"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link
            href="/GIAOVIEN/lichday"
            className="flex items-center gap-2 w-full"
          >
            {open && "Lịch dạy"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link
            href="/GIAOVIEN/day_onl"
            className="flex items-center gap-2 w-full"
          >
            {open && "Dạy học online"}
          </Link>
        </div>
      </nav>
    </aside>
  );
}
