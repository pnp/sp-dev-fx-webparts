using Teamified.Api.Teams.Models;

namespace Teamified.Api.Diagnostics;

public static class DiagnosticsModule
{
    public static IEndpointRouteBuilder MapDiagnosticsEndpoints(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/ping", () => new Ping { 
                Id = Guid.NewGuid(), 
                Now = DateTime.Now.ToString() 
                })
                .Produces<Ping>(200)
                .WithName("Ping")
                .WithTags("DiagnosticsModule")
                .AllowAnonymous();

        return endpoints;
    }
}