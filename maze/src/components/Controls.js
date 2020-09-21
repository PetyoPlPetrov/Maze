import React from "react";
import { moveup, movedown, moveleft, moveright } from "../utils/gameUtils";

const Controls = ({ setRerender, player, state }) => {
  return (
    <div>
      <button
        onClick={() => setRerender(true)}
        onMouseDown={(e) => moveup(state, player)}
        onMouseUp={() => setRerender(false)}
      >
        UP
      </button>
      <button
        onClick={() => setRerender(true)}
        onMouseDown={(e) => moveleft(state, player)}
        onMouseUp={() => setRerender(false)}
      >
        LEFT
      </button>
      <button
        onClick={() => setRerender(true)}
        onMouseDown={(e) => moveright(state, player)}
        onMouseUp={() => setRerender(false)}
      >
        RIGHT
      </button>
      <button
        onClick={() => setRerender(true)}
        onMouseDown={(e) => movedown(state, player)}
        onMouseUp={() => setRerender(false)}
      >
        DOWN
      </button>
    </div>
  );
};

export default Controls;
