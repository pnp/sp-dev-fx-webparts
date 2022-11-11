using Teamified.Api.Teams.Models;

namespace Teamified.Api.Teams.Interfaces
{
    public interface ITeamsService
    {
        Task<IEnumerable<Team>> ListTeams();
        Task<Team> GetTeamByGroupId(Guid groupId);
        Task<string> ProvisionTeam(Team team);
    }
}
