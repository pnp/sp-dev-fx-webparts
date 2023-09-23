using MediatR;
using Teamified.Api.Teams.Interfaces;
using Teamified.Api.Teams.Models;

namespace Teamified.Api.Teams.Queries.ListTeams;

public class ListTeamsQuery : IRequest<IEnumerable<Team>>
{

}

public class ListTeamsQueryHandler : IRequestHandler<ListTeamsQuery, IEnumerable<Team>>
{
    private readonly ITeamsService _teamsService;

    public ListTeamsQueryHandler(ITeamsService teamsService)
    {
        _teamsService = teamsService;
    }

    public async Task<IEnumerable<Team>> Handle(
        ListTeamsQuery request, 
        CancellationToken cancellationToken)
    {
        return await _teamsService.ListTeams();
    }
}