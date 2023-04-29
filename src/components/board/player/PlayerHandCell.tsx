import { CardData } from "../../../types";
import { gwentStore } from "../../../stores/GameStore";
import React from "react";
import { CardFront } from "../Cell";

export const PlayerHandCell: React.FC<CardData> = ({ id, card, x, y }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  let selected =
    isClicked && gwentStore.cardToPlay?.id === id && !gwentStore.isPlayerPass
      ? "card-selected"
      : "";

  const onCellClick = React.useCallback(() => {
    if (!gwentStore.isPlayerPass) {
      gwentStore.setCardToPlay({ id, card, x, y });
      if (gwentStore.cardToPlay?.id === id) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }
  }, [card, id, x, y]);

  React.useEffect(() => {
    if (card === undefined) {
      setIsClicked(false);
    }
  }, [card]);

  if (card === undefined) {
    return <div id={`cell-${x}-${y}`} className="empty-cell"></div>;
  } else {
    return (
      <div
        id={`cell-${x}-${y}`}
        className={`card ${card.suit} ${selected}`}
        onClick={onCellClick}
      >
        {/* <span className="rank rank-before">{card.rank}</span>
        <Suit suit={card.suit} rank={card.rank}></Suit>
        <span className="rank rank-after">{card.rank}</span> */}
        <CardFront rank={card.rank} suit={card.suit} />
      </div>
    );
  }
};
