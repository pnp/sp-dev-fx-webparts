import { spfi, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

// eslint-disable-next-line no-var
var _sp: ReturnType<typeof spfi> | undefined = undefined;

export const getSP = (context?: { pageContext: object }): ReturnType<typeof spfi> => {
  if (context) {
    _sp = spfi().using(SPFx(context as Parameters<typeof SPFx>[0])).using(PnPLogging(LogLevel.Warning));
  }
  if (!_sp) {
    throw new Error('PnP SP not initialized. Call getSP(context) in onInit() before mounting any component.');
  }
  return _sp;
};
