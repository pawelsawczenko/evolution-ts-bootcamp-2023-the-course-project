import { CardData } from "../types";
import { Suit } from "./Suit";
import { gwentStore } from "../stores/GameStore";
import React from "react";

export type HandCellProps = {
  isClicked: boolean;
  setIsClicked: (boolean: boolean) => {};
} & CardData;

export const Cell: React.FC<CardData> = (props: CardData) => {
  if (props.card === undefined) {
    return (
      <div
        id={`cell-${props.x}-${props.y}`}
        className="empty-cell"
        onClick={() => {
          gwentStore.moveCard(props);
        }}
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

export const HandCell: React.FC<CardData> = (props: CardData) => {
  const [isClicked, setIsClicked] = React.useState(false);
  // todo: look into wierd bug with class selected sometimes not working
  // propably because of gwentStore.chooseCard()
  let selected =
    isClicked && gwentStore.cardToPlay?.id === props.id ? "card-selected" : "";

  if (props.card === undefined) {
    return <div id={`cell-${props.x}-${props.y}`} className="empty-cell"></div>;
  } else {
    return (
      <div
        id={`cell-${props.x}-${props.y}`}
        className={`card ${props.card.suit} ${selected}`}
        onClick={() => {
          gwentStore.chooseCard(props);
          setIsClicked(!isClicked);
        }}
      >
        <span className="rank rank-before">{props.card.rank}</span>
        <Suit suit={props.card.suit} rank={props.card.rank}></Suit>
        <span className="rank rank-after">{props.card.rank}</span>
      </div>
    );
  }
};
