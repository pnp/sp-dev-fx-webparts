import * as React from "react";
import { Button, Field, Input, makeStyles, Textarea, tokens } from "@fluentui/react-components";
import { PlayRegular } from "@fluentui/react-icons";
import type { IToolSummary } from "../services/types";

export interface IToolInvokeFormProps {
  tool: IToolSummary;
  onInvoke: (values: Record<string, unknown>) => void | Promise<void>;
  disabled?: boolean;
}

interface ISchemaProperty {
  type?: string;
  description?: string;
}

const useStyles = makeStyles({
  form: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
});

const coerceValue = (value: string, type?: string): unknown => {
  if (type === "number" || type === "integer") {
    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? value : numberValue;
  }
  if (type === "boolean") return value.toLowerCase() === "true";
  if (type === "object" || type === "array") {
    try { return JSON.parse(value); } catch { return value; }
  }
  return value;
};

export const ToolInvokeForm: React.FC<IToolInvokeFormProps> = ({ tool, onInvoke, disabled = false }) => {
  const styles = useStyles();
  const properties = (tool.inputSchema.properties ?? {}) as Record<string, ISchemaProperty>;
  const [values, setValues] = React.useState<Record<string, string>>({});

  React.useEffect(() => setValues({}), [tool.name]);

  const submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const coercedValues = Object.keys(properties).reduce<Record<string, unknown>>((result, name) => {
      result[name] = coerceValue(values[name] ?? "", properties[name].type);
      return result;
    }, {});
    void onInvoke(coercedValues);
  };

  return (
    <form className={styles.form} onSubmit={submit} aria-label={`Invoke ${tool.name}`}>
      {Object.entries(properties).map(([name, property]) => {
        const multiline = property.type === "object" || property.type === "array";
        const value = values[name] ?? "";
        const setValue = (nextValue: string): void => setValues((current) => ({ ...current, [name]: nextValue }));
        return (
          <Field key={name} label={name} hint={property.description}>
            {multiline ? (
              <Textarea value={value} onChange={(_, data) => setValue(data.value)} />
            ) : (
              <Input type={property.type === "number" || property.type === "integer" ? "number" : "text"} value={value} onChange={(_, data) => setValue(data.value)} />
            )}
          </Field>
        );
      })}
      <Button appearance="primary" icon={<PlayRegular />} type="submit" disabled={disabled}>Invoke</Button>
    </form>
  );
};
