import React from "react";
import { OpponentSideObserver } from "./opponent/Opponent";
import { OpponentStatsObserver } from "./opponent/OpponentStats";
import { PlayerSideObserver } from "./player/Player";
import { PlayerStatsAndInputObserver } from "./player/PlayerStatsAndInput";

import "./gameboard.css";

export const GameBoard: React.FC = () => {
  return (
    <div className="gameboard">
      <OpponentStatsObserver></OpponentStatsObserver>
      <OpponentSideObserver></OpponentSideObserver>

      <PlayerStatsAndInputObserver></PlayerStatsAndInputObserver>
      <PlayerSideObserver></PlayerSideObserver>
    </div>
  );
};
