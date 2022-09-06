/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { IDefaults, IList, IListView, ISite } from './../interfaces';
import { ServiceScope } from '@microsoft/sp-core-library';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { SourceSitePicker } from '.';
import { SourceListPicker } from '.';
import { SourceListViewPicker } from '.';

interface ISourceListViewFormProps {
  serviceScope: ServiceScope; 
  defaultValues?: IDefaults;
  resultSourceId?: string;
  onSelectionUpdate: (listViews?:IListView[], list?: IList) => void;
  onError: (error: Error) => void;
}

interface ISourceListViewFormState {
  selectedSourceSite?: ISite;
  selectedSourceList?: IList;
  selectedViews: IListView[];
}

export class SourceListViewForm extends React.Component<ISourceListViewFormProps, ISourceListViewFormState> {

  public constructor(props: ISourceListViewFormProps) {
    super(props);
    
    this.state = {      
      selectedViews: []
    }
  }

  public render(): React.ReactElement<ISourceListViewFormProps> {
    const { serviceScope, resultSourceId, defaultValues, onError } = this.props;
    const { selectedSourceSite, selectedSourceList } = this.state;

    return <>     
      <Stack tokens={{ childrenGap: 5 }}>
        <SourceSitePicker serviceScope={serviceScope} defaultValue={defaultValues?.siteUrl} resultSourceId={resultSourceId} onChange={(site) => this.setState({ selectedSourceSite: site })} onError={onError} />
        
        <SourceListPicker serviceScope={serviceScope} defaultValue={defaultValues?.listId} site={selectedSourceSite} onChange={this._onListSelected} onError={onError} />

        <SourceListViewPicker serviceScope={serviceScope} defaultValue={defaultValues?.viewId} site={selectedSourceSite} list={selectedSourceList} onChange={this._onListViewsSelected} onError={onError} />
      </Stack>
    </>;
  }
  
  private _onListSelected = async (selectedSourceList?: IList): Promise<void> => {
    this.setState({ selectedSourceList });

    this.props.onSelectionUpdate(undefined, selectedSourceList);
  }

  private _onListViewsSelected = (listViews: IListView[]): void => {    
    const { selectedSourceList } = this.state;

    this.setState({ selectedViews: listViews });

    this.props.onSelectionUpdate(listViews, selectedSourceList);
  }
}
