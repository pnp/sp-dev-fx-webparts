import { IAppData } from "./models/IAppData";
import { IBookmark, BookmarkType } from "./models/IBookmark";
import { IBookmarkGroup } from "./models/IBookmarkGroup";
import { IBookmarkLabel } from "./models/IBookmarkLabel";
import { CopilotChatService } from "./CopilotChatService";
import { CopilotConversation } from "./ICopilotChatService";
import { buildOrganizePromptText } from "./CopilotPromptConstants";

function buildOrganizePrompt(rawBookmarks: IBookmark[], appData: IAppData): string {
  const existingGroups = appData.groups ?? [];
  const existingBookmarks = appData.bookmarks ?? [];

  const annotatedBookmarks = rawBookmarks.map(b => {
    const savedEntry = existingBookmarks.find(eb => eb.id === b.id);
    const currentGroupName = savedEntry?.groups?.[0]?.name ?? "unassigned";
    return { ...b, currentGroup: currentGroupName };
  });

  const bookmarksJson = JSON.stringify(annotatedBookmarks, null, 2);
  const groupsJson    = JSON.stringify(appData.groups ?? [], null, 2);
  const labelsJson    = JSON.stringify(appData.labels ?? []);
  const maxGroupIndex = existingGroups.length > 0
    ? existingGroups.reduce((max, g) => (g.index > max ? g.index : max), 0)
    : 0;

  return buildOrganizePromptText(
    bookmarksJson,
    groupsJson,
    labelsJson,
    maxGroupIndex,
    rawBookmarks.length
  );
}

function extractTextFromResponse(response: CopilotConversation): string {
  if (!response) return "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = response as any;

  const candidates: string[] = [
    r?.message?.text,
    r?.messages?.[r.messages.length - 1]?.text,
    r?.messages?.[r.messages.length - 1]?.body?.content,
    r?.reply?.message?.text,
    r?.text,
    r?.content,
    r?.body?.content,
  ];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length > 0) return c.trim();
  }

  return JSON.stringify(response);
}

function extractJsonFromText(text: string): string {
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) return fenceMatch[1].trim();

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.substring(firstBrace, lastBrace + 1);
  }

  return text.trim();
}

function isValidLabel(obj: unknown): obj is IBookmarkLabel {
  if (!obj || typeof obj !== "object") return false;
  const l = obj as Record<string, unknown>;
  return typeof l.name === "string" && typeof l.color === "string";
}

function isValidGroup(obj: unknown): obj is IBookmarkGroup {
  if (!obj || typeof obj !== "object") return false;
  const g = obj as Record<string, unknown>;
  return (
    typeof g.id === "string" &&
    typeof g.index === "number" &&
    typeof g.name === "string" &&
    typeof g.archived === "boolean" &&
    typeof g.collapsed === "boolean"
  );
}

function isValidBookmark(obj: unknown): obj is IBookmark {
  if (!obj || typeof obj !== "object") return false;
  const b = obj as Record<string, unknown>;
  const validTypes: string[] = [BookmarkType.Site, BookmarkType.Email, BookmarkType.File];
  return (
    typeof b.id === "string" &&
    typeof b.title === "string" &&
    typeof b.url === "string" &&
    typeof b.date === "string" &&
    typeof b.type === "string" &&
    validTypes.indexOf(b.type as string) !== -1 &&
    Array.isArray(b.groups) &&
    (b.groups as unknown[]).length === 1 &&
    isValidGroup((b.groups as unknown[])[0])
  );
}

function validateAppData(parsed: unknown, expectedBookmarkCount: number): { valid: boolean; errors: string[]; data?: IAppData } {
  const errors: string[] = [];

  if (!parsed || typeof parsed !== "object") {
    return { valid: false, errors: ["Response is not a JSON object"] };
  }

  const obj = parsed as Record<string, unknown>;

  if (!Array.isArray(obj.bookmarks)) {
    errors.push("Missing or invalid 'bookmarks' array");
  } else {
    (obj.bookmarks as unknown[]).forEach((b, i) => {
      if (!isValidBookmark(b)) errors.push(`bookmarks[${i}] failed validation`);
    });
    if ((obj.bookmarks as unknown[]).length !== expectedBookmarkCount) {
      errors.push(
        `Expected ${expectedBookmarkCount} bookmarks, got ${(obj.bookmarks as unknown[]).length}`
      );
    }
  }

  if (!Array.isArray(obj.groups)) {
    errors.push("Missing or invalid 'groups' array");
  } else {
    (obj.groups as unknown[]).forEach((g, i) => {
      if (!isValidGroup(g)) errors.push(`groups[${i}] failed validation`);
    });
  }

  if (!Array.isArray(obj.labels)) {
    errors.push("Missing or invalid 'labels' array");
  } else {
    (obj.labels as unknown[]).forEach((l, i) => {
      if (!isValidLabel(l)) errors.push(`labels[${i}] failed validation`);
    });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, errors: [], data: obj as unknown as IAppData };
}

export interface ICopilotOrganizeResult {
  success: boolean;
  organizedAppData?: IAppData;
  rawResponse?: CopilotConversation;
  extractedText?: string;
  validationErrors?: string[];
  error?: string;
}

/**
 * Merges a validated Copilot-returned IAppData into the existing appData.
 * - New groups (ids not already in existingAppData) are added with suggestion=true.
 * - All bookmarks from Copilot are written with suggestion=true.
 * - Existing labels are preserved unchanged.
 */
export function mergeCopilotSuggestions(existingAppData: IAppData, copilotAppData: IAppData): IAppData {
  const existingGroupIds = new Set(existingAppData.groups.map(g => g.id));

  const mergedGroups: IBookmarkGroup[] = [
    ...existingAppData.groups,
    ...copilotAppData.groups
      .filter(cg => !existingGroupIds.has(cg.id))
      .map(cg => ({ ...cg, suggestion: true })),
  ];

  const groupById: Record<string, IBookmarkGroup> = {};
  mergedGroups.forEach(g => { groupById[g.id] = g; });

  const copilotBookmarkById: Record<string, IBookmark> = {};
  copilotAppData.bookmarks.forEach(b => { copilotBookmarkById[b.id] = b; });

  const existingBookmarkIds = new Set(existingAppData.bookmarks.map(b => b.id));

  const mergedBookmarks: IBookmark[] = existingAppData.bookmarks.map(eb => {
    const copilotVersion = copilotBookmarkById[eb.id];
    if (copilotVersion) {
      const existingGroupId = (eb.groups ?? [])[0]?.id;
      const copilotGroupId  = (copilotVersion.groups ?? [])[0]?.id;
      const groupChanged    = existingGroupId !== copilotGroupId;
      return {
        ...copilotVersion,
        labels: eb.labels,           // always keep user-assigned labels
        suggestion: groupChanged,
        groups: (copilotVersion.groups ?? []).map(bg => groupById[bg.id] ?? bg),
      };
    }
    return { ...eb, suggestion: false };
  });

  copilotAppData.bookmarks
    .filter(cb => !existingBookmarkIds.has(cb.id))
    .forEach(cb => {
      mergedBookmarks.push({
        ...cb,
        suggestion: true,
        groups: (cb.groups ?? []).map(bg => groupById[bg.id] ?? bg),
      });
    });

  return {
    bookmarks: mergedBookmarks,
    groups: mergedGroups,
    labels: existingAppData.labels ?? copilotAppData.labels ?? [],
  };
}

export async function organizeBookmarksWithCopilot(
  rawBookmarks: IBookmark[],
  appData: IAppData
): Promise<ICopilotOrganizeResult> {
  const prompt = buildOrganizePrompt(rawBookmarks, appData);

  let rawResponse: CopilotConversation | undefined;

  try {
    const conversation = await CopilotChatService.CreateCopilotConversation();
    rawResponse = await CopilotChatService.SendChatMessage(conversation.id, prompt);

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[CopilotOrganize] Error calling Copilot API:", error);
    return { success: false, error: msg, rawResponse };
  }

  const extractedText = extractTextFromResponse(rawResponse);

  const jsonString = extractJsonFromText(extractedText);

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch (parseError) {
    const msg = `Failed to parse JSON from Copilot response: ${parseError instanceof Error ? parseError.message : String(parseError)}`;
    console.error("[CopilotOrganize]", msg);
    console.error("[CopilotOrganize] Raw JSON string that failed to parse:", jsonString);
    return { success: false, error: msg, rawResponse, extractedText };
  }

  const validation = validateAppData(parsed, rawBookmarks.length);

  if (!validation.valid) {
    console.error(
      "%c[CopilotOrganize] Validation failed:",
      "color: #d13438; font-weight: bold;",
      validation.errors
    );
    console.error("[CopilotOrganize] Parsed (invalid) object:", parsed);
    return {
      success: false,
      validationErrors: validation.errors,
      rawResponse,
      extractedText,
    };
  }

  return {
    success: true,
    organizedAppData: validation.data,
    rawResponse,
    extractedText,
  };
}
