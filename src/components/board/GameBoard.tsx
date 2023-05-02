import React from "react";
import { useNavigate } from "react-router-dom";
import { PlayerInput } from "./player/PlayerInput";
import { BoardSideObserver } from "./BoardSide";

import "./gameboard.css";
import { gwentStore } from "../../stores/GameStore";
import { PopUpContainerObserver } from "./pop-ups/PopUpContainer";
import { StatsObserver } from "./Stats";

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
          <StatsObserver whoseSide="opponent"></StatsObserver>
          <BoardSideObserver whoseSide="opponent"></BoardSideObserver>
          <StatsObserver whoseSide="player">
            <PlayerInput />
          </StatsObserver>
          <BoardSideObserver whoseSide="player"></BoardSideObserver>
        </div>
      </div>
      <PopUpContainerObserver></PopUpContainerObserver>
    </>
  );
};
