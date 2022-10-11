import { WebPartContext } from "@microsoft/sp-webpart-base";
import { isEmpty } from "@microsoft/sp-lodash-subset";

import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/batching";

// eslint-disable-next-line no-var
var _sp: SPFI = null;

export const getSp = (context?: WebPartContext): SPFI => {
  if (!isEmpty(context)) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
}