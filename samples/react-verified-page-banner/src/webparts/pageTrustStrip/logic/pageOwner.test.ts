import {
  assignPageOwner,
  clearAssignedPageOwner,
  effectivePageOwner,
  formFieldError,
  isSharedLockFailure,
  ownerActionMessage,
  ownerClearedConfirmation,
  ownerColumnNeedsSync,
  ownerColumnSyncClear,
  ownerColumnSyncPending,
  ownerSavedConfirmation,
  pageOwnerFieldValue
} from "./pageOwner";
import { pageOwnerField } from "../schema";

describe("page owner field value", () => {
  it("writes the people-picker key from the ensured login, not a search principal id", () => {
    const login = "i:0#.f|membership|alex@contoso.com";
    expect(pageOwnerFieldValue(login)).toBe(JSON.stringify([{ Key: login }]));
    expect(pageOwnerFieldValue(login).indexOf("PrincipalId")).toBe(-1);
  });

  it("reads the field error SharePoint returns from validateUpdateListItem", () => {
    expect(formFieldError([
      { FieldName: "PageOwner", HasException: true, ErrorMessage: "The user does not exist or is not unique." }
    ])).toBe("The user does not exist or is not unique.");
    expect(formFieldError({ FieldName: "PageOwner", HasException: true, ErrorMessage: "" })).toBe("PageOwner could not be saved.");
    expect(formFieldError([{ FieldName: "PageOwner", HasException: false, ErrorMessage: "" }])).toBeUndefined();
    expect(formFieldError(undefined)).toBeUndefined();
  });

  it("includes the SharePoint message instead of a generic owner failure", () => {
    expect(ownerActionMessage("saved", "The file SitePages/Home.aspx is locked for shared use by alex@contoso.com.")).toBe(
      "The page owner couldn't be saved. SharePoint said: The file SitePages/Home.aspx is locked for shared use by alex@contoso.com."
    );
    expect(ownerActionMessage("cleared", undefined)).toBe("The page owner couldn't be cleared.");
  });
});

describe("assign page owner", () => {
  const claimsLogin = "i:0#.f|membership|ada@contoso.com";

  function lockedFileError(): Error {
    const body = JSON.stringify({
      error: {
        code: "-2130575306, Microsoft.SharePoint.SPException",
        message: {
          lang: "en-US",
          value: "The file is locked for shared use by Alex Morgan."
        }
      }
    });
    const error = new Error(`Error making HttpClient request in queryable [423] Locked ::> ${body}`);
    (error as { status?: number }).status = 423;
    return error;
  }

  it("writes the ensured site login and does not write the search principal id", async () => {
    let ensuredLogin = "";
    let fieldName = "";
    let fieldValue = "";
    await assignPageOwner(
      { loginName: "ada@contoso.com" },
      (loginName: string) => {
        ensuredLogin = loginName;
        return Promise.resolve({ Id: 17, LoginName: claimsLogin });
      },
      (name: string, value: string) => {
        fieldName = name;
        fieldValue = value;
        return Promise.resolve([{ FieldName: pageOwnerField, HasException: false, ErrorMessage: "" }]);
      }
    );
    expect(ensuredLogin).toBe("ada@contoso.com");
    expect(fieldName).toBe(pageOwnerField);
    expect(fieldValue).toBe(pageOwnerFieldValue(claimsLogin));
    expect(fieldValue.indexOf("99")).toBe(-1);
    expect(fieldValue.indexOf("17")).toBe(-1);
  });

  it("logs a validateUpdateListItem field error and includes the SharePoint text", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      await expect(assignPageOwner(
        { loginName: claimsLogin },
        () => Promise.resolve({ LoginName: claimsLogin }),
        () => Promise.resolve([
          { FieldName: pageOwnerField, HasException: true, ErrorMessage: "The user does not exist or is not unique." }
        ])
      )).rejects.toThrow("The page owner couldn't be saved. SharePoint said: The user does not exist or is not unique.");
      const logged = String(errorSpy.mock.calls[0][0]);
      expect(logged.indexOf("[PageTrustStrip] set page owner failed. HTTP none.")).toBe(0);
      expect(logged.indexOf("The user does not exist or is not unique.")).toBeGreaterThan(0);
    } finally {
      errorSpy.mockRestore();
    }
  });

  it("treats HTTP 423 as a deferred column write and does not log it as a failure", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      await expect(assignPageOwner(
        { loginName: claimsLogin },
        () => Promise.resolve({ LoginName: claimsLogin }),
        () => Promise.reject(lockedFileError())
      )).resolves.toBe("locked");
      expect(errorSpy).not.toHaveBeenCalled();
      expect(isSharedLockFailure(lockedFileError())).toBe(true);
    } finally {
      errorSpy.mockRestore();
    }
  });

  it("treats a field error that says the file is locked for shared use as deferred", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);
    try {
      await expect(assignPageOwner(
        { loginName: claimsLogin },
        () => Promise.resolve({ LoginName: claimsLogin }),
        () => Promise.resolve([{
          FieldName: pageOwnerField,
          HasException: true,
          ErrorMessage: "The file SitePages/Page-trust.aspx is locked for shared use by anand@0vlc1.onmicrosoft.com. (-2147018894, Microsoft.SharePoint.SPException)"
        }])
      )).resolves.toBe("locked");
      expect(errorSpy).not.toHaveBeenCalled();
      expect(isSharedLockFailure(new Error("(-2147018894, Microsoft.SharePoint.SPException)"))).toBe(true);
    } finally {
      errorSpy.mockRestore();
    }
  });

  it("clears the owner with an empty field value", async () => {
    let fieldName = "";
    let fieldValue = "unchanged";
    await clearAssignedPageOwner((name: string, value: string) => {
      fieldName = name;
      fieldValue = value;
      return Promise.resolve([{ FieldName: pageOwnerField, HasException: false, ErrorMessage: "" }]);
    });
    expect(fieldName).toBe(pageOwnerField);
    expect(fieldValue).toBe("");
  });
});

describe("stored page owner", () => {
  const ada = {
    id: 17,
    loginName: "i:0#.f|membership|ada@contoso.com",
    email: "ada@contoso.com",
    displayName: "Ada Lovelace"
  };

  it("lets a just-picked owner win over the Site Pages column", () => {
    const effective = effectivePageOwner({
      ownerId: ada.id,
      ownerLoginName: ada.loginName,
      ownerEmail: ada.email,
      ownerDisplayName: ada.displayName,
      ownerColumnSync: ownerColumnSyncPending
    }, { id: 4, displayName: "Alex Morgan", email: "alex@contoso.com" });
    expect(effective.isAuthorFallback).toBe(false);
    expect(effective.person && effective.person.displayName).toBe("Ada Lovelace");
  });

  it("uses the column when web part properties have no owner", () => {
    const effective = effectivePageOwner(undefined, ada);
    expect(effective.person && effective.person.displayName).toBe("Ada Lovelace");
    expect(effective.isAuthorFallback).toBe(false);
  });

  it("hides a column owner after the property pane clears the owner", () => {
    const effective = effectivePageOwner({
      ownerColumnSync: ownerColumnSyncClear
    }, ada);
    expect(effective.person).toBeUndefined();
    expect(effective.isAuthorFallback).toBe(true);
  });

  it("plans the column write from the stored sync flag", () => {
    const pending = {
      ownerId: ada.id,
      ownerLoginName: ada.loginName,
      ownerEmail: ada.email,
      ownerDisplayName: ada.displayName,
      ownerColumnSync: ownerColumnSyncPending
    };
    expect(ownerColumnNeedsSync(pending, { displayName: "Alex Morgan", email: "alex@contoso.com" })).toBe("set");
    expect(ownerColumnNeedsSync(pending, ada)).toBe("mark-synced");
    expect(ownerColumnNeedsSync({ ownerColumnSync: ownerColumnSyncClear }, ada)).toBe("clear");
    expect(ownerColumnNeedsSync({ ownerColumnSync: ownerColumnSyncClear }, undefined)).toBe("mark-synced");
    expect(ownerColumnNeedsSync({ ownerDisplayName: ada.displayName }, ada)).toBeUndefined();
  });

  it("confirms a saved owner, and says the column waits while the page is locked", () => {
    expect(ownerSavedConfirmation("Ada Lovelace", false)).toBe("Ada Lovelace is the page owner.");
    expect(ownerSavedConfirmation("Ada Lovelace", true)).toBe(
      "Ada Lovelace is the page owner. The page is open for editing, so the Page Owner column will update when the page is no longer locked."
    );
    expect(ownerClearedConfirmation(false)).toBe("The page owner was cleared. The page author is shown until you pick someone.");
    expect(ownerClearedConfirmation(true)).toBe("The page owner was cleared. The Page Owner column will update when the page is no longer locked.");
  });
});
