export const getFormattedDateTime = (value: string): string => {
	const date = new Date(value);
	const dateString = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	const timeString = date.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	return `${dateString} ${timeString}`;
};

export const getProductIcon = (value: string): string => {
	let icon: string = "Product";
	switch (value?.toLowerCase()) {
		case "microsoft intune":
		case "mobile device management for office 365":
		case "identity service":
		case "microsoft 365 apps":
		case "microsoft 365 defender":
		case "microsoft 365 for the web":
		case "microsoft defender for cloud apps":
		case "privileged access":
			icon = "Product";
			break;
		case "exchange online":
			icon = "ExchangeLogo";
			break;
		case "microsoft 365 suite":
			icon = "AdminALogoInverse32";
			break;
		case "microsoft teams":
			icon = "TeamsLogo";
			break;
		case "sharepoint online":
		case "microsoft viva":
			icon = "SharepointLogo";
			break;
		case "azure information protection":
			icon = "AzureLogo";
			break;
		case "dynamics 365 apps":
			icon = "Dynamics365Logo";
			break;
		case "microsoft bookings":
			icon = "BookingsLogo";
			break;
		case "microsoft forms":
			icon = "OfficeFormsLogo";
			break;
		case "microsoft power automate":
		case "microsoft power automate in microsoft 365":
			icon = "MicrosoftFlowLogo";
			break;
		case "microsoft staffHub":
			icon = "MicrosoftStaffhubLogo";
			break;
		case "microsoft stream":
			icon = "StreamLogo";
			break;
		case "onedrive for business":
			icon = "OneDriveLogo";
			break;
		case "planner":
			icon = "PlannerLogo";
			break;
		case "power apps":
		case "power apps in microsoft 365":
			icon = "PowerAppsLogo";
			break;
		case "power bi":
			icon = "PowerBILogo";
			break;
		case "project for the web":
			icon = "ProjectLogoInverse";
			break;
		case "skype for Business":
			icon = "SkypeForBusinessLogo";
			break;
		case "sway":
			icon = "SwayLogoInverse";
			break;
		case "Yammer Enterprise":
			icon = "YammerLogo";
			break;
	}
	return icon;
};
