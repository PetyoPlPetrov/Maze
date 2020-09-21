import React, {
  useEffect,
  useState,
  useContext,
  useImperativeHandle,
} from "react";
import CanvasContext from "./context";
import Cell from "./Cell";
import { startGame } from "../utils/gameUtils";

const Maze = React.forwardRef(
  ({ size, rows, columns, rerender, setPlayer, playGame, ...rest }, ref) => {
    const {
      maze = { notReady: true, style: {}, getContext: () => ({ a: 1 }) },
    } = useContext(CanvasContext);
    let [current, setCurent] = useState();

    let [grid, setGrid] = useState([]);
    let stack = [];
    let ctx = maze.getContext("2d");

    //build maze skeleton
    useEffect(() => {
      if (!ctx.beginPath) {
        return;
      }

      for (let r = 0; r < rows; r++) {
        let row = [];

        for (let c = 0; c < columns; c++) {
          let cell = new Cell(
            r,
            c,
            grid,
            size,
            `${r}${c}`,
            maze.getContext("2d")
          );
          row.push(cell);
        }
        grid.push(row);
      }
      grid[rows - 1][columns - 1].goal = true;

      setCurent(grid[0][0]);
      setGrid(grid);
    }, [maze, ctx, grid, rows, columns, size]);

    // build cells
    useEffect(
      function draw() {
        if (grid.length === 0 || !current) {
          return;
        }

        maze.width = size;
        maze.height = size;
        maze.style.background = "black";
        current.visited = true; //eslint-disable-line
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < columns; c++) {
            grid[r][c].show(size, rows, columns, maze.getContext("2d"));
          }
        }
        let next = current.checkNeighbors();
        if (next) {
          next.visited = true;
          stack.push(current);

          current.removeWall(current, next, maze.getContext("2d"));
          current = next; //eslint-disable-line
        } else if (stack.length > 0) {
          let cell = stack.pop();
          current = cell; //eslint-disable-line
        }
        if (stack.length === 0) {
          return;
        }

        window.requestAnimationFrame(() => {
          draw();
        });
      },
      [grid, current]
    );

    //  draw the avatar
    useEffect(() => {
      if (!maze.notReady && playGame) {
        let avatar = startGame(maze, rows, columns, rows * columns * 2);
        setPlayer(avatar);
      }
    }, [maze, playGame, setPlayer, columns, rows]);

    useImperativeHandle(
      ref,
      () => {
        return {
          maze,
          grid,
        };
      },
      [maze, grid]
    );

    return <div></div>;
  }
);

export default Maze;
