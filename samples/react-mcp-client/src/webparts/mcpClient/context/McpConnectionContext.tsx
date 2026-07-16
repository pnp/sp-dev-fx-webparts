import * as React from "react";
import { McpClientService } from "../services/McpClientService";

export const McpConnectionContext = React.createContext<McpClientService | undefined>(undefined);

export const McpConnectionProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const service = React.useRef<McpClientService>();

  if (!service.current) {
    service.current = new McpClientService();
  }

  return (
    <McpConnectionContext.Provider value={service.current}>
      {children}
    </McpConnectionContext.Provider>
  );
};
