import * as React from 'react';
import styles from './ReactHierarchyView.module.scss';
import { IReactHierarchyViewProps } from './IReactHierarchyViewProps';
import { IHierarchyService } from '../interfaces';
import { HierarchyItem, ISPHierarchyItem } from '../interfaces/IHierarchyItem';
import OrgChart from 'react-orgchart';
import { MessageBar, MessageBarType, Spinner } from '@fluentui/react';
import { HierarchyService } from '../services';
import { ServiceScope } from '@microsoft/sp-core-library';

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

  public async componentDidMount(): Promise<void> {
    this.loadHierarchyView(this.props.listName);
  }

  public componentDidUpdate(newProps: IReactHierarchyViewProps): void {
    this.loadHierarchyView(newProps.listName);
  }

  private loadHierarchyView(listName: string): void {
    const serviceScope: ServiceScope = this.props.serviceScope;

    // Mapping to be used when web part runs in SharePoint.
    this.HierarchyServiceInstance = serviceScope.consume(HierarchyService.serviceKey);

    this.HierarchyServiceInstance.getHierarchyInfo(listName).then((hierarchyItems: ISPHierarchyItem[]) => {
      if (hierarchyItems.length > 0) {
        const hierarchyNodes: Array<HierarchyItem> = [];
        for (let count = 0; count < hierarchyItems.length; count++) {
          hierarchyNodes.push(new HierarchyItem(hierarchyItems[count].Id, hierarchyItems[count].Title, hierarchyItems[count].Url!, hierarchyItems[count].Parent ? hierarchyItems[count].Parent.Id : undefined));
        }

        const arrayToTree: any = require('array-to-tree');
        const orgChartHierarchyNodes: any = arrayToTree(hierarchyNodes);
        const output: any = JSON.stringify(orgChartHierarchyNodes[0]);

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
    }).catch((error) =>
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

  private MyNodeComponent = ({ node }: { node: any }): React.ReactElement => {
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
