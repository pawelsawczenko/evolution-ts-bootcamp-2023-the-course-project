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
    // TODO: ADD TO STORE
    gwentStore.currentRound = 1;
    gwentStore.setIsPlayerMoveFirst();
    gwentStore.setInitialDealersCards();
    gwentStore.drawCardsFromDealer(10);
    gwentStore.opponentPairs = gwentStore.returnOpponentPairs();
    //
    navigate("game", { replace: false });
  };
  return (
    <div>
      <div id="main">
        <img className="suit" src={Diamonds} alt={`suit Diamonds`} />
        <img className="suit" src={Hearts} alt={`suit Hearts`} />
        <button onClick={startGame}>Start Game</button>
        <img className="suit" src={Spades} alt={`suit Spades`} />
        <img className="suit" src={Clubs} alt={`suit Clubs`} />
      </div>
      {/* TODO: change when rules component will be implemented */}
      <div className="rules-testing">
        <p>
          Greater score wins the round. Whoever wins 2 rounds wins the game.
        </p>
        <p>Score:</p>
        <p>Two cards with the same next to each other give +2 to row score.</p>
        <p>Royal Flush - 10 J Q K A of any suit - give +7 to row score.</p>
        <p>Straight - 6 7 8 9 10 of any suit - give +5 to row score.</p>
        <p>Baby Straight - A 2 3 4 5 of any suit - give +3 to row score.</p>
        <p>Cards with perks:</p>
        <p>
          Joker can be placed only on the side of the opponent. It will add +10
          to opponent score, but give you 2 random cards from dealer if he has
          any.
        </p>
      </div>
    </div>
  );
};
