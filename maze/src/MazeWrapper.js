import React, { useEffect, useMemo, useState } from "react";
import "./styles/index.css";
import "./styles/maze.css";
import {
  findShortestPath,
  Point,
  findUnvisitedNeighboors,
  removeWalls,
  mark,
} from "./utils/graphUtils";
import Cell from "./components/Cell";

const x = 26;
const y = 35;
const createEmptyMatrix = (x, y, fill) =>
  Array(x)
    .fill(fill)
    .map(() => Array(y).fill(fill));

const createMatrix = () =>
  [...Array(x).keys()].map((row) => {
    return [...Array(y).keys()].map((col) => [row, col]);
  });

const App = () => {
  const [walls, setWalls] = useState(createEmptyMatrix(x, y, ""));
  const [highligted, setHighligted] = useState(createEmptyMatrix(x, y, false));
  const maze = useMemo(createMatrix, []);

  useEffect(() => {
    let stack = [];
    let visited = createEmptyMatrix(x, y);
    let missingWalls = createEmptyMatrix(x, y, "");
    let start = maze[0][0];
    visited[0][0] = true;
    stack.push(start);

    while (stack.length > 0) {
      let current = stack.pop();

      let unvisitedNeihboors = findUnvisitedNeighboors(current, maze, visited);

      if (unvisitedNeihboors.length > 0) {
        stack.push(current);
      } else {
        continue;
      }
      let randomNeighboor =
        unvisitedNeihboors[
          Math.floor(Math.random() * unvisitedNeihboors.length)
        ];

      removeWalls(current, randomNeighboor, missingWalls);

      visited[randomNeighboor[0]][randomNeighboor[1]] = true;

      stack.push(randomNeighboor);
    }

    setWalls(missingWalls);
  }, [maze]);

  const onShow = () => {
    var source = new Point(0, 0);
    var dest = new Point(x - 1, y - 1);

    let prev = findShortestPath(maze, source, dest, walls);

    let curr = prev[`${dest.x},${dest.y}`];
    highligted[x - 1][y - 1] = true;
    mark(curr, highligted, setHighligted, prev);
  };

  return (
    <>
      <div
        className="maze-wrapper grid"
        style={{
          gridTemplateColumns: `repeat(${y}, 1fr)`,
          gridTemplateRows: `repeat(${x},1fr)`,
        }}
      >
        {maze.map((cells) => {
          return cells.map((cell, i) => {
            const missingBorders = walls[cell[0]][cell[1]];

            return (
              <Cell
                first={cell[0] === 0 && cell[1] === 0}
                last={cell[0] === x - 1 && cell[1] === y - 1}
                heighlight={highligted[cell[0]][cell[1]]}
                key={cell.toString()}
                top={missingBorders.includes("top")}
                bottom={missingBorders.includes("bottom")}
                left={missingBorders.includes("left")}
                right={missingBorders.includes("right")}
              />
            );
          });
        })}
      </div>
      <button onClick={onShow}>Show path</button>
      <button onClick={() => setHighligted(createEmptyMatrix(x, y, false))}>
        Hide path
      </button>
    </>
  );
};

export default App;
