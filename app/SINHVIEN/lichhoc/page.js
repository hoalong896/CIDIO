"use client";

import { useEffect, useState, useRef } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/app/globals.css";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";

const localizer = momentLocalizer(moment);

export default function LichHocPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();
  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Bạn chưa đăng nhập hoặc token không tồn tại");

        const res = await fetch("/api/Sinhvien/khoahoc/danhsach", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Không thể lấy lịch học");

        const colors = [
          "#a1bce8ff", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444",
          "#14B8A6", "#6366F1", "#84CC16", "#EC4899", "#0EA5E9",
        ];

        const formattedEvents = data.flatMap((item, idx) => {
          const kh = item.khoahoc;
          const color = colors[idx % colors.length];
          const startDate = moment(kh.ngay_batdau);
          const endDate = moment(kh.ngay_ketthuc);
          const days = endDate.diff(startDate, "days") + 1;

          return Array.from({ length: days }, (_, i) => ({
            id: `${item.ma_khoahoc}-${i}`,
            title: kh.ten_khoahoc,
            start: startDate.clone().add(i, "days").toDate(),
            end: startDate.clone().add(i, "days").add(2, "hours").toDate(),
            desc: kh.mo_ta || "Không có mô tả",
            giangvien: kh.giangvien?.ho_ten || "Chưa có giảng viên",
            color,
          }));
        });

        setEvents(formattedEvents);
      } catch (err) {
        console.error(" Lỗi tải lịch học:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handlePrev = () => setCurrentDate(moment(currentDate).subtract(1, "week").toDate());
  const handleNext = () => setCurrentDate(moment(currentDate).add(1, "week").toDate());
  const handleToday = () => setCurrentDate(new Date());

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500 text-lg animate-pulse"> Đang tải lịch học...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500 text-lg">
          ⚠️ Chưa đăng ký khóa học nào hoặc chưa có lịch học!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-[90vh]">
      {/* 🎓 Thanh điều hướng */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} />
          Quay lại
        </button>

        <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2 drop-shadow-md">
          <CalendarDays size={30} />
          Lịch Học Của Bạn
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleToday}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-semibold"
          >
            Hôm nay
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* 🗓️ Lịch */}
     <div className="bg-white p-5 rounded-2xl shadow-2xl border border-gray-200">
  <Calendar
    ref={calendarRef}
    localizer={localizer}
    date={currentDate}
    onNavigate={setCurrentDate}
    events={events}
    startAccessor="start"
    endAccessor="end"
    views={["month", "week", "day"]}
    popup={true}
    showMultiDayTimes={false}
    style={{ height: "75vh" }}
    messages={{
      month: "Tháng",
      week: "Tuần",
      day: "Ngày",
      today: "Hôm nay",
      previous: "← Trước",
      next: "Tiếp →",
      showMore: (count) => `+${count} môn học khác`,
    }}
    components={{
      event: ({ event }) => (
        <div
          className="flex items-center gap-1 px-2 py-1 text-[13px] font-semibold rounded-md shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-200"
          style={{
            // Màu dịu (pha trắng nhiều hơn)
            background: `linear-gradient(90deg, ${event.color}22, ${event.color}55)`,
            color: "#222",
            border: `1px solid ${event.color}33`,
            backdropFilter: "blur(3px)",
          }}
        >
          <BookOpen size={14} className="text-gray-700" />
          <span className="truncate">{event.title}</span>
        </div>
      ),
    }}
    eventPropGetter={(event) => ({
      style: {
        backgroundColor: `${event.color}20`, 
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        alignItems: "center",
      },
    })}
    onSelectEvent={(event) => setSelectedEvent(event)}
    onShowMore={(events) => setSelectedDayEvents(events)} 
  />
</div>


      {/* 📘 Popup chi tiết từng môn */}
      {selectedEvent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <BookOpen size={24} />
              {selectedEvent.title}
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">👨‍🏫 Giảng viên:</span>{" "}
              {selectedEvent.giangvien}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">🕒 Thời gian:</span>{" "}
              {moment(selectedEvent.start).format("DD/MM/YYYY")} →{" "}
              {moment(selectedEvent.end).format("DD/MM/YYYY")}
            </p>
            <p className="text-gray-700 mt-3">
              <span className="font-semibold">📖 Mô tả:</span> {selectedEvent.desc}
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* 📅 Popup danh sách môn học khi bấm “+x more” */}
      {selectedDayEvents && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          onClick={() => setSelectedDayEvents(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 w-[95%] max-w-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              📚 Các môn học trong ngày
            </h2>
            <div className="space-y-3">
              {selectedDayEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="border border-gray-200 rounded-xl p-3 flex flex-col gap-1 hover:shadow-md transition cursor-pointer"
                  style={{ backgroundColor: ev.color + "22" }}
                  onClick={() => setSelectedEvent(ev)}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-600" />
                    <p className="font-semibold text-blue-800">{ev.title}</p>
                  </div>
                  <p className="text-gray-700 text-sm">
                    👨‍🏫 {ev.giangvien}
                  </p>
                  <p className="text-gray-600 text-sm">
                    🕒 {moment(ev.start).format("HH:mm")} - {moment(ev.end).format("HH:mm")}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedDayEvents(null)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
