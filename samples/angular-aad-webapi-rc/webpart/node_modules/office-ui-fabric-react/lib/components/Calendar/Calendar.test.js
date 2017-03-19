"use strict";
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var ReactTestUtils = require('react-addons-test-utils');
var expect = chai.expect;
var Calendar_1 = require('./Calendar');
var Calendar_Props_1 = require('./Calendar.Props');
describe('Calendar', function () {
    var dayPickerStrings = {
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        shortDays: [
            'S',
            'M',
            'T',
            'W',
            'T',
            'F',
            'S'
        ],
        goToToday: 'Go to today'
    };
    describe('Test rendering simplest calendar', function () {
        var renderedComponent;
        before(function () {
            renderedComponent = ReactTestUtils.renderIntoDocument(React.createElement(Calendar_1.Calendar, {strings: dayPickerStrings, isMonthPickerVisible: false}));
        });
        it('Verify day picker header', function () {
            var today = new Date();
            var monthName = dayPickerStrings.months[today.getMonth()];
            var year = today.getFullYear();
            var dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-month');
            expect(dayPickerMonth).to.not.be.undefined;
            expect(dayPickerMonth.textContent).to.equal(monthName);
            var dayPickerYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-year');
            expect(dayPickerYear).to.not.be.undefined;
            expect(dayPickerYear.textContent).to.equal(year.toString());
        });
        it('Verify first day of week', function () {
            var dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
            expect(dayHeaders.length).to.equal(7);
            expect(dayHeaders[0].textContent).to.equal(dayPickerStrings.shortDays[0]);
            expect(dayHeaders[1].textContent).to.equal(dayPickerStrings.shortDays[1]);
            expect(dayHeaders[2].textContent).to.equal(dayPickerStrings.shortDays[2]);
            expect(dayHeaders[3].textContent).to.equal(dayPickerStrings.shortDays[3]);
            expect(dayHeaders[4].textContent).to.equal(dayPickerStrings.shortDays[4]);
            expect(dayHeaders[5].textContent).to.equal(dayPickerStrings.shortDays[5]);
            expect(dayHeaders[6].textContent).to.equal(dayPickerStrings.shortDays[6]);
        });
        it('Verify day picker selected date & navigated date', function () {
            // When not passed in selected & navigated dates default to current date
            // These dates will be ms different, so just compare their day, month, and year
            // This test will likely fail around midnight.
            var today = new Date();
            expect(renderedComponent.state.selectedDate).to.not.be.null;
            expect(renderedComponent.state.selectedDate.getDate()).to.equal(today.getDate());
            expect(renderedComponent.state.selectedDate.getMonth()).to.equal(today.getMonth());
            expect(renderedComponent.state.selectedDate.getFullYear()).to.equal(today.getFullYear());
            expect(renderedComponent.state.navigatedDate).to.not.be.null;
            expect(renderedComponent.state.navigatedDate.getDate()).to.equal(today.getDate());
            expect(renderedComponent.state.navigatedDate.getMonth()).to.equal(today.getMonth());
            expect(renderedComponent.state.navigatedDate.getFullYear()).to.equal(today.getFullYear());
        });
        it('Verify go to today', function () {
            var goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
            expect(goToToday).to.not.be.undefined;
            expect(goToToday.textContent).to.equal(dayPickerStrings.goToToday);
        });
    });
    describe('Test rendering most complicated calendar', function () {
        var renderedComponent;
        var defaultDate;
        before(function () {
            defaultDate = new Date(2016, 5, 4);
            renderedComponent = ReactTestUtils.renderIntoDocument(React.createElement(Calendar_1.Calendar, {strings: dayPickerStrings, isMonthPickerVisible: true, value: defaultDate, firstDayOfWeek: Calendar_Props_1.DayOfWeek.Tuesday}));
        });
        it('Verify day picker header', function () {
            var monthName = dayPickerStrings.months[defaultDate.getMonth()];
            var dayPickerMonth = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-month');
            expect(dayPickerMonth).to.not.be.undefined;
            expect(dayPickerMonth.textContent).to.equal(monthName);
            var dayPickerYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-year');
            expect(dayPickerYear).to.not.be.undefined;
            expect(dayPickerYear.textContent).to.equal(defaultDate.getFullYear().toString());
        });
        it('Verify first day of week', function () {
            var dayHeaders = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-weekday');
            expect(dayHeaders.length).to.equal(7);
            expect(dayHeaders[0].textContent).to.equal(dayPickerStrings.shortDays[2]);
            expect(dayHeaders[1].textContent).to.equal(dayPickerStrings.shortDays[3]);
            expect(dayHeaders[2].textContent).to.equal(dayPickerStrings.shortDays[4]);
            expect(dayHeaders[3].textContent).to.equal(dayPickerStrings.shortDays[5]);
            expect(dayHeaders[4].textContent).to.equal(dayPickerStrings.shortDays[6]);
            expect(dayHeaders[5].textContent).to.equal(dayPickerStrings.shortDays[0]);
            expect(dayHeaders[6].textContent).to.equal(dayPickerStrings.shortDays[1]);
        });
        it('Verify day picker selected date & navigated date', function () {
            expect(renderedComponent.state.selectedDate).to.equal(defaultDate);
            expect(renderedComponent.state.navigatedDate).to.equal(defaultDate);
        });
        it('Verify month picker seen', function () {
            var monthPicker = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-monthPicker');
            expect(monthPicker).to.not.be.undefined;
            expect(monthPicker.style.display).to.not.equal('none');
        });
        it('Verify month picker header', function () {
            var currentYear = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-currentYear');
            expect(currentYear).to.not.be.undefined;
            expect(currentYear.textContent).to.equal(defaultDate.getFullYear().toString());
        });
        it('Verify month picker months', function () {
            var months = ReactTestUtils.scryRenderedDOMComponentsWithClass(renderedComponent, 'ms-DatePicker-monthOption');
            expect(months.length).to.equal(12);
            for (var i = 0; i < 12; i++) {
                expect(months[i].textContent).to.equal(dayPickerStrings.shortMonths[i]);
            }
        });
        it('Verify go to today', function () {
            var goToToday = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComponent, 'ms-DatePicker-goToday');
            expect(goToToday).to.not.be.undefined;
            expect(goToToday.textContent).to.equal(dayPickerStrings.goToToday);
        });
    });
});

//# sourceMappingURL=Calendar.test.js.map
