import { clsx } from "clsx";

import { cardStyles } from "./Card.css";

interface CardProps {
  styleName: string;
  question: string;
}

function Card(props: CardProps) {
  return <div className={clsx(cardStyles, props.styleName)}>{props.question}</div>;
}

export default Card;
