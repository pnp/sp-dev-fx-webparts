import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { useEffect, useState } from "react";

export const useThemedStyles = <T>(theme: IReadonlyTheme, createStyles: (theme: IReadonlyTheme) => T) => {
  const [styles, setStyles] = useState<T>(createStyles.bind(null, theme));

  useEffect(() => {
    setStyles(createStyles(theme));
  }, [theme]);

  return styles;
};
