import * as React from "react";
import {
  mergeStyleSets,
  Persona,
  PersonaSize,
  Stack,
  FontIcon,
  Text,
  Link,
  ITextFieldStyles,
  IPersonaProps,
} from "office-ui-fabric-react";
import { AppContext } from "../../common/AppContext";
import { ActionButton } from "office-ui-fabric-react";
import { IAppContext } from "../../common/IAppContext";
import { IUserCardProps } from "./IUserCardProps";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Theme} from 'spfx-uifabric-themes';

export const UserCard = (props: IUserCardProps):JSX.Element => {
  const { userData } = props;
  const _context: IAppContext = React.useContext(AppContext);

  const [expandIcon, setExpandIcon] = React.useState("ChevronDownSmall");
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
 
  const styleClasses = mergeStyleSets({
    separator: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 15,
      borderBottomStyle: "solid",
      borderWidth: 1,
      borderBottomColor: window.__themeState__.theme.neutralLighterAlt
    //  borderBottomColor: _context.themeVariant?.palette?.neutralLighterAlt,

    },
    stylContainerDetails: {
      marginTop: 25,
      display: "grid",
      justifyContent: "stretch",
      alignItems: "center",
      backgroundColor: _context.themeVariant?.palette?.themeLighter ??  window.__themeState__.theme.themeLighter,
      gridTemplateColumns: "repeat( auto-fit, minmax(280px, 1fr) )",
      gridTemplateRows: "auto",
    },

    styleIconDetails: {
      fontSize: 16,
       color: _context.themeVariant?.palette?.themePrimary  ?? window.__themeState__.theme.themePrimary,
    },
    styleFieldLabel: {
      fontSize: 12,
      fontWeight: 400,
      paddingLeft: 3,

    },

    styleField: {
      paddingTop: 15,


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
     
        setExpandIcon("ChevronDownSmall");
        setIsDetailsOpen(false);
      
    })();
  }, [  userData]);

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
          <Text
            variant="medium"
            block
            nowrap
            style={{
              width: "100%",
              fontWeight: 600,
              padding: 0,
              marginBottom: 3,
            }}
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
                     color: _context.themeVariant?.palette?.themePrimary ?? window.__themeState__.theme.themePrimary,
                  },
                }}
                iconProps={{
                  iconName: "CannedChat",
                  //  color: _context.themeVariant?.palette?.themePrimary ?? currentSiteTheme.theme.themePrimary,
                }}
                allowDisabledFocus={true}
                disabled={false}
                checked={true}
                title="Start Teams Chat"
/*                 onClick={(event) => {
                  event.preventDefault();
                  window.open(
                    "https://teams.microsoft.com/l/chat/0/0?users=" +
                      userData.mail +
                      "&message=Hi " +
                      userData.displayName,
                    "_blank"
                  );
                }} */
              ></ActionButton>
            </div>
            <div>
              <ActionButton
                styles={{
                  root: {
                    height: 21,
                    width: 26,
                    color: _context.themeVariant?.palette?.themePrimary ?? window.__themeState__.theme.themePrimary,
                  },
                }}
                iconProps={{
                  iconName: expandIcon,
                  //  color: _context.themeVariant?.palette?.themePrimary ?? currentSiteTheme.theme.themePrimary,
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

  const _onRenderSecondaryText = (persona: IPersonaProps) => {
    return (
      <>
        <Stack verticalAlign="start" tokens={{ childrenGap: 0 }}>
          <Text title={persona.secondaryText} variant="medium" block nowrap>
            {" "}
            {persona.secondaryText}
          </Text>
          <Text
         
            variant="smallPlus"
            block
            nowrap
          >
      
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
                <Text
                  variant="small"
                  styles={{ root: { paddingLeft: 3 } }}
                  block={true}
                  nowrap={true}
                >
                  Department
                </Text>
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
                <Text
                  variant="small"
                  styles={{ root: { paddingLeft: 3 } }}
                  block={true}
                  nowrap={true}
                >
                  Business Phones
                </Text>
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

                <Text
                  variant="small"
                  styles={{ root: { paddingLeft: 3 } }}
                  block={true}
                  nowrap={true}
                >
                  E-mail
                </Text>
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
              props.userAttributes.map((attribute) => {
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
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            Mobile Phone
                          </Text>
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
                        title={
                          userData.companyName
                            ? userData.companyName
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
                            iconName="TextField"
                          />
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            Company Name
                          </Text>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.companyName
                            ? userData.companyName
                            : "Not available"}
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
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            Office Location
                          </Text>
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
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            City
                          </Text>
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
                        title={
                          userData.postalCode
                            ? userData.postalCode
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
                            iconName="NumberField"
                          />
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            Postal Code
                          </Text>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.postalCode
                            ? userData.postalCode
                            : "Not available"}
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
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            Country
                          </Text>
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
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            Office 365 User Type
                          </Text>
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
                        title={
                          userData.employeeId
                            ? userData.employeeId
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
                            iconName="Contact"
                          />
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            Employee Id
                          </Text>
                        </Stack>
                        <Text
                          styles={styleTextField}
                          variant="medium"
                          block={true}
                          nowrap={true}
                        >
                          {userData.employeeId
                            ? userData.employeeId
                            : "Not available"}
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
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            IMS Address
                          </Text>
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
                /*   case "userType":
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
                            iconName="CityNext2"
                          />
                          <Text
                            variant="small"
                            styles={{ root: { paddingLeft: 3 } }}
                            block={true}
                            nowrap={true}
                          >
                            User Type
                          </Text>
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
                    break; */
                }
              })}
          </Stack>
        </>
      )}
    </>
  );
};
