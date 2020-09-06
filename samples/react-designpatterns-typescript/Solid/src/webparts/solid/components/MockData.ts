import { IQuote } from './QuoteContracts';

export default class MockData {

    private static _items: IQuote[] = [
        { Author: 'Author 1', Quote: 'Quote 1' },
        { Author: 'Author 2', Quote: 'Quote 2' },
        { Author: 'Author 3', Quote: 'Quote 3' }];

    public static get(): Promise<IQuote[]> {
        return new Promise<IQuote[]>((resolve) => {
           resolve(MockData._items);
       });
   }
}