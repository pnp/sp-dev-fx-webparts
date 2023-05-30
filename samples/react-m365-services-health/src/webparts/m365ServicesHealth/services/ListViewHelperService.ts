import { IServiceHealthOverviewItem } from "./../interfaces/ServiceHealthModels";
import { IColumn } from "@fluentui/react";
import { ServiceHealth, ServiceHealthIssue } from "@microsoft/microsoft-graph-types";

export const getOverviewListViewColumns = (): IColumn[] => {
	const viewColumnsSchema: IColumn[] = [
		{
			key: "Service",
			name: "Service",
			fieldName: "Service",
			minWidth: 80,
			maxWidth: 300,
			isResizable: true,
		},
		{
			key: "Status",
			name: "Status",
			fieldName: "Status",
			minWidth: 120,
		},
	];
	return viewColumnsSchema;
};

export const getListViewItemsForOverview = (response: ServiceHealth[]): IServiceHealthOverviewItem[] => {
	const overviewItems: IServiceHealthOverviewItem[] = [];
	for (let i = 0; i < response.length; i++) {
		const value = response[i];
		const overviewItem = {} as IServiceHealthOverviewItem;
		overviewItem.Service = value.service;
		const inProgressIssues: ServiceHealthIssue[] = value.issues.filter((issue) => !issue.isResolved);
		if (inProgressIssues.length > 0) {
			const counts = inProgressIssues.reduce(
				(acc, curr) => {
					if (curr.classification === "advisory") {
						acc.advisoryCount++;
					} else if (curr.classification === "incident" || curr.classification === "unknownFutureValue") {
						acc.incidentCount++;
					}
					return acc;
				},
				{ advisoryCount: 0, incidentCount: 0 }
			);

			const status: string[] = [];
			if (counts.advisoryCount > 0) {
				status.push(`${counts.advisoryCount} ${counts.advisoryCount === 1 ? "advisory" : "advisories"}`);
			}
			if (counts.incidentCount > 0) {
				status.push(`${counts.incidentCount} ${counts.incidentCount === 1 ? "incident" : "incidents"}`);
			}
			overviewItem.Status = status.join(",");
			overviewItem.InProgressItems = inProgressIssues;
		} else {
			overviewItem.Status = "Healthy";
			overviewItem.InProgressItems = [];
		}
		overviewItems.push(overviewItem);
	}

	overviewItems.sort((a, b) => a.Status.localeCompare(b.Status));
	return overviewItems;
};
