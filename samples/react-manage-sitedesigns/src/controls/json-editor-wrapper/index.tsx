import * as React from "react";

import JsonEditorReact from "../../controls/json-editor-react";
import { ISiteScript } from "../../types/ISiteScript";
 var schema = require("./site-design-script-actions.schema.json");
import "./index.css";
import * as Ajv from 'ajv';

interface IJsonEditorWrapperProps {
  currentSiteScript: ISiteScript | null | undefined;
  setSiteScript: (siteScript: ISiteScript) => void;
  onValidate: (error:boolean) => void;
}

const JsonEditorWrapper: React.SFC<IJsonEditorWrapperProps> = props => {
  // Editor configuration. See jsoneditor's API.
  var ajv = new Ajv();

  ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
  ajv.addSchema(schema, 'JSON Schema for SiteScript Extensions');


  const options = {
    mode: "code",
    schema,
    ajv,

  };
  return (
    <JsonEditorReact
      value={props.currentSiteScript ? props.currentSiteScript : {}}
      onChange={props.setSiteScript}
      onDirty={() => {}}
      options={options}
      height={"300px"}
      width={"100%"}
      onValidate={props.onValidate}
    />
  );
};
export default  JsonEditorWrapper;
