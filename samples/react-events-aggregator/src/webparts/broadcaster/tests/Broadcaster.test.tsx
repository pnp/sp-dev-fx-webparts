/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { IEventAggregator, IEvent } from "@microsoft/sp-webpart-base/lib";
import EventAggregator from "@microsoft/sp-webpart-base/lib/core/events/EventAggregator";
import Broadcaster from "../components/Broadcaster";
import { EventData } from "../../../sharedLibs/EventData";

declare const sinon: any;

describe('BroadcasterWebPart', () => {

  let raiseEventSpy: any;
  let broadcastDataSpy: any;
  let broadcaster: ReactWrapper<Broadcaster, any>;

  before(() => {

    // new instance of the event aggregator to be used with the react broadcaster.
    let eventAggregator: IEventAggregator = new EventAggregator();

    // create spies so we test if event is triggered.
    raiseEventSpy = sinon.spy(EventAggregator.prototype, "raiseEvent");
    broadcastDataSpy = sinon.spy(Broadcaster.prototype, "broadcastData");

    // mount the Broadcaster so we can test it.
    broadcaster = mount(<Broadcaster eventAggregator={eventAggregator} />);
  });

  it('should broadcast message with number 1', () => {

    let currentEventNumber: number = 1;
    
    // we click on the button to raise new event.
    broadcaster.find("#BroadcastButton").simulate("click");

    // check if event is broadcasted.
    expect(broadcastDataSpy.calledOnce).to.be.true;
    expect(broadcaster.state().eventNumber).to.be.eq(currentEventNumber);
    expect(raiseEventSpy.calledOnce).to.be.true;
    expect(raiseEventSpy.calledWith("myCustomEvent:start",
      {
        data: { currentNumber: currentEventNumber },
        sourceId: "BroadcasterWebPart",
        targetId: "ReceiverWebPart"
      } as IEvent<EventData>)).to.be.true;
  });


  it('should broadcast message with number 2', () => {

    let currentEventNumber: number = 2;
    
    // broadcast second event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");

    expect(broadcastDataSpy.calledTwice).to.be.true;
    expect(broadcaster.state().eventNumber).to.be.eq(currentEventNumber);
    expect(raiseEventSpy.calledTwice).to.be.true;
    expect(raiseEventSpy.calledWith("myCustomEvent:start",
      {
        data: { currentNumber: currentEventNumber },
        sourceId: "BroadcasterWebPart",
        targetId: "ReceiverWebPart"
      } as IEvent<EventData>)).to.be.true;
  });


  it('should fail on wrong message', () => {

    let currentEventNumber: number = 3;

    // broadcast third event and check the data send.
    broadcaster.find("#BroadcastButton").simulate("click");

    expect(broadcastDataSpy.calledThrice).to.be.true;
    expect(broadcaster.state().eventNumber).to.be.eq(currentEventNumber);
    expect(raiseEventSpy.calledThrice).to.be.true;
    expect(raiseEventSpy.calledWith("myCustomEvent:start",
      {
        data: { currentNumber: currentEventNumber },
        sourceId: "<Wrong_Message>",
        targetId: "ReceiverWebPart"
      } as IEvent<EventData>)).to.be.false;
  });

});
