"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TeacherSchedule() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // state để điều khiển tuần
  const router = useRouter();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/Giangvien/lichday", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();

        // convert start, end sang Date chuẩn
        const parsedEvents = data.map((item, idx) => ({
          id: idx,
          title: item.title,
          location: item.location,
          start: new Date(item.start), // cần ISO hoặc YYYY-MM-DD HH:mm:ss
          end: new Date(item.end),
        }));

        setEvents(parsedEvents);
      } catch (err) {
        console.error("Lỗi load lịch:", err);
      }
    };
    fetchSchedule();
  }, []);

  // Style event giống hình (vàng nhạt, viền xám, text xuống dòng)
  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#FFF9C4", // vàng nhạt
        border: "1px solid #E5E7EB", // viền xám nhạt
        borderRadius: "4px",
        color: "#111827",
        fontSize: "13px",
        fontWeight: 500,
        padding: "6px",
        whiteSpace: "normal", // cho xuống dòng
        lineHeight: "1.2rem",
      },
    };
  };

  // Nội dung hiển thị trong ô event
const EventComponent = ({ event }) => (
  <div className="leading-snug">
    <div className="font-semibold text-sm"> {event.title}</div>
    {event.location && (
      <div className="text-xs text-gray-700">{event.location}</div>
    )}
    <div className="text-xs text-gray-600">
      {moment(event.start).format("HH:mm")} - {moment(event.end).format("HH:mm")}
    </div>
  </div>
);


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Nút quay lại */}
      <button
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
        onClick={() => router.back()}
      >
        ← Quay lại
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-purple-700">
         Lịch dạy của bạn
      </h1>

      <div className="bg-white border rounded-xl shadow-md p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)} 
          defaultView="week"
          views={["week"]}
          step={30}
          timeslots={2}
          style={{ height: 650 }}
          eventPropGetter={eventStyleGetter}
          components={{ event: EventComponent }}
          messages={{
            today: "Hôm nay",
            previous: "Trước",
            next: "Tiếp",
            month: "Tháng",
            week: "Tuần",
            day: "Ngày",
          }}
        />

        <style jsx global>{`
          .rbc-header {
            color: #111827 !important;
            font-weight: 600;
            font-size: 14px;
          }
          .rbc-toolbar {
            margin-bottom: 12px;
          }
          .rbc-toolbar-label {
            color: #111827 !important;
            font-weight: 700;
            font-size: 1.1rem;
          }
          .rbc-time-gutter .rbc-timeslot-group,
          .rbc-time-gutter .rbc-label {
            color: #374151 !important;
            font-weight: 500;
            font-size: 12px;
          }
          .rbc-today {
            background-color: #fef9c3 !important; /* ngày hiện tại vàng nhạt */
          }
          .rbc-event {
            cursor: default;
          }
        `}</style>
      </div>
    </div>
  );
}
