import { ISPCType } from './AngularSearchWebPart'

export default class MockHttpClient {
  private static _items: ISPCType[] = [
    { Name: 'Mock CType 1', Description: 'Mock CType 1', Id: { StringValue: '0x01' } },
    { Name: 'Mock CType 2', Description: 'Mock CType 2', Id: { StringValue: '0x02' } },
    { Name: 'Mock CType 3', Description: 'Mock CType 3', Id: { StringValue: '0x03' } }
  ];

  public static get(restUrl: string): Promise<ISPCType[]> {
    return new Promise<ISPCType[]>((resolve) => {
      resolve(MockHttpClient._items);
    });
  }
}