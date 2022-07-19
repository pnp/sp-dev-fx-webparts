export const CAT: string = "🐱";
export const MOUSE: string = "🐭";
export const KOALA: string = "🐨";
export const OCTOPUS: string = "🐙";
export const MONKEY: string = "🐵";
export const FOX: string = "🦊";
export const GIRL: string = "👩";
export const BOY: string = "🧔";
export const MAN: string = "👨‍🦲";
export const WOMAN: string = "👩‍🦱";

export const getBackgroundColor = (avatar: string): { backgroundColor: string } => {
  switch (avatar) {
    case CAT:
      return {
        backgroundColor: "rgb(255, 250, 228)",
      };
    case MOUSE:
      return {
        backgroundColor: "rgb(232, 242, 249)",
      };
    case KOALA:
      return {
        backgroundColor: "rgb(237, 232, 230)",
      };
    case OCTOPUS:
      return {
        backgroundColor: "rgb(255, 240, 245)",
      };
    case MONKEY:
      return {
        backgroundColor: "rgb(255, 245, 222)",
      };
    case FOX:
      return {
        backgroundColor: "rgb(255, 231, 205)",
      };
    default:
      return {
        backgroundColor: "rgb(255, 250, 228)",
      };
  }
};
