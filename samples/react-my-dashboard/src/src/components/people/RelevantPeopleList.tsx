import * as React from 'react';

import { Get } from '@microsoft/mgt-react/dist/es6/spfx';

import { useUtils } from '../../hooks/useUtils';
import { PeopleNoDataTemplate } from './PeopleNoDataTemplate';
import { PeopleTemplateRelevant } from './PeopleTemplateRelevant';
import { usePeopleStyles } from './usePeopleStyles';

export interface IRelevantPeopleListProps {}

export const RelevantPeopleList: React.FunctionComponent<IRelevantPeopleListProps> = (
  props: React.PropsWithChildren<IRelevantPeopleListProps>
) => {
  const styles = usePeopleStyles();
  const { getContainerHeight} = useUtils();
  return (
    <>
      <div id="right-container-relevant" className={styles.rightContainer}  style={{ height: getContainerHeight() }}>
        <Get
          resource="/me/people/?$filter=personType/class eq 'Person' and personType/subclass eq 'OrganizationUser'"
          maxPages={1}
        >
          <PeopleTemplateRelevant template="default" />
          <PeopleNoDataTemplate template="no-data" />
        </Get>
      </div>
    </>
  );
};
