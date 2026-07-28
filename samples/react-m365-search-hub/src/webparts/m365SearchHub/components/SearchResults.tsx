import * as React from 'react';
import {
  Avatar,
  Badge,
  Body1,
  Body1Strong,
  Caption1,
  Divider,
  Link
} from '@fluentui/react-components';
import * as strings from 'M365SearchHubWebPartStrings';
import { ContentKind, ISearchResult } from '../models/ISearchModels';
import { format } from '../utils/format';
import { useHubStyles } from './useHubStyles';

export interface ISearchResultsProps {
  results: ISearchResult[];
}

const KIND_LABELS: Record<ContentKind, string> = {
  document: strings.KindDocument,
  page: strings.KindPage,
  site: strings.KindSite,
  listItem: strings.KindListItem
};

/**
 * Whether the kind is worth saying on each row.
 *
 * A badge earns its place by telling results apart. When every result is the
 * same kind — which is exactly what happens once somebody filters by one — it
 * repeats the same word down the page and adds nothing to titles that already
 * carry the file extension.
 */
export function shouldShowKind(results: ISearchResult[]): boolean {
  const kinds = new Set(results.map((result) => result.kind));
  return kinds.size > 1;
}

/**
 * One result, in three tiers the eye can sort at a glance.
 *
 * Composed from Fluent's typography rather than a `Card`, and the reason is
 * worth knowing: `Card` calls `useFocusableGroup` unconditionally, even with
 * `focusMode: 'off'`, which asks Tabster for a groupper. On a SharePoint page
 * Tabster already exists, owned by the page and built from an older version,
 * and asking it for a groupper throws. A `Divider` between rows does the
 * grouping a card would have done, and costs nothing.
 */
const ResultItem: React.FunctionComponent<{
  result: ISearchResult;
  showKind: boolean;
  isLast: boolean;
}> = ({ result, showKind, isLast }) => {
  const styles = useHubStyles();

  const context: string[] = [];
  if (result.source) {
    context.push(result.source);
  }
  // One sentence about the change, not two. Saying "Modified by X · Modified
  // on Y" repeats the word for no gain, so the two facts join when both are
  // known and stand alone when only one is.
  const modifiedOn = result.lastModified ? result.lastModified.toLocaleDateString() : undefined;
  if (result.modifiedBy && modifiedOn) {
    context.push(format(strings.ResultModifiedByOn, result.modifiedBy.name, modifiedOn));
  } else if (result.modifiedBy) {
    context.push(format(strings.ResultModifiedBy, result.modifiedBy.name));
  } else if (modifiedOn) {
    context.push(format(strings.ResultLastModified, modifiedOn));
  }

  return (
    <li className={styles.result}>
      <div className={styles.resultHeading}>
        {/* The only link on the row, carrying the title and nothing else, so a
            screen reader listing links hears document names. */}
        <Link href={result.url} target="_blank" rel="noreferrer">
          <Body1Strong>{result.title}</Body1Strong>
        </Link>

        {/* The kind sits at the end when it distinguishes anything, rather than
            leading: "Documents" is rarely the most useful thing on a line that
            already says where the item lives. */}
        {showKind ? (
          <Badge appearance="outline" size="small">
            {KIND_LABELS[result.kind]}
          </Badge>
        ) : undefined}
      </div>

      {context.length > 0 ? (
        <div className={styles.resultContext}>
          {/*
            Only drawn when Graph actually named somebody. Files and list items
            carry a last modifier; sites do not, and an empty coin in their
            place would be decoration standing in for data. `name` alone gives
            the initials, and no photograph is fetched, so the row costs no
            extra request.
          */}
          {result.modifiedBy ? (
            <Avatar
              size={16}
              name={result.modifiedBy.name}
              color="colorful"
              aria-hidden
            />
          ) : undefined}
          <Caption1 className={styles.meta}>{context.join(' · ')}</Caption1>
        </div>
      ) : undefined}

      {/* Rendered as text. Graph's markers were stripped upstream, so nothing
          here needs to interpret markup. */}
      {result.summary ? <Body1 className={styles.summary}>{result.summary}</Body1> : undefined}

      {isLast ? undefined : <Divider className={styles.resultDivider} />}
    </li>
  );
};

export const SearchResults: React.FunctionComponent<ISearchResultsProps> = (props) => {
  const styles = useHubStyles();
  const showKind = shouldShowKind(props.results);

  return (
    <ul className={styles.results} aria-label={strings.ResultsListLabel}>
      {props.results.map((result, index) => (
        <ResultItem
          key={result.id}
          result={result}
          showKind={showKind}
          isLast={index === props.results.length - 1}
        />
      ))}
    </ul>
  );
};
