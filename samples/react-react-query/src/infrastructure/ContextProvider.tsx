import { IHttpClient } from "mgwdev-m365-helpers";
import { QueryClient, QueryClientProvider } from "react-query";
import * as React from "react";

interface IAppContext {
  graphClient: IHttpClient;
  queryClient?: QueryClient;
}

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      cacheTime: 1000 * 5 * 1,
      retry: 1,
    },
  },
});

export const AppContext = React.createContext<IAppContext>({
  graphClient: null,
  queryClient: null,
});
export function ContextProvider(props: {
  children: React.ReactNode,
  graphClient: IHttpClient,
  queryClient?: QueryClient
}): React.ReactElement {
  return <AppContext.Provider value={props}>
    <QueryClientProvider client={props.queryClient || queryClient}>
      {props.children}</QueryClientProvider>
  </AppContext.Provider>
}