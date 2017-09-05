/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import Broadcaster from "../components/Broadcaster";

import { EventData } from "../../../libraries/rxJsEventEmitter/EventData";
import { RxJsEventEmitter } from "../../../libraries/rxJsEventEmitter/RxJsEventEmitter";

declare const sinon: any;

describe('BroadcasterWebPart', () => {

  let rxJsEventEmitterEmitSpy: any;
  let broadcastDataSpy: any;
  let broadcaster: ReactWrapper<Broadcaster, any>;

  before(() => {

    // create spies so we test if event is triggered.
    rxJsEventEmitterEmitSpy = sinon.spy(RxJsEventEmitter.prototype, "emit");
    broadcastDataSpy = sinon.spy(Broadcaster.prototype, "broadcastData");

    // mount the Broadcaster so we can test it.
    broadcaster = mount(<Broadcaster />);
  });

  it('should broadcast message with number 1', () => {

    let currentEventNumber: number = 1;

    // we click on the button to raise new event.
    broadcaster.find("#BroadcastButton").simulate("click");

    // check if event is broadcasted.
    expect(broadcastDataSpy.calledOnce).to.be.true;
    expect(broadcaster.state().eventNumber).to.be.eq(currentEventNumber);
    expect(rxJsEventEmitterEmitSpy.calledOnce).to.be.true;
    expect(rxJsEventEmitterEmitSpy.calledWith("myCustomEvent:start",
    { currentNumber: currentEventNumber } as EventData)).to.be.true;
  });


  it('should broadcast message with number 2', () => {

    let currentEventNumber: number = 2;

    // broadcast second event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");

    expect(broadcastDataSpy.calledTwice).to.be.true;
    expect(broadcaster.state().eventNumber).to.be.eq(currentEventNumber);
    expect(rxJsEventEmitterEmitSpy.calledTwice).to.be.true;
    expect(rxJsEventEmitterEmitSpy.calledWith("myCustomEvent:start",
    { currentNumber: currentEventNumber } as EventData)).to.be.true;
  });


  it('should fail on wrong message', () => {

    let currentEventNumber: number = 3;
    let wrongEventNumber: number = 99999;

    // broadcast third event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");

    expect(broadcastDataSpy.calledThrice).to.be.true;
    expect(broadcaster.state().eventNumber).to.be.eq(currentEventNumber);
    expect(rxJsEventEmitterEmitSpy.calledThrice).to.be.true;
    expect(rxJsEventEmitterEmitSpy.calledWith("myCustomEvent:start",
    { currentNumber: wrongEventNumber } as EventData)).to.be.false;
  });

});
