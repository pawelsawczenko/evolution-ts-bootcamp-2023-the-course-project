import React from "react";

import { gwentStore } from "../../../stores/GameStore";
import { useNavigate } from "react-router-dom";

import "../gameboard.css";

export const PlayerInput: React.FC = () => {
  const navigate = useNavigate();
  const onPassClick = React.useCallback(() => {
    gwentStore.setIsPlayerPass();
  }, []);

  const onQuitClick = React.useCallback(() => {
    gwentStore.resetTheGame();
    navigate("/", { replace: false });
  }, [navigate]);
  return (
    <div className="player-inputs">
      <button className="btn btn-main" onClick={onPassClick}>
        Pass
      </button>
      <button className="btn btn-quit" onClick={onQuitClick}>
        Quit
      </button>
    </div>
  );
};
