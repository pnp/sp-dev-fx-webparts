import * as React from 'react';
import { IDynamicFormularGeneratorProps } from './IDynamicFormularGeneratorProps';
import { ISPListItem } from '../../../Common/ISPListItem';
type FormState = {
    errorMessage: string[];
    isFormValid: boolean;
    isProcessing: boolean;
    isAlreadySent: boolean;
    formFields: string[];
};
export default class DynamicFormularGenerator extends React.Component<IDynamicFormularGeneratorProps, FormState> {
    private availableFields;
    private currentViewXML;
    private currentListID;
    private parser;
    private attachmentCtl;
    private uploadFileList;
    constructor(props: IDynamicFormularGeneratorProps);
    private getFieldSchemata;
    private getAttributeValue;
    private qryFormFields;
    private validateConfiguration;
    private qryListFields;
    private getFieldMetaData;
    private formComponentFactory;
    private handleAttachment;
    private ValidateFileInput;
    private ValidateCompleteForm;
    private getFileBuffer;
    saveFormData: () => void;
    sendConfirmationMail(item: ISPListItem): Promise<void>;
    printFormData: () => void;
    resetForm: () => void;
    private uploadAttachments;
    componentDidMount(): void;
    private _onConfigure;
    render(): React.ReactElement<IDynamicFormularGeneratorProps>;
}
export {};
//# sourceMappingURL=DynamicFormularGenerator.d.ts.map