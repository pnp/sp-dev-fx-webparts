export type AnimationPreset =
  | "fade"
  | "slide"
  | "scale"
  | "fadeUpSoft"
  | "fadeUpStrong"
  | "cardPop";

export interface IWebPartAnimationConfig {
  enabled: boolean;
  preset: AnimationPreset;
  mode: "once" | "always";
  delayMs?: number; // delay individuel
}

export interface IAnimPageMotionWebPartProps {
  webPartsConfig: {
    [webPartId: string]: IWebPartAnimationConfig;
  };
}
