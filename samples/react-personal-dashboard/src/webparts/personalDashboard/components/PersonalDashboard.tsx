import * as React from 'react';
import styles from './PersonalDashboard.module.scss';
import { IPersonalDashboardProps } from './IPersonalDashboardProps';
import { IPersonalDashboardState } from './IPersonalDashboardState';
import { DataFetcherService } from '../services/DataFetcherService';
import { IListItem } from '../models/IListItem';
import { Personalize } from './Personalize';
import { PersonalWidgetRenderer } from './PersonalWidgetRenderer';

export default class PersonalDashboard extends React.Component<IPersonalDashboardProps, IPersonalDashboardState> {
  private _widgetIndex: number;
  private _selectedIndex: number;
  private _apiServiceInstance: DataFetcherService;

  public constructor(props: IPersonalDashboardProps) {
    super(props);

    const {
      serviceScope
    } = props;

    this.state = {
      selectedWidgets: [],
      widgets: []
    };
    this._apiServiceInstance = new DataFetcherService(serviceScope);
  }

  public async componentDidMount(): Promise<void> {
    await this._initialize();
  }

  public render(): React.ReactElement<IPersonalDashboardProps> {
    return (
      <div className={styles.personalDashboard} >
        <Personalize
          widgets={this.state.widgets}
          selectedWidgets={this.state.selectedWidgets}
          handleWidgetSelected={this._handleSelected}
          handleWidgetUnselected={this._handleUnselected}
          reorderSelectedWidgets={this._reOrder}
          moveWidgetRight={this._moveRight}
          moveWidgetLeft={this._moveLeft}
          saveSelection={this._saveSelectedWidgets} />

        <div className={styles.dashboardContainer}>
          {this.state.selectedWidgets.map((selectedWidget) => {
            return (<PersonalWidgetRenderer key={selectedWidget.id}
              widget={selectedWidget}
              serviceScope={this.props.serviceScope} />);
          })}
        </div>
      </div >
    );
  }

  private _initialize = async (): Promise<void> => {
    const promises = [
      this._apiServiceInstance.getOrgWidgets(this.props.siteUrl),
      this._apiServiceInstance.getMySelectedWidgets()
    ];
    const [orgWidgets, userSelectedWidgets] = await Promise.all(promises);
    
    let selectedWidgetIds: string[] = [];
    if (userSelectedWidgets) {
      selectedWidgetIds = (userSelectedWidgets as string).split(',');
    } //3,6,2

    // initializes an empty object to store the indices of the widget IDs
    const indices: { [id: string]: number } = {};
    // populate the indices object with the widget ID as the key and the index as the value
    selectedWidgetIds.map((id, index) => {
      indices[id] = index;
    });
    // indices - {2: 2, 3: 0, 6: 1}

    const selectedWidgetSet = new Set(selectedWidgetIds);
    const apps: [IListItem[], IListItem[]] = [
      (orgWidgets as IListItem[]).filter(({ id }) => selectedWidgetSet.has(id.toString())),
      (orgWidgets as IListItem[]).filter(({ id }) => !selectedWidgetSet.has(id.toString()))
    ];
    apps[0].sort((a, b) => indices[a.id] - indices[b.id]);

    this.setState({
      selectedWidgets: apps[0],
      widgets: apps[1]
    });
  }

  private _handleSelected = (id: string): void => {
    const items = this.state.widgets;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id.toString() === id.toString()) {
        this._widgetIndex = i;
      }
    }

    this.setState({
      widgets: this.state.widgets.map(widget => {
        if (widget.id.toString() === id.toString()) {
          widget.selected = !widget.selected;
        } else {
          widget.selected = false;
        }
        return widget;
      })
    });
  }

  private _handleUnselected = (id: string): void => {
    const items = this.state.selectedWidgets;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id.toString() === id.toString()) {
        this._selectedIndex = i;
      }
    }

    this.setState({
      selectedWidgets: this.state.selectedWidgets.map(widget => {
        if (widget.id.toString() === id.toString()) {
          widget.selected = !widget.selected;
        } else {
          widget.selected = false;
        }
        return widget;
      })
    });
  }

  private _moveRight = (): void => {
    const widget: IListItem = this.state.widgets[this._widgetIndex];
    this.setState({
      widgets: this.state.widgets.filter((item) => {
        return item.id.toString() !== widget.id.toString();
      }),
      selectedWidgets: [...this.state.selectedWidgets, {
        id: widget.id.toString(),
        title: widget.title,
        icon: widget.icon,
        clientId: widget.clientId,
        display: widget.display,
        error: widget.error,
        api: widget.api,
        selected: false
      }]
    });
    this._widgetIndex = -1;
  }

  private _moveLeft = (): void => {
    const widget: IListItem = this.state.selectedWidgets[this._selectedIndex];
    this.setState({
      widgets: [...this.state.widgets, {
        id: widget.id.toString(),
        title: widget.title,
        icon: widget.icon,
        clientId: widget.clientId,
        display: widget.display,
        error: widget.error,
        api: widget.api,
        selected: false
      }],
      selectedWidgets: this.state.selectedWidgets.filter((item) => {
        return item.id.toString() !== widget.id.toString();
      })
    });
    this._selectedIndex = -1;
  }

  private _reOrder = (isUp: boolean): void => {
    const items: IListItem[] = isUp ?
      (this._selectedIndex === 0 ? this.state.selectedWidgets : this._swap(this._selectedIndex, this._selectedIndex - 1)) :
      (this._selectedIndex === this.state.selectedWidgets.length - 1 ? this.state.selectedWidgets : this._swap(this._selectedIndex, this._selectedIndex + 1));
    this.setState({
      selectedWidgets: items
    });
  }

  private _swap = (x, y): IListItem[] => {
    this._selectedIndex = y;
    const items = this.state.selectedWidgets;
    const b = items[x];
    items[x] = items[y];
    items[y] = b;
    return items;
  }

  private _saveSelectedWidgets = async (ids: string[]): Promise<void> => {
    await this._apiServiceInstance.setMySelectedWidgets(ids);
  }
}
