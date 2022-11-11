import { IHttpClient } from "mgwdev-m365-helpers";
import { useContext } from "react";
import { AppContext } from "./ContextProvider";

export function useGraphClient(): IHttpClient {
    const { graphClient } = useContext(AppContext);
    return graphClient;
}