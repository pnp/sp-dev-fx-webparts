import * as React from 'react';
import styles from './LeadAssistDashboard.module.scss';
import { ILeadAssistDashboardProps } from './ILeadAssistDashboardProps';
import { ILeadAssistDashboardState } from './ILeadAssistDashboardState';
import * as strings from 'LeadAssistDashboardWebPartStrings';
import { WidgetSize, Dashboard, IWidget } from '@pnp/spfx-controls-react/lib/Dashboard';
import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { IColumn, Icon, Label, Separator, Spinner, SpinnerSize, TextField, initializeIcons, PrimaryButton } from 'office-ui-fabric-react';
import { Agenda, Todo } from '@microsoft/mgt-react/dist/es6/spfx';
import CustomAgendaTemplate from "./CustomAgendaTemplate";
import CustomTodoTemplate from "./CustomTodoTemplate";
import DataService from '../../../services/DataService';
import SettingsService from '../../../services/SettingsService';
import { IValueListItem } from '../../../services/IValueListItem';
import { ISaleListItem } from '../../../services/ISaleListItem';

export default class LeadAssistDashboard extends React.Component<ILeadAssistDashboardProps, ILeadAssistDashboardState> {
  constructor(props) {
    super(props);

    // Initialize Office UI Fabric icons
    initializeIcons();
    
    // Initialize the state
    this.state = {
      activityCallItems: undefined,
      activityEmailItems: undefined,
      activityTextItems: undefined,
      progressItems: undefined,
      recentlyDoneSalesContractItems: undefined,
      isLoading: true,
      listsAreEmpty: true,
      siteUrl: props.siteUrl
    };
  }

  public async componentDidMount(): Promise<void> {
    // If a site url has been specified
    if (this.props.siteUrl && this.props.siteUrl.length > 0) {
      // If all of the state properties containing SharePoint list items are not defined or are empty load them
      if ((!this.state.activityCallItems || this.state.activityCallItems.length == 0) 
        && (!this.state.activityEmailItems || this.state.activityEmailItems.length == 0)
        && (!this.state.activityTextItems || this.state.activityTextItems.length == 0)
        && (!this.state.progressItems || this.state.progressItems.length == 0)
        && (!this.state.recentlyDoneSalesContractItems || this.state.recentlyDoneSalesContractItems.length == 0)) {
        
          try
          {
            // Get the list items
            const callValues: IValueListItem[] = await DataService.getItemsWithValueFromList(DataService.ActivityCallsListName, (i): IValueListItem => ({ value: i[DataService.FieldValueName] }));
            const emailValues: IValueListItem[] = await DataService.getItemsWithValueFromList(DataService.ActivityEmailsListName, (i): IValueListItem => ({ value: i[DataService.FieldValueName] }));
            const textValues: IValueListItem[] = await DataService.getItemsWithValueFromList(DataService.ActivityTextsListName, (i): IValueListItem => ({ value: i[DataService.FieldValueName] }));
            const progressValues: IValueListItem[] = await DataService.getItemsWithValueFromList(DataService.ProgressListName, (i): IValueListItem => ({ value: i[DataService.FieldValueName] }));
            const recentlyDoneSalesContractValues: ISaleListItem[] = await DataService.getSalesItemsFromList(DataService.RecentlyDoneSalesContractsListName, (i): ISaleListItem => ({ id: i.Id, title: i[DataService.FieldTitleName], description: i[DataService.FieldDescriptionName]}));

            // Update state
            this.setState({
              activityCallItems: callValues,
              activityEmailItems: emailValues,
              activityTextItems: textValues,
              progressItems: progressValues,
              recentlyDoneSalesContractItems: recentlyDoneSalesContractValues,
              isLoading: false,
              listsAreEmpty: callValues.length == 0 
                              && emailValues.length == 0
                              && textValues.length == 0
                              && progressValues.length == 0
                              && recentlyDoneSalesContractValues.length == 0
            }); 
          }
          catch (e) {
            console.log(e);
            this.setState({
              isLoading: false
            });
          }
      }
      else {
        this.setState({
          isLoading: false
        });
      }
    }
    else {
      this.setState({
        isLoading: false,
        listsAreEmpty: true
      });
    }
  }

  /**
   * Handle the change of the site url
   * @param event 
   */
  private changeSiteUrlHandler = async (event) => {
    const value = event.target.value;
  
    this.setState({
      siteUrl: value
    });
  }

  public render(): React.ReactElement<ILeadAssistDashboardProps> {
    let content: JSX.Element = null;

    // If the site url has been specified
    if (this.props.siteUrl && this.props.siteUrl.length > 0) {
      // If the state properties containing the SharePoint list items data are specified
      if (this.state.activityCallItems && this.state.activityEmailItems && this.state.activityTextItems && this.state.progressItems && this.state.recentlyDoneSalesContractItems) {
        // If the SharePoint lists are empty
        if (this.state.listsAreEmpty == true) {
          // Specify that no item has been found
          content = <div className={styles.paddedContainer}>
              <b>{strings.NoListItemsFound}</b>
            </div>;
        }
        else {
          // Create the dashboard element
          content = <Dashboard widgets={this.getDashboardWidgets()} />;
        }
      }
      else {
        // Specify that the SharePoint lists are missing
        content = <div className={styles.paddedContainer}>
            <b>{strings.CreateListsLabel}</b>
          </div>;
      }
    }
    else {
      // If the site url has not been yet specified returns a form to specify it
      content = <div className={styles.paddedContainer}>
        <div className={styles.padding5}>
          <Label>{strings.TargetSiteUrl}</Label>
          <TextField value={this.props.siteUrl} onChange={this.changeSiteUrlHandler} />
        </div>
        <div className={styles.padding5}>
          <PrimaryButton text={strings.SaveConfiguration} onClick={() => { SettingsService.saveSettings(this.props.graphClient, { siteUrl: this.state.siteUrl }, 'lead_dashboard_settings.json'); }} />
        </div>
      </div>;
    }

    return (
      <div className={styles.leadAssistDashboard}>
        {this.state.isLoading && <Spinner size={SpinnerSize.large} title={strings.Loading} className={styles.loader} />}
        {!this.state.isLoading && content}
      </div>
    );
  }

  /**
   * Get the dashboard widgets
   * @returns An array of the widgets to be added to the dashboard element
   */
  private getDashboardWidgets() : IWidget[] {
    return [{
      title: strings.ActivityChartTitle,
      size: WidgetSize.Double,
      body: [
        {
          id: "activityChartTab",
          title: strings.ActivityChartTitle,
          content: (
            this.getActivityChartTab()
          )
        }
      ]
    },
    {
      title: strings.ProgressChartTitle,
      size: this.props.isTeamsContext ? WidgetSize.Double : WidgetSize.Single,
      body: [
        {
          id: "progressChartTab",
          title: strings.ProgressChartTitle,
          content: (
            this.getProgressChartTab()
          )
        }
      ]
    },
    {
      title: strings.MyDayTitle,
      size: WidgetSize.Single,
      body: [
        {
          id: "myDayTab",
          title: strings.MyDayTitle,
          content: (
            this.getMyDayTab()
          )
        }
      ]
    },
    {
      title: strings.RecentlyDoneSalesTitle,
      size: this.props.isTeamsContext ? WidgetSize.Double : WidgetSize.Single,
      body: [
        {
          id: "recentlyDoneSalesTab",
          title: strings.RecentlyDoneSalesTitle,
          content: (
            this.getRecentlyDoneSalesTab()
          )
        }
      ]
    },
    {
      title: strings.ToDoTitle,
      size: WidgetSize.Single,
      body: [
        {
          id: "toDoTab",
          title: strings.ToDoTitle,
          content: (
            this.getToDoTab()
          )
        }
      ]
    }];
  }

  /**
   * Get the content for the Activity chart widget
   * @returns Element representing the Activity chart tab
   */
  private getActivityChartTab() {
    const data = this.getActivityData();
    
    // Options for the chart element
    const options = {
      legend: {
        display: false,
      },
      title: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false
    };

    const accessibility = {
      enable: true
    };

    // Get the total for each category
    const callsTotal = data.datasets[0].data.reduce((sum, current) => sum + current, 0);
    const emailsTotal = data.datasets[1].data.reduce((sum, current) => sum + current, 0);
    const textsTotal = data.datasets[2].data.reduce((sum, current) => sum + current, 0);

    return <div>
      <div className={styles.grid} dir="ltr">
        <div className={`${styles.row} ${styles.padding5}`}>
          <div className={(this.props.isTeamsContext) ? styles.smallColumnTeams : styles.smallColumn}>
            <div>
              <span className={styles.chartCallDot}></span>
              {strings.ActivityChartLegendCalls}
            </div>
            <div className={styles.chartNumber}>
              <b>{callsTotal}</b>
            </div>
          </div>
          <div className={styles.smallColumn}>
            <div>
                <span className={styles.chartEmailDot}></span>
                {strings.ActivityChartLegendEmails}
            </div>
            <div className={styles.chartNumber}>
              <b>{emailsTotal}</b>
            </div>
          </div>
          <div className={styles.smallColumn}>
            <div>
                <span className={styles.chartTextDot}></span>
                {strings.ActivityChartLegendTexts}
            </div>
            <div className={styles.chartNumber}>
              <b>{textsTotal}</b>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ChartControl
          type={ChartType.Line}
          data={data}
          accessibility={accessibility}
          options={options}
          loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Loading} />}
        />
      </div>
    </div>;
  }

  /**
   * Get the content for the Progress chart widget
   * @returns Element representing the Progress chart tab
   */
  private getProgressChartTab() {
    // Get data
    const data1 = this.getProgressData(0);
    const data2 = this.getProgressData(1);
    const data3 = this.getProgressData(2);
    
    // Options for the chart element
    const options = {
      legend: {
        display: false,
      },
      title: {
        display: false
      },
      responsive: true,
      maintainAspectRatio: false,
      circumference: Math.PI,
      rotation: Math.PI
    };

    const accessibility = {
      enable: true
    };

    return <div className={styles.centeredContainer}>
      <div className={styles.grid} dir="ltr">
        <div className={`${styles.row} ${styles.marginLeft}`}>
          <div className={(this.props.isTeamsContext == true) ? styles.chartColumnTeams : styles.chartColumn}>
            <ChartControl
              type={ChartType.Doughnut}
              data={data1}
              accessibility={accessibility}
              options={options}
              loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Loading} />}
            />
            <div className={styles.progressDescription}>
              <b>{strings.ProgressSales}</b>
            </div>
          </div>
          <div className={(this.props.isTeamsContext == true) ? styles.chartColumnTeams : styles.chartColumn}>
            <ChartControl
              type={ChartType.Doughnut}
              data={data2}
              accessibility={accessibility}
              options={options}
              loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Loading} />}
            />
            <div className={styles.progressDescription}>
              <b>{strings.ProgressRevenues}</b>
            </div>
          </div>
          <div className={(this.props.isTeamsContext == true) ? styles.chartColumnTeams : styles.chartColumn}>
            <ChartControl
              type={ChartType.Doughnut}
              data={data3}
              accessibility={accessibility}
              options={options}
              loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Loading} />}
            />
            <div className={styles.progressDescription}>
              <b>{strings.ProgressMarketShare}</b>
            </div>   
          </div>
        </div>
      </div>
      <Separator />
      <div className={styles.tip}>
        {strings.ProgressChartTip}
      </div>
    </div>;
  }

  /**
   * Get the content for the My Day widget
   * @returns Element representing the My Day tab
   */
  private getMyDayTab() {
    return <Agenda
      days={30}>
      <CustomAgendaTemplate.loadingTemplate template="loading" />
      <CustomAgendaTemplate.eventTemplate template="event" />
      <CustomAgendaTemplate.noDataTemplate template="no-data" />
    </Agenda>;
  }

  /**
   * Get the content for the Recently done sales widget
   * @returns Element representing the Recently done sales tab
   */
  private getRecentlyDoneSalesTab() {
    // Get items to display
    const items = this.state.recentlyDoneSalesContractItems;

    // Define the columns of the ListView element
    const viewFields: IViewField[] = [
      {
        name: "title",
        displayName: strings.RecentlyDoneSalesViewTitle,
        sorting: true,
        isResizable: true,
        minWidth: 100
      },
      {
        name: "description",
        displayName: strings.RecentlyDoneSalesViewDescription,
        sorting: true,
        isResizable: true,
        minWidth: 100
      },
      {
        name: "buttonColumn",
        displayName: " ",
        minWidth: 50,
        render: (item?: any, index?: number, column?: IColumn) => {
          var content = <div></div>;
          // If the element exists
          if (item) {
            // Create an clickable icon to open the SharePoint list item
            content = <Icon iconName={'Link'}
              onMouseOver={() => {}}
              onClick={() => {
                const addSlash = this.props.siteUrl.endsWith("/") == false;

                var tempLink = document.createElement('a');
                tempLink.href = this.props.siteUrl + ((addSlash == true) ? "/" : "") + "Lists/" + DataService.RecentlyDoneSalesContractsListName + "/DispForm.aspx?ID=" + item.id;
                tempLink.target = "_blank";
                tempLink.click();
              }} />;
          }
          return content;
        }
      }
    ];

    return <div>
      <ListView
      items={items}
      viewFields={viewFields}
      iconFieldName="ServerRelativeUrl"
      compact={true}
      selectionMode={SelectionMode.none}
      showFilter={false}
      filterPlaceHolder={strings.RecentlyDoneSalesViewFilterPlaceHolder}
      sortItems={this.sortItems}
      stickyHeader={true} />
    </div>;
  }

  /**
   * Get the content for the ToDo widget
   * @returns Element representing the ToDo tab
   */
  private getToDoTab() {
    return <Todo hideHeader={true}>
      <CustomTodoTemplate.todoTemplate template="task" />
    </Todo>;
  }

  /**
   * Get the data to be displayed in the Activity widget
   * @returns Datasets for the chart control in the Activity widget
   */
  private getActivityData() {
    return {
      labels: DataService.MonthNames,
      datasets: [
        {
          label: strings.ActivityChartLegendCalls,
          fill: false,
          data: this.state.activityCallItems.map(i => i.value),
          backgroundColor: styles.callRGBColor,
          borderColor: styles.callRGBColor,
          borderWidth: 3
        },
        {
          label: strings.ActivityChartLegendEmails,
          fill: false,
          data: this.state.activityEmailItems.map(i => i.value),
          backgroundColor: styles.emailRGBColor,
          borderColor: styles.emailRGBColor,
          borderWidth: 3
        },
        {
          label: strings.ActivityChartLegendTexts,
          fill: false,
          data: this.state.activityTextItems.map(i => i.value),
          backgroundColor: styles.textRGBColor,
          borderColor: styles.textRGBColor,
          borderWidth: 3
        },
      ]
    };
  }

  /**
   * Get data for the Progress widget
   * @param index Index to differentiate the chunks, available values are 0,1,2
   * @returns 
   */
  private getProgressData(index: number) {
    const totalLength = this.state.progressItems.length;
    // Get the chunk length
    const chunk = totalLength / 3;
    // Get the items of the chunk
    const items = this.state.progressItems.slice(chunk * index, chunk * (index + 1));
    
    return {
      labels: DataService.MonthNames,
      datasets: [
        {
          label: strings.ProgressChartTitle,
          data: items.map(i => i.value)
        }
      ]
    };
  }

  /**
   * Sort the specified items for a specific column
   * @param items Items to be sorted
   * @param columnName Column used for sorting
   * @param descending Specify if the sorting is descending
   * @returns Input items sorted for the specified column
   */
  private sortItems = (items: any[], columnName: string, descending: boolean): any[] => {
      let properties: string[];

      // Support for nested properties
      if (columnName.toString().indexOf(".") > 0) {
          properties = columnName.toString().split(".");            
      }

      if (!items || items.length == 0) {
          return items;
      }

      return items.sort((a, b) => {
          if (a === null || a === undefined) {
              return 1;
          }
          else if (b === null || b === undefined) {
              return -1;
          }
          else if (a === b) {
              return 0;
          }

          var valueA = a[columnName];
          var valueB = b[columnName];
          
          // If it's a complex property
          if (properties && properties.length > 0) {
              valueA = a[properties[0]][properties[1]];
              valueB = b[properties[0]][properties[1]];
          }
          
          var dateValueB = new Date(valueB.toString());
          var dateValueA = new Date(valueA.toString());

          // Check if the value is a date
          if ((Object.prototype.toString.call(dateValueA) === "[object Date]" && !isNaN(dateValueA.getTime())) 
          && (Object.prototype.toString.call(dateValueB) === "[object Date]" && !isNaN(dateValueB.getTime()))) {
              if (descending) {
                  return (dateValueB.getTime() - dateValueA.getTime()) > 0 ? 1 : -1;
              }
              else {
                  return (dateValueA.getTime() - dateValueB.getTime()) > 0 ? 1 : -1;
              }
          }

          return (descending ? valueA < valueB : valueA > valueB) ? -1 : 1;
      });
  }
}
