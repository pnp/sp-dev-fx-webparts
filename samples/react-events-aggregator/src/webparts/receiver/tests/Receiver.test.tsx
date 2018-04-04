/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { assert } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { IEventAggregator, IEvent } from "@microsoft/sp-webpart-base/lib";
import EventAggregator from "@microsoft/sp-webpart-base/lib/core/events/EventAggregator";
import Receiver from "../components/Receiver";
import { EventData } from "../../../sharedLibs/EventData";

declare const sinon: sinon.SinonStatic;

describe('ReceiverWebPart', () => {

  let subscribeByEventNameSpy: sinon.SinonSpy;
  let subscribeBySourceIdSpy: sinon.SinonSpy;
  let receivedEventSpy: sinon.SinonSpy;
  let receiver: ReactWrapper<Receiver, any>;
  let eventAggregator: IEventAggregator = new EventAggregator();

  beforeEach(() => {

    // create spies so we test if event is triggered.
    subscribeByEventNameSpy = sinon.spy(EventAggregator.prototype, "subscribeByEventName");
    subscribeBySourceIdSpy = sinon.spy(EventAggregator.prototype, "subscribeBySourceId");
    receivedEventSpy = sinon.spy((Receiver.prototype as any), "receivedEvent");

    // mount the Receiver so we can test it.
    receiver = mount(<Receiver eventAggregator={eventAggregator} subscriberId="123" />);
  });

  afterEach(()=>{
    receiver.unmount();
    subscribeByEventNameSpy.restore();
    subscribeBySourceIdSpy.restore();
    receivedEventSpy.restore();
  });

  it('should Receiver be subscribed by event name', () => {

    assert(subscribeByEventNameSpy.calledOnce === true);
    assert(subscribeByEventNameSpy.calledWith("myCustomEvent:start", "123", sinon.match.any) === true);
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

    assert(receivedEventSpy.calledOnce === true);
    assert(receivedEventSpy.calledWith(eventName, eventObject) === true);
  });
});
