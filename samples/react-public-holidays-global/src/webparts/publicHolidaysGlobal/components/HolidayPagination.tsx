import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { useTheme } from '@fluentui/react/lib/Theme';
import * as strings from 'PublicHolidaysGlobalWebPartStrings';
import { format } from '../utils/format';

export interface IHolidayPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** How many numbered pages to show around the current one. */
  limiter?: number;
}

const DEFAULT_LIMITER = 3;

function visiblePages(current: number, total: number, limiter: number): number[] {
  const start = Math.max(1, Math.min(current - Math.floor(limiter / 2), total - limiter + 1));
  const end = Math.min(total, start + limiter - 1);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }
  return pages;
}

/**
 * Page switcher for the holiday list.
 *
 * A <nav> with aria-current on the active page, so assistive technology can
 * report position without relying on the visual highlight.
 */
export const HolidayPagination: React.FunctionComponent<IHolidayPaginationProps> = (props) => {
  const theme = useTheme();
  const limiter = props.limiter || DEFAULT_LIMITER;
  const pages = visiblePages(props.currentPage, props.totalPages, limiter);

  return (
    <nav aria-label={strings.PaginationLabel}>
      <Stack horizontal wrap verticalAlign="center" tokens={{ childrenGap: 4 }}>
        <IconButton
          iconProps={{ iconName: 'ChevronLeft' }}
          ariaLabel={strings.PreviousPageLabel}
          disabled={props.currentPage <= 1}
          onClick={() => props.onChange(props.currentPage - 1)}
        />

        {pages.map((page) => {
          const isCurrent = page === props.currentPage;
          return (
            <DefaultButton
              key={page}
              primary={isCurrent}
              // Position is exposed as state, not only as colour.
              aria-current={isCurrent ? 'page' : undefined}
              ariaLabel={format(strings.GoToPageLabel, page)}
              onClick={() => props.onChange(page)}
              styles={{ root: { minWidth: 40, padding: 0 } }}
            >
              {page}
            </DefaultButton>
          );
        })}

        <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
          ariaLabel={strings.NextPageLabel}
          disabled={props.currentPage >= props.totalPages}
          onClick={() => props.onChange(props.currentPage + 1)}
        />

        <Text variant="small" styles={{ root: { color: theme.semanticColors.bodySubtext, marginLeft: 8 } }}>
          {format(strings.PageStatusLabel, props.currentPage, props.totalPages)}
        </Text>
      </Stack>
    </nav>
  );
};
