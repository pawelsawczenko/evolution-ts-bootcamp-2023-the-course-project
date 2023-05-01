import React from "react";
import { observer } from "mobx-react";
import { CardData } from "../../types";

import "./row.css";
import { RowComponent } from "./Row";

import { gwentStore } from "../../stores/GameStore";
import { HandObserver } from "./Hand";

export interface BoardSideProps {
  whoseSide: "player" | "opponent";
}

const BoardSide: React.FC<BoardSideProps> = ({ whoseSide }) => {
  const farRow: CardData[] = gwentStore.gameBoard[whoseSide].farRow.rowItems;
  const farRowScore: number = gwentStore.gameBoard[whoseSide].farRow.score;

  const nearRow: CardData[] = gwentStore.gameBoard[whoseSide].nearRow.rowItems;
  const nearRowScore: number = gwentStore.gameBoard[whoseSide].nearRow.score;

  return whoseSide === "player" ? (
    <div className="player-side">
      <RowComponent rowItems={farRow} score={farRowScore}></RowComponent>
      <RowComponent rowItems={nearRow} score={nearRowScore}></RowComponent>
      <HandObserver whoseSide={whoseSide}></HandObserver>
    </div>
  ) : (
    <div className="opponent-side">
      <HandObserver whoseSide={whoseSide}></HandObserver>
      <RowComponent rowItems={nearRow} score={nearRowScore}></RowComponent>
      <RowComponent rowItems={farRow} score={farRowScore}></RowComponent>
    </div>
  );
};

export const BoardSideObserver = observer(BoardSide);
