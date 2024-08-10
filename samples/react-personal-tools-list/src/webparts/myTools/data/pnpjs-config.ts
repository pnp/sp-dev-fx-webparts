/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import pnp, pnp logging system, and any other selective imports needed
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

import { LogLevel, PnPLogging } from "@pnp/logging";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import "@pnp/graph/groups";
import "@pnp/graph/users";
let _sp: SPFI;
let _graph: GraphFI;

export const getSP = (context: WebPartContext): SPFI => {
  if (context !== null) {
    //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};

export const getGraph = (context: WebPartContext): GraphFI => {
  if (context !== null) {
    //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _graph = graphfi()
      .using(graphSPFx(context))
      .using(PnPLogging(LogLevel.Warning));
  }
  return _graph;
};
