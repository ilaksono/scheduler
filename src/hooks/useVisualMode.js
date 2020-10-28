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
      // const cpy = [...history];
      // console.log(cpy[cpy.length-1])
      // console.log('history:', history);
      // history.pop();
      let cpy = [...history];
      cpy.pop();
      // console.log(cpy, mode);
      setHistory([...cpy]);
      setMode(cpy.pop());
      // console.log(history);
      // console.log(history[history.length-1]);
      // console.log(mode);
      // transition(history[history.length-1]);
    }
  };
  return {
    mode,
    transition,
    back
  };
}
