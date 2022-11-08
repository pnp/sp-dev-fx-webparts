import * as React from "react";
import { Angle } from "./Angle";
import { Close } from "./Close";
import { Spinner } from "./Spinner";
import { Success } from "./Success";
import { Error } from "./Error";
import { StarLeft } from "./StarLeft";
import { StarRight } from "./StarRight";

//* eslint-disable @typescript-eslint/camelcase */
export enum ImageEnum {
  angle = "angle",
  close = "close",
  spinner = "spinner",
  success = "success",
  error = "error",
  starLeft = "star-left",
  starRight = "star-right",
}

//* eslint-enable @typescript-eslint/camelcase */
export interface ImageProps
  extends React.SVGProps<SVGSVGElement | HTMLImageElement> {
  imageId: ImageEnum;
}

export const Image = (props: ImageProps): JSX.Element => {
  const { imageId, ...oth } = props;
  let result = <React.Fragment />;
  switch (imageId) {
    case ImageEnum.angle: {
      result = <Angle {...(oth as React.SVGProps<SVGSVGElement>)} />;
      break;
    }
    case ImageEnum.close: {
      result = <Close {...(oth as React.SVGProps<SVGSVGElement>)} />;
      break;
    }
    case ImageEnum.spinner: {
      result = <Spinner {...(oth as React.SVGProps<HTMLImageElement>)} />;
      break;
    }
    case ImageEnum.success: {
      result = <Success {...(oth as React.SVGProps<SVGSVGElement>)} />;
      break;
    }
    case ImageEnum.error: {
      result = <Error {...(oth as React.SVGProps<SVGSVGElement>)} />;
      break;
    }
    case ImageEnum.starLeft: {
      result = <StarLeft {...(oth as React.SVGProps<SVGSVGElement>)} />;
      break;
    }
    case ImageEnum.starRight: {
      result = <StarRight {...(oth as React.SVGProps<SVGSVGElement>)} />;
      break;
    }
  }
  return result;
};

export default {
  Image,
  ImageEnum,
  Angle,
  Close,
  Spinner,
  Success,
  Error,
  StarLeft,
  StarRight,
};
