/// <reference types="jest" />

import * as React from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';

import { IIceCreamShopProps } from '../components/IIceCreamShopProps';
import { IIceCreamShopState } from '../components/IIceCreamShopState';
import IceCreamShop from '../components/IceCreamShop';
import { IceCreamFakeProvider } from '../iceCreamProviders/IceCreamFakeProvider';

configure({ adapter: new Adapter() });

describe('Call the component methods', () => {

  let reactComponent: ShallowWrapper<IIceCreamShopProps, IIceCreamShopState>;

  beforeEach(() => {
    reactComponent = shallow(React.createElement(
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

  it('should call fail validation if wrong state', () => {

    // set state
    reactComponent.setState({ selectedIceCream: null, quantity: 1 });

    // get the wrapper instance
    const instance = reactComponent.instance() as IceCreamShop;
    const isValid = instance.isValid();
    expect(isValid).toBe(false);
  });

  it('should call pass validation if wrong state', () => {

    // set state
    reactComponent.setState({ selectedIceCream: { UniqueId: "123", Title: "abc", Price: 13 }, quantity: 1 });

    // get the wrapper instance
    const instance = reactComponent.instance() as IceCreamShop;
    const isValid = instance.isValid();
    expect(isValid).toBe(true);
  });

  it('should select the proper item when selectHandler called', () => {

    // set state
    reactComponent.setState({ selectedIceCream: null, quantity: 1 });

    // get the wrapper instance
    const instance = reactComponent.instance() as IceCreamShop;
    instance.selectHandler({ UniqueId: "123", Title: "abc", Price: 13 });

    expect(reactComponent.state().selectedIceCream.UniqueId).toBe("123");
    expect(reactComponent.state().selectedIceCream.Title).toBe("abc");
    expect(reactComponent.state().selectedIceCream.Price).toBe(13);
  });

  it('should change the quantity successfully', () => {

    // set state
    reactComponent.setState({ selectedIceCream: { UniqueId: "123", Title: "abc", Price: 2 }, quantity: 1 });

    // get the wrapper instance
    const instance = reactComponent.instance() as IceCreamShop;
    instance.quantityChangeHandler({ target: { value: 22 } } as React.ChangeEvent<any>);

    expect(reactComponent.state().quantity).toBe(22);
  });

  it('should re-calculate new price based on quantity change', () => {

    // set state
    reactComponent.setState({ selectedIceCream: { UniqueId: "123", Title: "abc", Price: 2 }, quantity: 1 });

    // get the wrapper instance
    const instance = reactComponent.instance() as IceCreamShop;
    instance.quantityChangeHandler({ target: { value: 10 } } as React.ChangeEvent<any>);

    expect(reactComponent.state().totalPrice).toBe(10 * 2); // quantity = 10, price = 2
  });

  it('should not show success buyHandler called by the form is not valid', (done) => {

    // set state
    reactComponent.setState({ selectedIceCream: { UniqueId: "123", Title: "abc", Price: 2 }, quantity: -1 });

    // get the wrapper instance
    const instance = reactComponent.instance() as IceCreamShop;
    instance.buyHandler();

    // since the buyHandler is a void method,
    // we do not know when the promise inside will resolve
    // this is why we have to add timeout and expect to be 
    // resolved after the timeout
    setTimeout(() => {
      expect(reactComponent.state().hasBoughtIceCream).toBe(false);
      done();
    }, 10);
  });

  it('should show success message after buy success', (done) => {

    // set state
    reactComponent.setState({ selectedIceCream: { UniqueId: "123", Title: "abc", Price: 2 }, quantity: 1 });

    // get the wrapper instance
    const instance = reactComponent.instance() as IceCreamShop;
    instance.buyHandler();

    // since the buyHandler is a void method,
    // we do not know when the promise inside will resolve
    // this is why we have to add timeout and expect to be 
    // resolved after the timeout
    setTimeout(() => {

      expect(reactComponent.state().hasBoughtIceCream).toBe(true);
      done();
    }, 10);
  });
});
