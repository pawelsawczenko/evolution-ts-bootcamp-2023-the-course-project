import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../../stores/GameStore";
import "../gameboard.css";
import RedChip from "../../../assets/RedChip.svg";

const OpponentStats: React.FC = () => {
  const { roundScore, roundsWon } = gwentStore.gameBoard.opponent;
  // const currentScore = gwentStore.gameBoard.opponent.roundScore;
  // const roundsWon = gwentStore.gameBoard.opponent.roundsWon;
  const isOpponentPass = gwentStore.isOpponentPass ? "passes" : "is playing";

  return (
    <div className="stats opponent-stats">
      <h2>Opponent</h2>
      {/* how many rounds have been won */}
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
              <img src={RedChip} alt="red chip" />
              <div className="empty-chip"></div>
            </>
          ) : (
            <>
              <img src={RedChip} alt="red chip" />
              <img src={RedChip} alt="red chip" />
            </>
          )}
        </div>
      </div>
      {/* current opponent's score */}
      <div className="current-score">
        <span>Round score : </span>
        <span>{roundScore}</span>
      </div>

      <div>
        <span> --- Opponent {isOpponentPass} </span>
      </div>
    </div>
  );
};

export const OpponentStatsObserver = observer(OpponentStats);
