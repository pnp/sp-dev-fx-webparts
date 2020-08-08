import * as React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import AppContext from '../../common/AppContext';
import * as strings from 'PersonalAppSettingsWebPartStrings';

/**
 * Component props
 */
export interface ISettingsPanelProps {
  /**
   * Panel close handler
   */
  onClosePanel: () => void;
}

/**
 * Component to update web part props
 */
export const SettingsPanel: React.FunctionComponent<ISettingsPanelProps> = (props: ISettingsPanelProps) => {
  // getting context
  const { webPartProps, onUpdateProps } = React.useContext(AppContext);
  // title value
  const [title, setTitle] = React.useState<string>(webPartProps ? webPartProps.title : '');
  // description value
  const [description, setDescription] = React.useState<string>(webPartProps ? webPartProps.description : '');

  /**
   * save button click handler
   */
  const save = () => {
    onUpdateProps({
      title: title,
      description: description
    });

    props.onClosePanel();
  };

  /**
   * Cancel button click handler
   */
  const cancel = () => {
    props.onClosePanel();
  };

  /**
   * Renders panel footer content
   */
  const onRenderFooter = () => {
    return <div>
      <PrimaryButton text={strings.Save} onClick={save} />
      <DefaultButton text={strings.Cancel} onClick={cancel} />
    </div>;
  };

  return (
    <Panel
      headerText={strings.WebPartSettings}
      isOpen={true}
      onRenderFooterContent={onRenderFooter}
    >
      <TextField
        label={strings.WebPartTitle}
        value={title || ''}
        onChange={(e, v) => { setTitle(v); }}>
      </TextField>
      <TextField
        label={strings.WebPartDescription}
        value={description || ''}
        onChange={(e, v) => { setDescription(v); }}>
      </TextField>
    </Panel>
  );
};
