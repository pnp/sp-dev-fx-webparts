import * as React from 'react';
import styles from './PublicHolidaysGlobal.module.scss';
import type { IPublicHolidaysGlobalProps } from './IPublicHolidaysGlobalProps';
import { HolidaysService } from '../services/HolidaysService';
import type { IPublicHoliday } from '../models/IPublicHoliday';

import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton } from '@fluentui/react/lib/Button';

const columns: IColumn[] = [
  { key: 'date', name: 'Date', fieldName: 'date', minWidth: 90, isResizable: true },
  { key: 'localName', name: 'Local Name', fieldName: 'localName', minWidth: 140, isResizable: true },
  { key: 'name', name: 'English Name', fieldName: 'name', minWidth: 140, isResizable: true },
  {
    key: 'global', name: 'Global', fieldName: 'global', minWidth: 60, isResizable: true,
    onRender: item => item.global ? "✔️" : "❌"
  }
];


const ITEMS_PER_PAGE = 10;

interface IYearHolidays {
  year: number;
  count: number;
  percent: number;
}

interface IPublicHolidaysGlobalState {
  holidays: IPublicHoliday[];
  loading: boolean;
  error: string | undefined;
  year: number;
  currentPage: number;
  yearsSummary: IYearHolidays[];
}

export default class PublicHolidaysGlobal extends React.Component<IPublicHolidaysGlobalProps, IPublicHolidaysGlobalState> {
  constructor(props: IPublicHolidaysGlobalProps) {
    super(props);
    this.state = {
      holidays: [],
      loading: false,
      error: undefined,
      year: new Date().getFullYear(),
      currentPage: 1,
      yearsSummary: []
    };
  }

  public componentDidMount(): void {
    this.loadHolidays(this.props.country).catch(() => {/* intentionally ignored */ });
    this.loadYearsSummary(this.props.country).catch(() => {/* intentionally ignored */ });
  }

  public componentDidUpdate(prevProps: IPublicHolidaysGlobalProps): void {
    if (prevProps.country !== this.props.country) {
      this.loadHolidays(this.props.country).catch(() => {/* intentionally ignored */ });
      this.loadYearsSummary(this.props.country).catch(() => {/* intentionally ignored */ });
    }
  }

  private async loadHolidays(country: string): Promise<void> {
    this.setState({ holidays: [], loading: true, error: undefined, currentPage: 1 });
    try {
      const holidays = await HolidaysService.getHolidays(this.state.year, country);
      this.setState({ holidays, loading: false, error: undefined, currentPage: 1 });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error', loading: false });
      }
    }
  }

  private goToPage = (page: number): void => {
    this.setState({ currentPage: page });
  };

  private async loadYearsSummary(country: string): Promise<void> {
    const currentYear = new Date().getFullYear();
    const years = [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
    const summary: IYearHolidays[] = [];

    for (const year of years) {
      try {
        const holidays = await HolidaysService.getHolidays(year, country);
        const percent = +(100 * holidays.length / (this.isLeapYear(year) ? 366 : 365)).toFixed(2);
        summary.push({ year, count: holidays.length, percent });
      } catch {
        summary.push({ year, count: 0, percent: 0 });
      }
    }
    this.setState({ yearsSummary: summary });
  }


  private isLeapYear(year: number): boolean {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  }

  private renderPager(totalPages: number, currentPage: number): JSX.Element {
    if (totalPages <= 1) return <></>;

    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <DefaultButton
          key={i}
          text={i.toString()}
          onClick={() => this.goToPage(i)}
          style={{
            minWidth: 32,
            fontWeight: i === currentPage ? 600 : 400,
            background: i === currentPage ? "#e5f6fa" : undefined,
            border: i === currentPage ? "2px solid #03787c" : undefined
          }}
          disabled={i === currentPage}
        />
      );
    }

    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        gap: 6, margin: "1.2em 0 0 0", flexWrap: "wrap"
      }}>
        <DefaultButton
          text="Prev"
          disabled={currentPage === 1}
          onClick={() => this.goToPage(currentPage - 1)}
        />
        {pageButtons}
        <DefaultButton
          text="Next"
          disabled={currentPage === totalPages}
          onClick={() => this.goToPage(currentPage + 1)}
        />
      </div>
    );
  }

  public render(): React.ReactElement<IPublicHolidaysGlobalProps> {
    const { holidays, loading, error, year, currentPage } = this.state;
    const { country } = this.props;

    const totalPages = Math.max(1, Math.ceil(holidays.length / ITEMS_PER_PAGE));
    const holidaysToShow = holidays.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    // Calculate the number of holidays in the current year
    const currentYearCount = holidays.length;

    return (

      <section className={styles.publicHolidaysGlobal}>

        <Stack tokens={{ childrenGap: 18 }}>
          {/* Header showing selected year and country */}
          <Text variant="xLarge" block>
            Public Holidays {year} - {country}
          </Text>




          {/* Highlight card showing only the number of holidays in the current year */}
          <Stack
            horizontal
            horizontalAlign="center"
            tokens={{ childrenGap: 28 }}
            style={{ margin: "24px 0" }}
          >
            <div
              style={{
                background: "#f3f9fa",
                padding: "2em 2.5em",
                borderRadius: 18,
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                minWidth: 180,
                textAlign: "center"
              }}
            >
              <>
                {/* Large text showing the count of holidays */}
              </>
              <Text variant="xxLarge" style={{ color: "#03787c", fontWeight: 700 }}>
                {currentYearCount}
              </Text>

              <>
                {/* Label for the number */}
              </>
              <Text variant="large" style={{ color: "#555" }}>
                {' '} Holidays in {year}
              </Text>

            </div>
          </Stack>

          {/* Loading indicator while fetching holidays */}
          {loading && <ProgressIndicator label="Loading holidays..." />}

          {/* Error message if fetch failed */}
          {error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {error}
            </MessageBar>
          )}

          {/* Holiday list with pagination */}
          {!loading && !error && holidaysToShow.length > 0 && (
            <>
              <DetailsList
                items={holidaysToShow}
                columns={columns}
                compact
                styles={{
                  root: {
                    background: "white",
                    borderRadius: 8,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.07)"
                  }
                }}
              />
              {/* Render pager only if multiple pages */}
              {totalPages > 1 && this.renderPager(totalPages, currentPage)}
            </>
          )}

          {/* Message if no holidays found */}
          {!loading && !error && holidays.length === 0 && (
            <MessageBar>No holidays found for the selected country.</MessageBar>
          )}
          {!country && (
            <Text variant="large" block styles={{ root: { marginTop: 12, color: '#03787c', fontWeight: '600' } }}>
              ⚠️ Please go to the web part properties panel to select a country.
            </Text>
          )}
        </Stack>
      </section>
    );
  }

}
