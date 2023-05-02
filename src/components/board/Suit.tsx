import { Card } from "../../types";

import Hearts from "../../assets/Hearts.svg";
import Diamonds from "../../assets/Diamonds.svg";
import Clubs from "../../assets/Clubs.svg";
import Spades from "../../assets/Spades.svg";
import JokerRed from "../../assets/JokerRed.svg";
import JokerBlack from "../../assets/JokerBlack.svg";

const MAP = {
  Spades: {
    src: Spades,
    alt: "suit spades",
    className: "suit suit suit-center",
  },
  Hearts: {
    src: Hearts,
    alt: "suit hearts",
    className: "suit suit-center",
  },
  Clubs: {
    src: Clubs,
    alt: "suit clubs",
    className: "suit suit-center",
  },
  Diamonds: {
    src: Diamonds,
    alt: "suit diamonds",
    className: "suit suit-center",
  },
  JokerRed: {
    src: JokerRed,
    alt: "suit joker red",
    className: "joker suit-center",
  },
  JokerBlack: {
    src: JokerBlack,
    alt: "suit joker black",
    className: "joker suit-center",
  },
};

export const Suit: React.FC<Card> = ({ suit }) => {
  const { src, alt, className } = MAP[suit];

  return (
    <>
      {/* <img className="suit-before" src={src} alt={alt} /> */}
      <img className={className} src={src} alt={alt} />
      {/* <img className="suit-after" src={src} alt={alt} /> */}
    </>
  );
};
