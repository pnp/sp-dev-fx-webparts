import * as React from "react";

// polling hook
export const usePolling = (callback: () => void, delay: number | undefined): void => {
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) return;
    const tick = (): void => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}