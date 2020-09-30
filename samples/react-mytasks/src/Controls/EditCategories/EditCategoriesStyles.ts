import { FontSizes, FontWeights, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { CommunicationColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import {
  IStackStyles,
  IStackTokens,
  IStackItemStyles,
  ITextFieldStyles,
  ITextFieldSubComponentStyles,
  IModalStyles,
  ImageLoadState,
  IDatePickerStyles,
  ITextFieldProps,
  IStyle,
  IButtonStyles,
  calculatePrecision,
  IDropdownStyles,
  ICheckStyleProps,
  ICheckStyles,
  ICheckboxStyles
} from 'office-ui-fabric-react';

// Styles definition
export const stackStyles: IStackStyles = {
  root: {
    alignItems: 'center',
    marginTop: 10
  }
};
export const stackItemStyles: IStackItemStyles = {
  root: {
    padding: 5,
    display: 'flex',
    width: 172,
    height: 32,
    fontWeight: FontWeights.regular
  }
};

export const stackTokens: IStackTokens = {
  childrenGap: 10
};

export const textFielUrlStyles: ITextFieldStyles = {
  field: { backgroundColor: DefaultPalette.neutralLighter },
  root: {},
  description: {},
  errorMessage: {},
  fieldGroup: {},
  icon: {},
  prefix: {},
  suffix: {},
  wrapper: {},
  subComponentStyles: undefined
};

export const modalStyles: IModalStyles = {
  main: { minWidth: 400, maxWidth: 450 },
  root: {},
  keyboardMoveIcon: {},
  keyboardMoveIconContainer: {},
  layer: {},
  scrollableContent: {}
};

export const checkboxStyles: ICheckboxStyles = {
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 90,
    height: 20,
    marginTop: 30,
    selectors: { [':hover']: { background: 'rgba(0, 0, 0, 0.2)' } }
  },
  input : {width: 90,
    height: 20,
  },
  checkmark : {
    fontSize : 16
  }
};
