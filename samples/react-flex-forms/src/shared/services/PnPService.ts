import { LogLevel, PnPLogging } from '@pnp/logging';
import { SPFI, SPFx, spfi } from '@pnp/sp';
import '@pnp/sp/fields';
import '@pnp/sp/items';
import '@pnp/sp/lists';
import '@pnp/sp/webs';
import { WebPartContext } from '@microsoft/sp-webpart-base';

let instance: SPFI | undefined;

export function getSP(context?: WebPartContext): SPFI {
  if (!instance && context) {
    instance = spfi().using(SPFx(context), PnPLogging(LogLevel.Warning));
  }

  if (!instance) {
    throw new Error('SharePoint context is not initialized.');
  }

  return instance;
}
