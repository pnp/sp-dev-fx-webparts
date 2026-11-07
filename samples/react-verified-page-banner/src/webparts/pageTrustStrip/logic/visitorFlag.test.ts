import {
  isInheritedRoleDefinitionFailure,
  isMissingRoleError,
  isMissingRoleFailure,
  isMissingVisitorsGroupFailure,
  isPermissionDenied,
  pageTrustErrorWithCause,
  readSharePointError,
  roleIdFromAddResponse,
  roleNameFilter,
  sameWebUrl,
  shouldCreateRoleOnRootWeb,
  visitorFlagFailureMessage,
  visitorFlagLogLine,
  visitorFlagStage,
  visitorFlagStopFailureMessage
} from "./visitorFlag";

const missingRoleBody = JSON.stringify({
  error: {
    code: "-2147024809, System.ArgumentException",
    message: {
      lang: "en-US",
      value: "Permission level cannot be found."
    }
  }
});

function httpError(status: number, body: string): Error & { status: number; response: string; isHttpRequestError: boolean } {
  const error = new Error(
    `Error making HttpClient request in queryable [${status}] ${status === 500 ? "Internal Server Error" : "Bad Request"} ::> ${body}`
  ) as Error & { status: number; response: string; isHttpRequestError: boolean };
  error.status = status;
  error.response = body;
  error.isHttpRequestError = true;
  return error;
}

describe("missing Page Trust role detection", () => {
  it("treats a 404 as a missing role", () => {
    expect(isMissingRoleFailure(404, undefined)).toBe(true);
  });

  it("treats SharePoint 400 and 500 cannot-be-found results as a missing role", () => {
    expect(isMissingRoleFailure(400, "The role definition cannot be found.")).toBe(true);
    expect(isMissingRoleFailure(500, "Permission level cannot be found.")).toBe(true);
    expect(isMissingRoleError(httpError(500, missingRoleBody))).toBe(true);
    expect(isMissingRoleFailure(undefined, "Cannot find the role definition.")).toBe(true);
  });

  it("does not treat a permission failure or an inheritance failure as a missing role", () => {
    expect(isMissingRoleFailure(403, "Permission level cannot be found.")).toBe(false);
    expect(isMissingRoleFailure(401, "Access denied.")).toBe(false);
    expect(isPermissionDenied(403)).toBe(true);
    expect(isMissingRoleFailure(400, "You cannot customize permission levels in a web site with inherited permission levels.")).toBe(false);
  });

  it("recognizes a missing Visitors group without hiding an unrelated failure", () => {
    expect(isMissingVisitorsGroupFailure(404, undefined)).toBe(true);
    expect(isMissingVisitorsGroupFailure(500, "There is no associated visitor group for this web.")).toBe(true);
    expect(isMissingVisitorsGroupFailure(403, "Access denied. You do not have permission.")).toBe(false);
    expect(isMissingVisitorsGroupFailure(500, "Exception of type Microsoft.SharePoint.SPException was thrown.")).toBe(false);
  });
});

describe("visitor flag stage messages", () => {
  it("names the failed stage and says permissions were not changed before inheritance breaks", () => {
    const message = visitorFlagFailureMessage(
      visitorFlagStage.roleDefinition,
      "Permission level cannot be found.",
      false,
      true
    );
    expect(message).toBe(
      "Verified Page Banner couldn't let visitors flag pages during read/create role definition. SharePoint said: Permission level cannot be found. Site and page permissions were not changed, and the Page Review Requests list permissions were not changed."
    );
    expect(message.indexOf(visitorFlagStage.breakInheritance)).toBe(-1);
  });

  it("says the list has its own permissions when inheritance was already broken", () => {
    const message = visitorFlagFailureMessage(
      visitorFlagStage.roleAssignment,
      "The specified role definition does not exist.",
      true,
      true
    );
    expect(message.indexOf("during add role assignment")).toBeGreaterThan(0);
    expect(message.indexOf("The Page Review Requests list now has its own permissions.")).toBeGreaterThan(0);
    expect(message.indexOf("Open the web part properties and choose Let visitors flag pages again to resume.")).toBeGreaterThan(0);
    expect(message.indexOf("list permissions were not changed")).toBe(-1);
  });

  it("keeps an explanation we wrote distinct from a SharePoint message", () => {
    const message = visitorFlagFailureMessage(
      visitorFlagStage.managePermissions,
      "You need Manage Permissions on this site to let visitors flag pages.",
      false,
      false
    );
    expect(message.indexOf("during check ManagePermissions")).toBeGreaterThan(0);
    expect(message.indexOf("SharePoint said:")).toBe(-1);
    expect(message.indexOf("You need Manage Permissions")).toBeGreaterThan(0);
  });

  it("names the failed stage when visitor flagging cannot be turned off", () => {
    const message = visitorFlagStopFailureMessage(
      visitorFlagStage.removeRoleAssignment,
      "Access denied.",
      true
    );
    expect(message).toBe(
      "Verified Page Banner couldn't stop visitor flagging during remove role assignment. SharePoint said: Access denied. Site and page permissions were not changed."
    );
  });

  it("logs the stage, HTTP status, and the full odata error message", () => {
    const inherited = JSON.stringify({
      "odata.error": {
        code: "-1, Microsoft.SharePoint.SPException",
        message: {
          lang: "en-US",
          value: "You cannot customize permission levels in a web site with inherited permission levels."
        }
      }
    });
    const error = httpError(400, inherited);
    const line = visitorFlagLogLine(visitorFlagStage.roleDefinition, error);
    expect(line).toBe(
      "[PageTrustStrip] read/create role definition failed. HTTP 400. You cannot customize permission levels in a web site with inherited permission levels. (-1, Microsoft.SharePoint.SPException)"
    );
    expect(isInheritedRoleDefinitionFailure(readSharePointError(error).message)).toBe(true);
    const explained = pageTrustErrorWithCause(
      "This site inherits permission levels, so Page Trust can't create the Page Trust - Add only permission level here.",
      error
    );
    expect(visitorFlagLogLine(visitorFlagStage.roleDefinition, explained)).toBe(line);
    expect(explained.message.indexOf("SharePoint said: You cannot customize permission levels")).toBeGreaterThan(0);
  });

  it("reads an already parsed response body when the Error message has no payload", () => {
    const error = new Error("Error making HttpClient request in queryable [400] Bad Request") as Error & {
      status: number;
      response: { error: { message: { value: string } } };
    };
    error.status = 400;
    error.response = {
      error: {
        message: {
          value: "An entry without a type name was found, but no expected type was specified."
        }
      }
    };
    expect(readSharePointError(error)).toEqual({
      status: 400,
      message: "An entry without a type name was found, but no expected type was specified."
    });
    expect(visitorFlagLogLine(visitorFlagStage.visitorsGroup, error).indexOf("HTTP 400")).toBeGreaterThan(0);
  });
});

describe("role definition response shapes", () => {
  it("reads the id from PnPjs, verbose, and nometadata payloads", () => {
    expect(roleIdFromAddResponse({ data: { Id: 1073741928 }, definition: {} })).toBe(1073741928);
    expect(roleIdFromAddResponse({ data: { Id: "1073741928" } })).toBe(1073741928);
    expect(roleIdFromAddResponse({ Id: 42 })).toBe(42);
    expect(roleIdFromAddResponse({ data: { d: { Id: 9 } } })).toBe(9);
    expect(roleIdFromAddResponse({ d: { Id: "15" } })).toBe(15);
    expect(roleIdFromAddResponse({ data: {} })).toBeUndefined();
    expect(roleIdFromAddResponse(undefined)).toBeUndefined();
  });

  it("filters role definitions by name instead of calling getByName", () => {
    expect(roleNameFilter("Page Trust - Add only")).toBe("Name eq 'Page Trust - Add only'");
    expect(roleNameFilter("Owner's level")).toBe("Name eq 'Owner''s level'");
  });

  it("creates a custom permission level on the root web when this web inherits role assignments", () => {
    expect(shouldCreateRoleOnRootWeb(false, false)).toBe(true);
    expect(shouldCreateRoleOnRootWeb(undefined, false)).toBe(true);
    expect(shouldCreateRoleOnRootWeb(true, false)).toBe(false);
    expect(shouldCreateRoleOnRootWeb(false, true)).toBe(false);
    expect(sameWebUrl("https://contoso.sharepoint.com/sites/hr/", "https://contoso.sharepoint.com/sites/hr")).toBe(true);
    expect(sameWebUrl("https://contoso.sharepoint.com/sites/hr", "https://contoso.sharepoint.com/sites/hr/sub")).toBe(false);
    expect(sameWebUrl(undefined, undefined)).toBe(false);
  });
});
