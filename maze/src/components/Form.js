import React, { useState } from "react";
import useStorage from "../utils/useStorage";

const Form = ({ onSubmit }) => {
  const [mail, setMail] = useState();
  const [users, setUser] = useStorage("Store.score", []);

  return (
    <>
      <label>Email:</label>
      <input onChange={({ target: { value } }) => setMail(value)}></input>
      <button
        onClick={() => {
          onSubmit(mail);
          setUser([...users, { name: mail, score: 0 }]);
        }}
      >
        Start the game
      </button>
    </>
  );
};

export default Form;
