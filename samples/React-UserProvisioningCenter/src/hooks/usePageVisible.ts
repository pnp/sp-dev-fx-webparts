import * as React from 'react';

export function usePageVisible(): boolean {
  const [visible, setVisible] = React.useState<boolean>(
    () => typeof document === 'undefined' || document.visibilityState !== 'hidden'
  );

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }
    const onChange = (): void => setVisible(document.visibilityState !== 'hidden');
    onChange();
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  return visible;
}
