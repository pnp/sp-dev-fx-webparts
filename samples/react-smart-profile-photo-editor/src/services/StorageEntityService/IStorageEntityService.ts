export interface IStorageEntityService {
  GetStorageEntity(storageKey: string): Promise<string>;
}
