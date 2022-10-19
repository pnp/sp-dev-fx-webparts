import * as React from 'react';
import styles from './../SharedStyles.module.scss';
import { IList, IListView, ISite } from './../interfaces';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IListViewsService, ListViewsService } from './../services';
import * as strings from 'CopyViewsSharedStrings';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

interface ISourceListViewPickerProps {
  serviceScope: ServiceScope;
  defaultValue?: string;
  site?: ISite;
  list?: IList;
  onChange: (listViews?:IListView[]) => void;
  onError: (error: Error) => void;
}

interface ISourceListViewPickerState {
  availableViews?: IListView[];
  selectedViews: IListView[];
  loading: boolean;
  error?: boolean;
}

export class SourceListViewPicker extends React.Component<ISourceListViewPickerProps, ISourceListViewPickerState> {
  private _listViewsService: IListViewsService;

  public constructor(props: ISourceListViewPickerProps) {
    super(props);

    this._listViewsService = props.serviceScope.consume(ListViewsService.serviceKey);

    this.state = {
      loading: false,
      selectedViews: []
    }
  }

  public componentDidUpdate(prevProps: Readonly<ISourceListViewPickerProps>): void {
    if (prevProps.list?.id !== this.props.list?.id) {
      const { site, list } = this.props;      

      if (site && list) {
        this._loadListViews();
      }
      else {
        this.setState({ availableViews: null, selectedViews: [] });
        this.props.onChange([]);
      }
    }
  }

  public render(): React.ReactElement<ISourceListViewPickerProps> {
    const { site, list } = this.props;
    const { availableViews, selectedViews } = this.state;
    
    return <div>
      <Label>{strings.SelectViewsToCopy}</Label>
      <div className={styles.checkboxSelectionContainer} style={{ height: 235 }}>
        { 
          site && list             
            ? <Stack tokens={{ childrenGap: 5 }}>
                { 
                  availableViews?.map(view => { 
                    const viewDisabled = view.viewType === 'KANBAN' || view.viewType === 'MODERNCALENDAR';
                    return <><Checkbox key={view.id} disabled={viewDisabled} label={view.title} id={view.id} checked={selectedViews.some(v => v.id === view.id)} onChange={this._onChangeViewSelected} title={viewDisabled ? strings.ViewTypeNotSupported : ''} /></>
                  })}
              </Stack>
            : <em>{strings.SelectASiteAndList}</em>
        }   
      </div>
    </div>;
  }
  
  private _onChangeViewSelected = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void => {
    const { availableViews, selectedViews } = this.state;
    const view =  availableViews.filter(v => v.id === ev.currentTarget.id)[0];

    const views = selectedViews.filter(v => v.id !== view.id);

    if (checked) {
      views.push(view);
    }

    this.setState({ selectedViews: views });

    this.props.onChange(views);
  }

  
  private _loadListViews = (): void => {
    const { site, list, defaultValue } = this.props;
    const { error } = this.state;

    if (error) {
      this.props.onError(undefined);
    }
    this.setState({ loading: true, error: undefined });

    this._listViewsService.get(site.url, list.id).then((availableViews) => {
      const selectedViews = availableViews && defaultValue ? availableViews.filter(l => l.id === defaultValue) : [];
      this.setState({ loading: false, availableViews, selectedViews });
      this.props.onChange(selectedViews);
    }, (error) => {
      this.setState({ error });
      this.props.onError(error);
    });
  }
}
