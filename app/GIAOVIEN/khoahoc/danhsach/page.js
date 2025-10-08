"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DanhSachKhoaHocPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const router = useRouter();

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
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Lỗi khi lấy profile:", err);
      }
    };

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/Giangvien/khoahoc", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();

        if (res.ok) setCourses(data);
      } catch (err) {
        console.error("Lỗi khi lấy khóa học:", err);
      }
    };

    const cachedUser = localStorage.getItem("user");
    if (cachedUser) setUser(JSON.parse(cachedUser));

    fetchUser();
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/Giangvien/khoahoc/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });

      if (res.ok) {
        setCourses(courses.filter((c) => c.ma_khoahoc !== id && c.id !== id));
        alert("Xóa khóa học thành công!");
      } else {
        alert("Xóa thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi xóa khóa học!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#0a1a2f] text-white px-6 py-4 shadow-md">
        <button
          onClick={() => router.back()}
          className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200"
        >
          Quay lại
        </button>

        <div className="font-bold text-lg">Danh sách khóa học</div>

        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
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
          </div>
        </div>
      </header>

      {/* Danh sách khóa học */}
      <main className="p-6">
        {courses.length > 0 ? (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course.ma_khoahoc || course.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:bg-gray-50 cursor-pointer"
              >
                <span
                  className="text-black font-medium"
                  onClick={() =>
                    router.push(
                      `/GIAOVIEN/khoahoc/${course.ma_khoahoc || course.id}`
                    )
                  }
                >
                  {course.ten_khoahoc}
                </span>
                <button
                  onClick={() => handleDelete(course.ma_khoahoc || course.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Chưa có khóa học nào</p>
        )}
      </main>
    </div>
  );
}
