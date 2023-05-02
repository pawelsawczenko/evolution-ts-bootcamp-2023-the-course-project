import { CardData, Card } from "../../types";
import { Suit } from "./Suit";
import { gwentStore } from "../../stores/GameStore";
import React from "react";
import BackDesign from "../../assets/BackDesign.svg";

export const CardFront: React.FC<Card> = ({ rank, suit }) => {
  return (
    <div className="card-front">
      <span className="rank rank-before">{rank}</span>
      <Suit suit={suit} rank={rank}></Suit>
      <span className="rank rank-after">{rank}</span>
    </div>
  );
};

export const BackDesignComponent: React.FC = () => {
  return (
    <>
      <img src={BackDesign} alt="Back Design" />
    </>
  );
};

export const Cell: React.FC<CardData> = ({ id, card, x, y }) => {
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
          <CardFront rank={card.rank} suit={card.suit} />
          <div className="card-back">
            <BackDesignComponent />
          </div>
        </div>
      </div>
    );
  }
};
