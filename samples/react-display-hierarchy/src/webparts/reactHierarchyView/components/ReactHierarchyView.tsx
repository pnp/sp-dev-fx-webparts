import * as React from 'react';
import styles from './ReactHierarchyView.module.scss';
import { IReactHierarchyViewProps } from './IReactHierarchyViewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IHierarchyService } from '../interfaces';
import { IHierarchyItem, Item } from '../interfaces/IHierarchyItem';
import OrgChart from 'react-orgchart';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { HierarchyService } from '../services';
import { MockHierarchyService } from '../mocks';
import { ServiceScope, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface IReactHierarchyState {
  hierarchyItems: any;
  isLoading: boolean;
  showErrorMessage: boolean;
  errorMessage: string;
}

export default class ReactHierarchyView extends React.Component<IReactHierarchyViewProps, IReactHierarchyState> {
  private HierarchyServiceInstance: IHierarchyService;

  constructor(props: IReactHierarchyViewProps) {
    super(props);
    this.state = {
      hierarchyItems: null,
      isLoading: true,
      showErrorMessage: false,
      errorMessage: ""
    };
  }

  public async componentDidMount() {
    this.loadHierarchyView(this.props.listName);
  }

  public componentWillReceiveProps(nextProps: IReactHierarchyViewProps) {
    this.loadHierarchyView(nextProps.listName);
  }

  private loadHierarchyView(listName: string): void {
    let serviceScope: ServiceScope = this.props.serviceScope;

    // Based on the type of environment, return the correct instance of the IHierarchyServiceInstance interface
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      // Mapping to be used when webpart runs in SharePoint.
      this.HierarchyServiceInstance = serviceScope.consume(HierarchyService.serviceKey);
    }
    else {
      // This means webpart is running in the local workbench or from a unit test.
      // So we will need a non default implementation of the IHierarchyServiceInstance i.e. MockHierarchyService
      this.HierarchyServiceInstance = serviceScope.consume(MockHierarchyService.serviceKey);
    }

    this.HierarchyServiceInstance.getHierarchyInfo(listName).then((hierarchyItems: any) => {
      if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
        if (hierarchyItems.length > 0) {
          let hierarchyNodes: Array<Item> = [];
          var count: number;

          for (count = 0; count < hierarchyItems.length; count++) {
            hierarchyNodes.push(new Item(hierarchyItems[count].Id, hierarchyItems[count].Title, hierarchyItems[count].Url, hierarchyItems[count].Parent ? hierarchyItems[count].Parent.Id : undefined));
          }

          var arrayToTree: any = require('array-to-tree');
          var orgChartHierarchyNodes: any = arrayToTree(hierarchyNodes);

          var output: any = JSON.stringify(orgChartHierarchyNodes[0]);

          this.setState({
            hierarchyItems: JSON.parse(output),
            isLoading: false,
            showErrorMessage: false
          });
        }
        else {
          this.setState({
            hierarchyItems: [],
            isLoading: false,
            showErrorMessage: true,
            errorMessage: "No records to be displayed"
          });
        }
      }
      else {
        this.setState({
          hierarchyItems: JSON.parse(hierarchyItems),
          isLoading: false,
          showErrorMessage: false
        });
      }
    })
      .catch((error) =>
        this.setState({
          hierarchyItems: [],
          errorMessage: "Please verify web part configuration. Error details: " + error.message,
          isLoading: false,
          showErrorMessage: true
        })
      );
  }

  public render(): React.ReactElement<IReactHierarchyViewProps> {
    return (
      <div className={styles.reactHierarchyView}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              {this.state.isLoading && <Spinner label="Loading Hierarchy View..." />}
              {this.state.hierarchyItems && this.state.hierarchyItems.children &&
                <OrgChart tree={this.state.hierarchyItems} NodeComponent={this.MyNodeComponent} />
              }
            </div>
            {this.state.showErrorMessage &&
              <MessageBar messageBarType={MessageBarType.warning} isMultiline={false} dismissButtonAriaLabel="Close">
                {this.state.errorMessage}</MessageBar>
            }
          </div>
        </div>
      </div>
    );
  }

  private MyNodeComponent = ({ node }) => {
    if (node.url) {
      return (
        <div className="initechNode">
          <a href={node.url.Url} className={styles.link} >{node.title}</a>
        </div>
      );
    }
    else {
      return (
        <div className="initechNode">{node.title}</div>
      );
    }
  }
}
