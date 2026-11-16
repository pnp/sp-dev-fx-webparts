import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/sputilities";

let _sp: SPFI | undefined = undefined;

export const getSP = (context?: WebPartContext): SPFI => {
  if (_sp === undefined && context !== undefined) {
    _sp = spfi().using(SPFx(context));
  }
  return _sp;
};
