import moment from "moment-timezone";
import { Recurrence } from "model";
import { RecurDay, RecurPattern, RecurPatternOption, RecurUntilType, RecurWeekOfMonth } from "model/Recurrence";

const daysOfWeek = [
    { attr: 'su', day: RecurDay.sunday },
    { attr: 'mo', day: RecurDay.monday },
    { attr: 'tu', day: RecurDay.tuesday },
    { attr: 'we', day: RecurDay.wednesday },
    { attr: 'th', day: RecurDay.thursday },
    { attr: 'fr', day: RecurDay.friday },
    { attr: 'sa', day: RecurDay.saturday }
];

export class RecurrenceData {
    public static deserialize(data: string): Recurrence {
        const recurrence = new Recurrence();

        if (!data) return recurrence;

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'application/xml');

        const ruleNode = this._evaluate(doc, '/recurrence/rule');
        if (!ruleNode) return recurrence;

        const firstDayOfWeekNode = this._evaluate(doc, 'firstDayOfWeek', ruleNode);
        if (!firstDayOfWeekNode) return recurrence;

        const firstDayOfWeek = firstDayOfWeekNode.textContent;
        recurrence.firstDayOfWeek = firstDayOfWeek;

        const repeatNode = this._evaluate(doc, 'repeat', ruleNode);
        if (!repeatNode) return recurrence;

        const repeatInstancesNode = this._evaluate(doc, 'repeatInstances', ruleNode);
        const repeatForeverNode = this._evaluate(doc, 'repeatForever', ruleNode);
        const windowEndNode = this._evaluate(doc, 'windowEnd', ruleNode);

        if (!(repeatInstancesNode || repeatForeverNode || windowEndNode)) return recurrence;

        const repeatInstances = repeatInstancesNode && parseInt(repeatInstancesNode.textContent);
        const repeatForever = !!repeatForeverNode;
        const windowEnd = windowEndNode && moment(windowEndNode.textContent);

        const { until } = recurrence;
        if (repeatForever) {
            until.type = RecurUntilType.forever;
        } else if (repeatInstances) {
            until.type = RecurUntilType.count;
            until.count = repeatInstances;
        } else if (windowEnd) {
            until.type = RecurUntilType.date;
            until.date = windowEnd.clone();
        }

        const dailyNode = this._evaluate(doc, 'daily', repeatNode);
        const weeklyNode = this._evaluate(doc, 'weekly', repeatNode);
        const monthlyNode = this._evaluate(doc, 'monthly', repeatNode);
        const monthlyByDayNode = this._evaluate(doc, 'monthlyByDay', repeatNode);
        const yearlyNode = this._evaluate(doc, 'yearly', repeatNode);
        const yearlyByDayNode = this._evaluate(doc, 'yearlyByDay', repeatNode);

        if (dailyNode) {
            recurrence.pattern = RecurPattern.daily;
            const { daily } = recurrence;

            if (dailyNode.getAttribute('weekday') === 'TRUE')
                daily.weekdaysOnly = true;
            else
                daily.every = parseInt(dailyNode.getAttribute('dayFrequency'));

            // Examples:
            // <daily weekday=\"TRUE\"/>
            // <daily dayFrequency=\"1\"/>
        }
        else if (weeklyNode) {
            recurrence.pattern = RecurPattern.weekly;
            const { weekly } = recurrence;

            weekly.every = parseInt(weeklyNode.getAttribute('weekFrequency'));

            for (let d = 0; d < daysOfWeek.length; d++) {
                weekly.days[d] = (weeklyNode.getAttribute(daysOfWeek[d].attr) === 'TRUE');
            }

            // Example: <weekly mo=\"TRUE\" fr=\"TRUE\" weekFrequency=\"2\"/>
        }
        else if (monthlyNode) {
            recurrence.pattern = RecurPattern.monthly;
            const { monthly } = recurrence;

            monthly.option = RecurPatternOption.byDate;
            monthly.every = parseInt(monthlyNode.getAttribute('monthFrequency'));
            monthly.byDate.date = parseInt(monthlyNode.getAttribute('day'));

            // Example: <monthly monthFrequency=\"2\" day=\"17\"/>
        }
        else if (monthlyByDayNode) {
            recurrence.pattern = RecurPattern.monthly;
            const { monthly } = recurrence;

            monthly.option = RecurPatternOption.byDay;
            monthly.every = parseInt(monthlyByDayNode.getAttribute('monthFrequency'));

            if (monthlyByDayNode.getAttribute('day') === 'TRUE')
                monthly.byDay.day = RecurDay.day;
            else if (monthlyByDayNode.getAttribute('weekday') === 'TRUE')
                monthly.byDay.day = RecurDay.weekday;
            else if (monthlyByDayNode.getAttribute('weekend_day') === 'TRUE')
                monthly.byDay.day = RecurDay.weekend;
            else
                monthly.byDay.day = daysOfWeek.find(dow => monthlyByDayNode.getAttribute(dow.attr) === 'TRUE')?.day;

            const weekdayOfMonth = monthlyByDayNode.getAttribute('weekdayOfMonth');
            switch (weekdayOfMonth) {
                case 'first':
                    monthly.byDay.weekOf = RecurWeekOfMonth.first; break;
                case 'second':
                    monthly.byDay.weekOf = RecurWeekOfMonth.second; break;
                case 'third':
                    monthly.byDay.weekOf = RecurWeekOfMonth.third; break;
                case 'fourth':
                    monthly.byDay.weekOf = RecurWeekOfMonth.fourth; break;
                case 'last':
                    monthly.byDay.weekOf = RecurWeekOfMonth.last; break;
            }

            // Examples:
            // <monthlyByDay we=\"TRUE\" weekdayOfMonth=\"last\" monthFrequency=\"2\"/>
            // <monthlyByDay weekday=\"TRUE\" weekdayOfMonth=\"last\" monthFrequency=\"1\"/>
            // <monthlyByDay weekend_day=\"TRUE\" weekdayOfMonth=\"first\" monthFrequency=\"1\"/>
        }
        else if (yearlyNode) {
            recurrence.pattern = RecurPattern.yearly;
            const { yearly } = recurrence;

            yearly.option = RecurPatternOption.byDate;
            yearly.every = parseInt(yearlyNode.getAttribute('yearFrequency'));
            yearly.month = parseInt(yearlyNode.getAttribute('month')) - 1; // SPO months are 1 to 12 and Moment months are 0 to 11
            yearly.byDate.date = parseInt(yearlyNode.getAttribute('day'));

            // Example: <yearly yearFrequency=\"1\" month=\"12\" day=\"25\"/>
        }
        else if (yearlyByDayNode) {
            recurrence.pattern = RecurPattern.yearly;
            const { yearly } = recurrence;

            yearly.option = RecurPatternOption.byDay;
            yearly.every = parseInt(yearlyByDayNode.getAttribute('yearFrequency'));
            yearly.month = parseInt(yearlyByDayNode.getAttribute('month')) - 1; // SPO months are 1 to 12 and Moment months are 0 to 11

            if (yearlyByDayNode.getAttribute('day') === 'TRUE')
                yearly.byDay.day = RecurDay.day;
            else if (yearlyByDayNode.getAttribute('weekday') === 'TRUE')
                yearly.byDay.day = RecurDay.weekday;
            else if (yearlyByDayNode.getAttribute('weekend_day') === 'TRUE')
                yearly.byDay.day = RecurDay.weekend;
            else
                yearly.byDay.day = daysOfWeek.find(dow => yearlyByDayNode.getAttribute(dow.attr) === 'TRUE')?.day;

            const weekdayOfMonth = yearlyByDayNode.getAttribute('weekdayOfMonth');
            switch (weekdayOfMonth) {
                case 'first':
                    yearly.byDay.weekOf = RecurWeekOfMonth.first; break;
                case 'second':
                    yearly.byDay.weekOf = RecurWeekOfMonth.second; break;
                case 'third':
                    yearly.byDay.weekOf = RecurWeekOfMonth.third; break;
                case 'fourth':
                    yearly.byDay.weekOf = RecurWeekOfMonth.fourth; break;
                case 'last':
                    yearly.byDay.weekOf = RecurWeekOfMonth.last; break;
            }

            // Example: <yearlyByDay yearFrequency=\"1\" mo=\"TRUE\" weekdayOfMonth=\"third\" month=\"1\"/>
        }

        return recurrence;
    }

    public static serialize(recurrence: Recurrence): string {
        const doc: XMLDocument = document.implementation.createDocument('', '', null);

        const recurrenceNode = doc.createElement('recurrence');
        const ruleNode = doc.createElement('rule');

        const firstDayOfWeekNode = doc.createElement('firstDayOfWeek');
        firstDayOfWeekNode.textContent = recurrence.firstDayOfWeek;
        ruleNode.appendChild(firstDayOfWeekNode);

        const repeatNode = doc.createElement('repeat');

        const { pattern } = recurrence;
        switch (pattern) {
            case RecurPattern.daily: {
                const { daily: { weekdaysOnly, every } } = recurrence;
                const dailyNode = doc.createElement('daily');

                if (weekdaysOnly)
                    dailyNode.setAttribute('weekday', "TRUE");
                else
                    dailyNode.setAttribute('dayFrequency', every.toString());

                repeatNode.appendChild(dailyNode);

                // Examples:
                // <daily dayFrequency=\"1\"/>
                // <daily weekday=\"TRUE\"/>
                break;
            }
            case RecurPattern.weekly: {
                const { weekly: { days, every } } = recurrence;
                const weeklyNode = doc.createElement('weekly');

                for (let d = 0; d < days.length; d++) {
                    if (days[d])
                        weeklyNode.setAttribute(daysOfWeek[d].attr, 'TRUE');
                }

                weeklyNode.setAttribute('weekFrequency', every.toString());

                repeatNode.appendChild(weeklyNode);

                // Example: <weekly mo=\"TRUE\" fr=\"TRUE\" weekFrequency=\"2\"/>
                break;
            }
            case RecurPattern.monthly: {
                const { monthly: { option, every } } = recurrence;

                if (option === RecurPatternOption.byDate) {
                    const { monthly: { byDate: { date } } } = recurrence;
                    const monthlyNode = doc.createElement('monthly');

                    monthlyNode.setAttribute('monthFrequency', every.toString());
                    monthlyNode.setAttribute('day', date.toString());

                    repeatNode.appendChild(monthlyNode);

                    // Example: <monthly monthFrequency=\"2\" day=\"17\"/>
                }
                else if (option === RecurPatternOption.byDay) {
                    const { monthly: { byDay: { day, weekOf } } } = recurrence;
                    const monthlyByDayNode = doc.createElement('monthlyByDay');

                    switch (day) {
                        case RecurDay.day:
                            monthlyByDayNode.setAttribute('day', 'TRUE'); break;
                        case RecurDay.weekday:
                            monthlyByDayNode.setAttribute('weekday', 'TRUE'); break;
                        case RecurDay.weekend:
                            monthlyByDayNode.setAttribute('weekend_day', 'TRUE'); break;
                        default: {
                            const { attr } = daysOfWeek.find(dow => dow.day === day);
                            monthlyByDayNode.setAttribute(attr, 'TRUE'); break;
                        }
                    }

                    switch (weekOf) {
                        case RecurWeekOfMonth.first:
                            monthlyByDayNode.setAttribute('weekdayOfMonth', 'first'); break;
                        case RecurWeekOfMonth.second:
                            monthlyByDayNode.setAttribute('weekdayOfMonth', 'second'); break;
                        case RecurWeekOfMonth.third:
                            monthlyByDayNode.setAttribute('weekdayOfMonth', 'third'); break;
                        case RecurWeekOfMonth.fourth:
                            monthlyByDayNode.setAttribute('weekdayOfMonth', 'fourth'); break;
                        case RecurWeekOfMonth.last:
                            monthlyByDayNode.setAttribute('weekdayOfMonth', 'last'); break;
                    }

                    monthlyByDayNode.setAttribute('monthFrequency', every.toString());

                    repeatNode.appendChild(monthlyByDayNode);

                    // <monthlyByDay we=\"TRUE\" weekdayOfMonth=\"last\" monthFrequency=\"2\"/>
                    // <monthlyByDay weekday=\"TRUE\" weekdayOfMonth=\"last\" monthFrequency=\"1\"/>
                    // <monthlyByDay weekend_day=\"TRUE\" weekdayOfMonth=\"first\" monthFrequency=\"1\"/>
                }

                break;
            }
            case RecurPattern.yearly: {
                const { yearly: { option, month, every } } = recurrence;

                if (option === RecurPatternOption.byDate) {
                    const { yearly: { byDate: { date } } } = recurrence;
                    const yearlyNode = doc.createElement('yearly');

                    yearlyNode.setAttribute('yearFrequency', every.toString());
                    yearlyNode.setAttribute('month', (month + 1).toString()); // SPO months are 1 to 12 and Moment months are 0 to 11
                    yearlyNode.setAttribute('day', date.toString());

                    repeatNode.appendChild(yearlyNode);

                    // Example: <yearly yearFrequency=\"1\" month=\"12\" day=\"25\"/>
                }
                else if (option === RecurPatternOption.byDay) {
                    const { yearly: { byDay: { day, weekOf } } } = recurrence;
                    const yearlyByDayNode = doc.createElement('yearlyByDay');

                    yearlyByDayNode.setAttribute('yearFrequency', every.toString());

                    switch (day) {
                        case RecurDay.day:
                            yearlyByDayNode.setAttribute('day', 'TRUE'); break;
                        case RecurDay.weekday:
                            yearlyByDayNode.setAttribute('weekday', 'TRUE'); break;
                        case RecurDay.weekend:
                            yearlyByDayNode.setAttribute('weekend_day', 'TRUE'); break;
                        default: {
                            const { attr } = daysOfWeek.find(dow => dow.day === day);
                            yearlyByDayNode.setAttribute(attr, 'TRUE'); break;
                        }
                    }

                    switch (weekOf) {
                        case RecurWeekOfMonth.first:
                            yearlyByDayNode.setAttribute('weekdayOfMonth', 'first'); break;
                        case RecurWeekOfMonth.second:
                            yearlyByDayNode.setAttribute('weekdayOfMonth', 'second'); break;
                        case RecurWeekOfMonth.third:
                            yearlyByDayNode.setAttribute('weekdayOfMonth', 'third'); break;
                        case RecurWeekOfMonth.fourth:
                            yearlyByDayNode.setAttribute('weekdayOfMonth', 'fourth'); break;
                        case RecurWeekOfMonth.last:
                            yearlyByDayNode.setAttribute('weekdayOfMonth', 'last'); break;
                    }

                    yearlyByDayNode.setAttribute('month', (month + 1).toString()); // SPO months are 1 to 12 and Moment months are 0 to 11

                    repeatNode.appendChild(yearlyByDayNode);

                    // Example: <yearlyByDay yearFrequency=\"1\" mo=\"TRUE\" weekdayOfMonth=\"third\" month=\"1\"/>
                }

                break;
            }
        }

        ruleNode.appendChild(repeatNode);

        const { until } = recurrence;
        switch (until.type) {
            case RecurUntilType.forever: {
                const repeatForeverNode = doc.createElement('repeatForever');
                repeatForeverNode.textContent = "FALSE";
                ruleNode.appendChild(repeatForeverNode);
                break;
            }
            case RecurUntilType.count: {
                const repeatInstancesNode = doc.createElement('repeatInstances');
                repeatInstancesNode.textContent = until.count?.toString();
                ruleNode.appendChild(repeatInstancesNode);
                break;
            }
            case RecurUntilType.date: {
                const windowEndNode = doc.createElement('windowEnd');
                windowEndNode.textContent = until.date?.clone().utc().format();
                ruleNode.appendChild(windowEndNode);
                break;
            }
        }

        recurrenceNode.appendChild(ruleNode);
        doc.appendChild(recurrenceNode);

        const serializer = new XMLSerializer();
        return serializer.serializeToString(doc);
    }

    private static _evaluate(document: Document, expression: string, contextNode?: Element): Element {
        return document.evaluate(expression, contextNode || document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as Element;
    }
}