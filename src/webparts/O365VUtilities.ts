export class VideoServiceSettings {
    public ChannelUrlTemplate: string;
    public IsVideoPortalEnabled: string;
    public PlayerUrlTemplate: string;
    public VideoPortalLayoutsUrl: string;
    public VideoPortalUrl: string;
    public O365VideoPageUrl: string;
}
export class VideoChannel {
    public Description: string;
    public Id: string;
    public ServerRelativeUrl: string;
    public TileHtmlColor: string;
    public Title: string;
    public YammerEnabled: string;
}
export class Video {
     public ChannelID: string;
     public CreatedDate: string;
     public Description: string;
     public DisplayFormUrl: string;
     public FileName: string;
     public OwnerName: string;
     public ServerRelativeUrl: string;
     public ThumbnailUrl: string;
     public Title: string;
     public ID: string;
     public Url: string;
     public VideoDurationInSeconds: number;
     public VideoProcessingStatus: number;
     public ViewCount:number;
     public YammerObjectUrl:string;
}
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient } from '@microsoft/sp-client-base';
export class O365Video {
    public videoServiceSettings: VideoServiceSettings;
    public isInitialized: boolean;
    public videoChannels: Array<VideoChannel>;
    public httpClient: HttpClient;
    public siteAbsoluteUrl: string;
    constructor(context: IWebPartContext) {
        this.httpClient = context.httpClient;
        this.isInitialized = false;
        this.siteAbsoluteUrl = context.pageContext.site.absoluteUrl;
    }
    public Initialize(): Promise<VideoServiceSettings> {

        const url = this.siteAbsoluteUrl + "/_api/VideoService.Discover";
        return this.httpClient.get(url).then(response => {

            if (response.ok) {
                console.log("Returned OK from httpClient");
                const results = response.json().then(settings => {
                    this.videoServiceSettings = new VideoServiceSettings();
                    this.videoServiceSettings.ChannelUrlTemplate = settings.ChannelUrlTemplate;
                    this.videoServiceSettings.IsVideoPortalEnabled = settings.IsVideoPortalEnabled;
                    this.videoServiceSettings.PlayerUrlTemplate = settings.PlayerUrlTemplate;
                    this.videoServiceSettings.VideoPortalLayoutsUrl = settings.VideoPortalLayoutsUrl;
                    this.videoServiceSettings.VideoPortalUrl = settings.VideoPortalUrl;
                    this.videoServiceSettings.O365VideoPageUrl = settings.O365VideoPageUrl;
                    return this.videoServiceSettings;
                });
                return results;
            } else {
                console.log("WARNING - failed to hit URL " + url + ". Error = " + response.statusText);
                throw "Error " + response.statusText;
            }
        });
    }
    public getChannels(): Promise<Array<VideoChannel>> {

        const url = this.videoServiceSettings.VideoPortalUrl + "/_api/VideoService/Channels";
        return this.httpClient.get(url).then(response => {
            debugger;
            if (response.ok) {
                console.log("Returned OK from httpClient");
                debugger;
                return response.json().then(channels => {
                    debugger;
                    this.videoChannels = channels.value.map(c => {
                        const channel = new VideoChannel();
                        channel.Description = c.Description;
                        channel.Id = c.Id;
                        channel.ServerRelativeUrl = c.ServerRelativeUrl;
                        channel.TileHtmlColor = c.TileHtmlColor;
                        channel.Title = c.Title;
                        channel.YammerEnabled = c.YammerEnabled;
                        return channel;
                    });
                    return this.videoChannels;
                });
            } else {
                console.log("WARNING - failed to hit URL " + url + ". Error = " + response.statusText);
                throw "Error " + response.statusText;
            }
        });
    }

    publicGetVideos(ChannelId: string): Array<Video> {
        this.videoServiceSettings.VideoPortalUrl + "/_api/VideoService/Channels('" + ChannelId + "')/Videos";
        var t = MakeRestCall(endpointUri, SpoCredentials);
        var d = t["d"];
        var resulkts = d["results"];
        var returnVal = resulkts.ToObject<List<Video>>();
        return returnVal;
    }



    //         public  VideoChannel GetChannelByName(string ChannelTitle)
    // {
    //     var endpointUri = VideoServiceSettings.VideoPortalUrl + "/_api/VideoService/Channels";
    //     var t = MakeRestCall(endpointUri, SpoCredentials);

    //     var d = t["d"];
    //     var results = d["results"];
    //     var channels = results.ToObject<List<VideoChannel>>();
    //     var selectedChannel = channels.Find(channel => channel.Title == ChannelTitle);

    //     return selectedChannel;

    // }

    //         private static JToken MakeRestCall(string endpointUri, ICredentials credentials)
    // {
    //     using(var client = new WebClient())
    //         {
    //             client.Headers.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
    //     client.Credentials = credentials;
    //     client.Headers.Add(HttpRequestHeader.ContentType, "application/json;odata=verbose");
    //     client.Headers.Add(HttpRequestHeader.Accept, "application/json;odata=verbose");
    //     var result = client.DownloadString(endpointUri);
    //     var t = Newtonsoft.Json.Linq.JToken.Parse(result);
    //     return t;

    // }
    //         }
    //     }

}