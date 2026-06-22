export type AnimationType = 
  | "fade"
  | "slide-up"
  | "slide-down"
  | "scale";

export type AnimationTrigger =
  | "load"
  | "inview";

export interface IWebPartAnimationConfig {
  webPartId: string;
  enabled: boolean;
  animation: AnimationType;
  trigger: AnimationTrigger;
  delayMs: number;
}

export interface IAnimPageMotionWebPartProps {
  animations: Record<string, IWebPartAnimationConfig>;
}
