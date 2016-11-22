import { IPollWebPartProps } from '../../IPollWebPartProps';
import { DisplayMode } from '@microsoft/sp-client-base';
import { IPollService } from '../../services';

export interface IMainProps extends IPollWebPartProps {
  needsConfiguration: boolean;
  configureWebPart: () => void;
  displayMode: DisplayMode;
  pollService: IPollService;
}