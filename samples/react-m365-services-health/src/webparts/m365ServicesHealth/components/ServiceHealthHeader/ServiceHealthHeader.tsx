import * as React from "react";
import { IServiceHealthHeaderProps } from "../../interfaces/ServiceHealthModels";
import style from "./ServiceHealthHeader.module.scss";

export const ServiceHealthHeader = (props: IServiceHealthHeaderProps): JSX.Element => {
	return (
		<div className={style.header}>
			<div className={style.headerContainer}>
				<span className={style.headerText}>{props.title}</span>
			</div>
		</div>
	);
};
