import React from "react";
import { Row } from "../../../types";
import { OpponentHandCell } from "./OpponentHandCell";

import "../row.css";

export const OpponentHand: React.FC<Row> = (props: Row) => {
  const hand = props.rowItems;

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
        <h2>dealer</h2>
      </div>
    </div>
  );
};
