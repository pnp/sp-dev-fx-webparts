import * as React from "react";
import { LoaderStyles } from "./Loader.styles";
import { Image, ImageEnum } from "../image/Image";

export const Loader = (): JSX.Element => {
  const style = LoaderStyles();
  return (
    <div className={style.overlay}>
      <Image imageId={ImageEnum.spinner} className={style.rotate} />
    </div>
  );
};
