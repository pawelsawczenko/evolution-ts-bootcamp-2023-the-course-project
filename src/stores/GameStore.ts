import { makeAutoObservable } from "mobx";
import { CardData, GameBoard } from "../types";

class GwentStore {
  gameBoard: GameBoard;
  cardToPlay: CardData | undefined;
  moveToCell: CardData | undefined;
  // isHandClicked: boolean;

  constructor() {
    this.gameBoard = {
      opponent: {
        hand: returnEmptyRow(5),
        nearRow: {
          rowItems: returnEmptyRow(4),
        },
        farRow: {
          rowItems: returnEmptyRow(3),
        },
        dealer: { deck: [undefined] },
        roundScore: 0,
        roundsWon: 0,
      },
      player: {
        farRow: {
          rowItems: returnEmptyRow(2),
        },
        nearRow: {
          rowItems: returnEmptyRow(1),
        },
        // hand: returnEmptyRow(0),
        hand: returnFullHand(),
        dealer: { deck: [undefined] },
        roundScore: 0,
        roundsWon: 0,
      },
    };
    this.cardToPlay = undefined;
    this.moveToCell = undefined;
    // this.isHandClicked = false;

    makeAutoObservable(this);
  }

  chooseCard(chosenCard: CardData) {
    if (chosenCard.card !== undefined && this.cardToPlay === undefined) {
      this.cardToPlay = chosenCard;
      // console.log("choosen Card", chosenCard);
      // console.log("this.chooseCard set", this.cardToPlay);
      // this.isHandClicked = true;
    } else if (chosenCard.id === this.cardToPlay?.id) {
      this.cardToPlay = undefined;
      // console.log("choosen Card", chosenCard);
      // console.log("this.chooseCard deleted", this.cardToPlay);
      // this.isHandClicked = false;
    }
  }
  moveCard(placeToMove: CardData) {
    if (placeToMove.card === undefined && this.cardToPlay !== undefined) {
      this.moveToCell = placeToMove;
      // console.log("move to", placeToMove);
      // console.log("this.chooseCard from store", this.cardToPlay);
      this.playPlayersCard();
      // this.isHandClicked = false;
    }
  }

  playPlayersCard() {
    // search clicked cell in far row, set card to cell if succses
    this.gameBoard.player.farRow.rowItems =
      this.gameBoard.player.farRow.rowItems.map((item) => {
        if (item.id === this.moveToCell?.id) {
          item.card = this.cardToPlay?.card;

          this.moveToCell = undefined;
        }
        return item;
      });
    // search clicked cell in near row, set card to cell if succses
    this.gameBoard.player.nearRow.rowItems =
      this.gameBoard.player.nearRow.rowItems.map((item) => {
        if (item.id === this.moveToCell?.id) {
          item.card = this.cardToPlay?.card;

          this.moveToCell = undefined;
        }
        return item;
      });
    // search clicked card in hand, delete when found
    this.gameBoard.player.hand = this.gameBoard.player.hand.map((item) => {
      if (item.id === this.cardToPlay?.id) {
        item.card = undefined;
        this.cardToPlay = undefined;
      }
      return item;
    });
  }
}

export const gwentStore = new GwentStore();

// todo: add randomizer for Hand from Dealer
function returnEmptyRow(y: 0 | 1 | 2 | 3 | 4 | 5): CardData[] {
  return [
    { id: `0${y}`, x: 0, y: y, card: undefined },
    { id: `1${y}`, x: 1, y: y, card: undefined },
    { id: `2${y}`, x: 2, y: y, card: undefined },
    { id: `3${y}`, x: 3, y: y, card: undefined },
    { id: `4${y}`, x: 4, y: y, card: undefined },
    { id: `5${y}`, x: 5, y: y, card: undefined },
    { id: `6${y}`, x: 6, y: y, card: undefined },
    { id: `7${y}`, x: 7, y: y, card: undefined },
    { id: `8${y}`, x: 8, y: y, card: undefined },
    { id: `9${y}`, x: 9, y: y, card: undefined },
  ];
}

function returnFullHand(y: 0 = 0): CardData[] {
  return [
    { id: `0${y}`, x: 0, y: y, card: { rank: "2", suit: "Diamonds" } },
    { id: `1${y}`, x: 1, y: y, card: { rank: "A", suit: "Spades" } },
    { id: `2${y}`, x: 2, y: y, card: { rank: "Q", suit: "Hearts" } },
    { id: `3${y}`, x: 3, y: y, card: { rank: "2", suit: "Diamonds" } },
    { id: `4${y}`, x: 4, y: y, card: { rank: "2", suit: "Diamonds" } },
    { id: `5${y}`, x: 5, y: y, card: { rank: "10", suit: "Clubs" } },
    { id: `6${y}`, x: 6, y: y, card: { rank: "9", suit: "Spades" } },
    { id: `7${y}`, x: 7, y: y, card: { rank: "8", suit: "Hearts" } },
    { id: `8${y}`, x: 8, y: y, card: { rank: "6", suit: "Diamonds" } },
    { id: `9${y}`, x: 9, y: y, card: { rank: "2", suit: "Diamonds" } },
  ];
}
