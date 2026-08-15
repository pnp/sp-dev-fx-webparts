import * as React from 'react';
import { TextField, Toggle, Dropdown, IDropdownOption, PrimaryButton } from '@fluentui/react';
import styles from './McpClient.module.scss';
import { ITool, IToolInputProperty } from '../../../mcp/protocol';

export interface IToolInvokeFormProps {
  tool: ITool;
  busy: boolean;
  onInvoke: (args: { [key: string]: unknown }) => void;
}

/**
 * Builds a form from the tool's JSON Schema. Only the top level of
 * `properties` is rendered, which covers the primitive parameters that the
 * transport can mirror into headers. Anything more elaborate is left to the
 * raw arguments box so the sample stays readable.
 */
export const ToolInvokeForm: React.FC<IToolInvokeFormProps> = ({ tool, busy, onInvoke }) => {
  const [values, setValues] = React.useState<{ [key: string]: unknown }>({});

  React.useEffect(() => {
    setValues({});
  }, [tool.name]);

  const properties = (tool.inputSchema && tool.inputSchema.properties) || {};
  const required = (tool.inputSchema && tool.inputSchema.required) || [];

  const setValue = (name: string, value: unknown): void => {
    setValues(current => ({ ...current, [name]: value }));
  };

  const renderField = (name: string, property: IToolInputProperty): JSX.Element => {
    const label = name;
    const mirrored = property['x-mcp-header'];
    const description = (
      <span className={styles.muted}>
        {property.description}
        {mirrored && <span className={styles.badge}>Mcp-Param-{mirrored}</span>}
      </span>
    );

    if (property.enum && property.enum.length > 0) {
      const options: IDropdownOption[] = property.enum.map(v => ({ key: v, text: v }));
      return (
        <div key={name}>
          <Dropdown
            label={label}
            required={required.indexOf(name) >= 0}
            options={options}
            selectedKey={values[name] as string}
            onChange={(_, option) => setValue(name, option ? option.key : undefined)}
          />
          {description}
        </div>
      );
    }

    if (property.type === 'boolean') {
      return (
        <div key={name}>
          <Toggle
            label={label}
            checked={values[name] === true}
            onChange={(_, checked) => setValue(name, !!checked)}
          />
          {description}
        </div>
      );
    }

    const isInteger = property.type === 'integer' || property.type === 'number';
    return (
      <div key={name}>
        <TextField
          label={label}
          required={required.indexOf(name) >= 0}
          multiline={!isInteger && name === 'query'}
          value={values[name] === undefined ? '' : String(values[name])}
          onChange={(_, newValue) =>
            setValue(name, isInteger ? (newValue === '' ? undefined : Number(newValue)) : newValue)
          }
        />
        {description}
      </div>
    );
  };

  const names = Object.keys(properties);

  return (
    <div>
      <h3>Invoke {tool.title || tool.name}</h3>
      {names.length === 0 && <p className={styles.muted}>This tool takes no arguments.</p>}
      {names.map(name => renderField(name, properties[name]))}
      <PrimaryButton
        text="Call tool"
        disabled={busy}
        onClick={() => onInvoke(values)}
        styles={{ root: { marginTop: 12 } }}
      />
    </div>
  );
};

export default ToolInvokeForm;
