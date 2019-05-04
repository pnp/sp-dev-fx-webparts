import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';

export default class CalendarToolbar extends Toolbar {

	componentDidMount() {
		const view = this.props.view;
		console.log(view)
	}

	render() {
		return (
			<div>
				<div className="rbc-btn-group">
					<button type="button" onClick={() => this.navigate('TODAY')}>today</button>
					<button type="button" onClick={() => this.navigate('PREV')}>back</button>
					<button type="button" onClick={() => this.navigate('NEXT')}>next</button>
				</div>
				<div className="rbc-toolbar-label">{this.props.label}</div>
				<div className="rbc-btn-group">
					<button type="button" onClick={this.view.bind(null, 'month')}>Month</button>
					<button type="button" onClick={this.view.bind(null, 'week')}>Week</button>
					<button type="button" onClick={this.view.bind(null, 'day')}>Day</button>
					<button type="button" onClick={this.view.bind(null, 'agenda')}>Agenda</button>
				</div>
			</div>
		);
	}
}
module.export = CalendarToolbar;
