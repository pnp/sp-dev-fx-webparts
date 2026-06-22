/**
 * PnPjs Singleton Configuration
 *
 * Initializes and provides a single shared PnPjs (SPFI) instance for the
 * entire web part. The SPFx context is passed once during web part
 * initialization (onInit), and all subsequent service calls retrieve the
 * cached instance without needing the context again.
 *
 * PnPjs module imports below register their functionality on the SPFI
 * instance (e.g., sp.web.lists, sp.web.items). Each import adds the
 * corresponding API surface — omitting an import means that API is
 * unavailable at runtime.
 */

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFI, SPFx } from '@pnp/sp';
import { LogLevel, PnPLogging } from '@pnp/logging';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';
import '@pnp/sp/folders';
import '@pnp/sp/views';

/** Module-level singleton — set once, reused everywhere. */
let _sp: SPFI | undefined;

/**
 * Returns the shared PnPjs SPFI instance.
 *
 * @param context - The SPFx web part context. Required on the first call
 *                  (typically in `onInit`). Subsequent calls can omit it.
 * @returns The configured SPFI instance ready for SharePoint REST calls.
 * @throws If called before the instance has been initialized with a context.
 */
export const getSP = (context?: WebPartContext): SPFI => {
  if (context) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  if (!_sp) {
    throw new Error('PnPjs not initialized. Call getSP(context) first.');
  }
  return _sp;
};
