"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, Target, Award, CheckCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function TienDoPage() {
  // Dữ liệu tiến độ theo thời gian
  const progressData = [
    { month: "Tháng 1", avgScore: 7.2 },
    { month: "Tháng 2", avgScore: 7.5 },
    { month: "Tháng 3", avgScore: 7.8 },
    { month: "Tháng 4", avgScore: 8.1 },
    { month: "Tháng 5", avgScore: 8.3 },
  ];

  // Dữ liệu môn học
  const subjects = [
    { name: "Toán", score: 8.5, target: 9.0, progress: 94 },
    { name: "Ngữ văn", score: 7.8, target: 8.5, progress: 92 },
    { name: "Tiếng Anh", score: 9.0, target: 9.0, progress: 100 },
    { name: "Vật lý", score: 8.0, target: 8.5, progress: 94 },
    { name: "Hóa học", score: 7.5, target: 8.0, progress: 94 },
  ];

  // Dữ liệu tổng quan
  const overallProgress = [
    {
      name: "Hoàn thành",
      value: 85,
      fill: "#10b981",
    },
  ];

  // Dữ liệu phân bố điểm
  const scoreDistribution = [
    { name: "Xuất sắc (9-10)", value: 1, color: "#10b981" },
    { name: "Giỏi (8-9)", value: 2, color: "#3b82f6" },
    { name: "Khá (7-8)", value: 2, color: "#f59e0b" },
  ];

  const avgScore = (
    subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length
  ).toFixed(1);
  const completedSubjects = subjects.filter((s) => s.progress === 100).length;

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between max-w-6xl mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp /> Theo dõi tiến độ học tập
        </h1>

        <Link
          href="/home"
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} /> Quay lại Home
        </Link>
      </div>

      {/* Tổng quan nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-6xl mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Điểm trung bình</p>
              <p className="text-3xl font-bold mt-1">{avgScore}</p>
            </div>
            <Award size={40} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Môn hoàn thành</p>
              <p className="text-3xl font-bold mt-1">{completedSubjects}/{subjects.length}</p>
            </div>
            <CheckCircle size={40} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Tiến độ chung</p>
              <p className="text-3xl font-bold mt-1">85%</p>
            </div>
            <Target size={40} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Xu hướng</p>
              <p className="text-3xl font-bold mt-1">↑ 0.5</p>
            </div>
            <TrendingUp size={40} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Biểu đồ tiến độ theo thời gian */}
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-xl font-semibold mb-4">Xu hướng điểm số</h2>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={progressData}
              margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis domain={[6, 10]} stroke="#666" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: "#2563eb", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mb-8">
        {/* Tiến độ từng môn */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Tiến độ từng môn học</h2>
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md space-y-4">
            {subjects.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{subject.name}</span>
                  <span className="text-sm">
                    {subject.score}/{subject.target} ({subject.progress}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      subject.progress === 100
                        ? "bg-green-500"
                        : subject.progress >= 90
                        ? "bg-blue-500"
                        : "bg-orange-500"
                    }`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phân bố điểm */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Phân bố điểm số</h2>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Mục tiêu và thành tựu */}
      <div className="w-full max-w-6xl">
        <h2 className="text-xl font-semibold mb-4">Mục tiêu & Thành tựu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="text-yellow-600" size={24} />
              </div>
              <h3 className="font-semibold">Học sinh xuất sắc</h3>
            </div>
            <p className="text-sm text-gray-600">
              Đạt điểm trung bình ≥ 9.0 cho 1 môn học
            </p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold">Tiến bộ vượt bậc</h3>
            </div>
            <p className="text-sm text-gray-600">
              Tăng 0.5 điểm so với tháng trước
            </p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold">Mục tiêu tiếp theo</h3>
            </div>
            <p className="text-sm text-gray-600">
              Đạt điểm TB ≥ 8.5 cho tất cả môn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}