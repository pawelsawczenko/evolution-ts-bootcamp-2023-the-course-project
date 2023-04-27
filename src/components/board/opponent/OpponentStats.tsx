import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../../stores/GameStore";

const OpponentStats: React.FC = () => {
  const { roundScore, roundsWon } = gwentStore.gameBoard.opponent;
  // const currentScore = gwentStore.gameBoard.opponent.roundScore;
  // const roundsWon = gwentStore.gameBoard.opponent.roundsWon;
  const isOpponentPass = gwentStore.isOpponentPass ? "passes" : "is playing";

  return (
    <div className="stats opponent-statistic">
      {/* whose turn it is  */}

      {/* opponent's name */}
      <h2>Opponent</h2>
      {/* how many rounds have been won */}
      <div className="rounds-score">
        <span>rounds won: </span>
        <span>{roundsWon}</span>
      </div>
      {/* current opponent's score */}
      <div className="current-score">
        <span>round score : </span>
        <span>{roundScore}</span>
      </div>

      <div>
        <span> --- Opponent {isOpponentPass} </span>
      </div>
    </div>
  );
};

export const OpponentStatsObserver = observer(OpponentStats);
