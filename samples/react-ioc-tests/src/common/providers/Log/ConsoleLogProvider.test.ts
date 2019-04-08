/// <reference types="jest" />

import ConsoleLogProvider from "./ConsoleLogProvider";
import MockConsole from "./MockConsole";

describe('Provider: ConsoleLogProvider', () => {

  beforeEach(() => {
    // do nothing
  });

  afterEach(() => {
    // do nothing
  });

  it('can log debug', async () => {
    // ARRANGE
    const mockConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(mockConsole);

    // ACT
    await logProvider.Debug("class name", "my message");

    // ASSERT
    expect(mockConsole.didDebug.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(mockConsole.didDebug.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

  it('can log debug with json', async () => {
    // ARRANGE
    const mockConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(mockConsole);

    // ACT
    await logProvider.Debug("class name", "my message", {});

    // ASSERT
    expect(mockConsole.didDebug.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(mockConsole.didDebug.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

  it('can log info', async () => {
    // ARRANGE
    const logConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(logConsole);

    // ACT
    await logProvider.Info("class name", "my message");

    // ASSERT
    expect(logConsole.didInfo.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(logConsole.didInfo.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

  it('can log info with JSON', async () => {
    // ARRANGE
    const logConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(logConsole);

    // ACT
    await logProvider.Info("class name", "my message", {});

    // ASSERT
    expect(logConsole.didInfo.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(logConsole.didInfo.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

  it('can log warn', async () => {
    // ARRANGE
    const logConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(logConsole);

    // ACT
    await logProvider.Warning("class name", "my message");

    // ASSERT
    expect(logConsole.didWarn.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(logConsole.didWarn.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

  it('can log warn with json', async () => {
    // ARRANGE
    const logConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(logConsole);

    // ACT
    await logProvider.Warning("class name", "my message", {});

    // ASSERT
    expect(logConsole.didWarn.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(logConsole.didWarn.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

  it('can log error', async () => {
    // ARRANGE
    const logConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(logConsole);

    // ACT
    await logProvider.Error("class name", "my message");

    // ASSERT
    expect(logConsole.didError.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(logConsole.didError.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

  it('can log error with JSON', async () => {
    // ARRANGE
    const logConsole = new MockConsole();
    const logProvider = new ConsoleLogProvider(logConsole);

    // ACT
    await logProvider.Error("class name", "my message", {});

    // ASSERT
    expect(logConsole.didError.indexOf("class name")).toBeGreaterThanOrEqual(0);
    expect(logConsole.didError.indexOf("my message")).toBeGreaterThanOrEqual(0);
  });

});