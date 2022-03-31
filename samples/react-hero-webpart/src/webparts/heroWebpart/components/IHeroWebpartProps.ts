import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';  

export interface IHeroWebpartProps {
  title: string;
  spfxContext: WebPartContext;
  isPaginated: boolean;
  pageLimit: number;
  hideFirstPageJump: boolean;
  hideLastPageJump: boolean;
  showAllHero: boolean;
  showCollage: boolean;
  items:any[];
  displayMode: DisplayMode;
}
