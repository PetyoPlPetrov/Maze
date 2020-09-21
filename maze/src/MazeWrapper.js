import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  findShortestPath,
  delayRestore,
  Point,
  unmark,
  prev,
} from "./utils/graphUtils";
import Maze from "./components/Maze";
import Canvas from "./components/Canvas";
import Score from "./components/Score";
import CreateMazeForm from "./components/CreateMaze";
import GameZone from "./components/GameZone";
import { updateGameArea, clearmove } from "./utils/gameUtils";
import "./styles/index.css";

const App = () => {
  const ref = useRef();
  const timer = useRef();
  const [coords, setCoords] = useState(false);
  const [playGame, setPlayGame] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [stop, stopTimer] = useState(false);
  const [toggleShowHidePath, setToggle] = useState(true);
  const [player, setPlayer] = useState(false);
  const [rerend, setRerender] = useState();
  const x = parseInt(coords.x);
  const y = parseInt(coords.y);

  const onShowPath = useCallback(() => {
    var source = new Point(0, 0);
    var dest = new Point(x - 1, y - 1);
    const maze = ref.current.maze;
    const grid = ref.current.grid;
    findShortestPath(grid, source, dest);
    delayRestore(
      prev[`${grid.length - 1}${grid[0].length - 1}`],
      maze.getContext("2d"),
      grid
    );

    setToggle((t) => !t);
  }, [x, y]);

  const onHide = () => {
    const maze = ref.current.maze;
    const grid = ref.current.grid;
    unmark(
      prev[`${grid.length - 1}${grid[0].length - 1}`],
      maze.getContext("2d"),
      grid
    );
    setToggle((e) => !e);
  };

  const onSubmit = (mail) => {
    setStartGame(true);
    player.mail = mail;
  };

  const onMazeCreate = useCallback(
    (coordinates) => {
      setCoords(coordinates);
    },
    [setCoords]
  );

  useEffect(() => {
    if (player) {
      updateGameArea(ref.current.maze, player);
      clearmove(player);
    }
  });

  //check for win
  useEffect(() => {//eslint-disable-line
    if (player.gridX === x - 1 && player.gridY === y - 1) {
      stopTimer(true);
    }
  });

  const showControls = startGame && !stop && toggleShowHidePath;
  const showSignUpForm = playGame && !startGame;
  const showTimer = startGame && toggleShowHidePath;
  const isGameMode = coords.x === 6;
  const gameProps = {
    state: ref.current,
    showTimer,
    toggleShowHidePath,
    startGame,
    isGameMode,
    showSignUpForm,
    onHide,
    player,
    onSubmit,
    showControls,
    setRerender,
    timer,
    setPlayGame,
    stop,
  };

  return (
    <div>
      <div className={`${coords ? "flex" : "block"} container start`}>
        {!coords && <CreateMazeForm onSubmit={onMazeCreate} />}
        {coords && (
          <>
            <Canvas>
              <Maze
                rerender={rerend}
                ref={ref}
                size={x * y * 12.5}
                rows={x}
                columns={y}
                setPlayer={setPlayer}
                playGame={playGame}
              />
            </Canvas>
            <button onClick={onShowPath}>Show path</button>
            <button onClick={() => window.location.reload()}>Back</button>
          </>
        )}
        <Score player={player} isGameMode={isGameMode} />
      </div>

      <GameZone {...gameProps} />
    </div>
  );
};

export default App;
