import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';

export interface IRecentFilesDrawerProps {
  open: boolean;
  context: WebPartContext;
  sp: SPFI | undefined;
  graph: GraphFI | undefined;
  onClose: () => void;
}
