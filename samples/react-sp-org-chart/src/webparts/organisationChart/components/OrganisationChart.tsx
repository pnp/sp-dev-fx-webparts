import * as React from 'react';
import styles from './OrganisationChart.module.scss';
import type { IOrganisationChartProps } from './IOrganisationChartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";

export interface IEmployee {
  Title: string;
  Manager: { Title: string };
  Employee: { Title: string };
}

export default class OrganisationChart extends React.Component<IOrganisationChartProps, { employees: IEmployee[] }> {
  private sp = spfi().using(SPFx(this.props.context)); // Correctly initialize spfi with SPFx context

  constructor(props: IOrganisationChartProps) {
    super(props);

    this.state = {
      employees: []
    };
  }

  public componentDidMount(): void {
    this._fetchEmployees();
  }

  private async _fetchEmployees(): Promise<void> {
    try {
      // Use this.sp to fetch data from the SharePoint list
      const employees: IEmployee[] = await this.sp.web.lists
        .getByTitle("Employee")
        .items.select("Title", "Manager/Title", "Employee/Title")
        .expand("Manager", "Employee")
        ();

      this.setState({ employees });
      console.log("Fetched employees:", employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  public render(): React.ReactElement<IOrganisationChartProps> {
    const { isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = this.props;
    const { employees } = this.state;

    return (
      <section className={`${styles.organisationChart} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img
            alt=""
            src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')}
            className={styles.welcomeImage}
          />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
        </div>
        <div>
          <h3>Employee List</h3>
          {employees.length > 0 ? (
            <ul>
              {employees.map((employee, index) => (
                <li key={index}>
                  <strong>Title:</strong> {employee.Title} <br />
                  <strong>Manager:</strong> {employee.Manager?.Title || "N/A"} <br />
                  <strong>Employee Name:</strong> {employee.Employee?.Title || "N/A"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees found.</p>
          )}
        </div>
      </section>
    );
  }
}
