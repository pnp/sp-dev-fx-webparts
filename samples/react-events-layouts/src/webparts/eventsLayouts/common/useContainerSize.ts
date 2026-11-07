import * as React from 'react';

/** Size classes derived from the web part's own width, not the viewport. */
export type SizeClass = 'xs' | 'sm' | 'md' | 'lg';

export function toSizeClass(width: number): SizeClass {
  if (width < 420) return 'xs';
  if (width < 680) return 'sm';
  if (width < 1000) return 'md';
  return 'lg';
}

/**
 * Tracks the width of an element so layouts can adapt to the SharePoint section they are placed in
 * (one-third column, vertical section, full width, Teams tab...).
 */
export function useContainerSize<T extends HTMLElement>(): [React.RefObject<T>, SizeClass, number] {
  const ref = React.useRef<T>(null);
  const [width, setWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }
    setWidth(element.clientWidth);
    const observer = new ResizeObserver(entries => setWidth(Math.round(entries[0].contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, toSizeClass(width || 1000), width];
}
