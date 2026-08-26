import { css } from "@emotion/css";

export interface IHeroWebPartRootStyles {
  root: string;
}

export const useHeroWebPartRootStyles = (): IHeroWebPartRootStyles => ({
  root: css({
    width: "100%",
    position: "relative",
  }),
});
