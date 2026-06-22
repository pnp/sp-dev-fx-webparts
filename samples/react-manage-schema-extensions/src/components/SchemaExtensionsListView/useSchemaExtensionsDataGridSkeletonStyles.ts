import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

export interface ISchemaExtensionsDataGridSkeletonStyles {
  skeletonTableStyle: string;
  skeletonCellStyle: string;
  extensionIdCellStyle: string;
  descriptionCellStyle: string;
  statusCellStyle: string;
  targetTypesCellStyle: string;
  propertiesCellStyle: string;
  ownerCellStyle: string;
  skeletonBadgeStyle: string;
  badgeContainerStyle: string;
  skeletonExtensionIdStyle: string;
  skeletonDescriptionStyle: string;
  skeletonPropertiesStyle: string;
  skeletonOwnerStyle: string;
}

export const useSchemaExtensionsDataGridSkeletonStyles = (): ISchemaExtensionsDataGridSkeletonStyles => {
  const skeletonTableStyle = css`
    width: 100%;
  `;

  const skeletonCellStyle = css`
    padding: ${tokens.spacingVerticalS};
  `;

  const extensionIdCellStyle = css`
    min-width: 260px;
    width: 260px;
  `;

  const descriptionCellStyle = css`
    min-width: 200px;
    width: 180px;
  `;

  const statusCellStyle = css`
    min-width: 100px;
    width: 100px;
  `;

  const targetTypesCellStyle = css`
    min-width: 100px;
    width: 100px;
  `;

  const propertiesCellStyle = css`
    min-width: 80px;
    width: 80px;
  `;

  const ownerCellStyle = css`
    min-width: 150px;
    width: 150px;
  `;

  const skeletonBadgeStyle = css`
    width: 100px;
    height: 20px;
    border-radius: ${tokens.borderRadiusSmall};
  `;

  const badgeContainerStyle = css`
    display: flex;
    gap: ${tokens.spacingHorizontalXS};
  `;

  const skeletonExtensionIdStyle = css`
    width: 240px;
    height: 20px;
  `;

  const skeletonDescriptionStyle = css`
    width: 160px;
    height: 20px;
  `;

  const skeletonPropertiesStyle = css`
    width: 70px;
    height: 20px;
  `;

  const skeletonOwnerStyle = css`
    width: 130px;
    height: 20px;
  `;

  return {
    skeletonTableStyle,
    skeletonCellStyle,
    extensionIdCellStyle,
    descriptionCellStyle,
    statusCellStyle,
    targetTypesCellStyle,
    propertiesCellStyle,
    ownerCellStyle,
    skeletonBadgeStyle,
    badgeContainerStyle,
    skeletonExtensionIdStyle,
    skeletonDescriptionStyle,
    skeletonPropertiesStyle,
    skeletonOwnerStyle,
  };
};