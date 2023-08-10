/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  format,
  parseISO,
} from 'date-fns';

import {
  Caption1,
  Caption1Strong,
  Card,
  CardHeader,
  Link,
} from '@fluentui/react-components';
import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';

import { useUtils } from '../../hooks/useUtils';
import { useMyFilesStyles } from './useMyFilesStyles';

export interface IRenderFileCardProps {
  file: any;
}

export const RenderFileCard: React.FunctionComponent<IRenderFileCardProps> = (
  props: React.PropsWithChildren<IRenderFileCardProps>
) => {
  const { file } = props;
  const { lastModifiedBy, lastModifiedDateTime, size, name, webUrl } = file;
  const { user } = lastModifiedBy;
  const { GetFileImageUrl, formatFileSize, getFolderIcon } = useUtils();

  const styles = useMyFilesStyles();

  const localeDate = React.useMemo(() => {
    return format(parseISO(lastModifiedDateTime), "PPP");
  }, [lastModifiedDateTime]);

  const PersonTemplateLine1 = React.useCallback(
    (props: MgtTemplateProps): JSX.Element => {
      const { displayName } = user;

      return (
        <>
          <div className={styles.personLine1Container}>
            <div className={styles.personLine1}>
              <Caption1Strong className={styles.personline1Styles}>{displayName}</Caption1Strong>
              <Caption1 className={styles.personline1Styles}>modified file </Caption1>
            </div>
          </div>
        </>
      );
    },
    [lastModifiedBy]
  );
  const PersonTemplateLine2 = React.useCallback(
    (props: MgtTemplateProps): JSX.Element => {
      return <Caption1 className={styles.personline2Styles}>at {localeDate}</Caption1>;
    },
    [localeDate]
  );

  const isFolder = React.useMemo(() => {
    return file?.folder ? true : false;
  }, [name]);

  return (
    <>
      <Card className={styles.card} size="large" appearance="subtle">
        <header className={styles.cardHeader}>
          <div className={styles.personContainer}>
          <Person personQuery={user.email} showPresence view={4} avatarSize="small">
            <PersonTemplateLine1 template="line1" />
            <PersonTemplateLine2 template="line2" />
          </Person>
          </div>
        </header>
        <Card style={{ padding: "5px 10px", maxWidth: "100%" }} size="large">
          <CardHeader
            image={{
              className: styles.fileIcon,
              as: "img",
              src: isFolder ? getFolderIcon() : GetFileImageUrl(name),
              alt: name,
            }}
            header={
              <Link appearance="subtle" href={webUrl} target="_blank">
                <Caption1Strong className={styles.cardTextSubject} title={name}>
                  {name}
                </Caption1Strong>
              </Link>
            }
            description={<Caption1>{formatFileSize(size as number, 0)}</Caption1>}
          />
        </Card>
      </Card>
    </>
  );
};
