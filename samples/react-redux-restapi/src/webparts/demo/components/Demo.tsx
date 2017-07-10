import * as React from 'react';
import styles from './Demo.module.scss';
import { IDemoProps } from './IDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Dispatch } from 'redux';
import { updateTitle, addList } from '../actions/listActions';
import { connect } from 'react-redux';
import { ListState } from '../state/ListState'

import * as ReactDOM from 'react-dom';

export interface OwnProps {
}

interface IConnectedDispatch {
	updateTitle: (title: string) => void;
	//addList: (listtitle: string) => void;
}

function mapStateToProps(state: ListState, ownProps: IDemoProps): ListState {
	return state;
}

const mapDispatchToProps = (dispatch: Dispatch<ListState>): IConnectedDispatch => ({
	updateTitle: (title: string) => {
		dispatch(updateTitle(title));
	}//,
	// addList: (listtitle: string) => {
	// 	dispatch(addList(listtitle));
	// }
});

class Demo extends React.Component<ListState & IDemoProps & IConnectedDispatch, {}> {
	public render() {
		return (
			<div className={styles.demo}>
				<div className={styles.container}>
					<div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
						<div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
							<span className="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
							<p className="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
							<p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
							<a href="https://aka.ms/spfx" className={styles.button}>
								<span className={styles.label}>Learn more</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Demo);
