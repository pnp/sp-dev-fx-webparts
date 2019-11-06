import * as React from 'react';
import styles from './SiteCollectionCatalog.module.scss';
import { ISiteCollectionCatalogProps, ISiteCollectionCatalogState } from './ISiteCollectionCatalogProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SiteCollectionCatalogHelper } from './SiteCollectionCatalogHelper';
import { Label } from 'office-ui-fabric-react';
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

const _groupByFields: IGrouping[] = [
  {
    name: "SiteURL",
    order: GroupOrder.ascending
  }
];
const _viewFields: IViewField[] = [
 {
   name: "SiteTitle",
   linkPropertyName: "SiteURL",
   displayName: "Site Collection",
   sorting: true,
   minWidth: 120
 },
  {
    name: "AppTitle",
    displayName: "App Title",
    sorting: true,
    minWidth: 200
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
    minWidth: 70
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
    minWidth: 150
  }
];

export default class SiteCollectionCatalog extends React.Component<ISiteCollectionCatalogProps, ISiteCollectionCatalogState> {

  constructor(props: ISiteCollectionCatalogProps) {
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

  public render(): React.ReactElement<ISiteCollectionCatalogProps> {
    return (
      <div className={styles.siteCollectionCatalog}>

        <ListView
          items={this.state.siteAppCatalogs}
          viewFields={_viewFields}
          //iconFieldName="ServerRelativeUrl"
          compact={true}
          selectionMode={SelectionMode.none}
          selection={this._getSelection}
          showFilter={true}
          //defaultFilter="John"
          filterPlaceHolder="Search..."
          //groupByFields={_groupByFields}
        />
      </div>
    );
  }
}
