import { ListState } from '../state/ListState';
import { Store } from 'redux';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IDemoProps {
	store: Store<ListState>;
	description: string;
	spHttpClient: SPHttpClient;
	currentWebUrl: string;
}
