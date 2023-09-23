
import { SPHttpClient } from "@microsoft/sp-http";
import { cloneDeep } from "@microsoft/sp-lodash-subset";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface ISearchResults{
    queryKeywords: string,
    refinementResults: any[],
    relevantResults : any[],
    secondaryResults: any[],
    promotedResults : any[],
    totalRows: 0
}

export class SearchService{
    public async getCachedSearchResults(context: WebPartContext, query:any): Promise<any> {
        let results:ISearchResults= {
          queryKeywords: query.Querytext,
          refinementResults: [],
          relevantResults : [],
          secondaryResults: [],
          promotedResults:[],
          totalRows: 0
        };
        const searchEndpoint = `${context.pageContext.web.absoluteUrl}/_api/search/postquery`;
        try{
          const response = await context.spHttpClient.post(searchEndpoint, SPHttpClient.configurations.v1, {
            body: this.getRequestPayload(query),
            headers: {
              'accept': 'application/json;odata=nometadata',
              'content-type': 'application/json;odata=verbose',
              'odata-version': '3.0',
              'X-ClientService-ClientTag': 'NonISV|PnP|ModernSearch',
              'UserAgent': 'NonISV|PnP|ModernSearch'
            }
          });
      
          if (!response || !response.ok) {
            throw new Error(`Something went wrong when executing search query. Status='${response.status}'`);
          }
    
          if(response.ok){
            const recentSearchData: any = await response.json();
            if (!recentSearchData || !recentSearchData.PrimaryQueryResult?.RelevantResults?.Table?.Rows) {
              throw new Error(`Cannot read JSON result`);
            }
            if(recentSearchData.PrimaryQueryResult){
              let refinementResults: any[] = [];
              const resultRows = recentSearchData.PrimaryQueryResult.RelevantResults?.Table?.Rows;
              let refinementResultsRows = recentSearchData.PrimaryQueryResult.RefinementResults;
              const refinementRows: any = refinementResultsRows ? refinementResultsRows.Refiners : [];
    
              let searchResults : any[] = this.getSearchResults(resultRows);
    
              refinementRows.forEach((refiner:any) => {
    
                let values: any[] = [];
                refiner.Entries.forEach((item:any) => {
                    values.push({
                        count: parseInt(item.RefinementCount, 10),
                        name: item.RefinementValue.replace("string;#", ""),
                        value: item.RefinementToken
                    } as any);
                });
    
                refinementResults.push({
                    filterName: refiner.Name,
                    values: values
                });
              });
    
              results.relevantResults = searchResults;
              results.refinementResults = refinementResults;
              results.totalRows = recentSearchData.PrimaryQueryResult.RelevantResults.TotalRows;
            }
            if(recentSearchData.SecondaryQueryResults){
              const secondaryQueryResults = recentSearchData.SecondaryQueryResults;
    
              if (Array.isArray(secondaryQueryResults) && secondaryQueryResults.length > 0){
                let promotedResults: any[] = [];
                let secondaryResults: any[] = [];
    
                secondaryQueryResults.forEach((e) => {
    
                  // Best bets are mapped through the "SpecialTermResults" https://msdn.microsoft.com/en-us/library/dd907265(v=office.12).aspx
                  if (e.SpecialTermResults) {
                      // Casting as pnpjs has an incorrect mapping of SpecialTermResults
                      (e.SpecialTermResults).Results.forEach((result:any) => {
                          promotedResults.push({
                              title: result.Title,
                              url: result.Url,
                              description: result.Description
                          } as any);
                      });
                  }
    
                  // Secondary/Query Rule results are mapped through SecondaryQueryResults.RelevantResults
                  if (e.RelevantResults) {
                      const secondaryResultItems = this.getSearchResults(e.RelevantResults.Table.Rows);
    
                      const secondaryResultBlock: any = {
                          title: e.RelevantResults.ResultTitle,
                          results: secondaryResultItems
                      };
    
                      // Only keep secondary result blocks which have items
                      if (secondaryResultBlock.results.length > 0) {
                          secondaryResults.push(secondaryResultBlock);
                      }
                  }
                });
    
                results.promotedResults = promotedResults;
                results.secondaryResults = secondaryResults;
              }
            }
    
            return results;
          } else {
            throw new Error(response.statusText);
          }
        }catch (error) {
          console.error("[SharePointSearchService.search()]", error, "Manage-hublevel-list-subscriptions");
          throw error;
        }
      }
    
      private fixArrProp(prop: any): { results: any[] } {
        if (typeof prop === "undefined") {
            return ({ results: [] });
        }
        return { results: Array.isArray(prop) ? prop : [prop] };
      }
    
      private getRequestPayload(searchQuery: any): string {
    
        let queryPayload: any = cloneDeep(searchQuery);
    
        queryPayload.HitHighlightedProperties = this.fixArrProp(queryPayload.HitHighlightedProperties);
        queryPayload.Properties = this.fixArrProp(queryPayload.Properties);
        queryPayload.RefinementFilters = this.fixArrProp(queryPayload.RefinementFilters);
        queryPayload.ReorderingRules = this.fixArrProp(queryPayload.ReorderingRules);
        queryPayload.SelectProperties = this.fixArrProp(queryPayload.SelectProperties);
        queryPayload.SortList = this.fixArrProp(queryPayload.SortList);
    
        const postBody = {
            request: {
                '__metadata': {
                    'type': 'Microsoft.Office.Server.Search.REST.SearchRequest'
                },
                ...queryPayload
            }
        };
    
        return JSON.stringify(postBody);
      } 
    
      private getSearchResults(resultRows: any): any[] {
        // Map search results
        let searchResults: any[] = resultRows.map((elt:any) => {
            let result: any = {};
            elt.Cells.map((item:any) => {
                if (item.Key === "HtmlFileType" && item.Value) {
                    result["FileType"] = item.Value;
                }
                else if (!result[item.Key]) {
                    result[item.Key] = item.Value;
                }
            });
            return result;
        });
        return searchResults;
      }
}