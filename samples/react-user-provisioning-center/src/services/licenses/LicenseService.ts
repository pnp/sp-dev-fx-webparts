import type { GraphService } from '../graph/GraphService';
import type { SharePointDataService } from '../sharePointData/SharePointDataService';
import type { ILicenseCost, ILicenseOption, ISubscribedSku } from '../../models';
import { skuDisplayName } from './skuNames';

interface IGraphSubscribedSku {
  skuId: string;
  skuPartNumber: string;
  capabilityStatus: string;
  prepaidUnits: { enabled: number; suspended: number; warning: number };
  consumedUnits: number;
  servicePlans: { servicePlanName: string; provisioningStatus: string }[];
}

export class LicenseService {
  private readonly _graph: GraphService;
  private readonly _data: SharePointDataService;

  public constructor(graph: GraphService, data: SharePointDataService) {
    this._graph = graph;
    this._data = data;
  }

  public async getSubscribedSkus(signal?: AbortSignal): Promise<ISubscribedSku[]> {
    const result: { value: IGraphSubscribedSku[] } = await this._graph.get<{
      value: IGraphSubscribedSku[];
    }>('/subscribedSkus', { signal });
    return (result.value ?? [])
      .filter((sku) => sku.capabilityStatus === 'Enabled' || sku.capabilityStatus === 'Warning')
      .map((sku) => ({
        skuId: sku.skuId,
        skuPartNumber: sku.skuPartNumber,
        displayName: skuDisplayName(sku.skuPartNumber),
        enabledUnits: sku.prepaidUnits?.enabled ?? 0,
        consumedUnits: sku.consumedUnits ?? 0,
        availableUnits: Math.max(0, (sku.prepaidUnits?.enabled ?? 0) - (sku.consumedUnits ?? 0)),
        capabilityStatus: sku.capabilityStatus,
        includesExchange: (sku.servicePlans ?? []).some((p) =>
          p.servicePlanName?.toUpperCase().startsWith('EXCHANGE')
        )
      }));
  }

  public async getLicenseOptions(signal?: AbortSignal): Promise<ILicenseOption[]> {
    const [skus, costs] = await Promise.all([
      this.getSubscribedSkus(signal),
      this._data.getLicenseCosts().catch((): ILicenseCost[] => [])
    ]);
    const costMap: Map<string, ILicenseCost> = new Map(
      costs.map((c) => [c.skuPartNumber.toUpperCase(), c])
    );
    return skus.map((sku) => {
      const cost: ILicenseCost | undefined = costMap.get(sku.skuPartNumber.toUpperCase());
      return {
        ...sku,
        monthlyCost: cost ? cost.monthlyCost : null,
        currency: cost ? cost.currency : null
      };
    });
  }
}
