import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IHeroWebpartProps {
  title: string;
  spfxContext: WebPartContext;
  isPaginated: boolean;
  pageLimit: number;
  hideFirstPageJump: boolean;
  hideLastPageJump: boolean;
  showAllHero: boolean;
  items:any[];
}
