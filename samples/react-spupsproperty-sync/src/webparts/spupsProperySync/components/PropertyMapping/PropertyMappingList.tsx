import * as React from 'react';
import styles from './PropertyMapping.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import SPHelper from '../../../../Common/SPHelper';
import { IPropertyMappings, MessageScope } from '../../../../Common/IModel';
import PropertyMappingItem from './PropertyMappingItem';
import { parse } from 'json2csv';
import MessageContainer from '../MessageContainer';

const filter: any = require('lodash/filter');

const downloadIcon: IIconProps = { iconName: 'SaveTemplate' };
const csvIcon: IIconProps = { iconName: 'FileTemplate' };

export interface IPropertyMappingProps {
	mappingProperties: IPropertyMappings[];
	helper: SPHelper;
	disabled: boolean;
	siteurl: string;
}

export interface IPropertyMappingState {
	isOpen: boolean;
	templateProperties: IPropertyMappings[];
	downloadLink: string;
	templateFileName: string;
	showProgress: boolean;
	disableButtons: boolean;
	disableMappingButton: boolean;
	globalMessage: string;
	globalMessageScope?: MessageScope;
}

export default class PropertyMappingList extends React.Component<IPropertyMappingProps, IPropertyMappingState> {
	private includedProperties: IPropertyMappings[] = [];
	/**
	 * Default constructor
	 * @param props
	 */
	constructor(props: IPropertyMappingProps) {
		super(props);
		this.state = {
			isOpen: false,
			templateProperties: [],
			downloadLink: '',
			templateFileName: '',
			showProgress: false,
			disableButtons: false,
			disableMappingButton: false,
			globalMessage: ""
		};
	}
	/**
	 * Component mount
	 */
	public componentDidMount = () => {
		let templateProperties: IPropertyMappings[] = this.getDefaultTemplateProperties();
		this.setState({ templateProperties });
	}
	/**
	 * Component updated
	 */
	public componentDidUpdate = (prevProps: IPropertyMappingProps) => {
		if (prevProps.mappingProperties !== this.props.mappingProperties ||
			prevProps.disabled !== this.props.disabled) {
			let templateProperties: IPropertyMappings[] = this.getDefaultTemplateProperties();
			this.setState({
				templateProperties,
				disableMappingButton: this.props.disabled
			});
		}
	}
	/**
	 * Get the property mappings from the props
	 */
	private getDefaultTemplateProperties = () => {
		let defaultProps: IPropertyMappings[] = this.props.mappingProperties;
		let globalMessage: string = "";
		if (defaultProps.length <= 0) globalMessage = strings.EmptyPropertyMappings;
		else globalMessage = "";
		this.setState({ globalMessage, globalMessageScope: MessageScope.Failure, disableButtons: globalMessage.length > 0, disableMappingButton: globalMessage.length > 0 });
		return defaultProps;
	}
	/**
	 * Update the property mappings state by enabling or disabling the property
	 * Based on this the templates will be generated
	 */
	private _onEnableOrDisableProperty = (item: IPropertyMappings, checked: boolean) => {
		let templateProperties: IPropertyMappings[] = this.state.templateProperties;
		let property = templateProperties.filter(prop => { return prop.ID == item.ID; });
		if (property) property[0].IsIncluded = false;
		this.setState({ ...this.state, templateProperties });
		this.render();
	}
	/**
	 * Get the default property mappings and then open the panel
	 */
	private _openPropertyMappingPanel = () => {
		let templateProperties = this.getDefaultTemplateProperties();
		this.setState({ templateProperties, isOpen: true });
	}
	/**
	 * Dismiss or close the panel
	 */
	private _dismissPanel = () => {
		this.setState({ isOpen: false });
	}
	/**
	 * Custom panel footer contents with buttons
	 */
	private _onRenderPanelFooterContent = (): JSX.Element => {
		return (
			<div className={styles.panelFooter}>
				<PrimaryButton iconProps={downloadIcon} onClick={this._generateJSONTemplate} disabled={this.state.disableButtons}>{strings.BtnGenerateJSON}</PrimaryButton>
				<PrimaryButton iconProps={csvIcon} onClick={this._generateCSVTemplate} disabled={this.state.disableButtons}>{strings.BtnGenerateCSV}</PrimaryButton>
				{this.state.showProgress && <Spinner className={styles.generateTemplateLoader} label={strings.GenerateTemplateLoader} ariaLive="assertive" labelPosition="right" />}
			</div>
		);
	}
	/**
	 * Get the property mappings that are included by the user
	 */
	private _getIncludedPropertyMapping = () => {
		return filter(this.state.templateProperties, (o) => { return o.IsIncluded; });
	}
	/**
	 * Button click to generate the JSON template
	 */
	private _generateJSONTemplate = async () => {
		this.setState({ disableButtons: true, showProgress: true });
		const { helper } = this.props;
		let jsonOut = await helper.getPropertyMappingsTemplate(this._getIncludedPropertyMapping());
		let fileTemplate = await helper.addFilesToFolder(JSON.stringify(jsonOut), false);
		this.setState({
			downloadLink: fileTemplate.data.ServerRelativeUrl,
			templateFileName: fileTemplate.data.Name
		}, this.getTemplateFile);
	}
	/**
	 * Button click to generate the CSV template
	 */
	private _generateCSVTemplate = async () => {
		this.setState({ disableButtons: true, showProgress: true });
		const { helper } = this.props;
		let templateProperties = this._getIncludedPropertyMapping();
		let fields: string[] = [];
		fields.push("UserID");
		templateProperties.map(propmap => {
			fields.push(propmap.SPProperty);
		});
		const csv = parse("", { fields });
		let fileTemplate = await helper.addFilesToFolder(csv, true);
		this.setState({
			downloadLink: fileTemplate.data.ServerRelativeUrl,
			templateFileName: fileTemplate.data.Name
		}, this.getTemplateFile);
	}
	/**
	 * Download the JSON file
	 */
	private getTemplateFile = async () => {
		const anchor = window.document.createElement('a');
		anchor.href = `${this.props.siteurl}/_layouts/15/download.aspx?SourceUrl=${this.state.downloadLink}`;
		anchor.download = this.state.templateFileName;
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		this.setState({ disableButtons: false, showProgress: false, globalMessage: strings.TemplateDownloaded, globalMessageScope: MessageScope.Success });
	}
	/**
	 * Component render
	 */
	public render(): JSX.Element {
		const { isOpen, templateProperties, disableMappingButton, globalMessage, globalMessageScope } = this.state;
		return (
			<div className={styles.propertyMappingList}>
				<PrimaryButton text={strings.BtnPropertyMapping} onClick={this._openPropertyMappingPanel} disabled={disableMappingButton} />
				<Panel isOpen={isOpen} onDismiss={this._dismissPanel} type={PanelType.largeFixed} closeButtonAriaLabel="Close" headerText={strings.PnlHeaderText}
					headerClassName={styles.panelHeader} isFooterAtBottom={true} onRenderFooterContent={this._onRenderPanelFooterContent}>
					<div className={styles.propertyMappingPanelContent}>
						{globalMessage.length > 0 &&
							<div style={{ marginTop: '10px', marginBottom: '10px' }}>
								<MessageContainer MessageScope={globalMessageScope} Message={globalMessage} />
							</div>
						}
						<div className={styles.mappingcontainer} data-is-focusable={true} style={{ marginBottom: '10px' }}>
							<div className={styles.propertytitlediv}>{strings.TblColHeadAzProperty}</div>
							<div className={styles.separator}>&nbsp;</div>
							<div className={styles.propertytitlediv}>{strings.TblColHeadSPProperty}</div>
							<div className={styles.propertytitlediv} style={{ padding: '0px' }}>{strings.TblColHeadEnableDisable}</div>
						</div>
						<PropertyMappingItem items={templateProperties} onEnableOrDisableProperty={this._onEnableOrDisableProperty} />
					</div>
				</Panel>
			</div>
		);
	}
}