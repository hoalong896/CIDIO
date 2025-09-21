"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTestPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  const addQuestion = () =>
    setQuestions([...questions, { question: "", answer: "" }]);
  const removeQuestion = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const testData = { title, subject, questions };
    console.log("Bài kiểm tra:", testData);
    alert("Bài kiểm tra đã được tạo!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1e1e2f",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "600px",
          backgroundColor: "#cccff7ff",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => router.push("/home")}
          style={{
            background: "#cfe690ff",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "1rem",
            color: "#000",
          }}
        >
          Quay lại
        </button>

        <h1 style={{ marginBottom: "1rem", color: "black" }}>
          Tạo bài kiểm tra
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem", color: "black" }}>
            <label>
              Môn học:{" "}
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #000000ff",
                }}
              />
            </label>
          </div>

          <div style={{ marginBottom: "1rem", color: "black" }}>
            <label>
              Tiêu đề bài kiểm tra:{" "}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #000000ff",
                }}
              />
            </label>
          </div>

          <h2 style={{ color: "black" }}>Câu hỏi</h2>
          {questions.map((q, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #000000ff",
                padding: "1rem",
                borderRadius: "5px",
                marginBottom: "1rem",
              }}
            >
              <div style={{ marginBottom: "0.5rem", color: "black" }}>
                <label>
                  Câu hỏi {index + 1}:{" "}
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #000000ff",
                    }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "0.5rem", color: "black" }}>
                <label>
                  Đáp án:{" "}
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) =>
                      handleQuestionChange(index, "answer", e.target.value)
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #000000ff",
                    }}
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Xóa câu hỏi
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            style={{
              background: "green",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
          >
            Thêm câu hỏi
          </button>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                background: "blue",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
                width: "200px",
              }}
            >
              Tạo bài kiểm tra
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
