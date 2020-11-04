import { useState } from 'react';

// hook sets state - mode and history to render correct appointment display
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
      let cpy = [...history]; // create copy of history array
      cpy.pop(); // remove last element when reverting route
      setHistory([...cpy]); // then set history to removed version 
      setMode(cpy.pop()); // change display render to last element of history
    }
  };
  return {
    mode,
    transition,
    back
  };
}
