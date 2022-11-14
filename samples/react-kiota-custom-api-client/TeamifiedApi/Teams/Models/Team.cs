using Microsoft.Graph;

namespace Teamified.Api.Teams.Models;

public sealed class Team
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Description { get; set; }
    public IEnumerable<IdentityPrincipal> Owners { get; set; }
    public IEnumerable<IdentityPrincipal> Members { get; set; }
    public IEnumerable<Channel> Channels { get; set; }

    public Team()
    {
        Id = "unknown";
        DisplayName = "unknown";
        Description = "unknown";
        Owners = new List<IdentityPrincipal>();
        Members = new List<IdentityPrincipal>();
        Channels = new List<Channel>();
    }

    public static Team MapFromGraphGroup(Group graphGroup)
    {
        return new Team
        {
            Id = graphGroup.Id,
            Description = graphGroup.Description,
            DisplayName = graphGroup.DisplayName,
            Members = graphGroup.Members != null ? graphGroup.Members.Select(m => IdentityPrincipal.MapFromDirectoryObject(m)) : new List<IdentityPrincipal>(),
            Owners = graphGroup.Owners != null ? graphGroup.Owners.Select(o => IdentityPrincipal.MapFromDirectoryObject(o)) : new List<IdentityPrincipal>()
        };
    }

    internal void AddOwners(IList<DirectoryObject> owners)
    {
        Owners = owners.Select(o => IdentityPrincipal.MapFromDirectoryObject(o));
    }

    internal void AddChannels(IList<Microsoft.Graph.Channel> channels)
    {
        Channels = channels.Select(c => Channel.MapFromGraphChannel(c));
    }
}
