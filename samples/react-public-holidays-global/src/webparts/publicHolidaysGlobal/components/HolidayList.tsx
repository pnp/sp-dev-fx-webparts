import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { useTheme } from '@fluentui/react/lib/Theme';
import * as strings from 'PublicHolidaysGlobalWebPartStrings';
import { IPublicHoliday } from '../models/IPublicHoliday';
import { format } from '../utils/format';

export interface IHolidayListProps {
  holidays: IPublicHoliday[];
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  });
}

export const HolidayList: React.FunctionComponent<IHolidayListProps> = ({ holidays }) => {
  const theme = useTheme();

  return (
    <ul
      style={{ listStyle: 'none', margin: 0, padding: 0 }}
      aria-label={strings.HolidayListLabel}
    >
      {holidays.map((holiday) => (
        <li
          key={`${holiday.date}-${holiday.name}`}
          style={{
            padding: '12px 0',
            borderBottom: `1px solid ${theme.semanticColors.bodyDivider}`
          }}
        >
          <Stack horizontal wrap tokens={{ childrenGap: 16 }} verticalAlign="baseline">
            <Stack.Item styles={{ root: { minWidth: 150 } }}>
              {/* A machine-readable date alongside the localised label. */}
              <time dateTime={holiday.date}>
                <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
                  {formatDate(holiday.date)}
                </Text>
              </time>
            </Stack.Item>
            <Stack.Item grow>
              <Text variant="mediumPlus" block>
                {holiday.localName}
              </Text>
              {holiday.localName !== holiday.name && (
                <Text variant="small" styles={{ root: { color: theme.semanticColors.bodySubtext } }}>
                  {holiday.name}
                </Text>
              )}
            </Stack.Item>
            <Stack.Item>
              {/* Scope is text, never colour alone. */}
              <Text variant="small" styles={{ root: { color: theme.semanticColors.bodySubtext } }}>
                {holiday.global
                  ? strings.ScopeNationwide
                  : holiday.counties && holiday.counties.length > 0
                    ? format(strings.ScopeRegionalWithCounties, holiday.counties.join(', '))
                    : strings.ScopeRegional}
              </Text>
            </Stack.Item>
          </Stack>
        </li>
      ))}
    </ul>
  );
};
