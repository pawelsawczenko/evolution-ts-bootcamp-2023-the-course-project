import React from "react";
import { useNavigate } from "react-router-dom";

import "./gamerules.css";
import { Suit } from "../board/Suit";

export const GameRules: React.FC = () => {
  const navigate = useNavigate();

  const backToMainPage = () => {
    navigate("/", { replace: false });
  };
  return (
    <div>
      {/* TODO: change when rules component will be implemented */}
      <div className="rules">
        <p>
          Greater score wins the round. Whoever wins 2 rounds wins the game.
        </p>
        <p>Score:</p>
        <p>
          Two cards with the same{" "}
          <span className="card-combination"> rank </span> next to each other
          give <span className="score-bust"> +2 </span>to row score.
        </p>

        <p>
          <span className="card-combination-name">Royal Flush:</span> the
          sequence<span className="card-combination"> '10 J Q K A'</span> gives
          <span className="score-bust"> +7 </span>to the row score. Cards can be
          of any suits.
        </p>

        <p>
          <span className="card-combination-name">Straight: </span>the sequence
          <span className="card-combination"> '6 7 8 9 10'</span> gives{" "}
          <span className="score-bust"> +5 </span>to the row score. Cards can be
          of any suits.
        </p>

        <p>
          <span className="card-combination-name">Baby Straight:</span> the
          sequence<span className="card-combination"> 'A 2 3 4 5'</span> gives
          <span className="score-bust"> +3 </span>to the row score. Cards can be
          of any suits.
        </p>

        <p>Cards with perks:</p>
        <p>
          <span className="card-combination-name">Joker</span> can only be
          placed on the opponent's side. It will add{" "}
          <span className="score-bust"> +10 </span>to the opponent's score, but
          will give you <span className="score-bust"> 2 random cards </span>{" "}
          from the dealer if available.
        </p>
      </div>
      <div id="main">
        <Suit suit="Diamonds" rank="2" />
        <Suit suit="Hearts" rank="2" />
        <button className="btn btn-main" onClick={backToMainPage}>
          Back to main page
        </button>
        <Suit suit="Spades" rank="2" />
        <Suit suit="Clubs" rank="2" />
      </div>
    </div>
  );
};
