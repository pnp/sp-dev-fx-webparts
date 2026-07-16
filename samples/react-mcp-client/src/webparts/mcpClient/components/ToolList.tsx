import * as React from "react";
import { Card, CardHeader, makeStyles, Text, tokens } from "@fluentui/react-components";
import type { IToolSummary } from "../services/types";

export interface IToolListProps {
  tools: IToolSummary[];
  selectedTool?: IToolSummary;
  onSelectTool: (tool: IToolSummary) => void;
}

const useStyles = makeStyles({
  list: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  card: { cursor: "pointer" },
  selected: { outlineStyle: "solid", outlineWidth: tokens.strokeWidthThick, outlineColor: tokens.colorBrandStroke1 },
});

export const ToolList: React.FC<IToolListProps> = ({ tools, selectedTool, onSelectTool }) => {
  const styles = useStyles();

  return (
    <div className={styles.list} role="listbox" aria-label="Discovered tools">
      {tools.map((tool) => {
        const selected = tool.name === selectedTool?.name;
        return (
          <Card
            key={tool.name}
            className={`${styles.card}${selected ? ` ${styles.selected}` : ""}`}
            role="option"
            aria-selected={selected}
            tabIndex={0}
            onClick={() => onSelectTool(tool)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectTool(tool);
              }
            }}
          >
            <CardHeader header={<Text weight="semibold">{tool.name}</Text>} description={tool.description && <Text>{tool.description}</Text>} />
          </Card>
        );
      })}
    </div>
  );
};
