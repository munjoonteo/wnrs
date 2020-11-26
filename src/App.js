import React from "react";
import Card from "./Card";
import "./App.css";

function App() {
  let levels = {
    levelOne: ["q1", "hi"],
    levelTwo: ["q2", "sad"],
    levelThree: ["q3"],
  };

  const [gameState] = React.useState(levels);
  const [currLevel, setLevel] = React.useState(Object.keys(levels)[0]);
  const [currCard, setCurrCard] = React.useState(levels[currLevel].shift());
  const [cardHistory, setCardHistory] = React.useState([]);

  const buttons = Object.keys(levels).map(level => (
    <button
      className={`level-button ${level === currLevel ? "selected-level" : ""}`}
      onClick={() => handleChangeLevel(level)}
      key={level}
    >
      {level.split(/(?=[A-Z])/).join(" ")}
    </button>
  ));

  function handleChangeLevel(newLevel) {
    setLevel(newLevel);
    if (gameState[newLevel].length === 0) {
      const finalMessage = "You have finished this level!";
      setCurrCard(finalMessage);
    } else {
      setCurrCard(gameState[newLevel].shift());
    }
  }

  function handleNextCard() {
    const finalMessage = "You have finished this level!";
    if (gameState[currLevel].length === 0) {
      if (currCard === finalMessage) {
        return;
      } else {
        const tempHistory = [currCard, ...cardHistory];
        setCardHistory(tempHistory);
        setCurrCard(finalMessage);
      }
    } else {
      const tempHistory = [currCard, ...cardHistory];
      setCardHistory(tempHistory);
      setCurrCard(gameState[currLevel].shift());
    }
  }

  return (
    <div className="App">
      <div className="levels">{buttons}</div>
      <div className="question">
        <div className="title">we're not really strangers</div>
        <Card styleName="big-card" question={currCard} />
        <button className="next-card-button" onClick={() => handleNextCard()}>
          next card
        </button>
      </div>
      <div className="history">
        <div className="history-title">previous cards</div>
        <div className="card-container">
          <div className="card-container-scroll">
            {cardHistory.map(qn => (
              <Card styleName="small-card" question={qn} key={qn} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
