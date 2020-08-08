/// <reference types="jest" />

import * as React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

import ListOfLists, { IListOfListsProps, IListOfListsState } from './ListOfLists';
import MockListsService from '../../../common/services/Lists/MockListsService';
import MockCacheProvider from '../../../common/providers/Cache/MockCacheProvider';
import MockLogProvider from '../../../common/providers/Log/MockLogProvider';

describe('Component: ListOfLists', () => {

  let reactComponent: ShallowWrapper<IListOfListsProps, IListOfListsState, ListOfLists>;

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
    const element = reactComponent.find("div");

    // ASSERT
    expect(element.length).toBeGreaterThan(0);
    expect(element.first().text().trim()).toEqual("Loading...");
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
    await reactComponent.instance().componentDidMount();
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
    await reactComponent.instance().componentDidMount();
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
        listsService: new MockListsService([]),
        cacheProvider: new MockCacheProvider([
          { Title: "Mocked List", DefaultViewUrl: "https://bing.com" }
        ]),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await reactComponent.instance().componentDidMount();
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
        listsService: new MockListsService([]),
        cacheProvider: new MockCacheProvider([
          { Title: "Mocked List", DefaultViewUrl: "https://bing.com" },
          { Title: "Another List", DefaultViewUrl: "https://bing.com" }
        ]),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await reactComponent.instance().componentDidMount();
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
    await reactComponent.instance().componentDidMount();

    // ACT
    const element = reactComponent.find("div");

    // ASSERT
    expect(element.length).toBeGreaterThan(0);
    expect(element.first().text().trim()).toEqual(webPartDesciption);
  });

  it('should not render empty description', async () => {
    // ARRANGE
    reactComponent = shallow(React.createElement(
      ListOfLists,
      {
        description: "",
        listsService: new MockListsService([]),
        cacheProvider: new MockCacheProvider([]),
        logProvider: new MockLogProvider()
      }
    ));

    // ACT
    await reactComponent.instance().componentDidMount();

    // ACT
    const element = reactComponent.find("div");

    // ASSERT
    expect(element.length).toBeGreaterThan(0);
    expect(element.first().text().trim()).toEqual("");
  });

});

// Useful links:
// https://reactjs.org/docs/test-renderer.html
// https://github.com/airbnb/enzyme