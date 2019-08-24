import * as React from 'react';
import {useAvengerCollection} from './AvengersCollection';
import { Environment} from '@microsoft/sp-core-library';
export const LoadListComponent = () => {
  
  const {avengerCollection, loadAvengers, filter, setFilter} = useAvengerCollection(Environment.type);
  React.useEffect(() => {
    loadAvengers();
  }, [filter]);
  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {avengerCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

