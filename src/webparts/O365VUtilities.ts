import {Promise} from "es6-promise"; // added fro rc0
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient ,SPHttpClientConfigurations} from '@microsoft/sp-http';
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
    /** CreatedDate -- The date the video was originally uploaded. */
    public CreatedDate: string;
    public Description: string;
    public DisplayFormUrl: string;
    public FileName: string;
    public ID: string;
    public OwnerName: string;
    public ServerRelativeUrl: string;
    /**ThumbnailURL -- The URL of the thumbnail image of the video. */
    public ThumbnailUrl: string;
    /**Title -- The title of the video. */
    public Title: string;
    public Url: string;
    public VideoDownloadUrl: string;
    /**Title -- The title of the video. */
    public VideoDurationInSeconds: number;
    public VideoProcessingStatus: number;
    public ViewCount: number;
    public YammerObjectUrl: string;
}
export enum VideoProcessingStatus {
    /** 0 -- (default) -- The video has not yet been processed for playback. */
    NotProcessd = 0,
    /**1 -- The video has been picked up and is being processed. */
    BeingProcessed = 1,
    /**2 -- The video is ready to play. */
    Ready = 2,
    /**3 -- The video encountered an error while it was being uploaded to Azure Media Services for processing. */
    AzureError = 3,
    /**4 -- Error -- Generic error--Unable to process the video for streaming. */
    GenericError = 4,
    /**5 -- Error -- Timeout error--Unable to process the video for streaming. */
    TimeoutError = 5,
    /**6 -- Error -- Unsupported format --The video file type is not supported for streaming playback by Azure Media Services. */
    UnsupportedFormatError = 6
}

export class O365Video {
    public videoServiceSettings: VideoServiceSettings;
    public isInitialized: boolean;
    public videoChannels: Array<VideoChannel>;
    public httpClient: SPHttpClient;
    public siteAbsoluteUrl: string;
    constructor(context: IWebPartContext) {
        this.httpClient = context.spHttpClient;
        this.isInitialized = false;
        this.siteAbsoluteUrl = context.pageContext.site.absoluteUrl;
    }
    public Initialize(): Promise<VideoServiceSettings> {

        const url = this.siteAbsoluteUrl + "/_api/VideoService.Discover";
       // return this.httpClient.get(url).then(response => { //pre rc0
 return this.httpClient.get(url,SPHttpClient.configurations.v1).then(response => {
            if (response.ok) {
                console.log("Returned OK from httpClient");
                debugger;
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
                this.isInitialized = true;
                return results;
            } else {
                this.isInitialized = true;
                console.log("WARNING - failed to hit URL " + url + ". Error = " + response.statusText);
                throw "Error " + response.statusText;
            }
        });
    }
    public getChannels(): Promise<Array<VideoChannel>> {

        const url = this.videoServiceSettings.VideoPortalUrl + "/_api/VideoService/Channels";
        return this.httpClient.get(url,SPHttpClient.configurations.v1).then(response => {

            if (response.ok) {
                console.log("Returned OK from httpClient");

                return response.json().then(channels => {

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

    public GetVideos(ChannelId: string): Promise<Array<Video>> {
        const url = this.videoServiceSettings.VideoPortalUrl + "/_api/VideoService/Channels('" + ChannelId + "')/Videos";
        return this.httpClient.get(url,SPHttpClient.configurations.v1).then(response => {

            if (response.ok) {
                return response.json().then(v => {

                    const videos = v.value.map(c => {
                        let video = new Video();
                        video.ChannelID = c.ChannelID;
                        video.Description = c.Description;
                        video.DisplayFormUrl = c.DisplayFormUrl;
                        video.FileName = c.FileName;
                        video.ID = c.ID;
                        video.OwnerName = c.OwnerName;
                        video.ServerRelativeUrl = c.ServerRelativeUrl;
                        video.Title = c.Title;
                        video.ThumbnailUrl = c.ThumbnailUrl;
                        video.Url = c.Url;
                        video.VideoDownloadUrl = c.VideoDownloadUrl;
                        video.VideoDurationInSeconds = c.VideoDurationInSeconds;
                        video.VideoProcessingStatus = c.VideoProcessingStatus;
                        video.ViewCount = c.ViewCount;
                        video.YammerObjectUrl = c.YammerObjectUrl;
                        return video;
                    });
                    return videos;
                });
            } else {
                console.log("WARNING - failed to hit URL " + url + ". Error = " + response.statusText);
                throw "Error " + response.statusText;
            }
        });
    }
    public GetChannelByName(ChannelTitle: string): Promise<VideoChannel> {
        return this.getChannels().then(channels => {
            const matches = channels.filter((value, index, array) => { return value.Title === ChannelTitle; });
            return matches[0];
        });
    }

}