import { CardData } from "../../../types";
// import { Suit } from "../Suit";
import React from "react";
import { BackDesignComponent } from "../Cell";

export const OpponentHandCell: React.FC<CardData> = ({ id, card, x, y }) => {
  // TODO: change to BackDesign when game is ready
  if (card === undefined) {
    return <div id={`cell-${x}-${y}`} className="empty-cell"></div>;
  } else {
    return (
      <div id={`cell-${x}-${y}`} className={`card ${card.suit}`}>
        {/* <span className="rank rank-before">{card.rank}</span>
        <Suit suit={card.suit} rank={card.rank}></Suit>
        <span className="rank rank-after">{card.rank}</span> */}
        <div className="card-back">
          <BackDesignComponent />
        </div>
      </div>
    );
  }
};
