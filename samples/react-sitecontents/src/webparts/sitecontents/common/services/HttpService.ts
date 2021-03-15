import { HttpClient } from "@microsoft/sp-http";

export  class HttpService {
  private  httpClient: HttpClient;
  private siteUrl: string;
  constructor(siteUrl:string, httpClient: HttpClient) {
    this.siteUrl= siteUrl;
    this.httpClient= httpClient;
  }
  /*
  public Init(httpClient: HttpClient) {
    this.httpClient= httpClient;
  }
*/
  public async Get(url:string) : Promise<any> {
   return new Promise<any> (async (resolve,reject)=> {
      this.httpClient.get(url, HttpClient.configurations.v1).then((response)=> {
        resolve(response.json())
      }).catch((error)=>{
        reject('Failed in getting the data' + error)
      });
    });
  }

public async GetSiteContent(filterSiteContentBy: string) : Promise<any> {
  return new Promise<any> ((resolve,reject)=> {
    const url = this.buildRestUrl(filterSiteContentBy);
    if(url!=""){
      this.httpClient.get(url,HttpClient.configurations.v1,this.httpGetHeader()).then((response)=> {
        resolve(response.json())
      }).catch((error)=>{
        reject(error);
      })
    }
    else {
      reject("url is not provided")
    }
  })
}
  private buildRestUrl(filterSiteContentBy:string): string {
    let queryUrl = "";
    const select = "&$select=Title,ItemCount,ImageUrl,Id,Created,EntityTypeName,LastItemModifiedDate,RootFolder/ServerRelativeURL";
    if(filterSiteContentBy=="") {
      return (
        this.siteUrl + "?$filter=(IsPrivate eq false) and (IsCatalog eq false) and (Hidden eq false)" +
        select +
        "&$expand=RootFolder"
      );
    }

    else if(filterSiteContentBy!=""){
      if(filterSiteContentBy == "libraries"){
        queryUrl= this.siteUrl+ "/_api/web/lists?$filter=(BaseTemplate eq 101) and (IsPrivate eq false) and (IsCatalog eq false) and (Hidden eq false)"
      }
      else if(filterSiteContentBy == "lists") {
        queryUrl= this.siteUrl + "/_api/web/lists?$filter=(BaseTemplate eq 100) and (IsPrivate eq false) and (IsCatalog eq false) and (Hidden eq false)"
      }
      else {
        queryUrl= this.siteUrl + "/_api/Web/Lists?$filter=(IsPrivate eq false) and (IsCatalog eq false) and (Hidden eq false)"
      }
      queryUrl = queryUrl + select + "&$expand=RootFolder";
    }

    return queryUrl
  }

  private httpGetHeader(): any {
    return {
      headers : {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
    };
  }

}
