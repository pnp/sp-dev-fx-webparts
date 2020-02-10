import { MSGraphClientFactory } from '@microsoft/sp-http';
import { IMail } from '../../../model/IMail';

export interface IOutlook2SharePointProps {
  mail: IMail;
  msGraphClientFactory: MSGraphClientFactory;
}
