using System.Threading.Tasks;

namespace Company.Function.Services;

public interface ITokenService
{
    /// <summary>
    /// Exchange the incoming access token for an on-behalf-of token scoped for the downstream API.
    /// If <paramref name="scopes"/> is null, the service's configured default scopes are used.
    /// </summary>
    /// <param name="incomingAccessToken">Bearer token from the incoming Authorization header.</param>
    /// <param name="scopes">Optional specific scopes to request for the OBO token.</param>
    /// <returns>Access token for downstream API.</returns>
    Task<string?> GetOnBehalfOfTokenAsync(string incomingAccessToken, string[]? scopes = null);
}
