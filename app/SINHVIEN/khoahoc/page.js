"use client";
import { useState, useEffect } from "react";

export default function DangKyKhoaHocPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState([]);

 
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/Sinhvien/khoahoc", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();

        if (res.ok) setCourses(data);
        else console.error("Lỗi lấy khóa học:", data.error);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    
    fetchCourses();
   
  }, []);

  

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-600">
        Đang tải dữ liệu...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10 drop-shadow-md">
           ĐĂNG KÝ KHÓA HỌC
        </h1>

        {message && (
          <div className="text-center mb-6 text-lg font-semibold text-green-600 animate-fadeIn">
            {message}
          </div>
        )}

        {courses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Không có khóa học nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => (
             <div key={c.ma_khoahoc} className="bg-gradient-to-b from-purple-100 to-white ...">

                <h2 className="text-xl font-bold text-purple-800 mb-2">
                  {c.ten_khoahoc}
                </h2>
                <p className="text-gray-700 mb-4">{c.mo_ta || "Không có mô tả"}</p>
                <p className="text-sm text-gray-500 mb-2">
                  🗓 {c.ngay_batdau} → {c.ngay_ketthuc}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {c.gio_batdau} - {c.gio_ketthuc}
                </p>
                <button
                  onClick={() => handleRegister(c.id)}
                  disabled={registered.includes(c.id)}
                  className={`w-full py-2 rounded-xl font-semibold transition-all duration-300 ${
                    registered.includes(c.id)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {registered.includes(c.id) ? "Đã đăng ký" : "Đăng ký ngay"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
