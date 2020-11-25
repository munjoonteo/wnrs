import React from "react";
import Card from "./Card";
import "./App.css";

function App() {
  const [currLevel, setLevel] = React.useState("one");
  const levels = ["one", "two", "three"];
  const buttons = levels.map(level => (
    <button
      className={`level-button ${level === currLevel ? "selected-level" : ""}`}
      onClick={() => setLevel(level)}
    >
      level {level}
    </button>
  ));

  // const bigCardClasses = classNames({
  //   "big-card": true,
  //   card: true,
  // });

  return (
    <div className="App">
      <div className="levels">{buttons}</div>
      <div className="question">
        <div className="title">we're not really strangers</div>
        <Card styleName="big-card" />
        <button className="next-card-button">next card</button>
      </div>
      <div className="history">
        <div className="history-title">previous cards</div>
        <div className="card-container">
          <div className="card-container-scroll">
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
            <Card styleName="small-card" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
