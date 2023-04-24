import { makeAutoObservable } from "mobx";
import { Card, CardData, GameBoard } from "../types";

class GwentStore {
  gameBoard: GameBoard;
  cardToPlay: CardData | undefined;
  moveToCell: CardData | undefined;
  isPlayerPass: boolean;
  isOpponentPass: boolean;
  isPlayerMoveFirst: boolean;
  currentRound: 1 | 2 | 3;

  constructor() {
    this.gameBoard = {
      opponent: {
        hand: returnEmptyRow(5),
        nearRow: {
          rowItems: returnEmptyRow(4),
          score: 0,
        },
        farRow: {
          rowItems: returnEmptyRow(3),
          score: 0,
        },
        dealer: { deck: [] },
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
        hand: returnEmptyRow(0),
        dealer: { deck: [] },
        roundScore: 0,
        roundsWon: 0,
      },
    };
    this.cardToPlay = undefined;
    this.moveToCell = undefined;
    this.isPlayerPass = false;
    this.isOpponentPass = false;
    this.isPlayerMoveFirst = false;
    this.currentRound = 1;

    makeAutoObservable(this);
  }

  setInitialDealersCards() {
    if (this.isPlayerMoveFirst) {
      this.gameBoard.player.dealer.deck = shuffleArr(cardsForRedCoin);
      this.gameBoard.opponent.dealer.deck = shuffleArr(cardsForBlackCoin);
    } else {
      this.gameBoard.player.dealer.deck = shuffleArr(cardsForBlackCoin);
      this.gameBoard.opponent.dealer.deck = shuffleArr(cardsForRedCoin);
    }
  }

  drawCardsFromDealer(numberOfCards: 10 | 3) {
    for (let i = numberOfCards; i > 0; i--) {
      // add card to opponent's hand
      const indexOfEmptyCardOpponent = this.gameBoard.opponent.hand.findIndex(
        (item) => item.card === undefined
      );
      if (indexOfEmptyCardOpponent !== -1) {
        this.gameBoard.opponent.hand[indexOfEmptyCardOpponent].card = {
          rank: this.gameBoard.opponent.dealer.deck[0].rank,
          suit: this.gameBoard.opponent.dealer.deck[0].suit,
        };

        this.gameBoard.opponent.dealer.deck.splice(0, 1);
      }
      // add card to player's hand
      const indexOfEmptyCardPlayer = this.gameBoard.player.hand.findIndex(
        (item) => item.card === undefined
      );
      if (indexOfEmptyCardPlayer !== -1) {
        this.gameBoard.player.hand[indexOfEmptyCardPlayer].card = {
          rank: this.gameBoard.player.dealer.deck[0].rank,
          suit: this.gameBoard.player.dealer.deck[0].suit,
        };

        this.gameBoard.player.dealer.deck.splice(0, 1);
      }
    }
  }

  setIsPlayerPass() {
    // this.isPlayerPass = true;
    // for testing
    // TODO: change to value above when rounds flow will be implemented
    this.isPlayerPass = !this.isPlayerPass;
    this.opponentsMove();
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
  // DONE: add logic for random card in hand and random row to be choosen
  // TODO: add more advanced logic when card's percs and rounds flow will be implemented
  opponentsMove() {
    if (
      this.gameBoard.opponent.hand.findIndex(
        (item) => item.card !== undefined
      ) === -1
    ) {
      // opponent passes
      this.setIsOpponentPass();
    } else {
      // opponent makes a move
      this.opponentRandomMove();

      this.playCards("opponent", "opponent");
    }
  }

  playCards(
    whereToPlay: "opponent" | "player",
    whoPlays: "opponent" | "player"
  ) {
    // TODO: add new values when card's percs are implemented
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

  opponentRandomMove() {
    // get random card from hand
    const cardsArr = this.gameBoard.opponent.hand.filter(
      (item) => item.card !== undefined
    );
    const chosenCard = cardsArr[Math.floor(Math.random() * cardsArr.length)];
    this.cardToPlay = chosenCard;
    // get random cell to place random card
    const emptyCellsArr = this.gameBoard.opponent.farRow.rowItems
      .filter((item) => item.card === undefined)
      .concat(
        this.gameBoard.opponent.nearRow.rowItems.filter(
          (item) => item.card === undefined
        )
      );
    const chosenPlace =
      emptyCellsArr[Math.floor(Math.random() * emptyCellsArr.length)];
    this.moveToCell = chosenPlace;
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

const cardsForRedCoin: Card[] = [
  {
    rank: "2",
    suit: "Hearts",
  },
  {
    rank: "3",
    suit: "Hearts",
  },
  {
    rank: "4",
    suit: "Hearts",
  },
  {
    rank: "5",
    suit: "Hearts",
  },
  {
    rank: "6",
    suit: "Hearts",
  },
  {
    rank: "7",
    suit: "Hearts",
  },
  {
    rank: "8",
    suit: "Hearts",
  },
  {
    rank: "9",
    suit: "Hearts",
  },
  {
    rank: "10",
    suit: "Hearts",
  },
  {
    rank: "J",
    suit: "Hearts",
  },
  {
    rank: "Q",
    suit: "Hearts",
  },
  {
    rank: "K",
    suit: "Hearts",
  },
  {
    rank: "A",
    suit: "Hearts",
  },
  {
    rank: "2",
    suit: "Diamonds",
  },
  {
    rank: "3",
    suit: "Diamonds",
  },
  {
    rank: "4",
    suit: "Diamonds",
  },
  {
    rank: "5",
    suit: "Diamonds",
  },
  {
    rank: "6",
    suit: "Diamonds",
  },
  {
    rank: "7",
    suit: "Diamonds",
  },
  {
    rank: "8",
    suit: "Diamonds",
  },
  {
    rank: "9",
    suit: "Diamonds",
  },
  {
    rank: "10",
    suit: "Diamonds",
  },
  {
    rank: "J",
    suit: "Diamonds",
  },
  {
    rank: "Q",
    suit: "Diamonds",
  },
  {
    rank: "K",
    suit: "Diamonds",
  },
  {
    rank: "A",
    suit: "Diamonds",
  },
];

const cardsForBlackCoin: Card[] = [
  {
    rank: "2",
    suit: "Spades",
  },
  {
    rank: "3",
    suit: "Spades",
  },
  {
    rank: "4",
    suit: "Spades",
  },
  {
    rank: "5",
    suit: "Spades",
  },
  {
    rank: "6",
    suit: "Spades",
  },
  {
    rank: "7",
    suit: "Spades",
  },
  {
    rank: "8",
    suit: "Spades",
  },
  {
    rank: "9",
    suit: "Spades",
  },
  {
    rank: "10",
    suit: "Spades",
  },
  {
    rank: "J",
    suit: "Spades",
  },
  {
    rank: "Q",
    suit: "Spades",
  },
  {
    rank: "K",
    suit: "Spades",
  },
  {
    rank: "A",
    suit: "Spades",
  },
  {
    rank: "2",
    suit: "Clubs",
  },
  {
    rank: "3",
    suit: "Clubs",
  },
  {
    rank: "4",
    suit: "Clubs",
  },
  {
    rank: "5",
    suit: "Clubs",
  },
  {
    rank: "6",
    suit: "Clubs",
  },
  {
    rank: "7",
    suit: "Clubs",
  },
  {
    rank: "8",
    suit: "Clubs",
  },
  {
    rank: "9",
    suit: "Clubs",
  },
  {
    rank: "10",
    suit: "Clubs",
  },
  {
    rank: "J",
    suit: "Clubs",
  },
  {
    rank: "Q",
    suit: "Clubs",
  },
  {
    rank: "K",
    suit: "Clubs",
  },
  {
    rank: "A",
    suit: "Clubs",
  },
];
// Fisher–Yates shuffle
function shuffleArr(cards: Card[]) {
  let cardsLength = cards.length;
  let cardCopy: Card;
  let randomIndex: number;

  // While there remain elements to shuffle…
  while (cardsLength) {
    // Pick a remaining element…
    randomIndex = Math.floor(Math.random() * cardsLength--);

    // And swap it with the current element.
    cardCopy = cards[cardsLength];
    cards[cardsLength] = cards[randomIndex];
    cards[randomIndex] = cardCopy;
  }

  return cards;
}

// function returnFullRedHand(y: 0 | 5): CardData[] {
//   return [
//     { id: `0${y}`, x: 0, y: y, card: { rank: "5", suit: "Diamonds" } },
//     { id: `1${y}`, x: 1, y: y, card: { rank: "A", suit: "Hearts" } },
//     { id: `2${y}`, x: 2, y: y, card: { rank: "Q", suit: "Hearts" } },
//     { id: `3${y}`, x: 3, y: y, card: { rank: "4", suit: "Diamonds" } },
//     { id: `4${y}`, x: 4, y: y, card: { rank: "7", suit: "Hearts" } },
//     { id: `5${y}`, x: 5, y: y, card: { rank: "10", suit: "Hearts" } },
//     { id: `6${y}`, x: 6, y: y, card: { rank: "9", suit: "Diamonds" } },
//     { id: `7${y}`, x: 7, y: y, card: { rank: "8", suit: "Hearts" } },
//     { id: `8${y}`, x: 8, y: y, card: { rank: "6", suit: "Diamonds" } },
//     { id: `9${y}`, x: 9, y: y, card: { rank: "3", suit: "Diamonds" } },
//   ];
// }

// function returnFullBlackHand(y: 0 | 5): CardData[] {
//   return [
//     // { id: `0${y}`, x: 0, y: y, card: { rank: "2", suit: "Spades" } },
//     { id: `0${y}`, x: 0, y: y, card: undefined },
//     { id: `1${y}`, x: 1, y: y, card: { rank: "A", suit: "Clubs" } },
//     { id: `2${y}`, x: 2, y: y, card: { rank: "Q", suit: "Clubs" } },
//     { id: `3${y}`, x: 3, y: y, card: { rank: "4", suit: "Spades" } },
//     { id: `4${y}`, x: 4, y: y, card: { rank: "2", suit: "Clubs" } },
//     { id: `5${y}`, x: 5, y: y, card: { rank: "10", suit: "Spades" } },
//     { id: `6${y}`, x: 6, y: y, card: { rank: "9", suit: "Clubs" } },
//     { id: `7${y}`, x: 7, y: y, card: { rank: "8", suit: "Spades" } },
//     { id: `8${y}`, x: 8, y: y, card: { rank: "6", suit: "Spades" } },
//     // { id: `9${y}`, x: 9, y: y, card: { rank: "3", suit: "Clubs" } },
//     { id: `9${y}`, x: 9, y: y, card: undefined },
//   ];
// }
