using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;

namespace Company.Function.Services;

public class MsalTokenService : ITokenService
{
    private readonly IConfidentialClientApplication _cca;
    private readonly string[] _downstreamScopes;

    public MsalTokenService(IConfiguration config)
    {
        // Expect environment variables or settings in local.settings.json:
        // AzureAd__Instance (optional), AzureAd__TenantId, AzureAd__ClientId, AzureAd__ClientSecret, Downstream__Scopes

        var tenant = config["AzureAd:TenantId"] ?? config["AzureAd__TenantId"];
        var clientId = config["AzureAd:ClientId"] ?? config["AzureAd__ClientId"];
        var clientSecret = config["AzureAd:ClientSecret"] ?? config["AzureAd__ClientSecret"];
        var instance = config["AzureAd:Instance"] ?? config["AzureAd__Instance"] ?? "https://login.microsoftonline.com/";
        var scopesRaw = config["Downstream:Scopes"] ?? config["Downstream__Scopes"] ?? string.Empty;

        if (string.IsNullOrWhiteSpace(tenant) || string.IsNullOrWhiteSpace(clientId) || string.IsNullOrWhiteSpace(clientSecret))
        {
            throw new InvalidOperationException("Azure AD configuration missing. Set AzureAd:TenantId, AzureAd:ClientId and AzureAd:ClientSecret in settings.");
        }

        var authority = new Uri(new Uri(instance), tenant).ToString();

        _cca = ConfidentialClientApplicationBuilder.Create(clientId)
            .WithClientSecret(clientSecret)
            .WithAuthority(authority)
            .Build();

        _downstreamScopes = scopesRaw.Split(new[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries);
    }

    public async Task<string?> GetOnBehalfOfTokenAsync(string incomingAccessToken, string[]? scopes = null)
    {
        if (string.IsNullOrWhiteSpace(incomingAccessToken)) return null;

        var requestedScopes = scopes ?? _downstreamScopes;
        if (requestedScopes == null || requestedScopes.Length == 0)
        {
            throw new InvalidOperationException("Downstream scopes are not configured. Set Downstream:Scopes in settings or pass scopes to the method.");
        }

        var userAssertion = new UserAssertion(incomingAccessToken);

        try
        {
            var result = await _cca.AcquireTokenOnBehalfOf(requestedScopes, userAssertion)
                .ExecuteAsync();

            return result.AccessToken;
        }
        catch (MsalServiceException ex)
        {
            // Log or rethrow as needed. For now, rethrow to be visible during local testing.
            throw new InvalidOperationException("Failed to acquire OBO token", ex);
        }
    }
}
