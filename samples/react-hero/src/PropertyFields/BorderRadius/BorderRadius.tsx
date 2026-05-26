import * as React from "react";
import { webLightTheme } from "@fluentui/react-components";
import { FluentUIProvider, DropdownField } from "@spteck/react-controls-v2";
import { IBorderRadiusComponentProps } from "../../models/IBorderRadiusProps";
import strings from 'HeroWebPartStrings';

const getBorderRadiusOptions = (): { value: string; text: string }[] => [
  { value: "0", text: strings.BorderRadiusNoneOption },
  { value: "2px", text: strings.BorderRadiusSmallOption },
  { value: "4px", text: strings.BorderRadiusMediumOption },
  { value: "8px", text: strings.BorderRadiusLargeOption },
  { value: "12px", text: strings.BorderRadiusXLargeOption },
  { value: "10000px", text: strings.BorderRadiusCircularOption },
];

export const BorderRadius: React.FC<IBorderRadiusComponentProps> = ({
  label,
  value,
  theme,
  hostType,
  onChange,
}) => {
  return (
    <FluentUIProvider
      theme={hostType === "sharepoint" ? webLightTheme : theme}
      applicationName="border-radius-"
      styles={{ backgroundColor: "transparent" }}
    >
      <DropdownField
        label={label}
        defaultValue={value}
        options={getBorderRadiusOptions()}
        onChange={(val: string) => onChange(val)}
      />
    </FluentUIProvider>
  );
};

BorderRadius.displayName = "BorderRadius";
