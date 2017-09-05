/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { IEventAggregator, IEvent } from "@microsoft/sp-webpart-base/lib";
import EventAggregator from "@microsoft/sp-webpart-base/lib/core/events/EventAggregator";
import Receiver from "../components/Receiver";
import { EventData } from "../../../sharedLibs/EventData";

declare const sinon: any;

describe('ReceiverWebPart', () => {

  let subscribeByEventNameSpy: any;
  let subscribeBySourceIdSpy: any;
  let receivedEventSpy: any;
  let receiver: ReactWrapper<Receiver, any>;
  let eventAggregator: IEventAggregator = new EventAggregator();

  before(() => {

    // create spies so we test if event is triggered.
    subscribeByEventNameSpy = sinon.spy(EventAggregator.prototype, "subscribeByEventName");
    subscribeBySourceIdSpy = sinon.spy(EventAggregator.prototype, "subscribeBySourceId");
    receivedEventSpy = sinon.spy(Receiver.prototype, "receivedEvent");

    // mount the Receiver so we can test it.
    receiver = mount(<Receiver eventAggregator={eventAggregator} subscriberId="123" />);
  });

  it('should Receiver be subscribed by event name', () => {

    expect(subscribeByEventNameSpy.calledOnce).to.be.true;
    expect(subscribeByEventNameSpy.calledWith("myCustomEvent:start", "123", sinon.match.any)).to.be.true;
  });

  it('should Receive an event and call the receivedEvent function', () => {

    let eventName: string = "myCustomEvent:start";

    let eventObject: IEvent<EventData> = {
        data: { currentNumber: 1 },
        sourceId: "BroadcasterWebPart",
        targetId: "ReceiverWebPart"
    };

    // raiseEvent so we can test if it has been received by the receivedEvent function.
    eventAggregator.raiseEvent(eventName, eventObject);

    expect(receivedEventSpy.calledOnce).to.be.true;
    expect(receivedEventSpy.calledWith(eventName, eventObject)).to.be.true;
  });
});
