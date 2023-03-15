import "./App.css";

import React from "react";

import { levelOne, levelThree, levelTwo } from "./assets/levels";
import Card from "./components/card/Card";

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function App() {
  const levels = {
    levelOne: shuffle(levelOne),
    levelTwo: shuffle(levelTwo),
    levelThree: shuffle(levelThree),
  };

  const [gameState] = React.useState(levels);
  const [currLevel, setLevel] = React.useState(Object.keys(levels)[0] as keyof typeof levels);
  const [currCard, setCurrCard] = React.useState(levels[currLevel][0]);
  const [cardHistory, setCardHistory] = React.useState<string[]>([]);

  type levelKey = keyof typeof levels;

  function handleChangeLevel(newLevel: levelKey) {
    setLevel(newLevel);
    if (gameState[newLevel].length === 1) {
      const finalMessage = "You have finished this level!";
      setCurrCard(finalMessage);
    } else {
      setCurrCard(gameState[newLevel][0]);
    }
  }

  const buttons = (Object.keys(levels) as levelKey[]).map((level) => (
    <button
      className={`level-button ${level === currLevel ? "selected-level" : ""}`}
      onClick={() => handleChangeLevel(level)}
      key={level}
    >
      {level.split(/(?=[A-Z])/).join(" ")}
    </button>
  ));

  function handleNextCard() {
    const finalMessage = "You have finished this level!";
    if (gameState[currLevel].length === 1) {
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
      gameState[currLevel].shift();
      setCurrCard(gameState[currLevel][0]);
    }
  }

  return (
    <div className="App">
      <div className="credits">
        <div className="credits-title">how & who</div>
        <div className="cont">
          <b>How to play:</b> <br />
          Progress from level to level. Become more than strangers, one card at a time.
          <p>Refresh to reset card decks.</p>{" "}
          <p>
            Made by <a href="https://github.com/munjoonteo">@munjoonteo</a> and{" "}
            <a href="https://github.com/ilyues">@ilyues</a>.
          </p>
        </div>
      </div>
      <div className="levels">{buttons}</div>
      <div className="question">
        <div className="title">wnrs</div>
        <Card styleName="big-card" question={currCard} />
        <button className="next-card-button" onClick={() => handleNextCard()}>
          next card
        </button>
      </div>
      <div className="history">
        <div className="history-title">previous cards</div>
        <div className="card-container">
          <div className="card-container-scroll">
            {cardHistory.map((qn) => (
              <Card styleName="small-card" question={qn} key={qn} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
