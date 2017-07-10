import { ListState } from '../state/ListState';
import { Store } from 'redux';

export interface IDemoProps {
	store: Store<ListState>;
	description: string;
}
