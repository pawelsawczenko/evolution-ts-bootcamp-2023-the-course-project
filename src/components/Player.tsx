import React from "react";
import { observer } from "mobx-react";
import { CardData /*, Player */ } from "../types";

import "./player.css";
import { PlayerHand } from "./PlayerHand";
import { RowComponent } from "./Row";

import { gwentStore } from "../stores/GameStore";

export const PlayerSide: React.FC = () => {
  // const farRow: CardData[] = [
  //   { id: "02", x: 0, y: 2, card: undefined },
  //   { id: "12", x: 1, y: 2, card: { rank: "A", suit: "Spades" } },
  //   { id: "22", x: 2, y: 2, card: { rank: "Q", suit: "Hearts" } },
  //   { id: "32", x: 3, y: 2, card: { rank: "2", suit: "Diamonds" } },
  //   { id: "42", x: 4, y: 2, card: undefined },
  //   { id: "52", x: 5, y: 2, card: { rank: "10", suit: "Clubs" } },
  //   { id: "62", x: 6, y: 2, card: { rank: "9", suit: "Spades" } },
  //   { id: "72", x: 7, y: 2, card: { rank: "8", suit: "Hearts" } },
  //   { id: "82", x: 8, y: 2, card: undefined },
  //   { id: "92", x: 9, y: 2, card: undefined },
  // ];
  // const nearRow: CardData[] = [
  //   { id: "01", x: 0, y: 1, card: undefined },
  //   { id: "11", x: 1, y: 1, card: { rank: "A", suit: "Spades" } },
  //   { id: "21", x: 2, y: 1, card: { rank: "Q", suit: "Hearts" } },
  //   { id: "31", x: 3, y: 1, card: { rank: "2", suit: "Diamonds" } },
  //   { id: "41", x: 4, y: 1, card: undefined },
  //   { id: "51", x: 5, y: 1, card: { rank: "10", suit: "Clubs" } },
  //   { id: "61", x: 6, y: 1, card: { rank: "9", suit: "Spades" } },
  //   { id: "71", x: 7, y: 1, card: { rank: "8", suit: "Hearts" } },
  //   { id: "81", x: 8, y: 1, card: { rank: "6", suit: "Diamonds" } },
  //   { id: "91", x: 9, y: 1, card: undefined },
  // ];
  // const hand: CardData[] = [
  //   { id: "00", x: 0, y: 0, card: { rank: "2", suit: "Diamonds" } },
  //   { id: "10", x: 1, y: 0, card: { rank: "A", suit: "Spades" } },
  //   { id: "20", x: 2, y: 0, card: { rank: "Q", suit: "Hearts" } },
  //   { id: "30", x: 3, y: 0, card: { rank: "2", suit: "Diamonds" } },
  //   { id: "40", x: 4, y: 0, card: { rank: "2", suit: "Diamonds" } },
  //   { id: "50", x: 5, y: 0, card: { rank: "10", suit: "Clubs" } },
  //   { id: "60", x: 6, y: 0, card: { rank: "9", suit: "Spades" } },
  //   { id: "70", x: 7, y: 0, card: { rank: "8", suit: "Hearts" } },
  //   { id: "80", x: 8, y: 0, card: { rank: "6", suit: "Diamonds" } },
  //   { id: "90", x: 9, y: 0, card: { rank: "2", suit: "Diamonds" } },
  // ];

  const farRow: CardData[] = gwentStore.gameBoard.player.farRow.rowItems;
  const nearRow: CardData[] = gwentStore.gameBoard.player.nearRow.rowItems;
  const hand: CardData[] = gwentStore.gameBoard.player.hand;

  return (
    <div className="player-side">
      <RowComponent rowItems={farRow}></RowComponent>
      <RowComponent rowItems={nearRow}></RowComponent>
      <PlayerHand rowItems={hand}></PlayerHand>
    </div>
  );
};

export const PlayerSideObserver = observer(PlayerSide);
