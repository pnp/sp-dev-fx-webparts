
/* eslint-disable no-var */
import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { ISPFXContext, spfi, SPFI, SPFx as spSPFx } from "@pnp/sp";
import { graphfi, GraphFI, SPFx as graphSPFx } from "@pnp/graph";
import "@pnp/sp/profiles";
import "@pnp/graph/users";



export const getSP = (context?: WebPartContext): SPFI => {
 
   const _sp = spfi().using(spSPFx(context as ISPFXContext));
  return _sp;
};

export const getGraph = (context?: WebPartContext): GraphFI => {
  const  _graph = graphfi().using(graphSPFx(context as ISPFXContext));
  
  return _graph;
};
