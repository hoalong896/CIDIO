"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function PersonalScore() {
  // Dữ liệu 50 sinh viên
  const [allScores] = useState([
    { maSV: "SV001", tenSV: "Nguyễn Văn An", maMon: "MATH101", maLop: "L01", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 8.5, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV002", tenSV: "Trần Thị Bình", maMon: "PHYS101", maLop: "L02", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 7.2, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV003", tenSV: "Lê Hoàng Cường", maMon: "CHEM101", maLop: "L01", tenMon: "Hóa học cơ bản", stc: 2, diemGoc: 9.0, diemChu: "A+", diemQD: 4.0 },
    { maSV: "SV004", tenSV: "Phạm Thị Dung", maMon: "ENG101", maLop: "L03", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 6.5, diemChu: "C+", diemQD: 2.5 },
    { maSV: "SV005", tenSV: "Hoàng Văn Em", maMon: "MATH102", maLop: "L01", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 5.5, diemChu: "D+", diemQD: 1.5 },
    { maSV: "SV006", tenSV: "Đỗ Thị Phương", maMon: "CS101", maLop: "L02", tenMon: "Lập trình C", stc: 4, diemGoc: 8.8, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV007", tenSV: "Vũ Minh Giang", maMon: "MATH101", maLop: "L02", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 7.8, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV008", tenSV: "Bùi Thị Hoa", maMon: "PHYS102", maLop: "L01", tenMon: "Vật lý 2", stc: 3, diemGoc: 6.8, diemChu: "C+", diemQD: 2.5 },
    { maSV: "SV009", tenSV: "Đinh Văn Hùng", maMon: "CS102", maLop: "L03", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 9.2, diemChu: "A+", diemQD: 4.0 },
    { maSV: "SV010", tenSV: "Ngô Thị Lan", maMon: "ENG102", maLop: "L02", tenMon: "Tiếng Anh 2", stc: 3, diemGoc: 7.5, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV011", tenSV: "Trương Văn Khoa", maMon: "MATH101", maLop: "L03", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 8.0, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV012", tenSV: "Mai Thị Linh", maMon: "CHEM102", maLop: "L02", tenMon: "Hóa học hữu cơ", stc: 3, diemGoc: 6.0, diemChu: "C", diemQD: 2.0 },
    { maSV: "SV013", tenSV: "Phan Văn Minh", maMon: "CS101", maLop: "L01", tenMon: "Lập trình C", stc: 4, diemGoc: 7.0, diemChu: "B", diemQD: 3.0 },
    { maSV: "SV014", tenSV: "Lý Thị Nga", maMon: "PHYS101", maLop: "L03", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 8.3, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV015", tenSV: "Võ Văn Oanh", maMon: "MATH102", maLop: "L02", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 5.0, diemChu: "D", diemQD: 1.0 },
    { maSV: "SV016", tenSV: "Đặng Thị Phượng", maMon: "ENG101", maLop: "L01", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 7.8, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV017", tenSV: "Hồ Văn Quang", maMon: "CS102", maLop: "L02", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 8.5, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV018", tenSV: "Chu Thị Thanh", maMon: "MATH101", maLop: "L01", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 9.5, diemChu: "A+", diemQD: 4.0 },
    { maSV: "SV019", tenSV: "Dương Văn Sơn", maMon: "PHYS102", maLop: "L02", tenMon: "Vật lý 2", stc: 3, diemGoc: 6.2, diemChu: "C", diemQD: 2.0 },
    { maSV: "SV020", tenSV: "Lưu Thị Tâm", maMon: "CHEM101", maLop: "L03", tenMon: "Hóa học cơ bản", stc: 2, diemGoc: 8.7, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV021", tenSV: "Cao Văn Tùng", maMon: "CS101", maLop: "L03", tenMon: "Lập trình C", stc: 4, diemGoc: 7.5, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV022", tenSV: "Huỳnh Thị Uyên", maMon: "ENG102", maLop: "L01", tenMon: "Tiếng Anh 2", stc: 3, diemGoc: 8.2, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV023", tenSV: "Tô Văn Việt", maMon: "MATH102", maLop: "L03", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 6.5, diemChu: "C+", diemQD: 2.5 },
    { maSV: "SV024", tenSV: "Kiều Thị Xuân", maMon: "PHYS101", maLop: "L01", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 7.0, diemChu: "B", diemQD: 3.0 },
    { maSV: "SV025", tenSV: "Hà Văn Yên", maMon: "CS102", maLop: "L01", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 9.0, diemChu: "A+", diemQD: 4.0 },
    { maSV: "SV026", tenSV: "Âu Thị Ánh", maMon: "CHEM102", maLop: "L01", tenMon: "Hóa học hữu cơ", stc: 3, diemGoc: 5.5, diemChu: "D+", diemQD: 1.5 },
    { maSV: "SV027", tenSV: "Lâm Văn Bảo", maMon: "ENG101", maLop: "L02", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 8.8, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV028", tenSV: "Từ Thị Chi", maMon: "MATH101", maLop: "L02", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 6.8, diemChu: "C+", diemQD: 2.5 },
    { maSV: "SV029", tenSV: "Ông Văn Đạt", maMon: "CS101", maLop: "L02", tenMon: "Lập trình C", stc: 4, diemGoc: 8.0, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV030", tenSV: "Nghiêm Thị Duyên", maMon: "PHYS102", maLop: "L03", tenMon: "Vật lý 2", stc: 3, diemGoc: 7.3, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV031", tenSV: "Quách Văn Đức", maMon: "CHEM101", maLop: "L02", tenMon: "Hóa học cơ bản", stc: 2, diemGoc: 9.3, diemChu: "A+", diemQD: 4.0 },
    { maSV: "SV032", tenSV: "Diệp Thị Hiền", maMon: "ENG102", maLop: "L03", tenMon: "Tiếng Anh 2", stc: 3, diemGoc: 6.5, diemChu: "C+", diemQD: 2.5 },
    { maSV: "SV033", tenSV: "Doãn Văn Hải", maMon: "MATH102", maLop: "L01", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 7.8, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV034", tenSV: "Uông Thị Kim", maMon: "CS102", maLop: "L03", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 8.8, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV035", tenSV: "Mạc Văn Long", maMon: "PHYS101", maLop: "L02", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 5.8, diemChu: "D+", diemQD: 1.5 },
    { maSV: "SV036", tenSV: "Hàn Thị Mai", maMon: "CHEM102", maLop: "L03", tenMon: "Hóa học hữu cơ", stc: 3, diemGoc: 7.5, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV037", tenSV: "Thái Văn Nam", maMon: "ENG101", maLop: "L03", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 8.5, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV038", tenSV: "Ân Thị Như", maMon: "MATH101", maLop: "L03", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 7.2, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV039", tenSV: "La Văn Phú", maMon: "CS101", maLop: "L01", tenMon: "Lập trình C", stc: 4, diemGoc: 6.0, diemChu: "C", diemQD: 2.0 },
    { maSV: "SV040", tenSV: "Khổng Thị Quỳnh", maMon: "PHYS102", maLop: "L01", tenMon: "Vật lý 2", stc: 3, diemGoc: 8.7, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV041", tenSV: "Sầm Văn Thành", maMon: "CHEM101", maLop: "L01", tenMon: "Hóa học cơ bản", stc: 2, diemGoc: 7.0, diemChu: "B", diemQD: 3.0 },
    { maSV: "SV042", tenSV: "Vi Thị Trang", maMon: "ENG102", maLop: "L02", tenMon: "Tiếng Anh 2", stc: 3, diemGoc: 9.0, diemChu: "A+", diemQD: 4.0 },
    { maSV: "SV043", tenSV: "Lục Văn Tuấn", maMon: "MATH102", maLop: "L02", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 6.3, diemChu: "C", diemQD: 2.0 },
    { maSV: "SV044", tenSV: "Đào Thị Vân", maMon: "CS102", maLop: "L02", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 8.2, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV045", tenSV: "Bạch Văn Vinh", maMon: "PHYS101", maLop: "L03", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 7.7, diemChu: "B+", diemQD: 3.5 },
    { maSV: "SV046", tenSV: "Tiêu Thị Yến", maMon: "CHEM102", maLop: "L02", tenMon: "Hóa học hữu cơ", stc: 3, diemGoc: 5.2, diemChu: "D", diemQD: 1.0 },
    { maSV: "SV047", tenSV: "Đoàn Văn An", maMon: "ENG101", maLop: "L01", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 8.0, diemChu: "A", diemQD: 4.0 },
    { maSV: "SV048", tenSV: "Tăng Thị Bích", maMon: "MATH101", maLop: "L01", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 6.7, diemChu: "C+", diemQD: 2.5 },
    { maSV: "SV049", tenSV: "Triệu Văn Chiến", maMon: "CS101", maLop: "L03", tenMon: "Lập trình C", stc: 4, diemGoc: 9.5, diemChu: "A+", diemQD: 4.0 },
    { maSV: "SV050", tenSV: "Quan Thị Diễm", maMon: "PHYS102", maLop: "L02", tenMon: "Vật lý 2", stc: 3, diemGoc: 7.5, diemChu: "B+", diemQD: 3.5 },
    
    // 30 sinh viên mới với mã BH
    { maSV: "BH01165", tenSV: "Nguyễn Minh Tú", maMon: "MATH101", maLop: "L04", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 8.7, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH02347", tenSV: "Trần Quốc Huy", maMon: "CS101", maLop: "L04", tenMon: "Lập trình C", stc: 4, diemGoc: 7.3, diemChu: "B+", diemQD: 3.5 },
    { maSV: "BH03528", tenSV: "Lê Thị Ngọc", maMon: "PHYS101", maLop: "L05", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 6.8, diemChu: "C+", diemQD: 2.5 },
    { maSV: "BH04712", tenSV: "Phạm Đức Long", maMon: "ENG101", maLop: "L04", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 9.2, diemChu: "A+", diemQD: 4.0 },
    { maSV: "BH05893", tenSV: "Hoàng Thị Hương", maMon: "CHEM101", maLop: "L05", tenMon: "Hóa học cơ bản", stc: 2, diemGoc: 8.0, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH06124", tenSV: "Vũ Minh Khôi", maMon: "MATH102", maLop: "L04", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 5.5, diemChu: "D+", diemQD: 1.5 },
    { maSV: "BH07456", tenSV: "Đỗ Thị Linh", maMon: "CS102", maLop: "L05", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 8.9, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH08639", tenSV: "Bùi Văn Đạt", maMon: "PHYS102", maLop: "L04", tenMon: "Vật lý 2", stc: 3, diemGoc: 7.1, diemChu: "B", diemQD: 3.0 },
    { maSV: "BH09281", tenSV: "Mai Thị Phương", maMon: "ENG102", maLop: "L05", tenMon: "Tiếng Anh 2", stc: 3, diemGoc: 8.5, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH10573", tenSV: "Đinh Quang Minh", maMon: "CHEM102", maLop: "L04", tenMon: "Hóa học hữu cơ", stc: 3, diemGoc: 6.2, diemChu: "C", diemQD: 2.0 },
    { maSV: "BH11846", tenSV: "Lý Thị Thanh", maMon: "MATH101", maLop: "L05", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 9.0, diemChu: "A+", diemQD: 4.0 },
    { maSV: "BH12097", tenSV: "Ngô Văn Tài", maMon: "CS101", maLop: "L04", tenMon: "Lập trình C", stc: 4, diemGoc: 7.8, diemChu: "B+", diemQD: 3.5 },
    { maSV: "BH13428", tenSV: "Trương Thị Nga", maMon: "PHYS101", maLop: "L04", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 6.5, diemChu: "C+", diemQD: 2.5 },
    { maSV: "BH14652", tenSV: "Phan Hữu Thành", maMon: "ENG101", maLop: "L05", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 8.3, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH15937", tenSV: "Võ Thị Oanh", maMon: "CHEM101", maLop: "L04", tenMon: "Hóa học cơ bản", stc: 2, diemGoc: 7.5, diemChu: "B+", diemQD: 3.5 },
    { maSV: "BH16284", tenSV: "Đặng Minh Tuấn", maMon: "MATH102", maLop: "L05", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 5.0, diemChu: "D", diemQD: 1.0 },
    { maSV: "BH17519", tenSV: "Hồ Thị Mai", maMon: "CS102", maLop: "L04", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 9.3, diemChu: "A+", diemQD: 4.0 },
    { maSV: "BH18762", tenSV: "Chu Văn Hùng", maMon: "PHYS102", maLop: "L05", tenMon: "Vật lý 2", stc: 3, diemGoc: 7.7, diemChu: "B+", diemQD: 3.5 },
    { maSV: "BH19045", tenSV: "Dương Thị Hà", maMon: "ENG102", maLop: "L04", tenMon: "Tiếng Anh 2", stc: 3, diemGoc: 8.8, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH20386", tenSV: "Lưu Đức Nam", maMon: "CHEM102", maLop: "L05", tenMon: "Hóa học hữu cơ", stc: 3, diemGoc: 6.0, diemChu: "C", diemQD: 2.0 },
    { maSV: "BH21671", tenSV: "Cao Thị Trang", maMon: "MATH101", maLop: "L04", tenMon: "Toán cao cấp 1", stc: 3, diemGoc: 8.2, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH22958", tenSV: "Huỳnh Văn Sơn", maMon: "CS101", maLop: "L05", tenMon: "Lập trình C", stc: 4, diemGoc: 7.0, diemChu: "B", diemQD: 3.0 },
    { maSV: "BH23104", tenSV: "Tô Thị Yến", maMon: "PHYS101", maLop: "L05", tenMon: "Vật lý đại cương", stc: 3, diemGoc: 9.5, diemChu: "A+", diemQD: 4.0 },
    { maSV: "BH24537", tenSV: "Kiều Minh Phúc", maMon: "ENG101", maLop: "L04", tenMon: "Tiếng Anh 1", stc: 3, diemGoc: 6.7, diemChu: "C+", diemQD: 2.5 },
    { maSV: "BH25819", tenSV: "Hà Thị Loan", maMon: "CHEM101", maLop: "L05", tenMon: "Hóa học cơ bản", stc: 2, diemGoc: 8.6, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH26392", tenSV: "Âu Văn Kiên", maMon: "MATH102", maLop: "L04", tenMon: "Toán cao cấp 2", stc: 3, diemGoc: 7.4, diemChu: "B+", diemQD: 3.5 },
    { maSV: "BH27685", tenSV: "Lâm Thị Bích", maMon: "CS102", maLop: "L05", tenMon: "Cấu trúc dữ liệu", stc: 4, diemGoc: 8.1, diemChu: "A", diemQD: 4.0 },
    { maSV: "BH28471", tenSV: "Từ Văn Đức", maMon: "PHYS102", maLop: "L04", tenMon: "Vật lý 2", stc: 3, diemGoc: 6.3, diemChu: "C", diemQD: 2.0 },
    { maSV: "BH29756", tenSV: "Ông Thị Như", maMon: "ENG102", maLop: "L05", tenMon: "Tiếng Anh 2", stc: 3, diemGoc: 9.1, diemChu: "A+", diemQD: 4.0 },
    { maSV: "BH30142", tenSV: "Nghiêm Văn Hải", maMon: "CHEM102", maLop: "L04", tenMon: "Hóa học hữu cơ", stc: 3, diemGoc: 7.9, diemChu: "B+", diemQD: 3.5 },
  ]);

  const [searchType, setSearchType] = useState("tenSV");
  const [keyword, setKeyword] = useState("");
  const [filteredScores, setFilteredScores] = useState(allScores);

  const handleSearch = () => {
    if (!keyword.trim()) {
      setFilteredScores(allScores);
      return;
    }

    const filtered = allScores.filter((item) => {
      const searchValue = keyword.toLowerCase().trim();
      if (searchType === "tenSV") {
        return item.tenSV.toLowerCase().includes(searchValue);
      } else if (searchType === "maLop") {
        return item.maLop.toLowerCase().includes(searchValue);
      }
      return true;
    });

    setFilteredScores(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex flex-col items-center relative">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
        Bảng Điểm Sinh Viên
      </h1>

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-7xl p-8">
        {/* Bộ lọc */}
        
        <div className="flex gap-3 mb-6 items-center">
          <select
            className="border-2 border-purple-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="tenSV">Tìm theo Tên Sinh Viên</option>
            <option value="maLop">Tìm theo Mã Lớp</option>
          </select>

          <input
            type="text"
            placeholder={
              searchType === "tenSV"
                ? "Nhập tên sinh viên..."
                : "Nhập mã lớp (VD: L01)..."
            }
            className="border-2 border-purple-300 rounded-lg px-4 py-2 flex-1 text-gray-700 focus:outline-none focus:border-purple-500 transition-colors"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />

          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
          >
            Tìm Kiếm
          </button>

          <button
            onClick={() => {
              setKeyword("");
              setFilteredScores(allScores);
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Reset
          </button>
        </div>

        {/* Thông tin tổng quan */}
        <div className="mb-4 text-gray-700 font-medium">
          Hiển thị <span className="text-purple-600 font-bold">{filteredScores.length}</span> kết quả
        </div>

        {/* Bảng điểm */}
        <div className="overflow-x-auto rounded-lg border-2 border-purple-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <th className="px-4 py-3 text-left font-semibold">Mã SV</th>
                <th className="px-4 py-3 text-left font-semibold">Tên Sinh Viên</th>
                <th className="px-4 py-3 text-left font-semibold">Mã Môn</th>
                <th className="px-4 py-3 text-left font-semibold">Mã Lớp</th>
                <th className="px-4 py-3 text-left font-semibold">Tên Môn</th>
                <th className="px-4 py-3 text-center font-semibold">STC</th>
                <th className="px-4 py-3 text-center font-semibold">Điểm gốc</th>
                <th className="px-4 py-3 text-center font-semibold">Điểm chữ</th>
                <th className="px-4 py-3 text-center font-semibold">Điểm QĐ</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.length > 0 ? (
                filteredScores.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-purple-50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-700 font-medium">{row.maSV}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{row.tenSV}</td>
                    <td className="px-4 py-3 text-gray-600">{row.maMon}</td>
                    <td className="px-4 py-3 text-gray-600">{row.maLop}</td>
                    <td className="px-4 py-3 text-gray-700">{row.tenMon}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.stc}</td>
                    <td className="px-4 py-3 text-center text-gray-700 font-semibold">
                      {row.diemGoc}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded font-bold ${
                          row.diemChu.includes("A")
                            ? "bg-green-100 text-green-700"
                            : row.diemChu.includes("B")
                            ? "bg-blue-100 text-blue-700"
                            : row.diemChu.includes("C")
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.diemChu}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700 font-semibold">
                      {row.diemQD}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-8 text-gray-500 text-lg">
                    Không tìm thấy kết quả phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}