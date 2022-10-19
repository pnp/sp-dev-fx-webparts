import * as React from 'react';
import styles from './../SharedStyles.module.scss';
import { IList } from './../interfaces';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IListsService, ListsService } from './../services';
import * as strings from 'CopyViewsSharedStrings';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { BaseType } from '../enums';

interface ITargetListPickerProps {
  serviceScope: ServiceScope;
  baseType?: BaseType;
  exclude?: IList;
  searchTerm?: string;
  resultSourceId?: string;
  onChange: (lists?:IList[]) => void;
  onError: (error: Error) => void;
}

interface ITargetListPickerState {
  foundLists?: IList[];
  selectedLists: IList[];
  loading: boolean;
  error?: boolean;
}

export class TargetListPicker extends React.Component<ITargetListPickerProps, ITargetListPickerState> {
  private _listsService: IListsService;

  public constructor(props: ITargetListPickerProps) {
    super(props);

    this._listsService = props.serviceScope.consume(ListsService.serviceKey);

    this.state = {
      loading: false,
      selectedLists: []
    }
  }

  public componentDidUpdate(prevProps: Readonly<ITargetListPickerProps>): void {
    if (this.props.baseType !== undefined) {
      if (prevProps.searchTerm !== this.props.searchTerm
        || (prevProps.baseType !== this.props.baseType)
        || (prevProps.exclude !== this.props.exclude)) {

          if (prevProps.baseType !== this.props.baseType) {
            this.setState({ selectedLists: []}, () => {
              this._searchLists();
            });
          } 
          else {
            this._searchLists();
          }
      }
    }
  }
  
  public render(): React.ReactElement<ITargetListPickerProps> {
    const { baseType } = this.props;
    const { foundLists, selectedLists, loading } = this.state;

    const hiddenSelectedLists = selectedLists?.filter(sl => foundLists.every(fl => fl.uniqueKey !== sl.uniqueKey));
    const disabled = baseType === undefined;

    return <div>      
      <Label>{strings.SelectListsToCopyViewsTo} {foundLists ? `(${foundLists.length})` : ''}</Label>
      <div className={styles.checkboxSelectionContainer}>
        {
          !disabled && <>
            { 
              hiddenSelectedLists.length > 0 &&
                <Stack style={{ marginBottom: 5}} tokens={{ childrenGap: 5 }} id="SelectedLists">
                  { 
                    hiddenSelectedLists.map((list) => <><Checkbox key={list.uniqueKey} label={list.title} defaultChecked={true} id={list.uniqueKey}  /></>) 
                  }
                </Stack> 
            }        
            { 
              foundLists?.length > 0        
                ? <>                                         
                                                      
                    <Stack tokens={{ childrenGap: 5 }} id="FoundLists">
                      { 
                        foundLists?.map((list) => <><Checkbox key={list.uniqueKey} label={list.title} id={list.uniqueKey} defaultChecked={selectedLists.some(sl => sl.uniqueKey === list.uniqueKey)} onChange={this._onChangeListSelected} /></>)
                      }
                    </Stack>
                  </>
                : <em>{!loading && strings.NoListsFound}</em>
            }          
          </>
        }
      </div>       
    </div>;
  }
  
  private _onChangeListSelected = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void => {
    const { foundLists, selectedLists } = this.state;
    const uniqueKey = ev.currentTarget.id;
    const list =  foundLists.filter(l => l.uniqueKey === uniqueKey)[0];

    const lists = selectedLists.filter(l => l.uniqueKey !== uniqueKey);

    if (checked) {
      lists.push(list);
    }

    this.setState({ selectedLists: lists }, () => {
      this.props.onChange(lists);
    });
  }

  private _searchLists = (): void => {
    const { searchTerm, resultSourceId, baseType, exclude } = this.props;
    const { error } = this.state;
    
    if (error) {
      this.props.onError(undefined);
    }
    this.setState({ loading: true, error: undefined });

    this._listsService.search(baseType, searchTerm, resultSourceId).then(foundLists => {

      this.setState({ loading: false, foundLists: foundLists.filter(l => l.uniqueKey !== exclude.uniqueKey) });
    }, (error) => {
      this.setState({ error });
      this.props.onError(error);
    });
  }
}
