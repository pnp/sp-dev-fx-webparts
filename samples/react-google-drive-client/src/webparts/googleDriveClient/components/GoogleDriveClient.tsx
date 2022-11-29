import * as React from 'react';
import { IGoogleDriveClientProps } from './IGoogleDriveClientProps';
import { IGoogleFile } from '../../../dal/google/GoogleDriveDataProvider';
import { SearchBox } from 'office-ui-fabric-react';
export default function GoogleDriveClient(props: IGoogleDriveClientProps): React.ReactElement<IGoogleDriveClientProps> {
  const [data, setData] = React.useState<IGoogleFile[]>();

  return (
    <div>
      <SearchBox onSearch={async (newValue) => {
        props.googleDriveClient?.setQuery(newValue);
        const result = await props.googleDriveClient?.getData();
        setData(result);
        console.log(result);
      }} />
      {data?.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}
