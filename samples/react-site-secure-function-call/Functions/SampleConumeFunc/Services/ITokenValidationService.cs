using Microsoft.Azure.Functions.Worker.Http;

namespace SampleConsumeFunc.Services
{
    public interface ITokenValidationService
    {
        public Task<string?> ValidateAuthorizationHeaderAsync(
            HttpRequestData request);
    }
}
