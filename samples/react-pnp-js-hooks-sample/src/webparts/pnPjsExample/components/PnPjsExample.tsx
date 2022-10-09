import * as React from "react";
import styles from "./PnPjsExample.module.scss";
import { IPnPjsExampleProps } from "./IPnPjsExampleProps";

// import interfaces & hooks
import { Label, PrimaryButton } from "@microsoft/office-ui-fabric-react-bundle";
import useDocuments from "../hooks/useDocuments";

export interface IAsyncAwaitPnPJsProps {
  description: string;
}

export const PnPjsExample: React.FC<IPnPjsExampleProps> = (props) => {
  //use custom hook for CRUD operations with documents
  const [documents, updateDocuments, totalSize, isError] = useDocuments();

  if (!isError) {
    return (
      <div className={styles.pnPjsExample}>
        <Label>
          Welcome to PnP JS Version 3 Demo with Functional Components + Hooks!
        </Label>
        <PrimaryButton onClick={updateDocuments}>
          Update Item Titles
        </PrimaryButton>
        <Label>List of documents:</Label>
        <table width="100%">
          <tr>
            <td>
              <strong>Title</strong>
            </td>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <strong>Size (KB)</strong>
            </td>
          </tr>
          {documents.map((document, idx) => {
            return (
              <tr key={idx}>
                <td>{document.Title}</td>
                <td>{document.Name}</td>
                <td>{(document.Size / 1024).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td>&nbps;</td>
            <td>
              <strong>Total:</strong>
            </td>
            <td>
              <strong>{(totalSize / 1024).toFixed(2)}</strong>
            </td>
          </tr>
        </table>
      </div>
    );
  } else {
    return <p>Error</p>;
  }
};
