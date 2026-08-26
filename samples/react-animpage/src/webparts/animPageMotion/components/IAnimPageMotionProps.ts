import {
  
  AnimationPreset
} from "../../../common/types/AnimationPreset";

export interface IWebPartAnimationConfig {
  enabled: boolean;
  preset: AnimationPreset;
  mode?:"once" | "always";
  delayMs?:number;
}

export interface IAnimPageMotionWebPartProps {
  webPartsConfig: {
    [webPartId: string]: IWebPartAnimationConfig;
  };
}
