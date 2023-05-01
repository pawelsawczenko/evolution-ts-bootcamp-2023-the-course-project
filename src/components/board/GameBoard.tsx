import React from "react";
import { useNavigate } from "react-router-dom";
// import { OpponentSideObserver } from "./opponent/Opponent";
import { OpponentStatsObserver } from "./opponent/OpponentStats";
// import { PlayerSideObserver } from "./player/Player";
import { PlayerStatsAndInputObserver } from "./player/PlayerStatsAndInput";
import { BoardSideObserver } from "./BoardSide";

import "./gameboard.css";
import { gwentStore } from "../../stores/GameStore";
import { PopUpContainerObserver } from "./pop-ups/PopUpContainer";

export const GameBoard: React.FC = () => {
  const navigate = useNavigate();

  //
  React.useEffect(() => {
    if (gwentStore.currentRound === 0) {
      navigate("/", { replace: false });
    }
  });

  return (
    <>
      <div id="gameboard-container">
        <div className="gameboard">
          {/* <OpponentStatsObserver></OpponentStatsObserver>
        <OpponentSideObserver></OpponentSideObserver>

        <PlayerStatsAndInputObserver></PlayerStatsAndInputObserver>
        <PlayerSideObserver></PlayerSideObserver> */}
          <OpponentStatsObserver></OpponentStatsObserver>
          <BoardSideObserver whoseSide="opponent"></BoardSideObserver>
          <PlayerStatsAndInputObserver></PlayerStatsAndInputObserver>
          <BoardSideObserver whoseSide="player"></BoardSideObserver>
        </div>
      </div>
      <PopUpContainerObserver></PopUpContainerObserver>
    </>
  );
};
