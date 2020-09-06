import * as React from 'react';
import styles from './SiteCollectionCatalog.module.scss';
import { ISiteCollectionCatalogState } from './ISiteCollectionCatalogProps';
import { SiteCollectionCatalogHelper } from './SiteCollectionCatalogHelper';
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ISiteCollectionCatalogWebPartProps } from '../SiteCollectionCatalogWebPart';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';




const _viewFields: IViewField[] = [
  {
    name: "SiteTitle",
    linkPropertyName: "SiteURL",
    displayName: "Site Collection",
    sorting: true,
    minWidth: 120,
    isResizable: true
  },
  {
    name: "AppTitle",
    displayName: "App Title",
    sorting: true,
    minWidth: 200,
    isResizable: true,
    render: (item: any) => {
      var _color = "Red";
      if (!item.NoApps) {
        _color = "Green";
      }
      const element: any = React.createElement("span", { style: { color: _color } }, item.AppTitle);
      return element;
    }
  },
  {
    name: "AppCatalogVersion",
    displayName: "AppCatalogVersion",
    sorting: true,
    minWidth: 100
  },
  {
    name: "Deployed",
    displayName: "Deployed",
    minWidth: 70,
    render: (item: any) => {
      var _color = "Red";
      if (String(item.Deployed).toLowerCase() == "true") {
        _color = "Green";
      }
      const element: any = React.createElement("span", { style: { color: _color } }, item.Deployed);
      return element;
    }
  },
  {
    name: "InstalledVersion",
    displayName: "Installed Version",
    sorting: true,
    minWidth: 100
  },
  {
    name: "IsClientSideSolution",
    displayName: "Is Client Side Solution",
    minWidth: 150,
    render: (item: any) => {
      var _color = "Red";
      if (String(item.IsClientSideSolution).toLowerCase() == "true") {
        _color = "Green";
      }
      const element: any = React.createElement("span", { style: { color: _color } }, item.IsClientSideSolution);
      return element;
    }
  }
];

export default class SiteCollectionCatalog extends React.Component<ISiteCollectionCatalogWebPartProps, ISiteCollectionCatalogState> {

  constructor(props: ISiteCollectionCatalogWebPartProps) {
    super(props);
    this.state = {
      siteAppCatalogs: []
    };
  }


  public componentDidMount() {
    var tmpRes: Promise<any[]> = SiteCollectionCatalogHelper.getSiteCollectionCatalogList();

    tmpRes.then(res => {

      this.setState({ siteAppCatalogs: res });
    });

  }
  private _getSelection(items: any[]) {
    console.log('Selected items:', items);
  }

  public render(): React.ReactElement<ISiteCollectionCatalogWebPartProps> {
    return (
      <div className={styles.siteCollectionCatalog}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        <ListView
          items={this.state.siteAppCatalogs}
          viewFields={_viewFields}
          compact={true}
          selectionMode={SelectionMode.none}
          selection={this._getSelection}
          showFilter={true}
          filterPlaceHolder="Search..."
        />
      </div>
    );
  }
}
