import * as React from "react";
import * as strings from "ManageSchemaExtensionsWebPartStrings";

import { Add20Regular, DatabaseSearch20Regular } from "@fluentui/react-icons";
import { Body1, Body1Strong, Button, tokens } from "@fluentui/react-components";

import { css } from "@emotion/css";

export interface ISchemaExtensionsEmptyStateProps {
  onCreateNew?: () => void;
}

export const SchemaExtensionsEmptyState: React.FunctionComponent<
  ISchemaExtensionsEmptyStateProps
> = (props: React.PropsWithChildren<ISchemaExtensionsEmptyStateProps>) => {
  const { onCreateNew } = props;

  const containerStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL};
    text-align: center;
    min-height: 300px;
  `;

  const iconContainerStyles = css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${tokens.colorBrandBackground2};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${tokens.spacingVerticalXL};
  `;

  const iconStyles = css`
    width: 40px;
    height: 40px;
    color: ${tokens.colorBrandForeground1};
  `;

  const titleStyles = css`
    color: ${tokens.colorNeutralForeground1};
    margin-bottom: ${tokens.spacingVerticalM};
  `;

  const descriptionStyles = css`
    color: ${tokens.colorNeutralForeground2};
    max-width: 400px;
    margin-bottom: ${tokens.spacingVerticalXL};
  `;

  const buttonStyles = css`
    display: flex;
    align-items: center;
    gap: ${tokens.spacingHorizontalS};
  `;

  return (
    <div className={containerStyles}>
      <div className={iconContainerStyles}>
        <DatabaseSearch20Regular className={iconStyles} />
      </div>

      <Body1Strong className={titleStyles}>
        {strings.NoSchemaExtensionsFoundTitle}
      </Body1Strong>

      <Body1 className={descriptionStyles}>
        {strings.NoSchemaExtensionsFoundDescription}
      </Body1>

      {onCreateNew && (
        <Button
          appearance="primary"
          size="medium"
          className={buttonStyles}
          onClick={onCreateNew}
          shape="circular"
        >
          <Add20Regular />
          {strings.CreateSchemaButtonLabel}
        </Button>
      )}
    </div>
  );
};
