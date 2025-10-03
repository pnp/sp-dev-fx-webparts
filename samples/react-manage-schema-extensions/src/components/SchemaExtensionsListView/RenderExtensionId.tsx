import * as React from "react";

import { Body1Strong, Tooltip, tokens } from "@fluentui/react-components";

import { DataBarHorizontal20Regular } from "@fluentui/react-icons";
import { ISchemaExtension } from "../../models/ISchemaExtension";
import { StackV2 as Stack } from "@spteck/react-controls";
import { useSchemaExtensionListViewStyles } from "./useSchemaExtensionListViewStyles";

export interface IRenderExtensionIdProps {
  schemaExtension: ISchemaExtension;
  onChangeStatus?: (schemaExtension: ISchemaExtension) => void;
  onEdit?: (schemaExtension: ISchemaExtension) => void;
  onDelete?: (schemaExtension: ISchemaExtension) => void;
  iconSize?: number;
}

export const RenderExtensionId: React.FunctionComponent<
  IRenderExtensionIdProps
> = (props: React.PropsWithChildren<IRenderExtensionIdProps>): JSX.Element => {
  const { schemaExtension, iconSize } = props;
  const { id, status } = schemaExtension;
  const { styles } = useSchemaExtensionListViewStyles();

  return (
    <Stack
      gap="15px"
      direction="horizontal"
      className={styles.headerContainer}
      justifyContent="start"
      alignItems="center"
    >
      <DataBarHorizontal20Regular
        style={{
          fontSize: iconSize ?? 20,
          color: tokens.colorBrandBackground,
        }}
      />
      <Stack justifyContent="start" >
        <Stack
          direction="horizontal"
          gap={"10px"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Tooltip
            content={`Extension ID: ${id || "N/A"}${
              status ? ` (${status})` : ""
            }`}
            relationship="label"
          >
            <Body1Strong className={styles.textStyle}>
              {id || "N/A"}{" "}
            </Body1Strong>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
};
