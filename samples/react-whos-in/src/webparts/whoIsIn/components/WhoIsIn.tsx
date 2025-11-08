import * as React from 'react';
import styles from './WhoIsIn.module.scss';
import type { IWhoIsInProps, IWhoIsInItem } from './IWhoIsInProps';
import { escape } from '@microsoft/sp-lodash-subset';

type State = {
  date: string;
  office: string;
  search: string;
};

export default class WhoIsIn extends React.Component<IWhoIsInProps, State> {
  public state: State = {
    date: new Date().toISOString().slice(0, 10),
    office: 'All offices',
    search: ''
  };

  private onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ date: e.target.value });
  };

  private onOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ office: e.target.value });
  };

  private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  private clearFilters = () => {
    this.setState({
      date: new Date().toISOString().slice(0, 10),
      office: 'All offices',
      search: ''
    });
  };


  private filteredItems = () => {
    const { items = [] } = this.props;
    const { date, office, search } = this.state;

    return items.filter((item: IWhoIsInItem) => {
      if (office && office !== 'All offices') {
        if ((item.BaseLocation || '') !== office) { return false; }
      }

      if (date) {
        const d = new Date(date);
        const from = item.From ? new Date(item.From) : null;
        const to = item.To ? new Date(item.To) : null;

        if (from || to) {
          const fromDay = from ? new Date(from.getFullYear(), from.getMonth(), from.getDate()) : null;
          const toDay = to ? new Date(to.getFullYear(), to.getMonth(), to.getDate()) : null;
          const checkDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());

          if (fromDay && toDay) {
            if (checkDay < fromDay || checkDay > toDay) { return false; }
          } else if (fromDay && !toDay) {
            if (checkDay.getTime() !== fromDay.getTime()) { return false; }
          } else if (!fromDay && toDay) {
            if (checkDay.getTime() !== toDay.getTime()) { return false; }
          }
        } else {
          return false;
        }
      }

      if (search) {
        const q = search.toString().toLowerCase();
        // Safely extract the employee display name whether Employee is a string or an object.
        // Use an 'in' check to narrow the union type and avoid "possibly undefined" errors.
        let employee = '';
        if (typeof item.Employee === 'object' && item.Employee !== null && 'Title' in item.Employee) {
          employee = (item.Employee as { Title?: string }).Title || '';
        } else if (typeof item.Employee === 'string') {
          employee = item.Employee;
        }
        const combined = `${employee}`.toLowerCase();
        if (combined.indexOf(q) === -1) { return false; }
      }

      return true;
    });
  };

  private totalVisitors = () => this.filteredItems().length;

  public render(): React.ReactElement<IWhoIsInProps> {
    const { hasTeamsContext } = this.props;
    const { date, office, search } = this.state;
    const items = this.filteredItems();

    const officesSet = new Set<string>((this.props.items || []).map((i: IWhoIsInItem) => i.BaseLocation || '').filter(Boolean));
    const officesArr: string[] = ['All offices'];
    officesSet.forEach((o) => officesArr.push(o));
    const offices = officesArr;

    return (
      <section className={`${styles.whoIsIn} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>Office Attendance — Day View</h1>
            <div className={styles.subtitle}>Quickly see who visited which office on a selected day.</div>
          </div>


        </div>

        <div className={styles.layoutGrid}>
          <aside className={styles.sidebarCard}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="dateInput">Date</label>
              <input id="dateInput" aria-label="Date" className={styles.input} type="date" value={date} onChange={this.onDateChange} />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="officeSelect">Office Location</label>
              <select id="officeSelect" aria-label="Office Location" className={styles.input} value={office} onChange={this.onOfficeChange}>
                {offices.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="searchInput">Search</label>
              <input id="searchInput" aria-label="Search name, team or badge" className={styles.input} placeholder="Search name, team or badge" value={search} onChange={this.onSearchChange} />
            </div>

            <div style={{ marginTop: 8 }}>
              <button className={styles.primaryBtn} onClick={() => this.setState({ date, office, search })}>Show</button>
              <button className={styles.ghostBtn} onClick={this.clearFilters}>Clear</button>
            </div>

            <hr style={{ margin: '18px 0', border: 'none', borderTop: '1px solid #eef2f6' }} />

            <div className={styles.meta}>
              <div><strong>Total visitors:</strong> <span style={{ color: '#0f172a' }}> {this.totalVisitors()}</span></div>
              <div style={{ marginTop: 8 }}><strong>Last updated:</strong> {new Date().toLocaleString()}</div>
            </div>
          </aside>

          <div className={styles.contentColumn}>
            <div className={styles.listCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 style={{ margin: 0 }}>Visitors</h3>
                  <div className={styles.cardSub}>Showing employees who visited the selected office and date.</div>
                </div>
                <div style={{ color: '#6b7280', fontSize: 14 }}>
                  Showing {items.length} of {(this.props.items || []).length}
                </div>
              </div>

              {items.length === 0 ? (
                <div style={{ padding: 12 }}>No records found for the selected filters.</div>
              ) : (
                <table className={styles.table} aria-hidden>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Office</th>
                      <th>Arriving on</th>
                      <th>Departing</th>

                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it: IWhoIsInItem, idx: number) => {
                      const employee = (typeof it.Employee === 'object' && it.Employee && it.Employee.Title)
                        ? it.Employee.Title
                        : (typeof it.Employee === 'string' ? it.Employee : '');
                      const officeName = it.BaseLocation || '';
                      const checkIn = it.From ? new Date(it.From).toLocaleDateString() : '—';
                      const checkOut = it.To ? new Date(it.To).toLocaleDateString() : '—';
                      const empTitle = (typeof it.Employee === 'object' && it.Employee)
                        ? (it.Employee.JobTitle  || '')
                        : '';
                      const photoUrl = it.EmployeePhotoUrl || '';
                     
                      return (
                        <tr key={it.ID || it.Id || idx}>
                          <td>
                            <div className={styles.employeeBlock}>
                              <div className={styles.avatar}>
                                {photoUrl ? (
                                  <img src={photoUrl} alt={employee || ''} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                ) : null}
                              </div>
                              <div>
                                <div className={styles.employeeName}>{escape(String(employee))}</div>
                                <div className={styles.employeeJobTitle}>{escape(String(empTitle))}</div>
                              </div>
                            </div>
                          </td>
    
                          <td>{escape(officeName)}</td>
                          <td>{escape(checkIn)}</td>
                          <td>{escape(checkOut)}</td>
    
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>


          </div>
        </div>
      </section>
    );
  }
}
