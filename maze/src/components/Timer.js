import React, { useRef, useEffect, useState, useImperativeHandle } from "react";
import useStorage from "../utils/useStorage";

const useReallyAccurateTimer = (fn, delay) => {
  const [run, setRun] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  useEffect(() => {
    if (!run) {
      return;
    }

    let nested;
    let start = Date.now();
    function tick() {
      ref.current();
      let passed = Date.now() - start;
      start += delay;
      nested = setTimeout(tick, Math.max(0, delay - passed));
    }
    let id = setTimeout(tick, 0);

    return () => {
      id && clearTimeout(id);
      nested && clearTimeout(nested);
    };
  }, [delay, run]);

  return [run, setRun];
};
const format = (time) => {
  if (time < 10) {
    return "0" + time;
  }
  return time;
};

const Timer = React.forwardRef(({ stop, player }, ref) => {
  const [time, setTime] = useState(0);
  const [, setRunning] = useReallyAccurateTimer(
    () => setTime((i) => i + 1),
    1000
  );
  const [users, setUsers] = useStorage("Store.score", []);

  let hours = Math.floor(time / 3600);
  let mins = Math.floor((time % 3600) / 60);
  let sec = Math.floor(time % 60);

  useEffect(() => {
    setRunning(!stop);
    if (stop) {
      let newusers = users.filter((e) => e.name !== player.mail);
      let result = [...newusers, { name: player.mail, score: time }].sort(
        (a, b) => a.score - b.score
      );
      setUsers(result);
    }
  }, [stop, time]); //eslint-disable-line

  useImperativeHandle(ref, () => ({ time }), [time]);

  return (
    <div style={{ margin: "3rem" }}>
      <div>{`Time: ${format(hours)}: ${format(mins)}: ${format(sec)}`}</div>
    </div>
  );
});

export default Timer;
