export class VideoServiceSettings {
    public ChannelUrlTemplate: string;
    public IsVideoPortalEnabled: string;
    public PlayerUrlTemplate: string;
    public VideoPortalLayoutsUrl: string;
    public VideoPortalUrl: string;
}
export class O365Utilities {
    public siteUrl: string;
    public userID: string;
    public password: string;
    private _spoCredentials;
    public VideoServiceSettings : VideoServiceSettings{
   
        var endpointUri = siteUrl + "/_api/VideoService.discover";
        var t = MakeRestCall(endpointUri, SpoCredentials);
        var settings = t["d"];
        VideoServiceSettings vs = settings.ToObject<VideoServiceSettings>();
        return vs;

   
}
        public List < VideoChannel > Channels
{
    get
    {
        var endpointUri = VideoServiceSettings.VideoPortalUrl + "/_api/VideoService/Channels";
        var t = MakeRestCall(endpointUri, SpoCredentials);

        var d = t["d"];
        var results = d["results"];
        var returnVal = results.ToObject<List<VideoChannel>>();
        return returnVal;

    }
}
        public  List < Video > GetVideos(string ChannelId)
{
    var endpointUri = string.Format("{0}/_api/VideoService/Channels('{1}')/Videos", VideoServiceSettings.VideoPortalUrl, ChannelId);
    var t = MakeRestCall(endpointUri, SpoCredentials);
    var d = t["d"];
    var resulkts = d["results"];
    var returnVal = resulkts.ToObject<List<Video>>();
    return returnVal;
}

       

        public  VideoChannel GetChannelByName(string ChannelTitle)
{
    var endpointUri = VideoServiceSettings.VideoPortalUrl + "/_api/VideoService/Channels";
    var t = MakeRestCall(endpointUri, SpoCredentials);

    var d = t["d"];
    var results = d["results"];
    var channels = results.ToObject<List<VideoChannel>>();
    var selectedChannel = channels.Find(channel => channel.Title == ChannelTitle);

    return selectedChannel;

}
     
        private static JToken MakeRestCall(string endpointUri, ICredentials credentials)
{
    using(var client = new WebClient())
        {
            client.Headers.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
    client.Credentials = credentials;
    client.Headers.Add(HttpRequestHeader.ContentType, "application/json;odata=verbose");
    client.Headers.Add(HttpRequestHeader.Accept, "application/json;odata=verbose");
    var result = client.DownloadString(endpointUri);
    var t = Newtonsoft.Json.Linq.JToken.Parse(result);
    return t;

}
        }
    }

}