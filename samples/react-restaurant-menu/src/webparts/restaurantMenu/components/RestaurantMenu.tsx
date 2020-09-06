import * as React from "react";

import { toUpper } from "lodash";
import moment from "moment";
import {
  Customizer,
  FontIcon,
  IStackTokens,
  Label,
  mergeStyleSets,
  Stack,
  Text
} from "office-ui-fabric-react";
import strings from "RestaurantMenuWebPartStrings";

import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartTitle } from "@pnp/spfx-controls-react";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import { EWeekdays } from "./EWeekDays";
import { IRestaurantMenuProps } from "./IRestaurantMenuProps";
import { MenuDetail } from "./MenuDetail";

const stackTokens: IStackTokens = {
  childrenGap: 10,
};
// Component Styles
const stackStyles = {
  root: {
    width: "100%",
  },
};

export const RestaurantMenu: React.FunctionComponent<IRestaurantMenuProps> = (
  props: IRestaurantMenuProps
) => {
  const [monday, setMonday] = React.useState<boolean>(false);
  const [tuesday, setTuesday] = React.useState<boolean>(false);
  const [wednesday, setWednesday] = React.useState<boolean>(false);
  const [thursday, setThursday] = React.useState<boolean>(false);
  const [friday, setFriday] = React.useState<boolean>(false);
  const [showMenuDetails, setShowMenuDetails] = React.useState<boolean>(false);
  const [showMenuForDay, setShowMenuForDay] = React.useState<EWeekdays>( () =>
   {
     if ( moment().isoWeekday() === EWeekdays.Sunday  || moment().isoWeekday() ===  EWeekdays.Saturday ) {
      return (EWeekdays.Friday);
     }else{
      return moment().isoWeekday();
     }
   }
  );

  const styleClasses = mergeStyleSets({
    menuIcon: {
      fontSize: 18,
    },
    webPartTitle: {
      marginBottom: 0,
    },
    stylContainerDetails: {
      marginTop: 25,
      display: "grid",
      justifyContent: "stretch",
      alignItems: "center",

      gridTemplateColumns: "repeat( auto-fit, minmax(45px, 1fr) )",
      gridTemplateRows: "auto",
    },
    separator: {
      borderBottomStyle: "solid",
      borderWidth: 1,
      borderBottomColor: props.themeVariant.palette.themeLighter,
    },

    styleIcon: {
      maxWidth: 44,
      minWidth: 44,
      minHeight: 30,
      height: 30,
      borderColor: props.themeVariant.palette.themePrimary,
      borderRightWidth: 0,
      borderRightStyle: "none",
      borderLeftWidth: 1,
      borderLeftStyle: "solid",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    listContainer: {
      maxWidth: "100%",
      overflowY: "auto",
      marginTop: 0,
      padding: 25,
      boxShadow: props.showBox
        ? "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)"
        : "",
    },
    linkButtonStyle: {
      minWidth: 45,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      backgroundColor: props.themeVariant.palette.neutralLighter,
      "&:not(:last-child)": {
        marginRight: 5,
      },
      ":hover": {
        backgroundColor: props.themeVariant.palette.themePrimary,
        color: props.themeVariant.palette.white,
        cursor: "pointer",
      },
    },
    linkButtonActiveStyle: {
      backgroundColor: props.themeVariant.palette.themePrimary,
      color: props.themeVariant.palette.white,
    },
  });

  const _weekDescription = `${moment().isoWeekday(1).format("Do")} ${toUpper(
    moment().isoWeekday(1).format("MMMM")
  )} to ${moment().isoWeekday(5).format("Do")} ${toUpper(
    moment().isoWeekday(5).format("MMMM")
  )}`;

  React.useEffect(() => {
    (async () => {
      setMonday(false);
      setTuesday(false);
      setWednesday(false);
      setThursday(false);
      setFriday(false);
      setShowMenuForDay(undefined);
      try {
        let _currentDay = moment().isoWeekday();

        switch (_currentDay) {
          case EWeekdays.Monday:
            setShowMenuForDay(EWeekdays.Monday);
            setMonday(true);
            break;
          case EWeekdays.Tuesday:
            setShowMenuForDay(EWeekdays.Tuesday);
            setTuesday(true);
            break;
          case EWeekdays.Wednesday:
            setShowMenuForDay(EWeekdays.Wednesday);
            setWednesday(true);
            break;
          case EWeekdays.Thursday:
            setShowMenuForDay(EWeekdays.Thursday);
            setThursday(true);
            break;
          case EWeekdays.Friday:
            setShowMenuForDay(EWeekdays.Friday);
            setFriday(true);
            break;
          case EWeekdays.Saturday:
            setShowMenuForDay(EWeekdays.Friday);
            setFriday(true);
            break;
          case EWeekdays.Sunday:
            setShowMenuForDay(EWeekdays.Friday);
            setFriday(true);
            break;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.listId, props.site]);

  if ( (!props.listId ||props.listId.length === 0) && props.site.length === 0) {
    return (
      <Placeholder
        iconName="Edit"
        iconText={strings.PlaceHolderIconTextLabel}
        description={strings.PlaceholderDescription}
        buttonLabel={strings.PlaceholderButtonLabel}
        hideButton={props.displayMode === DisplayMode.Read}
        onConfigure={() => {
          props.propertyPanel.open();
        }}
      />
    );
  }

  return (
    <>
      <Customizer settings={{ theme: props.themeVariant }}>
        <WebPartTitle
          displayMode={props.displayMode}
          title={props.title}
          themeVariant={props.themeVariant}
          updateProperty={props.updateProperty}
          className={styleClasses.webPartTitle}
        />

        <div className={styleClasses.listContainer}>
          <Stack tokens={stackTokens}>
            <Stack
              horizontal
              verticalAlign="center"
              horizontalAlign="center"
              tokens={{ childrenGap: 10 }}
              styles={{
                root: {
                  backgroundColor: props.themeVariant.palette.neutralLight,
                  width: "100%",
                  paddingRight: 10,
                  paddingLeft: 10,
                  minHeight: 32,
                },
              }}
            >
              <FontIcon
                iconName="ContextMenu"
                className={styleClasses.menuIcon}
              ></FontIcon>
              <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
                MENU
              </Text>
            </Stack>
            <div className={styleClasses.separator}></div>
            <Label
              styles={{
                root: {
                  fontSize: props.themeVariant.fonts.mediumPlus.fontSize,
                  color: props.themeVariant.palette.themePrimary,
                  textAlign: "center",
                  verticalAlign: "center",
                  fontWeight: 600,
                  marginBottom: 20,
                },
              }}
            >
              {_weekDescription}
            </Label>
            <div className={styleClasses.stylContainerDetails}>
              <div
                className={
                  monday
                    ? `${styleClasses.linkButtonStyle} ${styleClasses.linkButtonActiveStyle} `
                    : styleClasses.linkButtonStyle
                }
                onClick={(ev) => {
                  ev.preventDefault();
                  setShowMenuForDay(EWeekdays.Monday);
                  setMonday(true);
                  setTuesday(false);
                  setWednesday(false);
                  setThursday(false);
                  setFriday(false);
                }}
              >
                MON
              </div>
              <div
                className={
                  tuesday
                    ? `${styleClasses.linkButtonStyle} ${styleClasses.linkButtonActiveStyle} `
                    : styleClasses.linkButtonStyle
                }
                onClick={(ev) => {
                  ev.preventDefault();
                  setShowMenuForDay(EWeekdays.Tuesday);
                  setMonday(false);
                  setTuesday(true);
                  setWednesday(false);
                  setThursday(false);
                  setFriday(false);
                }}
              >
                TUE
              </div>
              <div
                className={
                  wednesday
                    ? `${styleClasses.linkButtonStyle} ${styleClasses.linkButtonActiveStyle} `
                    : styleClasses.linkButtonStyle
                }
                onClick={(ev) => {
                  ev.preventDefault();
                  setShowMenuForDay(EWeekdays.Wednesday);
                  setMonday(false);
                  setTuesday(false);
                  setWednesday(true);
                  setThursday(false);
                  setFriday(false);
                }}
              >
                WED
              </div>
              <div
                className={
                  thursday
                    ? `${styleClasses.linkButtonStyle} ${styleClasses.linkButtonActiveStyle} `
                    : styleClasses.linkButtonStyle
                }
                onClick={(ev) => {
                  ev.preventDefault();
                  setShowMenuForDay(EWeekdays.Thursday);
                  setMonday(false);
                  setTuesday(false);
                  setWednesday(false);
                  setThursday(true);
                  setFriday(false);
                }}
              >
                THU
              </div>
              <div
                className={
                  friday
                    ? `${styleClasses.linkButtonStyle} ${styleClasses.linkButtonActiveStyle} `
                    : styleClasses.linkButtonStyle
                }
                onClick={(ev) => {
                  ev.preventDefault();
                  setShowMenuForDay(EWeekdays.Friday);
                  setMonday(false);
                  setTuesday(false);
                  setWednesday(false);
                  setThursday(false);
                  setFriday(true);
                }}
              >
                FRI
              </div>
            </div>
            <div style={{ paddingTop: 15 }}>
              {props.listId && props.site[0].url && (
                <MenuDetail dayOfWeek={showMenuForDay} {...props}></MenuDetail>
              )}
            </div>
          </Stack>
        </div>
      </Customizer>
    </>
  );
};
