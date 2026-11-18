export interface ISubscribedSku {
  skuId: string;
  skuPartNumber: string;
  displayName: string;
  enabledUnits: number;
  consumedUnits: number;
  availableUnits: number;
  capabilityStatus: string;
  includesExchange: boolean;
}

export interface ILicenseCost {
  skuPartNumber: string;
  monthlyCost: number;
  currency: string;
}

/** A license cost row addressable for editing from the Catalogs tab. */
export interface ILicenseCostItem extends ILicenseCost {
  itemId: number;
}

export interface ILicenseOption extends ISubscribedSku {
  monthlyCost: number | null;
  currency: string | null;
}
