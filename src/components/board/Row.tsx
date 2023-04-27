import React from "react";
import { Row } from "../../types";
import { Cell } from "./Cell";

import "./row.css";

export const RowComponent: React.FC<Row> = ({ rowItems, score }) => {
  return (
    <div className="row-template">
      <div className="row">
        {rowItems.map((item) => {
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
        <h3>{score}</h3>
      </div>
    </div>
  );
};
