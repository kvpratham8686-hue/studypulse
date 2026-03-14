"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [streak, setStreak] = useState(0)
  const [totalDays, setTotalDays] = useState(0)
  const [lastDate, setLastDate] = useState("")
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const savedStreak = localStorage.getItem("streak")
    const savedTotalDays = localStorage.getItem("totalDays")
    const savedLastDate = localStorage.getItem("lastDate")
    const savedHistory = localStorage.getItem("history")

    if (savedStreak) setStreak(parseInt(savedStreak))
    if (savedTotalDays) setTotalDays(parseInt(savedTotalDays))
    if (savedLastDate) setLastDate(savedLastDate)

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    } else {
      // Pre-fill example history for demo
      const demoHistory = [
        new Date(new Date().setDate(new Date().getDate() - 3)).toDateString(),
        new Date(new Date().setDate(new Date().getDate() - 2)).toDateString(),
        new Date(new Date().setDate(new Date().getDate() - 1)).toDateString(),
      ]
      setHistory(demoHistory)
      setStreak(3)
      setTotalDays(3)
      setLastDate(demoHistory[demoHistory.length - 1])

      localStorage.setItem("history", JSON.stringify(demoHistory))
      localStorage.setItem("streak", "3")
      localStorage.setItem("totalDays", "3")
      localStorage.setItem("lastDate", demoHistory[demoHistory.length - 1])
    }
  }, [])

  function markToday() {
    const today = new Date().toDateString()
    if (lastDate === today) {
      alert("You already marked today!")
      return
    }

    const newStreak = streak + 1
    const newTotal = totalDays + 1
    const newHistory = [...history, today]

    setStreak(newStreak)
    setTotalDays(newTotal)
    setLastDate(today)
    setHistory(newHistory)

    localStorage.setItem("streak", newStreak.toString())
    localStorage.setItem("totalDays", newTotal.toString())
    localStorage.setItem("lastDate", today)
    localStorage.setItem("history", JSON.stringify(newHistory))
  }

  function resetStreak() {
    localStorage.removeItem("streak")
    localStorage.removeItem("totalDays")
    localStorage.removeItem("lastDate")
    localStorage.removeItem("history")

    setStreak(0)
    setTotalDays(0)
    setLastDate("")
    setHistory([])
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f0f4f8",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center",
        width: "100%",
        maxWidth: "450px"
      }}>
        <h1 style={{ marginBottom: "10px" }}>📚 StudyPulse</h1>
        <h2 style={{ marginBottom: "5px", color: "#ff5722" }}>🔥 Current Streak: {streak} days</h2>
        <p style={{ margin: "5px 0" }}>Total Study Days: {totalDays}</p>
        <p style={{ margin: "5px 0" }}>Last Studied: {lastDate || "Not yet"}</p>

        <div style={{ margin: "20px 0" }}>
          <button
            onClick={markToday}
            style={{
              background: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              margin: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            I Studied Today
          </button>

          <button
            onClick={resetStreak}
            style={{
              background: "#f44336",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              margin: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Reset Streak
          </button>
        </div>

        <h3 style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>Study History</h3>
        {history.length === 0 ? (
          <p>No study history yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, maxHeight: "200px", overflowY: "auto" }}>
            {history.map((day, index) => (
              <li key={index} style={{
                background: "#f9f9f9",
                margin: "5px 0",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #eee"
              }}>
                📅 {day}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
