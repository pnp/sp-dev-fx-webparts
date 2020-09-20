import { IFetchOptions, FetchClient } from '@pnp/common';
import { MockResponse } from './mocks/mockresponse';
import { MockListFactory } from './mocks/mockListFactory';
import { LogHelper } from 'utilities';

export class CustomFetchClient extends FetchClient {

    private mockListFactory: MockListFactory = new MockListFactory();
    private isUsingSharePoint: boolean;

    constructor(isUsingSharePoint: boolean) {
        super();
        this.isUsingSharePoint = isUsingSharePoint;
    }

    public fetch(url: string, options: IFetchOptions): Promise<Response> {
        LogHelper.verbose(this.constructor.name, 'fetch', url);

        if (this.isUsingSharePoint === false) {
            url = url.replace('/#/', '/'); // deal with HashLocationStrategy when on local host

            return new MockResponse(this.mockListFactory).fetch(url, options);
        }
        else {
            return super.fetch(url, options);
        }
    }

}
