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
    gwentStore.startTheGame();
    // navigate("game", { replace: false });
    navigate("coin", { replace: false });
  };

  const toGameRules = () => {
    navigate("rules", { replace: false });
  };
  // const toCoin = () => {
  //   navigate("coin", { replace: false });
  // };
  return (
    <div>
      <div id="main">
        <img className="suit" src={Diamonds} alt={`suit Diamonds`} />
        <img className="suit" src={Hearts} alt={`suit Hearts`} />
        <button className="btn btn-main" onClick={startGame}>
          Start Game
        </button>
        <img className="suit" src={Spades} alt={`suit Spades`} />
        <img className="suit" src={Clubs} alt={`suit Clubs`} />
      </div>
      {/* TODO: change when rules component will be implemented */}

      <div className="rules-button">
        {/* <button onClick={toCoin}>toCoin</button> */}
        <button className="btn btn-main" onClick={toGameRules}>
          Game Rules
        </button>
      </div>
    </div>
  );
};
