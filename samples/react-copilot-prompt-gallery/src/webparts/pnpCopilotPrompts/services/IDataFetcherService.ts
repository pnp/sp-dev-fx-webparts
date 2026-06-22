export interface IDataFetcherService {
    loadSamples(sampleDataFileUrl: string): Promise<string | undefined>;
}