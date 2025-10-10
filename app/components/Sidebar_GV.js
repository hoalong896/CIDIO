"use client";

import { useState } from "react";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

export default function SidebarGiaoVien() {
  const [open, setOpen] = useState(true);
  const [openStudentMenu, setOpenStudentMenu] = useState(false);
  const [openCourseMenu, setOpenCourseMenu] = useState(false);

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-[#1e293b] text-white flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 font-bold text-lg">
        <span className="flex items-center gap-2">{open && "GIÁO VIÊN"}</span>
        <button onClick={() => setOpen(!open)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Nav menu */}
      <nav className="flex-1 mt-4 space-y-3 px-3 text-sm font-medium">
        {/* --- Menu SINH VIÊN --- */}
        <div>
          <div
            className="flex items-center justify-between hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => setOpenStudentMenu(!openStudentMenu)}
          >
            <span>{open && "Sinh viên"}</span>
            {open &&
              (openStudentMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </div>
          {openStudentMenu && (
            <div className="ml-4 mt-1 space-y-1">
              <Link
                href="/GIAOVIEN/danhgia"
                className="block hover:bg-gray-600 p-2 rounded"
              >
                {open && "Đánh giá sinh viên"}
              </Link>

              <Link
                href="/GIAOVIEN/danhsachsv"
                className="block hover:bg-gray-600 p-2 rounded"
              >
                {open && "Xem danh sách sinh viên"}
              </Link>
            </div>
          )}
        </div>

        {/* --- Menu KHÓA HỌC --- */}
        <div>
          <div
            className="flex items-center justify-between hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={() => setOpenCourseMenu(!openCourseMenu)}
          >
            <span>{open && "Khóa học"}</span>
            {open &&
              (openCourseMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </div>
          {openCourseMenu && (
            <div className="ml-4 mt-1 space-y-1">
              <Link
                href="/GIAOVIEN/khoahoc/danhsach"
                className="block hover:bg-gray-600 p-2 rounded"
              >
                {open && "Danh sách"}
              </Link>
              <Link
                href="/GIAOVIEN/khoahoc"
                className="block hover:bg-gray-600 p-2 rounded"
              >
                {open && "Tạo khóa học"}
              </Link>
            </div>
          )}
        </div>

        {/* --- Mục khác --- */}
        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/GIAOVIEN/baikiemtra" className="block">
            {open && "Tạo bài kiểm tra"}
          </Link>
        </div>

        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/GIAOVIEN/tien-do" className="block">
            {open && "Xem tiến độ học tập"}
          </Link>
        </div>

        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/GIAOVIEN/bangdiem2" className="block">
            {open && "Xem điểm"}
          </Link>
        </div>

        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/GIAOVIEN/lichday" className="block">
            {open && "Lịch dạy"}
          </Link>
        </div>

        <div className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/GIAOVIEN/day_onl" className="block">
            {open && "Dạy học online"}
          </Link>
        </div>
      </nav>
    </aside>
  );
}
