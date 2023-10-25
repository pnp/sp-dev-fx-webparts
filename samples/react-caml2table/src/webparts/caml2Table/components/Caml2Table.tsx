import * as React from 'react';
//import styles from './Caml2Table.module.scss';
import { CodeEditorEditable } from 'react-code-editor-editable'
import 'highlight.js/styles/stackoverflow-dark.css';
import { ListPicker } from "@pnp/spfx-controls-react/lib/ListPicker";
import { Caml2TableContext } from '../Caml2TableWebPart';
import { Label, PrimaryButton } from '@fluentui/react';
import { ListView, IViewField } from "@pnp/spfx-controls-react/lib/ListView";

const defaultQuery =
`<View>
  <Query>
    <Where>
      <In>
          <FieldRef Name="ID" />
          <Values>
              <Value Type="Integer">1</Value>
              <Value Type="Integer">4</Value>
              <Value Type="Integer">6</Value>
              <Value Type="Integer">8</Value>
          </Values>
      </In>
    </Where>
  </Query>
</View>`


export interface ICaml2TableProps { }

const Caml2Table: React.FunctionComponent<ICaml2TableProps> = (props: React.PropsWithChildren<ICaml2TableProps>) => {
  const { SPFxContext, spfi } = React.useContext(Caml2TableContext);
  const [list, setList] = React.useState<string>(null);
  const [query, setQuery] = React.useState<string>(defaultQuery);
  const [results, setResults] = React.useState<object[]>(null);

  const DoSearch = async () => {
    setResults(null);
    const result = await spfi.web.lists.getById(list).getItemsByCAMLQuery({ ViewXml: query });
    setResults(result);
  }

  return (
    <>
      <ListPicker
        context={SPFxContext as any}
        label="Select your list"
        includeHidden={false}
        multiSelect={false}
        selectedList={list}
        onSelectionChanged={(list) => setList(list != "NO_LIST_SELECTED" ? list as string : null)}
      />

      <br />

      <CodeEditorEditable
        language={"XML"}
        value={query}
        setValue={setQuery}
        width={"100%"}
      />

      <br />

      <PrimaryButton text='Execute' disabled={list == null || query == null} onClick={() => DoSearch()} />

      <br />

      {results != null && <Label>{results.length} Result(s) found</Label>}
      {results != null && results.length > 0 &&
        <ListView
          items={results}
          viewFields={Object.keys(results[0]).filter(x => x.toLowerCase().indexOf("odata") != 0).map(x => ({ name: x, isResizable: true, minWidth: 125 } as IViewField))}
        />

      }

    </>
  );
};

export default Caml2Table;