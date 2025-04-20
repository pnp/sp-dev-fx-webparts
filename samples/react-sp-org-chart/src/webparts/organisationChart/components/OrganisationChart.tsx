import * as React from 'react';
import styles from './OrganisationChart.module.scss';
import type { IOrganisationChartProps } from './IOrganisationChartProps';
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export interface IEmployee {
  Id: number;
  Title: string; // Job Title
  Employee: {
    Title: string; // Display Name
    Email: string;
    Id: number;
  };
  Manager?: {
    Title: string;
    Email: string;
    Id: number;
  };
}

export interface IOrganisationChartState {
  employees: IEmployee[];
  selectedId: number | null;
  searchQuery: string;
  error: string | null;
}

export default class OrganisationChart extends React.Component<IOrganisationChartProps, IOrganisationChartState> {
  private sp = spfi().using(SPFx(this.props.context));

  constructor(props: IOrganisationChartProps) {
    super(props);
    this.state = {
      employees: [],
      selectedId: null,
      searchQuery: '',
      error: null
    };
  }

  public componentDidMount(): void {
    this._fetchEmployees();
  }

  private async _fetchEmployees(): Promise<void> {
    try {
      const items: IEmployee[] = await this.sp.web.lists
        .getByTitle(this.props.list)
        .items
        .select("Id", "Title", "Employee/Title", "Employee/EMail", "Employee/Id", "Manager/Title", "Manager/EMail", "Manager/Id")
        .expand("Employee", "Manager")();

      this.setState({ employees: items, error: null });
    } catch (err) {
      console.error("Error fetching employees:", err);
      this.setState({ error: "Failed to fetch employees. Check list name and permissions." });
    }
  }

  private _onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value });
  };

  private _onNodeClick = (id: number): void => {
    this.setState({ selectedId: id });
  };

  private _buildTree(managerId: number | null): JSX.Element[] {
    const { employees, selectedId, searchQuery } = this.state;
    const search = (searchQuery || '').toLowerCase();

    const matchesSearch = (emp: IEmployee): boolean => {
      const name = emp.Employee?.Title?.toLowerCase() || '';
      const nameMatches = name.indexOf(search) !== -1;
      const children = employees.filter(e => e.Manager?.Id === emp.Employee?.Id);
      return nameMatches || children.some(matchesSearch);
    };

    return employees
      .filter(emp => (emp.Manager?.Id ?? null) === managerId)
      .filter(emp => !search || matchesSearch(emp))
      .map(emp => (
        <li key={emp.Id}>
          <div
            className={`${styles.node} ${emp.Id === selectedId ? styles.selected : ''}`}
            onClick={() => this._onNodeClick(emp.Id)}
          >
            <strong>{emp.Employee?.Title}</strong>
            <br />
            <small>{emp.Title}</small>
          </div>
          <ul>{this._buildTree(emp.Employee?.Id ?? null)}</ul>
        </li>
      ));
  }





  public render(): React.ReactElement {
    const { error, employees, searchQuery } = this.state;
    const { gradientStart, gradientEnd } = this.props;

    const gradientStyle: React.CSSProperties = {
      // Default fallback values just in case
      ['--gradient' as any]: `linear-gradient(135deg, ${gradientStart || '#6a11cb'} 0%, ${gradientEnd || '#2575fc'} 100%)`
    };

    return (
       <div className={styles.header}>
          <h2 className={styles.title}>{this.props.webpartTitle}</h2>
        
      <div className={styles.organisationChart} style={gradientStyle}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={this._onSearchChange}
          />
        </div>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : employees.length === 0 ? (
          <div>Loading...</div>
        ) : (
          <ul className={styles.tree}>
            {this._buildTree(null)}
          </ul>
        )}
      </div>
      </div>
    );
  }
}
