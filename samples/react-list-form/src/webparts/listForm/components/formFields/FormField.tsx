import * as React from 'react';

import { Label } from 'office-ui-fabric-react/lib/Label';
import { css, DelayedRender } from 'office-ui-fabric-react/lib/Utilities';

import { Icon } from 'office-ui-fabric-react/lib/Icon';

import { AnimationClassNames } from '@uifabric/styling';

import { ControlMode } from '../../../../common/datatypes/ControlMode';
import { IFieldSchema } from '../../../../common/services/datatypes/RenderListData';

import * as stylesImport from 'office-ui-fabric-react/lib/components/TextField/TextField.types';

import ardStyles from './FormField.module.scss';

export interface IFormFieldProps {
  className?: string;
  controlMode: ControlMode;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  value: any;
  errorMessage?: string;
  valueChanged(newValue: any): void;
}

const FormField: React.SFC<IFormFieldProps> = (props) => {
  const styles: any = stylesImport;
  const {
    children,
    className,
    description,
    disabled,
    label,
    required,
    active,
    errorMessage,
  } = props;
  const formFieldClassName = css('ard-formField', ardStyles.formField, styles.root, className, {
    ['is-required ' + styles.rootIsRequired]: required,
    ['is-disabled ' + styles.rootIsDisabled]: disabled,
    ['is-active ' + styles.rootIsActive]: active,
  });
  const isDescriptionAvailable = Boolean(props.description || props.errorMessage);

  return (
    <div className={css(formFieldClassName, 'od-ClientFormFields-field')}>
      <div className={css('ard-FormField-wrapper', styles.wrapper)}>
        {label && <Label className={css(ardStyles.label, { ['is-required']: required })}>{label}</Label>}
        <div className={css('ard-FormField-fieldGroup', ardStyles.controlContainerDisplay, active
          && styles.fieldGroupIsFocused, errorMessage && styles.invalid)}>
          {children}
        </div>
      </div>
      {isDescriptionAvailable &&
        <span>
          {description && <span className={css('ard-FormField-description', styles.description)}>{description}</span>}
          {errorMessage &&
            <div aria-live='assertive' style={{ color: '#a80000' }}>
              {errorMessage}
              {/* <DelayedRender>
                 <p className={css('ard-FormField-errorMessage', AnimationClassNames.slideDownIn20, styles.errorMessage ? styles.errorMessage : '')}>
                  {Icon({ iconName: 'Error', className: styles.errorIcon ? styles.errorIcon : '' })}
                  <span className={styles.errorText ? styles.errorText : ''} data-automation-id='error-message'>{errorMessage}</span>
                </p> 
               
              </DelayedRender> */}
            </div>
          }
        </span>
      }
    </div>
  );
};

export default FormField;
