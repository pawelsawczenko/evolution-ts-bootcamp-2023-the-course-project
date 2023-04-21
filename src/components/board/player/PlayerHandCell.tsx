import { CardData } from "../../../types";
import { Suit } from "../Suit";
import { gwentStore } from "../../../stores/GameStore";
import React from "react";

export const PlayerHandCell: React.FC<CardData> = (props: CardData) => {
  const [isClicked, setIsClicked] = React.useState(false);
  let selected =
    isClicked &&
    gwentStore.cardToPlay?.id === props.id &&
    !gwentStore.isPlayerPass
      ? "card-selected"
      : "";

  const onCellClick = () => {
    if (!gwentStore.isPlayerPass) {
      gwentStore.setCardToPlay(props);
      if (gwentStore.cardToPlay?.id === props.id) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }
  };

  if (props.card === undefined) {
    return <div id={`cell-${props.x}-${props.y}`} className="empty-cell"></div>;
  } else {
    return (
      <div
        id={`cell-${props.x}-${props.y}`}
        className={`card ${props.card.suit} ${selected}`}
        onClick={onCellClick}
      >
        <span className="rank rank-before">{props.card.rank}</span>
        <Suit suit={props.card.suit} rank={props.card.rank}></Suit>
        <span className="rank rank-after">{props.card.rank}</span>
      </div>
    );
  }
};
