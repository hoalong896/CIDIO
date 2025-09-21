"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
  };

  // Scroll tự động tới tin nhắn mới nhất
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Xử lý Enter để gửi
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      {/* Nút mở/đóng chat */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-[9999]"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Hộp chat */}
      {open && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border rounded-2xl shadow-2xl flex flex-col text-black overflow-hidden z-[9999]">
          {/* Header */}
          <div className="p-3 border-b font-semibold bg-blue-600 text-white flex justify-between items-center">
            AI Trợ Lý
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Tin nhắn */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[75%] shadow ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Chỗ đánh dấu để auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
