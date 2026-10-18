import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { IGroupInfo } from '../../../../common/types';

export interface IGroupDetailsDrawerProps {
  group?: IGroupInfo;
  open: boolean;
  context: WebPartContext;
  sp: SPFI | undefined;
  graph: GraphFI | undefined;
  onClose: () => void;
}
