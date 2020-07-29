import { AppContext, IAppContextProps } from "../../Common/AppContextProps";
import { IProfileCardProperty } from "../../Entities/IProfileCardProperty";
import { IAnnotation, ILocalization } from "../../Entities/IAnnotations";
import { languages } from "../../Common/constants";
import {
  DefaultButton,
  PrimaryButton,
} from "office-ui-fabric-react/lib/Button";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { useConstCallback } from "@uifabric/react-hooks";
import React, { useContext, useEffect } from "react";
import { useProfileCardProperties } from "../../hooks/useProfileCardProperties";
import { IEditProfileCardPropertyProps } from "../EditProfileCardProperty/IEditProfileCardPropertyProps";
import { IEditProfileCardPropertyState } from "../EditProfileCardProperty/IEditProfileCardPropertyState";
import * as _ from "lodash";
import {
  Stack,
  ComboBox,
  TextField,
  Label,
  Icon,
  IComboBox,
  CommandButton,
  IIconProps,
  initializeIcons,
  IComboBoxOption,
  mergeStyleSets,
  IIconStyles,
  ILabelStyles,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import { ILocalizationExtended } from "../../Entities/IlocalizationExtended";
import strings from "ManageProfileCardPropertiesWebPartStrings";

// Component
// Edit Profile Property Component

export const EditProfileCardProperty: React.FunctionComponent<IEditProfileCardPropertyProps> = (
  props: IEditProfileCardPropertyProps
) => {
  const applicationContext: IAppContextProps = useContext(AppContext); // Get React Context

  const newIcon: IIconProps = { iconName: "Add" };
  const { displayPanel, onDismiss } = props;
  const {
    getProfileCardProperty,
    updateProfileCardProperty,
  } = useProfileCardProperties(); // Get method from hook

  // Component Styles
  const compomentStyles = mergeStyleSets({
    addButtonContainer: {
      width: 60,
      display: "Flex",
      paddingTop: 15,
      paddingRight: 10,
      alignContent: "center",
      justifyContent: "center",
    },
  });

  // Icon styles of labels
  const iconlabelsStyles: IIconStyles = {
    root: {
      fontSize: 26,
      color: applicationContext.themeVariant.palette.themePrimary,
    },
  };
  // Label Styles
  const labelStyles: ILabelStyles = {
    root: { fontSize: 16 },
  };

  // Language Options
  let _languagesOptions: IComboBoxOption[] = languages.map((language, i) => ({
    key: language.languageTag,
    text: `${language.displayName} (${language.languageTag})`,
  }));

  // State
  const [state, setState] = React.useState<IEditProfileCardPropertyState>({
    isloading: true,
    hasError: false,
    errorMessage: "",
    isSaving: false,
    displayPanel: displayPanel,
    profileCardProperties: {
      directoryPropertyName: "",
      annotations: [{ displayName: "", localizations: [] }],
    },
    disableAdd: true,
    addLocalizationItem: {} as ILocalizationExtended,
    languagesOptions: _languagesOptions,
  });

  // Run on Compoment did mount
  useEffect(() => {
    (async () => {

      const { msGraphClient, organizationId } = applicationContext;
      // Get Profile Property
      let _profileCardProperty: IProfileCardProperty = await getProfileCardProperty(
        msGraphClient,
        organizationId,
        props.directoryPropertyName
      );
      const _localizations: ILocalization[] =
        _profileCardProperty.annotations[0].localizations;

      let _newLaguageOptions: IComboBoxOption[] = _languagesOptions;
      let _newLocalizations: ILocalizationExtended[] = [];

      // add to combobox language that already exists (Localization for Property)
      // the localization array must be fullfil from vaklues of localiz<ation to add the language description , we only get from API the
      // Langua tag

      for (const _localization of _localizations) {
        _newLaguageOptions = _.filter(_newLaguageOptions, (l) => {
          return l.key !== _localization.languageTag;
        });
        const _selectedLanguage = _.filter(_languagesOptions, (l) => {
          return l.key == _localization.languageTag;
        });
        _newLocalizations.push({
          displayName: _localization.displayName,
          languageDescription: _selectedLanguage[0].text,
          languageTag: _localization.languageTag,
        });
      }

      // set bnew Language Option and Localization with language description

      _languagesOptions = _newLaguageOptions;
      _profileCardProperty.annotations[0].localizations = _newLocalizations;
      //  update component State
      setState({
        ...state,
        isloading: false,
        languagesOptions: _languagesOptions,
        profileCardProperties: _profileCardProperty,
      });
    })();
  }, []);

  // Button Styles
  const buttonStyles = { root: { marginRight: 8 } };

  // On dismiss Panel
  const dismissPanel = useConstCallback(() => {
    setState({ ...state, displayPanel: false });
    onDismiss(false);
  });

  // On Change Display Name
  const _onChangeDisplayName = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    ev.preventDefault();
    let { profileCardProperties } = state;
    profileCardProperties.annotations[0].displayName = value;
    setState({ ...state, profileCardProperties: profileCardProperties });
  };


  // On Language Change
  const _onLanguageChange = (
    ev: React.FormEvent<IComboBox>,
    option?: IComboBoxOption
  ) => {
    ev.preventDefault();
    let { addLocalizationItem } = state;
    addLocalizationItem = {
      ...addLocalizationItem,
      languageTag: option.key.toString(),
      languageDescription: option.text,
    };

    if (addLocalizationItem.displayName && addLocalizationItem.languageTag) {
      setState({
        ...state,
        disableAdd: false,
        addLocalizationItem: addLocalizationItem,
      });
    } else {
      setState({
        ...state,
        disableAdd: true,
        addLocalizationItem: addLocalizationItem,
      });
    }
  };

  // On Change LocalizationDisplayName
  const _onChangeLocalizationisplayName = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string
  ) => {
    ev.preventDefault();
    let { addLocalizationItem } = state;
    addLocalizationItem = { ...addLocalizationItem, displayName: value };
    if (addLocalizationItem.displayName && addLocalizationItem.languageTag) {
      setState({
        ...state,
        disableAdd: false,
        addLocalizationItem: addLocalizationItem,
      });
    } else {
      setState({
        ...state,
        disableAdd: true,
        addLocalizationItem: addLocalizationItem,
      });
    }
  };

  // onCLick Add Property

  const _onUpdateProperty = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    const { msGraphClient, organizationId } = applicationContext;
    const { profileCardProperties } = state;
    const _localizationsExtended =
      profileCardProperties.annotations[0].localizations;

      setState({...state, isSaving: true, disableAdd: true});

    let _profileCardProperty: IProfileCardProperty = {} as IProfileCardProperty;
    let _localizations: ILocalization[] = [];
    for (const _localizationExtended of _localizationsExtended) {
      _localizations.push({
        displayName: _localizationExtended.displayName,
        languageTag: _localizationExtended.languageTag,
      });
    }

    let _annotations: IAnnotation[] = [
      {
        displayName: profileCardProperties.annotations[0].displayName,
        localizations: _localizations,
      },
    ];

    _profileCardProperty = {
      directoryPropertyName: profileCardProperties.directoryPropertyName,
      annotations: _annotations,
    };

    try {
       const updatedProfileCardProperties = await updateProfileCardProperty(
        msGraphClient,
        organizationId,
        _profileCardProperty
      );
      // Return to list and refresh indicator true
      onDismiss(true);
    } catch (error) {
      const _errorMessage:string = error.message ? error.message : strings.DefaultErrorMessageText;
      setState({ ...state, hasError: true, errorMessage: _errorMessage , isSaving: false, disableAdd: false});
      console.log(error);
    }
  };

  //************************************************************************************************* */
  // On Render Footer
  //************************************************************************************************* */
  const _onRenderFooterContent = (): JSX.Element => {
    const { profileCardProperties, isSaving } = state;

    let disableAddButton: boolean = true;
    if (
      profileCardProperties.directoryPropertyName &&
      profileCardProperties.annotations[0].displayName
    ) {
      disableAddButton = false;
    }
    // Render Component
    return (
      <div>
        <PrimaryButton
          disabled={disableAddButton}
          onClick={_onUpdateProperty}
          styles={buttonStyles}
        >
          {isSaving ? (
            <Spinner size={SpinnerSize.xSmall}></Spinner>
          ) : (
            strings.SaveButtonText
          )}
        </PrimaryButton>
        <DefaultButton onClick={dismissPanel}>
          {strings.CancelButtonText}
        </DefaultButton>
      </div>
    );
  };

  // On add new localization
  const _onAddNewLocalization = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    // tslint:disable-next-line: no-shadowed-variable
    const {
      profileCardProperties,
      addLocalizationItem,
      // tslint:disable-next-line: no-shadowed-variable
      languagesOptions,
    } = state;
    let _localizations = profileCardProperties.annotations[0].localizations;
    _localizations.push(addLocalizationItem);
    profileCardProperties.annotations[0].localizations = _localizations;
    const { languageTag } = addLocalizationItem;
    const newLaguageOptions: IComboBoxOption[] = _.filter(
      languagesOptions,
      (l) => {
        return l.key !== languageTag;
      }
    );
    // Update State
    setState({
      ...state,
      profileCardProperties: profileCardProperties,
      addLocalizationItem: {
        displayName: "",
        languageTag: "",
        languageDescription: "",
      },
      languagesOptions: newLaguageOptions,
    });
  };

  // on Delete Localization

  const _onDeleteLocalization = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    // tslint:disable-next-line: no-shadowed-variable
    let { languagesOptions, profileCardProperties } = state;

    const _languageTag = ev.currentTarget.getAttribute("data-language-tag");
    let _localizations: ILocalization[] =
      profileCardProperties.annotations[0].localizations;

    // get all localization without the deleted localization
    const newlocalizations: ILocalization[] = _.filter(_localizations, (l) => {
      return l.languageTag !== _languageTag;
    });

    // Add new localization without the deleted localization
    profileCardProperties.annotations[0].localizations = newlocalizations;

    // Get Deleted Localization
    const deletedLocalization: ILocalization[] = _.filter(
      _localizations,
      (l) => {
        return l.languageTag == _languageTag;
      }
    );

    // Add deleted Localization to combo box of language
    const _deletedLocalization: ILocalizationExtended = deletedLocalization[0] as ILocalizationExtended;
    languagesOptions.push({
      key: _deletedLocalization.languageTag,
      text: `${_deletedLocalization.languageDescription}`,
    });

    // Re render component
    setState({
      ...state,
      profileCardProperties: profileCardProperties,
      languagesOptions: _.sortBy(languagesOptions, ["text"]), // Sort language Options
    });
  };

  // OnChange Localization Display Name
  const _onChangeLocalizationDisplayName = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string
  ) => {
    ev.preventDefault();
    let { profileCardProperties } = state;
    let { localizations } = profileCardProperties.annotations[0];
    const _languageTagIndex: HTMLElement = ev.target as HTMLElement;
    const _index: number = Number(
      _languageTagIndex.getAttribute("data-language-tag-index")
    );
    localizations[_index] = { ...localizations[_index], displayName: newValue };

    profileCardProperties.annotations[0].localizations = localizations;
    setState({ ...state, profileCardProperties: profileCardProperties });
    console.log(state);
  };

  //************************************************************************************************* */
  // Test if there are Profile Card Properties
  //************************************************************************************************* */

  let { annotations, directoryPropertyName } = state.profileCardProperties;

  let _displayName: string = "";
  let localizations: ILocalization[] = [];
  if (annotations) {
    _displayName = annotations[0].displayName;
    if (annotations[0].localizations) {
      localizations = annotations[0].localizations;
    }
  }

  //************************************************************************************************* */
  // Render Control
  //************************************************************************************************* */
  const { isloading, hasError, errorMessage, languagesOptions } = state;

  // Is loading
  if (isloading) {
    return <Spinner size={SpinnerSize.medium} label={strings.LoadingText} />;
  }

  // Render
  return (
    <>
      <Panel
        isOpen={state.displayPanel}
        onDismiss={dismissPanel}
        type={PanelType.custom}
        customWidth={"600px"}
        closeButtonAriaLabel="Close"
        headerText={strings.EditPanelHeaderText}
        onRenderFooterContent={_onRenderFooterContent}
        isFooterAtBottom={true}
      >
        {hasError && (
           <Stack
           style={{ marginTop: 30, marginBottom: 30 }}

           tokens={{ childrenGap: 10 }}
           horizontalAlign="start"
           verticalAlign="center"
         >
            <MessageBar messageBarType={MessageBarType.error}>
              {errorMessage}
            </MessageBar>
            </Stack>
          )}
        <Stack
          style={{ marginTop: 30, marginBottom: 30 }}
          horizontal={true}
          tokens={{ childrenGap: 10 }}
          horizontalAlign="start"
          verticalAlign="center"
        >
          <Icon iconName="EditContact" styles={iconlabelsStyles}></Icon>
          <Label styles={labelStyles}>{strings.PanelHeaderLabel}</Label>
        </Stack>
        <Stack tokens={{ childrenGap: 10 }}>
          <TextField
            label="Directory Property Name"
            defaultValue={directoryPropertyName}
            readOnly={true}
            styles={{
              field: {
                backgroundColor:
                  applicationContext.themeVariant.semanticColors
                    .disabledBackground,
              },
            }}
          />
          <TextField
            required={true}
            label="Display Name"
            autoComplete="on"
            name="displayName"
            value={_displayName}
            validateOnLoad={false}
            validateOnFocusOut={true}
            onGetErrorMessage={(value: string) => {
              if (!value) {
                return "Field is Required";
              } else {
                return;
              }
            }}
            onChange={_onChangeDisplayName}
          />
          <Stack
            style={{ marginTop: 30 }}
            horizontal={true}
            tokens={{ childrenGap: 10 }}
            horizontalAlign="start"
            verticalAlign="center"
          >
            <Icon iconName="World" styles={iconlabelsStyles}></Icon>
            <Label styles={labelStyles}>Localization</Label>
          </Stack>
          <Stack
            horizontal={true}
            tokens={{ childrenGap: 10 }}
            horizontalAlign="start"
            verticalAlign="center"
          >
            <ComboBox
              required={true}
              label="Language"
              styles={{ root: { width: 300 } }}
              dropdownWidth={300}
              allowFreeform
              autoComplete="on"
              selectedKey={state.addLocalizationItem.languageTag}
              options={languagesOptions}
              onChange={_onLanguageChange}
            />
            <TextField
              required={true}
              label="Display Name"
              styles={{ field: { width: 190 } }}
              value={state.addLocalizationItem.displayName}
              onChange={_onChangeLocalizationisplayName}
            />

            <div className={compomentStyles.addButtonContainer}>
              <CommandButton
                iconProps={newIcon}
                title="Add"
                ariaLabel="Add"
                onClick={_onAddNewLocalization}
                styles={{
                  icon: { fontSize: 26 },
                }}
                disabled={state.disableAdd}
              />
            </div>
          </Stack>
          <div style={{ height: "100%", overflow: "auto" }}>
            {localizations.map(
              (localization: ILocalizationExtended, index: number) => {
                return (
                  <>
                    <Stack
                      horizontal={true}
                      tokens={{ childrenGap: 10 }}
                      horizontalAlign="start"
                      verticalAlign="center"
                      styles={{ root: { marginTop: 5 } }}
                    >
                      <TextField
                        disabled
                        styles={{
                          root: { width: 300 },
                          field: {
                            color:
                              applicationContext.themeVariant.semanticColors
                                .inputText,
                          },
                        }}
                        value={localization.languageDescription}
                      />
                      <TextField
                        styles={{
                          field: {
                            color:
                              applicationContext.themeVariant.semanticColors
                                .inputText,
                            width: 190,
                          },
                        }}
                        data-language-tag-index={index}
                        value={localization.displayName}
                        onChange={_onChangeLocalizationDisplayName}
                      />

                      <CommandButton
                        iconProps={{ iconName: "Delete" }}
                        data-language-tag={localization.languageTag}
                        title="Delete"
                        ariaLabel="Delete"
                        styles={{
                          icon: { fontSize: 26 },
                        }}
                        onClick={_onDeleteLocalization}
                      />
                    </Stack>
                  </>
                );
              }
            )}
          </div>
        </Stack>
      </Panel>
    </>
  );
};
