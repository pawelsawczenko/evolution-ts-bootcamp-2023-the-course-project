import React from "react";
import { useNavigate } from "react-router-dom";

import "./gamerules.css";

export const GameRules: React.FC = () => {
  const navigate = useNavigate();

  const backToMainPage = () => {
    navigate("/", { replace: false });
  };
  return (
    <div id="game-rules">
      <article className="rules">
        <h1>The Game Rules</h1>
        <article>
          <h2>The Basics</h2>
          <p>
            The goal of the game is to earn more points than your opponent. You
            earn points by placing cards on the board. The greater score wins
            the round.
            <span className="highlight-text">
              {" "}
              To win the game, you must win 2 rounds.
            </span>
          </p>
          <p>
            Each round is made up of turns. A single
            <span className="highlight-text"> turn </span>consists of playing a
            card or passing.<span className="highlight-text"> Passing </span>
            means you are done for that round and will not make any more plays.
            The round ends when
            <span className="highlight-text"> both players pass. </span>All
            played cards are then discarded from the board.
          </p>
          <p>
            Before starting the game, you
            <span className="highlight-text"> flip the coin </span>to see who
            takes the first turn. When a new round starts, the round winner
            takes the first turn.
          </p>
          <p>
            At the start of the
            <span className="highlight-text"> first round, </span>each player
            draws<span className="highlight-text"> 10 cards </span>from their
            deck. 10 is the maximum hand size; any cards drawn beyond this limit
            will be discarded. At the start of the
            <span className="highlight-text"> second round, </span>each player
            draws<span className="highlight-text"> 3 more cards </span>from
            their deck. If<span className="highlight-text"> more rounds </span>
            are needed, the same applies for all the next rounds.
          </p>
        </article>
        <article>
          <h2>Perks and bonus points</h2>
          <p>
            <span className="highlight-text">Joker </span>can only be placed on
            the<span className="highlight-text"> opponent's </span>side. It will
            add<span className="highlight-text"> +10 </span> to the opponent's
            score but will give you
            <span className="highlight-text"> 2 random cards </span>from the
            deck (if possible and cards are available).
          </p>
          <p>
            The following<span className="highlight-text"> sequences </span>add
            bonus points to the row score. Cards in the sequences can be of any
            suit.
          </p>
          <ul>
            <li>
              <span className="highlight-text"> 2 cards of the same rank </span>
              next to each other add<span className="highlight-text"> +2</span>
            </li>
            <li>
              Baby Straight,
              <span className="highlight-text"> 'A 2 3 4 5' </span>adds{" "}
              <span className="highlight-text"> +3</span>
            </li>
            <li>
              Straight,
              <span className="highlight-text"> '6 7 8 9 10' </span>adds{" "}
              <span className="highlight-text"> +5</span>
            </li>
            <li>
              Royal Flush,
              <span className="highlight-text"> '10 J Q K A' </span>adds{" "}
              <span className="highlight-text"> +7</span>
            </li>
          </ul>
        </article>
      </article>
      <div id="main">
        <button className="btn btn-main" onClick={backToMainPage}>
          Back
        </button>
      </div>
    </div>
  );
};
