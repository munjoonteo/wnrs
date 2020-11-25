import React from "react";
import "./Card.css";

function Card(props) {
  return <div className={`card ${props.styleName}`}>{props.question}</div>;
}

export default Card;
