using Microsoft.Graph;

namespace SampleConsumeFunc.Services
{
  public interface IGraphService
  {
    public GraphServiceClient? GetUserGraphClient(string userAssertion);
    public Task<bool> UpdateSiteDescreption(string userAssertion, string siteUrl, string newSiteDescreption);
  }
}
