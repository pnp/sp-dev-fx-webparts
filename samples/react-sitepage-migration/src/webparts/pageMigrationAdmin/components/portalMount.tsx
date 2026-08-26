import * as React from 'react';

const PortalMountContext = React.createContext<HTMLElement | undefined>(undefined);

export const PortalMountProvider: React.FC<{
  readonly mountNode: HTMLElement | undefined;
  readonly children: React.ReactNode;
}> = ({ mountNode, children }) => (
  <PortalMountContext.Provider value={mountNode}>{children}</PortalMountContext.Provider>
);

export const usePortalMountNode = (): HTMLElement | undefined => React.useContext(PortalMountContext);
