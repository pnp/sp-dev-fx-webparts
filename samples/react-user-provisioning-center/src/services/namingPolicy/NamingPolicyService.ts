import type { GraphService } from '../graph/GraphService';
import type { INamingResult, UpnAvailability } from '../../models';
import { DEFAULT_RESERVED_NAMES } from '../../constants/reservedNames';
import { escapeODataLiteral } from '../util/odata';
import { resolveNaming } from './namingPolicy';

interface ICountedCollection {
  '@odata.count'?: number;
  value: { id: string }[];
}

export class NamingPolicyService {
  private readonly _graph: GraphService;
  private readonly _extraReservedNames: readonly string[];

  public constructor(graph: GraphService, extraReservedNames?: readonly string[]) {
    this._graph = graph;
    this._extraReservedNames = extraReservedNames ?? [];
  }

  public async resolve(
    firstName: string,
    lastName: string,
    domain: string,
    signal?: AbortSignal
  ): Promise<INamingResult> {
    return resolveNaming({
      firstName,
      lastName,
      domain,
      reservedNames: [...DEFAULT_RESERVED_NAMES, ...this._extraReservedNames],
      checkAvailability: (upn: string, s?: AbortSignal) => this.checkUpnAvailability(upn, s),
      signal
    });
  }

  public async checkUpnAvailability(upn: string, signal?: AbortSignal): Promise<UpnAvailability> {
    const literal: string = escapeODataLiteral(upn);

    const filter: string =
      `userPrincipalName eq '${literal}' or mail eq '${literal}' ` +
      `or proxyAddresses/any(p:p eq 'smtp:${literal}') ` +
      `or proxyAddresses/any(p:p eq 'SMTP:${literal}')`;
    const query: string = `$count=true&$select=id&$top=1&$filter=${encodeURIComponent(filter)}`;
    const advancedQueryHeaders: Record<string, string> = { ConsistencyLevel: 'eventual' };

    const active: ICountedCollection = await this._graph.get<ICountedCollection>(
      `/users?${query}`,
      { headers: advancedQueryHeaders, signal }
    );
    if ((active.value ?? []).length > 0) {
      return 'taken';
    }

    const deleted: ICountedCollection = await this._graph.get<ICountedCollection>(
      `/directory/deletedItems/microsoft.graph.user?${query}`,
      { headers: advancedQueryHeaders, signal }
    );
    if ((deleted.value ?? []).length > 0) {
      return 'taken-soft-deleted';
    }
    return 'available';
  }
}
