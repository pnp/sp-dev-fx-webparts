import {   getTheme, FontSizes, FontWeights, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
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
} from 'office-ui-fabric-react';

const currentTheme = getTheme();

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
    fontWeight: FontWeights.regular,
  }
};

export const stackTokens: IStackTokens = {
  childrenGap: 10,

};

export const textFielStartDateDatePickerStyles: ITextFieldProps = {
  styles: {
    field: { backgroundColor: currentTheme.palette.neutralLighter },
    root: {},
    wrapper: {},
    subComponentStyles: undefined
  }

};

export const textFielDueDateDatePickerStyles: ITextFieldProps = {
  styles: {
    field: { backgroundColor: currentTheme.palette.neutralLighter },
    root: {},
    wrapper: {},
    subComponentStyles: undefined
  }

};

export const textFieldDescriptionStyles: ITextFieldStyles = {
  field: { backgroundColor: currentTheme.palette.neutralLighter },
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

export const textFieldCheckListItem: ITextFieldStyles = {
  field: { paddingLeft: 2 , },
  root: { width:'100%', marginRight: 15},
  description: {},
  errorMessage: {},
  fieldGroup: {},
  icon: {},
  prefix: { paddingLeft: 5,paddingRight: 5, backgroundColor: 'white',},
  suffix: { backgroundColor: 'white', cursor:'pointer' ,},
  wrapper: { selectors:{ ['&:hover']: { borderWidth: 1,borderStyle:'solid', borderColor: currentTheme.palette.neutralLight}}},
  subComponentStyles: undefined,

};

export const textFieldStylesTaskName: ITextFieldStyles = {
  field: { backgroundColor: currentTheme.palette.neutralLighter },
  root: {},
  description: {},
  errorMessage: {},
  fieldGroup: {},
  icon: {},
  prefix: {},
  suffix: {},
  wrapper: {selectors:{ [':hover']: { borderWidth: 1,borderStyle:'solid', borderColor: currentTheme.palette.themePrimary}}},
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

export const datePickerStartDateStyles: IDatePickerStyles = {
  callout: {},
  icon: {},
  root: { marginTop:0},
  textField: { backgroundColor: '#f4f4f4', borderWidth:0}
};

export const textFieldStylesdatePicker: ITextFieldProps = {
  style: { display: 'flex', justifyContent: 'flex-start', marginLeft: 15 },
  iconProps: { style: { left: 0 } }
};

export const peoplePicker: IStyle = {
  backgroundColor: currentTheme.palette.neutralLighter
};

export const addMemberButton: IButtonStyles = {
  root: { marginLeft: 0, paddingLeft: 0, marginTop: 0, fontSize: FontSizes.medium, width:26 },
  textContainer: {
    fontSize: FontSizes.medium,
    fontWeight: 'normal',
    color: '#666666',
    marginLeft: 5
  }
};

export const dropDownBucketStyles: IDropdownStyles = {

  root: { margin: 0 } ,
  title: {backgroundColor: '#f4f4f4', borderWidth:0},
  callout: {},
  caretDown: {},
  caretDownWrapper: {},
  dropdown:{},
  dropdownDivider: {},
  dropdownItem: {},
  dropdownItemDisabled: {},
  dropdownItemHeader:{},
  dropdownItemHidden: {},
  dropdownItemSelected:{},
  dropdownItemSelectedAndDisabled:{},
  dropdownItems:{},
  dropdownItemsWrapper:{},
  dropdownOptionText:{},
  errorMessage:{},
  label:{},
  panel:{},
  subComponentStyles: undefined,
};

export const dropDownProgressStyles: IDropdownStyles = {

  root: { margin: 0 } ,
  title: {backgroundColor: '#f4f4f4', borderWidth:0},
  callout: {},
  caretDown: {},
  caretDownWrapper: {},
  dropdown:{},
  dropdownDivider: {},
  dropdownItem: {},
  dropdownItemDisabled: {},
  dropdownItemHeader:{},
  dropdownItemHidden: {},
  dropdownItemSelected:{},
  dropdownItemSelectedAndDisabled:{},
  dropdownItems:{},
  dropdownItemsWrapper:{},
  dropdownOptionText:{},
  errorMessage:{},
  label:{},
  panel:{},
  subComponentStyles: undefined,
};













