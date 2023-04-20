import React from "react";
import { Row } from "../../../types";
import { PlayerHandCell } from "./PlayerHandCell";

import "../row.css";

export const PlayerHand: React.FC<Row> = (props: Row) => {
  const hand = props.rowItems;

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
      </div>
    </div>
  );
};
