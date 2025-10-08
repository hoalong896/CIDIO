"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminStatsChart() {
  const [stats, setStats] = useState({ users: 0, teachers: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/ADMIN/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Lỗi lấy thống kê:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <div className="p-10 text-lg text-black">Đang tải...</div>;


  const data = [
    { name: "Người dùng", count: stats.users },
    { name: "Giảng viên", count: stats.teachers },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-6 text-blue-700"> Thống kê số lượng  người dùng hệ thống </h1>

      <div className="bg-white shadow-md rounded-2xl p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#1D4ED8" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
