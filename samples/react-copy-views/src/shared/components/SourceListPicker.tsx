import * as React from 'react';
import { IList, ISite } from '../interfaces';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IListsService, ListsService } from '../services';
import * as strings from 'CopyViewsSharedStrings';
import { ComboBox, IComboBox, IComboBoxOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/ComboBox';
import { uniq } from '@microsoft/sp-lodash-subset';
import { BaseType } from '../enums';

interface ISourceListPickerProps {
  serviceScope: ServiceScope;
  site?: ISite;
  defaultValue?: string;
  onChange: (list?:IList) => void;
  onError: (error: Error) => void;
}

interface ISourceListPickerState {
  availableLists?: IList[];
  selectedSourceList?: IList;
  loading: boolean;
  error?: Error;
}

export class SourceListPicker extends React.Component<ISourceListPickerProps, ISourceListPickerState> {
  private _listsService: IListsService;

  public constructor(props: ISourceListPickerProps) {
    super(props);

    this._listsService = props.serviceScope.consume(ListsService.serviceKey);

    this.state = {
      loading: false
    }
  }

  public componentDidUpdate(prevProps: Readonly<ISourceListPickerProps>): void {
    if (prevProps.site?.url !== this.props.site?.url) {
      if (this.props.site) {
        this._loadLists();        
      } 
      else {
        this.setState({ availableLists: null, selectedSourceList: null });
        this.props.onChange(null);
      }
    }
  }

  public render(): React.ReactElement<ISourceListPickerProps> {
    const { site } = this.props;
    const { availableLists, selectedSourceList } = this.state;

    return <>      
      <ComboBox
          label={strings.SelectAList}
          selectedKey={selectedSourceList?.id}
          options={this._getListsAsOptions(availableLists)}
          disabled={!site || !availableLists}        
          onChange={this._onChangeCombo}
        />
    </>;
  }
  
  private _getListsAsOptions = (lists: IList[]): IComboBoxOption[] => {
    if (!lists) {
      return undefined;
    }

    const options: IComboBoxOption[] = [];
    const listTypes = uniq(lists.map(l => l.type));

    listTypes.forEach((type, index) => {
      
      if (index > 0) {
        options.push({ itemType: SelectableOptionMenuItemType.Divider, key: `listsDivider_${type}`, text: null });
      }

      options.push({ itemType: SelectableOptionMenuItemType.Header, key: `listsHeader_${type}`, text: type === BaseType.DocumentLibrary ? strings.LibraryHeader : strings.ListHeader });

      lists.filter(l => l.type === type).forEach(list => {
        options.push({ id: list.id, key: list.id, text: list.title });
      });
    });
    
    return options;
  }

  
  private _onChangeCombo = async (event: React.FormEvent<IComboBox>, option?: IComboBoxOption): Promise<void> => {
    const { availableLists } = this.state;

    const selectedSourceList = availableLists.filter(l => l.id === option.id)[0];
    this.props.onChange(selectedSourceList);

    this.setState({ selectedSourceList });
  }

  private _loadLists = (): void => {
    const { site, defaultValue } = this.props;
    const { error } = this.state;
    
    if (error) {
      this.props.onError(undefined);
    }
    this.setState({ loading: true, error: undefined });

    this._listsService.get(site.url).then((availableLists) => {
      const selectedSourceList = availableLists && defaultValue ? availableLists.filter(l => l.id === defaultValue)[0] : null;
      this.setState({ loading: false,  availableLists, selectedSourceList });
      this.props.onChange(selectedSourceList);

    }, (error: Error) => {
      this.setState({ error });
      this.props.onError(error);
    });
  }
}
