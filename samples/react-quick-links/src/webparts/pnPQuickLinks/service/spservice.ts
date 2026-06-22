import { graphfi, SPFx } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/groups";

export default class spservice{
    public async isMember(group: any, context: any): Promise<boolean> {
    const _cacheName = 'CacheName_memberGroups';

    if (group == null || group == '') {
        return true;
    }
    const graph = graphfi().using(SPFx(context));
    let _cachedMemberGroups = sessionStorage.getItem(_cacheName);
    let memberGroups: string[] = [];
    if (!_cachedMemberGroups) {
        memberGroups = await graph.me.getMemberGroups();
        sessionStorage.setItem(_cacheName, JSON.stringify(memberGroups));
    } else {
        memberGroups = JSON.parse(_cachedMemberGroups);
    }
    // "c:0o.c|federateddirectoryclaimprovider|xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx"
    const groupID = group.id.split('|')[2];
    if (memberGroups.filter((g: string) => g === groupID).length > 0) {
        return true;
    }
    throw new Error('User not found');
}
}