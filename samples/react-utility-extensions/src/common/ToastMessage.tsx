import { useId, useToastController, Toast, ToastTitle, Toaster, ToastPosition, FluentProvider, webLightTheme } from "@fluentui/react-components";
import * as React from "react";

export interface IToastMessageProps {
	message: string;
	type: "success" | "info" | "warning" | "error";
	position: ToastPosition | undefined;
}

export const ToastMessage = (props: IToastMessageProps): React.JSX.Element => {
	const toasterId = useId("toaster");
	const { dispatchToast } = useToastController(toasterId);

	const intent = props.type;
	React.useEffect(() => {
		dispatchToast(
			<Toast>
				<ToastTitle>{props.message}</ToastTitle>
			</Toast>,
			{ intent }
		);
	});

	return (
		<>
			<FluentProvider theme={webLightTheme}>
				<Toaster toasterId={toasterId} position={props.position} />
			</FluentProvider>
		</>
	);
};
