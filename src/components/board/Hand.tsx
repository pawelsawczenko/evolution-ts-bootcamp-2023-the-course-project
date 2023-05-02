import React from "react";

import "./row.css";
import { gwentStore } from "../../stores/GameStore";
import { observer } from "mobx-react-lite";
import { BackDesignComponent } from "./Cell";
import { HandCellObserver } from "./HandCell";

interface HandProps {
  whoseSide: "opponent" | "player";
}

const Hand: React.FC<HandProps> = ({ whoseSide }) => {
  const { hand } = gwentStore.gameBoard[whoseSide];
  const numberOfDealerCards =
    gwentStore.gameBoard[whoseSide].dealer.deck.length;

  return (
    <div className="hand row-template">
      <div className="row">
        {hand.map((item) => {
          return (
            <HandCellObserver
              key={item.id}
              cardData={item}
              whoseSide={whoseSide}
            ></HandCellObserver>
          );
        })}
      </div>
      <div className="dealer">
        {numberOfDealerCards !== 0 ? (
          <div className="back-desight">
            <BackDesignComponent />
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

export const HandObserver = observer(Hand);
