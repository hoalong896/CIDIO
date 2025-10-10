"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Users, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DanhSachSinhVien() {
  const [data, setData] = useState([]);
  const [openCourse, setOpenCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/Giangvien/sinhvien", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Lỗi tải dữ liệu");
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <div className="animate-pulse"> Đang tải danh sách sinh viên...</div>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-20">
         Lỗi: {error}
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen relative">
      {/*  Nút quay lại trang chủ */}
     <button
  onClick={() => router.push("/home")}
  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-blue-50 transition fixed top-6 left-6 z-50"
>
  <ArrowLeft className="w-4 h-4 text-blue-600" />
  <span className="text-sm font-medium text-blue-700">Quay lại Home</span>
</button>


      <h1 className="text-3xl font-bold mb-10 text-center text-blue-700 drop-shadow-sm">
         Danh sách sinh viên theo khóa học
      </h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">Không có sinh viên nào đăng ký môn học.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {data.map((khoahoc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Header khóa học */}
              <div
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-blue-50 transition"
                onClick={() =>
                  setOpenCourse(openCourse === idx ? null : idx)
                }
              >
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600 w-6 h-6" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {khoahoc.ten_khoahoc}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {khoahoc.sinhvien?.length || 0} sinh viên đăng ký
                    </p>
                  </div>
                </div>
                {openCourse === idx ? (
                  <ChevronUp className="text-blue-600 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-gray-500 w-5 h-5" />
                )}
              </div>

              {/* Danh sách sinh viên */}
              {openCourse === idx && (
                <div className="p-5 bg-blue-50/30 animate-fadeIn">
                  {(!khoahoc.sinhvien || khoahoc.sinhvien.length === 0) ? (
                    <p className="text-gray-500 italic">Chưa có sinh viên nào đăng ký.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {khoahoc.sinhvien.map((sv, i) => (
                        <div
                          key={sv.ma_nguoidung || i}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-3">
                            {/* Ảnh đại diện */}
                            <img
                              src={
                                sv.avatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  sv.ho_ten
                                )}&background=random`
                              }
                              alt={sv.ho_ten}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-800 text-sm">
                                {sv.ho_ten}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {sv.email}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            ☎ {sv.so_dien_thoai || "Chưa cập nhật"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
