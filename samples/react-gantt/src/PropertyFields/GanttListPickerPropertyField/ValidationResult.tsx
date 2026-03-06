import * as React from "react";
import {
  Spinner,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  Text,
} from "@fluentui/react-components";
import { useGanttListPickerStyles } from "./useGanttListPickerStyles";
import type { IFieldValidationResult } from "./IGanttFieldDefinitions";
import * as strings from "GanttWebPartStrings";

export interface IValidationResultProps {
  validation?: IFieldValidationResult;
  isLoading: boolean;
}

export const ValidationResult: React.FC<IValidationResultProps> = React.memo(
  (props) => {
    const { validation, isLoading } = props;
    const { styles } = useGanttListPickerStyles();

    if (isLoading) {
      return (
        <div className={styles.spinner}>
          <Spinner size="tiny" label={strings.ValidatingFields} />
        </div>
      );
    }

    if (!validation) return null;

    return (
      <div className={styles.section}>
        {validation.isValid ? (
          <>
            <MessageBar intent="success">
              <Text>{strings.AutomaticFieldMapping}</Text>
            </MessageBar>
            {validation.missingOptional.length > 0 && (
              <MessageBar intent="warning">
                <MessageBarBody>
                  <MessageBarTitle>{strings.OptionalNotMapped}</MessageBarTitle>
                  <div className={styles.validationList}>
                    {validation.missingOptional.map((optionalField) => (
                      <Text key={optionalField.key} block size={200}>
                        {optionalField.label}
                      </Text>
                    ))}
                  </div>
                </MessageBarBody>
              </MessageBar>
            )}
          </>
        ) : (
          <MessageBar intent="error">
            <MessageBarBody>
              <MessageBarTitle>{strings.MissingRequiredFields}</MessageBarTitle>
              <div className={styles.validationList}>
                {validation.missingRequired.map((requiredField) => (
                  <Text key={requiredField.key} block size={200}>
                    {requiredField.label}
                  </Text>
                ))}
              </div>
            </MessageBarBody>
          </MessageBar>
        )}
      </div>
    );
  },
);

ValidationResult.displayName = "ValidationResult";
