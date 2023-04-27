import { CardData } from "../../types";
import { Suit } from "./Suit";
import { gwentStore } from "../../stores/GameStore";
import React from "react";

export const Cell: React.FC<CardData> = ({ id, card, x, y }) => {
  // TODO: all on click (useCallback, useMemo)?
  const onCellClick = React.useCallback(() => {
    gwentStore.moveCard({ id, card, x, y });
  }, [id, card, x, y]);

  if (card === undefined) {
    return (
      <div
        id={`cell-${x}-${y}`}
        className="empty-cell"
        onClick={onCellClick}
      ></div>
    );
  } else {
    return (
      <div id={`cell-${x}-${y}`} className={`card ${card.suit}`}>
        <span className="rank rank-before">{card.rank}</span>
        <Suit suit={card.suit} rank={card.rank}></Suit>
        <span className="rank rank-after">{card.rank}</span>
      </div>
    );
  }
};
