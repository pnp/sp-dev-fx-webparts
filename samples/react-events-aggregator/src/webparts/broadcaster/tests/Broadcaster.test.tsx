/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { assert } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { IEventAggregator, IEvent } from "@microsoft/sp-webpart-base/lib";
import EventAggregator from "@microsoft/sp-webpart-base/lib/core/events/EventAggregator";
import Broadcaster from "../components/Broadcaster";
import { EventData } from "../../../sharedLibs/EventData";

declare const sinon: sinon.SinonStatic;

describe('BroadcasterWebPart', () => {

  let raiseEventSpy: sinon.SinonSpy;
  let broadcastDataSpy: sinon.SinonSpy;
  let broadcaster: ReactWrapper<Broadcaster, any>;

  beforeEach(() => {

    // new instance of the event aggregator to be used with the react broadcaster.
    let eventAggregator: IEventAggregator = new EventAggregator();

    // create spies so we test if event is triggered.
    raiseEventSpy = sinon.spy((EventAggregator.prototype as any), "raiseEvent");
    broadcastDataSpy = sinon.spy((Broadcaster.prototype as any), "broadcastData");

    // mount the Broadcaster so we can test it.
    broadcaster = mount(<Broadcaster eventAggregator={eventAggregator} />);
  });

  afterEach(()=> {
    broadcaster.unmount();
    raiseEventSpy.restore();
    broadcastDataSpy.restore();
  });

  it('should broadcast message with number 1', () => {

    let currentEventNumber: number = 1;
    
    // we click on the button to raise new event.
    broadcaster.find("#BroadcastButton").simulate("click");

    // check if event is broadcasted.
    assert(broadcastDataSpy.calledOnce === true);
    assert(broadcaster.state().eventNumber === currentEventNumber);
    assert(raiseEventSpy.calledOnce === true);
    assert(raiseEventSpy.calledWith("myCustomEvent:start",
      {
        data: { currentNumber: currentEventNumber },
        sourceId: "BroadcasterWebPart",
        targetId: "ReceiverWebPart"
      } as IEvent<EventData>) === true);
  });


  it('should broadcast message with number 2', () => {

    let currentEventNumber: number = 2;
    
    // broadcast second event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");
    broadcaster.find("#BroadcastButton").simulate("click");

    assert(broadcastDataSpy.calledTwice === true);
    assert(broadcaster.state().eventNumber === currentEventNumber);
    assert(raiseEventSpy.calledTwice === true);
    assert(raiseEventSpy.calledWith("myCustomEvent:start",
      {
        data: { currentNumber: currentEventNumber },
        sourceId: "BroadcasterWebPart",
        targetId: "ReceiverWebPart"
      } as IEvent<EventData>) === true);
  });


  it('should fail on wrong message', () => {

    let currentEventNumber: number = 1;

    // broadcast third event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");

    assert(broadcastDataSpy.calledOnce === true);
    assert(broadcaster.state().eventNumber === currentEventNumber);
    assert(raiseEventSpy.calledOnce === true);
    
    assert(raiseEventSpy.calledWith("myCustomEvent:start",
      {
        data: { currentNumber: currentEventNumber },
        sourceId: "<Wrong_Message>",
        targetId: "ReceiverWebPart"
      } as IEvent<EventData>) === false);
  });
});
