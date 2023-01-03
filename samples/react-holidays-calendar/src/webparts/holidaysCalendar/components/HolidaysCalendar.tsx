import * as React from "react";
import { IHolidaysCalendarState } from "../interfaces/IHolidaysCalendarState";
import { HolidaysCalendarService } from "../../../common/services/HolidaysCalendarService";
import HolidaysList from "./HolidaysList/HolidaysList";
import { Alert } from "@fluentui/react-components/unstable";
import { IHolidaysCalendarProps } from "./IHolidaysCalendarProps";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { DismissCircleRegular } from "@fluentui/react-icons";
import csvDownload from "json-to-csv-export";
const HolidaysCalendar = (props: IHolidaysCalendarProps) => {
	const [service] = React.useState<HolidaysCalendarService>(new HolidaysCalendarService(props.spService, props.graphService));

	const [state, setState] = React.useState<IHolidaysCalendarState>({
		listItems: [],
		holidayListItems: [],
		message: {
			show: false,
			intent: "success",
		},
		employeeInfo: null,
		columns: [],
	});

	const handleCalenderAddClick = async (itemId: number) => {
		try {
			const selectedItem = state.holidayListItems.filter((item) => item.Id === itemId);
			await service.addLeaveInCalendar(state.employeeInfo, selectedItem[0]);
			setState((prevState: IHolidaysCalendarState) => ({ ...prevState, message: { show: true, intent: "success" } }));
		} catch (ex) {
			setState((prevState: IHolidaysCalendarState) => ({ ...prevState, message: { show: true, intent: "error" } }));
		}
	};

	const handleDismissClick = () => {
		setState((prevState: IHolidaysCalendarState) => ({ ...prevState, message: { show: false, intent: "success" } }));
	};

	const handleDownload = () => {
		const itemsToDownload = service.getItemsToDownloadAsCSV(state.holidayListItems);
		csvDownload(itemsToDownload);
	};

	/* eslint-disable */
	React.useEffect(() => {
		(async () => {
			const employeeInfo = await service.getEmployeeInfo();

			const listItems = await service.getHolidaysByLocation(employeeInfo.officeLocation);
			const holidayItems = service.getHolidayItemsToRender(listItems);

			setState((prevState: IHolidaysCalendarState) => ({ ...prevState, listItems: listItems, holidayListItems: holidayItems, employeeInfo: employeeInfo }));
		})();
	}, []);
	return (
		<>
			<FluentProvider theme={webLightTheme}>
				{state.message.show && (
					<Alert intent={state.message.intent} action={{ icon: <DismissCircleRegular aria-label="dismiss message" onClick={handleDismissClick} /> }}>
						{state.message.intent === "success" ? "Holiday added in calendar" : "Some error occurred"}
					</Alert>
				)}
				{state.holidayListItems.length > 0 && (
					<HolidaysList
						items={state.holidayListItems}
						onCalendarAddClick={handleCalenderAddClick}
						onDownloadItems={handleDownload}
						showDownload={props.showDownload}
						title={props.title}
						showFixedOptional={props.showFixedOptional}
					/>
				)}
			</FluentProvider>
		</>
	);
};

export default HolidaysCalendar;
