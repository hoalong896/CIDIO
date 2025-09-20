"use client";
import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import Link from "next/link";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Cấu hình date-fns
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Dữ liệu mẫu
const events = [
  {
    title: "Tiết học hiện tại",
    start: new Date(2025, 8, 20, 8, 0),
    end: new Date(2025, 8, 20, 10, 0),
  },
  {
    title: "Thảo luận nhóm",
    start: new Date(2025, 8, 21, 13, 30),
    end: new Date(2025, 8, 21, 15, 0),
  },
];

export default function ScheduleCalendar() {
  const [myEvents] = useState(events);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Đổi ngày khi chọn input
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate)) setCurrentDate(newDate);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Thanh header đỏ */}
      <div className="p-4 bg-[#0a1a2f] flex items-center justify-between shadow-md">
        <Link href="/home" className="text-white font-semibold hover:underline">
          ← Quay lại
        </Link>

        <h1 className="text-xl font-bold text-white"> Lịch học của bạn</h1>

        <div className="flex items-center gap-2">
          <label htmlFor="dateFilter" className="text-white font-medium">
            Chọn ngày:
          </label>
          <input
            id="dateFilter"
            type="date"
            className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-white"
            onChange={handleDateChange}
          />
        </div>
      </div>

      {/* Calendar chiếm toàn trang */}
      <div className="flex-1">
        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
          defaultView="week"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          style={{
            height: "100%",
            minHeight: "calc(100vh - 70px)", // trừ phần header
            backgroundColor: "white",
            color: "black",
          }}
        />
      </div>
    </div>
  );
}
