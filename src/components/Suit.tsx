import { Card } from "../types";

import Hearts from "../assets/Hearts.svg";
import Diamonds from "../assets/Diamonds.svg";
import Clubs from "../assets/Clubs.svg";
import Spades from "../assets/Spades.svg";

export const Suit: React.FC<Card> = (props: Card) => {
  return (
    <>
      {props.suit === "Spades" ? (
        <>
          <img
            className="suit-before"
            src={Spades}
            alt={`suit ${props.suit}`}
          />
          <img className="suit" src={Spades} alt={`suit ${props.suit}`} />
          <img className="suit-after" src={Spades} alt={`suit ${props.suit}`} />
        </>
      ) : props.suit === "Hearts" ? (
        <>
          <img
            className="suit-before"
            src={Hearts}
            alt={`suit ${props.suit}`}
          />
          <img className="suit" src={Hearts} alt={`suit ${props.suit}`} />
          <img className="suit-after" src={Hearts} alt={`suit ${props.suit}`} />
        </>
      ) : props.suit === "Clubs" ? (
        <>
          <img className="suit-before" src={Clubs} alt={`suit ${props.suit}`} />
          <img className="suit" src={Clubs} alt={`suit ${props.suit}`} />
          <img className="suit-after" src={Clubs} alt={`suit ${props.suit}`} />
        </>
      ) : (
        <>
          <img
            className="suit-before"
            src={Diamonds}
            alt={`suit ${props.suit}`}
          />
          <img className="suit" src={Diamonds} alt={`suit ${props.suit}`} />
          <img
            className="suit-after"
            src={Diamonds}
            alt={`suit ${props.suit}`}
          />
        </>
      )}
    </>
  );
};
