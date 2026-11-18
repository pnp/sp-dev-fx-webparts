import type { GraphService } from './GraphService';

const CHECK_MEMBER_GROUPS_LIMIT: number = 20;

export async function checkMemberGroups(
  graph: GraphService,
  principalPath: string,
  groupIds: string[],
  signal?: AbortSignal
): Promise<Set<string>> {
  const memberOf: Set<string> = new Set();
  if (groupIds.length === 0) {
    return memberOf;
  }
  for (let i = 0; i < groupIds.length; i += CHECK_MEMBER_GROUPS_LIMIT) {
    const chunk: string[] = groupIds.slice(i, i + CHECK_MEMBER_GROUPS_LIMIT);
    try {
      const result: { value: string[] } = await graph.post<{ value: string[] }>(
        `${principalPath}/checkMemberGroups`,
        { groupIds: chunk },
        { signal }
      );
      for (const id of result.value ?? []) {
        memberOf.add(id);
      }
    } catch (chunkErr) {
      void chunkErr;
    }
  }
  return memberOf;
}
