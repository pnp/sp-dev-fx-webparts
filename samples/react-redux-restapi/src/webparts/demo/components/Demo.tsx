import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dispatch } from 'redux';
import { updateTitle, addList, getLists } from '../actions/listActions';
import { connect } from 'react-redux';
import { ListState } from '../state/ListState'
import { SPHttpClient } from '@microsoft/sp-http';

import * as ReactDOM from 'react-dom';

interface IConnectedDispatch {
	updateTitle: (title: string) => void;
	getLists: (spHttpClient: SPHttpClient, currentWebUrl: string) => void;
	addList: (spHttpClient: SPHttpClient, currentWebUrl: string, listtitle: string) => void;
}

interface IConnectedState {
	title: string;
	lists: string[];
}

function mapStateToProps(state: ListState, ownProps: IDemoProps): IConnectedState {
	return {
		title: state.title,
		lists: state.lists
	};
}

const mapDispatchToProps = (dispatch: Dispatch<ListState>): IConnectedDispatch => ({
	updateTitle: (title: string) => {
		dispatch(updateTitle(title));
	},
	getLists: (spHttpClient: SPHttpClient, currentWebUrl: string) => {
		dispatch(getLists(spHttpClient, currentWebUrl));
	},
	addList: (spHttpClient: SPHttpClient, currentWebUrl: string, listtitle: string) => {
		dispatch(addList(spHttpClient, currentWebUrl, listtitle));
	}
});

class Demo extends React.Component<IDemoProps & IConnectedState & IConnectedDispatch, {}> {
	public render() {
		return (
			<div className={styles.demo}>
				<div className={styles.container}>
					<div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
						<div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
							<span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
							<p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
							<span>Add New List:</span>
							<div>
								<input type="text" value={this.props.title} onChange={this.handleChange.bind(this)} />
								<input type="submit" value="Add" onClick={this.handleSubmit.bind(this)} />
							</div>
							<ul>
								{this.props.lists.map(list => {
									return <li>{list}</li>
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleChange(event: React.FormEvent<HTMLInputElement>){
		this.props.updateTitle(event.currentTarget.value);
	}

	handleSubmit(event: React.MouseEvent<HTMLInputElement>){
		this.props.addList(this.props.spHttpClient, this.props.currentWebUrl, this.props.title)
	}

	componentDidMount() {
		this.props.getLists(this.props.spHttpClient, this.props.currentWebUrl);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
