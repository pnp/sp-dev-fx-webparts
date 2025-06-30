/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import {
  Caption1,
  Caption1Strong,
  Card,
  Divider,
} from '@fluentui/react-components';
import {
  PersonCardInteraction,
  ViewType,
} from '@microsoft/mgt';
import { Person } from '@microsoft/mgt-react/dist/es6/spfx';

import { EPeopleType } from '../../constants/EPeopleType';
import {
  RenderAttributesForRelevantPeople,
} from './RenderAtrributesForRelevantPeople';
import { usePeopleStyles } from './usePeopleStyles';

export interface IPeopleCardProps {
  user: any;
  peopleType: EPeopleType;
}

export const PeopleCard: React.FunctionComponent<IPeopleCardProps> = (
  props: React.PropsWithChildren<IPeopleCardProps>
) => {
  const { user, peopleType } = props;
  const { userPrincipalName, displayName, jobTitle } = user;
  const styles = usePeopleStyles();

  const onClickEmail = React.useCallback((ev: React.MouseEvent<HTMLElement>) => {
    window.open(`mailto:${userPrincipalName}`, "_blank");
  }, []);

  return (
    <>
      <Card className={styles.card} size="large" appearance="outline">
        <div className={styles.personContainer}>
          
          <div style={{ width: 56, height: 56 }}>  {/* bug with person card on Teams App mobile  need to specify with and heigt*/}
          <Person
            personQuery={user.userPrincipalName}
            showPresence
            view={ViewType.image}
            avatarSize="large"
            personCardInteraction={PersonCardInteraction.hover}
          />
          </div>

          <div className={styles.personInfoContainer}>
            <div className={styles.cardTextSubject}>
              <Caption1>
                <Caption1Strong block truncate wrap={false} title={displayName}>
                  {displayName}
                </Caption1Strong>
              </Caption1>
            </div>
            <div className={styles.cardTextSubject}>
              <Caption1  style={{ fontSize: 12 }}>
                {jobTitle}
              </Caption1>
            </div>

            <div className={styles.cardTextSubject}>
              <Caption1            
                style={{ fontSize: 12 }}
                onClick={onClickEmail}
                className={styles.hover}
              >
                {userPrincipalName}
              </Caption1>
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.cardBody}>
          {peopleType === EPeopleType.Relevant && <RenderAttributesForRelevantPeople user={user} />}
        </div>
      </Card>
    </>
  );
};
