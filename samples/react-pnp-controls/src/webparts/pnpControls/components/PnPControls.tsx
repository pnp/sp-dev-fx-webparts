import * as React from 'react';
import * as moment from 'moment';
import { IPnPControlsProps, IPnpControlsState } from './IPnPControlsProps';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { ListView, SelectionMode } from '@pnp/spfx-controls-react/lib/ListView';
import { SPHttpClient } from '@microsoft/sp-http';
import { IViewField } from '@pnp/spfx-controls-react/lib/controls/listView';

export default class PnPControls extends React.Component<IPnPControlsProps, IPnpControlsState> {
  // Specify the fields that need to be viewed in the listview
  private _viewFields: IViewField[] = [
    {
      name: "Id",
      displayName: "ID",
      maxWidth: 25,
      minWidth: 25,
      sorting: true
    },
    {
      name: "File.Name",
      linkPropertyName: "File.ServerRelativeUrl",
      displayName: "Name",
      sorting: true
    },
    {
      name: "File.TimeCreated",
      displayName: "Created",
      minWidth: 150,
      render: (item: any) => {
        const created = item["File.TimeCreated"];
        if (created) {
          const createdDate = moment(created);
          return <span>{createdDate.format('DD/MM/YYYY HH:mm:ss')}</span>;
        }
      }
    }
  ];

  /**
   * Constructor
   * @param props
   */
  constructor(props: IPnPControlsProps) {
    super(props);

    this.state = {
      items: [],
      loading: false,
      showPlaceholder: (this.props.list === null || this.props.list === "")
    };
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount() {
    if (this.props.list !== null && this.props.list !== "") {
      this._getListItems();
    }
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param nextProps
   * @param nextState
   */
  public componentDidUpdate(prevProps: IPnPControlsProps, prevState: IPnpControlsState) {
    if (this.props.list !== prevProps.list || this.props.terms !== prevProps.terms) {
      if (this.props.list !== null && this.props.list !== "") {
        this._getListItems();
      } else {
        this.setState({
          showPlaceholder: true
        });
      }
    }
  }

  /**
   * Retrieves items for the specified list
   * @param listId
   */
  private _getListItems() {
    this.setState({
      loading: true
    });

    let restApi = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'${this.props.list.toString()}')/items?$expand=File`;

    // Check if results need to be filtered
    if (typeof this.props.terms !== "undefined" && this.props.terms !== null && this.props.terms.length > 0) {
      // Get the first term (single selection)
      const term = this.props.terms[0];
      // Add the filter to the restApi URL
      restApi += `,TaxCatchAll&$select=*,TaxCatchAll/Term&$filter=TaxCatchAll/Term eq '${term.name}'`;
    }

    this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)
      .then(resp => { return resp.json(); })
      .then(items => {
        console.log('List Items:', items);
        this.setState({
          items: items.value ? items.value : [],
          loading: false,
          showPlaceholder: false
        });
      });
  }

  /*
   * Opens the web part property pane
  */
  private _configureWebPart() {
    this.props.context.propertyPane.open();
  }


  /**
   * React render method
   */
  public render(): React.ReactElement<IPnPControlsProps> {
    // Check if placeholder needs to be shown
    if (this.state.showPlaceholder) {
      return (
        <Placeholder
          iconName="Edit"
          iconText="List view web part configuration"
          description="Please configure the web part before you can show the list view."
          buttonLabel="Configure"
          onConfigure={this._configureWebPart.bind(this)} />
      );
    }

    return (
      <div>
        {
          this.state.loading ?
            (
              <Spinner size={SpinnerSize.large} label="Retrieving results ..." />
            ) : (
              this.state.items.length === 0 ?
                (
                  <Placeholder
                    iconName="InfoSolid"
                    iconText="No items found"
                    description="The list or library you selected does not contain items." />
                ) : (
                  <div>
                    <p className="ms-font-xl">{this.props.description}</p>
                    <ListView items={this.state.items} 
                    viewFields={this._viewFields} 
                    iconFieldName="File.ServerRelativeUrl"
                    selectionMode={SelectionMode.multiple}
                    selection={this._getSelection}
                    />
                  </div>
                )
            )
        }
      </div>
    );
  }
  private _getSelection(items: any[]) {
    console.log('Selected items:', items);
  }
}

