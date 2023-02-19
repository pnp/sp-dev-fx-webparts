import { ServiceHealthIssuePost } from "@microsoft/microsoft-graph-types";
import Style from "./IssueDetail.module.scss";
import * as React from "react";
import * as HelperService from "../../../../../common/services/HelperService";
import { Icon, Label } from "@fluentui/react";
import { IIssueDetailProps } from "../../../interfaces/ServiceHealthModels";

export const IssueDetail = (props: IIssueDetailProps): JSX.Element => {
	return (
		<>
			<div className={Style.issueDetailRoot}>
				<div className={Style.issueDetailWrapper}>
					<h1 className={Style.issueDetailTitle}>{props.details?.title}</h1>
				</div>
			</div>
			<div className={Style.subHeaderContainer}>
				<div className={Style.subHeaderText}>
					{props.details?.id}, Last updated: {HelperService.getFormattedDateTime(props.details?.lastModifiedDateTime)}
				</div>
				<div className={Style.subHeaderText}>Estimated Start time: {HelperService.getFormattedDateTime(props.details?.startDateTime)}</div>
			</div>
			<Label>Affected Services</Label>
			<div className={Style.flyoutTextStyle}>
				<Icon iconName={HelperService.getProductIcon(props.details?.service)} />
				<span> {props.details?.service}</span>
			</div>
			<div className={Style.flyoutTextStyle} style={{ paddingBottom: 10 }}>
				<div className={Style.itemsContainer}>
					<div className={Style.itemContainer}>
						<Label>Issue Type</Label>
						<div className={Style.flyoutTextStyle}>
							<span className={Style.rowItem}>
								<div className={Style.serviceStatusIcon}>
									<Icon
										iconName={props.details?.classification === "advisory" ? "InfoSolid" : "WarningSolid"}
										styles={{ root: { color: props.details?.classification === "advisory" ? "rgb(0, 120, 212)" : "rgb(197, 54, 1)" } }}
									/>
									<div style={{ fontSize: 14, fontWeight: 400, marginLeft: 6, verticalAlign: "middle" }}>
										<span style={{ color: props.details?.classification === "advisory" ? "rgb(0, 120, 212)" : "rgb(197, 54, 1)" }}>
											{props.details?.classification.charAt(0).toUpperCase() + props.details?.classification.slice(1)}
										</span>
									</div>
								</div>
							</span>
						</div>
					</div>
					<div className={Style.itemContainer}>
						<Label>Issue origin</Label>
						<div className={Style.flyoutTextStyle}>
							<span className={Style.rowItem}>
								<div className={Style.serviceStatusIcon}>
									<div style={{ fontSize: 14, fontWeight: 400, verticalAlign: "middle" }}>
										<span>{props.details?.origin.charAt(0).toUpperCase() + props.details?.origin.slice(1)}</span>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className={Style.flyoutTextStyle} style={{ paddingBottom: 10 }}>
				<div className={Style.itemsContainer}>
					<div className={Style.itemContainer}>
						<Label>Status</Label>
						<div className={Style.flyoutTextStyle}>
							<span className={Style.rowItem}>
								<div className={Style.serviceStatusIcon}>
									<div style={{ fontSize: 14, fontWeight: 400, verticalAlign: "middle" }}>
										<span>{props.details?.status.charAt(0).toUpperCase() + props.details?.status.slice(1)}</span>
									</div>
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Label> User Impact</Label>
				<div className={Style.flyoutTextStyle}>{props.details?.impactDescription}</div>
			</div>
			<h2>All Updates</h2>
			{props.details?.posts
				?.sort((a, b) => {
					return new Date(b.createdDateTime).valueOf() - new Date(a.createdDateTime).valueOf(); // descending
				})
				.map((post: ServiceHealthIssuePost, index: number) => {
					return (
						<div key={index}>
							<div className={Style.flyoutContentDivider} />
							<div className={Style.textLabelForHistory}>{HelperService.getFormattedDateTime(post.createdDateTime)}</div>
							<div
								dangerouslySetInnerHTML={{ __html: post.description?.content }}
								style={{ whiteSpace: "pre-line", margin: 0, boxSizing: "inherit", color: "rgb(50,49,48)", paddingBottom: 10 }}
							/>
						</div>
					);
				})}
		</>
	);
};
