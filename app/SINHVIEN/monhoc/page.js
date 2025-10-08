"use client";

import { useEffect, useState } from "react";

export default function DanhSachKhoaHocPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Bạn chưa đăng nhập");
      setLoading(false);
      return;
    }

    const fetchRegisteredCourses = async () => {
      try {
        const res = await fetch("/api/Sinhvien/khoahoc/danhsach", {
          headers: { Authorization: "Bearer " + token },
        });

        const data = await res.json();

        if (res.ok) {
          const sortedData = data.sort(
            (a, b) => new Date(a.khoahoc.ngay_batdau) - new Date(b.khoahoc.ngay_batdau)
          );
          setCourses(sortedData);
        } else {
          setMessage(data.error || "Không thể lấy danh sách khóa học");
        }
      } catch (err) {
        console.error("Lỗi fetch:", err);
        setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Danh sách khóa học đã đăng ký
      </h1>

      {message && (
        <div className="text-center mb-6 text-red-600 font-semibold">{message}</div>
      )}

      {courses.length === 0 && !message ? (
        <p className="text-center text-gray-600 text-lg">
          Bạn chưa đăng ký khóa học nào.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((item) => (
            <div
              key={item.ma_khoahoc}
              className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-purple-800 mb-2">
                {item.khoahoc.ten_khoahoc}
              </h2>
              <p className="text-gray-700 mb-2">{item.khoahoc.mo_ta || "Không có mô tả"}</p>
              <p className="text-sm text-gray-500 mb-2">
                🗓 {item.khoahoc.ngay_batdau} → {item.khoahoc.ngay_ketthuc}
              </p>
              <p className="text-sm text-gray-500">
                Giảng viên: {item.khoahoc.giangvien.ho_ten} ({item.khoahoc.giangvien.email})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
