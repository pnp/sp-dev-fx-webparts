import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import * as strings from 'CalendarWebPartStrings';

export default class CalendarToolbar extends Toolbar {

	componentDidMount() {
		const view = this.props.view;
		console.log(view)
	}

	render() {
		return (
			<div>
				<div className="rbc-btn-group">
					<button type="button" onClick={() => this.navigate('TODAY')}>{strings.todayLabel}</button>
					<button type="button" onClick={() => this.navigate('PREV')}>{strings.previousLabel}</button>
					<button type="button" onClick={() => this.navigate('NEXT')}>{strings.nextLabel}</button>
				</div>
				<div className="rbc-toolbar-label">{this.props.label}</div>
				<div className="rbc-btn-group">
					<button type="button" onClick={this.view.bind(null, 'month')}>{strings.monthLabel}</button>
					<button type="button" onClick={this.view.bind(null, 'week')}>{strings.weekLabel}</button>
					<button type="button" onClick={this.view.bind(null, 'day')}>{strings.dayLable}</button>
					<button type="button" onClick={this.view.bind(null, 'agenda')}>{strings.agenda}</button>
				</div>
			</div>
		);
	}
}
module.export = CalendarToolbar;
