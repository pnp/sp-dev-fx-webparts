/// <reference types="jest" />

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';

import { IIceCreamShopProps } from '../components/IIceCreamShopProps';
import { IIceCreamShopState } from '../components/IIceCreamShopState';
import IceCreamShop from '../components/IceCreamShop';
import { IceCreamFakeProvider } from '../iceCreamProviders/IceCreamFakeProvider';

import * as sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('Sinon basic spy', () => {

    let reactComponent: ReactWrapper<IIceCreamShopProps, IIceCreamShopState>;
    let selectHandlerSpy: sinon.SinonSpy;

    beforeEach(() => {

        // set spy on the select handler
        selectHandlerSpy = sinon.spy(IceCreamShop.prototype, 'selectHandler');

        // mount the component
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
        selectHandlerSpy.restore();
    });

    it('should handler be called once', () => {

        reactComponent.update();

        // more advanced selector
        const selectIceCreamButton = reactComponent.find("#iceCreamFlavoursList button").first();

        selectIceCreamButton.simulate('click'); 

        // after the selectIceCreamButton is clicked   
        // the buy form should be rendered
        // lets try to find in in the component
        const buyForm = reactComponent.find("#buyForm");

        expect(selectHandlerSpy.calledOnce).toBe(true);
    });

    it('should handler be called with the right parameters', () => {

        reactComponent.update();

        // more advanced selector
        const selectIceCreamButton = reactComponent.find("#iceCreamFlavoursList button").first();

        selectIceCreamButton.simulate('click');

        // after the selectIceCreamButton is clicked   
        // the buy form should be rendered
        // lets try to find in in the component
        const buyForm = reactComponent.find("#buyForm");

        expect(selectHandlerSpy.calledWith({ UniqueId: "1", Title: "Cherry" })).toBe(true); 
    });
});
// http://sinonjs.org/
