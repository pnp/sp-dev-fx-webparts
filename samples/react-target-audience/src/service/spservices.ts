import * as $ from 'jquery';
export default class spservices{
   
   constructor(){
   }
    /*check if user is a member of the group, using SP rest
    */
   public async isMember(groupName: string, userId: string, webAbsoluteUrl): Promise<any> {
    var p = new Promise<any>((resolve, reject) => {
        $.ajax({
            url: webAbsoluteUrl + "/_api/web/sitegroups/getByName('" + groupName + "')/Users?$filter=Id eq " + userId,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: (data) => {
                if (data.d.results[0] != undefined) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            },
            error: (error) => {
                reject(false);
            },
        });
    });
    return p;
}

}