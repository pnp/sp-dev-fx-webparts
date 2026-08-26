using Microsoft.Extensions.Logging;

namespace Company.Function.Services;

/// <summary>
/// Scoped service to hold the current user's access token for the duration of the HTTP request
/// </summary>
public class UserContextService : IUserContextService
{
    private readonly ILogger<UserContextService> _logger;
    private string? _userToken;

    public UserContextService(ILogger<UserContextService> logger)
    {
        _logger = logger;
    }

    public void SetUserToken(string accessToken)
    {
        _userToken = accessToken;
        _logger.LogInformation("UserContextService: User token set (length: {TokenLength})", accessToken?.Length ?? 0);
    }

    public string? GetUserToken()
    {
        if (string.IsNullOrWhiteSpace(_userToken))
        {
            _logger.LogWarning("UserContextService: Attempted to get user token but none was set");
        }
        return _userToken;
    }

    public bool HasUserToken()
    {
        return !string.IsNullOrWhiteSpace(_userToken);
    }
}
