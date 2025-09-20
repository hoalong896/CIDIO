"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function KiemTraDetail({ params }) {
  //  unwrap params bằng React.use()
  const { id } = use(params);

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Ví dụ dữ liệu câu hỏi
  const questionBank = {
    1: [
      {
        id: 1,
        question: "React là gì?",
        options: ["Thư viện JavaScript", "Ngôn ngữ lập trình", "CSDL"],
        answer: 0,
      },
      {
        id: 2,
        question: "JSX là gì?",
        options: ["Cú pháp mở rộng của JavaScript", "CSDL", "Framework"],
        answer: 0,
      },
    ],
    2: [
      {
        id: 1,
        question: "Next.js hỗ trợ gì?",
        options: ["SSR/SSG", "Quản lý database", "Trình duyệt web"],
        answer: 0,
      },
      {
        id: 2,
        question: "Trang động trong Next.js tạo bằng?",
        options: ["[id].js", "index.html", "router.php"],
        answer: 0,
      },
    ],
  };

  const questions = questionBank[id] || [];

  const handleAnswer = (qId, optionIndex) => {
    setAnswers({ ...answers, [qId]: optionIndex });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Tính điểm khi đã nộp
  const score =
    submitted &&
    questions.reduce(
      (total, q) => total + (answers[q.id] === q.answer ? 1 : 0),
      0
    );

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between max-w-3xl mb-6">
        <h1 className="text-xl font-bold"> Bài kiểm tra #{id}</h1>
        <Link
          href="/kiemtra"
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </Link>
      </div>

      {/* Questions */}
      <div className="w-full max-w-3xl bg-white text-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="border-b pb-4">
            <h2 className="font-semibold mb-3">
              Câu {q.id}: {q.question}
            </h2>
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                    answers[q.id] === idx ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === idx}
                    onChange={() => handleAnswer(q.id, idx)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Nộp bài
          </button>
        ) : (
          <div className="mt-4 text-center font-semibold text-green-600">
            Bạn đã nộp bài! <br />
            Điểm của bạn: {score}/{questions.length}
          </div>
        )}
      </div>
    </div>
  );
}
