
import React from 'react';

const Cell = ({ top, right, bottom, left, heighlight }) => {
    return (
      <div
        className={`maze-cell ${
          top ? "missingTop" : ""
        } ${right ? "missingRight" : ""} ${bottom ? "missingBottom" : ""} ${
          left ? "missingLeft" : ""
        }`}
        
      >
      <div className={`  ${heighlight ? "heighlight" : "eee"}`}></div>
      </div>
    );
  };
  export default Cell