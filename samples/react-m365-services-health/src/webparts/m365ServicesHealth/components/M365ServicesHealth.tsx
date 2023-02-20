import * as React from "react";
import { IM365ServicesHealthProps } from "./IM365ServicesHealthProps";
import { ServiceHealthHeader } from "./ServiceHealthHeader/ServiceHealthHeader";
import { ServiceHealthOverview } from "./ServiceHealthOverview/ServiceHealthOverview";

const M365ServicesHealth = (props: IM365ServicesHealthProps): JSX.Element => {
	return (
		<>
			<ServiceHealthHeader title={props.title} />
			<ServiceHealthOverview graphService={props.graphService} />
		</>
	);
};

export default M365ServicesHealth;
