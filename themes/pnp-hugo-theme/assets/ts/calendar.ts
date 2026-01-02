import { NextOccurrence, ICalEvent, ICalFeed } from './ICalFeed';
declare global {
    interface Window {
        baseUrl: string;
    }
}



// Function to fetch calendar data
async function fetchCalendarData(baseUrl: string): Promise<ICalFeed> {
    const url = new URL('./ical/calendar.json', baseUrl);
    const response = await fetch(url.toString());
    return await response.json() as ICalFeed;
}

// Utility to get time one hour from now
function getTimeOneHourFromNow(): Date {
    return new Date(new Date().getTime() + 60 * 60 * 1000);
}

// Utility to calculate duration between two times
function calculateDuration(startTime: Date, endTime: Date): number {
    return endTime.getTime() - startTime.getTime();
}

// Process all events
function processEvents(events: ICalEvent[], idprefix: string = ""): void {
    events.forEach(evt => handleSingleEvent(evt, idprefix));
}

function handleSingleEvent(event: ICalEvent, idprefix: string): void {
    const now = new Date(); // Current time in local timezone
    // Assuming startTime is an ISO string with 'Z' (UTC)
    const startTime = new Date(event.startTime); // Parse as UTC
    const endTime = new Date(event.endTime); // Parse as UTC
    const duration = calculateDuration(startTime, endTime);

    const futureOccurrences = filterFutureOccurrences(event.nextOccurrences, now);
    updateEventStatus(event, idprefix, futureOccurrences, now, duration);
}
function filterFutureOccurrences(occurrences: NextOccurrence[], now: Date): NextOccurrence[] {
    // Convert 'now' to the start of the day in local time for fair comparison
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return occurrences.filter(occurrence => {
        const occurrenceDate = new Date(occurrence.date); // Parse as UTC
        return occurrenceDate >= startOfToday;
    });
}

function updateEventStatus(event: ICalEvent, idprefix: string, futureOccurrences: NextOccurrence[], now: Date, duration: number): void {
    // Example of updating DOM elements based on the event data
    futureOccurrences.forEach(occurrence => {
        if (!occurrence) {
            return;
        }

        const cardId = occurrence.recurrenceId ? `${idprefix}${event.uid}-${occurrence.recurrenceId}` : `${idprefix}${event.uid}`;
        const card = document.getElementById(cardId);
        if (!card) {
            //console.log('No card found with id:', cardId);
            return;
        }

        const occurrenceStartTime = new Date(occurrence.date);
        const occurrenceEndTime = new Date(occurrenceStartTime.getTime() + duration);

        if (occurrence.status === "cancelled") {

            if (occurrence.summary && (occurrence.summary.toLowerCase().startsWith('hiatus') || occurrence.summary.toLowerCase().startsWith('on hiatus'))) {
                const statusMessage = extractOccurrenceSummary(occurrence.summary, event.summary) || 'On Hiatus';
                setCardStatus(card, 'hiatus', statusMessage);
            } else {
                const statusMessage = extractOccurrenceSummary(occurrence.summary, event.summary) || 'Cancelled';
                setCardStatus(card, 'cancelled', statusMessage);
            }
        } else if (now >= occurrenceStartTime && now <= occurrenceEndTime) {
            console.log('Event is currently happening.');
            setCardStatus(card, 'live', 'Live');
        } else if (getTimeOneHourFromNow() >= occurrenceStartTime && now < occurrenceStartTime && occurrence.status === "scheduled") {
            console.log('Event is starting soon.');
            setCardStatus(card, 'soon', 'Starting soon');
        } else if (occurrenceStartTime.toDateString() === now.toDateString()) {
            console.log('Event starts today.');
            setCardStatus(card, 'today', 'Today 📆');
        } else if (occurrence.status === "moved") {
            const statusMessage = extractOccurrenceSummary(occurrence.summary, event.summary) || 'Moved';
            setCardStatus(card, 'moved', statusMessage);
        }
    });
}


function setCardStatus(card: HTMLElement, statusClass: string, statusText: string): void {
    const status = card?.querySelector('.card-status-outer');
    if (status) {
        status.innerHTML = `<div class="card-status ${statusClass}">${statusText}</div>`;
    }
}

// Main function that starts the process
async function updateEvents(): Promise<void> {
    const calendarData = await fetchCalendarData(window.baseUrl);

    // Only do this for the events page
    if (document.getElementById("events-container")) {
        processEvents(calendarData.events);
    }

    if (document.getElementById("calendar-container")) {
        generateCalendar(calendarData.events);
        processEvents(calendarData.events, "calendar-");
    }
}

function generateCalendar(events: ICalEvent[]): void {
    const today: Date = new Date();
    let thisMonday: Date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const firstMonday = thisMonday;

    // Calculate the day of the week (0 for Sunday, 1 for Monday, etc.) in UTC
    let dayOfWeek: number = today.getUTCDay();
    let offset: number = dayOfWeek - 1; // Calculate the offset to get to Monday
    if (offset < 0) offset = 6; // If today is Sunday, set offset to 6

    // Subtract the offset from the current date to get this Monday
    thisMonday.setUTCDate(thisMonday.getUTCDate() - offset);

    const calendarContainer: HTMLElement | null = document.getElementById('calendar-container');
    if (calendarContainer) {
        calendarContainer.innerHTML = ''; // Clear previous entries

        for (let i: number = 0; i < 12; i++) { // Generate for 12 days (for demonstration)

            // Skip weekends
            if (thisMonday.getUTCDay() !== 0 && thisMonday.getUTCDay() !== 6) {
                const liElem: HTMLLIElement = document.createElement('li');

                const articleElem: HTMLElement = document.createElement('article');
                articleElem.className = 'card upcoming';

                const divElem: HTMLDivElement = document.createElement('div');
                divElem.className = 'upcoming-content';

                const headerElem: HTMLElement = document.createElement('header');
                headerElem.className = 'card-upcoming-title';

                const timeElem: HTMLTimeElement = document.createElement('time');
                timeElem.setAttribute('datetime', thisMonday.toISOString());

                const dayElem: HTMLDivElement = document.createElement('div');
                dayElem.className = 'day';
                dayElem.textContent = thisMonday.getUTCDate().toString(); // UTC date for display

                const weekdayElem: HTMLDivElement = document.createElement('div');
                weekdayElem.className = 'weekday';
                weekdayElem.textContent = thisMonday.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });

                const menuElem: HTMLMenuElement = document.createElement('menu');
                menuElem.className = 'upcoming-list';

                // Append elements
                timeElem.appendChild(dayElem);
                timeElem.appendChild(weekdayElem);
                headerElem.appendChild(timeElem);
                divElem.appendChild(headerElem);
                divElem.appendChild(menuElem);
                articleElem.appendChild(divElem);
                liElem.appendChild(articleElem);

                // Processing events
                let eventsForTheDay: { uid: string, summary: string, date: Date, endDate: Date, joinUrl: null | string, status: string, recurrenceId: undefined|string }[] = [];

                events.forEach(event => {
                    event.nextOccurrences.forEach(occurrence => {
                        let occurrenceDate: Date = new Date(occurrence.date);
                        let formattedDate: string = occurrenceDate.toISOString().split('T')[0];
                        let eventNormalStartDate: Date = new Date(event.startTime);
                        let eventNormalEndDate: Date = new Date(event.endTime);
                        let eventDuration: number = calculateDuration(eventNormalStartDate, eventNormalEndDate);

                        // Calculate the endDate for the occurrence based on the duration of the event
                        let occurrenceEndDate: Date = new Date(occurrenceDate.getTime() + eventDuration);

                        if (formattedDate === thisMonday.toISOString().split('T')[0]) {
                            eventsForTheDay.push({
                                uid: event.uid,
                                summary: event.summary,
                                date: occurrenceDate,
                                endDate: occurrenceEndDate,
                                joinUrl: event.joinUrl,
                                status: occurrence.status,
                                recurrenceId: occurrence.recurrenceId
                            });
                        }
                    });
                });

                // Sort the events for the day by date
                eventsForTheDay.sort((a, b) => a.date.getTime() - b.date.getTime());

 
                    // Render the events for the day
                    eventsForTheDay.forEach(event => {
                        const liElem: HTMLLIElement = document.createElement('li');
                        liElem.id = event.recurrenceId ? `calendar-${event.uid}-${event.recurrenceId}` :`calendar-${event.uid}`;

                        const divElem: HTMLDivElement = document.createElement('div');
                        divElem.className = 'event-details';

                        const timeElem: HTMLTimeElement = document.createElement('time');
                        timeElem.className = 'event-start';
                        let formattedTime: string = event.date.toLocaleTimeString(navigator.language, { hour: 'numeric', minute: 'numeric' });
                        timeElem.textContent = formattedTime;
                        timeElem.setAttribute('datetime', event.date.toISOString());

                        const h3Elem: HTMLHeadingElement = document.createElement('h3');
                        h3Elem.className = 'event-title';
                        h3Elem.textContent = event.summary;

                        const divStatusOuterElem: HTMLDivElement = document.createElement('div');
                        divStatusOuterElem.className = 'card-status-outer';

                        // Create script element for structured data
                        const scriptElem: HTMLScriptElement = document.createElement('script');
                        scriptElem.type = 'application/ld+json';
                        const structuredData = {
                            "@context": "https://schema.org",
                            "@type": "Event",
                            "name": event.summary,
                            "startDate": event.date.toISOString(),
                            "endDate": event.endDate.toISOString(),
                            "eventStatus": event.status === "moved" ? "https://schema.org/EventRescheduled" : event.status === "cancelled" ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
                            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                            "location": {
                                "@type": "VirtualLocation",
                                "url": event.joinUrl
                            },
                            "organizer": {
                                "@type": "Organization",
                                "name": "Microsoft 365 & Power Platform Community",
                                "url": "https://pnp.github.io"
                            }
                            // Add other properties as needed
                        };
                        scriptElem.textContent = JSON.stringify(structuredData);

                        // Append elements
                        divElem.appendChild(timeElem);
                        divElem.appendChild(h3Elem);
                        divElem.appendChild(divStatusOuterElem);
                        divElem.appendChild(scriptElem);  // Append script element to liElem
                        liElem.appendChild(divElem);


                        menuElem.appendChild(liElem);
                    });


                calendarContainer.appendChild(liElem);
            }

            // Move to the next day
            thisMonday.setUTCDate(thisMonday.getUTCDate() + 1);
        }
    }
}


function extractOccurrenceSummary(nextOccurrenceSummary: string | undefined, eventSummary: string): string | undefined {
    // Check if the occurrence has an specific message
    let occurrenceSummary: string | undefined = undefined;
    if (nextOccurrenceSummary && nextOccurrenceSummary !== eventSummary) {

        // If the next occurrence summary is shorter than the event summary, set the occurrence summary to the next occurrence summary
        if (nextOccurrenceSummary.length < eventSummary.length) {
            occurrenceSummary = nextOccurrenceSummary;
        } else {
            // remove the event summary length from the start of the occurrence summary
            occurrenceSummary = nextOccurrenceSummary.slice(eventSummary.length);
            occurrenceSummary = occurrenceSummary.trim();

            // If there is a - at the start of the occurrence summary, remove it and trim the string
            if (occurrenceSummary.startsWith('-')) {
                occurrenceSummary = occurrenceSummary.slice(1);
                occurrenceSummary = occurrenceSummary.trim();
            }
        }
    }
    return occurrenceSummary;
}

// Call the function when the page loads
window.addEventListener('DOMContentLoaded', updateEvents);
