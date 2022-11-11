using Microsoft.Graph;
using Teamified.Api.Teams.Interfaces;

namespace Teamified.Api.Teams.Infrastructure;
public class TeamsService : ITeamsService
{
    private readonly GraphServiceClient _graphServiceClient;
    private readonly IHttpContextAccessor _context;

    public TeamsService(
        GraphServiceClient graphServiceClient,
        IHttpContextAccessor httpContextAccessor)
    {
        _graphServiceClient = graphServiceClient;
        _context = httpContextAccessor;
    }
    public async Task<Models.Team> GetTeamByGroupId(Guid groupId)
    {
        var group = await _graphServiceClient.Groups[groupId.ToString()]
            .Request()
            .Expand("members($select=id,displayName,userPrincipalName,jobTitle,mail)") // can´t expand more than 1 item (owners, members does not work)
            .Select(g => new { g.Id, g.DisplayName, g.Description, g.Members })
            .GetAsync();

        var team = Models.Team.MapFromGraphGroup(group);

        var groupOwners = await _graphServiceClient.Groups[groupId.ToString()]
            .Owners
            .Request()
            .Select("id,displayName,userPrincipalName,jobTitle,mail")
            .GetAsync();

        var owners = groupOwners.CurrentPage;

        team.AddOwners(owners);

        var teamChannels = await _graphServiceClient.Teams[groupId.ToString()]
            .Channels
            .Request()
            .GetAsync();

        var channels = teamChannels.CurrentPage;

        team.AddChannels(channels);

        return team;
    }

    public async Task<IEnumerable<Models.Team>> ListTeams()
    {
        var teamsCollection = await _graphServiceClient.Groups
            .Request()
            .Filter("resourceProvisioningOptions/Any(x:x eq 'Team')")
            .Expand("members($select=id,displayName,userPrincipalName,jobTitle,mail)") // can´t expand more than 1 item (owners, members does not work), but for this Listing endpoint is fine.
            .Select(g => new { g.Id, g.DisplayName, g.Description, g.Members })
            .GetAsync();

        var teams = teamsCollection.CurrentPage;

        var result = teams.Select(t => Models.Team.MapFromGraphGroup(t));

        return result;
    }

    public async Task<string> ProvisionTeam(Models.Team team)
    {
        var currentUserId = _context.HttpContext.User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;

        var newTeam = new Team()
        {
            DisplayName = team.DisplayName,
            Description = team.Description,
            AdditionalData = new Dictionary<string, object>()
                {
                    {"template@odata.bind", "https://graph.microsoft.com/v1.0/teamsTemplates('standard')"}
                },
            Members = new TeamMembersCollectionPage()
            {
                new AadUserConversationMember
                {
                    Roles = new List<string>()
                    {
                        "owner"
                    },
                    AdditionalData = new Dictionary<string, object>()
                    {
                        {"user@odata.bind", $"https://graph.microsoft.com/v1.0/users/{currentUserId}"}
                    }
                }
            }, Channels = new TeamChannelsCollectionPage
            {
                new Channel
                {
                    DisplayName = "KickOff Channel", 
                    IsFavoriteByDefault = true, 
                    Description = "As per company policy, place here data related with the Kickoff of the Team"
                }
            }
        };

        var result = await _graphServiceClient.Teams
                    .Request()
                    .AddResponseAsync(newTeam);

        if (result.HttpHeaders.TryGetValues("Location", out var locationValues))
        {
            return locationValues?.First();
        }

        return "Something went wrong. Location not found";
    }
}
