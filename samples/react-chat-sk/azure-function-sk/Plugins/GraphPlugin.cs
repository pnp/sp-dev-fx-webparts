using System;
using System.ComponentModel;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Company.Function.Services;
using Microsoft.SemanticKernel;
using Microsoft.Extensions.Logging;

namespace Company.Function.Plugins;

public class GraphPlugin
{
    private readonly ITokenService _tokenService;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IUserContextService _userContextService;
    private readonly ILogger<GraphPlugin> _logger;

    public GraphPlugin(ITokenService tokenService, IHttpClientFactory httpClientFactory, IUserContextService userContextService, ILogger<GraphPlugin> logger)
    {
        _tokenService = tokenService;
        _httpClientFactory = httpClientFactory;
        _userContextService = userContextService;
        _logger = logger;
    }

    /// <summary>
    /// Set the incoming user access token for OBO flow (must be called before getUserInfo or getCalendarInfo)
    /// </summary>



    [KernelFunction("getUserInfo")]
    [Description("Retrieves the current user's profile information from Microsoft Graph (displayName, mail, userPrincipalName, etc.)")]
    public async Task<string> GetUserInfo(KernelArguments args)
    {
        _logger.LogInformation("GraphPlugin.GetUserInfo called");
        if (!_userContextService.HasUserToken())
        {
            _logger.LogWarning("GraphPlugin.GetUserInfo: User token not set in context");
            return "Error: User token not set. Cannot retrieve user info.";
        }

        _logger.LogInformation("GraphPlugin.GetUserInfo: Acquiring OBO token for Graph API");
        var oboToken = await _tokenService.GetOnBehalfOfTokenAsync(_userContextService.GetUserToken(), new[] { "https://graph.microsoft.com/.default" });
        if (oboToken == null)
        {
            _logger.LogError("GraphPlugin.GetUserInfo: Failed to acquire Graph token");
            return "Error: Failed to acquire Graph token.";
        }

        var client = _httpClientFactory.CreateClient("graph");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", oboToken);

        try
        {
            _logger.LogInformation("GraphPlugin.GetUserInfo: Calling Graph API /me endpoint");
            var res = await client.GetAsync("https://graph.microsoft.com/v1.0/me");
            res.EnsureSuccessStatusCode();
            var json = await res.Content.ReadAsStringAsync();
            _logger.LogInformation("GraphPlugin.GetUserInfo: Successfully retrieved user info");
            return json;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GraphPlugin.GetUserInfo: Error retrieving user info");
            return $"Error retrieving user info: {ex.Message}";
        }
    }

    [KernelFunction("getCalendarInfo")]
    [Description("Retrieves the current user's calendar events from Microsoft Graph")]
    public async Task<string> GetCalendarInfo()
    {
        _logger.LogInformation("GraphPlugin.GetCalendarInfo called");
        
        if (!_userContextService.HasUserToken())
        {
            _logger.LogWarning("GraphPlugin.GetCalendarInfo: User token not set in context");
            return "Error: User token not set. Cannot retrieve calendar info.";
        }

        var userToken = _userContextService.GetUserToken();
        _logger.LogInformation("GraphPlugin.GetCalendarInfo: Acquiring OBO token for Graph API");
        var oboToken = await _tokenService.GetOnBehalfOfTokenAsync(userToken!, new[] { "https://graph.microsoft.com/.default" });
        if (oboToken == null)
        {
            _logger.LogError("GraphPlugin.GetCalendarInfo: Failed to acquire Graph token");
            return "Error: Failed to acquire Graph token.";
        }

        var client = _httpClientFactory.CreateClient("graph");
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", oboToken);

        try
        {
            _logger.LogInformation("GraphPlugin.GetCalendarInfo: Calling Graph API /me/calendar/events endpoint");
            var res = await client.GetAsync("https://graph.microsoft.com/v1.0/me/calendar/events");
            res.EnsureSuccessStatusCode();
            var json = await res.Content.ReadAsStringAsync();
            _logger.LogInformation("GraphPlugin.GetCalendarInfo: Successfully retrieved calendar info");
            return json;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GraphPlugin.GetCalendarInfo: Error retrieving calendar info");
            return $"Error retrieving calendar info: {ex.Message}";
        }
    }
}
