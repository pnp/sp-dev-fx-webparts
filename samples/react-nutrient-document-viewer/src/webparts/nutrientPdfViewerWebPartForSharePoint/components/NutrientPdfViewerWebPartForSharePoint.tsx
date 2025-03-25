import * as React from "react";
import {sp} from "@pnp/sp";
import styles from "./NutrientPdfViewerWebPartForSharePoint.module.scss";

function NutrientPdfViewerWebPartForSharePoint(props: INutrientPdfViewerWebPartForSharePointProps) {
  const containerRef = React.useRef(null);
  const [documentUrl, setDocumentAUrl] = React.useState(props.document);
  const [loading, setLoading] = React.useState(false);

  

  React.useEffect(() => {
    if(!documentUrl) {
      return;
    }
    const container = containerRef.current;
    //@ts-ignore
    let instance, NutrientViewer: any;;

    (async () => {
      console.log("Will load NutrientViewer instance");
      NutrientViewer = await import("@nutrient-sdk/viewer");

      const saveItem = {
        type: "custom",
        title: "Save",
        async onPress() {
          setLoading(true);
          //@ts-ignore
          const fileContent = await instance.exportPDF();
          const serverRelativeUrl = new URL(documentUrl).pathname;
          const file = sp.web.getFileByServerRelativeUrl(serverRelativeUrl);
          await file.setContent(fileContent);
          setLoading(false);
        },
      };

      instance = await NutrientViewer.load({
        // Container where Nutrient should be mounted.
        container,
        baseUrl: "https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.1.0/",
        // The document to open.
        licenseKey: props.licensekey ||'',
        document: documentUrl,
        toolbarItems: [
          ...NutrientViewer.defaultToolbarItems,
          saveItem,
        ],
      });
    })();


    return () => NutrientViewer && NutrientViewer.unload(container);
  }, [documentUrl]);

  React.useEffect(() => {
    setDocumentAUrl(props.document);
  }, [document]);

  return (
  <div className='App'> 
  {loading && (
        <div className={styles.blockingOverlay}>
          <div className={styles.blockingContent}>
            <div className={styles.spinner}></div>
            <p>Saving document...</p>
          </div>
        </div>
      )}
  {documentUrl ? (
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
  ):(
    <div> <p>Select Document from Library...</p></div>
  )
  }
  </div>
  );
}

export default NutrientPdfViewerWebPartForSharePoint;

export interface INutrientPdfViewerWebPartForSharePointProps {
    document: string;
    licensekey: string;
  }
