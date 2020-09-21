import * as React from "react";
import { useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { IUser } from "@pnp/graph/users";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react";

export interface IUserInfoProps {
  context: WebPartContext;
  siteUserInfoPromise: Promise<ISiteUserInfo | undefined>;
  aadUserPromise: Promise<IUser>;
}

const UserInfo: React.FunctionComponent<IUserInfoProps> = (props) => {
  const [spLoading, setSpLoading] = useState(true);
  const [isSpUser, setIsSpUser] = useState(false);
  const [spUserInfo, setSpUserInfo] = useState([]);
  const [aadLoading, setAadLoading] = useState(true);
  const [aadUserInfo, setAadUserInfo] = useState([]);

  const renderValueCell = (item?: any) => {
    switch (item.propertyName) {
      case "SP Site UserId":
        return (
          <span>
            <Link
              target="_blank"
              data-interception="off"
              href={props.context.pageContext.web.absoluteUrl + "/_layouts/userdisp.aspx?ID=" + item.value}
            >
              {item.value}
            </Link>
          </span>
        );

      default:
        return <span>{item.value}</span>;
    }
  };

  const userInfoColumns: IColumn[] = [
    {
      key: "propertyName",
      name: "Property",
      fieldName: "propertyName",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
    },
    {
      key: "propertyValue",
      name: "Value",
      fieldName: "value",
      minWidth: 200,
      maxWidth: 1600,
      isResizable: true,
      onRender: renderValueCell,
    },
  ];

  React.useEffect(() => {
    setSpLoading(true);
    if (props.siteUserInfoPromise) {
      props.siteUserInfoPromise.then((siteUserInfo) => {
        if (siteUserInfo) {
          const newSpUserInfo = [
            { propertyName: "Title", value: siteUserInfo.Title },
            { propertyName: "SP Site UserId", value: siteUserInfo.Id },
            { propertyName: "Login Name", value: siteUserInfo.LoginName },
            { propertyName: "Is Site Admin", value: siteUserInfo.IsSiteAdmin ? "Yes" : "No" },
          ];

          setSpUserInfo(newSpUserInfo);
          setIsSpUser(true);
        } else {
          setIsSpUser(false);
        }
        setSpLoading(false);
      });
    }
  }, [props.siteUserInfoPromise]);

  React.useEffect(() => {
    setAadLoading(true);
    if (props.aadUserPromise) {
      props.aadUserPromise.then((user: IUser) => {
        const userObj: { id: string; displayName: string; mail: string } = user as any;
        const newAadUserInfo = [
          { propertyName: "Display Name", value: userObj.displayName },
          { propertyName: "Mail", value: userObj.mail },
          { propertyName: "Id", value: userObj.id },
        ];
        setAadUserInfo(newAadUserInfo);
        setAadLoading(false);
      });
    }
  }, [props.aadUserPromise]);

  const renderAadDetails = () => {
    return (
      <>
        <h4>User's AAD (graph) Information</h4>
        <DetailsList items={aadUserInfo} columns={userInfoColumns} isHeaderVisible={false} />
      </>
    );
  };

  const renderSpSiteDetails = () => {
    return (
      <>
        <h4>SharePoint Site User Information</h4>
        {isSpUser ? (
          <DetailsList items={spUserInfo} columns={userInfoColumns} isHeaderVisible={false} />
        ) : (
          <p style={{ textAlign: "center" }}>User is not a member of this SharePoint site</p>
        )}
      </>
    );
  };

  const aadInformation = aadLoading ? <h4>User's AAD (graph) Information - Loading...</h4> : renderAadDetails();
  const spInformation = spLoading ? <h4>SharePoint Site User Information - Loading...</h4> : renderSpSiteDetails();

  return (
    <>
      {aadInformation}
      {spInformation}
    </>
  );
};

export default UserInfo;
