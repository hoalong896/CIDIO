"use client";

import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function StudentSchedule() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/Sinhvien/lichhoc", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Lỗi khi lấy lịch học");

        console.log("📅 Dữ liệu API:", data);

        setEvents(
          (data.lichhoc || []).map((l) => ({
            id: l.id,
            title: `${l.title} - ${l.room}`,
            start: new Date(l.start),
            end: new Date(l.end),
          }))
        );
      } catch (err) {
        console.error("❌ Lỗi fetch lịch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
        📚 Lịch học cá nhân
      </h1>

      {loading ? (
        <p className="text-center">Đang tải lịch học...</p>
      ) : (
        <div className="bg-white border rounded-xl shadow-md p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 650 }}
            defaultView="week"
            messages={{
              today: "Hôm nay",
              previous: "Trước",
              next: "Tiếp",
              month: "Tháng",
              week: "Tuần",
              day: "Ngày",
            }}
          />
        </div>
      )}
    </div>
  );
}
