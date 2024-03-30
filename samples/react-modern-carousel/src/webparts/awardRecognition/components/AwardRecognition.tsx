import * as React from "react";
import { IAwardRecognitionProps } from "./IAwardRecognitionProps";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Carousel } from "../../../components/Carousel"
import { createContext } from "react";

export const WebpartContext = createContext<IAwardRecognitionProps>(null);

export const AwardRecognition = (props: IAwardRecognitionProps): JSX.Element => {
  return (
    <WebpartContext.Provider value={props}>
      <FluentProvider
        theme={webLightTheme}
        style={{ width: "100%", background: "none" }}
      >
        <Carousel />
      </FluentProvider>
    </WebpartContext.Provider>
  );
};
