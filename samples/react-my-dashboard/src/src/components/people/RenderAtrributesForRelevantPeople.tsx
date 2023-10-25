/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  Mail20Filled,
  MyLocation24Filled,
  Phone20Filled,
} from '@fluentui/react-icons';

import { PeopleCardAttribute } from './PeopleCardAttribute';

export interface IRenderAttributesForRelevantPeopleProps {
  user: any;
}

export const RenderAttributesForRelevantPeople: React.FunctionComponent<IRenderAttributesForRelevantPeopleProps> = (
  props: React.PropsWithChildren<IRenderAttributesForRelevantPeopleProps>
) => {
  const { user } = props || {};
  const { phones, department, officeLocation, userPrincipalName } = user;

  if (!user) return null;
  return (
    <>
      {(phones as any[]).length && (
        <PeopleCardAttribute attribute={{ icon: <Phone20Filled />, attributeValue: phones[0].number }} />
      )}
      {userPrincipalName && (
        <PeopleCardAttribute
          attribute={{
            icon: <Mail20Filled />,
            attributeValue: userPrincipalName,
            attributelink: `mailto:${userPrincipalName}`,
          }}
        />
      )}
      {officeLocation && (
        <PeopleCardAttribute attribute={{ icon: <MyLocation24Filled />, attributeValue: officeLocation }} />
      )}
      {department && <PeopleCardAttribute attribute={{ attributeValue: department }} />}
    </>
  );
};
