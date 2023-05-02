import { CardData } from "../../types";
import { gwentStore } from "../../stores/GameStore";
import React from "react";
import { BackDesignComponent, CardFront } from "./Cell";
import { observer } from "mobx-react";

interface HandCellProps {
  cardData: CardData;
  whoseSide: "opponent" | "player";
}

const HandCell: React.FC<HandCellProps> = ({ cardData, whoseSide }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  let selected =
    isClicked &&
    gwentStore.cardToPlay?.id === cardData.id &&
    !gwentStore.isPlayerPass
      ? "card-selected"
      : "";

  const onCellClick = React.useCallback(() => {
    if (!gwentStore.isPlayerPass) {
      gwentStore.setCardToPlay(cardData);
      if (gwentStore.cardToPlay?.id === cardData.id) {
        setIsClicked(true);
      } else {
        setIsClicked(false);
      }
    }
  }, [cardData.id, cardData.x, cardData.y, cardData.card]);

  React.useEffect(() => {
    if (cardData.card === undefined) {
      setIsClicked(false);
    }
  }, [cardData.card]);

  if (cardData.card === undefined) {
    return (
      <div id={`cell-${cardData.x}-${cardData.y}`} className="empty-cell"></div>
    );
  } else if (whoseSide === "player") {
    return (
      <div
        id={`cell-${cardData.x}-${cardData.y}`}
        className={`card ${cardData.card.suit} ${selected}`}
        onClick={onCellClick}
      >
        <CardFront rank={cardData.card.rank} suit={cardData.card.suit} />
      </div>
    );
  } else {
    return (
      <div
        id={`cell-${cardData.x}-${cardData.y}`}
        className={`card ${cardData.card.suit}`}
      >
        {/* for testing opponents moves */}
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

export const HandCellObserver = observer(HandCell);
