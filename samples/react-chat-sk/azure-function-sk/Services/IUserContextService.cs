namespace Company.Function.Services;

/// <summary>
/// Service to hold the current user's access token for the duration of the request
/// </summary>
public interface IUserContextService
{
    /// <summary>
    /// Sets the user's access token for the current request
    /// </summary>
    void SetUserToken(string accessToken);

    /// <summary>
    /// Gets the user's access token for the current request
    /// </summary>
    string? GetUserToken();

    /// <summary>
    /// Checks if a user token is set
    /// </summary>
    bool HasUserToken();
}
