import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as ReactDOM from 'react-dom';


import { EnchancedPreviewHost, IPropertyFieldEnhancedPreviewHostProps } from './TinyMCE.EnchancedPreviewHost';
import { encode } from '../../utils/EncodingUtils';
import { IFieldSchema } from '../../model/IFieldSchema';

export function getEnhancedPreviewDialog(editor: any, error: boolean, context: WebPartContext): any {
  const controls: any[] = [{
    type: 'htmlpanel',
    html: "<div class='panel-styles'><div id='enchancedPreviewContainer'>Loading</div><div>"
  }];

  const dialogConfig = {
    title: 'Enhanced preview',
    size: 'large',
    body: {
      type: 'panel',
      items: controls
    },
    buttons: [
      {
        type: 'cancel',
        name: 'close',
        text: 'Close',
        primary: true
      }
    ],
    initialData: {

    },
    onSubmit: (api: any) => {
      //const data = api.getData();
    }
  };

  return dialogConfig;
}

export function showEnhancedPreviewDialog(editor: any, context: WebPartContext, listFieldsSchema: IFieldSchema[], listData: any, editorContent: string): void {

  const dialogConfig = getEnhancedPreviewDialog(editor, false, context);
  editor.windowManager.open(dialogConfig);

  const pickerProps: IPropertyFieldEnhancedPreviewHostProps = {
    listData: listData,
    editorContent: editorContent,
    listFieldsSchema: listFieldsSchema,
    openPanel: true,
    editor: editor,
    context: context
  };

  const enchancedPreviewElement = React.createElement(EnchancedPreviewHost, pickerProps);
  ReactDOM.render(enchancedPreviewElement, document.getElementById('enchancedPreviewContainer'));
}

export function addToolbarButton(editor: any, context: WebPartContext, listFieldsSchema: IFieldSchema[], listData: any): void {

  console.log(listFieldsSchema);

  editor.ui.registry.addSplitButton('fieldpicker', {
    icon: 'plus',
    tooltip: 'Insert field from SharePoint list',
    disabled: false,
    onAction: (_: any) => {
    },
    onItemAction: function (buttonApi: any, value: any) {
      editor.insertContent(value);
    },
    fetch: function (callback: any) {
      const items = listFieldsSchema.map(f => {
        return {
          type: 'choiceitem',
          text: f.title,
          value: `{{${f.staticName}}}`
        }
      })

      callback(items);
    },
    onSetup: (buttonApi: any) => {
      const editorEventCallback = (eventApi: any) => {
        const nodeName = eventApi.element.nodeName.toLowerCase();
        switch (nodeName) {
          case 'div':
          case 'iframe':
          case 'img':
          case 'a':
            buttonApi.setEnabled(true);
            break;
          default:
            buttonApi.setEnabled(true);
        }
      };
      editor.on('NodeChange', editorEventCallback);
      return (buttonApi2: any) => {
        editor.off('NodeChange', editorEventCallback);
      };
    }
  })
}
export function addEnhancedPreviewToolbarButton(editor: any, context: WebPartContext, listFieldsSchema: IFieldSchema[], listData: any): void {

  editor.ui.registry.addButton('enchancedpreview', {
    icon: 'enchancedpreview',
    tooltip: 'Enhanced preview',
    disabled: true,
    onAction: (_: any) => {
      const content = encode(editor.getContent());
      showEnhancedPreviewDialog(editor, context, listFieldsSchema, listData, content);
    },
    onSetup: (buttonApi: any) => {
      const editorEventCallback = (eventApi: any) => {
        const nodeName = eventApi.element.nodeName.toLowerCase();
        switch (nodeName) {
          case 'div':
          case 'iframe':
          case 'img':
          case 'a':
            buttonApi.setEnabled(false);
            break;
          default:
            buttonApi.setEnabled(true);
        }
      };
      editor.on('NodeChange', editorEventCallback);
      return (buttonApi2: any) => {
        editor.off('NodeChange', editorEventCallback);
      };
    }
  });

}







