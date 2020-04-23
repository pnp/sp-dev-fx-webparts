/// <reference types="jest" />

import PnPListsService from './PnPListsService';
import MockListsServiceExecutor from './executor/MockListsServiceExecutor';
import IListsServiceExecutor from './executor/IListsServiceExecutor';

describe('Service: PnPListsService', () => {

  beforeEach(() => {
    // do nothing
  });

  afterEach(() => {
    // do nothing
  });

  it('should get 1 list [Using explict class to mock]', async () => {
    // ARRANGE
    const service = new PnPListsService(new MockListsServiceExecutor([
      { Title: "Mocked List", DefaultViewUrl: "https://bing.com" }
    ]));

    // ACT
    const lists = await service.GetLists();

    // ASSERT
    expect(lists.length).toBe(1);
  });

  it('should get 1 list [Using Jest to mock]', async () => {
    // ARRANGE
    const MockServiceExecutor = jest.fn<IListsServiceExecutor>(() => ({
      Get: jest.fn().mockReturnValue([{ Title: "Mocked List", DefaultViewUrl: "https://bing.com" }])
    }));
    const service = new PnPListsService(new MockServiceExecutor());

    // ACT
    const lists = await service.GetLists();

    // ASSERT
    expect(lists.length).toBe(1);
  });

  it('should get 2 lists', async () => {
    // ARRANGE
    const service = new PnPListsService(new MockListsServiceExecutor([
      { Title: "Mocked List", DefaultViewUrl: "https://bing.com" },
      { Title: "Another List", DefaultViewUrl: "https://bing.com" }
    ]));

    // ACT
    const lists = await service.GetLists();

    // ASSERT
    expect(lists.length).toBe(2);
  });

});