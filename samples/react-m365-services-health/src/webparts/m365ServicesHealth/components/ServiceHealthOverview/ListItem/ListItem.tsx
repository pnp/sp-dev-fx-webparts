import { Icon, Label, Link } from "@fluentui/react";
import Style from "./ListItem.module.scss";
import * as React from "react";
import { IListItemProps, IServiceHealthOverviewItem } from "../../../interfaces/ServiceHealthModels";
import { linkStyleAdvisory, linkStyleWarning } from "../Constant";

export const ListItem = (props: IListItemProps): JSX.Element => {
	const { column, item } = props;
	const fieldContent = item[column.fieldName as keyof IServiceHealthOverviewItem] as string;
	return (
		<>
			{column.fieldName === "Service" ? (
				<Label>{fieldContent}</Label>
			) : fieldContent.toLowerCase().indexOf("healthy") > -1 ? (
				<span className={Style.rowItem}>
					<div className={Style.serviceStatusIcon}>
						<Icon iconName="CompletedSolid" styles={{ root: { color: "rgb(16, 124, 16)", paddingTop: 4 } }} />
						<div className={Style.healthStatusLink}>
							<span className={Style.message}>{fieldContent}</span>
						</div>
					</div>
				</span>
			) : (
				fieldContent.split(",").map((value) => {
					return value.indexOf("advisor") > -1 ? (
						<span className={Style.rowItem}>
							<div className={Style.serviceStatusIcon}>
								<Icon iconName="InfoSolid" styles={{ root: { color: "rgb(0, 120, 212)", paddingTop: 3 } }} />
								<div className={Style.healthStatusLink}>
									<Link styles={linkStyleAdvisory} onClick={() => props.onLinkClick(item)}>
										{value}
									</Link>
								</div>
							</div>
						</span>
					) : (
						<span className={Style.rowItem}>
							<div className={Style.serviceStatusIcon}>
								<Icon iconName="WarningSolid" styles={{ root: { color: "rgb(197, 54, 1)", paddingTop: 3 } }} />
								<div className={Style.healthStatusLink}>
									<Link styles={linkStyleWarning} onClick={() => props.onLinkClick(item)}>
										{value}
									</Link>
								</div>
							</div>
						</span>
					);
				})
			)}
		</>
	);
};
