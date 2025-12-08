import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

// eslint-disable-next-line no-var
let _sp: SPFI | undefined = undefined;

/**
 * Get a singleton SPFI instance configured for SPFx.
 *
 * If a WebPartContext is provided it will (re)initialize the singleton.
 * If called without a context the already-initialized instance will be returned.
 * If no instance exists an Error is thrown to avoid returning null/undefined.
 */
export const getSP = (context?: WebPartContext): SPFI => {
  if (context) { // eslint-disable-line eqeqeq
    // You must add the @pnp/logging package to include the PnPLogging behavior;
    // it is no longer a peer dependency.
    // The LogLevel controls what level a message will be written to the console.
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }

  if (!_sp) {
    throw new Error("PnP JS not initialized. Call getSP(context) with a valid WebPartContext before using.");
  }

  return _sp;
};
