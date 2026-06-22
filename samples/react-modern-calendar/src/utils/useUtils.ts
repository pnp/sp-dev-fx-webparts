import { AvatarNamedColor } from "@fluentui/react-avatar";
import { IConsoleMessageOptions } from "../models/IConsoleMessageOptions";
import { useCallback } from "react";

interface IUseUtils {
  formatConsoleMessage: (options: IConsoleMessageOptions) => void;
  getAvatarColorByIndex: (index: number) => AvatarNamedColor;
}

export const useUtils = (): IUseUtils => {

  const formatConsoleMessage = useCallback(
    ({
      appName,
      functionName,
      messageType,
      message,
    }: IConsoleMessageOptions): void => {
      const timestamp = new Date().toISOString();
      const formattedMessage = `[${timestamp}] [${appName}] [${functionName}] ${message}`;

      switch (messageType) {
        case "info":
          console.info(formattedMessage);
          break;
        case "warn":
          console.warn(formattedMessage);
          break;
        case "error":
          console.error(formattedMessage);
          break;
        case "log":
        default:
          console.log(formattedMessage);
          break;
      }
    },
    []
  );

  const avatarColors: AvatarNamedColor[] = [
    "beige",
    "blue",
    "brown",
    "gold",
    "lavender",
    "magenta",
    "navy",
    "pink",
    "plum",
    "purple",
    "red",
    "teal",
    "anchor",
    "dark-red",
    "cranberry",
    "pumpkin",
    "peach",
    "marigold",
    "brass",
    "forest",
    "seafoam",
    "dark-green",
    "light-teal",
    "steel",
    "royal-blue",
    "cornflower",
    "grape",
    "lilac",
    "mink",
    "platinum",
  ];

  const getAvatarColorByIndex = (index: number): AvatarNamedColor => {
    return avatarColors[index % avatarColors.length];
  };
  return { formatConsoleMessage, getAvatarColorByIndex };
};
