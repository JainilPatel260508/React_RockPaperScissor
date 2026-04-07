import React, { useState, useEffect } from "react";
import "./App.css";

const choices = ["rock", "paper", "scissors"];

export default function App() {
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [userChoice, setUserChoice] = useState("❔");
  const [compChoice, setCompChoice] = useState("❔");
  const [result, setResult] = useState("");
  const [totalMoves, setTotalMoves] = useState(0);
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);
  const [finalWinner, setFinalWinner] = useState("");

  const getEmoji = (c) => {
    if (c === "rock") return "🪨";
    if (c === "paper") return "📄";
    if (c === "scissors") return "✂️";
    return "❔";
  };

  useEffect(() => {
    if (totalMoves === 0) return;

    if (userScore === compScore) {
      setFinalWinner("Draw");
    } else if (userScore > compScore) {
      setFinalWinner("You");
    } else {
      setFinalWinner("Computer");
    }
  }, [userScore, compScore, totalMoves]);

  const play = (user) => {
    setTotalMoves((prev) => prev + 1);

    const comp = choices[Math.floor(Math.random() * 3)];

    const userEmoji = getEmoji(user);
    const compEmoji = getEmoji(comp);

    setUserChoice(userEmoji);
    setCompChoice(compEmoji);

    let roundResult = "";

    if (user === comp) {
      roundResult = "Draw";
      setResult("Draw");
      setStreak((prev) => prev); // no change
    } else if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) {
      roundResult = "You Win";
      setUserScore((prev) => prev + 1);
      setResult("You Win");
      setStreak((prev) => prev + 1);
    } else {
      roundResult = "Computer Wins";
      setCompScore((prev) => prev + 1);
      setResult("Computer Wins");
      setStreak(0);
    }

    setHistory((prev) => [
      ...prev,
      {
        user: userEmoji,
        computer: compEmoji,
        result: roundResult,
      },
    ]);
  };

  const handleReset = () => {
    setUserScore(0);
    setCompScore(0);
    setTotalMoves(0);
    setResult("");
    setUserChoice("❔");
    setCompChoice("❔");
    setFinalWinner("");
    setStreak(0);
    setHistory([]);
  };

  return (
    <div className="container">
      <h1>Rock Paper Scissors</h1>
      <h2>Computer : You</h2>

      <div className="icons">
        <span>{compChoice} : </span>
        <span>{userChoice}</span>
      </div>

      <h3>
        Score - {compScore} : {userScore} | Total Moves: {totalMoves}
      </h3>

      <p>{result}</p>

      <div className="buttons">
        <button onClick={() => play("rock")}>🪨</button>
        <button onClick={() => play("paper")}>📄</button>
        <button onClick={() => play("scissors")}>✂️</button>
        <br />
        <button onClick={handleReset}>Reset</button>
      </div>

      {streak > 0 && (
        <div className="streak">
          <h3>🔥 Streak: {streak}</h3>
        </div>
      )}

      {finalWinner && totalMoves > 0 && (
        <div className="final-result">
          <h2>Final Winner: {finalWinner}</h2>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h3>History</h3>
          <ul>
            {history.map((item, index) => (
              <p style={{ color: item.result === "You Win" ? "green" : item.result === "Computer Wins" ? "red" : "black" }} key={index}>
                {item.computer} vs {item.user} → {item.result}
              </p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}