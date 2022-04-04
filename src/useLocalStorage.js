import { useState, useEffect } from "react";

export function useLocalStorage(key, initialState) {
  const [state, setState] = useState(
      () => JSON.parse(window.localStorage.getItem(key)) || initialState
      );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
//2번씩 로드되는거 해결
  return [state, setState];
}