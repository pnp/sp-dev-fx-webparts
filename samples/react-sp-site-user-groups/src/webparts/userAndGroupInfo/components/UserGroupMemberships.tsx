import * as React from "react";
import { useState } from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Link } from "office-ui-fabric-react";
import { PrincipalType } from "@pnp/sp";

import { ISpGroupMembership } from "../../../services/SpUserGroupLookup";

export interface IUserGroupMembershipsProps {
  context: WebPartContext;
  membershipsPromise: Promise<ISpGroupMembership[]>;
}

const UserGroupMemberships: React.FunctionComponent<IUserGroupMembershipsProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const [memberships, setMemberships] = useState(undefined as ISpGroupMembership[]);

  React.useEffect(() => {
    if (props.membershipsPromise) {
      props.membershipsPromise.then((spGroupMemberships) => {
        setMemberships(spGroupMemberships);
        setLoading(false);
      });
    }
  }, [props.membershipsPromise]);

  const columns: IColumn[] = [
    {
      key: "spGroup",
      name: "SP Group (SP Id)",
      minWidth: 200,
      onRender: (item) => {
        const membership = item as ISpGroupMembership;
        return membership.spGroupId ? (
          <span>
            <Link
              target="_blank"
              data-interception="off"
              href={props.context.pageContext.web.absoluteUrl + "/_layouts/userdisp.aspx?ID=" + membership.spGroupId}
            >
              {membership.spGroup} ({membership.spGroupId})
            </Link>
          </span>
        ) : (
          <span>none</span>
        );
      },
      isResizable: true,
    },
    {
      key: "membershipViaPrincipal",
      name: "Membership Via Principal",
      minWidth: 200,
      onRender: (item) => {
        const membership = item as ISpGroupMembership;
        return (
          <span>
            <Link
              target="_blank"
              data-interception="off"
              href={
                props.context.pageContext.web.absoluteUrl +
                "/_layouts/userdisp.aspx?ID=" +
                membership.membershipViaPrincipalSpId
              }
            >
              {membership.membershipViaPrincipalName}
            </Link>
          </span>
        );
      },
      isResizable: true,
    },
    {
      key: "membershipViaPrincipalType",
      name: "Principal Type",
      minWidth: 100,
      onRender: (item) => {
        const membership = item as ISpGroupMembership;

        const principalTypeNames: string[] = [];
        const principalType = membership.membershipViaPrincipalType;
        if (principalType & PrincipalType.User) {
          principalTypeNames.push("User");
        }
        if (principalType & PrincipalType.DistributionList) {
          principalTypeNames.push("DistributionList");
        }
        if (principalType & PrincipalType.SecurityGroup) {
          principalTypeNames.push("SecurityGroup");
        }
        if (principalType & PrincipalType.SharePointGroup) {
          principalTypeNames.push("SharePointGroup");
        }

        return (
          <span>
            {principalTypeNames.join(" ")} ({principalType})
          </span>
        );
      },
      isResizable: true,
    },
    {
      key: "membershipViaPrincipalSpId",
      name: "Principal's SP Id",
      minWidth: 100,
      onRender: (item) => {
        const membership = item as ISpGroupMembership;
        return (
          <span>
            <Link
              target="_blank"
              data-interception="off"
              href={
                props.context.pageContext.web.absoluteUrl +
                "/_layouts/userdisp.aspx?ID=" +
                membership.membershipViaPrincipalSpId
              }
            >
              {membership.membershipViaPrincipalSpId}
            </Link>
          </span>
        );
      },
      isResizable: true,
    },
  ];

  return loading ? (
    <h4>User's Group Information - Loading...</h4>
  ) : (
    <div>
      <h4>User's Group Information</h4>
      {memberships.length ? (
        <DetailsList items={memberships} columns={columns} />
      ) : (
        <p style={{ textAlign: "center" }}>User is not a member of any AAD groups known to this SharePoint site</p>
      )}
    </div>
  );
};

export default UserGroupMemberships;
