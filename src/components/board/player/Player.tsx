import React from "react";
import { observer } from "mobx-react";
import { CardData } from "../../../types";

import "../row.css";
import { PlayerHand } from "./PlayerHand";
import { RowComponent } from "../Row";

import { gwentStore } from "../../../stores/GameStore";

const PlayerSide: React.FC = () => {
  const farRow: CardData[] = gwentStore.gameBoard.player.farRow.rowItems;
  const farRowScore: number = gwentStore.gameBoard.player.farRow.score;

  const nearRow: CardData[] = gwentStore.gameBoard.player.nearRow.rowItems;
  const nearRowScore: number = gwentStore.gameBoard.player.nearRow.score;

  const hand: CardData[] = gwentStore.gameBoard.player.hand;

  return (
    <div className="player-side">
      <RowComponent rowItems={farRow} score={farRowScore}></RowComponent>
      <RowComponent rowItems={nearRow} score={nearRowScore}></RowComponent>
      <PlayerHand rowItems={hand} score={0}></PlayerHand>
    </div>
  );
};

export const PlayerSideObserver = observer(PlayerSide);
