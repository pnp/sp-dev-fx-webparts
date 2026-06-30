import { css } from "@emotion/css";

interface SchemaExtensionListViewStyles {
  textStyle: string;
  linkTruncate: string;
  headerContainer: string;
  targetTypesCell: string;
  targetTypesContainer;
}

export const useSchemaExtensionListViewStyles = (): {
  styles: SchemaExtensionListViewStyles;
} => {
  const styles: SchemaExtensionListViewStyles = {
    textStyle: css({
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      wordBreak: "break-all",
    }),
    linkTruncate: css({
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    }),
    headerContainer: css({
      maxWidth: "100%",
      minWidth: "0",
      overflow: "hidden",
    }),
    targetTypesCell: css({
      width: "100%",
      minWidth: 0,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
    }),
    targetTypesContainer: css({
      width: "calc(100% - 16px)",
      minWidth: 0,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: 10,
      right: 10,
    }),
  };

  return { styles };
};
