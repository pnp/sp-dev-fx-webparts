import * as React from "react";
// import styles from "./AwardRecognition.module.scss";
import { IAwardRecognitionProps } from "./IAwardRecognitionProps";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { Carousel } from "../../../components/Carousel";

export const AwardRecognition = (props: IAwardRecognitionProps) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Carousel />
    </FluentProvider>
  );
};
