using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using O365C.SK.KernelMemory.FuncApp.Models;
using O365C.SK.KernelMemory.FuncApp.Services;

var builder = FunctionsApplication.CreateBuilder(args);

// Load settings from local.settings.json
builder.Configuration.AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);

// Register AzureFunctionSettings as a singleton
builder.Services.Configure<AzureFunctionSettings>(builder.Configuration.GetSection("Azure"));
builder.Services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<AzureFunctionSettings>>().Value);

builder.Services.AddSingleton<ISemanticKernelService, SemanticKernelService>();


builder.ConfigureFunctionsWebApplication();

// Application Insights isn't enabled by default. See https://aka.ms/AAt8mw4.
// builder.Services
//     .AddApplicationInsightsTelemetryWorkerService()
//     .ConfigureFunctionsApplicationInsights();

builder.Build().Run();