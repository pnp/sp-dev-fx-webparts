import { ListTitles, PageFields } from '@src/utilities';
import { BaseList } from '../mocklistfactory';

export class PagesList implements BaseList {
  public listTitle = ListTitles.SITEPAGES;
  public lookups = [
    { itemProperty: PageFields.PARENTPAGELOOKUP, itemKey: PageFields.PARENTPAGELOOKUPID, lookupListTitle: ListTitles.SITEPAGES },
  ];
  public items: any[] = [
    {
      ID: 1,
      Title: 'Earth',
      FileRef: '?DebugPageId=1',
      ParentPageId: null
    },
    {
      ID: 2,
      Title: 'North America',
      FileRef: '?DebugPageId=2',
      ParentPageId: 1
    },
    {
      ID: 3,
      Title: 'United States',
      FileRef: '?DebugPageId=3',
      ParentPageId: 2
    },
    {
      ID: 4,
      Title: 'Southeast',
      FileRef: '?DebugPageId=4',
      ParentPageId: 3
    },
    {
      ID: 5,
      Title: 'Georgia',
      FileRef: '?DebugPageId=5',
      ParentPageId: 4
    },
    {
      ID: 6,
      Title: 'Atlanta',
      FileRef: '?DebugPageId=6',
      ParentPageId: 5
    },
    {
      ID: 7,
      Title: 'Savannah',
      FileRef: '?DebugPageId=7',
      ParentPageId: 5
    },
    {
      ID: 8,
      Title: 'Columbus',
      FileRef: '?DebugPageId=8',
      ParentPageId: 5
    },
    {
      ID: 9,
      Title: 'Alpharetta',
      FileRef: '?DebugPageId=9',
      ParentPageId: 5
    },
    {
      ID: 10,
      Title: 'Macon',
      FileRef: '?DebugPageId=10',
      ParentPageId: 5
    },
  ];
}
