"use client";
import { useState, useEffect } from "react";
import ChatWidget from "./chat_ai";

export default function Slideshow() {
  const images = ["/bgg.jpg", "/bgg1.jpg"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      {/* Background images */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlay dark layer */}
      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

      {/* Text content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-6 drop-shadow-lg">
          Nâng Tầm Học Tập Cùng AI
        </h1>
        <p className="text-white text-lg md:text-xl max-w-3xl leading-relaxed drop-shadow-md">
          Giải phóng tiềm năng học tập của bạn với ứng dụng trợ lý thông minh,
          tích hợp trí tuệ nhân tạo để tối ưu hóa mọi phiên học và đạt được
          thành công vượt trội.
        </p>
      </div>

      {/* Gắn widget chat */}
      <div className="relative z-50 pointer-events-auto">
        <ChatWidget />
      </div>
    </section>
  );
}
