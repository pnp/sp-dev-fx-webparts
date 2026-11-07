import { httpStatus, PageTrustError } from "../errors";
import { productName } from "./productName";

export const visitorFlagStage = {
  managePermissions: "check ManagePermissions",
  visitorsGroup: "read visitors group",
  roleDefinition: "read/create role definition",
  breakInheritance: "break inheritance",
  roleAssignment: "add role assignment",
  removeRoleAssignment: "remove role assignment"
};

export interface ISharePointErrorDetail {
  status?: number;
  message?: string;
}

const missingRolePhrases: readonly string[] = [
  "cannot be found",
  "could not be found",
  "can not be found",
  "does not exist",
  "doesn't exist",
  "not found",
  "cannot find role",
  "cannot find the role"
];

const missingVisitorsPhrases: readonly string[] = [
  "associated visitor",
  "no visitor group",
  "no associated",
  "does not exist",
  "doesn't exist",
  "cannot be found",
  "not found"
];

const inheritedRolePhrases: readonly string[] = [
  "inherited permission level",
  "inherits role definition",
  "inherit role definition",
  "inherited role definition"
];

export function roleNameFilter(name: string): string {
  return `Name eq '${name.replace(/'/g, "''")}'`;
}

export function sameWebUrl(left: string | undefined, right: string | undefined): boolean {
  const normalizedLeft = normalizeWebUrl(left);
  const normalizedRight = normalizeWebUrl(right);
  return normalizedLeft.length > 0 && normalizedLeft === normalizedRight;
}

export function shouldCreateRoleOnRootWeb(hasUniqueRoleAssignments: boolean | undefined, currentIsRoot: boolean): boolean {
  return hasUniqueRoleAssignments !== true && !currentIsRoot;
}

export function isPermissionDenied(status: number | undefined): boolean {
  return status === 401 || status === 403;
}

/**
 * getByName for a missing permission level is not a reliable 404.
 * SharePoint Online often returns 400 or 500 and a message such as
 * "Permission level cannot be found."
 */
export function isMissingRoleFailure(status: number | undefined, message: string | undefined): boolean {
  if (isPermissionDenied(status)) {
    return false;
  }
  if (status === 404) {
    return true;
  }
  return textHasPhrase(message, missingRolePhrases);
}

export function isMissingRoleError(error: unknown): boolean {
  const detail = readSharePointError(error);
  return isMissingRoleFailure(detail.status, detail.message);
}

export function isMissingVisitorsGroupFailure(status: number | undefined, message: string | undefined): boolean {
  if (isPermissionDenied(status)) {
    return false;
  }
  if (status === 404) {
    return true;
  }
  return textHasPhrase(message, missingVisitorsPhrases);
}

export function isInheritedRoleDefinitionFailure(message: string | undefined): boolean {
  return textHasPhrase(message, inheritedRolePhrases);
}

export function readSharePointError(error: unknown): ISharePointErrorDetail {
  const cause = nested(error, "sharePointCause");
  if (cause) {
    const fromCause = readSharePointError(cause);
    if (fromCause.status !== undefined || fromCause.message) {
      return fromCause;
    }
  }
  const status = httpStatus(error);
  const texts = sharePointTexts(error);
  for (let index = 0; index < texts.length; index++) {
    const message = sharePointMessageFromText(texts[index]);
    if (message) {
      return { status, message };
    }
  }
  return { status };
}

export function pageTrustErrorWithCause(message: string, cause: unknown): PageTrustError {
  const detail = readSharePointError(cause);
  const includeSharePoint = Boolean(detail.message) && !(cause instanceof PageTrustError);
  const text = includeSharePoint ? `${message} SharePoint said: ${detail.message}` : message;
  const error = new PageTrustError(text);
  if (!(cause instanceof PageTrustError)) {
    (error as { sharePointCause?: unknown }).sharePointCause = cause;
  }
  return error;
}

export function roleIdFromAddResponse(created: unknown): number | undefined {
  const candidates: unknown[] = [
    created,
    nested(created, "data"),
    nested(created, "d"),
    nested(nested(created, "data"), "d"),
    nested(created, "value"),
    nested(nested(created, "data"), "value")
  ];
  for (let index = 0; index < candidates.length; index++) {
    const id = readPositiveId(candidates[index]);
    if (id) {
      return id;
    }
  }
  return undefined;
}

export function visitorFlagFailureMessage(
  stage: string,
  detail: string | undefined,
  inheritanceBroken: boolean,
  detailIsSharePoint: boolean
): string {
  const trimmed = detail && detail.trim() ? detail.trim() : "";
  const detailText = trimmed
    ? (detailIsSharePoint ? ` SharePoint said: ${trimmed}` : ` ${trimmed}`)
    : "";
  const effect = inheritanceBroken
    ? " The Page Review Requests list now has its own permissions. Site and page permissions were not changed. Open the web part properties and choose Let visitors flag pages again to resume."
    : " Site and page permissions were not changed, and the Page Review Requests list permissions were not changed.";
  return `${productName} couldn't let visitors flag pages during ${stage}.${detailText}${effect}`;
}

export function visitorFlagStopFailureMessage(stage: string, detail: string | undefined, detailIsSharePoint: boolean): string {
  const trimmed = detail && detail.trim() ? detail.trim() : "";
  const detailText = trimmed
    ? (detailIsSharePoint ? ` SharePoint said: ${trimmed}` : ` ${trimmed}`)
    : "";
  return `${productName} couldn't stop visitor flagging during ${stage}.${detailText} Site and page permissions were not changed.`;
}

export function pageTrustFailureLine(action: string, error: unknown): string {
  const detail = readSharePointError(error);
  const status = detail.status === undefined ? "none" : String(detail.status);
  const message = detail.message && detail.message.trim() ? detail.message.trim() : "No SharePoint error message.";
  return `[PageTrustStrip] ${action} failed. HTTP ${status}. ${message}`;
}

export function visitorFlagLogLine(stage: string, error: unknown): string {
  return pageTrustFailureLine(stage, error);
}

function normalizeWebUrl(value: string | undefined): string {
  return (value || "").trim().replace(/\/+$/, "").toLowerCase();
}

function textHasPhrase(message: string | undefined, phrases: readonly string[]): boolean {
  const text = (message || "").toLowerCase();
  if (!text) {
    return false;
  }
  for (let index = 0; index < phrases.length; index++) {
    if (text.indexOf(phrases[index]) >= 0) {
      return true;
    }
  }
  return false;
}

function sharePointTexts(error: unknown): string[] {
  const texts: string[] = [];
  if (error instanceof Error && error.message) {
    texts.push(error.message);
  } else if (typeof error === "string") {
    texts.push(error);
  }
  if (!error || typeof error !== "object") {
    return texts;
  }
  const response = (error as { response?: unknown }).response;
  if (typeof response === "string") {
    texts.push(response);
  } else if (isPlainObject(response)) {
    const parsed = sharePointMessageFromJson(response);
    if (parsed) {
      texts.push(parsed);
    }
    const body = response.body;
    if (typeof body === "string") {
      texts.push(body);
    }
  }
  return texts;
}

function sharePointMessageFromText(text: string): string | undefined {
  const marker = "::>";
  const markerAt = text.indexOf(marker);
  const payload = (markerAt >= 0 ? text.substring(markerAt + marker.length) : text).trim();
  if (!payload) {
    return undefined;
  }
  if (isJsonText(payload)) {
    try {
      return sharePointMessageFromJson(JSON.parse(payload) as unknown) || payload;
    } catch {
      return payload;
    }
  }
  if (payload.indexOf("Error making HttpClient request") === 0) {
    return undefined;
  }
  return payload;
}

function sharePointMessageFromJson(value: unknown): string | undefined {
  if (!isPlainObject(value)) {
    return undefined;
  }
  const odata = isPlainObject(value["odata.error"]) ? value["odata.error"] : undefined;
  const modern = isPlainObject(value.error) ? value.error : undefined;
  return messageFromErrorNode(odata) || messageFromErrorNode(modern) || messageFromErrorNode(value);
}

function messageFromErrorNode(node: Record<string, unknown> | undefined): string | undefined {
  if (!node) {
    return undefined;
  }
  const code = typeof node.code === "string" ? node.code : undefined;
  const messageNode = node.message;
  let text: string | undefined;
  if (typeof messageNode === "string") {
    text = messageNode;
  } else if (isPlainObject(messageNode) && typeof messageNode.value === "string") {
    text = messageNode.value;
  }
  if (text && code) {
    return `${text} (${code})`;
  }
  return text;
}

function readPositiveId(value: unknown): number | undefined {
  if (!isPlainObject(value)) {
    return undefined;
  }
  const raw = value.Id !== undefined ? value.Id : value.id;
  if (typeof raw === "number" && Number.isFinite(raw) && raw > 0) {
    return raw;
  }
  if (typeof raw === "string" && raw.trim()) {
    const parsed = Number(raw);
    if (Number.isFinite(parsed) && parsed > 0 && String(parsed) === raw.trim()) {
      return parsed;
    }
  }
  return undefined;
}

function nested(value: unknown, key: string): unknown {
  if (!isPlainObject(value)) {
    return undefined;
  }
  return value[key];
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isJsonText(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.charAt(0) === "{" || trimmed.charAt(0) === "[";
}
