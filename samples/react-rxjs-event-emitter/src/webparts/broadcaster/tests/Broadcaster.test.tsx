/// <reference types="mocha" />
/// <reference types="sinon" />
import * as React from 'react';
import { assert } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import Broadcaster from "../components/Broadcaster";

import { EventData } from "../../../libraries/rxJsEventEmitter/EventData";
import { RxJsEventEmitter } from "../../../libraries/rxJsEventEmitter/RxJsEventEmitter";

declare const sinon: sinon.SinonStatic;

describe('BroadcasterWebPart', () => {

  let rxJsEventEmitterEmitSpy: sinon.SinonSpy;
  let broadcastDataSpy: sinon.SinonSpy;
  let broadcaster: ReactWrapper<Broadcaster, any>;

  beforeEach(() => {

    // create spies so we test if event is triggered.
    rxJsEventEmitterEmitSpy = sinon.spy((RxJsEventEmitter.prototype as any), "emit");
    broadcastDataSpy = sinon.spy((Broadcaster.prototype as any), "broadcastData");

    // mount the Broadcaster so we can test it.
    broadcaster = mount(<Broadcaster />);
  });

  afterEach(() => {
    broadcaster.unmount();
    rxJsEventEmitterEmitSpy.restore();
    broadcastDataSpy.restore();
  });

  it('should broadcast message with number 1', () => {

    let currentEventNumber: number = 1;

    // we click on the button to raise new event.
    broadcaster.find("#BroadcastButton").simulate("click");

    // check if event is broadcasted.
    assert(broadcastDataSpy.calledOnce === true);
    assert(broadcaster.state().eventNumber === currentEventNumber);
    assert(rxJsEventEmitterEmitSpy.calledOnce === true);
    assert(rxJsEventEmitterEmitSpy.calledWith("myCustomEvent:start",
      { currentNumber: currentEventNumber } as EventData) === true);
  });


  it('should broadcast message with number 2', () => {

    let currentEventNumber: number = 2;
    
    broadcaster.find("#BroadcastButton").simulate("click");
    // broadcast second event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");

    assert(broadcastDataSpy.calledTwice === true);
    assert(broadcaster.state().eventNumber === currentEventNumber);
    assert(rxJsEventEmitterEmitSpy.calledTwice === true);
    assert(rxJsEventEmitterEmitSpy.calledWith("myCustomEvent:start",
      { currentNumber: currentEventNumber } as EventData) === true);
  });

  it('should fail on wrong message', () => {

    let currentEventNumber: number = 3;
    let wrongEventNumber: number = 99999;

    broadcaster.find("#BroadcastButton").simulate("click");
    // broadcast second event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");
    // broadcast third event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");

    assert(broadcastDataSpy.calledThrice === true);
    assert(broadcaster.state().eventNumber === currentEventNumber);
    assert(rxJsEventEmitterEmitSpy.calledThrice === true);
    assert(rxJsEventEmitterEmitSpy.calledWith("myCustomEvent:start",
      { currentNumber: wrongEventNumber } as EventData) === false);
  });

});
