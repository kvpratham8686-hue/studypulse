"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [streak, setStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedStreak = localStorage.getItem("streak");
    const savedTotal = localStorage.getItem("totalDays");
    const savedLast = localStorage.getItem("lastDate");
    const savedHistory = localStorage.getItem("history");

    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedTotal) setTotalDays(parseInt(savedTotal));
    if (savedLast) setLastDate(savedLast);
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  function markToday() {
    const today = new Date().toDateString();

    if (today === lastDate) {
      alert("You already marked today!");
      return;
    }

    const newStreak = streak + 1;
    const newTotal = totalDays + 1;

    const newHistory = [...history, today];

    setStreak(newStreak);
    setTotalDays(newTotal);
    setLastDate(today);
    setHistory(newHistory);

    localStorage.setItem("streak", newStreak.toString());
    localStorage.setItem("totalDays", newTotal.toString());
    localStorage.setItem("lastDate", today);
    localStorage.setItem("history", JSON.stringify(newHistory));
  }

  function resetStreak() {
    localStorage.removeItem("streak");
    localStorage.removeItem("totalDays");
    localStorage.removeItem("lastDate");
    localStorage.removeItem("history");

    setStreak(0);
    setTotalDays(0);
    setLastDate("");
    setHistory([]);
  }

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "12px",
          width: "420px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
          StudyPulse 📚
        </h1>

        <div
          style={{
            background: "#334155",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          🔥 Current Streak: <b>{streak}</b> days
        </div>

        <div
          style={{
            background: "#334155",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          📅 Total Study Days: <b>{totalDays}</b>
        </div>

        <div
          style={{
            background: "#334155",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          🕒 Last Studied: {lastDate || "Not yet"}
        </div>

        <button
          onClick={markToday}
          style={{
            background: "#22c55e",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            marginRight: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          I Studied Today
        </button>

        <button
          onClick={resetStreak}
          style={{
            background: "#ef4444",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Reset Streak
        </button>

        <h3 style={{ marginTop: "30px" }}>Study History</h3>

        <ul style={{ marginTop: "10px", textAlign: "left" }}>
          {history.map((day, index) => (
            <li key={index}>{day}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}