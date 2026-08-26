import * as React from 'react';
import {
  Body1Stronger,
  Button,
  Caption1,
  Divider,
  Subtitle2
} from '@fluentui/react-components';
import { ArrowRightRegular, GlobeRegular } from '@fluentui/react-icons';
import { SiteSlotViewModel } from '../../../hooks/usePageMigrationViewModel';
import { SitePermissionValidationResult } from '../../../models/OperationalTypes';
import { SiteSelector } from './SiteSelector';
import { ValidationSummary } from './ValidationSummary';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface SiteSetupSectionProps {
  readonly source: SiteSlotViewModel;
  readonly target: SiteSlotViewModel;
  readonly validations: ReadonlyArray<SitePermissionValidationResult>;
  readonly disabled: boolean;
}

export const SiteSetupSection: React.FC<SiteSetupSectionProps> = (props) => {
  const styles = useAppStyles();
  const { source, target } = props;

  const bothChosen = !!source.selectedSite && !!target.selectedSite;
  const [isExpanded, setIsExpanded] = React.useState(!bothChosen);

  React.useEffect(() => {
    setIsExpanded(!bothChosen);
  }, [bothChosen]);

  if (bothChosen && !isExpanded) {
    return (
      <section className={styles.summaryBar} aria-label={strings.SitesSectionTitle}>
        <div className={styles.summaryRoute}>
          <GlobeRegular aria-hidden="true" />
          <Body1Stronger className={styles.truncate}>{source.selectedSite?.displayName}</Body1Stronger>
          <ArrowRightRegular aria-hidden="true" className={styles.summaryArrow} />
          <Body1Stronger className={styles.truncate}>{target.selectedSite?.displayName}</Body1Stronger>
        </div>
        <div className={styles.summaryMeta}>
          <ValidationSummary validations={props.validations} />
          <Button appearance="subtle" size="small" onClick={() => setIsExpanded(true)}>
            {strings.SitesChangeAction}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="sites-heading">
      <div className={styles.sectionHeading}>
        <Subtitle2 as="h3" id="sites-heading">{strings.SitesSectionTitle}</Subtitle2>
        <Caption1>{strings.SitesSectionDescription}</Caption1>
      </div>
      <div className={styles.siteGrid}>
        <SiteSelector
          label={strings.SourceSiteLabel}
          hint={strings.SourceSiteHint}
          options={source.options}
          recentSites={source.recentSites}
          selectedSite={source.selectedSite}
          isSearching={source.isSearching}
          disabled={props.disabled}
          onSearch={source.search}
          onSelect={source.select}
        />
        <SiteSelector
          label={strings.TargetSiteLabel}
          hint={strings.TargetSiteHint}
          options={target.options}
          recentSites={target.recentSites}
          selectedSite={target.selectedSite}
          isSearching={target.isSearching}
          disabled={props.disabled}
          onSearch={target.search}
          onSelect={target.select}
        />
      </div>
      <ValidationSummary validations={props.validations} />
      {bothChosen ? (
        <>
          <Divider />
          <div className={styles.summaryMeta}>
            <Button appearance="subtle" size="small" onClick={() => setIsExpanded(false)}>
              {strings.SitesDoneAction}
            </Button>
          </div>
        </>
      ) : null}
    </section>
  );
};
