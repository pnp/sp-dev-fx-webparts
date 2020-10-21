import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import { View, Views, Navigate, Messages } from "react-big-calendar";
import * as strings from 'CalendarWebPartStrings';

export interface ICustomToolbarProps {
    date: Date;
    view: View;
    views: Views;
    label: string;
    localizer: { messages: Messages };
    onNavigate: (navigate: Navigate, date?: Date) => void;
    onView: (view: View) => void;
    children?: React.ReactNode;
}

export interface ICustomToolbarState {
    activeView: string;
}


export default class CalendarToolbar extends React.Component<ICustomToolbarProps, ICustomToolbarState> {
    public constructor(props) {
        super(props);
    
        this.state = {
          activeView: 'month'
        };
    }

    public componentDidMount() {
		const view = this.props.view;
		console.log(view);
    }
    
    private navigate = (action) => {
        this.props.onNavigate(action);
    }

    private view = (view) => {
        this.props.onView(view);
        this.setState({activeView: view});
    }

    public render() {
            const {activeView} = this.state;

            return (
                <div className="rbc-toolbar">
                    <div className="rbc-btn-group">
                        <button type="button" onClick={() => this.navigate('TODAY')}>{strings.todayLabel}</button>
                        <button type="button" onClick={() => this.navigate('PREV')}>{strings.previousLabel}</button>
                        <button type="button" onClick={() => this.navigate('NEXT')}>{strings.nextLabel}</button>
                    </div>
                    <span className="rbc-toolbar-label">{this.props.label}</span>
                    <div className="rbc-btn-group">
                        <button type="button" className={css({ 'rbc-active': activeView === "month" })} onClick={() => this.view('month')}>{strings.monthLabel}</button>
                        <button type="button" className={css({ 'rbc-active': activeView === "week" })} onClick={() => this.view('week')}>{strings.weekLabel}</button>
                        <button type="button" className={css({ 'rbc-active': activeView === "day" })} onClick={() => this.view('day')}>{strings.dayLable}</button>
                        <button type="button" className={css({ 'rbc-active': activeView === "year" })} onClick={() => this.view('year')}>{strings.yearHeaderLabel}</button>
                        <button type="button" className={css({ 'rbc-active': activeView === "agenda" })} onClick={() => this.view('agenda')}>{strings.agenda}</button>
                    </div>
                </div>
            );
    }
}

