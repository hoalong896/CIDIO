"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-[#0f1c2e] text-white flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 font-bold text-lg">
        <span className="flex items-center gap-2">
          {open && <span>NGƯỚI DÙNG </span>}
        </span>
        <button onClick={() => setOpen(!open)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Nav menu */}
      <nav className="flex-1 mt-4 space-y-3 px-3 text-sm font-medium">
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/lichhoc" className="flex items-center gap-2 w-full">
            {open && "Lịch học"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/bangdiem" className="flex items-center gap-2 w-full">
            {open && "Bảng điểm"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/thongke" className="flex items-center gap-2 w-full">
            {open && "Thống kê học tập"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          {open && "Môn học"}
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/ghichu" className="flex items-center gap-2 w-full">
            {open && "Ghi chú học tập"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/kiemtra" className="flex items-center gap-2 w-full">
            {open && "kiểm tra"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/remind" className="flex items-center gap-2 w-full">
            {open && "Nhắc nhở học tập"}
          </Link>
        </div>
        <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/dongho" className="flex items-center gap-2 w-full">
            {open && "Đồng hồ học tập"}
          </Link>
        </div>
      </nav>
    </aside>
  );
}
