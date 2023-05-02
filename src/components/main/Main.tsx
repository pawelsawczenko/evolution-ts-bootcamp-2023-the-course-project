import React from "react";
// import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { gwentStore } from "../../stores/GameStore";
import { Suit } from "../board/Suit";

import "./main.css";

export const Main: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
    gwentStore.startTheGame();
    navigate("coin", { replace: false });
  };

  const toGameRules = () => {
    navigate("rules", { replace: false });
  };

  return (
    <div id="main">
      <h1>Gwent-based Card Game</h1>
      <div className="main-buttons">
        <Suit suit="Diamonds" rank="2" />
        <Suit suit="Hearts" rank="2" />
        <button className="btn btn-main" onClick={startGame}>
          Start Game
        </button>
        <Suit suit="Spades" rank="2" />
        <Suit suit="Clubs" rank="2" />
      </div>

      <div className="main-buttons">
        <button className="btn btn-main" onClick={toGameRules}>
          The Rules
        </button>
      </div>
    </div>
  );
};
