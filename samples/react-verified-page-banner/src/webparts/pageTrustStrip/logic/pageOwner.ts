import { PageTrustError } from "../errors";
import { hasPersonIdentity, isSamePerson, type IPersonIdentity } from "./trustStatus";
import { pageTrustFailureLine, readSharePointError } from "./visitorFlag";
import { pageOwnerField } from "../schema";

export const ownerColumnSyncPending: string = "pending";
export const ownerColumnSyncClear: string = "clear";

export type OwnerColumnResult = "saved" | "locked";
export type OwnerColumnSyncAction = "set" | "clear" | "mark-synced";

/** Web part properties. SharePoint persists these with the page, without a list-item write. */
export interface IStoredPageOwner {
  ownerId?: number;
  ownerLoginName?: string;
  ownerEmail?: string;
  ownerDisplayName?: string;
  ownerColumnSync?: string;
}

export interface IEffectiveOwner {
  person?: IPersonIdentity;
  isAuthorFallback: boolean;
}

/**
 * A modern page in Edit mode is locked for shared use. validateUpdateListItem
 * then returns HTTP 423 / -2147018894. That is a deferred column write, not a
 * failed owner choice.
 */
export function isSharedLockFailure(error: unknown): boolean {
  const detail = readSharePointError(error);
  if (detail.status === 423) {
    return true;
  }
  const message = (detail.message || "").toLowerCase();
  if (message.indexOf("-2147018894") >= 0) {
    return true;
  }
  return message.indexOf("locked for shared use") >= 0;
}

/**
 * People-picker value for validateUpdateListItem. SharePoint Online resolves
 * this against the site's user list. A bare user id from searchPrincipals is
 * not used: that id is often -1, or it is not the site user id, and writing it
 * to a Site Pages person column fails.
 */
export function pageOwnerFieldValue(loginName: string): string {
  return JSON.stringify([{ Key: loginName }]);
}

export interface IEnsuredOwner {
  LoginName?: string;
}

/**
 * Site Pages is checked out while the property pane is open. items.update hits
 * that file lock. This writes through validateUpdateListItem after ensureUser.
 * The search principal id is not an argument and is not written.
 */
export function assignPageOwner(
  person: { loginName: string },
  ensureUser: (loginName: string) => Promise<IEnsuredOwner | undefined>,
  writeField: (fieldName: string, fieldValue: string) => Promise<readonly IFormFieldResult[] | IFormFieldResult | undefined>
): Promise<OwnerColumnResult> {
  return finishOwnerWrite("set page owner", "saved", async () => {
    if (!person.loginName) {
      throw new PageTrustError("Choose a person before saving the page owner.");
    }
    const ensured = await ensureUser(person.loginName);
    const loginName = ensured && ensured.LoginName ? ensured.LoginName : person.loginName;
    if (!loginName) {
      throw new PageTrustError("That person couldn't be added to this site.");
    }
    const fieldError = formFieldError(await writeField(pageOwnerField, pageOwnerFieldValue(loginName)));
    if (fieldError) {
      if (isSharedLockFailure(new Error(fieldError))) {
        return "locked";
      }
      throw new PageTrustError(ownerActionMessage("saved", fieldError));
    }
    return "saved";
  });
}

export function clearAssignedPageOwner(
  writeField: (fieldName: string, fieldValue: string) => Promise<readonly IFormFieldResult[] | IFormFieldResult | undefined>
): Promise<OwnerColumnResult> {
  return finishOwnerWrite("clear page owner", "cleared", async () => {
    const fieldError = formFieldError(await writeField(pageOwnerField, ""));
    if (fieldError) {
      if (isSharedLockFailure(new Error(fieldError))) {
        return "locked";
      }
      throw new PageTrustError(ownerActionMessage("cleared", fieldError));
    }
    return "saved";
  });
}

export function personFromStoredOwner(stored: IStoredPageOwner | undefined): IPersonIdentity | undefined {
  if (!stored || stored.ownerColumnSync === ownerColumnSyncClear) {
    return undefined;
  }
  const displayName = (stored.ownerDisplayName || "").trim();
  const loginName = (stored.ownerLoginName || "").trim();
  const email = (stored.ownerEmail || "").trim();
  const id = typeof stored.ownerId === "number" && stored.ownerId > 0 ? stored.ownerId : undefined;
  if (!displayName && !loginName && !email) {
    return undefined;
  }
  return {
    id,
    loginName: loginName || undefined,
    email: email || undefined,
    displayName: displayName || email || loginName
  };
}

/** A stored web part owner wins so the property pane updates the banner immediately. */
export function effectivePageOwner(stored: IStoredPageOwner | undefined, columnOwner: IPersonIdentity | undefined): IEffectiveOwner {
  if (stored && stored.ownerColumnSync === ownerColumnSyncClear) {
    return { isAuthorFallback: true };
  }
  const fromProperties = personFromStoredOwner(stored);
  if (hasPersonIdentity(fromProperties)) {
    return { person: fromProperties, isAuthorFallback: false };
  }
  if (hasPersonIdentity(columnOwner)) {
    return { person: columnOwner, isAuthorFallback: false };
  }
  return { isAuthorFallback: true };
}

export function ownerColumnNeedsSync(stored: IStoredPageOwner | undefined, columnOwner: IPersonIdentity | undefined): OwnerColumnSyncAction | undefined {
  if (!stored || !stored.ownerColumnSync) {
    return undefined;
  }
  if (stored.ownerColumnSync === ownerColumnSyncClear) {
    return hasPersonIdentity(columnOwner) ? "clear" : "mark-synced";
  }
  if (stored.ownerColumnSync !== ownerColumnSyncPending) {
    return undefined;
  }
  const person = personFromStoredOwner(stored);
  if (!hasPersonIdentity(person) || !person) {
    return undefined;
  }
  if (isSamePerson(person, columnOwner)) {
    return "mark-synced";
  }
  if (!person.loginName && !person.email) {
    return undefined;
  }
  return "set";
}

export function ownerSavedConfirmation(displayName: string, locked: boolean): string {
  if (locked) {
    return `${displayName} is the page owner. The page is open for editing, so the Page Owner column will update when the page is no longer locked.`;
  }
  return `${displayName} is the page owner.`;
}

export function ownerClearedConfirmation(locked: boolean): string {
  if (locked) {
    return "The page owner was cleared. The Page Owner column will update when the page is no longer locked.";
  }
  return "The page owner was cleared. The page author is shown until you pick someone.";
}

export interface IFormFieldResult {
  HasException?: boolean;
  ErrorMessage?: string;
  FieldName?: string;
}

export function formFieldError(results: readonly IFormFieldResult[] | IFormFieldResult | undefined): string | undefined {
  const rows = formRows(results);
  const messages: string[] = [];
  for (let index = 0; index < rows.length; index++) {
    const result = rows[index];
    const text = result.ErrorMessage && result.ErrorMessage.trim() ? result.ErrorMessage.trim() : "";
    if (result.HasException || text.length > 0) {
      messages.push(text || `${result.FieldName || "A field"} could not be saved.`);
    }
  }
  if (messages.length === 0) {
    return undefined;
  }
  return messages.join(" ");
}

export function ownerActionMessage(action: "saved" | "cleared", sharePointMessage: string | undefined): string {
  const lead = action === "saved"
    ? "The page owner couldn't be saved."
    : "The page owner couldn't be cleared.";
  const detail = sharePointMessage && sharePointMessage.trim() ? sharePointMessage.trim() : "";
  if (!detail) {
    return lead;
  }
  return `${lead} SharePoint said: ${detail}`;
}

function finishOwnerWrite(
  logAction: string,
  failureAction: "saved" | "cleared",
  work: () => Promise<OwnerColumnResult>
): Promise<OwnerColumnResult> {
  return work().catch((error: unknown) => {
    if (isSharedLockFailure(error)) {
      return "locked";
    }
    console.error(pageTrustFailureLine(logAction, error));
    if (error instanceof PageTrustError) {
      throw error;
    }
    throw new PageTrustError(ownerActionMessage(failureAction, readSharePointError(error).message));
  });
}

function isFormRowList(results: readonly IFormFieldResult[] | IFormFieldResult): results is readonly IFormFieldResult[] {
  return Object.prototype.toString.call(results) === "[object Array]";
}

function formRows(results: readonly IFormFieldResult[] | IFormFieldResult | undefined): readonly IFormFieldResult[] {
  if (!results) {
    return [];
  }
  if (isFormRowList(results)) {
    return results;
  }
  return [results];
}
