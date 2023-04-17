import React from "react";
import { Row } from "../types";
import { HandCell } from "./Cell";

// import "./hand.css";

export const PlayerHand: React.FC<Row> = (props: Row) => {
  const hand = props.rowItems;

  return (
    <div className="hand-template">
      <div className="row">
        {hand.map((item) => {
          return (
            <HandCell
              key={item.id}
              id={item.id}
              card={item.card}
              x={item.x}
              y={item.y}
            ></HandCell>
          );
        })}
      </div>
      <div className="dealer">
        <h2>dealer</h2>
      </div>
    </div>
  );
};
