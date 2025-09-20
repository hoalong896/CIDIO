"use client";

import { useState, useEffect } from "react";
import { Bell, Plus, Trash2, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NhacNhoHocTap() {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("study-reminders");
    if (stored) setReminders(JSON.parse(stored));
  }, []);

  const saveReminders = (newReminders) => {
    setReminders(newReminders);
    localStorage.setItem("study-reminders", JSON.stringify(newReminders));
  };

  const handleAddOrUpdate = () => {
    if (!text.trim()) return;
    if (editIndex !== null) {
      const updated = [...reminders];
      updated[editIndex] = text;
      saveReminders(updated);
      setEditIndex(null);
    } else {
      saveReminders([...reminders, text]);
    }
    setText("");
  };

  const handleEdit = (index) => {
    setText(reminders[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    saveReminders(updated);
  };

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-between max-w-2xl mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell /> Nhắc Nhở Học Tập
        </h1>
        <Link
          href="/home
          "
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} /> Quay lại Home
        </Link>
      </div>

      {/* Form thêm nhắc nhở */}
      <div className="flex gap-2 mb-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Nhập nhắc nhở..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded-lg text-white"
        />
        <button
          onClick={handleAddOrUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          {editIndex !== null ? "Cập nhật" : "Thêm"}
        </button>
      </div>

      {/* Danh sách nhắc nhở */}
      <div className="grid gap-4 w-full max-w-2xl">
        {reminders.length === 0 && (
          <p className="text-gray-400 text-center">Chưa có nhắc nhở nào.</p>
        )}
        {reminders.map((reminder, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 rounded-xl shadow-md p-4 flex justify-between items-center"
          >
            <span>{reminder}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
