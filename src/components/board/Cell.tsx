import { CardData } from "../../types";
import { Suit } from "./Suit";
import { gwentStore } from "../../stores/GameStore";
import React from "react";

export const Cell: React.FC<CardData> = (props: CardData) => {
  const onCellClick = () => {
    gwentStore.moveCard(props);
  };

  if (props.card === undefined) {
    return (
      <div
        id={`cell-${props.x}-${props.y}`}
        className="empty-cell"
        onClick={onCellClick}
      ></div>
    );
  } else {
    return (
      <div
        id={`cell-${props.x}-${props.y}`}
        className={`card ${props.card.suit}`}
      >
        <span className="rank rank-before">{props.card.rank}</span>
        <Suit suit={props.card.suit} rank={props.card.rank}></Suit>
        <span className="rank rank-after">{props.card.rank}</span>
      </div>
    );
  }
};
