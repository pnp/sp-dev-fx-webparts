import { Comparer, momentAscComparer } from "common";
import { Moment } from "moment-timezone";
import { IEvent } from "./IEvent";
import { Event } from "./Event";
import React from "react";

export class EventOccurrence implements IEvent {
    public static readonly StartAscComparer: Comparer<EventOccurrence> = (a, b) => momentAscComparer(a.start, b.start);

    constructor(
        public readonly event: Event,
        public readonly start: Moment = event.start.clone(),
        public readonly end: Moment = event.end.clone()
    ) {
    }

    public get displayName() { return this.event.displayName; }
    public get title() { return this.event.title; }
    public get isAllDay() { return this.event.isAllDay; }
    public get location() { return this.event.location; }
    public get color() { return this.event.color; }
    public get tag() { return this.event.tag; }
    public get recurrence() { return this.event.recurrence; }
    public get isPendingApproval() { return this.event.isPendingApproval; }
    public get isApproved() { return this.event.isApproved; }
    public get isRejected() { return this.event.isRejected; }
    public get isRecurring() { return this.event.isRecurring; }
    public get isSeriesMaster() { return false; } // an event occurrence is never the series master
    public get isSeriesException() { return this.event.isRecurring; } // an event occurrence is always an exception if the event is recurring
    public get isConfidential() { return this.event.isConfidential; }
    public get refinerValues() { return this.event.refinerValues; }
    public get contacts() { return this.event.contacts; }
    public get description() { return this.event.description ? this.event.description : undefined; }
    public get recurrenceExceptionInstanceDate() { return this.event.recurrenceExceptionInstanceDate; }
    public get created(){ return this.event.created; }
    public get createdBy(){ return this.event.creator; }
    public get modified(){ return this.event.modified; }
    public get modifiedBy(){ return this.event.editor; }
   

    public getWrappedEvent(): Event {
        return this.event;
    }

    public getSeriesMaster(): Event {
        return this.event.getSeriesMaster();
    }

    public convertToPlainText(html:any) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    public parseHTML(htmlString: string): (JSX.Element | string)[] {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        const elements = Array.from(doc.body.childNodes);
        const inlineStyles = {
            margin: 0,
            padding: 0,
            lineHeight: 1.2 // Adjust this value as needed
        };
        return elements.map((element, index) => {
            const key = `htmlElement_${index}`;
            switch (element.nodeType) {
                case Node.ELEMENT_NODE:
                    const tagName = (element as HTMLElement).tagName.toLowerCase();
                    const attributes: { [key: string]: any } = { key, style: inlineStyles };
                    //const attributes: { [key: string]: string } = {};
                    if (element instanceof HTMLElement) {
                        Array.from(element.attributes).forEach(attribute => {
                            attributes[attribute.name] = attribute.value;
                        });
                    }
                    return React.createElement(tagName, { key, ...attributes }, ...this.parseHTML((element as HTMLElement).innerHTML));
                case Node.TEXT_NODE:
                    return element.nodeValue;
                default:
                    return null;
            }
        });
    }
    

    public getExceptionOrEvent(): Event {
        if (this.event.isSeriesMaster) {
            return this.event.createSeriesException(this.start, this.end);
        } else {
            return this.event;
        }
    }
}