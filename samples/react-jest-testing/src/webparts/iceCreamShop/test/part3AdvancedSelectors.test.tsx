/// <reference types="jest" />

import * as React from 'react';
import { configure, mount, ReactWrapper} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';

import { IIceCreamShopProps } from '../components/IIceCreamShopProps';
import { IIceCreamShopState } from '../components/IIceCreamShopState';
import IceCreamShop from '../components/IceCreamShop';
import { IceCreamFakeProvider } from '../iceCreamProviders/IceCreamFakeProvider';

configure({ adapter: new Adapter() });

describe('Advanced selectors', () => {

  let reactComponent: ReactWrapper<IIceCreamShopProps, IIceCreamShopState>;

  beforeEach(() => {

    reactComponent = mount(React.createElement(
      IceCreamShop,
      {
        iceCreamProvider: new IceCreamFakeProvider(),
        strings: {} as IIceCreamShopWebPartStrings
      }
    ));
  });

  afterEach(() => {
    reactComponent.unmount();
  });

  it('should show a list of ice cream flavours', () => {

      reactComponent.update();

      // get the component as dom
      const componentAsDOM = reactComponent.getDOMNode();

      // use JavaScript querySelectorAll to find nodes that contain text
      const flavours = componentAsDOM.querySelectorAll("[data-automationid*='item-']");

      expect(flavours.length).toBe(4);
  }); 
});
// Usefull links:
// https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors
