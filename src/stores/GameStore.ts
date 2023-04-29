import { makeAutoObservable } from "mobx";
import { Card, CardRanking, CardData, GameBoard } from "../types";

interface CardsCombinations {
  royalFlush: CardRanking[];
  straight: CardRanking[];
  babyStraight: CardRanking[];
}

class GwentStore {
  gameBoard: GameBoard;
  cardToPlay: CardData | undefined;
  moveToCell: CardData | undefined;
  isPlayerPass: boolean;
  isOpponentPass: boolean;
  isPlayerMoveFirst: boolean;
  currentRound: number;
  opponentPairs: CardRanking[];
  opponentPairsCellToMove: CardData[];

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
    this.currentRound = 0;
    this.opponentPairs = [];
    this.opponentPairsCellToMove = [];

    makeAutoObservable(this);
  }

  setIsPlayerMoveFirst() {
    // if num > 50 coin is red else coin is black
    const num = Math.floor(Math.random() * 100);
    if (num > 50) {
      this.isPlayerMoveFirst = true;
    } else {
      this.isPlayerMoveFirst = false;
    }
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
    this.isPlayerPass = true;
    if (!this.isOpponentPass) {
      this.opponentsMove();
    }
    this.checkIsRoundWon();
  }

  setIsOpponentPass() {
    this.isOpponentPass = true;
  }

  startTheGame() {
    this.currentRound = 1;
    this.setIsPlayerMoveFirst();
    this.setInitialDealersCards();
    this.drawCardsFromDealer(10);
    this.opponentPairs = this.returnOpponentPairs();
    if (!this.isPlayerMoveFirst) {
      this.opponentsMove();
    }
  }

  startNewRound() {
    this.clearRows();
    this.gameBoard.opponent.roundScore = 0;
    this.gameBoard.player.roundScore = 0;
    this.isOpponentPass = false;
    this.isPlayerPass = false;
    //
    // TODO: Add changes to round when start the next round. IF OPPONENT MOVES FIRTS DO MOVES !
    //
    this.currentRound += 1;
    this.drawCardsFromDealer(3);
    this.opponentPairs = this.returnOpponentPairs();
  }

  resetTheGame() {
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
    this.currentRound = 0;
    this.opponentPairs = [];
    this.opponentPairsCellToMove = [];
  }
  // TODO: change when components will be implemented
  checkIsRoundWon() {
    if (this.isPlayerPass && this.isOpponentPass) {
      if (
        this.gameBoard.player.roundScore > this.gameBoard.opponent.roundScore
      ) {
        this.gameBoard.player.roundsWon =
          this.gameBoard.player.roundsWon === 0 ? 1 : 2;
        console.log("player won", this.gameBoard.player.roundsWon);
      } else if (
        this.gameBoard.player.roundScore < this.gameBoard.opponent.roundScore
      ) {
        this.gameBoard.opponent.roundsWon =
          this.gameBoard.opponent.roundsWon === 0 ? 1 : 2;
        console.log("op won", this.gameBoard.opponent.roundsWon);
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
      // for cards without perks
      placeToMove.card === undefined &&
      placeToMove.y < 3 &&
      this.cardToPlay !== undefined &&
      this.cardToPlay?.card?.rank !== "Joker"
    ) {
      this.moveToCell = placeToMove;
      // console.log("move to", placeToMove);
      // console.log("this.chooseCard from store", this.cardToPlay);
      //
      this.playCards("player", "player");
      if (!this.isOpponentPass) {
        this.opponentsMove();
      }
    } else if (
      // for Joker
      placeToMove.card === undefined &&
      placeToMove.y > 2 &&
      this.cardToPlay?.card?.rank === "Joker"
    ) {
      // place card on the field
      this.moveToCell = placeToMove;
      console.log("place joker", this.moveToCell.x, this.moveToCell.y);
      this.playCards("opponent", "player");
      // use perk. 2 cards to hand
      this.useJokerPerk("player");
      if (!this.isOpponentPass) {
        this.opponentsMove();
      }
    }
  }

  useJokerPerk(whoPlays: "opponent" | "player") {
    for (let i = 2; i > 0; i--) {
      const indexOfEmptyCardPlayer = this.gameBoard[whoPlays].hand.findIndex(
        (item) => item.card === undefined
      );
      if (indexOfEmptyCardPlayer !== -1) {
        this.gameBoard[whoPlays].hand[indexOfEmptyCardPlayer].card = {
          rank: this.gameBoard[whoPlays].dealer.deck[0].rank,
          suit: this.gameBoard[whoPlays].dealer.deck[0].suit,
        };

        this.gameBoard[whoPlays].dealer.deck.splice(0, 1);
      }
    }
  }
  // DONE: add logic for random card in hand and random row to be choosen
  // DONE: add more advanced logic when rounds flow will be implemented
  // TODO: add more advanced logic when card's percs and advanced scoring
  opponentsMove() {
    // DONE: findIndex to find
    if (
      !this.gameBoard.opponent.hand.find((item) => item.card !== undefined) ||
      (this.gameBoard.opponent.roundScore - this.gameBoard.player.roundScore >=
        19 &&
        this.currentRound === 1)
    ) {
      // opponent doesn't have enough cards in hand
      // opponent passes
      this.setIsOpponentPass();
      console.log(
        "out of cards or op score > player's score >= 15. is op won?",
        this.gameBoard.opponent.roundScore
      );
    } else if (
      this.isPlayerPass &&
      this.gameBoard.opponent.roundScore >= this.gameBoard.player.roundScore
    ) {
      // player passed
      // opponent has enough score to win or draw the round
      // opponent passes
      this.setIsOpponentPass();
      console.log(
        "player pass. score op greater or draw. is op won?",
        this.gameBoard.opponent.roundScore
      );
    } else if (
      this.isPlayerPass &&
      this.gameBoard.opponent.roundScore < this.gameBoard.player.roundScore
    ) {
      // opponent doesn't have enough score to win or draw the round
      // player passed make a move
      this.opponentRandomMove();
      this.playCards("opponent", "opponent");

      console.log(
        "opponent makes another move",
        this.gameBoard.opponent.roundScore
      );
      // recursion
      // checking if the opponent has enough score to pass the round or not
      this.opponentsMove();
    } else if (this.opponentPairs.length) {
      // opponent makes a move
      // pair
      this.opponentPairMove();
      this.playCards("opponent", "opponent");
    } else if (
      this.gameBoard.opponent.hand.find(
        (item) => item.card !== undefined && item.card.rank === "Joker"
      ) &&
      this.gameBoard.opponent.hand.filter((item) => item.card !== undefined)
        .length < 7
    ) {
      // opponent makes a move
      // JOKER
      this.opponentJokerMove();
      this.playCards("player", "opponent");
      // use perk. 2 cards to hand
      this.useJokerPerk("opponent");
      this.opponentPairs = this.returnOpponentPairs();
    } else {
      // opponent makes a move
      // RANDOM
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
    // get random card from hand exept Joker
    const cardsArr = this.gameBoard.opponent.hand.filter(
      (item) => item.card !== undefined && item.card.rank !== "Joker"
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

  opponentPairMove() {
    // TODO: refactoring
    this.cardToPlay = this.gameBoard.opponent.hand.find(
      (item) => item.card?.rank === this.opponentPairs[0]
    );

    if (this.opponentPairs.length % 2 === 0) {
      const emptyCellsArr = this.gameBoard.opponent.farRow.rowItems
        .filter((item) => item.card === undefined && item.x % 2 === 0)
        .concat(
          this.gameBoard.opponent.nearRow.rowItems.filter(
            (item) => item.card === undefined && item.x % 2 === 0
          )
        );

      const chosenPlace =
        emptyCellsArr[Math.floor(Math.random() * emptyCellsArr.length)];
      this.moveToCell = chosenPlace;
      console.log("first card in pair");
    } else {
      const emptyCellsArr = this.gameBoard.opponent.farRow.rowItems
        .filter(
          (item, index, arr) =>
            (arr[index + 1]?.card?.rank === this.opponentPairs[0] ||
              arr[index - 1]?.card?.rank === this.opponentPairs[0]) &&
            item.card === undefined
        )
        .concat(
          this.gameBoard.opponent.nearRow.rowItems.filter(
            (item, index, arr) =>
              arr[index - 1]?.card?.rank === this.opponentPairs[0] &&
              item.card === undefined
          )
        );

      const chosenPlace = emptyCellsArr[0];
      this.moveToCell = chosenPlace;
      console.log("second card in pair");
    }

    this.opponentPairs.shift();
  }

  opponentJokerMove() {
    // find index of Joker and set card to play
    const jokerIndex = this.gameBoard.opponent.hand.findIndex(
      (item) => item.card !== undefined && item.card.rank === "Joker"
    );
    const chosenCard = this.gameBoard.opponent.hand[jokerIndex];
    this.cardToPlay = chosenCard;
    // place card on the field
    // get random cell to place Joker card
    const emptyCellsArr = this.gameBoard.player.farRow.rowItems
      .filter((item) => item.card === undefined)
      .concat(
        this.gameBoard.player.nearRow.rowItems.filter(
          (item) => item.card === undefined
        )
      );
    const chosenPlace =
      emptyCellsArr[Math.floor(Math.random() * emptyCellsArr.length)];
    this.moveToCell = chosenPlace;

    console.log("place joker", this.moveToCell.x, this.moveToCell.y);
  }

  clearRows() {
    // clear opponent's rows between rounds
    this.gameBoard.opponent.nearRow.rowItems = returnEmptyRow(4);
    this.gameBoard.opponent.nearRow.score = 0;
    this.gameBoard.opponent.farRow.rowItems = returnEmptyRow(3);
    this.gameBoard.opponent.farRow.score = 0;
    // clear player's rows between rounds
    this.gameBoard.player.farRow.rowItems = returnEmptyRow(2);
    this.gameBoard.player.farRow.score = 0;
    this.gameBoard.player.nearRow.rowItems = returnEmptyRow(1);
    this.gameBoard.player.nearRow.score = 0;
  }

  returnOpponentPairs(): CardRanking[] {
    const arrOfRanks: CardRanking[] = [];
    this.gameBoard.opponent.hand.forEach((item) => {
      if (item.card !== undefined) {
        arrOfRanks.push(item.card.rank);
      }
    });
    let sorted_arr = arrOfRanks.slice().sort();

    let results: CardRanking[] = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
        results.push(sorted_arr[i + 1]);
      }
    }
    return results;
  }
}

export const cardsCombinations: CardsCombinations = {
  royalFlush: ["10", "J", "Q", "K", "A"],
  straight: ["6", "7", "8", "9", "10"],
  babyStraight: ["A", "2", "3", "4", "5"],
};

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
  // test
  // joker
  {
    rank: "Joker",
    suit: "JokerRed",
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
  // test
  // joker
  {
    rank: "Joker",
    suit: "JokerBlack",
  },
];

export const gwentStore = new GwentStore();

// DONE: add randomizer for Hand from Dealer
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
  let arrOfRanks: (CardRanking | undefined)[] = [];

  row.forEach((item) => {
    if (item.card !== undefined) {
      arrOfRanks.push(item.card.rank);

      switch (item.card.rank) {
        case "Joker":
          sum += 10;
          break;
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
    } else {
      arrOfRanks.push(item.card);
    }
  });
  // console.log(arrOfRanks);
  arrOfRanks.forEach((rank, index) => {
    if (index !== 0 && rank !== undefined) {
      if (rank === arrOfRanks[index - 1]) {
        // if row has pair one by one, add 2 to score
        sum += 2;
      }
    }
    if (index >= 4) {
      if (
        rank === cardsCombinations.royalFlush[4] &&
        arrOfRanks[index - 1] === cardsCombinations.royalFlush[3] &&
        arrOfRanks[index - 2] === cardsCombinations.royalFlush[2] &&
        arrOfRanks[index - 3] === cardsCombinations.royalFlush[1] &&
        arrOfRanks[index - 4] === cardsCombinations.royalFlush[0]
      ) {
        // if row has Royal Flush, add 7 to score
        sum += 7;
      }

      if (
        rank === cardsCombinations.straight[4] &&
        arrOfRanks[index - 1] === cardsCombinations.straight[3] &&
        arrOfRanks[index - 2] === cardsCombinations.straight[2] &&
        arrOfRanks[index - 3] === cardsCombinations.straight[1] &&
        arrOfRanks[index - 4] === cardsCombinations.straight[0]
      ) {
        // if row has "Straight", add 5 to score
        sum += 5;
      }

      if (
        rank === cardsCombinations.babyStraight[4] &&
        arrOfRanks[index - 1] === cardsCombinations.babyStraight[3] &&
        arrOfRanks[index - 2] === cardsCombinations.babyStraight[2] &&
        arrOfRanks[index - 3] === cardsCombinations.babyStraight[1] &&
        arrOfRanks[index - 4] === cardsCombinations.babyStraight[0]
      ) {
        // if row has "Baby Straight", add 3 to score
        sum += 3;
      }
    }
  });
  return sum;
}
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
