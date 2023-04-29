import React from "react";
import { observer } from "mobx-react";
import { CardData } from "../../../types";

import "../row.css";
import { PlayerHandObserver } from "./PlayerHand";
import { RowComponent } from "../Row";

import { gwentStore } from "../../../stores/GameStore";

// TODO: refactoring. duplicated with opponent => merge to one
const PlayerSide: React.FC = () => {
  const farRow: CardData[] = gwentStore.gameBoard.player.farRow.rowItems;
  const farRowScore: number = gwentStore.gameBoard.player.farRow.score;

  const nearRow: CardData[] = gwentStore.gameBoard.player.nearRow.rowItems;
  const nearRowScore: number = gwentStore.gameBoard.player.nearRow.score;

  return (
    <div className="player-side">
      <RowComponent rowItems={farRow} score={farRowScore}></RowComponent>
      <RowComponent rowItems={nearRow} score={nearRowScore}></RowComponent>
      <PlayerHandObserver></PlayerHandObserver>
    </div>
  );
};

export const PlayerSideObserver = observer(PlayerSide);
