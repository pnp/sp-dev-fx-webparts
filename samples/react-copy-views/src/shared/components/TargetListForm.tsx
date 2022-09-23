/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { IList } from './../interfaces';
import { ServiceScope } from '@microsoft/sp-core-library';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as strings from 'CopyViewsSharedStrings';
import { TargetListPicker } from './TargetListPicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseType } from '../enums';
import styles from '../SharedStyles.module.scss';

interface ITargetListFormProps {
  serviceScope: ServiceScope;
  baseType?: BaseType;
  exclude?: IList;
  resultSourceId?: string;
  onSelectionUpdate: (lists?:IList[]) => void;
  onError: (error: Error) => void;
}

interface ITargetListFormState {
  searchTerm?: string;
  selectedLists: IList[];
}

export class TargetListForm extends React.Component<ITargetListFormProps, ITargetListFormState> {
  private _debouncer: number;

  public constructor(props: ITargetListFormProps) {
    super(props);
    
    this.state = {
      selectedLists: []
    }
  }

  public render(): React.ReactElement<ITargetListFormProps> {
    const { serviceScope, baseType, exclude, resultSourceId, onError } = this.props;
    const { searchTerm } = this.state;

    return <>     
      <Stack tokens={{ childrenGap: 5 }}>
        <Label>{strings.TargetSearchLabel}</Label>
        <SearchBox disabled={baseType === undefined} title={strings.TargetSearchPlaceholder} onChange={this._onSearch} onEscape={this._onClearSearch} onClear={this._onClearSearch} className={styles.searchBox} />
        <TargetListPicker serviceScope={serviceScope} baseType={baseType} exclude={exclude} resultSourceId={resultSourceId} searchTerm={searchTerm} onChange={this._onListsSelected} onError={onError} />
      </Stack>
    </>;
  }
  
  private _onSearch = (ev: never, searchTerm: string): void => {
    clearTimeout(this._debouncer);
    this._debouncer = setTimeout(() => {
      this.setState({ searchTerm });
    }, 200);
  }
  
  private _onClearSearch = (): void => {
    this.setState({ searchTerm: null });
  }

  private _onListsSelected = (lists: IList[]): void => {    
    this.setState({ selectedLists: lists });

    this.props.onSelectionUpdate(lists);
  }
}
