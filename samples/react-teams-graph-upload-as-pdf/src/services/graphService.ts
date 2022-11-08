import { MSGraphClientFactory, MSGraphClient } from "@microsoft/sp-http";

export default class GraphService {
	private client: MSGraphClient;

	public async initialize (serviceScope): Promise<boolean> {
    const graphFactory: MSGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
        
		return graphFactory.getClient()
			.then((client) => {
				this.client = client;
				return true;
			});
	}

	public async uploadTmpFileToOneDrive (file: File): Promise<string> {
    const apiUrl = `me/drive/root:/TempUpload/${file.name}:/content`;
    const response = await this.uploadFile(apiUrl, file);  
    const fileID = response.id;
    return fileID;
  }

  public async downloadTmpFileAsPDF (fileID: string): Promise<Blob> {
    const apiUrl = `me/drive/items/${fileID}/content?format=PDF`;
    const response = await this.client
                .api(apiUrl)
                .responseType('blob')
                .get();
    return response;
  }
  // Alternative to responseType "blob"
  // var reader = new FileReader();

  // reader.onload = (e) => {
  //   var rawData = reader.result;
  //   const apiUrl4 = `me/drive/root:/TempUpload/Binary.pdf:/content`;
  //   this.client
  //     .api(apiUrl4)
  //     .put(rawData);
  // }
  
  // reader.readAsBinaryString(res2);            

  public async uploadFileToSiteAsPDF(siteID: string, file: Blob, fileName: string, channelName: string): Promise<string> {  
    const apiUrl = channelName !== '' ?
                                  `sites/${siteID}/drive/root:/${channelName}/${fileName}:/content`:
                                  `sites/${siteID}/drive/root:/${fileName}:/content`;
    const response = await this.uploadFile(apiUrl, file);
    return response.webUrl;          
  }

  private async uploadFile(apiUrl: string, file: Blob) {
    if (file.size <(4 * 1024 * 1024)) {
      const resp = await this.client
        .api(apiUrl)
        .put(file);
      return resp;
    }
    else {
      // File.size>4MB, refer to https://mmsharepoint.wordpress.com/2020/01/12/an-outlook-add-in-with-sharepoint-framework-spfx-storing-mail-with-microsoftgraph/
      return null;
    }
  }

  public async deleteTmpFileFromOneDrive(fileID: string) {
    const apiUrl = `me/drive/items/${fileID}`;
    this.client
      .api(apiUrl)
      .delete();
  }
}