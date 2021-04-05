import * as React  from "react";
import styles from "./VideoBackground.module.scss";
import { IVideoBackgroundProps } from "./IVideoBackgroundProps";

const VideoBackground = (props: IVideoBackgroundProps) => {
  const vRef = React.useRef<HTMLVideoElement>(null);
  const oldUrl = React.useRef(props.videoUrl);
  console.debug("execution here");

  React.useEffect(() => {
    if(oldUrl.current !== props.videoUrl && vRef && vRef.current){
      vRef.current.load();
      oldUrl.current = props.videoUrl;
    }
  }, [props.videoUrl]);

  return (
    <div
      className={styles.videoBackground}
      style={{ height: `${props.height}px` }}
    >
      <div style={{ height: `${props.height}px` }}>
        <h1 style={{ color: props.labelColor }}>{props.wpTitle}</h1>
      </div>
      <video
        ref = {vRef}
        autoPlay={true}
        loop={true}
        playsinline={true}
        preload="auto"
        tabIndex={-1}
        muted={true}
        style={{ filter: `brightness(${props.brightness}%` }}
      >
        <source src={props.videoUrl} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default VideoBackground;
