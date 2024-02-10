import { IButtonStyles, ILinkStyles, IPanelStyleProps, IPanelStyles, IStyleFunctionOrObject } from "@fluentui/react";

export const issueListPanelStyles: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles> = {
	commands: { marginTop: "inherit" },
	contentInner: { display: "flex", flexDirection: "column", flexGrow: 1, overflowY: "hidden" },
	scrollableContent: { overflowY: "auto", flexGrow: 1, paddingLeft: 32, paddingRight: 32, paddingBottom: 16 },
};

export const issueDetailPanelStyles: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles> = {
	commands: { marginTop: "inherit" },
	contentInner: { display: "flex", flexDirection: "column", flexGrow: 1, overflowY: "hidden" },
	scrollableContent: { overflowY: "auto", flexGrow: 1, paddingLeft: 32, paddingRight: 32, paddingBottom: 16 },
};

export const backButtonStyles: Partial<IButtonStyles> = {
	root: {
		outline: "transparent",
		fontSize: 14,
		fontWeight: 400,
		border: "none",
		display: "flex",
		textAlign: "center",
		margin: 8,
		minHeight: 32,
		minWidth: 32,
		height: 32,
		width: 32,
		justifyContent: "center",
	},
	icon: { fontSize: 16, margin: "0px 4px", height: 16, lineHeight: 16, textAlign: "center", flexShrink: 0 },
};

export const cancelButtonStyle: Partial<IButtonStyles> = {
	root: {
		outline: "transparent",
		fontSize: 14,
		fontWeight: 400,
		border: "none",
		display: "flex",
		textAlign: "center",
		margin: 8,
		minHeight: 32,
		minWidth: 32,
		height: 32,
		width: 32,
		justifyContent: "center",
	},
	icon: { fontSize: 16, margin: "0px 4px", height: 16, lineHeight: 16, textAlign: "center", flexShrink: 0 },
};

export const linkStyleAdvisory: Partial<ILinkStyles> = {
	root: {
		color: "rgb(0, 108, 190)",
		"&:focus": {
			color: "rgb(0, 108, 190)",
		},
		"&:active": {
			color: "rgb(0, 108, 190)",
		},
		"&:hover": {
			color: "rgb(0, 108, 190)",
		},
	},
};

export const linkStyleWarning: Partial<ILinkStyles> = {
	root: {
		color: "rgb(197, 54, 1)",
		"&:focus": {
			color: "rgb(197, 54, 1)",
		},
		"&:active": {
			color: "rgb(197, 54, 1)",
		},
		"&:hover": {
			color: "rgb(197, 54, 1)",
		},
	},
};
