import React from "react";
import { observer } from "mobx-react";
import { CardData } from "../../../types";

import "../row.css";
import { RowComponent } from "../Row";

import { gwentStore } from "../../../stores/GameStore";
import { OpponentHandObserver } from "./OpponentHand";

const OpponentSide: React.FC = () => {
  const nearRow: CardData[] = gwentStore.gameBoard.opponent.nearRow.rowItems;
  const nearRowScore: number = gwentStore.gameBoard.opponent.nearRow.score;

  const farRow: CardData[] = gwentStore.gameBoard.opponent.farRow.rowItems;
  const farRowScore: number = gwentStore.gameBoard.opponent.farRow.score;

  return (
    <div className="opponent-side">
      <OpponentHandObserver></OpponentHandObserver>
      <RowComponent rowItems={nearRow} score={nearRowScore}></RowComponent>
      <RowComponent rowItems={farRow} score={farRowScore}></RowComponent>
    </div>
  );
};

export const OpponentSideObserver = observer(OpponentSide);
