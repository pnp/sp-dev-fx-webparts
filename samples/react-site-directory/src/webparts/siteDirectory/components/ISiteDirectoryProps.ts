import type { SPFI } from '@pnp/sp';
import { SiteDirectoryService, type ISiteDirectoryConfig } from '../services/SiteDirectoryService';

export interface ISiteDirectoryProps {
  readonly service: SiteDirectoryService;
  readonly sp: SPFI;
  readonly config: ISiteDirectoryConfig;
  readonly title: string;
  readonly currentOrigin: string;
}
