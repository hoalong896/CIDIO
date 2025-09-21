"use client";
import { useState } from "react";
import { ArrowLeft, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseCreatePage() {
  const router = useRouter();

  // Dữ liệu tạm
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    maMon: "",
    tenMon: "",
    stc: "",
    giangVien: "",
  });

  // Thêm khóa học
  const handleAdd = () => {
    if (!form.maMon || !form.tenMon) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }
    setCourses([...courses, form]);
    setForm({ maMon: "", tenMon: "", stc: "", giangVien: "" });
  };

  // Xóa khóa học
  const handleDelete = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  return (
    <div className="min-h-screen bg-[#1e1e2f] p-6 flex flex-col items-center relative">
      {/* Nút quay lại */}
      <button
        onClick={() => router.push("/home")}
        className="fixed top-4 left-4 flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 shadow-lg z-50 transition-all"
      >
        <ArrowLeft size={16} /> Quay lại
      </button>

      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
        Tạo Khóa Học Cho Sinh Viên
      </h1>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 text-black">
        {/* Form nhập */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Mã môn học"
            className="border rounded-lg px-3 py-2"
            value={form.maMon}
            onChange={(e) => setForm({ ...form, maMon: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tên môn học"
            className="border rounded-lg px-3 py-2"
            value={form.tenMon}
            onChange={(e) => setForm({ ...form, tenMon: e.target.value })}
          />
          <input
            type="number"
            placeholder="Số tín chỉ"
            className="border rounded-lg px-3 py-2"
            value={form.stc}
            onChange={(e) => setForm({ ...form, stc: e.target.value })}
          />
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-500 shadow mb-4"
        >
          <PlusCircle size={18} /> Thêm Khóa Học
        </button>

        {/* Bảng khóa học */}
        <table className="w-full border-collapse text-gray-800 text-black">
          <thead>
            <tr className="bg-gray-100 text-left ">
              <th className="px-3 py-2">Mã Môn</th>
              <th className="px-3 py-2">Tên Môn</th>
              <th className="px-3 py-2">STC</th>
              <th className="px-3 py-2">Giảng Viên</th>
              <th className="px-3 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((c, index) => (
                <tr key={index} className="border-b">
                  <td className="px-3 py-2">{c.maMon}</td>
                  <td className="px-3 py-2">{c.tenMon}</td>
                  <td className="px-3 py-2 text-center">{c.stc}</td>
                  <td className="px-3 py-2">{c.giangVien}</td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Chưa có khóa học nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
