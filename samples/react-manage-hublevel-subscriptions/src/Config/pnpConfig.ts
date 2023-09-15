import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp, pnp logging system, and any other selective imports needed
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { GraphFI, graphfi, SPFx as graphSPFx } from "@pnp/graph";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";
import "@pnp/sp/items/list";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import "@pnp/sp/attachments";
import "@pnp/sp/site-users/web";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/hubsites";
import "@pnp/sp/batching";

//eslint-disable-next-line no-var
var _sp: SPFI;
//eslint-disable-next-line no-var
var _graph: GraphFI;

export const getSP = (context?: WebPartContext): SPFI => {
//eslint-disable-next-line eqeqeq
  if (context != null) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};

export const getGraph = (context?: WebPartContext): GraphFI => {
    if(!!context){
        _graph = graphfi().using(graphSPFx(context)).using(PnPLogging(LogLevel.Warning));
    }
    return _graph;
}