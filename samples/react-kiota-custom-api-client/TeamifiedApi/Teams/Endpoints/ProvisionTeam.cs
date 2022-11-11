using MediatR;
using Teamified.Api.Teams.Commands.ProvisionTeam;

namespace Teamified.Api.Teams.Endpoints
{
    public class ProvisionTeam
    {
        public static async Task<IResult> Handle(
            IMediator mediator, 
            ProvisionTeamCommand command)
        {
            var newTeamLocation = await mediator.Send(command);

            return Results.Accepted(newTeamLocation);
        }
    }
}
