import * as React from 'react';
import styles from './SpupsProperySync.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import * as csv from 'csvtojson';
import MessageContainer from './MessageContainer';
import { MessageScope } from '../../../Common/IModel';

export interface IUPPropertyDataProps {
	items: any;
	isCSV: boolean;
	showProgress: boolean;
	clearData: boolean;
	UpdateSPForBulkUsers: (data: any[]) => void;
}

export interface IUPPropertyDataState {
	items: any;
	columns: IColumn[];
	dynamicColumns: string[];
	searchText: string;
	emptyValues: boolean;
}

export default class UPPropertyData extends React.Component<IUPPropertyDataProps, IUPPropertyDataState> {
	constructor(props: IUPPropertyDataProps) {
		super(props);
		this.state = {
			items: [],
			columns: [],
			searchText: '',
			dynamicColumns: [],
			emptyValues: false
		};
	}

	public componentDidMount = () => {
		this._buildUploadDataList();
	}

	public componentDidUpdate = (prevProps: IUPPropertyDataProps) => {
		if (prevProps.items !== this.props.items || prevProps.isCSV !== this.props.isCSV) {
			this._buildUploadDataList();
		}
		if (prevProps.clearData !== this.props.clearData) {
			if (this.props.clearData) this.setState({ items: [] });
		}
	}

	private _buildColumns = (columns: string[]): IColumn[] => {
		this.setState({ emptyValues: false });
		let cols: IColumn[] = [];
		if (columns && columns.length > 0) {
			columns.map((col: string) => {
				if (col.toLocaleLowerCase() == "userid") {
					cols.push({ key: col, name: col, fieldName: col, minWidth: 300, maxWidth: 300 } as IColumn);
				} else {
					cols.push({
						key: col, name: col, fieldName: col, minWidth: 150,
						onRender: (item: any, index: number, column: IColumn) => {
							if (item[col]) {
								return (<div>{item[col]}</div>);
							} else {
								this.setState({ emptyValues: true });
								return (<div className={styles.emptyData}>{strings.EmptyDataText}</div>);
							}
						}
					} as IColumn);
				}
			});
		}
		return cols;
	}

	private _buildUploadDataList = async () => {
		const { items, isCSV } = this.props;
		if (items) {
			if (isCSV) {
				let finalOut: any = await csv().fromString(items);
				this._getJSONData(finalOut);
			}
			else this._getJSONData(items);
		}
	}

	private _getJSONData = (inputjson?: any) => {
		let parsedJson = (inputjson) ? inputjson : JSON.parse(inputjson);
		let _dynamicColumns: string[] = [];
		Object.keys(parsedJson[0]).map((key) => {
			_dynamicColumns.push(key);
		});
		this.setState({
			columns: this._buildColumns(_dynamicColumns),
			items: parsedJson
		});
	}

	private _updatePropsForBulkUsers = () => {
		this.props.UpdateSPForBulkUsers(this.state.items);
		this.setState({ emptyValues: false });
	}

	public render(): JSX.Element {
		const { items, columns, emptyValues } = this.state;
		return (
			<div className={styles.uppropertydata}>
				{emptyValues && !this.props.clearData &&
					<MessageContainer MessageScope={MessageScope.Info} Message={strings.EmptyDataWarningMsg} />
				}
				{(items && items.length > 0) ? (
					<>
						<DetailsList
							items={items}
							setKey="set"
							columns={columns}
							compact={true}
							layoutMode={DetailsListLayoutMode.justified}
							constrainMode={ConstrainMode.unconstrained}
							isHeaderVisible={true}
							selectionMode={SelectionMode.none}
							enableShimmer={true}
							className={styles.uppropertylist} />
						<div style={{ padding: "10px" }}>
							<PrimaryButton text={strings.BtnUpdateUserProps} onClick={this._updatePropsForBulkUsers} style={{ marginRight: '5px' }} disabled={this.props.showProgress} />
							{this.props.showProgress && <Spinner className={styles.generateTemplateLoader} label={strings.PropsUpdateLoader} ariaLive="assertive" labelPosition="right" />}
						</div>
					</>
				) : (
						<></>
					)
				}
			</div>
		);
	}
}