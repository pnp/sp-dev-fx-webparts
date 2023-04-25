import { Icon } from "@fluentui/react";
import { ServiceHealthIssue } from "@microsoft/microsoft-graph-types";
import * as React from "react";
import { IIssueListProps } from "../../../interfaces/ServiceHealthModels";
import Style from "./IssueList.module.scss";

export const IssueList = (props: IIssueListProps): JSX.Element => {
	return (
		<>
			<h1 className={Style.headerText}>{`Health issues affecting ${props.selectedItem?.Service}`}</h1>
			<table role={"grid"}>
				<thead>
					<tr role={"row"} className={Style.tableHeaderRow}>
						<th className={Style.content}>Issue Title</th>
						<th className={Style.primaryColumnContainer}>Issue Type</th>
					</tr>
				</thead>
				<tbody>
					{props.selectedItem?.InProgressItems?.map((item: ServiceHealthIssue, index: number) => {
						return (
							<tr role={"row"} className={Style.tableHeaderRow} onClick={() => props.onClick(item)} key={index}>
								<td className={Style.content}>{item.title}</td>
								<td className={Style.primaryColumnContainer}>
									<span className={Style.rowItem}>
										<div className={Style.serviceStatusIcon}>
											<Icon
												iconName={item.classification === "advisory" ? "InfoSolid" : "WarningSolid"}
												styles={{ root: { color: item.classification === "advisory" ? "rgb(0, 120, 212)" : "rgb(197, 54, 1)", paddingTop: 3 } }}
											/>
											<div className={Style.healthStatusLink}>
												<span style={{ color: item.classification === "advisory" ? "rgb(0, 120, 212)" : "rgb(197, 54, 1)" }}>
													{item.classification.charAt(0).toUpperCase() + item.classification.slice(1)}
												</span>
											</div>
										</div>
									</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};
