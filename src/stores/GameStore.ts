import { makeAutoObservable } from "mobx";
import { CardData, GameBoard } from "../types";

class GwentStore {
  gameBoard: GameBoard;
  cardToPlay: CardData | undefined;
  moveToCell: CardData | undefined;
  isPlayerPass: boolean;
  isOpponentPass: boolean;

  constructor() {
    this.gameBoard = {
      opponent: {
        hand: returnFullBlackHand(5),
        nearRow: {
          rowItems: returnEmptyRow(4),
          score: 0,
        },
        farRow: {
          rowItems: returnEmptyRow(3),
          score: 0,
        },
        dealer: { deck: [undefined] },
        roundScore: 0,
        roundsWon: 0,
      },
      player: {
        farRow: {
          rowItems: returnEmptyRow(2),
          score: 0,
        },
        nearRow: {
          rowItems: returnEmptyRow(1),
          score: 0,
        },
        // hand: returnEmptyRow(0),
        hand: returnFullRedHand(0),
        dealer: { deck: [undefined] },
        roundScore: 0,
        roundsWon: 0,
      },
    };
    this.cardToPlay = undefined;
    this.moveToCell = undefined;
    this.isPlayerPass = false;
    this.isOpponentPass = false;

    makeAutoObservable(this);
  }

  setIsPlayerPass() {
    // this.isPlayerPass = true;
    // for testing
    // TODO: change to value above
    this.isPlayerPass = !this.isPlayerPass;
  }

  setIsOpponentPass() {
    this.isOpponentPass = true;
  }
  // TODO: change when components will be implemented
  setIsRoundWon() {
    if (this.isPlayerPass && this.isOpponentPass) {
      if (
        this.gameBoard.player.roundScore > this.gameBoard.opponent.roundScore
      ) {
        this.gameBoard.player.roundsWon += 1;
      } else if (
        this.gameBoard.player.roundScore < this.gameBoard.opponent.roundScore
      ) {
        this.gameBoard.opponent.roundsWon += 1;
      } else {
        console.log("DRAW");
      }
    }
  }

  setCardToPlay(chosenCard: CardData) {
    if (chosenCard.card !== undefined && this.cardToPlay === undefined) {
      this.cardToPlay = chosenCard;
      // console.log("choosen Card", chosenCard);
      // console.log("this.chooseCard set", this.cardToPlay);
    } else if (chosenCard.id === this.cardToPlay?.id) {
      this.cardToPlay = undefined;
      // console.log("choosen Card", chosenCard);
      // console.log("this.chooseCard deleted", this.cardToPlay);
    }
  }

  moveCard(placeToMove: CardData) {
    if (
      placeToMove.card === undefined &&
      placeToMove.y < 3 &&
      this.cardToPlay !== undefined
    ) {
      this.moveToCell = placeToMove;
      // console.log("move to", placeToMove);
      // console.log("this.chooseCard from store", this.cardToPlay);
      //
      this.playCards("player", "player");
      this.opponentsMove();
    }
  }

  // for testing
  // TODO: add logic for random card in hand and random row to be choosen
  opponentsMove() {
    if (
      this.gameBoard.opponent.hand.findIndex(
        (item) => item.card !== undefined
      ) === -1
    ) {
      this.setIsOpponentPass();
    } else {
      const indexOfCardToPlay = this.gameBoard.opponent.hand.findIndex(
        (item) => item.card !== undefined
      );
      this.cardToPlay = this.gameBoard.opponent.hand[indexOfCardToPlay];

      console.log("opponents card to play", this.cardToPlay);

      let indexOfPlaceToMove =
        this.gameBoard.opponent.nearRow.rowItems.findIndex(
          (item) => item.card === undefined
        );
      if (indexOfPlaceToMove === -1) {
        indexOfPlaceToMove = this.gameBoard.opponent.farRow.rowItems.findIndex(
          (item) => item.card === undefined
        );
        this.moveToCell =
          this.gameBoard.opponent.farRow.rowItems[indexOfPlaceToMove];
      } else {
        this.moveToCell =
          this.gameBoard.opponent.nearRow.rowItems[indexOfPlaceToMove];
      }
      console.log("opponents place to move card", this.moveToCell);

      this.playCards("opponent", "opponent");
    }
  }

  playCards(
    whereToPlay: "opponent" | "player",
    whoPlays: "opponent" | "player"
  ) {
    // TODO: add new values when special abilities are implemented
    const rowToPlaceCard =
      this.moveToCell?.y === 1 || this.moveToCell?.y === 4
        ? "nearRow"
        : "farRow";

    // search clicked cell in far row or near row, set card to cell if succses
    this.gameBoard[whereToPlay][rowToPlaceCard].rowItems.forEach((item) => {
      if (item.id === this.moveToCell?.id) {
        item.card = this.cardToPlay?.card;
      }
    });
    // calc row score
    this.gameBoard[whereToPlay][rowToPlaceCard].score = calcScore(
      this.gameBoard[whereToPlay][rowToPlaceCard].rowItems
    );
    // cacl round score
    this.gameBoard[whereToPlay].roundScore =
      this.gameBoard[whereToPlay].farRow.score +
      this.gameBoard[whereToPlay].nearRow.score;
    // search clicked card in hand, delete when found
    this.gameBoard[whoPlays].hand.forEach((item) => {
      if (item.id === this.cardToPlay?.id) {
        item.card = undefined;
        this.cardToPlay = undefined;
        this.moveToCell = undefined;
      }
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

function returnFullRedHand(y: 0 | 5): CardData[] {
  return [
    { id: `0${y}`, x: 0, y: y, card: { rank: "5", suit: "Diamonds" } },
    { id: `1${y}`, x: 1, y: y, card: { rank: "A", suit: "Hearts" } },
    { id: `2${y}`, x: 2, y: y, card: { rank: "Q", suit: "Hearts" } },
    { id: `3${y}`, x: 3, y: y, card: { rank: "4", suit: "Diamonds" } },
    { id: `4${y}`, x: 4, y: y, card: { rank: "7", suit: "Hearts" } },
    { id: `5${y}`, x: 5, y: y, card: { rank: "10", suit: "Hearts" } },
    { id: `6${y}`, x: 6, y: y, card: { rank: "9", suit: "Diamonds" } },
    { id: `7${y}`, x: 7, y: y, card: { rank: "8", suit: "Hearts" } },
    { id: `8${y}`, x: 8, y: y, card: { rank: "6", suit: "Diamonds" } },
    { id: `9${y}`, x: 9, y: y, card: { rank: "3", suit: "Diamonds" } },
  ];
}

function returnFullBlackHand(y: 0 | 5): CardData[] {
  return [
    // { id: `0${y}`, x: 0, y: y, card: { rank: "2", suit: "Spades" } },
    { id: `0${y}`, x: 0, y: y, card: undefined },
    { id: `1${y}`, x: 1, y: y, card: { rank: "A", suit: "Clubs" } },
    { id: `2${y}`, x: 2, y: y, card: { rank: "Q", suit: "Clubs" } },
    { id: `3${y}`, x: 3, y: y, card: { rank: "4", suit: "Spades" } },
    { id: `4${y}`, x: 4, y: y, card: { rank: "2", suit: "Clubs" } },
    { id: `5${y}`, x: 5, y: y, card: { rank: "10", suit: "Spades" } },
    { id: `6${y}`, x: 6, y: y, card: { rank: "9", suit: "Clubs" } },
    { id: `7${y}`, x: 7, y: y, card: { rank: "8", suit: "Spades" } },
    { id: `8${y}`, x: 8, y: y, card: { rank: "6", suit: "Spades" } },
    // { id: `9${y}`, x: 9, y: y, card: { rank: "3", suit: "Clubs" } },
    { id: `9${y}`, x: 9, y: y, card: undefined },
  ];
}

function calcScore(row: CardData[]): number {
  let sum = 0;

  row.forEach((item) => {
    if (item.card !== undefined) {
      switch (item.card.rank) {
        case "A":
          sum += 11;
          break;
        case "K":
        case "Q":
        case "J":
          sum += 10;
          break;
        default:
          sum += +item.card.rank;
      }
    }
  });
  return sum;
}
