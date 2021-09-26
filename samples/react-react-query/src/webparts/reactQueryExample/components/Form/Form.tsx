import { sp } from '@pnp/sp';
import { format } from 'date-fns';
import {
	DetailsList,
	DetailsListLayoutMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { IFormProps } from './IFormProps';
import styles from './Form.module.scss';
import { ITextField, TextField } from 'office-ui-fabric-react/lib/TextField';
import {
	DefaultButton,
	PrimaryButton,
} from 'office-ui-fabric-react/lib/Button';

export const Form: FunctionComponent<IFormProps> = (props: IFormProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isNew, setIsNew] = useState(true);
	const [title, setTitle] = useState('');

	let titleEl: ITextField;

	useEffect(() => {
		if (!props.selectedItem) {
			setTitle('');
			setIsNew(true);
			return;
		}

		setIsNew(false);
		setTitle(props.selectedItem.title);
		titleEl.focus();
	}, [props.selectedItem]);

	async function addItem() {
		setIsLoading(true);
		await sp.web.lists.getById(props.listId).items.add({ Title: title });
		props.updateIsNeedRefreshData(true);
		setTitle('');
		setIsLoading(false);
	}

	async function editItem() {
		setIsLoading(true);
		await sp.web.lists
			.getById(props.listId)
			.items.getById(props.selectedItem.id)
			.update({ Title: title });
		props.updateIsNeedRefreshData(true);
		props.setSelectedItem(null);
		setIsNew(true);
		setIsLoading(false);
	}

	async function handleClickSave() {
		if (isNew) {
			await addItem();
		} else {
			await editItem();
		}
	}

	async function handleClickDelete() {
		await sp.web.lists
			.getById(props.listId)
			.items.getById(props.selectedItem.id)
			.delete();
		props.updateIsNeedRefreshData(true);
		props.setSelectedItem(null);
		setIsNew(true);
		setIsLoading(false);
	}

	async function handleClickCancel() {
		if (isNew) {
			setTitle('');
		} else {
			props.setSelectedItem(null);
		}
	}

	return (
		<div className={styles.form}>
			<span className={styles.title}>
				{isNew ? 'Add' : 'Edit'} Item
				{props.selectedItem ? ` (ID: ${props.selectedItem.id})` : ''}
			</span>
			<TextField
				label='Title'
				value={title}
				onChange={(event, newValue) => setTitle(newValue)}
				onKeyPress={(event) => {
					if (event.key === 'Enter') handleClickSave();
				}}
				disabled={isLoading}
				componentRef={el => titleEl = el}
			/>
			<div className={styles.buttonsContainer}>
				{!isNew && (
					<PrimaryButton
						text='Delete'
						onClick={handleClickDelete}
						allowDisabledFocus
						disabled={isLoading}
					/>
				)}
				<PrimaryButton
					text='Save'
					onClick={handleClickSave}
					allowDisabledFocus
					disabled={isLoading}
				/>
				<DefaultButton
					text='Cancel'
					onClick={handleClickCancel}
					allowDisabledFocus
					disabled={isLoading}
				/>
			</div>
		</div>
	);
};
