import clsx from "clsx";
import React from "react";

import { finalLevel, levelOne, levelThree, levelTwo } from "./assets/levels";
import Card from "./components/card/Card";
import { bigCardStyles } from "./components/card/Card.css";
import Credits from "./components/credits/Credits";
import CardHistory from "./components/history/CardHistory";
import {
  appStyles,
  levelButtonStyles,
  levelsStyles,
  nextCardButtonStlyes,
  questionStyles,
  selectedLevelStyles,
  titleStyles,
} from "./styles/app.css";
import Settings from "./components/settings/Settings";

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
    finalLevel: finalLevel
  };

  const [gameState, setGameState] = React.useState(levels);
  const [currLevel, setLevel] = React.useState(Object.keys(levels)[0] as keyof typeof levels);
  const [currCard, setCurrCard] = React.useState(levels[currLevel][0]);
  const [cardHistory, setCardHistory] = React.useState<string[]>([]);

  type levelKey = keyof typeof levels;

  function handleChangeLevel(newLevel: levelKey) {
    setLevel(newLevel);
    if (gameState[newLevel].length === 1 && newLevel === 'finalLevel') {
      // For the final level, show "Hello, World!" followed by the final message
      setCurrCard(finalLevel[0]);
    } else {
      setCurrCard(gameState[newLevel][0]);
    }
  }
  
  const buttons = (Object.keys(levels) as levelKey[]).map((level) => (
    <button
      className={clsx(levelButtonStyles, { [selectedLevelStyles]: level === currLevel })}
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
    } else if (currLevel === 'finalLevel') {
      // When clicking "next card" on the final level, show the final message
      setCurrCard(finalMessage);
      setCardHistory([...cardHistory, finalLevel[0]]);
    } else {
      const tempHistory = [currCard, ...cardHistory];
      setCardHistory(tempHistory);
      gameState[currLevel].shift();
      setCurrCard(gameState[currLevel][0]);
    }
  }
  

  const [numCardsPerLevel, setNumCardsPerLevel] = React.useState<number>(1);
  function handleLevelsChange(newLevels: number) {
    // Handle the newLevels emitted from the Settings component
    console.log('Rounds per level set:', newLevels);

    // Update the number of cards per level
    setNumCardsPerLevel(newLevels);

    // Shuffle and update the cards for each level
    const updatedLevels = {
      levelOne: shuffle(levelOne).slice(0, newLevels), 
      levelTwo: shuffle(levelTwo).slice(0, newLevels),
      levelThree: shuffle(levelThree).slice(0, newLevels),
      finalLevel: finalLevel
    };
    console.log("updatedLevels",updatedLevels)

    // Update the game state with the new levels
    setGameState(updatedLevels);

    // If the current level exceeds the new number of cards, reset it
    if (updatedLevels[currLevel].length === 0) {
      handleChangeLevel(currLevel);
    }
  }

  return (
    <div className={appStyles}>
      <Credits />
      <div className={levelsStyles}>{buttons}</div>
      <div className={questionStyles}>
        <div className={titleStyles}>wnrs</div>
        <Settings onLevelsChange={handleLevelsChange}/>
        <Card styleName={bigCardStyles} question={currCard} />
        <button className={nextCardButtonStlyes} onClick={() => handleNextCard()}>
          next card
        </button>
      </div>
      <CardHistory cardHistory={cardHistory} />
    </div>
  );
}

export default App;
