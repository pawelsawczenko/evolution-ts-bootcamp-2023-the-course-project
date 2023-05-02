import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../stores/GameStore";
import { Chip } from "../coin-flip/CoinFlip";
import "./gameboard.css";

interface StatsProps {
  whoseSide: "opponent" | "player";
  children?: React.ReactNode;
}

const Stats: React.FC<StatsProps> = ({ whoseSide, children }) => {
  const { roundScore, roundsWon } = gwentStore.gameBoard[whoseSide];

  const name = whoseSide[0].toUpperCase() + whoseSide.slice(1);
  const isPass = (
    whoseSide === "opponent"
      ? gwentStore.isOpponentPass
      : gwentStore.isPlayerPass
  )
    ? "passes"
    : "is playing";

  return (
    <div className={`stats ${whoseSide}-stats`}>
      <h2>{name}</h2>
      <div className="rounds-score">
        <span>Rounds won: </span>
        <div className="rounds-won">
          {roundsWon === 0 ? (
            <>
              <div className="empty-chip"></div>
              <div className="empty-chip"></div>
            </>
          ) : roundsWon === 1 ? (
            <>
              <Chip whatChip="RedChip" />
              <div className="empty-chip"></div>
            </>
          ) : (
            <>
              <Chip whatChip="RedChip" />
              <Chip whatChip="RedChip" />
            </>
          )}
        </div>
      </div>
      {/* current score */}
      <div className="current-score">
        <span>Round score : </span>
        <span>{roundScore}</span>
      </div>

      <div className="isPass">
        <span>--- {isPass}</span>
      </div>
      {children}
    </div>
  );
};

export const StatsObserver = observer(Stats);
