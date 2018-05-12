/// <reference types="jest" />

import * as React from 'react';
import { configure, mount, ReactWrapper} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';

import { IIceCreamShopProps } from '../components/IIceCreamShopProps';
import { IIceCreamShopState } from '../components/IIceCreamShopState';
import IceCreamShop from '../components/IceCreamShop';
import { IceCreamFakeProvider } from '../iceCreamProviders/IceCreamFakeProvider';

configure({ adapter: new Adapter() });

describe('Enzyme props, state, lifecycle events test', () => {

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

  it('should has test title is the props', () => {

    expect(reactComponent.props().strings.TitleLabel).toBe("PnP Ice Cream Shop");
  });

  it('should has initial state', () => {

    const state = reactComponent.state();
    
    expect(state.hasBoughtIceCream).toBe(false); 
    expect(state.quantity).toBe(1);
    expect(state.selectedIceCream).toBe(null);
  });

  it('should buy form be hidden initialy', () => {

    const buyForm = reactComponent.find("#buyForm");  

    expect(buyForm.length).toBe(0);
  });

  it('should unhide the buy form after ice cream has been selected', () => {

      reactComponent.update(); // http://airbnb.io/enzyme/docs/api/ShallowWrapper/update.html

      // more advanced selector
      const selectIceCreamButton = reactComponent.find("#iceCreamFlavoursList button").first();     
      
      selectIceCreamButton.simulate('click'); 

      // after the selectIceCreamButton is clicked   
      // the buy form should be rendered
      // lets try to find in in the component
      const buyForm = reactComponent.find("#buyForm");
      
      expect(buyForm.length).toBeGreaterThan(0);
  });
});
