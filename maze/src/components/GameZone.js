import React from "react";

import Controls from "./Controls";
import Form from "./Form";
import Timer from "./Timer";

const GameZone = ({
  stop,
  setPlayGame,
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
  state,
  timer,
}) => {
  return (
    <div className="flex container center column">
      {showTimer && <Timer ref={timer} stop={stop} player={player} />}
      {!toggleShowHidePath && isGameMode && (
        <button onClick={onHide}>Hide path</button>
      )}
      {!startGame && isGameMode && !showSignUpForm && (
        <button onClick={() => setPlayGame((e) => !e)}>
          {"Sign up as player"}
        </button>
      )}
      {showSignUpForm && <Form onSubmit={onSubmit} />}
      {showControls && (
        <Controls player={player} setRerender={setRerender} state={state} />
      )}
    </div>
  );
};

export default GameZone;
