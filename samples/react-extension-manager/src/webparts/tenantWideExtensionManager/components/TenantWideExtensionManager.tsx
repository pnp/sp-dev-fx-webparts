import * as React from 'react';
import { ApplicationContext } from '../../../Contexsts/ApplicationContext';
import { IExtension } from '../../../Models/Extension';
import { ShimmeredDetailsList, Selection, SelectionMode } from '@fluentui/react';
import { Columns } from '../../../Misc/DetailsListColumns';
import { ExtensionManager } from './ExtensionManger';
//import styles from './TenantWideExtensionManager.module.scss';

export interface ITenantWideExtensionManagerProps { }

export const TenantWideExtensionManager: React.FunctionComponent<ITenantWideExtensionManagerProps> = (props: React.PropsWithChildren<ITenantWideExtensionManagerProps>) => {
  const { Provider } = React.useContext(ApplicationContext);
  const [apps, setApps] = React.useState<IExtension[]>(null);
  const [selectedExtensionId, setSelectedExtensionId] = React.useState<number>(null);

  const selection = React.useMemo(() => new Selection({
    selectionMode: SelectionMode.single,
    onSelectionChanged: () => {
      let id = null;

      if (selection.getSelection()[0] as IExtension)
        id = (selection.getSelection()[0] as IExtension).Id;

      setSelectedExtensionId(id);
    },
  }), []);

  const fetchData: () => void = async () => { Provider.getExtension().then((apps) => { setApps(apps); }).catch((error) => { alert(error); }) }
  const clearSelection: () => void = () => { selection.setAllSelected(false); setSelectedExtensionId(null); }

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <ExtensionManager
        ExtensionId={selectedExtensionId}
        OnSubmit={() => { clearSelection(); fetchData(); }}
        OnClose={() => clearSelection()} />

      <ShimmeredDetailsList
        items={apps}
        enableShimmer={apps === null}
        columns={Columns}
        selection={selection}
        selectionMode={SelectionMode.single}
        selectionPreservedOnEmptyClick={true}
      />
    </>
  );
};