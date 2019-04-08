/// <reference types="jest" />

import * as React from 'react';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16.3';

configure({ adapter: new Adapter() });

import ListOfLists from './ListOfLists';
import MockListsService from '../../../common/services/Lists/MockListsService';
import MockCacheProvider from '../../../common/providers/Cache/MockCacheProvider';
import MockLogProvider from '../../../common/providers/Log/MockLogProvider';

describe('Component: ListOfLists', () => {

  let reactComponent;

  beforeEach(() => {
    // do nothing
  });

  afterEach(() => {
    reactComponent.unmount();
  });

  it('should render in loading state', async () => {
    // ARRANGE
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: "",
        listsService: new MockListsService([{ Title: "Mocked List", DefaultViewUrl: "https://bing.com" }]),
        cacheProvider: new MockCacheProvider(),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    const element = reactComponent.first("div");

    // ASSERT
    expect(element.length).toBeGreaterThan(0);
    expect(element.text().trim()).toEqual("Loading...");
  });

  it('should render 1 item with no cache', async () => {
    // ARRANGE
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: "Web part desciption",
        listsService: new MockListsService([
          { Title: "Mocked List", DefaultViewUrl: "https://bing.com" }
        ]),
        cacheProvider: new MockCacheProvider(),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await (reactComponent.instance().componentDidMount() as Promise<void>);
    const element = reactComponent.find("a");

    // ASSERT
    expect(element.length).toEqual(1);
  });

  it('should render 2 items with no cache', async () => {
    // ARRANGE
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: "Web part desciption",
        listsService: new MockListsService([
          { Title: "Mocked List", DefaultViewUrl: "https://bing.com" },
          { Title: "Another List", DefaultViewUrl: "https://bing.com" }
        ]),
        cacheProvider: new MockCacheProvider(),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await (reactComponent.instance().componentDidMount() as Promise<void>);
    const element = reactComponent.find("a");

    // ASSERT
    expect(element.length).toEqual(2);
  });

  it('should render 1 item with primed cache', async () => {
    // ARRANGE
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: "Web part desciption",
        listsService: new MockListsService(null),
        cacheProvider: new MockCacheProvider([
          { Title: "Mocked List", DefaultViewUrl: "https://bing.com" }
        ]),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await (reactComponent.instance().componentDidMount() as Promise<void>);
    const items = reactComponent.find("a");

    // ASSERT
    expect(items.length).toEqual(1);
  });

  it('should render 1 item with primed cache', async () => {
    // ARRANGE
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: "Web part desciption",
        listsService: new MockListsService(null),
        cacheProvider: new MockCacheProvider([
          { Title: "Mocked List", DefaultViewUrl: "https://bing.com" },
          { Title: "Another List", DefaultViewUrl: "https://bing.com" }
        ]),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await (reactComponent.instance().componentDidMount() as Promise<void>);
    const items = reactComponent.find("a");

    // ASSERT
    expect(items.length).toEqual(2);
  });

  it('should render description', async () => {
    // ARRANGE
    const webPartDesciption = "Web part desciption";
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: webPartDesciption,
        listsService: new MockListsService([]),
        cacheProvider: new MockCacheProvider([]),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await (reactComponent.instance().componentDidMount() as Promise<void>);
    const items = reactComponent.find("a");

    // ACT
    const element = reactComponent.first("div");

    // ASSERT
    expect(element.length).toBeGreaterThan(0);
    expect(element.text().trim()).toEqual(webPartDesciption);
  });

  it('should not render empty description', async () => {
    // ARRANGE
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: null,
        listsService: new MockListsService([]),
        cacheProvider: new MockCacheProvider([]),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await (reactComponent.instance().componentDidMount() as Promise<void>);
    const items = reactComponent.find("a");

    // ACT
    const element = reactComponent.first("div");

    // ASSERT
    expect(element.length).toBeGreaterThan(0);
    expect(element.text().trim()).toEqual("");
  });

});

// Usefull links:
// https://reactjs.org/docs/test-renderer.html
// https://github.com/airbnb/enzyme