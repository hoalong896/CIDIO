"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // 👈 user state
  const router = useRouter();

  // Lấy thông tin user khi load trang
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/auth/profile", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();

        if (res.ok) {
          setUser(data);
          // Lưu vào localStorage để đồng bộ
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (err) {
        console.error("⚠️ Lỗi khi lấy profile:", err);
      }
    };

    // Nếu đã có user trong localStorage thì dùng luôn
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }

    fetchUser();

    // Lắng nghe sự kiện cập nhật avatar từ ProfilePage
    const handleStorage = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) setUser(JSON.parse(updatedUser));
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <header className="flex items-center justify-between bg-[#0a1a2f] text-white px-6 py-4 shadow-md relative">
      {/* Logo */}
      <div className="font-bold text-lg">LEAP</div>

      {/* Menu */}
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a
          href="https://www.facebook.com/hung.pham.870122/"
          className="hover:text-green-400"
        >
          Blog
        </a>
        <a href="#" className="hover:text-green-400">
          Flashcards
        </a>
        <a href="#" className="hover:text-green-400">
          Đề thi online
        </a>
        <a href="#" className="hover:text-green-400">
          Khóa học của tôi
        </a>
      </nav>

      {/* Avatar */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:ring-2 hover:ring-green-400 overflow-hidden"
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              onError={(e) => (e.currentTarget.src = "/avatars/avt1.jpg")}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold">
              {user?.ho_ten ? user.ho_ten[0].toUpperCase() : "?"}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-gray-800 py-2 z-50">
            <a
              href="/home/profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Tài khoản của tôi
            </a>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                alert("Đăng xuất thành công!");
                router.push("/");
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
