/// <reference types="jest" />

import * as React from 'react';
import { configure, mount, ReactWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';

import { IceCreamPnPJsProvider } from '../iceCreamProviders/IceCreamPnPJsProvider';
import { IceCream } from '../iceCreamProviders/IceCream';
import { sp, SearchResults, Items } from "@pnp/sp";

import * as sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('Stub pnp js to test the provider', () => {

  let myPnPJsProvider: IceCreamPnPJsProvider;
  let pnpSearchStub: sinon.SinonStub;
  let pnpItemsAddStub: sinon.SinonStub;
  let pnpListGetByTitleStub: sinon.SinonStub;

  beforeEach(() => {
    // set stubs on the pnp js mathods
    pnpSearchStub = sinon.stub(sp, "search");
    pnpListGetByTitleStub = sinon.stub(sp.web.lists, "getByTitle");
    pnpItemsAddStub = sinon.stub(Items.prototype, "add");

    // create instance of the pnp js provider to test it
    myPnPJsProvider = new IceCreamPnPJsProvider(sp);
  });

  afterEach(() => {
    pnpSearchStub.restore();
    pnpListGetByTitleStub.restore();
    pnpItemsAddStub.restore();
  });

  it('should return array of 3 items when sp.search called', (done) => {

    // mocks the search api so it returns exactly whan we
    // want and no https calls are made
    pnpSearchStub.resolves({
      PrimarySearchResults: [
        { UniqueId: "GUID1", Title: "Cherry", PriceOWSNMBR: 1 },
        { UniqueId: "GUID2", Title: "Chocolate", PriceOWSNMBR: 2 },
        { UniqueId: "GUID3", Title: "Coffee and Cookie", PriceOWSNMBR: 3 }
      ]
    });

    // call the stub and see if the provider works as expected
    myPnPJsProvider.getAll()
    .then((result: IceCream[]) => { 
 
      expect(result.length).toBeGreaterThan(0); 
      done();
    }).catch(e => {
      
      done.fail(new Error('Filed to retrieve data.'));
      // done();
    });
  });

  it('should pnp add new item be called', (done) => {

    // mocks the sp.list.getByTitle api so it resolves with success
    pnpListGetByTitleStub.resolves();
    // mocks the sp...items.add api so it resolves with success
    pnpItemsAddStub.resolves(); 
    
    // test my pnp provider now
    myPnPJsProvider.buy("123", 1)
    .then(result => { 

      expect(result).toBe(undefined); // since buy is void method  
      done();
    }).catch(e => { 
      
      done.fail(new Error('Filed to retrieve data.'));
      // done();
    });
  });
});
// https://facebook.github.io/jest/docs/en/tutorial-async.html

