/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import {
  format,
  parseISO,
} from 'date-fns';

import {
  Badge,
  Body1Strong,
  Caption1,
  Caption1Strong,
  Card,
  Divider,
  Image,
  Link,
  tokens,
} from '@fluentui/react-components';
import { PersonCardInteraction } from '@microsoft/mgt';
import {
  MgtTemplateProps,
  Person,
} from '@microsoft/mgt-react/dist/es6/spfx';

import { useImageUtils } from '../../hooks/useImageUtils';
import { RenderCardFooter } from './RenderCardFooter';
import { useItemStyles } from './useItemStyles';

export interface IListItemTemplateProps {
  dataContext: any;
}

export const RenderItemTemplate: React.FunctionComponent<IListItemTemplateProps> = (
  props: React.PropsWithChildren<IListItemTemplateProps>
) => {
  const { resource } = props.dataContext;
  const { fields, lastModifiedBy, lastModifiedDateTime, webUrl } = resource;
  const { title, description, bannerImageUrlOWSURLH, siteTitle } = fields;
  const styles = useItemStyles();
  const { getPictureThumbnailUrl } = useImageUtils();
  const [imageUrl, setImageUrl] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      const url = await getPictureThumbnailUrl(bannerImageUrlOWSURLH.split(",")[0]);
      setImageUrl(url);
    })();
  }, [imageUrl]);

  const localeDate = React.useMemo(() => {
    return format(parseISO(lastModifiedDateTime), "PPP");
  }, [lastModifiedDateTime]);

  const PersonTemplateLine1 = React.useCallback(
    (props: MgtTemplateProps): JSX.Element => {
      const { displayName } = lastModifiedBy.user;

      return <Caption1Strong style={{ color: tokens.colorNeutralForeground2 }}>{displayName}</Caption1Strong>;
    },
    [lastModifiedBy]
  );
  const PersonTemplateLine2 = React.useCallback(
    (props: MgtTemplateProps): JSX.Element => {
      return <Caption1 style={{ fontSize: 12 }}>at {localeDate}</Caption1>;
    },
    [localeDate]
  );

  return (
    <>
      <Card className={styles.card} size="large">
        <header className={styles.cardHeader}>
          <div className={styles.personContainer}>
            <div style={{ width: 40, height: 40 }}> {/* bug with person card on Teams App mobile  need to specify with and heigt*/}
              <Person
                personQuery={lastModifiedBy.user.email}
                showPresence
                view={4}
                avatarSize="small"
                personCardInteraction={PersonCardInteraction.hover}
              >
                <PersonTemplateLine1 template="line1" />
                <PersonTemplateLine2 template="line2" />
              </Person>
            </div>
          </div>
        </header>

        <div className={styles.badgeContainer}>
          <Badge color="brand" shape="rounded" appearance="tint">
            {siteTitle}
          </Badge>
        </div>

        <Image fit="cover" src={imageUrl} style={{ height: 100 }} />
        <Link appearance="subtle" href={webUrl} target="_blank">
          <Body1Strong className={styles.cardTextSubject} title={title}>
            {title}
          </Body1Strong>
        </Link>
        <Caption1 className={styles.cardTextDisplay}>{description}</Caption1>
        <Divider />
        <RenderCardFooter fields={fields} />
      </Card>
    </>
  );
};
