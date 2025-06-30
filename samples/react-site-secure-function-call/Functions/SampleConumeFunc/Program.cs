using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SampleConsumeFunc.Services;

var host = new HostBuilder()
  .ConfigureFunctionsWebApplication()
  .ConfigureAppConfiguration((hostContext, config) =>
  {
    config.AddJsonFile("host.json", optional: true);
  })
  .ConfigureServices(services =>
  {
    services.AddApplicationInsightsTelemetryWorkerService();
    services.AddSingleton<ITokenValidationService, TokenValidationService>();
    services.AddSingleton<IGraphService, GraphService>();
    services.ConfigureFunctionsApplicationInsights();
  })
  .Build();

host.Run();
