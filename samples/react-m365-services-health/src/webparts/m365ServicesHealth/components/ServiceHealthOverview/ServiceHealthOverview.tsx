import { DefaultButton, DetailsList, IColumn, IPanelProps, IRenderFunction, Panel, PanelType, SelectionMode, Spinner } from "@fluentui/react";
import { ServiceHealth, ServiceHealthIssue } from "@microsoft/microsoft-graph-types";
import * as React from "react";
import { IServiceHealthOverviewItem, IServiceHealthOverviewProps, IServiceHealthOverviewState } from "../../interfaces/ServiceHealthModels";
import * as ListViewHelperService from "../../services/ListViewHelperService";
import { backButtonStyles, cancelButtonStyle, issueDetailPanelStyles, issueListPanelStyles } from "./Constant";
import { IssueDetail } from "./IssueDetail/IssueDetail";
import { IssueList } from "./IssueList/IssueList";
import { ListItem } from "./ListItem/ListItem";

export const ServiceHealthOverview = (props: IServiceHealthOverviewProps): JSX.Element => {
	const [state, setState] = React.useState<IServiceHealthOverviewState>({
		columns: ListViewHelperService.getOverviewListViewColumns(),
		items: [],
		showIssueListPanel: false,
		showIssueDetailPanel: false,
		selectedItem: null,
		selectedIssue: null,
		showBackButton: false,
		spinner: true,
	});
	/* eslint-disable */
	React.useEffect(() => {
		let listViewItems: IServiceHealthOverviewItem[] = [];
		(async () => {
			try {
				const response: ServiceHealth[] = await props.graphService.getHealthOverviews();
				listViewItems = ListViewHelperService.getListViewItemsForOverview(response);
			} catch (ex) {
				console.log(ex);
			}
			setState((prevState: IServiceHealthOverviewState) => ({ ...prevState, items: listViewItems, spinner: false }));
		})();
	}, []);

	const _renderItemColumn = (item: IServiceHealthOverviewItem, index: number, column: IColumn) => {
		return <ListItem item={item} index={index} column={column} onLinkClick={handleLinkClick} />;
	};

	const handleLinkClick = (item: IServiceHealthOverviewItem) => {
		if (item.InProgressItems.length > 1) {
			setState((prevState: IServiceHealthOverviewState) => ({ ...prevState, showIssueListPanel: true, selectedItem: item }));
		} else {
			setState((prevState: IServiceHealthOverviewState) => ({
				...prevState,
				showIssueDetailPanel: true,
				selectedItem: item,
				selectedIssue: item.InProgressItems[0],
			}));
		}
	};
	const handleDismissPanel = () => {
		setState((prevState: IServiceHealthOverviewState) => ({ ...prevState, showIssueDetailPanel: false, showIssueListPanel: false, showBackButton: false }));
	};

	const handleIssueDetailClick = (item: ServiceHealthIssue) => {
		setState((prevState: IServiceHealthOverviewState) => ({
			...prevState,
			showIssueDetailPanel: true,
			showIssueListPanel: false,
			selectedIssue: item,
			showBackButton: true,
		}));
	};

	const handleBackClick = () => {
		setState((prevState: IServiceHealthOverviewState) => ({
			...prevState,
			showIssueDetailPanel: false,
			showIssueListPanel: true,
			showBackButton: true,
		}));
	};

	const handleCloseClick = () => {
		setState((prevState: IServiceHealthOverviewState) => ({
			...prevState,
			showIssueDetailPanel: false,
			showIssueListPanel: false,
			showBackButton: true,
			selectedItem: null,
			selectedIssue: null,
		}));
	};

	const _renderNavigation: IRenderFunction<IPanelProps> = (props: IPanelProps, defaultRender): JSX.Element => {
		return state.showBackButton ? (
			<div style={{ display: "flex", minHeight: 32, position: "relative", justifyContent: "space-between", marginLeft: -32 }}>
				<DefaultButton iconProps={{ iconName: "Back" }} styles={backButtonStyles} onClick={handleBackClick}></DefaultButton>
				<DefaultButton iconProps={{ iconName: "Cancel" }} styles={cancelButtonStyle} onClick={handleCloseClick}></DefaultButton>
			</div>
		) : (
			defaultRender(props)
		);
	};

	return (
		<>
			{state.spinner && <Spinner styles={{ root: { paddingTop: 20 } }} />}
			{!state.spinner && <DetailsList columns={state.columns} items={state.items} selectionMode={SelectionMode.none} onRenderItemColumn={_renderItemColumn} />}
			<Panel isOpen={state.showIssueListPanel} onDismiss={handleDismissPanel} type={PanelType.medium} styles={issueListPanelStyles}>
				<IssueList selectedItem={state.selectedItem} onClick={handleIssueDetailClick} />
			</Panel>

			<Panel
				isOpen={state.showIssueDetailPanel}
				onDismiss={handleDismissPanel}
				type={PanelType.medium}
				styles={issueDetailPanelStyles}
				onRenderNavigation={_renderNavigation}
			>
				<IssueDetail details={state.selectedIssue} />
			</Panel>
		</>
	);
};
