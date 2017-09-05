/// <reference types="mocha" />
/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import Receiver from "../components/Receiver";

import { EventData } from "../../../libraries/rxJsEventEmitter/EventData";
import { RxJsEventEmitter } from "../../../libraries/rxJsEventEmitter/RxJsEventEmitter";

declare const sinon: any;

describe('ReceiverWebPart', () => {

  let rxJsEventEmitterOnSpy: any;
  let receivedEventSpy: any;
  let receiver: ReactWrapper<Receiver, any>;
  let eventEmitter: RxJsEventEmitter = RxJsEventEmitter.getInstance();

  before(() => {

    // create spies so we test if event is triggered.
    rxJsEventEmitterOnSpy = sinon.spy(RxJsEventEmitter.prototype, "on");
    receivedEventSpy = sinon.spy(Receiver.prototype, "receivedEvent");

    // mount the Receiver so we can test it.
    receiver = mount(<Receiver />);
  });

  it('should Receiver be subscribed by event name', () => {

    expect(rxJsEventEmitterOnSpy.calledOnce).to.be.true;
    expect(rxJsEventEmitterOnSpy.calledWith("myCustomEvent:start", sinon.match.any)).to.be.true;
  });

  it('should Receive an event and call the receivedEvent function', () => {

    let data: EventData = { currentNumber: 1 };

    // emit the data so we can test if it has been received by the receivedEvent function.
    eventEmitter.emit("myCustomEvent:start", data);

    expect(receivedEventSpy.calledOnce).to.be.true;
    expect(receivedEventSpy.calledWith(data)).to.be.true;
  });
});
