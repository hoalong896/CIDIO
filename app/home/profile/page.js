"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const [user, setUser] = useState({
    ho_ten: "",
    email: "",
    so_dien_thoai: "",
    ngay_sinh: "",
    avatar: "",
  });
  const router = useRouter();
  const [avatars, setAvatars] = useState([]); // danh sách avatar từ API
  const [loading, setLoading] = useState(true);

  //  Lấy profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/auth/profile", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();
        console.log(" Profile response:", data);

        if (res.ok) {
          const userData = data.user || data.data || data;
          setUser({
            ho_ten: userData.ho_ten || "",
            email: userData.email || "",
            so_dien_thoai: userData.so_dien_thoai || "",
            ngay_sinh: userData.ngay_sinh || "",
            avatar: userData.avatar || "", // avatar từ DB
          });
        } else {
          console.error(" Lỗi lấy profile:", data.error);
        }
      } catch (err) {
        console.error(" Lỗi khi fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  //  Lấy danh sách avatar từ API
  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const res = await fetch("/api/auth/profile/avatar"); // API trả về mảng avatar
        const data = await res.json();
        if (res.ok) {
          setAvatars(data.avatars || []); // [{url: "..."}] hoặc ["/link1.jpg", "/link2.jpg"]
        } else {
          console.error(" Lỗi lấy avatars:", data.error);
        }
      } catch (err) {
        console.error(" Lỗi khi fetch avatars:", err);
      }
    };
    fetchAvatars();
  }, []);

  //  Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok && !data.error) {
        alert(" " + (data.message || "Cập nhật thành công!"));
      } else {
        alert(" " + (data.error || "Có lỗi xảy ra"));
      }
    } catch (err) {
      alert(" Lỗi kết nối server");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 p-6 flex flex-col">
        <div>
          <h2 className="text-lg font-bold mb-6">Quản lý tài khoản</h2>
        </div>

        {/* User info + nút thoát */}
        <div className="mt-auto">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar || "/avatars/default.jpg"}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover border border-gray-600"
            />
            <div>
              <p className="font-medium">{user.ho_ten}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          <button className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white">
            Thoát
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-2">Tài khoản</h1>
        <p className="text-gray-400 mb-8">Cập nhật thông tin cá nhân</p>

        <form onSubmit={handleUpdate} className="flex gap-12">
          {/* Form thông tin */}
          <div className="flex-1 flex flex-col gap-6">
            {[
              { label: "Họ tên", type: "text", key: "ho_ten" },
              { label: "Email", type: "email", key: "email" },
              { label: "Số điện thoại", type: "text", key: "so_dien_thoai" },
              { label: "Ngày sinh", type: "date", key: "ngay_sinh" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-gray-300 mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={user[field.key] || ""}
                  onChange={(e) =>
                    setUser({ ...user, [field.key]: e.target.value })
                  }
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                />
              </div>
            ))}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600"
              >
                Cập nhật
              </button>
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="bg-green-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-600"
              >
                Quay lại
              </button>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={user.avatar || "/avatars/default.jpg"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-600"
            />
            <p className="text-sm text-gray-400">Chọn avatar:</p>
            <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 bg-gray-800 rounded">
              {avatars.length > 0 ? (
                avatars.map((avt, i) => {
                  const url = avt.url || avt; // trường hợp API trả [{url:"..." }] hoặc ["/..."]
                  return (
                    <img
                      key={i}
                      src={url}
                      alt="option"
                      className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                        user.avatar === url
                          ? "border-yellow-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setUser({ ...user, avatar: url })}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">Không có avatar</p>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
