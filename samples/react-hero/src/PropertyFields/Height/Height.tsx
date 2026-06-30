import * as React from "react";
import { Slider, webLightTheme } from "@fluentui/react-components";
import {
  FluentUIProvider,
  StackV2,
  TypographyControl,
} from "@spteck/react-controls-v2";
import { IHeightComponentProps } from "../../models/IHeightProps";

const HeightInner: React.FC<IHeightComponentProps> = ({
  label,
  value,
  min,
  max,
  step,
  className,
  onChange,
}) => {
  const [current, setCurrent] = React.useState(value);

  React.useEffect(() => {
    setCurrent(value);
  }, [value]);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    data: { value: number },
  ): void => {
    setCurrent(data.value);
    onChange(data.value);
  };

  return (
    <StackV2
      direction="vertical"
      gap="xs"
      paddingBottom="xs"
      className={className}
      style={{ backgroundColor: "transparent" }}
    >
      {typeof label === "string" ? (
        <TypographyControl fontWeight="semibold">{label}</TypographyControl>
      ) : (
        label
      )}
      <StackV2 direction="horizontal" alignItems="center" gap="s">
        <Slider
          min={min}
          max={max}
          step={step}
          value={current}
          style={{ flex: 1 }}
          onChange={handleChange}
        />
        <TypographyControl fontSize="s">{current}px</TypographyControl>
      </StackV2>
    </StackV2>
  );
};

export const Height: React.FC<IHeightComponentProps> = (props) => (
  <FluentUIProvider
    theme={props.hostType === "sharepoint" ? webLightTheme : props.theme}
    applicationName="height-"
    styles={{ backgroundColor: "transparent" }}
  >
    <HeightInner {...props} />
  </FluentUIProvider>
);

Height.displayName = "Height";
