import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../../stores/GameStore";

const PlayerStatsAndInput: React.FC = () => {
  const { roundScore, roundsWon } = gwentStore.gameBoard.player;
  // const currentScore = gwentStore.gameBoard.player.roundScore;
  // const roundsWon = gwentStore.gameBoard.player.roundsWon;
  const isPlayerPass = gwentStore.isPlayerPass ? "passes" : "is playing";

  // const currentlyChosenCard = gwentStore.cardToPlay;
  // TODO: all on click (useCallback, useMemo)?
  const onClick = React.useCallback(() => {
    gwentStore.setIsPlayerPass();
  }, []);

  return (
    <div className="stats player-statistic">
      {/* whose turn it is  */}

      {/* player's name */}
      <h2>Player</h2>
      {/* how many rounds have been won */}
      <div className="rounds-score">
        <span>rounds won: </span>
        <span>{roundsWon}</span>
      </div>
      {/* current player's score */}
      <div className="current-score">
        <span>round score : </span>
        <span>{roundScore}</span>
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
