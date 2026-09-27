import { WebPartContext } from '@microsoft/sp-webpart-base';
import { graphfi, GraphFI } from '@pnp/graph';
import { SPFx } from '@pnp/graph/behaviors/spfx';

/** Creates the delegated, page-context-bound Graph client used by the read-only service. */
export function createGraphHost(context: WebPartContext): GraphFI {
  return graphfi().using(SPFx(context));
}
