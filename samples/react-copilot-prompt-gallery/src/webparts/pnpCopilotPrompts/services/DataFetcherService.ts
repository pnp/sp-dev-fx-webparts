import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDataFetcherService } from './IDataFetcherService'
import promptSamples from '../data/copilot-prompts-samples.json';

export class DataFetcherService implements IDataFetcherService {
    public static readonly serviceKey: ServiceKey<IDataFetcherService> = ServiceKey.create<IDataFetcherService>('mpd:IDataFetcherService', DataFetcherService);
    private _spHttpClient: SPHttpClient;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async loadSamples(sampleDataFileUrl?: string): Promise<any> {
        try {
            if (sampleDataFileUrl) {
                const spResponse = await this._spHttpClient.get(
                    sampleDataFileUrl,
                    SPHttpClient.configurations.v1
                );

                if (!spResponse.ok) {
                    console.warn(`Failed to fetch from ${sampleDataFileUrl}, falling back to local data`);
                    return promptSamples;
                }

                return await spResponse.json();
            } else {
                return promptSamples;
            }
        } catch (error) {
            console.error("Error loading samples:", error);
            return promptSamples;
        }
    }
}