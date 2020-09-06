import { IOrganization, IOrganizationReturnData } from "../Entities/IOrganization";
import { MSGraphClient } from "@microsoft/sp-http";

export const useGetOrganization = async (msGraphClient: MSGraphClient):Promise<IOrganization> => {

  const _organization:IOrganizationReturnData = await msGraphClient
  .api(`/organization`)
  .version("beta")
 .get();
 return _organization.value[0];
};
