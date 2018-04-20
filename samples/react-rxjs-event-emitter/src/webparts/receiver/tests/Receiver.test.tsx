/// <reference types="mocha" />
/// <reference types="sinon" />
import * as React from 'react';
import { assert } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import Receiver from "../components/Receiver";

import { EventData } from "../../../libraries/rxJsEventEmitter/EventData";
import { RxJsEventEmitter } from "../../../libraries/rxJsEventEmitter/RxJsEventEmitter";

declare const sinon: sinon.SinonStatic;

describe('ReceiverWebPart', () => {

  let rxJsEventEmitterOnSpy: sinon.SinonSpy;
  let receivedEventSpy: sinon.SinonSpy;
  let receiver: ReactWrapper<Receiver, any>;
  let eventEmitter: RxJsEventEmitter = RxJsEventEmitter.getInstance();

  beforeEach(() => {

    // create spies so we test if event is triggered.
    rxJsEventEmitterOnSpy = sinon.spy(RxJsEventEmitter.prototype, "on");
    receivedEventSpy = sinon.spy(Receiver.prototype, "receivedEvent");

    // mount the Receiver so we can test it.
    receiver = mount(<Receiver />);
  });

  afterEach(() => {
    receiver.unmount();
    rxJsEventEmitterOnSpy.restore();
    receivedEventSpy.restore();
  });

  it('should Receiver be subscribed by event name', () => {

    assert(rxJsEventEmitterOnSpy.calledOnce === true);
    assert(rxJsEventEmitterOnSpy.calledWith("myCustomEvent:start", sinon.match.any) === true);
  });

  it('should Receive an event and call the receivedEvent function', () => {

    let data: EventData = { currentNumber: 1 };

    // emit the data so we can test if it has been received by the receivedEvent function.
    eventEmitter.emit("myCustomEvent:start", data);

    assert(receivedEventSpy.calledOnce === true);
    assert(receivedEventSpy.calledWith(data) === true);
  });
});
