import * as React from 'react';
import styles from './UploadFileAsPdf.module.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IUploadFileAsPdfProps } from './IUploadFileAsPdfProps';
import GraphService from '../../../services/graphService';
import Utilities from '../../../services/Utilities';
import { ProgressComponent } from './ProgressComponent';

const UploadFileAsPdf: React.FunctionComponent<IUploadFileAsPdfProps> = (props) => {
  const [highlight, setHighlight] = React.useState(false);
  const [tmpFileUploaded, setTmpFileUploaded] = React.useState(false);
  const [pdfFileDownloaded, setPDFFileDownloaded] = React.useState(false);
  const [pdfFileUploadedDeleted, setPDFFileUploadedDeleted] = React.useState(false);
  const [pdfFileUploadUrl, setPDFFileUploadUrl] = React.useState('');

  const allowDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
    setTmpFileUploaded(false);
    setPDFFileDownloaded(false);
    setPDFFileUploadedDeleted(false);
  };
  const enableHighlight = (event) => {
    allowDrop(event);
    setHighlight(true);
  };
  const disableHighlight = (event) => {
    allowDrop(event);
    setHighlight(false);
  };
  const dropFile = (event) => {
    allowDrop(event);
    setHighlight(false); 
    let dt = event.dataTransfer;
    let files =  Array.prototype.slice.call(dt.files); //[...dt.files];
    files.forEach(fileToUpload => {
      if (Utilities.validFileExtension(fileToUpload.name)) {
        uploadFile(fileToUpload);
      }      
    });
  };

  const uploadFile = async (file:File) => {
    const graphService: GraphService = new GraphService();
    const initialized = await graphService.initialize(props.serviceScope);
    if (initialized) {
      const tmpFileID = await graphService.uploadTmpFileToOneDrive(file);
      setTmpFileUploaded(true);
      setTimeout(async () => { 
        const pdfBlob = await graphService.downloadTmpFileAsPDF(tmpFileID);
        setPDFFileDownloaded(true);
        const newFilename = Utilities.getFileNameAsPDF(file.name);
        const fileUrl = await graphService.uploadFileToSiteAsPDF(props.siteID, pdfBlob, newFilename, props.channelName);
        setPDFFileUploadUrl(fileUrl);  
        graphService.deleteTmpFileFromOneDrive(tmpFileID)
          .then(() => {
            setTimeout(() => {
              setPDFFileUploadedDeleted(true);
            }, 1000);          
          });
       }, 800);
    }
  };

  return (
    <div className={ styles.uploadFileAsPdf }>
      Drag your file here:
      <div className={styles.background}>
        <div className={`${styles.fileCanvas} ${highlight?styles.highlight:''}`} 
            onDragEnter={enableHighlight} 
            onDragLeave={disableHighlight} 
            onDragOver={allowDrop} 
            onDrop={dropFile}>
          {tmpFileUploaded && <ProgressComponent header="File uploaded temp. to OneDrive" />}
          {pdfFileDownloaded && <ProgressComponent header="File retrieved as PDF" />}
          {pdfFileUploadUrl !== '' && 
          <div>
            <ProgressComponent header="File uploaded to target (and temp. file deleted)" />
            {pdfFileUploadedDeleted && <div>File uploaded to target and available <a href={pdfFileUploadUrl}>here.</a></div>}
          </div>}
        </div>
        {!tmpFileUploaded && <div  className={styles.inner}><Icon className={styles.icon} iconName="PDF" /><br/>To generate a PDF</div>}
      </div>
    </div>
  );
};

export default UploadFileAsPdf;
