export type CardRanking =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export type CardSuit = "Hearts" | "Diamonds" | "Clubs" | "Spades";

export interface Card {
  rank: CardRanking;
  suit: CardSuit;
}

export interface Dealer {
  deck: Card[];
}
export interface CardData {
  id: string;
  card: Card | undefined;
  x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  y: 0 | 1 | 2 | 3 | 4 | 5;
}

export type Rounds = 0 | 1 | 2;

// maybe use Tuple for row and hand?
export interface Row {
  rowItems: CardData[];
  score: number;
}

export interface Player {
  farRow: Row;
  nearRow: Row;
  hand: CardData[];
  dealer: Dealer;
  roundScore: number;
  roundsWon: Rounds;
}

export interface GameBoard {
  opponent: Player;
  player: Player;
}
