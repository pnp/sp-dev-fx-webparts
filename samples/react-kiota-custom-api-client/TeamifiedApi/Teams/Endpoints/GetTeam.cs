using MediatR;
using Teamified.Api.Teams.Queries.GetTeam;

namespace Teamified.Api.Teams.Endpoints;

public static class GetTeam
{
    public static async Task<IResult> Handle(
        IMediator mediator, Guid id)
    {
        var teams = await mediator.Send(new GetTeamQuery { GroupId = id });

        return Results.Ok(teams);
    }
}
