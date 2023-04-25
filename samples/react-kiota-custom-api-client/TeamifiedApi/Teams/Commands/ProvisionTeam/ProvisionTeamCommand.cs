using MediatR;
using Teamified.Api.Teams.Interfaces;
using Teamified.Api.Teams.Models;

namespace Teamified.Api.Teams.Commands.ProvisionTeam;

public class ProvisionTeamCommand : IRequest<string>
{
    public string DisplayName { get; set; }
    public string Description { get; set; }
}

public class ProvisionTeamCommandHandler : IRequestHandler<ProvisionTeamCommand, string>
{
    private readonly ITeamsService _teamsService;
    public ProvisionTeamCommandHandler(ITeamsService teamsService)
    {
        _teamsService = teamsService;
    }

    public async Task<string> Handle(
        ProvisionTeamCommand request, 
        CancellationToken cancellationToken)
    {
        var team = new Team
        {
            DisplayName = request.DisplayName, 
            Description = request.Description
        };

        var newTeamLocation = await _teamsService.ProvisionTeam(team);

        return newTeamLocation;
    }
}
