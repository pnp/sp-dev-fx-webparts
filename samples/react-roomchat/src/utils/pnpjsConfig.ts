import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/Fields';
import '@pnp/sp/items';
import '@pnp/sp/batching';
import '@pnp/sp/security/web';
import '@pnp/sp/security/list';
import '@pnp/sp/site-users/web';
import '@pnp/sp/sputilities';
import '@pnp/sp/site-groups/web';
import '@pnp/sp/sharing/web';

import { isEmpty } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
// import pnp and pnp logging system
import {
  ISPFXContext,
  spfi,
  SPFI,
  SPFx,
} from '@pnp/sp';

let _sp: SPFI = null;

export const getSP = (context?: WebPartContext): SPFI => {
  try {
    if ( !isEmpty(context) ) {
      //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
      // The LogLevel set's at what level a message will be written to the console
      _sp = spfi().using(SPFx((context as unknown) as ISPFXContext));
    }
    return _sp;
  } catch (error) {
      console.log(error);
  }
};
