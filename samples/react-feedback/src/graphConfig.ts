import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientFactory, MSGraphClientV3 } from "@microsoft/sp-http";

let _graphFactory: MSGraphClientFactory | undefined = undefined;
let _graphClient: Promise<MSGraphClientV3> | undefined = undefined;

export const initGraph = (context: WebPartContext): void => {
  _graphFactory = context.msGraphClientFactory;
  _graphClient = undefined;
};

export const getGraphClient = async (): Promise<MSGraphClientV3> => {
  if (_graphFactory === undefined) {
    throw new Error("Graph client has not been initialised. Call initGraph(context) in the web part onInit before using getGraphClient().");
  }
  if (_graphClient === undefined) {
    _graphClient = _graphFactory.getClient('3') as Promise<MSGraphClientV3>;
  }
  return _graphClient;
};
