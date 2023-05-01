import React from "react";
import { observer } from "mobx-react";

import { gwentStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";

import "../gameboard.css";
import RedChip from "../../../assets/RedChip.svg";

// TODO: refactor
const PlayerStatsAndInput: React.FC = () => {
  const navigate = useNavigate();
  const { roundScore, roundsWon } = gwentStore.gameBoard.player;
  const isPlayerPass = gwentStore.isPlayerPass ? "passes" : "is playing";

  // TODO: all on click (useCallback, useMemo)?
  const onPassClick = React.useCallback(() => {
    gwentStore.setIsPlayerPass();
  }, []);

  const onQuitClick = React.useCallback(() => {
    gwentStore.resetTheGame();
    navigate("/", { replace: false });
  }, [navigate]);

  return (
    <div className="stats player-stats">
      {/* player's name */}
      <h2>Player</h2>
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
      {/* current player's score */}
      <div className="current-score">
        <span>Round score : </span>
        <span>{roundScore}</span>
      </div>

      <div>
        <div> --- Player {isPlayerPass} </div>
      </div>
      <div className="player-inputs">
        <button className="btn btn-main" onClick={onPassClick}>
          Pass
        </button>
        <button className="btn btn-quit" onClick={onQuitClick}>
          Quit
        </button>
      </div>
    </div>
  );
};

export const PlayerStatsAndInputObserver = observer(PlayerStatsAndInput);
