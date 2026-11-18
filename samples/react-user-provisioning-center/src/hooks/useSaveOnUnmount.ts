import * as React from 'react';

export function useSaveOnUnmount(save: () => void): void {
  const saveRef = React.useRef(save);
  saveRef.current = save;
  React.useEffect(() => {
    return () => saveRef.current();
  }, []);
}
