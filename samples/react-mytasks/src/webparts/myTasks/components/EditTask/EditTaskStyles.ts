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
    fontWeight: FontWeights.regular,
  }
};

export const stackTokens: IStackTokens = {
  childrenGap: 10,

};

export const textFielStartDateDatePickerStyles: ITextFieldProps = {
  styles: {
    field: { backgroundColor: `${DefaultPalette.neutralLighter} !important` },
    root: {},
    wrapper: { },
    subComponentStyles: undefined
  }

};

export const textFielDueDateDatePickerStyles: ITextFieldProps = {
  styles: {
    field: { backgroundColor:  `${DefaultPalette.neutralLighter} !important` },
    root: {},
    fieldGroup: { },
    wrapper: {},
    subComponentStyles: { } as ITextFieldSubComponentStyles
  }
};

export const textFieldDescriptionStyles: ITextFieldStyles = {
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

export const textFieldCheckListItem: ITextFieldStyles = {
  field: { selectors:{ [':hover']: { backgroundColor: DefaultPalette.neutralLighter}}},
  root: { width:550,},
  description: {},
  errorMessage: {},
  fieldGroup: {},
  icon: {},
  prefix: { backgroundColor: 'white'},
  suffix: { backgroundColor: 'white'},
  wrapper: {},
  subComponentStyles: undefined,

};

export const textFieldStylesTaskName: ITextFieldStyles = {
  field: { backgroundColor: `${DefaultPalette.neutralLighter} !important`},
  root: {},
  description: {},
  errorMessage: {},
  fieldGroup: {},
  icon: {},
  prefix: {},
  suffix: {},
  wrapper: {selectors:{ [':hover']: { borderWidth: 1,borderStyle:'solid', borderColor: DefaultPalette.themePrimary}}},
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
  root: { marginTop:0, backgroundColor: '#f4f4f4'},
  textField: { backgroundColor: '#f4f4f4', borderWidth:0}
};

export const textFieldStylesdatePicker: ITextFieldProps = {
  style: { display: 'flex', justifyContent: 'flex-start', marginLeft: 15 , backgroundColor: '#f4f4f4'},
  iconProps: { style: { left: 0 } }
};

export const peoplePicker: IStyle = {
  backgroundColor: DefaultPalette.neutralLighter
};

export const addMemberButton: IButtonStyles = {
  root: { marginLeft: 0, paddingLeft: 0, marginTop: 0, fontSize: FontSizes.medium,width:26 },
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














