import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graphfi, GraphFI, SPFx } from "@pnp/graph";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/graph/users";
import "@pnp/graph/sites";
import "@pnp/graph/mail";
import "@pnp/graph/files";

let _graph: GraphFI;

export const getGraph = (context?: WebPartContext): GraphFI => {
    if (!!context) {
        _graph = graphfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _graph;
};