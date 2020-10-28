import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (second, replace = false) => {
    if (replace) history.pop();
    setMode(second);
    setHistory([...history, second]);
  };
  const back = () => {
    if (history.length > 1) {
      const cpy = [...history];
      cpy.pop();
      setMode(cpy[cpy.length - 1]);
      setHistory(cpy);
    }
  };
  return {
    mode,
    transition,
    back
  };
}
