import { ISPCType } from './AngularSearchWebPart';

export default class MockHttpClient {
  private static _items: ISPCType[] = [
    { Name: 'Mock CType 1', Description: 'Mock CType 1', Id: { StringValue: 'Mock CType 1' } },
    { Name: 'Mock CType 2', Description: 'Mock CType 2', Id: { StringValue: 'Mock CType 2' } },
    { Name: 'Mock CType 3', Description: 'Mock CType 3', Id: { StringValue: 'Mock CType 3' } }
  ];

  public static get(restUrl: string): Promise<ISPCType[]> {
    return new Promise<ISPCType[]>((resolve) => {
      resolve(MockHttpClient._items);
    });
  }
}