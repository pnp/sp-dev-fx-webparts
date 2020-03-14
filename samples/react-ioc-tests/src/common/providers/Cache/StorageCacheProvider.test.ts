/// <reference types="jest" />

import StorageCacheProvider from "./StorageCacheProvider";
import MockStorage from "./MockStorage";
import { CacheTimeout } from "./ICacheProvider";

describe('Provider: StorageCacheProvider', () => {

  let cacheProvider: StorageCacheProvider;
  const key: string = "key";
  const stringVal: string = "value";

  beforeEach(() => {
    cacheProvider = new StorageCacheProvider(new MockStorage("", ""));
  });

  afterEach(() => {
    // do nothing
  });

  it('can set and get from storage with default timeout', async () => {
    // ARRANGE

    // ACT
    cacheProvider.Set(key, stringVal, CacheTimeout.default);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toEqual(stringVal);
  });

  it('can set and get from storage with short timeout', async () => {
    // ARRANGE

    // ACT
    cacheProvider.Set(key, stringVal, CacheTimeout.short);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toEqual(stringVal);
  });

  it('can set and get from storage with long timeout', async () => {
    // ARRANGE

    // ACT
    cacheProvider.Set(key, stringVal, CacheTimeout.long);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toEqual(stringVal);
  });

  it('can set and get from storage with very long timeout', async () => {
    // ARRANGE

    // ACT
    cacheProvider.Set(key, stringVal, CacheTimeout.verylong);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toEqual(stringVal);
  });

  it('can set and get from storage with unspecified timeout', async () => {
    // ARRANGE

    // ACT
    cacheProvider.Set(key, stringVal);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toEqual(stringVal);
  });

  it('can set and clear from storage', async () => {
    // ARRANGE

    // ACT
    cacheProvider.Set(key, stringVal, CacheTimeout.default);
    await cacheProvider.Clear(key);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toBeUndefined();
  });

  it('can set and get object from storage', async () => {
    // ARRANGE
    const val = {};

    // ACT
    cacheProvider.Set(key, val, CacheTimeout.default);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toEqual(val);
  });

  it('can set and get null from storage', async () => {
    // ARRANGE
    const val = null;

    // ACT
    cacheProvider.Set(key, val, CacheTimeout.default);
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toEqual(val);
  });

  it('can support browsers that do not support storage - get/set', async () => {
    // ARRANGE
    const undefinedCacheProvider = new StorageCacheProvider(undefined);

    // ACT
    undefinedCacheProvider.Set(key, stringVal, CacheTimeout.default);
    const cachedVal: string = await undefinedCacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toBeUndefined();
  });

  it('can support browsers that do not support storage - clear', async () => {
    // ARRANGE
    const undefinedCacheProvider = new StorageCacheProvider(undefined);

    // ACT
    undefinedCacheProvider.Set(key, stringVal, CacheTimeout.default);
    await undefinedCacheProvider.Clear(key);
    const cachedVal: string = await undefinedCacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toBeUndefined();
  });

  it('can set and get from storage using already prefixed key', async () => {
    // ARRANGE
    const prefixedKey = `__E2.${key}`;

    // ACT
    cacheProvider.Set(prefixedKey, stringVal, CacheTimeout.default);
    const cachedVal: string = await cacheProvider.Get(prefixedKey);

    // ASSERT
    expect(cachedVal).toEqual(stringVal);
  });

  it('can expire entries', async () => {
    // ARRANGE
     const timeout = () => {
      return new Promise<void>(resolve => setTimeout(() => {
        resolve();
      }, 1001));
    };

    // ACT
    cacheProvider.Set(key, stringVal, CacheTimeout.oneSecond);
    await timeout();
    const cachedVal: string = await cacheProvider.Get(key);

    // ASSERT
    expect(cachedVal).toBeUndefined();
  });

});