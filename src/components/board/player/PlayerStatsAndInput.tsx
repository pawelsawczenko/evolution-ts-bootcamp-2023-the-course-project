import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../../stores/GameStore";

const PlayerStatsAndInput: React.FC = () => {
  const currentScore = gwentStore.gameBoard.player.roundScore;
  const roundsWon = gwentStore.gameBoard.player.roundsWon;
  const isPlayerPass = gwentStore.isPlayerPass ? "passes" : "is playing";

  // const currentlyChosenCard = gwentStore.cardToPlay;

  const onClick = () => {
    gwentStore.setIsPlayerPass();
    // TODO: change when opponents logic will be implemented
    gwentStore.setIsRoundWon();
  };

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
        <span> --- Player {isPlayerPass} </span>
        <button onClick={onClick}>pass</button>
      </div>
      {/* card that currently chosen special ability */}
      <div></div>
    </div>
  );
};

export const PlayerStatsAndInputObserver = observer(PlayerStatsAndInput);
