import "./Card.css";

interface CardProps {
  styleName: string;
  question: string;
}

function Card(props: CardProps) {
  return <div className={`card ${props.styleName}`}>{props.question}</div>;
}

export default Card;
