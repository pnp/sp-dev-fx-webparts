import * as React from "react";
import * as strings from "ReactDatatableWebPartStrings";
import { CSVLink } from "react-csv";
import { IIconProps, PrimaryButton } from "office-ui-fabric-react";
import styles from "./ExportListItemsToCSV.module.scss";
interface IExportToCSV {
  columnHeader: Array<string>;
  listName: string;
  description: string;
  dataSource: () => any[];
}

export function ExportListItemsToCSV(props: IExportToCSV) {
  const downloadIcon: IIconProps = { iconName: "Download" };

  let { listName, dataSource } = props;

  return (
    <CSVLink data={dataSource()} filename={`${listName}.csv`}>
      <PrimaryButton
        text={strings.DownloadAsCSVLabel}
        iconProps={downloadIcon}
        className={styles.btnCSV}
      />
    </CSVLink>
  );
}
