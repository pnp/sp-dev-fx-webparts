import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Web } from "@pnp/sp";

export default class spservices {
    constructor(private context: WebPartContext) {
     sp.setup({
         spfxContext: this.context
     });
        this.onInit();
    }
    private async onInit() {
      }

    public async getInfo(site): Promise<any[]> {
        try {
           let siteWeb = new Web(site);
            let Items: any = await siteWeb.lists.getByTitle("Site%20Pages").items
                .select("id,Title,Description,BannerImageUrl,Created,Author/ID,Author/FirstName,Author/LastName,Author/Title,FileRef")
                .filter('PromotedState eq 2')
                .expand("Author/ID")
                .get();


            var Res = [];
            Items.map(item => {
                var Url = site.split('/sites/')[0] + item.FileRef;
                var Date = item.Created.split('T')[0];
                Res.push({
                    Author: item.Author.Title,
                    Title: item.Title,
                    Description: item.Description,
                    Id: item.Id,
                    Created: Date,
                    BannerImageUrl: item.BannerImageUrl.Url,
                    Url: Url
                });
            });
            return Res;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    public async getComments(Site, ID): Promise<any> {
        try {
            let siteWeb = new Web(Site);
            let Comments: any = await siteWeb.lists.getByTitle("Site%20Pages").items.getById(ID).comments.get();
            var AmmountofComments = Comments.length;
            Comments.map(item => {
                AmmountofComments += item.replyCount;
            });
            return AmmountofComments;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }

    public async getLikes(Site, ID): Promise<any> {
        try {
            let siteWeb = new Web(Site);
            let Likes: any = await siteWeb.lists.getByTitle("Site%20Pages").items.getById(ID).getLikedByInformation();
            return Likes.likeCount;
        }

        catch (error) {
            return Promise.reject(error);
        }
    }
}