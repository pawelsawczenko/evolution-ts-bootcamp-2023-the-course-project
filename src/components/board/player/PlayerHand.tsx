import React from "react";
import { PlayerHandCell } from "./PlayerHandCell";

import "../row.css";
import { gwentStore } from "../../../stores/GameStore";
import { observer } from "mobx-react-lite";

export const PlayerHand: React.FC = () => {
  const { hand } = gwentStore.gameBoard.player;
  const numberOfDealerCards = gwentStore.gameBoard.player.dealer.deck.length;

  return (
    <div className="hand row-template">
      <div className="row">
        {hand.map((item) => {
          return (
            <PlayerHandCell
              key={item.id}
              id={item.id}
              card={item.card}
              x={item.x}
              y={item.y}
            ></PlayerHandCell>
          );
        })}
      </div>
      <div className="dealer">
        <h2>dealer</h2>
        <h3>{numberOfDealerCards}</h3>
      </div>
    </div>
  );
};

export const PlayerHandObserver = observer(PlayerHand);
