import React from "react";
import useStorage from "../utils/useStorage";

const Score = ({ player, isGameMode }) => {
  const [users] = useStorage("Store.score", []);

  if (!isGameMode) {
    return null;
  }
  return (
    <div style={{ margin: "3rem" }}>
      <h1>Scores:</h1>
      {users.map((e) => {
        if (!e.score) {
          return null;
        }

        return (
          <div
            key={e.name}
            className={`${e.name === player.mail ? "current" : ""}`}
          >{`${e.name}: ${e.score}`}</div>
        );
      })}
    </div>
  );
};

export default Score;
