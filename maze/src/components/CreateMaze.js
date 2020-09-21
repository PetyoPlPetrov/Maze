import React, { useState } from "react";

const CreateMazeForm = ({ onSubmit }) => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  return (
    <div className="flex">
      <div className="container">
        <h1>Generate a maze and visialize the path</h1>
        <label>X,Y:</label>
        <input
          placeholder="3 or more"
          onChange={({ target: { value } }) =>
            setCoordinates((state) => ({ ...state, x: value, y: value }))
          }
        ></input>
        <button onClick={() => onSubmit(coordinates)} disabled={!coordinates.x || parseInt(coordinates.x)<3}>Create</button>
      </div>

      <div className="container">
        <h1>Play a game </h1>
        <button onClick={() => onSubmit({ x: 6, y: 6 })}>Continue...</button>
      </div>
    </div>
  );
};

export default CreateMazeForm;
