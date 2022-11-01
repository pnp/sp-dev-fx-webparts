using MediatR;
using Teamified.Api.Teams.Interfaces;
using Teamified.Api.Teams.Models;

namespace Teamified.Api.Teams.Queries.GetTeam;

public sealed class GetTeamQuery : IRequest<Team>
{
    public Guid GroupId { get; set; }
}

public sealed class GetTeamQueryHandler : IRequestHandler<GetTeamQuery, Team>
{
    private readonly ITeamsService _teamsService;

    public GetTeamQueryHandler(ITeamsService teamsService)
    {
        _teamsService = teamsService;
    }

    public async Task<Team> Handle(
        GetTeamQuery request, 
        CancellationToken cancellationToken)
    {
        return await _teamsService.GetTeamByGroupId(request.GroupId);
    }
}
