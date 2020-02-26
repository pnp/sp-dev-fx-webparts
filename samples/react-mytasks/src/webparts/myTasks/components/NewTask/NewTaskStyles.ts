import {getTheme, mergeStyles, mergeStyleSets , FontSizes, FontWeights, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';


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
  calculatePrecision
} from 'office-ui-fabric-react';


const theme = getTheme();
// Styles definition
export const stackStyles: IStackStyles = {
  root: {

    alignItems: 'center',
    marginTop: 10
  }
};
export const stackItemStyles: IStackItemStyles = {
  root: {
    background: theme.palette.themePrimary,
    color: theme.palette.white,
    padding: 5
  }
};

export const textFieldStylesTaskName: ITextFieldStyles = {
  field: { backgroundColor: `${theme.palette.neutralLighter} !important` },
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
  main: { minWidth: 400 ,maxWidth: 450, },
  root: {},
  keyboardMoveIcon: {},
  keyboardMoveIconContainer: {},
  layer: {},
  scrollableContent: {}
};

export const datePickerStyles: IDatePickerStyles = {
  callout: {},
  icon: {},
  root: {},
  textField: {}
};

export const textFieldStylesdatePicker: ITextFieldProps = {
  style: { display: 'flex', justifyContent: 'flex-start', marginLeft: 15 },
  iconProps: { style: { left: 0 } }
};

export const peoplePicker: IStyle = {
  backgroundColor: theme.palette.neutralLighter
};

export const addMemberButton: IButtonStyles = {
  root: { marginLeft: 0, paddingLeft: 0, marginTop: 0, fontSize: FontSizes.medium , width:26},
  textContainer: {
    fontSize: FontSizes.medium,
    fontWeight: 'normal',
    color: '#666666',
    marginLeft: 2
  }
};
