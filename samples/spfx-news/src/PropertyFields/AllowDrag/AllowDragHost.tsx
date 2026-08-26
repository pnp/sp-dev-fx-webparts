import * as React from 'react';
import { useCallback, useState } from 'react';
import { Switch, tokens } from '@fluentui/react-components';
import { FluentUIProvider, StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { IAllowDragComponentProps } from '../../models/IAllowDragProps';

const AllowDragHost: React.FC<IAllowDragComponentProps> = ({
  label,
  value,
  theme,
  onChange,
}) => {
  const [checked, setChecked] = useState(value);

  const handleChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, data: { checked: boolean }): void => {
      setChecked(data.checked);
      onChange(data.checked);
    },
    [onChange],
  );

  return (
    <FluentUIProvider
      theme={theme}
      targetDocument={document}
      applicationName="newfeed-allowdrag-property-pane"
    >
      <StackV2 direction="vertical" gap="s" paddingTop="s">
        <StackV2 direction="horizontal" justifyContent="space-between" alignItems="center">
          <TypographyControl fontSize="s" color={tokens.colorNeutralForeground1}>
            {label}
          </TypographyControl>
          <Switch checked={checked} onChange={handleChange} />
        </StackV2>
      </StackV2>
    </FluentUIProvider>
  );
};

export default AllowDragHost;
