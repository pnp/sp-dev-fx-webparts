import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { ISiteInfo } from '../../../../../common/types';

export interface IDetailsDrawerProps {
  site: ISiteInfo | undefined;
  open: boolean;
  context: WebPartContext;
  sp: SPFI | undefined;
  graph: GraphFI | undefined;
  onClose: () => void;
}
