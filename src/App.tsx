import clsx from "clsx";
import React from "react";

import { levelOne, levelThree, levelTwo } from "./assets/levels";
import Card from "./components/card/Card";
import { bigCardStyles, smallCardStyles } from "./components/card/Card.css";
import {
  appStyles,
  cardContainerScrollStyles,
  cardContainerStyles,
  historyStyles,
  historyTitleStyles,
  levelButtonStlyes,
  levelsStyles,
  nextCardButtonStlyes,
  questionStyles,
  selectedLevelStyles,
  titleStyles,
} from "./styles/app.css";
import { contStyles, creditStyles, creditTitleStyles } from "./styles/credits.css";

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
      className={clsx(levelButtonStlyes, { [selectedLevelStyles]: level === currLevel })}
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
    <div className={appStyles}>
      <div className={creditStyles}>
        <div className={creditTitleStyles}>how & who</div>
        <div className={contStyles}>
          <b>How to play:</b> <br />
          Progress from level to level. Become more than strangers, one card at a time.
          <p>Refresh to reset card decks.</p>{" "}
          <p>
            Made by <a href="https://github.com/munjoonteo">@munjoonteo</a> and{" "}
            <a href="https://github.com/ilyues">@ilyues</a>.
          </p>
        </div>
      </div>
      <div className={levelsStyles}>{buttons}</div>
      <div className={questionStyles}>
        <div className={titleStyles}>wnrs</div>
        <Card styleName={bigCardStyles} question={currCard} />
        <button className={nextCardButtonStlyes} onClick={() => handleNextCard()}>
          next card
        </button>
      </div>
      <div className={historyStyles}>
        <div className={historyTitleStyles}>previous cards</div>
        <div className={cardContainerStyles}>
          <div className={cardContainerScrollStyles}>
            {cardHistory.map((qn) => (
              <Card styleName={smallCardStyles} question={qn} key={qn} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
