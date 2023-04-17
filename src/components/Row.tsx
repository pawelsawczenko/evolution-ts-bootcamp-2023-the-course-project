import React from "react";
import { CardData, Row } from "../types";
import { Cell } from "./Cell";

import "./row.css";

export const RowComponent: React.FC<Row> = (props: Row) => {
  const row = props.rowItems;

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

  return (
    <div className="row-template">
      <div className="row">
        {row.map((item) => {
          return (
            <Cell
              key={item.id}
              id={item.id}
              card={item.card}
              x={item.x}
              y={item.y}
            ></Cell>
          );
        })}
      </div>
      <div className="score">
        <h3>{calcScore(row)}</h3>
      </div>
    </div>
  );
};
