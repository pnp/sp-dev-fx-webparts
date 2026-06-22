export const COPILOT_ORGANIZE_SYSTEM_PREAMBLE = `You are an intelligent bookmark organizer integrated with Microsoft 365.`;

export const COPILOT_ORGANIZE_TASK = `
## Your Task
Analyze all bookmarks below and organise them into a well-structured set of groups.

### Creating new groups
- **You are EXPECTED to create new groups.** If you see bookmarks that share a clear theme, topic, or purpose that is not already covered by an existing group, create a specific, descriptive group for them.
- Think like a librarian: favour narrow, precise group names over broad catch-all buckets.
- Do NOT let the existence of an old group stop you from creating a better, more specific one for a cluster of related bookmarks.

### Using existing groups
- Reuse an existing group only when it is a genuinely precise match — not merely because it is the closest available option.
- Archived groups (archived: true) must NEVER be used for new assignments.

### Assignment rules
- Every bookmark MUST be assigned to exactly ONE group (existing or new).
- New groups are ADDITIONS — never delete or rename existing groups in your output.`;

export const COPILOT_ORGANIZE_RESPONSE_FORMAT = `
## Response Format
Respond with ONLY a valid JSON object — no explanation, no markdown fences, no code blocks.
The JSON must conform exactly to the following TypeScript interfaces:

interface IBookmarkLabel  { name: string; description?: string; color: string; }
interface IBookmarkGroup  { id: string; index: number; name: string; description?: string; archived: boolean; collapsed: boolean; }
interface IBookmark       { id: string; title: string; url: string; date: string; type: "site" | "email" | "file"; description?: string; groups: [IBookmarkGroup]; labels?: IBookmarkLabel[]; metadata?: { from?: string; author?: string; }; }
interface IAppData        { bookmarks: IBookmark[]; groups: IBookmarkGroup[]; labels: IBookmarkLabel[]; }

## Rules for the returned JSON
1. "bookmarks" must contain ALL bookmarks from the input, each with a "groups" array containing EXACTLY one group object.
2. "groups" must list ALL existing groups (even if unused after reorganisation) PLUS every newly created group.
3. Newly created groups must have a unique "id" in the format "new-<kebab-case-name>" and an "index" higher than any existing group index. Example: if max existing index is 3, new groups use index 4, 5, 6...
4. Do NOT remove, rename, or change the "id"/"index" of any existing group.
5. "labels" must carry over the existing labels array unchanged.
6. Preserve every original bookmark field value (id, title, url, date, type, description, metadata) exactly as received — do NOT alter them.`;

/**
 * Builds a full Copilot organize prompt from its parts and the runtime data.
 *
 * @param bookmarksJson   JSON.stringify of all raw IBookmark[]
 * @param groupsJson      JSON.stringify of all existing IBookmarkGroup[]
 * @param labelsJson      JSON.stringify of existing IBookmarkLabel[]
 * @param maxGroupIndex   Highest existing group index (for new-group index hints)
 * @param bookmarkCount   Total number of bookmarks (used in the count rule)
 */
export function buildOrganizePromptText(
  bookmarksJson: string,
  groupsJson: string,
  labelsJson: string,
  maxGroupIndex: number,
  bookmarkCount: number
): string {
  return `${COPILOT_ORGANIZE_SYSTEM_PREAMBLE}
${COPILOT_ORGANIZE_TASK}

## Existing Groups (JSON)
${groupsJson}

## All Bookmarks to Organize (JSON — ${bookmarkCount} total)
${bookmarksJson}
${COPILOT_ORGANIZE_RESPONSE_FORMAT}
   - "bookmarks" must contain ALL ${bookmarkCount} bookmarks.
   - Newly created groups must have an "index" higher than ${maxGroupIndex}.
   - "labels" must be: ${labelsJson}`;
}
