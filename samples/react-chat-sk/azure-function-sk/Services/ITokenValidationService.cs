using System.Security.Claims;
using System.Threading.Tasks;

namespace Company.Function.Services;

public interface ITokenValidationService
{
    /// <summary>
    /// Validates an access token and returns the claims principal if valid.
    /// </summary>
    /// <param name="accessToken">The bearer token to validate.</param>
    /// <returns>ClaimsPrincipal if valid, null if invalid.</returns>
    Task<ClaimsPrincipal?> ValidateTokenAsync(string accessToken);
}
