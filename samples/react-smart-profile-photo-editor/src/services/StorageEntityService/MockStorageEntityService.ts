import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IStorageEntityService } from ".";

const FAKE_DELAY: number = 200;

/**
 * Mocks a storage entity provider for testing purposes
 */
export class MockStorageEntityService implements IStorageEntityService {
  /**
   *
   */
  constructor(_context: WebPartContext) {
  }

  public GetStorageEntity = async (storageKey: string): Promise<string> =>  {
    return new Promise<string>((resolve) => {
      // pretend we're getting the data from a service
      setTimeout(() => {
        resolve(storageKey);
      }, FAKE_DELAY);
    });
  }
}
