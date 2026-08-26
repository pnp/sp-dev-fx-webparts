import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import {
  Skeleton,
  SkeletonItem,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import { useSchemaExtensionsDataGridSkeletonStyles } from "./useSchemaExtensionsDataGridSkeletonStyles";

// Use custom hook for styles
const styles = useSchemaExtensionsDataGridSkeletonStyles();

export interface ISchemaExtensionsDataGridSkeletonProps {
  // Number of skeleton rows to show
  rowCount?: number;
}

export const SchemaExtensionsDataGridSkeleton: React.FunctionComponent<
  ISchemaExtensionsDataGridSkeletonProps
> = (props) => {
  const { rowCount = 5 } = props;

  const skeletonRows = Array.from({ length: rowCount }, (_, index) => (
    <TableRow key={`skeleton-row-${index}`}>
      {/* Extension ID Column */}
      <TableCell
        className={`${styles.skeletonCellStyle} ${styles.extensionIdCellStyle}`}
      >
        <Skeleton>
          <SkeletonItem className={styles.skeletonExtensionIdStyle} />
        </Skeleton>
      </TableCell>

      {/* Description Column */}
      <TableCell
        className={`${styles.skeletonCellStyle} ${styles.descriptionCellStyle}`}
      >
        <Skeleton>
          <SkeletonItem className={styles.skeletonDescriptionStyle} />
        </Skeleton>
      </TableCell>

      {/* Target Types Column */}
      <TableCell
        className={`${styles.skeletonCellStyle} ${styles.targetTypesCellStyle}`}
      >
        <div className={styles.badgeContainerStyle}>
          <Skeleton>
            <SkeletonItem className={styles.skeletonBadgeStyle} />
          </Skeleton>
        </div>
      </TableCell>

      {/* Properties Column */}
      <TableCell
        className={`${styles.skeletonCellStyle} ${styles.propertiesCellStyle}`}
      >
        <Skeleton>
          <SkeletonItem className={styles.skeletonPropertiesStyle} />
        </Skeleton>
      </TableCell>

      {/* Status Column */}
      <TableCell
        className={`${styles.skeletonCellStyle} ${styles.statusCellStyle}`}
      >
        <Skeleton>
          <SkeletonItem className={styles.skeletonBadgeStyle} />
        </Skeleton>
      </TableCell>
    </TableRow>
  ));

  return (
    <Table className={styles.skeletonTableStyle} size="small">
      <TableHeader>
        <TableRow>
          <TableHeaderCell className={styles.extensionIdCellStyle}>
            {strings.ExtensionIdColumnHeader}
          </TableHeaderCell>
          <TableHeaderCell className={styles.descriptionCellStyle}>
            {strings.DescriptionColumnHeader}
          </TableHeaderCell>
          <TableHeaderCell className={styles.targetTypesCellStyle}>
            {strings.TargetTypesColumnHeader}
          </TableHeaderCell>
          <TableHeaderCell className={styles.propertiesCellStyle}>
            {strings.PropertiesColumnHeader}
          </TableHeaderCell>
          <TableHeaderCell className={styles.statusCellStyle}>
            {strings.StatusColumnHeader}
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>{skeletonRows}</TableBody>
    </Table>
  );
};
