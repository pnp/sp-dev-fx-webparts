import * as React from 'react';
import styles from './../SharedStyles.module.scss';
import { ISite } from './../interfaces';
import { ServiceScope } from '@microsoft/sp-core-library';
import { SitesService, ISitesService } from './../services';
import * as strings from 'CopyViewsSharedStrings';
import { BasePicker, IBasePickerProps, IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

interface ISourceSitePickerProps {
  serviceScope: ServiceScope;
  resultSourceId?: string;
  defaultValue?: string;
  onChange: (site?:ISite) => void;
  onError: (error: Error) => void;
}

interface ISourceSitePickerState {
  selectedSourceSite?: ISite;
  loading: boolean;
  error?: Error;
}

export interface ISitePickerProps extends IBasePickerProps<ISite> {}

class SitePicker extends BasePicker<ISite, ISitePickerProps> {}

export class SourceSitePicker extends React.Component<ISourceSitePickerProps, ISourceSitePickerState> {
  private _sitesService: ISitesService;

  public constructor(props: ISourceSitePickerProps) {
    super(props);
    
    this._sitesService = props.serviceScope.consume(SitesService.serviceKey);    

    this.state = {
      loading: false
    };
  }

  public componentDidMount(): void {
    const { defaultValue } = this.props;
    
    if (defaultValue) {
      this._loadSite();    
    }
  }

  public render(): React.ReactElement<ISourceSitePickerProps> {
    const { selectedSourceSite } = this.state;

    return <>
      <Label>{strings.SearchAndSelectSourceSite}</Label>
      <SitePicker 
          onResolveSuggestions={this._getSitePickerOptions}
          onRenderSuggestionsItem={this._renderSuggestion}
          onRenderItem={this._renderItem}
          onChange={this._onSiteSelected}
          selectedItems={selectedSourceSite ? [selectedSourceSite] : []}
          itemLimit={1}      
          resolveDelay={500} className={styles.sitePicker} />
    </>;
  }
  
  private _getSitePickerOptions = async (filterText: string): Promise<ISite[]> => {
    const { resultSourceId } = this.props;
    
    if(filterText.length <= 2)
        return [];

    try {
        const sites = await this._sitesService.search(filterText, resultSourceId);
        return sites;
    }
    catch(error) {
        this.props.onError(error);
        return [];
    }
  }

  private _renderSuggestion = (props: ISite): JSX.Element => {
    return <div className={styles.SiteSuggestion}>
      {props.title}<br/>
      <small>{props.url}</small>
    </div>;
  }

  private _renderItem = (props: IPickerItemProps<ISite>): JSX.Element => {
    return <div className={styles.selectedSite}>
      {props.item.title}
      <IconButton iconProps={{ iconName: 'Cancel' }} onClick={this._clearSelection} />
    </div>;
  }

  private _onSiteSelected = async (selectedSourceSites: ISite[]): Promise<void> => {
    const selectedSourceSite = selectedSourceSites ? selectedSourceSites[0] : null;

    this.props.onChange(selectedSourceSite);

    this.setState({ selectedSourceSite });
  }

  private _clearSelection = (): void => {
    this.props.onChange(null);

    this.setState({ selectedSourceSite: null });
  }

  private _loadSite = (): void => {
    const { defaultValue, onChange, onError } = this.props;
    const { error } = this.state;
    
    if (error) {
      this.props.onError(undefined);
    }
    this.setState({ loading: true, error: undefined });

    this._sitesService.get(defaultValue).then(site => {
      this.setState({ selectedSourceSite: site });
      onChange(site);
    }, (error: Error) => {
      this.setState({ error });
      onError(error);
    });
  }
}