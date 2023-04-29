import React from "react";
import { OpponentHandCell } from "./OpponentHandCell";

import "../row.css";
import { gwentStore } from "../../../stores/GameStore";
import { observer } from "mobx-react-lite";
import BackDesign from "../../../assets/BackDesign.svg";

// TODO: refactir with player hand
const OpponentHand: React.FC = () => {
  const { hand } = gwentStore.gameBoard.opponent;
  const numberOfDealerCards = gwentStore.gameBoard.player.dealer.deck.length;

  return (
    <div className="hand row-template">
      <div className="row">
        {hand.map((item) => {
          return (
            <OpponentHandCell
              key={item.id}
              id={item.id}
              card={item.card}
              x={item.x}
              y={item.y}
            ></OpponentHandCell>
          );
        })}
      </div>
      <div className="dealer">
        {/* <h2>dealer</h2> */}
        {numberOfDealerCards !== 0 ? (
          <div className="back-desight">
            <img src={BackDesign} alt="Back Design" />
          </div>
        ) : (
          <div className="empty-cell"></div>
        )}
        <div className="dealer-cards-number">
          <h3>{numberOfDealerCards}</h3>
        </div>
      </div>
    </div>
  );
};

export const OpponentHandObserver = observer(OpponentHand);
