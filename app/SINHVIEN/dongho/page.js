"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Timer, Hourglass } from "lucide-react";

// --- Đồng hồ đếm giờ ---
function Stopwatch({ onBack, onSwitch }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-[400px] text-center">
      {/* Thanh trên */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onBack}
          className="px-3 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
        <button
          onClick={onSwitch}
          className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1"
        >
          <Hourglass size={16} /> Đếm ngược
        </button>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-2">
        Đồng Hồ Ghi Nhận Giờ Học
      </h2>
      <p className="text-gray-500 mb-4">
        Ghi lại thời gian học tập thực tế của bạn.
      </p>

      {/* Hiển thị */}
      <div className="text-4xl font-bold text-[#0f1c2e] mb-4">
        {hours}:{minutes}:{seconds}
      </div>

      {/* Nút */}
      <div className="flex justify-center gap-3">
        {!running ? (
          <button
            onClick={() => setRunning(true)}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Bắt đầu
          </button>
        ) : (
          <button
            onClick={() => setRunning(false)}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          >
            Kết thúc
          </button>
        )}
      </div>
    </div>
  );
}

// --- Đồng hồ đếm ngược ---
function Countdown({ onBack, onSwitch }) {
  const [time, setTime] = useState(0);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const handleStart = () => {
    const totalSeconds =
      Number(inputHours) * 3600 +
      Number(inputMinutes) * 60 +
      Number(inputSeconds);
    if (totalSeconds > 0) {
      setTime(totalSeconds);
      setRunning(true);
    }
  };

  const handleStop = () => {
    setRunning(false);
    setTime(0);
  };

  const hours = String(Math.floor(time / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-[400px] text-center">
      {/* Thanh trên */}
      <div className="flex justify-between items-center mb-4 ">
        <button
          onClick={onBack}
          className="px-3 py-1 rounded-lg bg-red hover:bg-gray-400 flex items-center gap-1 text-black"
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
        <button
          onClick={onSwitch}
          className="px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-1"
        >
          <Timer size={16} /> Đếm giờ
        </button>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-2">
        Đồng Hồ Đếm Ngược
      </h2>

      {/* Input */}
      {!running && (
        <div className="flex justify-center gap-2 mb-4">
          <input
            type="number"
            min="0"
            value={inputHours}
            onChange={(e) => setInputHours(e.target.value)}
            className="w-16 p-2 border rounded-lg text-center text-black"
            placeholder="Giờ"
          />
          <input
            type="number"
            min="0"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            className="w-16 p-2 border rounded-lg text-center text-black"
            placeholder="Phút"
          />
          <input
            type="number"
            min="0"
            value={inputSeconds}
            onChange={(e) => setInputSeconds(e.target.value)}
            className="w-16 p-2 border rounded-lg text-center text-black"
            placeholder="Giây"
          />
        </div>
      )}

      {/* Hiển thị */}
      <div className="text-4xl font-bold text-[#0f1c2e] mb-4">
        {hours}:{minutes}:{seconds}
      </div>

      {/* Nút */}
      <div className="flex justify-center gap-3">
        {!running ? (
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Bắt đầu
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          >
            Kết thúc
          </button>
        )}
      </div>
    </div>
  );
}

export default function TimerApp() {
  const [mode, setMode] = useState("stopwatch"); // "stopwatch" | "countdown"
  const router = useRouter();

  const handleBack = () => {
    router.push("/home");
  };

  const handleSwitch = () => {
    setMode(mode === "stopwatch" ? "countdown" : "stopwatch");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f1c2e]">
      {mode === "stopwatch" ? (
        <Stopwatch onBack={handleBack} onSwitch={handleSwitch} />
      ) : (
        <Countdown onBack={handleBack} onSwitch={handleSwitch} />
      )}
    </div>
  );
}
