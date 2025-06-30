import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AadHttpClient, IHttpClientOptions } from '@microsoft/sp-http';
import GraphService from './GraphService';
import { AadTokenProvider } from '@microsoft/sp-http-base';
import { Items } from '../components/Dashboard/IReactFlowDashboardProps';

interface IEnvironment {
  name: string;
  location: string;
  id: string;
  type: string;
  properties: any; 
}

interface IFlow {
  name: string;
  id: string;
  type: string; 
  properties: any;
}

export default class FlowService {

  private static readonly endpoint: string = 'https://service.flow.microsoft.com';
  private static readonly graphEndPoint : string = "https://graph.microsoft.com/";

  public static async create(context: WebPartContext): Promise<FlowService> {
    return new FlowService(await context.aadHttpClientFactory.getClient(FlowService.endpoint));
  }

  private aadHttpClient: AadHttpClient;

  private constructor(aadHttpClient: AadHttpClient) {
    this.aadHttpClient = aadHttpClient;
  }

  public async getEnvironments(): Promise<IEnvironment[]> {
    const response = await this.aadHttpClient.get(
      'https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments' +
      '?api-version=2016-11-01',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json.value as IEnvironment[];
  }

  public async getFlows(environment: string): Promise<IFlow[]> {
    const response = await this.aadHttpClient.get(
      `https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments/${environment}/flows` +
      '?api-version=2016-11-01',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json.value as IFlow[];
  }

  public async getFlow(id: string): Promise<IFlow> {
    const response = await this.aadHttpClient.get(
      `https://api.flow.microsoft.com/${id}` +
      '?api-version=2016-11-01',
      AadHttpClient.configurations.v1);
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json as IFlow;
  }

  public async getFlowDetails(environments: string[], flowService:FlowService, graphService:GraphService, provider: AadTokenProvider):Promise<Items[]>{

    const token: any = await provider.getToken(FlowService.graphEndPoint); 
    const data : any[] = []; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    for(const environment of environments){
      const flows = await flowService.getFlows(environment);
      await Promise.all(flows.map(async (item) => {
        const flow = await flowService.getFlow(item.id);
        const author = await graphService.getUser(flow.properties.creator.objectId, token);
        data.push({
          id: item.id,
          environment : flow.properties.environment.name,
          flowName : flow.name,
          flowDisplayName: flow.properties.displayName,
          flowState : flow.properties.state,
          flowAuthor : author.displayName,
          flowTriggerUrl : flow.properties.flowTriggerUri ? flow.properties.flowTriggerUri : `https://flow.microsoft.com/manage/environments/${flow.properties.environment.name}/flows/${flow.name}/details`,
        });
      }));
    }
    return data;
  }

  
  public async restartFlow(environment: string, flowName: string) { 
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('accept', 'application/json');
    const httpClientOptions: IHttpClientOptions = {
      headers: requestHeaders
    };
  
    try {
      const response = await this.aadHttpClient.post(
        `https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments/${environment}/flows/${flowName}` +
        '/start?api-version=2016-11-01',
        AadHttpClient.configurations.v1,
        httpClientOptions
      );
  
      // Check if the response status indicates success (2xx status codes)
      if (response.ok) {
        try {
          // Try to parse the JSON response
          if(response.status >= 200 && response.status < 300){
            return { success: true, data: response.status };
          }
        } catch (jsonError) {
          // If parsing as JSON fails, handle non-JSON response here
          const textResponse = await response.text();
          console.warn('Non-JSON response:', textResponse);
          return { success: false, error: 'Non-JSON response received' };
        }
      } else {
        // If the response status is not in the 2xx range, throw an error or handle it accordingly.
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      // Handle any exceptions that may occur during the request or parsing the response.
      console.error(error);
      return { success: false, error: error.message };
    }
  }

  public async fetchFlowRunHistory(environment : string, flowId:string): Promise<any[]>{ 

    const fetchFlowRunHistoryEndpoint = `https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments/${environment}/flows/${flowId}/runs?api-version=2016-11-01`;
      const requestHeaders: Headers = new Headers();
      requestHeaders.append('accept', 'application/json;odata.metadata=none');
      const httpClientOptions: IHttpClientOptions = {
        headers: requestHeaders
      };
      const response= await this.aadHttpClient.get(fetchFlowRunHistoryEndpoint, AadHttpClient.configurations.v1,httpClientOptions);
      const flowRunsData = await response.json();
      return flowRunsData.value as IFlow[];
  }
  
}
