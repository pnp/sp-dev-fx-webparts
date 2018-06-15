/// <reference types="jest" />

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import IceCreamShop from '../components/IceCreamShop';
import { IceCreamFakeProvider } from '../iceCreamProviders/IceCreamFakeProvider';
import { IIceCreamShopProps } from '../components/IIceCreamShopProps';
import { IIceCreamShopState } from '../components/IIceCreamShopState';

describe('Enzyme basics', () => {

  let reactComponent: ReactWrapper<IIceCreamShopProps, IIceCreamShopState>;

  beforeEach(() => {

    reactComponent = mount(React.createElement(
      IceCreamShop,
      {
        iceCreamProvider: new IceCreamFakeProvider(),
        strings: {
          TitleLabel: "PnP Ice Cream Shop"
        } as IIceCreamShopWebPartStrings
      }
    ));
  });

  afterEach(() => {
    reactComponent.unmount();
  });

  it('should root web part element exists', () => {

    // define the css selector
    let cssSelector: string = '#iceCreamShop';

    // find the element using css selector
    const element = reactComponent.find(cssSelector);
    expect(element.length).toBeGreaterThan(0);
  });

  it('should has the correct title', () => {

    // Arrange
    // define contains/like css selector
    let cssSelector: string = 'h1';

    // Act
    // find the elemet using css selector
    const text = reactComponent.find(cssSelector).text();

    // Assert
    expect(text).toBe("PnP Ice Cream Shop");  
  });
});

// Usefull links:
// https://reactjs.org/docs/test-renderer.html
// https://github.com/airbnb/enzyme
