import { IPollWebPartProps } from '../../IPollWebPartProps';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IPollService } from '../../services';

export interface IMainProps extends IPollWebPartProps {
  needsConfiguration: boolean;
  configureWebPart: () => void;
  displayMode: DisplayMode;
  pollService: IPollService;
}