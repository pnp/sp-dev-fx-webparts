namespace Teamified.Api.Teams.Models;

public sealed class Channel
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Description { get; set; }

    public Channel()
    {
        Id = "unknown";
        DisplayName = "unknown";
        Description = "unknown";
    }

    internal static Channel MapFromGraphChannel(Microsoft.Graph.Channel c)
    {
        return new Channel 
        { 
            Id = c.Id, 
            DisplayName = c.DisplayName, 
            Description = c.Description 
        };
    }
}
