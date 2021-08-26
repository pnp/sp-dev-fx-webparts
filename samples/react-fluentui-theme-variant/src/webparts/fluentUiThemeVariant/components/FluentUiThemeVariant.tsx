
import { PartialTheme, Theme, ThemeProvider } from '@fluentui/react-theme-provider';
import { DefaultButton, DetailsList, DetailsListLayoutMode, Label, Link, PrimaryButton, Stack } from 'office-ui-fabric-react';
import * as React from 'react';
import { useEffect } from 'react';

export interface IFluentUiThemeVariantProps {
  themeVariant: PartialTheme | Theme;
}

export default function FluentUiThemeVariant(props: IFluentUiThemeVariantProps) {
  const [items, setItems] = React.useState(new Array());
  useEffect(() => {
    // Populate with items for demos.
    let allItems = [];
    for (let i = 0; i < 5; i++) {
      allItems.push({
        key: i,
        name: 'Item ' + i,
        value: i,
      });
    }

    setItems(allItems);
  }, [props.themeVariant]);

  return (
    <ThemeProvider theme={props.themeVariant}>
      <Stack tokens={{ childrenGap: 5, padding: 5 }}>
        <Label>This Web Part implements an example on how to use the 'Fluent UI' theme library and how to apply/generate theme variation for the Web Part itself.</Label>
        <PrimaryButton>Primary Button</PrimaryButton>
        <DefaultButton>Default Button</DefaultButton>
        <Link>Link</Link>
        <DetailsList
          items={items}
          columns={
            [
              { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
              { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
            ]
          }
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="Row checkbox"
        />
      </Stack>
    </ThemeProvider>
  );
}

