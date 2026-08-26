using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace Company.Function.Services;

public class TokenValidationService : ITokenValidationService
{
    private readonly ILogger<TokenValidationService> _logger;
    private readonly string _tenantId;
    private readonly string _audience;
    private readonly ConfigurationManager<OpenIdConnectConfiguration> _configurationManager;

    public TokenValidationService(IConfiguration config, ILogger<TokenValidationService> logger)
    {
        _logger = logger;
        _tenantId = config["AzureAd:TenantId"] ?? config["AzureAd__TenantId"] 
            ?? throw new InvalidOperationException("AzureAd:TenantId is required for token validation");
        
        _audience = config["AzureAd:Audience"] ?? config["AzureAd__Audience"]
            ?? config["AzureAd:ClientId"] ?? config["AzureAd__ClientId"]
            ?? throw new InvalidOperationException("AzureAd:Audience or AzureAd:ClientId is required for token validation");

        var authority = $"https://login.microsoftonline.com/{_tenantId}/v2.0";
        var metadataAddress = $"{authority}/.well-known/openid-configuration";

        _configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            metadataAddress,
            new OpenIdConnectConfigurationRetriever(),
            new HttpDocumentRetriever());
    }

    public async Task<ClaimsPrincipal?> ValidateTokenAsync(string accessToken)
    {
        if (string.IsNullOrWhiteSpace(accessToken))
        {
            return null;
        }

        try
        {
            var config = await _configurationManager.GetConfigurationAsync();

            // Log the configured audience for debugging
            _logger.LogInformation("Configured audience: {Audience}", _audience);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuers = new[]
                {
                    $"https://login.microsoftonline.com/{_tenantId}/v2.0",
                    $"https://sts.windows.net/{_tenantId}/"
                },
                ValidateAudience = true,
                ValidAudiences = new[] 
                { 
                    _audience, 
                    $"api://{_audience}",
                    _audience.Replace("api://", ""), // Handle both with and without api:// prefix
                    $"api://{_audience.Replace("api://", "")}" // Ensure no double api://
                },
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = config.SigningKeys,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(5)
            };

            // Log what audiences we're validating against
            _logger.LogInformation("Valid audiences configured: {Audiences}", string.Join(", ", validationParameters.ValidAudiences));

            var tokenHandler = new JwtSecurityTokenHandler();
            
            // Decode token to see actual audience
            var decodedToken = tokenHandler.ReadJwtToken(accessToken);
            var tokenAudience = decodedToken.Audiences.FirstOrDefault();
            _logger.LogInformation("Token audience claim: {TokenAudience}", tokenAudience);

            var principal = tokenHandler.ValidateToken(accessToken, validationParameters, out var validatedToken);

            // Additional validation: ensure it's a JWT token
            if (validatedToken is not JwtSecurityToken jwtToken || 
                !jwtToken.Header.Alg.Equals(SecurityAlgorithms.RsaSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                _logger.LogWarning("Token validation failed: Invalid token algorithm");
                return null;
            }

            return principal;
        }
        catch (SecurityTokenExpiredException ex)
        {
            _logger.LogWarning(ex, "Token validation failed: Token expired");
            return null;
        }
        catch (SecurityTokenInvalidSignatureException ex)
        {
            _logger.LogWarning(ex, "Token validation failed: Invalid signature");
            return null;
        }
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning(ex, "Token validation failed: {Message}", ex.Message);
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during token validation");
            return null;
        }
    }
}
