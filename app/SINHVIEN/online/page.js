"use client";

import { useState } from "react";

export default function Home() {
  const [currentClass, setCurrentClass] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const classes = [
    { id: 1, name: "Lớp Toán 10", online: 12 },
    { id: 2, name: "Lớp Lập trình JS", online: 8 },
    { id: 3, name: "Lớp Tiếng Anh", online: 15 },
  ];

  const enterClass = (cls) => setCurrentClass(cls);
  const leaveClass = () => { setCurrentClass(null); setChatMessages([]); };
  const sendMessage = () => {
    if (!message.trim()) return;
    setChatMessages([...chatMessages, { text: message, id: Date.now() }]);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {!currentClass && (
        <div className="w-1/4 bg-white shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Danh sách lớp học</h1>
          <ul>
            {classes.map((cls) => (
              <li key={cls.id} className="mb-4">
                <button
                  onClick={() => enterClass(cls)}
                  className="w-full text-left p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  {cls.name} ({cls.online} online)
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Classroom */}
      {currentClass && (
        <div className="flex-1 flex flex-col relative p-4">
          {/* Nút thoát cố định */}
          <button
            onClick={leaveClass}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition z-10"
          >
            Thoát lớp
          </button>

          <h1 className="text-2xl font-bold mb-4">{currentClass.name}</h1>

          {/* Video area */}
          <div className="flex-1 grid grid-cols-3 gap-4 mb-4">
            {/* Giáo viên */}
            <div className="col-span-2 bg-black flex items-center justify-center text-white text-lg rounded shadow-lg relative">
              Video Giáo viên
            </div>
            {/* Học sinh giả lập */}
            <div className="bg-gray-200 flex flex-col gap-2 p-2 rounded shadow overflow-y-auto">
              <div className="bg-blue-400 text-white p-2 rounded">Học sinh 1</div>
              <div className="bg-green-400 text-white p-2 rounded">Học sinh 2</div>
              <div className="bg-yellow-400 text-white p-2 rounded">Học sinh 3</div>
            </div>
          </div>

          {/* Chat box */}
          <div className="bg-white p-4 rounded shadow-lg max-h-48 overflow-y-auto mb-2">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="mb-2 bg-gray-200 p-2 rounded">
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
