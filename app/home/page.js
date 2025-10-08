"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar"; // Sidebar sinh viên
import SidebarGiaoVien from "../components/Sidebar_GV"; // Sidebar giáo viên
import Header from "../components/Header";
import Slideshow from "../components/Slideshow";
import ChatWidget from "../components/chat_ai";

export default function HomePage() {
  const [vaiTro, setVaiTro] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("vai_tro");

    if (!role) {
      router.push("/login");
      return;
    }
   
    setVaiTro(role);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {vaiTro === "giangvien" ? <SidebarGiaoVien /> : <Sidebar />}

      {/* Nội dung chính */}
      <main className="flex-1 flex flex-col relative">
        <Header />
        <Slideshow />
        <ChatWidget />
      </main>
    </div>
  );
}
