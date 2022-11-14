import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { spfi, SPFI, SPFx } from "@pnp/sp";

let _sp: SPFI = null;

export const getSP = (context?: WebPartContext): SPFI => {
  if (context) {
    _sp = spfi().using(SPFx(context));
  }
  return _sp;
};
