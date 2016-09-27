import * as React from 'react';
import { IPropertyPaneLoggingFieldPropsInternal } from './PropertyPaneLoggingField';
import { Label } from 'office-ui-fabric-react/lib/Label';

require('./PropertyPaneLoggingFieldStyling.css');

/**
 * @interface
 * PropertyPaneLoggingFieldHost properties interface
 *
 */
export interface IPropertyPaneLoggingFieldHostProps extends IPropertyPaneLoggingFieldPropsInternal {}

/**
 * @interface
 * PropertyPaneLoggingFieldHost state interface
 *
 */
export interface IPropertyPaneLoggingFieldState {
	logging?: any[];
}


/**
 * @class
 * Renders the controls for PropertyPaneLoggingField component
 */
export default class PropertyPaneLoggingFieldHost extends React.Component<IPropertyPaneLoggingFieldHostProps, IPropertyPaneLoggingFieldState> {

	/**
	 * @function
	 * Contructor
	 */
	constructor(props: IPropertyPaneLoggingFieldHostProps) {
		super(props);

		this.state = {
			logging: []
		};
		this.getLogging = this.getLogging.bind(this);
	}

	/**
	 * @function
	 * componentDidMount
	 */
	public componentDidMount(): void {
        this.setState({
			logging: this.props.value
		});
    }

	/**
	 * @function
	 * Retrieve new logging value
	 */
	private getLogging() {
		this.setState({
			logging: this.props.retrieve()
		});
	}

	/**
	 * @function
	 * Renders the key values
	 */
    private renderValue(val: any, subClass?: string) {
        const output = [];
        for (const k in val) {
            if (typeof val[k] === "object") {
                output.push(<div key={k} className={subClass}><span className="keyValue">{k}</span>: object {this.renderValue(val[k], "subElm")}</div>);
            } else {
                output.push(<div key={k} className={subClass}><span className="keyValue">{k}</span>: {val[k]}</div>);
            }
        }
        return output;
    }

	/**
	 * @function
	 * Renders the logging field control
	 */
	public render(): JSX.Element {
        const valToRender = this.renderValue(this.state.logging);
		//Renders content
		return (
			<div className="loggingField">
				<Label>{this.props.label}</Label>
				{
					(() => {
						if (typeof this.props.retrieve !== 'undefined') {
							return <div className="updateLogging"><a className="ms-Link" onClick={this.getLogging}>Update logging</a></div>;
						}
					})()
				}
				<pre className="logging">{valToRender}</pre>
				{
					(() => {
						if (typeof this.props.description !== 'undefined') {
							return <span className="ms-TextField-description">{this.props.description}</span>;
						}
					})()
				}

			</div>
		);
	}
}