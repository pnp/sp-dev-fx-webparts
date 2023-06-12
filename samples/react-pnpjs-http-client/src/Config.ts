import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import {  SPFI } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import { DefaultHeaders, GraphFI,  } from "@pnp/graph";
import { SPHttpClient } from '@microsoft/sp-http';
import { AdalClient } from "@pnp/adaljsclient";
import "@microsoft/sp-http";
import { spfi, SPFx as spSPFx } from "@pnp/sp";
import { graphfi, SPFx as graphSPFx} from "@pnp/graph";
let _sp: SPFI = null;
let _graph:GraphFI=null;
let _SpHttpClient:SPHttpClient = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _adalClient: any = null;

export const getSP = (context?: WebPartContext): SPFI => {
  if (context != null) { // eslint-disable-line eqeqeq
    //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _sp = spfi(
      
    ).using(spSPFx(context)).using().using(PnPLogging(LogLevel.Warning));
    // );
    // _SpHttpClient =context.spHttpClient;
    
  }
  return _sp;
};

export const getGraph = (context?: WebPartContext): GraphFI => {
  

  if (context !== null) { 
  _graph = graphfi().using(graphSPFx(context)).using(DefaultHeaders());
  }

return _graph;
};
export const getSPHttpClient =(context?: WebPartContext):SPHttpClient=>{
  if (context !== null) {
    _SpHttpClient = context.spHttpClient;

  }
  return _SpHttpClient;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAdalClient =(context?: WebPartContext):any=>{
  if (context !== null) {
    _adalClient = AdalClient.fromSPFxContext(context);

  }
  return _adalClient;
};
