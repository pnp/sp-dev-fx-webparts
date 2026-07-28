import * as React from 'react';
import { Text } from '@fluentui/react-components';
import styles from './M365SearchHub.module.scss';
import type { IM365SearchHubProps } from './IM365SearchHubProps';
import { SearchStatusMessage } from './SearchStatusMessage';
import { SearchStatus, SearchFailure } from '../models/SearchStatus';

/** Below this, searching costs a request and returns noise. */
const MINIMUM_QUERY_LENGTH = 3;

/**
 * The search experience.
 *
 * Still being assembled: the search box, filters, results and performance
 * panel arrive next. What is wired already is the state machine, because every
 * other piece hangs off it.
 */
const M365SearchHub: React.FunctionComponent<IM365SearchHubProps> = (props) => {
  const [status] = React.useState<SearchStatus>('idle');
  const [failure] = React.useState<SearchFailure | undefined>(undefined);

  return (
    <section className={styles.m365SearchHub}>
      {props.title ? (
        <Text as="h2" size={500} weight="semibold" block>
          {props.title}
        </Text>
      ) : undefined}

      {/* Result counts and state changes are announced here. */}
      <div aria-live="polite">
        <SearchStatusMessage
          status={status}
          failure={failure}
          minimumQueryLength={MINIMUM_QUERY_LENGTH}
        />
      </div>
    </section>
  );
};

export default M365SearchHub;
