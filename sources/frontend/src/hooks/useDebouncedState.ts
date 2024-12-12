import { useEffect, useState } from "react";

export function useDebouncedState<T>(initialValue: T, delay: number): [T, T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  const [debouncedState, setDebouncedState] = useState<T>(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => {
      clearTimeout(handler); // Cleanup timeout on state or delay change
    };
  }, [state, delay]);

  return [state, debouncedState, setState];
}