import * as React from "react";
import {
  mergeStyleSets,
  Persona,
  PersonaSize,
  Stack,
  Label,
  FontIcon,
  Text,
  Link,
  ITextFieldStyles,
  IPersonaProps,
  loadTheme,
} from "office-ui-fabric-react";
import { presenceStatus, IPresenceStatus } from "../../common/PresenceStatus";
import { AppContext } from "../../common/AppContext";
import { ActionButton } from "office-ui-fabric-react";
import { IUserExtended } from "../../entites/IUserExtended";
import { IAppContext } from "../../common/IAppContext";
import { IUserCardProps } from "./IUserCardProps";

const teamsDefaultTheme = require("../../common/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../common/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../common/TeamsContrastTheme.json");

export const UserCard = (props: IUserCardProps) => {
  const { userData, updateUsersPresence } = props;
  const _context: IAppContext = React.useContext(AppContext);

  const [expandIcon, setExpandIcon] = React.useState("ChevronDownSmall");
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const _Theme = window.__themeState__.theme;
 
  const styleClasses = mergeStyleSets({
    separator: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 15,
      borderBottomStyle: "solid",
      borderWidth: 1,
      borderBottomColor: _context.themeVariant?.palette?.themeLighter ?? _Theme.themeLighter,
    },
    stylContainerDetails: {
      marginTop: 25,
      display: "grid",
      justifyContent: "stretch",
      alignItems: "center",
      backgroundColor: _context.themeVariant?.palette?.neutralLighterAlt ?? _Theme.neutralLighterAlt,
      gridTemplateColumns: "repeat( auto-fit, minmax(280px, 1fr) )",
      gridTemplateRows: "auto",
    },

    styleIconDetails: {
      fontSize: 16,
      color: _context.themeVariant?.palette?.themePrimary ?? _Theme.themePrimary,
    },
    styleFieldLabel: {
      fontSize: 12,
      fontWeight: 400,
      paddingLeft: 3,
      color: _Theme.inputText
    },

    styleField: {
      paddingTop: 15,
      color: _context.themeVariant?.palette?.themePrimary ?? _Theme.themePrimary,
    },
  });

  const styleTextField: Partial<ITextFieldStyles> = {
    root: {
      fontWeight: 500,
      width: "calc(100% - 46)",
      marginLeft: 45,
      paddingRight: 20,
    },
  };

  React.useEffect(() => {
    (async () => {
      if (!updateUsersPresence) {
        setExpandIcon("ChevronDownSmall");
        setIsDetailsOpen(false);
      }
    })();
  }, [userData]);

  const _onShowDetails = (event) => {
    event.preventDefault();
    if (!isDetailsOpen) {
      setExpandIcon("ChevronUpSmall");
      setIsDetailsOpen(true);
    } else {
      setExpandIcon("ChevronDownSmall");
      setIsDetailsOpen(false);
    }
  };

  //tris added onclick event
  const _onRenderPrimaryText = (persona: IPersonaProps) => {
    return (
      <>
        <Stack
          horizontal={true}
          verticalAlign="start"
          tokens={{ childrenGap: 5 }}
          styles={{
            root: { justifyContent: "flex-start", width: "100%" },
          }}
        >
          <Text onClick={
              (event) => {
                  event.preventDefault();
                  window.open("https://gbr.delve.office.com/?u=" + userData.id + "&v=work", "_blank");
              }
            }
            variant="medium"
            block
            nowrap
            style={{
              width: "100%",
              fontWeight: 600,
              padding: 0,
              marginBottom: 3
            }}
            title={persona.text}
          >
            {persona.text}
          </Text>
          <Stack
            horizontal
            horizontalAlign="end"
            verticalAlign="start"
            tokens={{ childrenGap: 3 }}
            style={{ width: "100%", maxHeight: 21 }}
          >
            <div style={{ fontSize: 12 }}>
              <ActionButton
              
                styles={{
                  root: {
                    height: 21,
                    width: 26,
                    color: _context.themeVariant?.palette?.themeSecondary ?? _Theme.themeSecondary,
                  },
                }}
                iconProps={{
                  iconName: "CannedChat",
                  color: _context.themeVariant?.palette?.themeSecondary  ??_Theme.themeSecondary,
                }}
                allowDisabledFocus={true}
                disabled={false}
                checked={true}
                title="Start Teams Chat"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(
                    "https://teams.microsoft.com/l/chat/0/0?users=" +
                      userData.mail +
                      "&message=Hi " +
                      userData.displayName,
                    "_blank"
                  );
                }}
              ></ActionButton>
            </div>
            <div>
              <ActionButton
                styles={{
                  root: {
                    height: 21,
                    width: 26,

                  },
                }}
                iconProps={{
                  iconName: expandIcon,
                  color: _Theme.themeSecondary

                }}
                allowDisabledFocus={true}
                disabled={false}
                checked={true}
                title={isDetailsOpen ? "Hide details" : "Show Details"}
                onClick={_onShowDetails}
              ></ActionButton>
            </div>
          </Stack>
        </Stack>
      </>
    );
  };


  //tris added onclick event
  const _onRenderSecondaryText = (persona: IPersonaProps) => {
    return (
      <>
        <Stack verticalAlign="start" tokens={{ childrenGap: 0 }}>
          <Text onClick={
              (event) => {
                  event.preventDefault();
                  window.open("https://gbr.delve.office.com/?u=" + userData.id + "&v=work", "_blank");
              }
            }
            title={persona.secondaryText} variant="medium" block nowrap>
            {" "}
            {persona.secondaryText}
          </Text>
          <Text
            title={presenceStatus[userData.availability].presenceStatusLabel}
            variant="smallPlus"
            block
            nowrap
          >
            {presenceStatus[userData.availability].presenceStatusLabel}
          </Text>
        </Stack>
      </>
    );
  };

  return (
    <>
      <Stack
        verticalAlign="center"
        tokens={{ childrenGap: 20 }}
        style={{ padding: 10 }}
      >
        <Persona
          size={PersonaSize.size48}
          imageUrl={userData.pictureBase64}
          presence={presenceStatus[userData.availability].presenceStatus}
          presenceTitle={
            presenceStatus[userData.availability].presenceStatusLabel
          }
          text={userData.displayName}
          title={userData.displayName}
          tertiaryText={userData.mail}          
          secondaryText={userData.jobTitle}
          onRenderPrimaryText={_onRenderPrimaryText}
          onRenderSecondaryText={_onRenderSecondaryText}
        ></Persona> 
      </Stack>
      {isDetailsOpen && (
        <>
          <Stack
            style={{ width: "100%" }}
            className={styleClasses.stylContainerDetails}
          >
            <div
              className={`${styleClasses.styleField}`}
              title={
                userData.department ? userData.department : "Not available"
              }
            >
              <Stack
                horizontal={true}
                verticalAlign="center"
                tokens={{ childrenGap: 5 }}
                style={{ marginRight: 20, marginLeft: 20 }}
              >
                <FontIcon
                  className={styleClasses.styleIconDetails}
                  iconName="Teamwork"
                />
                <Label className={styleClasses.styleFieldLabel}>
                  Department
                </Label>
              </Stack>
              <Text
                styles={styleTextField}
                variant="medium"
                block={true}
                nowrap={true}
              >
                {userData.department ? userData.department : "Not available"}
              </Text>
              <div className={styleClasses.separator}></div>
            </div>

            <div
              className={`${styleClasses.styleField}`}
              title={
                userData.businessPhones.join(",")
                  ? userData.businessPhones.join(",")
                  : "Not available"
              }
            >
              <Stack
                horizontal={true}
                verticalAlign="center"
                tokens={{ childrenGap: 5 }}
                style={{ marginRight: 20, marginLeft: 20 }}
              >
                <FontIcon
                  className={styleClasses.styleIconDetails}
                  iconName="Phone"
                />
                <Label className={styleClasses.styleFieldLabel}>
                  Business Phones
                </Label>
              </Stack>
              <Text
                styles={styleTextField}
                variant="medium"
                block={true}
                nowrap={true}
              >
                {userData.businessPhones.join(",") ? (
                  <>
                    <Link href={`CALLTO:${userData.businessPhones[0]}`}>
                      {userData.businessPhones[0]}
                    </Link>
                  </>
                ) : (
                  "Not available"
                )}
              </Text>
              <div className={styleClasses.separator}></div>
            </div>

            <div
              className={`${styleClasses.styleField}`}
              title={userData.mail ? userData.mail : "Not Available"}
            >
              <Stack
                horizontal={true}
                verticalAlign="center"
                tokens={{ childrenGap: 5 }}
                style={{ marginRight: 20, marginLeft: 20 }}
              >
                <FontIcon
                  className={styleClasses.styleIconDetails}
                  iconName="Mail"
                />
                <Label className={styleClasses.styleFieldLabel}>E-mail</Label>
              </Stack>
              <Text
                styles={styleTextField}
                variant="medium"
                block={true}
                nowrap={true}
              >
                {userData.mail ? (
                  <>
                    <Link href={`MAILTO:${userData.mail}`}>
                      {userData.mail}
                    </Link>
                  </>
                ) : (
                  "Not available"
                )}
              </Text>
              <div className={styleClasses.separator}></div>
            </div>

            {props.userAttributes.length > 0 &&
              props.userAttributes.map((attribute, i) => {
                switch (attribute) {
                  case "mobilePhone":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={
                          userData.mobilePhone
                            ? userData.mobilePhone
                            : "Not available"
                        }
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="CellPhone"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                            Mobile Phone
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.mobilePhone ? (
                            <>
                              <Link href={`CALLTO:${userData.mobilePhone}`}>
                                {userData.mobilePhone}
                              </Link>
                            </>
                          ) : (
                            "Not available"
                          )}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );

                    break;
                  case "company":
                      return (
                        <div
                          className={`${styleClasses.styleField}`}
                          title={userData.companyName ? userData.companyName : "Not available"}
                        >
                          <Stack
                            horizontal={true}
                            verticalAlign="center"
                            tokens={{ childrenGap: 5 }}
                            style={{ marginRight: 20, marginLeft: 20 }}
                          >
                            <FontIcon
                              className={styleClasses.styleIconDetails}
                              iconName="TextField"
                            />
                            <Label className={styleClasses.styleFieldLabel}>
                             Company Name
                            </Label>
                          </Stack>
                          <Text
                            styles={styleTextField}
                            variant="medium"
                            block={true}
                            nowrap={true}
                          >
                            {userData.companyName ? userData.companyName : "Not available"}
                          </Text>
                          <div className={styleClasses.separator}></div>
                        </div>
                      );
                      break;
                  case "officeLocation":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={
                          userData.officeLocation
                            ? userData.officeLocation
                            : "Not available"
                        }
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="POISolid"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                            Office Location
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.officeLocation
                            ? userData.officeLocation
                            : "Not available"}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );
                    break;
                  case "city":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={userData.city ? userData.city : "Not available"}
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="CityNext2"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                            City
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.city ? userData.city : "Not available"}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );
                    break;
                  case "postalCode":
                      return (
                        <div
                          className={`${styleClasses.styleField}`}
                          title={userData.postalCode ? userData.postalCode : "Not available"}
                        >
                          <Stack
                            horizontal={true}
                            verticalAlign="center"
                            tokens={{ childrenGap: 5 }}
                            style={{ marginRight: 20, marginLeft: 20 }}
                          >
                            <FontIcon
                              className={styleClasses.styleIconDetails}
                              iconName="NumberField"
                            />
                            <Label className={styleClasses.styleFieldLabel}>
                              Postal Code
                            </Label>
                          </Stack>
                          <Text
                            styles={styleTextField}
                            variant="medium"
                            block={true}
                            nowrap={true}
                          >
                            { userData.postalCode ? userData.postalCode : "Not available"}
                          </Text>
                          <div className={styleClasses.separator}></div>
                        </div>
                      );
                      break;
                  case "country":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={
                          userData.country ? userData.country : "Not available"
                        }
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="World"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                            Country
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.country
                            ? userData.country
                            : "Not available"}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );
                    break;
                  case "userType":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={
                          userData.userType
                            ? userData.userType
                            : "Not available"
                        }
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="UserOptional"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                            Office 365 User Type
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.userType
                            ? userData.userType
                            : "Not available"}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );
                    break;
                  case "employeeId":
                      return (
                        <div
                          className={`${styleClasses.styleField}`}
                          title={userData.employeeId ? userData.employeeId : "Not available"}
                        >
                          <Stack
                            horizontal={true}
                            verticalAlign="center"
                            tokens={{ childrenGap: 5 }}
                            style={{ marginRight: 20, marginLeft: 20 }}
                          >
                            <FontIcon
                              className={styleClasses.styleIconDetails}
                              iconName="Contact"
                            />
                            <Label className={styleClasses.styleFieldLabel}>
                             Employee Id
                            </Label>
                          </Stack>
                          <Text
                            styles={styleTextField}
                            variant="medium"
                            block={true}
                            nowrap={true}
                          >
                            {userData.employeeId ? userData.employeeId : "Not available"}
                          </Text>
                          <div className={styleClasses.separator}></div>
                        </div>
                      );
                      break;
                  case "imAddresses":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={
                          userData.imAddresses.join(",")
                            ? userData.imAddresses.join(",")
                            : "Not available"
                        }
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="CannedChat"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                            IMS Address
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.imAddresses.join(",") ? (
                            <>
                              <Link
                                data-interception="off"
                                target="_blank"
                                href={`https://teams.microsoft.com/l/chat/0/0?users=${userData.imAddresses[0]}`}
                              >
                                {userData.imAddresses[0]}
                              </Link>
                            </>
                          ) : (
                            "Not available"
                          )}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );
                    break;
                  case "userType":
                      return (
                        <div
                          className={`${styleClasses.styleField}`}
                          title={userData.userType ? userData.userType : "Not available"}
                        >
                          <Stack
                            horizontal={true}
                            verticalAlign="center"
                            tokens={{ childrenGap: 5 }}
                            style={{ marginRight: 20, marginLeft: 20 }}
                          >
                            <FontIcon
                              className={styleClasses.styleIconDetails}
                              iconName="CityNext2"
                            />
                            <Label className={styleClasses.styleFieldLabel}>
                             User Type
                            </Label>
                          </Stack>
                          <Text
                            styles={styleTextField}
                            variant="medium"
                            block={true}
                            nowrap={true}
                          >
                            {userData.userType ? userData.userType : "Not available"}
                          </Text>
                          <div className={styleClasses.separator}></div>
                        </div>
                      );
                      break;  
                  case "aboutMe":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={userData.aboutMe ? userData.aboutMe.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi,' ') : "Not available"}
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="Medal"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                           About Me
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.aboutMe ? userData.aboutMe.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi,' ') : "Not available"}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );
                    break;
                  case "skills":
                    return (
                      <div
                        className={`${styleClasses.styleField}`}
                        title={
                          userData.skills.join(",")
                            ? userData.skills.join(",")
                            : "Not available"
                        }
                      >
                        <Stack
                          horizontal={true}
                          verticalAlign="center"
                          tokens={{ childrenGap: 5 }}
                          style={{ marginRight: 20, marginLeft: 20 }}
                        >
                          <FontIcon
                            className={styleClasses.styleIconDetails}
                            iconName="Education"
                          />
                          <Label className={styleClasses.styleFieldLabel}>
                            Skills
                          </Label>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.skills.join(",") ? (
                            <>
                                {userData.skills.join(",")}
                            </>
                          ) : (
                            "Not available"
                          )}
                        </Text>
                        <div className={styleClasses.separator}></div>
                      </div>
                    );
                    break; 
                }
              })}
          </Stack>
        </>
      )}
    </>
  );
};
