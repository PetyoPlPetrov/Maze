import React from "react";

const Cell = ({ top, right, bottom, left, heighlight, first, last }) => {
  return (
    <div
      className={`maze-cell ${top ? "missingTop" : ""} ${
        right ? "missingRight" : ""
      } ${bottom ? "missingBottom" : ""} ${left ? "missingLeft" : ""}`}
    >
      <div
        className={`${heighlight ? "heighlight" : ""} ${first ? "first" : ""} ${
          last ? "last" : ""
        }`}
      ></div>
    </div>
  );
};
export default Cell;
