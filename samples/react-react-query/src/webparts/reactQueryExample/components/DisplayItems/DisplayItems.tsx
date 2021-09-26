import { sp } from '@pnp/sp';
import { format } from 'date-fns';
import {
	DetailsList,
	DetailsListLayoutMode,
	SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import { IDisplayItemsProps } from './IDisplayItemsProps';

export const DisplayItems: FunctionComponent<IDisplayItemsProps> = (
	props: IDisplayItemsProps
) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const columns = [
		{
			key: 'id',
			name: 'ID',
			fieldName: 'id',
			minWidth: 50,
			maxWidth: 50,
			isResizable: true,
		},
		{
			key: 'title',
			name: 'Title',
			fieldName: 'title',
			minWidth: 250,
			isResizable: true,
		},
		{
			key: 'editor',
			name: 'Modified By',
			fieldName: 'editor',
			minWidth: 200,
			isResizable: true,
		},
		{
			key: 'modified',
			name: 'Last Modified',
			fieldName: 'modified',
			minWidth: 200,
			isResizable: true,
		},
	];

	useEffect(() => {
		if (!props.isNeedRefreshData) return;

		setIsLoading(true);
		const fetchData = async () => {
			const result = await sp.web.lists
				.getById(props.listId)
				.items.expand('Editor')
				.select('ID', 'Title', 'Modified', 'Editor/Title')
				.orderBy('Modified', false)
				.get();
			setItems(
				result.map((item) => ({
					id: item.ID,
					title: item.Title,
					editor: item.Editor.Title,
					modified: format(new Date(item.Modified), 'kk:mm PPP'),
				}))
			);
			setIsLoading(false);
			props.updateIsNeedRefreshData(false);
		};
		fetchData();
	}, [props.isNeedRefreshData]);

	function handleItemInvoked(item: any, index: number) {
		props.setSelectedItem(item);
	}

	if (isLoading) {
		return (
			<div>
				<Spinner label='Loading data...' />
			</div>
		);
	}

	return (
		<DetailsList
			items={items}
			columns={columns}
			setKey='set'
			layoutMode={DetailsListLayoutMode.justified}
			ariaLabelForSelectionColumn='Toggle selection'
			ariaLabelForSelectAllCheckbox='Toggle selection for all items'
			checkButtonAriaLabel='select row'
			onItemInvoked={handleItemInvoked}
			selectionMode={SelectionMode.none}
		/>
	);
};
