using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Company.Function.Services;
using Company.Function.Plugins;
using Microsoft.SemanticKernel;

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("SharePointPolicy", policy =>
    {
        policy.SetIsOriginAllowed(origin =>
              {
                  return origin.EndsWith(".sharepoint.com", StringComparison.OrdinalIgnoreCase);
              })
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();

builder.Services.AddSingleton<ITokenService, MsalTokenService>();
builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddSingleton<ITokenValidationService, TokenValidationService>();
builder.Services.AddHttpClient("graph", client =>
{
    client.BaseAddress = new Uri("https://graph.microsoft.com/");
    client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
});
builder.Services.AddTransient<Kernel>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var tokenService = sp.GetRequiredService<ITokenService>();
    var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
    var userContextService = sp.GetRequiredService<IUserContextService>();
    var loggerFactory = sp.GetRequiredService<ILoggerFactory>();

    var endpoint = config["AzureOpenAI:Endpoint"] ?? config["AzureOpenAI__Endpoint"];
    var deploymentName = config["AzureOpenAI:DeploymentName"] ?? config["AzureOpenAI__DeploymentName"];
    var apiKey = config["AzureOpenAI:ApiKey"] ?? config["AzureOpenAI__ApiKey"];
    if (string.IsNullOrWhiteSpace(endpoint) || string.IsNullOrWhiteSpace(deploymentName) || string.IsNullOrWhiteSpace(apiKey))
    {
        throw new InvalidOperationException("Azure OpenAI configuration missing. Set AzureOpenAI:Endpoint, AzureOpenAI:DeploymentName, and AzureOpenAI:ApiKey in settings.");
    }
    var kernelBuilder = Kernel.CreateBuilder();
    kernelBuilder.AddAzureOpenAIChatCompletion(deploymentName, endpoint, apiKey);

    // Register plugins
    kernelBuilder.Plugins.AddFromType<DateTimePlugin>();
    var graphLogger = loggerFactory.CreateLogger<GraphPlugin>();
    kernelBuilder.Plugins.AddFromObject(new GraphPlugin(tokenService, httpClientFactory, userContextService, graphLogger), "GraphPlugin");

    return kernelBuilder.Build();
});

builder.Build().Run();
