import { Card } from "../../types";

import Hearts from "../../assets/Hearts.svg";
import Diamonds from "../../assets/Diamonds.svg";
import Clubs from "../../assets/Clubs.svg";
import Spades from "../../assets/Spades.svg";

const MAP = {
  Spades: {
    src: Spades,
    alt: "suit Spades",
  },
  Hearts: {
    src: Hearts,
    alt: "suit Hearts",
  },
  Clubs: {
    src: Clubs,
    alt: "suit Clubs",
  },
  Diamonds: {
    src: Diamonds,
    alt: "suit Diamonds",
  },
};

export const Suit: React.FC<Card> = ({ suit }) => {
  const { src, alt } = MAP[suit];

  return (
    <>
      <img className="suit-before" src={src} alt={alt} />
      <img className="suit suit-center" src={src} alt={alt} />
      <img className="suit-after" src={src} alt={alt} />
    </>
  );
};
