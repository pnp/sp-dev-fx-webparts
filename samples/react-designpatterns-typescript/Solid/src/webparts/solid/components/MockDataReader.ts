import { SPDataReader } from './SPDataReader';
import { IQuotes, IQuote } from './QuoteContracts';

export class MockDataReader extends SPDataReader {
    constructor() {
        super(null, null);
    }

    public getData(): Promise<IQuotes> {
        return this.get().then((data: IQuote[]) => {
            var listData: IQuotes = { Quotes: data };
            return listData;
        }) as Promise<IQuotes>;
    }

    private static _items: IQuote[] = [
        { Author: 'Author 1', Quote: 'Quote 1' },
        { Author: 'Author 2', Quote: 'Quote 2' },
        { Author: 'Author 3', Quote: 'Quote 3' }];

    private get(): Promise<IQuote[]> {
        return new Promise<IQuote[]>((resolve) => {
            resolve(MockDataReader._items);
        });
    }
}