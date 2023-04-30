import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";

const PlayerStatsAndInput: React.FC = () => {
  const navigate = useNavigate();
  const { roundScore, roundsWon } = gwentStore.gameBoard.player;
  // const currentScore = gwentStore.gameBoard.player.roundScore;
  // const roundsWon = gwentStore.gameBoard.player.roundsWon;
  const isPlayerPass = gwentStore.isPlayerPass ? "passes" : "is playing";

  // const currentlyChosenCard = gwentStore.cardToPlay;
  // TODO: all on click (useCallback, useMemo)?
  const onPassClick = React.useCallback(() => {
    gwentStore.setIsPlayerPass();
  }, []);

  const onQuitClick = React.useCallback(() => {
    gwentStore.resetTheGame();
    navigate("/", { replace: false });
  }, [navigate]);

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
        <div> --- Player {isPlayerPass} </div>
        <button className="btn btn-main" onClick={onPassClick}>
          Pass
        </button>
      </div>
      <div>
        <button className="btn btn-quit" onClick={onQuitClick}>
          Quit
        </button>
      </div>
    </div>
  );
};

export const PlayerStatsAndInputObserver = observer(PlayerStatsAndInput);
