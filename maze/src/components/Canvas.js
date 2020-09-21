import React, { useRef, useEffect, useState } from "react";
import CanvasContext from "./context";

const Canvas = (props) => {
  const canvasRef = useRef();
  const [context, setContext] = useState();

  useEffect(() => {
    setContext(canvasRef.current);
  }, []);

  return (
    <CanvasContext.Provider value={{ maze: context }}>
      <canvas ref={canvasRef}>{props.children}</canvas>
    </CanvasContext.Provider>
  );
};

export default Canvas;
