import { CardData } from "../../../types";
import { Suit } from "../Suit";
import React from "react";

export const OpponentHandCell: React.FC<CardData> = (props: CardData) => {
  // TODO: change to BackDesign when game is ready
  if (props.card === undefined) {
    return <div id={`cell-${props.x}-${props.y}`} className="empty-cell"></div>;
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
