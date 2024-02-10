
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using M365ServiceHealth.Services;
using M365ServiceHealth.Models;
using System.Text.Json.Serialization;


var builder = Host.CreateDefaultBuilder(args);
var host = Host.CreateDefaultBuilder(args)
    .ConfigureFunctionsWorkerDefaults(builder =>
    {
        builder.ConfigureJsonFormatting(options =>
        {
            options.Converters.Add(new JsonStringEnumConverter());
            options.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        });
    }).ConfigureAppConfiguration((ctx,configBuilder)=> {
        configBuilder.AddJsonFile("local.settings.json", optional: true, reloadOnChange: true).AddJsonFile($"appsettings.json", optional: true, reloadOnChange: true).AddEnvironmentVariables();
      })
    .ConfigureServices((ctx,services) => {
        services.AddSingleton<ITokenValidationService, TokenValidationService>();
        services.AddSingleton<IGraphClientService, GraphClientService>();             
    })
    .Build();
host.Run();
