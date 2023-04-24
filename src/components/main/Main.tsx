import React from "react";
// import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { gwentStore } from "../../stores/GameStore";

import "./main.css";
import Hearts from "../../assets/Hearts.svg";
import Diamonds from "../../assets/Diamonds.svg";
import Clubs from "../../assets/Clubs.svg";
import Spades from "../../assets/Spades.svg";

export const Main: React.FC = () => {
  const navigate = useNavigate();

  const startGame = () => {
    gwentStore.currentRound = 1;
    gwentStore.setInitialDealersCards();
    gwentStore.drawCardsFromDealer(10);
    navigate("game", { replace: false });
  };
  return (
    <div id="main">
      <img className="suit" src={Diamonds} alt={`suit Diamonds`} />
      <img className="suit" src={Hearts} alt={`suit Hearts`} />
      <button onClick={startGame}>Start Game</button>
      <img className="suit" src={Spades} alt={`suit Spades`} />
      <img className="suit" src={Clubs} alt={`suit Clubs`} />
    </div>
  );
};
