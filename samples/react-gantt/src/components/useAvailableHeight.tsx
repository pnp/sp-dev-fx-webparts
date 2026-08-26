import * as React from "react";
import { BOTTOM_PADDING } from "./Gantt";

export const useAvailableHeight = (
  enabled: boolean,
  fixedHeight: number,
): {
  ref: React.RefObject<HTMLDivElement>;
  height: number;
} => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>(fixedHeight);

  React.useEffect(() => {
    if (!enabled) {
      setHeight(fixedHeight);
      return;
    }

    const compute = (): void => {
      if (!ref.current) return;
      const top = ref.current.getBoundingClientRect().top;
      setHeight(Math.max(300, window.innerHeight - top - BOTTOM_PADDING));
    };

    compute();
    window.addEventListener("resize", compute);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && ref.current) {
      observer = new ResizeObserver(compute);
      observer.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener("resize", compute);
      if (observer) observer.disconnect();
    };
  }, [enabled, fixedHeight]);

  return { ref: ref as React.RefObject<HTMLDivElement>, height };
};
