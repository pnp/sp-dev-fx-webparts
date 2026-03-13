import { IInfoTarget } from '../../game/types/IInfoTarget';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IInfoPanelProps {
  // eslint-disable-next-line @rushstack/no-new-null
  target: IInfoTarget | null;
  siteAbsoluteUrl: string;
  spHttpClient: SPHttpClient;
  onDismiss: () => void;
}
