import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../../stores/GameStore";

const PlayerStatsAndInput: React.FC = () => {
  const currentScore = gwentStore.gameBoard.player.roundScore;
  const roundsWon = gwentStore.gameBoard.player.roundsWon;

  return (
    <div className="statistic player-statistic">
      {/* whose turn it is  */}

      {/* players name */}
      <h2>Player</h2>
      {/* how many rounds have been won */}
      <div className="rounds-score">
        <span>rounds won: </span>
        <span>{roundsWon}</span>
      </div>
      {/* current player's score */}
      <div className="current-score">
        <span>current score : </span>
        <span>{currentScore}</span>
      </div>

      <div>
        <button>pass</button>
      </div>
    </div>
  );
};

export const PlayerStatsAndInputObserver = observer(PlayerStatsAndInput);
