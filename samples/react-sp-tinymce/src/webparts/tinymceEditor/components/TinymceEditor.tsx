import * as React from 'react';
import styles from './TinymceEditor.module.scss';
import { ITinymceEditorProps } from './ITinymceEditorProps';
import { useEffect } from 'react';
import { RequestStatus } from '../model/IRequestStatus';
import { DisplayMode, Text } from '@microsoft/sp-core-library';
import SharePointService from '../services/SharePointService';
import { RenderContentView } from './RenderContentView/RenderContentView';
import { RenderContentEdit } from './RenderContentEdit/RenderContentEdit';

export const TinymceEditor: React.FunctionComponent<ITinymceEditorProps> = (
  { hasTeamsContext, siteUrl, listId, listFieldsSchema, listItemId, userId, context, onContentUpdate, editorContent, displayMode }) => {

  const [status, setStatus] = React.useState(RequestStatus.idle);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [formData, setFormData] = React.useState(null);

  console.log(status);
  console.log(errorMessage);

  const loadListItem = async () => {

    try {
      setStatus(RequestStatus.loading);
      setErrorMessage('');

      const dataCacheKey = `OC_TinymceEditor_${listId}_${listItemId}`;
      const cachedData: any = window.localStorage.getItem(dataCacheKey);


      if (cachedData !== null) {
        setFormData(JSON.parse(cachedData));
        setStatus(RequestStatus.loaded);
      }
      else {

        const response: any[] = await getListItem();
        if (response.length > 0) {
          const [data] = response;
          setFormData(data);
          window.localStorage.setItem(dataCacheKey, JSON.stringify(data));
          setStatus(RequestStatus.loaded);
        }
        else {
          setStatus(RequestStatus.empty);
        }
      }



    } catch (error) {
      setStatus(RequestStatus.error);
      setErrorMessage('Error in getting data');
    }
  };

  useEffect(() => {
    if (listId && listItemId) {
      loadListItem();
    }
  }, [listId, listItemId]);

  return (
    <section className={`${styles.tinymceEditor} ${hasTeamsContext ? styles.teams : ''}`}>     
     

      {/* {listFieldsSchema && <pre>{JSON.stringify(listFieldsSchema, null, 4)}</pre>} */}
      {formData ?
                    displayMode === DisplayMode.Read ?
                        <RenderContentView
                            listData={formData}
                            editorContent={editorContent}
                            listFieldsSchema={listFieldsSchema}

                        /> :
                        <RenderContentEdit
                            listData={formData}
                            context={context}
                            editorContent={editorContent}
                            onContentUpdate={onContentUpdate}
                            listFieldsSchema={listFieldsSchema}
                        />
                    : null

                }
    </section>
  );



  async function getListItem(): Promise<any[]> {

    try {
      let endpoint = Text.format("{0}/_api/web/lists(guid'{1}')/RenderListDataAsStream", siteUrl, listId);
      const rowLimitXml = `<RowLimit Paged="True">${1}</RowLimit>`;
      const queryXml = `
                    <Query>
                         <Where>
                              <And>
                                <IsNotNull>
                                    <FieldRef Name='ID' />
                                </IsNotNull>
                                <Eq>
                                    <FieldRef Name='ID' />
                                    <Value Type='Counter'>${listItemId}</Value>
                                </Eq>
                              </And>
                          </Where>
                    </Query>`;

      const payload = {
        parameters: {
          ViewXml: `<View>${rowLimitXml}${queryXml}</View>`,
          RenderOptions: 2,
          DatesInUtc: true,
          ReplaceGroup: true
        }
      };
      const response = await SharePointService.postData(endpoint, payload);
      const result = response.Row || response;
      return result;
    }
    catch (er) {
      er.json().then((error: any) => {
        console.log(error);
      });


      return [];
    }

  }

};

