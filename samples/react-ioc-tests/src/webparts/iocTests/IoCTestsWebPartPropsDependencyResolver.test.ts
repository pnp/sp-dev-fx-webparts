/// <reference types="jest" />

import IoCTestsWebPartPropsDependencyResolver from "./IoCTestsWebPartPropsDependencyResolver";
import { IIocTestsWebPartProps } from "./IocTestsWebPart";
import MockDependencyResolver from "../../common/providers/DependencyResolver/MockDependencyResolver";

describe('DependencyResolver: IoCTestsWebPartPropsDependencyResolver', () => {

  let resolver: IoCTestsWebPartPropsDependencyResolver;

  beforeEach(() => {
    resolver = new IoCTestsWebPartPropsDependencyResolver(new MockDependencyResolver());
  });

  afterEach(() => {
    // do nothing
  });

  it('should have valid props with mocked services', async () => {
    // ARRANGE
    const properties: IIocTestsWebPartProps = {
        description: "This is a description"
    };

    // ACT
    const props = resolver.resolve(properties);

    // ASSERT
    expect(props.logProvider).toBeDefined();
    expect(props.cacheProvider).toBeDefined();
    expect(props.listsService).toBeDefined();
  });

  it('should have valid props with real services', async () => {
    // ARRANGE
    const properties: IIocTestsWebPartProps = {
        description: "This is a description"
    };

    // ACT
    const props = resolver.resolve(properties);

    // ASSERT
    expect(props.logProvider).toBeDefined();
    expect(props.cacheProvider).toBeDefined();
    expect(props.listsService).toBeDefined();
  });

  it('should support empty property', async () => {
    // ARRANGE
    const properties: IIocTestsWebPartProps = {
        description: ""
    };

    // ACT
    const props = resolver.resolve(properties);

    // ASSERT
    expect(props.logProvider).toBeDefined();
    expect(props.cacheProvider).toBeDefined();
    expect(props.listsService).toBeDefined();
  });

});