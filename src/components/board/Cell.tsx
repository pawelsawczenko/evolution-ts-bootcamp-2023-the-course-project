import { CardData } from "../../types";
import { Suit } from "./Suit";
import { gwentStore } from "../../stores/GameStore";
import React from "react";
import BackDesign from "../../assets/BackDesign.svg";

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
      <div className="card-wrapper">
        <div id={`cell-${x}-${y}`} className={`card ${card.suit}`}>
          <div className="card-front">
            <span className="rank rank-before">{card.rank}</span>
            <Suit suit={card.suit} rank={card.rank}></Suit>
            <span className="rank rank-after">{card.rank}</span>
          </div>
          <div className="card-back">
            <img src={BackDesign} alt="Back Design" />
          </div>
        </div>
      </div>
    );
  }
};
