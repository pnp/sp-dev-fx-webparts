import { Log } from "@microsoft/sp-core-library";
import {
	BaseListViewCommandSet,
	Command,
	IListViewCommandSetExecuteEventParameters,
	ListViewStateChangedEventArgs,
} from "@microsoft/sp-listview-extensibility";

import * as React from "react";
import * as ReactDom from "react-dom";
import { IToastMessageProps, ToastMessage } from "../../common/ToastMessage";
import { getThemeColor } from "./../../common/themeHelper";
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ICopyCopyUtilityFunctionsCommandSetProperties {
	// This is an example; replace with your own properties
	sampleTextOne: string;
	sampleTextTwo: string;
}

const LOG_SOURCE: string = "CopyCopyUtilityFunctionsCommandSet";

export default class CopyCopyUtilityFunctionsCommandSet extends BaseListViewCommandSet<ICopyCopyUtilityFunctionsCommandSetProperties> {
	private messagePlaceholder: HTMLDivElement;

	public onInit(): Promise<void> {
		Log.info(LOG_SOURCE, "Initialized CopyCopyUtilityFunctionsCommandSet");

		// initial state of the command's visibility
		const copyNameCommand: Command = this.tryGetCommand("COPYNAME");
		const copyPathCommand: Command = this.tryGetCommand("COPYPATH");

		// Get proper theme color
		const fillColor = getThemeColor("themeDarkAlt").replace("#", "%23");

		const copyPathSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2048 2048'%3E%3Cpath d='M901 1472q0 65 37 113t97 70q-3 18-5 36t-2 37q0 14 1 29t4 29q-57-11-104-39t-82-70-54-94-19-111q0-66 25-124t67-101 101-69 124-26h254q65 0 123 25t101 70 68 102 25 123q0 56-19 108t-52 94-81 71-102 40v-133q57-22 92-69t35-111q0-39-15-74t-40-61-60-42-75-15h-254q-40 0-75 15t-60 41-40 61-15 75zm1147 253q0 66-25 125t-68 103-102 69-125 26h-256q-67 0-125-25t-101-70-69-103-25-125q0-56 19-108t53-95 81-73 103-40v133q-29 10-52 28t-40 43-26 53-10 59q0 40 15 75t41 62 61 42 75 16h256q40 0 75-15t61-43 41-62 15-75q0-31-10-60t-27-54-43-43-55-28q3-18 5-36t2-37q0-15-2-29t-4-29q57 11 105 40t83 71 54 94 20 111zM128 128v1792h896v128H0V0h1115l549 549v475h-128V640h-512V128H128zm1024 91v293h293l-293-293z' fill='${fillColor}'%3E%3C/path%3E%3C/svg%3E`;
		const copyNameSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2048 2048'%3E%3Cpath d='M1105 128l640 1920h-135l-171-512H615l-170 512H310L950 128h155zM658 1408h739L1027 300 658 1408z' fill='${fillColor}'%3E%3C/path%3E%3C/svg%3E`;
		copyPathCommand.iconImageUrl = copyPathSVG;
		copyNameCommand.iconImageUrl = copyNameSVG;
		copyNameCommand.visible = false;
		copyPathCommand.visible = false;

		this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);
		this.messagePlaceholder = document.body.appendChild(document.createElement("div"));
		return Promise.resolve();
	}

	public async onExecute(event: IListViewCommandSetExecuteEventParameters): Promise<void> {
		let element: React.ReactElement<IToastMessageProps>;
		switch (event.itemId) {
			case "COPYNAME": {
				let isCopied: boolean = false;

				await navigator.clipboard
					.writeText(event.selectedRows[0]?.getValueByName("FileLeafRef"))
					.then(() => {
						isCopied = true;
					})
					.catch((reason) => {
						console.log(reason);
						isCopied = false;
					});
				element = React.createElement<IToastMessageProps>(ToastMessage, {
					message: isCopied ? "Name copied" : "Some error occurred",
					type: isCopied ? "success" : "error",
					position: "top-end",
				});

				break;
			}

			case "COPYPATH": {
				let isCopied: boolean = false;
				const web = this.context.pageContext.web;
				const webUrl = web.absoluteUrl.split(web.serverRelativeUrl)[0];
				await navigator.clipboard
					.writeText(webUrl + event.selectedRows[0]?.getValueByName("FileRef"))
					.then(() => {
						isCopied = true;
					})
					.catch((reason) => {
						console.log(reason);
						isCopied = false;
					});
				element = React.createElement<IToastMessageProps>(ToastMessage, {
					message: isCopied ? "Path copied" : "Some error occurred",
					type: isCopied ? "success" : "error",
					position: "top-end",
				});

				break;
			}

			default:
				throw new Error("Unknown command");
		}
		ReactDom.render(element, this.messagePlaceholder);
	}

	private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
		Log.info(LOG_SOURCE, "List view state changed");

		const copyNameCommand: Command = this.tryGetCommand("COPYNAME");
		const copyPathCommand: Command = this.tryGetCommand("COPYPATH");

		if (copyNameCommand) {
			// This command should be hidden unless exactly one row is selected.
			copyNameCommand.visible = this.context.listView.selectedRows?.length === 1;
		}
		if (copyPathCommand) {
			// This command should be hidden unless exactly one row is selected.
			copyPathCommand.visible = this.context.listView.selectedRows?.length === 1;
		}

		this.raiseOnChange();
		ReactDom.unmountComponentAtNode(this.messagePlaceholder);
	};
}
