import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (second, replace = false) => {
    if (replace) setHistory(history.slice(0, history.length - 1));
    setMode(second);
    setHistory(prev => [...prev, second]);
  };
  const back = () => {
    if (history.length > 1) {
      let cpy = [...history];
      cpy.pop();
      setHistory([...cpy]);
      setMode(cpy.pop());
    }
  };
  return {
    mode,
    transition,
    back
  };
}
