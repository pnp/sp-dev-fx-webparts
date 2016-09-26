import { ISPList } from './ChartPartWebPart';
import { ISPListData } from './ChartPartWebPart';

export default class MockHttpClient {

    private static _listOfLists: ISPList[] = [
      { Title: 'Mock List One', Id: '1' },
      { Title: 'Mock List Two', Id: '2' },
      { Title: 'Mock List Three', Id: '3' }
    ];

    private static _listData: any = [
      { Title: 'Mock List Data', Id: '1' },
      { Title: 'Mock List Data Two', Id: '2' },
      { Title: 'Mock List Data Three', Id: '3' }
    ];

    private static _listItemData: ISPListData = {value: [
      {Level: '100', Topic: 'Mock Topic A', Breakout_x0020_Session_x0020_Typ: 'Mock Session Type Lecture', Start: '9/29/2016'},
      {Level: '100', Topic: 'Mock Topic A', Breakout_x0020_Session_x0020_Typ: 'Mock Session Type Lecture', Start: '9/29/2016'},
      {Level: '200', Topic: 'Mock Topic B', Breakout_x0020_Session_x0020_Typ: 'Mock Session Type Hands on Lab', Start: '9/30/2016'},
      {Level: '300', Topic: 'Mock Topic B', Breakout_x0020_Session_x0020_Typ: 'Mock Session Type Hands on Lab', Start: '9/30/2016'},
      {Level: '400', Topic: 'Mock Topic B', Breakout_x0020_Session_x0020_Typ: 'Mock Session Type Chalktalk', Start: '9/30/2016'},
      {Level: '400', Topic: 'Mock Topic C', Breakout_x0020_Session_x0020_Typ: 'Mock Session Type Chalktalk', Start: '9/30/2016'}
    ]};

    private static _listFields: any = {value: [
      {Title: 'Level'},
      {Title: 'Topic'},
      {Title: 'Breakout_x0020_Session_x0020_Typ'},
      {Title: 'Start'},
      {Title: 'Session ID'}
    ]};

    public static get(restUrl: string, options?: any): Promise<any> {
      const optionsString: string = options as string;

      if (optionsString != null)
      {
        if (optionsString == 'listoflists')
        {
          return new Promise<ISPList[]>((resolve) => {
                resolve(MockHttpClient._listOfLists);
          });
        }
        else if (optionsString == 'listdata')
        {
          return new Promise<any>((resolve) => {
                resolve(MockHttpClient._listData);
          });
        }
        else if (optionsString == 'listitemdata')
        {
          return new Promise<ISPListData>((resolve) => {
                resolve(MockHttpClient._listItemData);
          });
        }
        else if (optionsString == 'listfields')
        {
          return new Promise<any>((resolve) => {
                resolve(MockHttpClient._listFields);
          });
        }
        else
        {
          // Assume default is to return the list of lists
          return new Promise<ISPList[]>((resolve) => {
              resolve(MockHttpClient._listOfLists);
          });
        }
      }
      else
      {
        // Assume default is to return the list of lists
        return new Promise<ISPList[]>((resolve) => {
              resolve(MockHttpClient._listOfLists);
          });
      }
    }
}