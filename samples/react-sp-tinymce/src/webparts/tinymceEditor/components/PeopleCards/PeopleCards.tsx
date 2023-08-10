import * as React from 'react';
import { Person, PersonCardInteraction, PersonViewType } from '@microsoft/mgt-react';
import styles from '../TinymceEditor.module.scss';

export interface IPeopleCardProps {
  users: any[];
}

const PeopleCard: React.FunctionComponent<IPeopleCardProps> = ({ users }) => {

  if (!users || users.length === 0) {
    return null;
  }


  return (
    <React.Suspense fallback={<div style={{ display: 'none' }} />}>
      <div style={{ display: 'grid', gridGap: '1rem', gridTemplateColumns: false ? 'none' : 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {
          users.map((user, index) => {
            return <div key={index} className={styles.personContainer}>
              <Person
                personQuery={user.email}                
                view={PersonViewType.twolines}
                personCardInteraction={PersonCardInteraction.hover}
              />
            </div>;
          })
        }
      </div>
    </React.Suspense>
  );



};

export default PeopleCard;