import * as React from "react";
import { IHolidaysListProps } from "../../../../common/interfaces/HolidaysCalendar";
import {
	ColumnDefinition,
	createColumn,
	DataGrid,
	DataGridBody,
	DataGridCell,
	DataGridHeader,
	DataGridHeaderCell,
	DataGridRow,
	RowState,
	TableCell,
	TableCellActions,
	TableCellLayout,
} from "@fluentui/react-components/unstable";
import { IHolidayItem } from "../../../../common/interfaces/HolidaysCalendar";
import { Button, Label, makeStyles, Title2 } from "@fluentui/react-components";
import { CalendarAdd20Regular, Diamond24Regular, ArrowDownload24Regular } from "@fluentui/react-icons";
const useStyles = makeStyles({
	root: {
		marginTop: "25px",
	},
});

export default function HolidaysList(props: IHolidaysListProps) {
	const classes = useStyles();
	const [showOptionalIcon, setShowOptionalIcon] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (props.items.length > 0) {
			props.items.filter((item) => item.holidayType.optional).length > 0;
			setShowOptionalIcon(true);
		}
	}, [props.items]);
	const columns: ColumnDefinition<IHolidayItem>[] = React.useMemo(
		() => [
			createColumn<IHolidayItem>({
				columnId: "HolidayTitle",
				renderHeaderCell: () => {
					return "";
				},
				renderCell: (item) => {
					return (
						<TableCell>
							<TableCellLayout>{item.holidayTitle.label}</TableCellLayout>
							<TableCellActions>
								<Button icon={<CalendarAdd20Regular />} appearance="subtle" onClick={() => props.onCalendarAddClick(item.Id)} />
							</TableCellActions>
						</TableCell>
					);
				},
			}),
			createColumn<IHolidayItem>({
				columnId: "HolidayDate",
				renderHeaderCell: () => {
					return "";
				},
				renderCell: (item) => {
					return <TableCellLayout>{item.holidayDate.label}</TableCellLayout>;
				},
			}),
			createColumn<IHolidayItem>({
				columnId: "HolidayDay",
				renderHeaderCell: () => {
					return "";
				},
				renderCell: (item) => {
					return <TableCellLayout>{item.holidayDay.label}</TableCellLayout>;
				},
			}),
			createColumn<IHolidayItem>({
				columnId: "HolidayType",
				renderHeaderCell: () => {
					return "";
				},
				renderCell: (item) => {
					return (
						<TableCellLayout>
							{props.showFixedOptional ? (
								item.holidayType.optional ? (
									<Diamond24Regular primaryFill="Orange" />
								) : (
									<Diamond24Regular primaryFill="Green" />
								)
							) : null}
						</TableCellLayout>
					);
				},
			}),
		],
		[props.items, props.showFixedOptional]
	);

	return (
		<>
			<Title2 align="center" style={{ fontFamily: "fontFamilyBase" }}>
				{props.title}
			</Title2>
			<DataGrid items={props.items} columns={columns} sortable={false} getRowId={(item: IHolidayItem) => item.Id}>
				<DataGridHeader>
					<DataGridRow>{({ renderHeaderCell }: ColumnDefinition<IHolidayItem>) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}</DataGridRow>
				</DataGridHeader>
				<DataGridBody>
					{({ item, rowId }: RowState<IHolidayItem>) => (
						<DataGridRow key={rowId}>{({ renderCell }: ColumnDefinition<IHolidayItem>) => <DataGridCell>{renderCell(item)}</DataGridCell>}</DataGridRow>
					)}
				</DataGridBody>
			</DataGrid>

			{props.showDownload && (
				<Button icon={<ArrowDownload24Regular />} appearance="subtle" onClick={props.onDownloadItems} className={classes.root}>
					Download
				</Button>
			)}
			{props.showFixedOptional && (
				<div className={classes.root}>
					<Diamond24Regular primaryFill="Green" />
					<Label>Fixed Holiday</Label>
					{showOptionalIcon && (
						<>
							<Diamond24Regular primaryFill="Orange" />
							<Label>Optional/Flexible holiday</Label>
						</>
					)}
				</div>
			)}
		</>
	);
}
