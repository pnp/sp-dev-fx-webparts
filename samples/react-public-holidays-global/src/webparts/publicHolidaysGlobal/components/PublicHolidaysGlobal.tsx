import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Link } from '@fluentui/react/lib/Link';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Shimmer, ShimmerElementType } from '@fluentui/react/lib/Shimmer';
import { useTheme } from '@fluentui/react/lib/Theme';

import type { IPublicHolidaysGlobalProps } from './IPublicHolidaysGlobalProps';
import { HolidayFilters } from './HolidayFilters';
import { HolidayList } from './HolidayList';
import { HolidayPagination } from './HolidayPagination';
import { ConfigurePlaceholder } from './ConfigurePlaceholder';
import { useHolidays } from '../hooks/useHolidays';
import { HolidaysErrorKind } from '../models/HolidaysError';
import { countryName } from '../models/countries';
import { format } from '../utils/format';
import * as strings from 'PublicHolidaysGlobalWebPartStrings';

const DEFAULT_PAGE_SIZE = 10;

function errorMessage(kind: HolidaysErrorKind | undefined, country: string, year: number): string {
  switch (kind) {
    case HolidaysErrorKind.UnknownCountry:
      return format(strings.ErrorUnknownCountry, country);
    case HolidaysErrorKind.Unreachable:
      return strings.ErrorUnreachable;
    default:
      return format(strings.ErrorService, countryName(country), year);
  }
}

const PublicHolidaysGlobal: React.FunctionComponent<IPublicHolidaysGlobalProps> = (props) => {
  const theme = useTheme();
  const pageSize = props.itemsPerPage && props.itemsPerPage > 0 ? props.itemsPerPage : DEFAULT_PAGE_SIZE;

  const [country, setCountry] = React.useState(props.country);
  const [year, setYear] = React.useState(props.defaultYear || new Date().getFullYear());
  const [page, setPage] = React.useState(1);

  // The property pane sets the starting point; changing it resets the view.
  React.useEffect(() => setCountry(props.country), [props.country]);
  React.useEffect(() => {
    if (props.defaultYear) {
      setYear(props.defaultYear);
    }
  }, [props.defaultYear]);

  const { status, holidays, errorKind, reload } = useHolidays(country, year);

  React.useEffect(() => setPage(1), [country, year]);

  if (!props.country) {
    return <ConfigurePlaceholder onConfigure={props.onConfigure} />;
  }

  const totalPages = Math.max(1, Math.ceil(holidays.length / pageSize));
  const visible = holidays.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section>
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack tokens={{ childrenGap: 4 }}>
          <Text as="h2" variant="xLarge" block styles={{ root: { margin: 0 } }}>
            {strings.TitleLabel}
          </Text>
          {props.description && (
            <Text variant="medium" styles={{ root: { color: theme.semanticColors.bodySubtext } }}>
              {props.description}
            </Text>
          )}
        </Stack>

        <HolidayFilters
          countryCode={country}
          year={year}
          onCountryChange={setCountry}
          onYearChange={setYear}
        />

        {/* Async state changes are announced, not only rendered. */}
        <div aria-live="polite" aria-busy={status === 'loading'}>
          {status === 'loading' && (
            <Stack tokens={{ childrenGap: 12 }}>
              <Text variant="small" styles={{ root: { color: theme.semanticColors.bodySubtext } }}>
                {format(strings.LoadingLabel, countryName(country), year)}
              </Text>
              {[0, 1, 2, 3, 4].map((i) => (
                <Shimmer
                  key={i}
                  shimmerElements={[
                    { type: ShimmerElementType.line, height: 16, width: '30%' },
                    { type: ShimmerElementType.gap, width: 16 },
                    { type: ShimmerElementType.line, height: 16 }
                  ]}
                />
              ))}
            </Stack>
          )}

          {status === 'error' && (
            <MessageBar
              messageBarType={MessageBarType.error}
              actions={
                errorKind === HolidaysErrorKind.UnknownCountry ? undefined : (
                  <PrimaryButton onClick={reload}>{strings.RetryButtonLabel}</PrimaryButton>
                )
              }
            >
              {errorMessage(errorKind, country, year)}
            </MessageBar>
          )}

          {status === 'empty' && (
            <MessageBar messageBarType={MessageBarType.info}>
              {format(strings.EmptyStateMessage, countryName(country), year)}
            </MessageBar>
          )}

          {status === 'ready' && (
            <Stack tokens={{ childrenGap: 12 }}>
              <Text variant="medium">
                {format(
                  holidays.length === 1 ? strings.SummaryLabelSingular : strings.SummaryLabel,
                  holidays.length,
                  countryName(country),
                  year
                )}
              </Text>
              <HolidayList holidays={visible} />
              {totalPages > 1 && (
                <HolidayPagination
                  currentPage={page}
                  totalPages={totalPages}
                  onChange={setPage}
                />
              )}
            </Stack>
          )}
        </div>

        <Text variant="small" styles={{ root: { color: theme.semanticColors.bodySubtext } }}>
          {strings.AttributionPrefix}{' '}
          <Link href="https://date.nager.at/" target="_blank" rel="noopener noreferrer">
            {strings.AttributionLinkLabel}
          </Link>
          {strings.AttributionSuffix}
        </Text>
      </Stack>
    </section>
  );
};

export default PublicHolidaysGlobal;
