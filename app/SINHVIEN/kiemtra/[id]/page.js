"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Award } from "lucide-react";
import Link from "next/link";

export default function KiemTraDetail({ params }) {
  const testId = parseInt(params.id);

  // Database câu hỏi cho từng bài kiểm tra
  const testData = {
    1: {
      title: "Kiểm tra Toán học cơ bản",
      questions: [
        { q: "5 + 3 = ?", options: ["6", "7", "8", "9"], correct: 2 },
        { q: "12 - 7 = ?", options: ["3", "4", "5", "6"], correct: 2 },
        { q: "4 × 6 = ?", options: ["20", "22", "24", "26"], correct: 2 },
        { q: "15 ÷ 3 = ?", options: ["3", "4", "5", "6"], correct: 2 },
        { q: "2³ = ?", options: ["6", "8", "9", "12"], correct: 1 },
        { q: "√16 = ?", options: ["2", "3", "4", "5"], correct: 2 },
        { q: "10% của 200 = ?", options: ["10", "20", "30", "40"], correct: 1 },
        { q: "Chu vi hình vuông cạnh 5cm = ?", options: ["15cm", "20cm", "25cm", "30cm"], correct: 1 },
        { q: "3/4 + 1/4 = ?", options: ["1/2", "3/4", "1", "5/4"], correct: 2 },
        { q: "2x = 10, x = ?", options: ["3", "4", "5", "6"], correct: 2 }
      ]
    },
    2: {
      title: "Kiểm tra Tiếng Việt",
      questions: [
        { q: "Từ nào viết đúng chính tả?", options: ["Khổ qua", "Khổ quả", "Kổ qua", "Kho qua"], correct: 1 },
        { q: "Câu nào đúng ngữ pháp?", options: ["Tôi đi chợ", "Tôi đi ở chợ", "Tôi đi về chợ", "Tôi đi tại chợ"], correct: 0 },
        { q: "'Yêu' là từ loại gì?", options: ["Danh từ", "Động từ", "Tính từ", "Phó từ"], correct: 1 },
        { q: "Từ nào là từ đồng nghĩa với 'xinh đẹp'?", options: ["Xấu xí", "Dễ thương", "To lớn", "Nhỏ bé"], correct: 1 },
        { q: "Số lượng nguyên âm trong tiếng Việt?", options: ["9", "10", "11", "12"], correct: 2 },
        { q: "'Mặt trời' có mấy âm tiết?", options: ["1", "2", "3", "4"], correct: 1 },
        { q: "Từ nào là danh từ?", options: ["Chạy", "Đẹp", "Nhà", "Nhanh"], correct: 2 },
        { q: "Câu hỏi nào đúng?", options: ["Bạn tên gì?", "Bạn tên là gì?", "Bạn là tên gì?", "Bạn gì tên?"], correct: 0 },
        { q: "Từ trái nghĩa của 'cao'?", options: ["Thấp", "Lớn", "Nhỏ", "Dài"], correct: 0 },
        { q: "'Học hành' là từ gì?", options: ["Từ đơn", "Từ ghép", "Từ láy", "Thành ngữ"], correct: 1 }
      ]
    },
    3: {
      title: "Kiểm tra Lịch sử Việt Nam",
      questions: [
        { q: "Năm nào Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập?", options: ["1945", "1946", "1954", "1975"], correct: 0 },
        { q: "Thủ đô đầu tiên của Việt Nam là?", options: ["Hà Nội", "Huế", "Cổ Loa", "Sài Gòn"], correct: 2 },
        { q: "Ai là người sáng lập ra Đảng Cộng sản Việt Nam?", options: ["Lê Duẩn", "Hồ Chí Minh", "Võ Nguyên Giáp", "Trường Chinh"], correct: 1 },
        { q: "Chiến thắng Điện Biên Phủ xảy ra năm nào?", options: ["1945", "1954", "1965", "1975"], correct: 1 },
        { q: "Vua nào đánh đuổi quân Thanh?", options: ["Quang Trung", "Lê Lợi", "Trần Hưng Đạo", "Lý Thường Kiệt"], correct: 0 },
        { q: "Nhà Lý được thành lập năm nào?", options: ["1009", "1010", "1054", "1225"], correct: 1 },
        { q: "Ai là người lãnh đạo khởi nghĩa Lam Sơn?", options: ["Lê Lợi", "Nguyễn Huệ", "Trần Quốc Tuấn", "Ngô Quyền"], correct: 0 },
        { q: "Trận Bạch Đằng năm 938 do ai chỉ huy?", options: ["Lý Thường Kiệt", "Ngô Quyền", "Trần Hưng Đạo", "Lê Hoàn"], correct: 1 },
        { q: "Miền Nam được giải phóng hoàn toàn năm?", options: ["1954", "1965", "1973", "1975"], correct: 3 },
        { q: "Đất nước thống nhất đổi tên thành Việt Nam năm?", options: ["1945", "1954", "1975", "1976"], correct: 3 }
      ]
    },
    4: {
      title: "Kiểm tra Địa lý",
      questions: [
        { q: "Sông dài nhất Việt Nam là?", options: ["Sông Hồng", "Sông Mekong", "Sông Đồng Nai", "Sông Cửu Long"], correct: 1 },
        { q: "Việt Nam có bao nhiêu tỉnh thành?", options: ["61", "63", "65", "67"], correct: 1 },
        { q: "Núi cao nhất Việt Nam là?", options: ["Phan Xi Păng", "Ngọc Linh", "Bạch Mã", "Tây Côn Lĩnh"], correct: 0 },
        { q: "Biển Đông nằm ở phía nào của Việt Nam?", options: ["Bắc", "Nam", "Đông", "Tây"], correct: 2 },
        { q: "Thủ đô của Việt Nam là?", options: ["TP.HCM", "Hà Nội", "Đà Nẵng", "Huế"], correct: 1 },
        { q: "Vịnh nào được UNESCO công nhận di sản thế giới?", options: ["Vịnh Nha Trang", "Vịnh Hạ Long", "Vịnh Cam Ranh", "Vịnh Vân Phong"], correct: 1 },
        { q: "Cao nguyên nào lớn nhất Việt Nam?", options: ["Cao nguyên Đắk Lắk", "Cao nguyên Lâm Đồng", "Cao nguyên Tây Nguyên", "Cao nguyên Mộc Châu"], correct: 2 },
        { q: "Việt Nam giáp biên giới với bao nhiêu nước?", options: ["2", "3", "4", "5"], correct: 1 },
        { q: "Châu lục nào Việt Nam thuộc về?", options: ["Châu Âu", "Châu Á", "Châu Phi", "Châu Úc"], correct: 1 },
        { q: "Thành phố nào lớn nhất Việt Nam?", options: ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng"], correct: 1 }
      ]
    },
    5: {
      title: "Kiểm tra Vật lý",
      questions: [
        { q: "Đơn vị của lực là gì?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 },
        { q: "Vận tốc ánh sáng là bao nhiêu?", options: ["300.000 km/s", "150.000 km/s", "450.000 km/s", "600.000 km/s"], correct: 0 },
        { q: "Công thức tính vận tốc?", options: ["v = s × t", "v = s / t", "v = s + t", "v = s - t"], correct: 1 },
        { q: "Trọng lực hướng về đâu?", options: ["Lên trên", "Xuống dưới", "Ngang", "Xiên"], correct: 1 },
        { q: "Đơn vị đo nhiệt độ phổ biến?", options: ["Kelvin", "Celsius", "Fahrenheit", "Rankine"], correct: 1 },
        { q: "Điện trở được đo bằng đơn vị nào?", options: ["Volt", "Ampere", "Ohm", "Watt"], correct: 2 },
        { q: "Áp suất khí quyển tiêu chuẩn là?", options: ["1 atm", "2 atm", "0.5 atm", "1.5 atm"], correct: 0 },
        { q: "Năng lượng không thể?", options: ["Chuyển hóa", "Tạo ra", "Mất đi", "Cả B và C"], correct: 3 },
        { q: "Âm thanh truyền trong môi trường nào nhanh nhất?", options: ["Không khí", "Nước", "Sắt", "Chân không"], correct: 2 },
        { q: "Công thức tính công suất?", options: ["P = A × t", "P = A / t", "P = A + t", "P = A - t"], correct: 1 }
      ]
    },
    6: {
      title: "Kiểm tra Hóa học",
      questions: [
        { q: "Công thức hóa học của nước là?", options: ["H2O", "CO2", "NaCl", "O2"], correct: 0 },
        { q: "Nguyên tố hóa học nào có ký hiệu Au?", options: ["Bạc", "Vàng", "Đồng", "Sắt"], correct: 1 },
        { q: "pH = 7 là dung dịch?", options: ["Axit", "Bazơ", "Trung tính", "Muối"], correct: 2 },
        { q: "Muối ăn có công thức?", options: ["KCl", "NaCl", "CaCl2", "MgCl2"], correct: 1 },
        { q: "Khí CO2 gây ra hiện tượng gì?", options: ["Hiệu ứng nhà kính", "Mưa axit", "Thủng tầng ozon", "Ô nhiễm tiếng ồn"], correct: 0 },
        { q: "Nguyên tố nào nhiều nhất trong không khí?", options: ["Oxygen", "Nitrogen", "Carbon", "Hydrogen"], correct: 1 },
        { q: "Axit sunfuric có công thức?", options: ["HCl", "H2SO4", "HNO3", "H3PO4"], correct: 1 },
        { q: "Số electron tối đa ở lớp K là?", options: ["2", "8", "18", "32"], correct: 0 },
        { q: "Kim loại nào nhẹ nhất?", options: ["Nhôm", "Magie", "Lithium", "Natri"], correct: 2 },
        { q: "Phản ứng hóa học nào tỏa nhiệt?", options: ["Quang hợp", "Đốt cháy", "Điện phân", "Nấu chín"], correct: 1 }
      ]
    },
    7: {
      title: "Kiểm tra Sinh học",
      questions: [
        { q: "Tế bào được phát hiện bởi ai?", options: ["Darwin", "Mendel", "Robert Hooke", "Pasteur"], correct: 2 },
        { q: "DNA có bao nhiêu sợi xoắn?", options: ["1", "2", "3", "4"], correct: 1 },
        { q: "Quá trình quang hợp xảy ra ở đâu?", options: ["Nhân", "Ty thể", "Lục lạp", "Bào quan"], correct: 2 },
        { q: "Con người có bao nhiêu cặp nhiễm sắc thể?", options: ["22", "23", "46", "48"], correct: 1 },
        { q: "Cơ quan nào lọc máu?", options: ["Tim", "Phổi", "Gan", "Thận"], correct: 3 },
        { q: "Động vật nào là động vật có vú?", options: ["Cá heo", "Cá mập", "Rùa", "Rắn"], correct: 0 },
        { q: "Máu đỏ do chất gì?", options: ["Hemoglobin", "Protein", "Glucose", "Lipid"], correct: 0 },
        { q: "Thực vật hấp thụ khí gì ban ngày?", options: ["O2", "CO2", "N2", "H2"], correct: 1 },
        { q: "Bệnh sốt rét do gì gây ra?", options: ["Vi khuẩn", "Virus", "Ký sinh trùng", "Nấm"], correct: 2 },
        { q: "Cơ quan tiêu hóa dài nhất?", options: ["Dạ dày", "Ruột non", "Ruột già", "Thực quản"], correct: 1 }
      ]
    },
    8: {
      title: "Kiểm tra Tin học",
      questions: [
        { q: "CPU viết tắt của từ gì?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"], correct: 0 },
        { q: "1 GB = ? MB", options: ["100", "512", "1000", "1024"], correct: 3 },
        { q: "HTML là gì?", options: ["Ngôn ngữ lập trình", "Ngôn ngữ đánh dấu", "Hệ điều hành", "Phần mềm"], correct: 1 },
        { q: "Phím tắt để sao chép là?", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"], correct: 0 },
        { q: "RAM là gì?", options: ["Bộ nhớ trong", "Bộ nhớ ngoài", "Ổ cứng", "Card màn hình"], correct: 0 },
        { q: "IP Address có bao nhiêu số?", options: ["2", "3", "4", "5"], correct: 2 },
        { q: "Ngôn ngữ lập trình nào dùng cho web?", options: ["Python", "JavaScript", "C++", "Java"], correct: 1 },
        { q: "USB viết tắt của gì?", options: ["Universal Serial Bus", "Unique Serial Bus", "Universal System Bus", "Unique System Bus"], correct: 0 },
        { q: "Hệ điều hành nào của Microsoft?", options: ["Linux", "MacOS", "Windows", "Android"], correct: 2 },
        { q: "WWW viết tắt của gì?", options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], correct: 0 }
      ]
    },
    9: {
      title: "Kiểm tra Tiếng Anh",
      questions: [
        { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
        { q: "Choose the correct: I ___ a student.", options: ["am", "is", "are", "be"], correct: 0 },
        { q: "What color is the sky?", options: ["Red", "Blue", "Green", "Yellow"], correct: 1 },
        { q: "How many days in a week?", options: ["5", "6", "7", "8"], correct: 2 },
        { q: "What is the opposite of 'big'?", options: ["Large", "Small", "Huge", "Tall"], correct: 1 },
        { q: "Choose the correct: She ___ to school.", options: ["go", "goes", "going", "gone"], correct: 1 },
        { q: "What is 'cat' in plural?", options: ["Cats", "Cates", "Catties", "Cat"], correct: 0 },
        { q: "How do you say 'xin chào' in English?", options: ["Goodbye", "Hello", "Thanks", "Sorry"], correct: 1 },
        { q: "Which is a verb?", options: ["Book", "Run", "Table", "Red"], correct: 1 },
        { q: "What time is it? It's ___ o'clock.", options: ["a", "an", "the", "three"], correct: 3 }
      ]
    },
    10: {
      title: "Kiểm tra Tổng hợp",
      questions: [
        { q: "5 + 7 = ?", options: ["10", "11", "12", "13"], correct: 2 },
        { q: "Thủ đô Việt Nam?", options: ["Huế", "Hà Nội", "TP.HCM", "Đà Nẵng"], correct: 1 },
        { q: "H2O là công thức của?", options: ["Nước", "Muối", "Đường", "Axit"], correct: 0 },
        { q: "CPU là gì?", options: ["Bộ xử lý", "Màn hình", "Bàn phím", "Chuột"], correct: 0 },
        { q: "Con người có mấy lá phổi?", options: ["1", "2", "3", "4"], correct: 1 },
        { q: "What is 'dog' in Vietnamese?", options: ["Mèo", "Chó", "Gà", "Vịt"], correct: 1 },
        { q: "Ai phát minh ra bóng đèn?", options: ["Edison", "Newton", "Einstein", "Tesla"], correct: 0 },
        { q: "Năm nào VN độc lập?", options: ["1945", "1954", "1975", "1976"], correct: 0 },
        { q: "Từ nào là động từ?", options: ["Nhà", "Đẹp", "Chạy", "Nhanh"], correct: 2 },
        { q: "Đơn vị của lực?", options: ["Joule", "Newton", "Watt", "Volt"], correct: 1 },
        { q: "Biển Đông ở phía nào VN?", options: ["Bắc", "Nam", "Đông", "Tây"], correct: 2 },
        { q: "pH = 7 là?", options: ["Axit", "Bazơ", "Trung tính", "Muối"], correct: 2 },
        { q: "1 GB = ? MB", options: ["100", "512", "1000", "1024"], correct: 3 },
        { q: "Quang hợp xảy ra ở?", options: ["Nhân", "Ty thể", "Lục lạp", "Màng"], correct: 2 },
        { q: "Choose: He ___ student.", options: ["am", "is", "are", "be"], correct: 1 }
      ]
    }
  };

  // Nếu không có data, tạo câu hỏi mẫu
  const currentTest = testData[testId] || {
    title: `Bài kiểm tra ${testId}`,
    questions: Array(10).fill(null).map((_, i) => ({
      q: `Câu hỏi ${i + 1}?`,
      options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      correct: 0
    }))
  };

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionIndex, answerIndex) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionIndex]: answerIndex });
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    currentTest.questions.forEach((q, i) => {
      if (answers[i] === q.correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getAnswerClass = (questionIndex, optionIndex) => {
    if (!submitted) {
      return answers[questionIndex] === optionIndex
        ? "bg-blue-500 text-white border-blue-600"
        : "bg-white text-gray-800 hover:bg-gray-100";
    }

    const isCorrect = currentTest.questions[questionIndex].correct === optionIndex;
    const isSelected = answers[questionIndex] === optionIndex;

    if (isCorrect) {
      return "bg-green-500 text-white border-green-600";
    }
    if (isSelected && !isCorrect) {
      return "bg-red-500 text-white border-red-600";
    }
    return "bg-gray-200 text-gray-600";
  };

  const getScoreColor = () => {
    const percentage = (score / currentTest.questions.length) * 100;
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-[#0f1c2e] text-white p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{currentTest.title}</h1>
          <Link
            href="/kiemtra"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
          >
            <ArrowLeft size={18} /> Quay lại
          </Link>
        </div>

        {/* Kết quả */}
        {submitted && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-center">
            <Award className="mx-auto mb-3" size={48} />
            <h2 className="text-3xl font-bold mb-2">Kết quả</h2>
            <p className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{currentTest.questions.length}
            </p>
            <p className="text-xl">
              Điểm: {((score / currentTest.questions.length) * 10).toFixed(1)}/10
            </p>
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setScore(0);
              }}
              className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Làm lại
            </button>
          </div>
        )}

        {/* Câu hỏi */}
        <div className="space-y-6">
          {currentTest.questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="bg-white text-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {qIndex + 1}
                </span>
                <h3 className="font-semibold text-lg">{question.q}</h3>
                {submitted && answers[qIndex] === question.correct && (
                  <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                )}
                {submitted && answers[qIndex] !== question.correct && answers[qIndex] !== undefined && (
                  <XCircle className="text-red-500 flex-shrink-0" size={24} />
                )}
              </div>

              <div className="grid gap-3">
                {question.options.map((option, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleAnswer(qIndex, oIndex)}
                    disabled={submitted}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${getAnswerClass(
                      qIndex,
                      oIndex
                    )}`}
                  >
                    <span className="font-semibold mr-2">
                      {String.fromCharCode(65 + oIndex)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nút nộp bài */}
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== currentTest.questions.length}
            className={`w-full mt-8 py-4 rounded-xl font-bold text-lg transition-all ${
              Object.keys(answers).length === currentTest.questions.length
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {Object.keys(answers).length === currentTest.questions.length
              ? "Nộp bài"
              : `Đã trả lời ${Object.keys(answers).length}/${currentTest.questions.length} câu`}
          </button>
        )}
      </div>
    </div>
  );
}