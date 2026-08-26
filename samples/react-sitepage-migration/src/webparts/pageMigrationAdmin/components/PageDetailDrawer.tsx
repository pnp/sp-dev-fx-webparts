import * as React from 'react';
import {
  Badge,
  Body1,
  Body1Stronger,
  Button,
  Caption1,
  Divider,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Link,
  OverlayDrawer,
  Spinner,
  Subtitle2,
  Title3,
  Tooltip
} from '@fluentui/react-components';
import {
  DismissRegular,
  DocumentRegular,
  ImageRegular,
  OpenRegular,
  TextParagraphRegular,
  WarningRegular
} from '@fluentui/react-icons';
import { NormalizedPage } from '../../../models/NormalizedPage';
import { formatString } from '../../../utilities/formatString';
import { compatibilityLabel, formatDateTime, warningMessage } from './localization';
import { usePortalMountNode } from './portalMount';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface PageDetailDrawerProps {
  readonly page?: NormalizedPage;
  readonly isOpen: boolean;
  readonly isLoading: boolean;
  readonly onDismiss: () => void;
  readonly onCopyResult: (succeeded: boolean) => void;
}

const StatTile: React.FC<{ readonly label: string; readonly value: number }> = ({ label, value }) => {
  const styles = useAppStyles();
  return (
    <div className={styles.statTile}>
      <Caption1>{label}</Caption1>
      <Title3>{value.toString()}</Title3>
    </div>
  );
};

export const PageDetailDrawer: React.FC<PageDetailDrawerProps> = (props) => {
  const styles = useAppStyles();
  const mountNode = usePortalMountNode();
  const { page } = props;

  const handleCopy = React.useCallback(async () => {
    if (!page) {
      return;
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(page.unsupportedControls, null, 2));
      props.onCopyResult(true);
    } catch {
      props.onCopyResult(false);
    }
  }, [page, props]);

  return (
    <OverlayDrawer
      mountNode={mountNode}
      unmountOnClose
      open={props.isOpen}
      onOpenChange={(_, data) => {
        if (!data.open) {
          props.onDismiss();
        }
      }}
      position="end"
      size="medium"
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Tooltip content={strings.CloseLabel} relationship="label" withArrow>
              <Button
                appearance="subtle"
                icon={<DismissRegular />}
                onClick={props.onDismiss}
                aria-label={strings.CloseLabel}
              />
            </Tooltip>
          }
        >
          {page?.metadata.title ?? strings.DetailTitleFallback}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        {props.isLoading ? (
          <div className={styles.spinnerRow}>
            <Spinner size="small" label={strings.DetailLoading} labelPosition="after" />
          </div>
        ) : !page ? (
          <Body1>{strings.DetailEmpty}</Body1>
        ) : (
          <div className={styles.drawerBody}>
            <div className={styles.statGrid}>
              <StatTile label={strings.DetailStatSections} value={page.sections.length} />
              <StatTile label={strings.DetailStatAssets} value={page.assets.length} />
              <StatTile label={strings.DetailStatWarnings} value={page.warnings.length} />
              <StatTile label={strings.DetailStatUnsupported} value={page.unsupportedControls.length} />
            </div>

            <Link href={page.metadata.sourcePageUrl} target="_blank" rel="noreferrer noopener">
              <OpenRegular aria-hidden="true" /> {strings.DetailOpenSourcePage}
            </Link>

            <Divider />

            <section>
              <Subtitle2 as="h3">{strings.DetailMetadataTitle}</Subtitle2>
              <dl className={styles.definitionList}>
                <dt><Caption1>{strings.DetailFieldPageName}</Caption1></dt>
                <dd className={styles.definitionValue}><Body1>{page.metadata.pageName}</Body1></dd>

                <dt><Caption1>{strings.DetailFieldLayout}</Caption1></dt>
                <dd className={styles.definitionValue}>
                  <Body1>{page.metadata.pageLayoutType ?? strings.UnknownValue}</Body1>
                </dd>

                <dt><Caption1>{strings.DetailFieldAuthor}</Caption1></dt>
                <dd className={styles.definitionValue}>
                  <Body1>{page.metadata.authorName ?? strings.UnknownValue}</Body1>
                </dd>

                <dt><Caption1>{strings.DetailFieldModified}</Caption1></dt>
                <dd className={styles.definitionValue}>
                  <Body1>{formatDateTime(page.metadata.lastModifiedDateTime)}</Body1>
                </dd>
              </dl>
            </section>

            <Divider />

            <section>
              <Subtitle2 as="h3">{strings.DetailStructureTitle}</Subtitle2>
              {page.sections.map((section) => (
                <div key={section.index} className={styles.statusStack}>
                  <Body1Stronger>{formatString(strings.DetailSectionLabel, section.index + 1)}</Body1Stronger>
                  {section.columns.map((column) => (
                    <div key={`${section.index}-${column.index}`}>
                      <Caption1>{formatString(strings.DetailColumnLabel, column.index + 1)}</Caption1>
                      <ul className={styles.list}>
                        {column.controls.map((control) => (
                          <li key={control.id} className={styles.listRow}>
                            {control.type === 'Text'
                              ? <TextParagraphRegular aria-hidden="true" />
                              : <DocumentRegular aria-hidden="true" />}
                            <Body1>
                              {control.type === 'Text' ? strings.DetailTextControl : control.title}
                            </Body1>
                            {control.type === 'WebPart' ? (
                              <Badge
                                appearance="tint"
                                color={
                                  control.compatibility === 'FullySupported' ? 'success'
                                    : control.compatibility === 'PartiallySupported' ? 'warning'
                                      : 'danger'
                                }
                              >
                                {compatibilityLabel(control.compatibility)}
                              </Badge>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </section>

            <Divider />

            <section>
              <Subtitle2 as="h3">{strings.DetailAssetsTitle}</Subtitle2>
              {page.assets.length === 0 ? (
                <Body1>{strings.DetailNoAssets}</Body1>
              ) : (
                <ul className={styles.list}>
                  {page.assets.map((asset) => (
                    <li key={asset.id} className={styles.listRow}>
                      <ImageRegular aria-hidden="true" />
                      <Caption1 className={styles.monospace}>{asset.fileName}</Caption1>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <Divider />

            <section>
              <Subtitle2 as="h3">{strings.DetailWarningsTitle}</Subtitle2>
              {page.warnings.length === 0 ? (
                <Body1>{strings.DetailNoWarnings}</Body1>
              ) : (
                <ul className={styles.list}>
                  {page.warnings.map((warning, index) => (
                    <li key={`${warning.code}-${index.toString()}`} className={styles.listRow}>
                      <WarningRegular aria-hidden="true" />
                      <Body1>{warningMessage(warning)}</Body1>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {page.unsupportedControls.length > 0 ? (
              <Button appearance="secondary" onClick={() => void handleCopy()}>
                {strings.DetailCopyConfiguration}
              </Button>
            ) : null}
          </div>
        )}
      </DrawerBody>
    </OverlayDrawer>
  );
};
