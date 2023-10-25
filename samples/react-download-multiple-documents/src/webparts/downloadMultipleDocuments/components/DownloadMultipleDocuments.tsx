import * as React from 'react';
import styles from './DownloadMultipleDocuments.module.scss';
import { IDownloadMultipleDocumentsProps } from './IDownloadMultipleDocumentsProps';
import { MarqueeSelection, PrimaryButton } from 'office-ui-fabric-react';
import * as JSZip from 'jszip';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const DownloadMultipleDocuments: React.FunctionComponent<IDownloadMultipleDocumentsProps> = ({context,hasTeamsContext, listId}) => {

  const [files,setFiles] = React.useState<any[]>([]);
  const [items, setItems] = React.useState<any[]>([]);

  
  const columns = [
    { 
      key: 'name',
      name: 'Name',
      fieldName: 'Name',
      minWidth: 50,      
    },
    {
      key: 'modified',
      name: 'Last Modified',
      fieldName: 'Modified',
      minWidth: 200
    },
    {
      key: 'size',
      name: 'File Size',
      fieldName: 'Size',
      minWidth: 200
    }
  ];

  const getfileContent = (url: string): Promise<any> => {
    return context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1
    )
      .then((response: SPHttpClientResponse) => {
        return response.arrayBuffer();
      })
      .catch((error: any) => {
        throw error;
      });
  }

  const getDocuments = (): Promise<any> => {
    return context.spHttpClient.get(
      `${context.pageContext.web.absoluteUrl}/_api/web/Lists/GetById('${listId}')/items?$select=Title,Modified,UniqueId,File/Name,File/Size,File/Length&$expand=File`,
      SPHttpClient.configurations.v1
    )
      .then((response: SPHttpClientResponse) => {
        if (!response.ok) {
          return response.json()
            .then((json: any) => { throw Error(json.error ? json.error.message : response.status.toString()); });
        }
        return response.json();
      })
      .then((json: any) => {
        const returnValue = json.value || json;
        return returnValue;
      })
      .catch((error: any) => {
        throw error;
      });
  }

  const convertToKb = (bytes:any) => {
    let marker = 1024; // Change to 1000 if required
    let decimal = 3; // Change as required
    let kiloBytes = marker; // One Kilobyte is 1024 bytes
    let megaBytes = marker * marker; // One MB is 1024 KB
    let gigaBytes = marker * marker * marker; // One GB is 1024 MB

    // return bytes if less than a KB
    if(bytes < kiloBytes) return bytes + " Bytes";
    // return KB if less than a MB
    else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " KB";
    // return MB if less than a GB
    else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " MB";
    // return GB if less than a TB
    else return(bytes / gigaBytes).toFixed(decimal) + " GB";
  }

  React.useEffect(() => {
    getDocuments().then((data:any[]) => {
      const documents = data.filter(d => d.File?.Name).map(d => ({
        Name: d.File.Name,
        Size: `${convertToKb(d.File.Length)}`,
        Modified: d.Modified,
        UniqueId: d.UniqueId
      }));
      setItems(documents);
    }).catch(error => console.log(error));
  },[]);

  const downloadFiles = (): void => {
    if(files.length) {
      const zip = new JSZip();
      const promises = files.map(document => {
        const URL = `${context.pageContext.web.absoluteUrl}/_api/web/GetFileByServerRelativeUrl('${context.pageContext.web.serverRelativeUrl}/Shared Documents/${document}')/OpenBinaryStream()`;

         return getfileContent(URL).then((content) => {
          zip.file(document ,content);          
        })
        .catch(error => console.log(error))
      });

      Promise.all(promises).then(result => {
        zip.generateAsync({type:'blob'}).then(function(content) {
          const blobUrl = URL.createObjectURL(content);
          window.open(blobUrl,'_blank');
        }).catch(error => console.log(error))
      }).catch(error => console.log(error));
    }
  };

  const _getKey = (item: any, index?:number): string => {
    return item.key;
  }

  const selection = new Selection({
    onSelectionChanged: () => {
        setFiles(
          selection.getSelectedCount() > 0 ? selection.getSelection().map(d => d.Name) : []
        );
    },
    getKey: _getKey
  });

  const buttonText = files.length ? `Download ${files.length} files` : 'Download';

  return (
    <section className={`${styles.downloadMultipleDocuments} ${hasTeamsContext ? styles.teams : ''}`}>
      <PrimaryButton onClick={downloadFiles} text={buttonText} disabled={files.length <1} /> 
      <div>
      <MarqueeSelection selection={selection}>
        <DetailsList
              items={items}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={selection}
              selectionPreservedOnEmptyClick={true}
              getKey={_getKey}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="select row"
            />
        </MarqueeSelection>
      </div>
    </section>
  );
}

export default DownloadMultipleDocuments;